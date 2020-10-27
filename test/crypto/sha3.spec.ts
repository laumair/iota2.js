/* eslint-disable max-len */
import { Sha3 } from "../../src/crypto/sha3";

const algoBits: (224 | 256 | 384 | 512)[] = [
    224,
    256,
    384,
    512
];

describe("Sha3", () => {
    test("Sha3 Can mutate 0 array", () => {
        const expected = [
            "e9ba6076b3960f044307b3697e41603eb76476bc8430a94320548f4f",
            "8b11da7e15a45172e88775fbdcb8b6fd2e0cd274c604775a5ea8eece72aa8ec0",
            "ebab8a91bc01ac602754379ef71bc0886374db8e202e76dc7ab36366246462f00d110af02189e4b113117983af98d50f",
            "189232076457fc6c5d9236bb5892cc3900039e357ca7b4987da89b09d617aba9c9bb49d2f3cfcd2ced3cb1639e98bf76fdbdb20f6eca94233f10730709234924"
        ];

        for (let i = 0; i < algoBits.length; i++) {
            const input = new Uint8Array(50);
            const algo = Sha3.sha3(algoBits[i]);
            algo.update(input);
            expect(Buffer.from(algo.digest()).toString("hex")).toEqual(expected[i]);
        }
    });


    test("Sha3 Can mutate value array", () => {
        const expected = [
            "446b0071f21ffb63bfa6054a96f44fd4996f30cb4d398190b42c6f43",
            "57fa0a179b510246b3f8d195acb103cdc86d8315588325ef536c47fff2772658",
            "96165224c6efe359842f6b1243a5d7faf1ef426f5d519a5b4f4f7640380f22c7368ae71074649e3b8c38229ae26626a4",
            "20e0dd49444601ff9c6237d5f94f4ec8196f9c917c37e1ead04e814802ede40f8a8aa9c55015602a6d53d87a0d4119b6996813f90bf984b6fe571b79dc5bcf73"
        ];

        for (let i = 0; i < algoBits.length; i++) {
            const input = new Uint8Array(50);
            for (let j = 0; j < input.length; j++) {
                input[j] = j;
            }
            const algo = Sha3.sha3(algoBits[i]);
            algo.update(input);
            expect(Buffer.from(algo.digest()).toString("hex")).toEqual(expected[i]);
        }
    });

    test("Sha3 Can mutate value array multiple times", () => {
        const expected = [
            "09bd109f1ce3c963f9ed2f7c288818ea838e47b0c13836c8d0266c6a",
            "cfed9e842e4d598f62c9b7adbcc155f2df3dc019a26517e8f8447657498463de",
            "de8606e2abc90ef1c8a3b0a091701e4708b23cb48c811b334acce065e898d04cb4a44df2f0dc53139d58009153c542cc",
            "ba5a50ecd95a456df02fc6b776b93e31b4963d077f308e123623a046009123507483930beca18e121e4935c80ffc8e0295f719aa414623344f3da1c660f100c8"
        ];

        for (let i = 0; i < algoBits.length; i++) {
            const input = new Uint8Array(50);
            for (let j = 0; j < input.length; j++) {
                input[j] = j;
            }
            const algo = Sha3.sha3(algoBits[i]);
            algo.update(input);
            algo.update(input);
            expect(Buffer.from(algo.digest()).toString("hex")).toEqual(expected[i]);
        }
    });

    test("Keccak Can mutate 0 array", () => {
        const expected = [
            "7e7ec60e974f2177a3f3ad06db901ff5bde75a0a83b356479e2ffe1d",
            "767bfb6ead6760f170718f8074950b9439f9d58e73b64f2554c474039f0e3eb4",
            "3b271e6daf38d3dc29ef779c1cf065e1c897f5f512e9ea056d23b9e8251372f6ecb79376ba2368540f3860e0e50894af",
            "e6dae2b61814d504c0d41bee8fb8e76fce79ac1c8aadd575e4e4c25f9f364d5d7c9e189e508cd40b08cffa8879b9a1ca7bff91e259f3cb897f885de445a493fa"
        ];

        for (let i = 0; i < algoBits.length; i++) {
            const input = new Uint8Array(50);
            const algo = Sha3.keccak(algoBits[i]);
            algo.update(input);
            expect(Buffer.from(algo.digest()).toString("hex")).toEqual(expected[i]);
        }
    });


    test("Keccak Can mutate value array", () => {
        const expected = [
            "161cddeb9596a2ddbb888f37a38e9f0e3647f0dd3082f6cc327e79a4",
            "fd34586ce4e5edbe8eb1acec8725983364403e5ab71673ca2eff4daf17593a60",
            "bc8f1db925a49fd599b107a4d955acd0498da7a2720a83135e20576b8813946b9552a87f76f96c5ca5a610d0f72cbae2",
            "4e40bc608add967fbcee8cb728c946ae077881832562de6a4faabde7adb48629d11331dcf9c637c0241f43bad8899c4f272db2e19bb8974bf81eba65b86ac7a8"
        ];

        for (let i = 0; i < algoBits.length; i++) {
            const input = new Uint8Array(50);
            for (let j = 0; j < input.length; j++) {
                input[j] = j;
            }

            const algo = Sha3.keccak(algoBits[i]);
            algo.update(input);
            expect(Buffer.from(algo.digest()).toString("hex")).toEqual(expected[i]);
        }
    });

    test("Keccak Can mutate value array multiple times", () => {
        const expected = [
            "214d2f43223b1bfec29cd99eba710521eb8e65de786e63c2fb299da7",
            "83c3be2283e68e6ff85582f635e914ce13d62acf59797640a6af63466fea0c66",
            "c11c8d453f394ff876a7eb104bbdbe48be8a23b09b889c54b6067223af17ccf713d977d4ec14892a4b44b3340f35f90a",
            "bc27f288c45cb2e2e77cffd2037bd4ade587c708c7d3dbd1a07d14e62bf9900cebb317f3acbd817466a2d09100864ead6558aeb4ae8109ababa0fdd5c69ec55b"
        ];

        for (let i = 0; i < algoBits.length; i++) {
            const input = new Uint8Array(50);
            for (let j = 0; j < input.length; j++) {
                input[j] = j;
            }
            const algo = Sha3.keccak(algoBits[i]);
            algo.update(input);
            algo.update(input);
            expect(Buffer.from(algo.digest()).toString("hex")).toEqual(expected[i]);
        }
    });
});

