/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
import { CONST_BASE } from "./const";
import { FieldElement } from "./fieldElement";

/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * PreComputedGroupElement: (y+x,y-x,2dxy)
 */
export class PreComputedGroupElement {
    /**
     * Y + X Element.
     */
    public yPlusX: FieldElement;

    /**
     * Y - X Element
     */
    public yMinusX: FieldElement;

    /**
     * X Y 2 d Element.
     */
    public xy2d: FieldElement;

    /**
     * Create a new instance of PreComputedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element
     * @param xy2d XY2d Element.
     */
    constructor(yPlusX?: FieldElement, yMinusX?: FieldElement, xy2d?: FieldElement) {
        this.yPlusX = yPlusX ?? new FieldElement();
        this.yMinusX = yMinusX ?? new FieldElement();
        this.xy2d = xy2d ?? new FieldElement();
    }

    /**
     * Set the elements to zero.
     */
    public zero(): void {
        this.yPlusX.one();
        this.yMinusX.one();
        this.xy2d.zero();
    }

    /**
     * CMove the pre computed element.
     * @param u The u.
     * @param b The b.
     */
    public cMove(u: PreComputedGroupElement, b: number): void {
        this.yPlusX.cMove(u.yPlusX, b);
        this.yMinusX.cMove(u.yMinusX, b);
        this.xy2d.cMove(u.xy2d, b);
    }

    /**
     * Select point.
     * @param pos The position.
     * @param b The index.
     */
    public selectPoint(pos: number, b: number): void {
        const minusT = new PreComputedGroupElement();
        const bNegative = this.negative(b);
        const bAbs = b - (((-bNegative) & b) << 1);

        this.zero();
        for (let i = 0; i < 8; i++) {
            this.cMove(CONST_BASE[pos][i], this.equal(bAbs, i + 1));
        }

        minusT.yPlusX = new FieldElement(this.yMinusX.data);
        minusT.yMinusX = new FieldElement(this.yPlusX.data);
        minusT.xy2d = new FieldElement(this.xy2d.data);
        minusT.xy2d.neg();

        this.cMove(minusT, bNegative);
    }

    /**
     * Negative returns 1 if b < 0 and 0 otherwise.
     * @param b The b.
     * @returns 1 if b < 0 and 0
     */
    private negative(b: number): number {
        return (b >> 31) & 1;
    }

    /**
     * Equal returns 1 if b == c and 0 otherwise, assuming that b and c are
     * non-negative.
     * @param b The b.
     * @param c the c.
     * @returns 1 if b == c and 0
     */
    private equal(b: number, c: number): number {
        let x = (b ^ c) & 0xFFFFFFFF;
        x--;
        return Math.abs(x >> 31);
    }
}
