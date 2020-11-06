"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zip215 = void 0;
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var sha512_1 = require("../crypto/sha512");
var ed25519_1 = require("./ed25519");
var extendedGroupElement_1 = require("./edwards25519/extendedGroupElement");
var projectiveGroupElement_1 = require("./edwards25519/projectiveGroupElement");
var scalar_1 = require("./edwards25519/scalar");
var Zip215 = /** @class */ (function () {
    function Zip215() {
    }
    /**
     * Verify reports whether sig is a valid signature of message by
     * publicKey, using precisely-specified validation criteria (ZIP 215) suitable
     * for use in consensus-critical contexts.
     * @param publicKey The public key for the message.
     * @param message The message content to validate.
     * @param sig The signature to verify.
     * @returns True if the signature is valid.
     */
    Zip215.verify = function (publicKey, message, sig) {
        if (!publicKey || publicKey.length !== ed25519_1.Ed25519.PUBLIC_KEY_SIZE) {
            return false;
        }
        if (!sig || sig.length !== ed25519_1.Ed25519.SIGNATURE_SIZE || ((sig[63] & 224) !== 0)) {
            return false;
        }
        var A = new extendedGroupElement_1.ExtendedGroupElement();
        // ZIP215: this works because FromBytes does not check that encodings are canonical.
        if (!A.fromBytes(publicKey)) {
            return false;
        }
        A.X.neg();
        A.T.neg();
        var h = new sha512_1.Sha512();
        h.update(sig.subarray(0, 32));
        h.update(publicKey);
        h.update(message);
        var digest = h.digest();
        var hReduced = new Uint8Array(32);
        scalar_1.scalarReduce(hReduced, digest);
        var r = new Uint8Array(sig.subarray(32));
        var checkR = new extendedGroupElement_1.ExtendedGroupElement();
        // ZIP215: this works because FromBytes does not check that encodings are canonical.
        if (!checkR.fromBytes(r)) {
            return false;
        }
        var s = new Uint8Array(sig.subarray(32));
        // https://tools.ietf.org/html/rfc8032#section-5.1.7 requires that s be in
        // the range [0, order) in order to prevent signature malleability.
        // ZIP215: This is also required by ZIP215.
        if (!scalar_1.scalarMinimal(s)) {
            return false;
        }
        var rProj = new projectiveGroupElement_1.ProjectiveGroupElement();
        var R = new extendedGroupElement_1.ExtendedGroupElement();
        rProj.doubleScalarMultVartime(hReduced, A, s);
        rProj.toExtended(R);
        // ZIP215: We want to check [8](R - R') == 0
        return R.cofactorEqual(checkR);
    };
    return Zip215;
}());
exports.Zip215 = Zip215;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwMjE1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by96aXAyMTUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9COzs7O0dBSUc7QUFDSCwyQ0FBMEM7QUFDMUMscUNBQW9DO0FBQ3BDLDRFQUEyRTtBQUMzRSxnRkFBK0U7QUFDL0UsZ0RBQW9FO0FBRXBFO0lBQUE7SUErREEsQ0FBQztJQTlERzs7Ozs7Ozs7T0FRRztJQUNXLGFBQU0sR0FBcEIsVUFBcUIsU0FBcUIsRUFBRSxPQUFtQixFQUFFLEdBQWU7UUFDNUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLGlCQUFPLENBQUMsZUFBZSxFQUFFO1lBQzVELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLGlCQUFPLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDMUUsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFNLENBQUMsR0FBRyxJQUFJLDJDQUFvQixFQUFFLENBQUM7UUFFckMsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFVixJQUFNLENBQUMsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLElBQU0sUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLHFCQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRS9CLElBQU0sQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFNLE1BQU0sR0FBRyxJQUFJLDJDQUFvQixFQUFFLENBQUM7UUFDMUMsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBTSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLDBFQUEwRTtRQUMxRSxtRUFBbUU7UUFDbkUsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxzQkFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBTSxLQUFLLEdBQUcsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1FBQzNDLElBQU0sQ0FBQyxHQUFHLElBQUksMkNBQW9CLEVBQUUsQ0FBQztRQUVyQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLDRDQUE0QztRQUM1QyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBL0RELElBK0RDO0FBL0RZLHdCQUFNIn0=