"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedGroupElement = void 0;
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var arrayHelper_1 = require("../../utils/arrayHelper");
var cachedGroupElement_1 = require("./cachedGroupElement");
var completedGroupElement_1 = require("./completedGroupElement");
var const_1 = require("./const");
var fieldElement_1 = require("./fieldElement");
var preComputedGroupElement_1 = require("./preComputedGroupElement");
var projectiveGroupElement_1 = require("./projectiveGroupElement");
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT
 */
var ExtendedGroupElement = /** @class */ (function () {
    /**
     * Create a new instance of ExtendedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    function ExtendedGroupElement(X, Y, Z, T) {
        this.X = X !== null && X !== void 0 ? X : new fieldElement_1.FieldElement();
        this.Y = Y !== null && Y !== void 0 ? Y : new fieldElement_1.FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new fieldElement_1.FieldElement();
        this.T = T !== null && T !== void 0 ? T : new fieldElement_1.FieldElement();
    }
    /**
     * Zero the elements.
     */
    ExtendedGroupElement.prototype.zero = function () {
        this.X.zero();
        this.Y.one();
        this.Z.one();
        this.T.zero();
    };
    /**
     * Double the element.
     * @param cachedGroupElement The element to populate.
     */
    ExtendedGroupElement.prototype.double = function (cachedGroupElement) {
        var q = new projectiveGroupElement_1.ProjectiveGroupElement();
        this.toProjective(q);
        q.double(cachedGroupElement);
    };
    /**
     * Convert to a cached group element.
     * @param cacheGroupElement The element to populate.
     */
    ExtendedGroupElement.prototype.toCached = function (cacheGroupElement) {
        cacheGroupElement.yPlusX.add(this.Y, this.X);
        cacheGroupElement.yMinusX.sub(this.Y, this.X);
        cacheGroupElement.Z = new fieldElement_1.FieldElement(this.Z.data);
        cacheGroupElement.T2d.mul(this.T, const_1.CONST_D2);
    };
    /**
     * Convert to a projective group element.
     * @param projectiveGroupElement The element to populate.
     */
    ExtendedGroupElement.prototype.toProjective = function (projectiveGroupElement) {
        projectiveGroupElement.X = new fieldElement_1.FieldElement(this.X.data);
        projectiveGroupElement.Y = new fieldElement_1.FieldElement(this.Y.data);
        projectiveGroupElement.Z = new fieldElement_1.FieldElement(this.Z.data);
    };
    /**
     * Convert the element to bytes.
     * @param bytes The array to store the bytes in.
     */
    ExtendedGroupElement.prototype.toBytes = function (bytes) {
        var recip = new fieldElement_1.FieldElement();
        var x = new fieldElement_1.FieldElement();
        var y = new fieldElement_1.FieldElement();
        recip.invert(this.Z);
        x.mul(this.X, recip);
        y.mul(this.Y, recip);
        y.toBytes(bytes);
        bytes[31] ^= x.isNegative() << 7;
    };
    /**
     * Populate the element from bytes.
     * @param bytes The butes to populate from.
     * @returns False is non-zero check.
     */
    ExtendedGroupElement.prototype.fromBytes = function (bytes) {
        var u = new fieldElement_1.FieldElement();
        var v = new fieldElement_1.FieldElement();
        var v3 = new fieldElement_1.FieldElement();
        var vxx = new fieldElement_1.FieldElement();
        var check = new fieldElement_1.FieldElement();
        var i;
        this.Y.fromBytes(bytes);
        this.Z.one();
        u.square(this.Y);
        v.mul(u, const_1.CONST_D);
        u.sub(u, this.Z); // y = y^2-1
        v.add(v, this.Z); // v = dy^2+1
        v3.square(v);
        v3.mul(v3, v); // v3 = v^3
        this.X.square(v3);
        this.X.mul(this.X, v);
        this.X.mul(this.X, u); // x = uv^7
        this.X.pow22523(this.X); // x = (uv^7)^((q-5)/8)
        this.X.mul(this.X, v3);
        this.X.mul(this.X, u); // x = uv^3(uv^7)^((q-5)/8)
        var tmpX = new Uint8Array(32);
        var tmp2 = new Uint8Array(32);
        vxx.square(this.X);
        vxx.mul(vxx, v);
        check.sub(vxx, u); // vx^2-u
        if (check.isNonZero() === 1) {
            check.add(vxx, u); // vx^2+u
            if (check.isNonZero() === 1) {
                return false;
            }
            this.X.mul(this.X, const_1.CONST_SQRT_M1);
            this.X.toBytes(tmpX);
            for (i = 0; i < tmpX.length; i++) {
                tmp2[31 - i] = tmpX[i];
            }
        }
        if (this.X.isNegative() !== (bytes[31] >> 7)) {
            this.X.neg();
        }
        this.T.mul(this.X, this.Y);
        return true;
    };
    /**
     * GeScalarMultBase computes h = a*B, where
     *  a = a[0]+256*a[1]+...+256^31 a[31]
     *  B is the Ed25519 base point (x,4/5) with x positive.
     * Preconditions:
     *  a[31] <= 127
     * @param a The a.
     */
    ExtendedGroupElement.prototype.scalarMultBase = function (a) {
        var e = new Int8Array(64);
        for (var i = 0; i < a.length; i++) {
            e[2 * i] = a[i] & 15;
            e[(2 * i) + 1] = (a[i] >> 4) & 15;
        }
        // each e[i] is between 0 and 15 and e[63] is between 0 and 7.
        var carry = 0;
        for (var i = 0; i < 63; i++) {
            e[i] += carry;
            carry = (e[i] + 8) >> 4;
            e[i] -= carry << 4;
        }
        e[63] += carry;
        // each e[i] is between -8 and 8.
        this.zero();
        var t = new preComputedGroupElement_1.PreComputedGroupElement();
        var r = new completedGroupElement_1.CompletedGroupElement();
        for (var i = 1; i < 64; i += 2) {
            t.selectPoint(Math.floor(i / 2), e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }
        var s = new projectiveGroupElement_1.ProjectiveGroupElement();
        this.double(r);
        r.toProjective(s);
        s.double(r);
        r.toProjective(s);
        s.double(r);
        r.toProjective(s);
        s.double(r);
        r.toExtended(this);
        for (var i = 0; i < 64; i += 2) {
            t.selectPoint(i / 2, e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }
    };
    /**
     * CofactorEqual checks whether p, q are equal up to cofactor multiplication
     * (ie. if their difference is of small order).
     * @param q The extended group element.
     * @returns True if they are equal.
     */
    ExtendedGroupElement.prototype.cofactorEqual = function (q) {
        var t1 = new cachedGroupElement_1.CachedGroupElement();
        var t2 = new completedGroupElement_1.CompletedGroupElement();
        var t3 = new projectiveGroupElement_1.ProjectiveGroupElement();
        q.toCached(t1);
        t2.sub(this, t1); // t2 =    (P - Q)
        t2.toProjective(t3); // t3 =    (P - Q)
        t3.double(t2); // t2 = [2](P - Q)
        t2.toProjective(t3); // t3 = [2](P - Q)
        t3.double(t2); // t2 = [4](P - Q)
        t2.toProjective(t3); // t3 = [4](P - Q)
        t3.double(t2); // t2 = [8](P - Q)
        t2.toProjective(t3); // t3 = [8](P - Q)
        // Now we want to check whether the point t3 is the identity.
        // In projective coordinates this is (X:Y:Z) ~ (0:1:0)
        // ie. X/Z = 0, Y/Z = 1
        // <=> X = 0, Y = Z
        var zero = new Uint8Array(32);
        var xBytes = new Uint8Array(32);
        var yBytes = new Uint8Array(32);
        var zBytes = new Uint8Array(32);
        t3.X.toBytes(xBytes);
        t3.Y.toBytes(yBytes);
        t3.Z.toBytes(zBytes);
        return arrayHelper_1.ArrayHelper.equal(zero, xBytes) && arrayHelper_1.ArrayHelper.equal(yBytes, zBytes);
    };
    return ExtendedGroupElement;
}());
exports.ExtendedGroupElement = ExtendedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9leHRlbmRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0I7Ozs7R0FJRztBQUNILHVEQUFzRDtBQUN0RCwyREFBMEQ7QUFDMUQsaUVBQWdFO0FBQ2hFLGlDQUEyRDtBQUMzRCwrQ0FBOEM7QUFDOUMscUVBQW9FO0FBQ3BFLG1FQUFrRTtBQUVsRTs7OztHQUlHO0FBQ0g7SUFxQkk7Ozs7OztPQU1HO0lBQ0gsOEJBQVksQ0FBZ0IsRUFBRSxDQUFnQixFQUFFLENBQWdCLEVBQUUsQ0FBZ0I7UUFDOUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQ0FBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQU0s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QUMsWUFBWTtRQUM5QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBRS9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVztRQUVsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1FBRWxELElBQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM1QixJQUFJLEtBQUssQ0FBQyxTQUFT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