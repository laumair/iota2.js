/* eslint-disable max-len */
import { deserializeMessage, serializeMessage } from "../../src/binary/message";
import { IIndexationPayload } from "../../src/models/IIndexationPayload";
import { IMilestonePayload } from "../../src/models/IMilestonePayload";
import { ISignatureUnlockBlock } from "../../src/models/ISignatureUnlockBlock";
import { ITransactionPayload } from "../../src/models/ITransactionPayload";
import { ReadBuffer } from "../../src/utils/readBuffer";
import { WriteBuffer } from "../../src/utils/writeBuffer";

describe("Binary Message", () => {
    test("Can fail with underflow min", () => {
        const buffer = Buffer.from([]);
        expect(() => deserializeMessage(new ReadBuffer(buffer))).toThrow("is less");
    });

    test("Can fail with underflow max", () => {
        const buffer = Buffer.alloc(76);
        expect(() => deserializeMessage(new ReadBuffer(buffer))).toThrow("is less");
    });

    test("Can fail with invalid version number", () => {
        const buffer = Buffer.alloc(77);
        buffer.writeUInt8(0);
        expect(() => deserializeMessage(new ReadBuffer(buffer))).toThrow("Unsupported message version number");
    });

    test("Can succeed with valid data", () => {
        const buffer = Buffer.alloc(87);
        buffer.writeUInt8(1, 0);
        buffer.write("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e", 1, "hex");
        buffer.write("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73", 33, "hex");
        buffer.writeUInt32LE(8, 65); // Payload length
        buffer.writeUInt32LE(2, 69); // Payload type
        buffer.writeUInt16LE(0, 73); // Indexation index length
        buffer.writeUInt32LE(0, 75); // Indexation data length
        buffer.writeBigUInt64LE(BigInt(0), 79); // Nonce
        const message = deserializeMessage(new ReadBuffer(buffer));
        expect(message.version).toEqual(1);
        expect(message.parent1MessageId).toEqual("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e");
        expect(message.parent2MessageId).toEqual("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73");
        expect(message.nonce).toEqual(0);
    });

    test("Can fail with additional data", () => {
        const buffer = Buffer.alloc(88);
        buffer.writeUInt8(1, 0);
        buffer.write("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e", 1, "hex");
        buffer.write("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73", 33, "hex");
        buffer.writeUInt32LE(8, 65); // Payload length
        buffer.writeUInt32LE(2, 69); // Payload type
        buffer.writeUInt16LE(0, 73); // Indexation index length
        buffer.writeUInt32LE(0, 75); // Indexation data length
        buffer.writeBigUInt64LE(BigInt(0), 79); // Nonce
        expect(() => deserializeMessage(new ReadBuffer(buffer))).toThrow("unused data");
    });

    test("Can succeed with milestone data", () => {
        const buffer = Buffer.from("013e2a4764f6bcc8af3c2dcea641d8cc59c7cb86a94aafa36d47e3a9542428e04b10cb6c461f01aa2da31b1f67ec6519ae5e39f8713191d7cf75a2e362d8f407f69400000001000000dc05000000000000dc41845f00000000786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d0000000000000000", "hex");
        const message = deserializeMessage(new ReadBuffer(buffer));
        expect(message.version).toEqual(1);
        expect(message.parent1MessageId).toEqual("3e2a4764f6bcc8af3c2dcea641d8cc59c7cb86a94aafa36d47e3a9542428e04b");
        expect(message.parent2MessageId).toEqual("10cb6c461f01aa2da31b1f67ec6519ae5e39f8713191d7cf75a2e362d8f407f6");
        const payload = message.payload as IMilestonePayload;
        expect(payload.type).toEqual(1);
        expect(payload.index).toEqual(1500);
        expect(payload.timestamp).toEqual(1602503132);
        expect(payload.inclusionMerkleProof).toEqual("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce");
        expect(payload.signature).toEqual("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
        expect(message.nonce).toEqual(0);
    });

    test("Can succeed with indexation data", () => {
        const buffer = Buffer.from("019eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e10000000020000000300466f6f030000004261720000000000000000", "hex");
        const message = deserializeMessage(new ReadBuffer(buffer));
        expect(message.version).toEqual(1);
        expect(message.parent1MessageId).toEqual("9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a");
        expect(message.parent2MessageId).toEqual("26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e");
        const payload = message.payload as IIndexationPayload;
        expect(payload.type).toEqual(2);
        expect(payload.index).toEqual("Foo");
        expect(Buffer.from(payload.data, "hex").toString()).toEqual("Bar");
        expect(message.nonce).toEqual(0);
    });

    test("Can succeed with milestone data", () => {
        const hex = "013e2a4764f6bcc8af3c2dcea641d8cc59c7cb86a94aafa36d47e3a9542428e04b10cb6c461f01aa2da31b1f67ec6519ae5e39f8713191d7cf75a2e362d8f407f69400000001000000dc05000000000000dc41845f00000000786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d0000000000000000";
        const buffer = Buffer.from(hex, "hex");
        const message = deserializeMessage(new ReadBuffer(buffer));
        const writeBuffer = new WriteBuffer();
        serializeMessage(writeBuffer, message);

        const finalBuffer = writeBuffer.finalBuffer();
        expect(hex).toEqual(finalBuffer.toString("hex"));
    });

    test("Can succeed with indexation data", () => {
        const buffer = Buffer.from("019eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e10000000020000000300466f6f030000004261720000000000000000", "hex");
        const message = deserializeMessage(new ReadBuffer(buffer));
        expect(message.version).toEqual(1);
        expect(message.parent1MessageId).toEqual("9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a");
        expect(message.parent2MessageId).toEqual("26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e");
        const payload = message.payload as IIndexationPayload;
        expect(payload.type).toEqual(2);
        expect(payload.index).toEqual("Foo");
        expect(Buffer.from(payload.data, "hex").toString()).toEqual("Bar");
        expect(message.nonce).toEqual(0);
    });

    test("Can succeed with transaction data", () => {
        const buffer = Buffer.from("0151787e8600ba1cb2644c25481b5e586656c838dfc45dc19478ea6958f72ee867b968b9a88d536f49b275954c1da214cc013b691e174a2068b72b157cd8c96399c100000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000001000001091dc94a7f12f3913dce4dc4f7fc9813461d8e296a011d979fe98c95d854483cc15d2dd3f7df09000000000001000001f7868ab6bb55800b77b8b74191ad8285a9bf428ace579d541fda47661803ff443be6a969c0ae547f394293d7d76c440fd7d4ea9de447130ccb45906b07766497d9c01f08d2233346b9a58bc634b38dc171f2d4408d94cd7c266868767e86600c0000000000000000", "hex");
        const message = deserializeMessage(new ReadBuffer(buffer));
        expect(message.version).toEqual(1);
        expect(message.parent1MessageId).toEqual("51787e8600ba1cb2644c25481b5e586656c838dfc45dc19478ea6958f72ee867");
        expect(message.parent2MessageId).toEqual("b968b9a88d536f49b275954c1da214cc013b691e174a2068b72b157cd8c96399");
        const payload = message.payload as ITransactionPayload;
        expect(payload.type).toEqual(0);
        expect(payload.essence.type).toEqual(0);
        expect(payload.essence.inputs.length).toEqual(1);
        expect(payload.essence.inputs[0].type).toEqual(0);
        expect(payload.essence.inputs[0].transactionId).toEqual("0000000000000000000000000000000000000000000000000000000000000000");
        expect(payload.essence.inputs[0].transactionOutputIndex).toEqual(0);
        expect(payload.essence.outputs.length).toEqual(1);
        expect(payload.essence.outputs[0].type).toEqual(0);
        expect(payload.essence.outputs[0].address.type).toEqual(1);
        expect(payload.essence.outputs[0].address.address).toEqual("091dc94a7f12f3913dce4dc4f7fc9813461d8e296a011d979fe98c95d854483c");
        expect(payload.essence.outputs[0].amount).toEqual(2779530283277761);
        expect(payload.unlockBlocks.length).toEqual(1);
        expect(payload.unlockBlocks[0].type).toEqual(0);
        const unlockBlock = payload.unlockBlocks[0] as ISignatureUnlockBlock;
        expect(unlockBlock.signature.publicKey).toEqual("f7868ab6bb55800b77b8b74191ad8285a9bf428ace579d541fda47661803ff44");
        expect(unlockBlock.signature.signature).toEqual("3be6a969c0ae547f394293d7d76c440fd7d4ea9de447130ccb45906b07766497d9c01f08d2233346b9a58bc634b38dc171f2d4408d94cd7c266868767e86600c");
        expect(message.nonce).toEqual(0);
    });
});
