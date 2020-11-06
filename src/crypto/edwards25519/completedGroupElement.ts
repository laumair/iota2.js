/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
import { CachedGroupElement } from "./cachedGroupElement";
import { ExtendedGroupElement } from "./extendedGroupElement";
import { FieldElement } from "./fieldElement";
import { PreComputedGroupElement } from "./preComputedGroupElement";
import { ProjectiveGroupElement } from "./projectiveGroupElement";

/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * CompletedGroupElement: ((X:Z),(Y:T)) satisfying x=X/Z, y=Y/T
 */
export class CompletedGroupElement {
    /**
     * The X element.
     */
    public X: FieldElement;

    /**
     * The Y Element.
     */
    public Y: FieldElement;

    /**
     * The Z Element.
     */
    public Z: FieldElement;

    /**
     * The T Element.
     */
    public T: FieldElement;

    /**
     * Create a new instance of CompletedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    constructor(X?: FieldElement, Y?: FieldElement, Z?: FieldElement, T?: FieldElement) {
        this.X = X ?? new FieldElement();
        this.Y = Y ?? new FieldElement();
        this.Z = Z ?? new FieldElement();
        this.T = T ?? new FieldElement();
    }

    /**
     * Group Element add
     * @param p The extended group element.
     * @param q The cached group element.
     */
    public add(p: ExtendedGroupElement, q: CachedGroupElement): void {
        const t0 = new FieldElement();

        this.X.add(p.Y, p.X);
        this.Y.sub(p.Y, p.X);
        this.Z.mul(this.X, q.yPlusX);
        this.Y.mul(this.Y, q.yMinusX);
        this.T.mul(q.T2d, p.T);
        this.X.mul(p.Z, q.Z);
        t0.add(this.X, this.X);
        this.X.sub(this.Z, this.Y);
        this.Y.add(this.Z, this.Y);
        this.Z.add(t0, this.T);
        this.T.sub(t0, this.T);
    }

    /**
     * Group Element substract.
     * @param p The p.
     * @param q The q.
     */
    public sub(p: ExtendedGroupElement, q: CachedGroupElement): void {
        const t0 = new FieldElement();

        this.X.add(p.Y, p.X);
        this.Y.sub(p.Y, p.X);
        this.Z.mul(this.X, q.yMinusX);
        this.Y.mul(this.Y, q.yPlusX);
        this.T.mul(q.T2d, p.T);
        this.X.mul(p.Z, q.Z);
        t0.add(this.X, this.X);
        this.X.sub(this.Z, this.Y);
        this.Y.add(this.Z, this.Y);
        this.Z.sub(t0, this.T);
        this.T.add(t0, this.T);
    }

    /**
     * Mixed add.
     * @param p The p.
     * @param q The q.
     */
    public mixedAdd(p: ExtendedGroupElement, q: PreComputedGroupElement): void {
        const t0 = new FieldElement();

        this.X.add(p.Y, p.X);
        this.Y.sub(p.Y, p.X);
        this.Z.mul(this.X, q.yPlusX);
        this.Y.mul(this.Y, q.yMinusX);
        this.T.mul(q.xy2d, p.T);
        t0.add(p.Z, p.Z);
        this.X.sub(this.Z, this.Y);
        this.Y.add(this.Z, this.Y);
        this.Z.add(t0, this.T);
        this.T.sub(t0, this.T);
    }

    /**
     * Mixed subtract.
     * @param p The p.
     * @param q The q.
     */
    public mixedSub(p: ExtendedGroupElement, q: PreComputedGroupElement): void {
        const t0 = new FieldElement();

        this.X.add(p.Y, p.X);
        this.Y.sub(p.Y, p.X);
        this.Z.mul(this.X, q.yMinusX);
        this.Y.mul(this.Y, q.yPlusX);
        this.T.mul(q.xy2d, p.T);
        t0.add(p.Z, p.Z);
        this.X.sub(this.Z, this.Y);
        this.Y.add(this.Z, this.Y);
        this.Z.sub(t0, this.T);
        this.T.add(t0, this.T);
    }

    /**
     * Convert to projective element.
     * @param p The projective element to fill.
     */
    public toProjective(p: ProjectiveGroupElement): void {
        p.X.mul(this.X, this.T);
        p.Y.mul(this.Y, this.Z);
        p.Z.mul(this.Z, this.T);
    }

    /**
     * Convert to extended element.
     * @param e The extended element to fill.
     */
    public toExtended(e: ExtendedGroupElement): void {
        e.X.mul(this.X, this.T);
        e.Y.mul(this.Y, this.Z);
        e.Z.mul(this.Z, this.T);
        e.T.mul(this.X, this.Y);
    }
}

