/* eslint-disable max-len */
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
import { BIG_ARR, BIG_136657, BIG_1_SHIFTL_20, BIG_2097151, BIG_470296, BIG_654183, BIG_666643, BIG_683901, BIG_997805, load3BytesBigInt, load4BytesBigInt } from "./common";
import { CONST_ORDER } from "./const";

/**
 * The scalars are GF(2^252 + 27742317777372353535851937790883648493).
 *
 * Input:
 *   a[0]+256*a[1]+...+256^31*a[31] = a
 *   b[0]+256*b[1]+...+256^31*b[31] = b
 *   c[0]+256*c[1]+...+256^31*c[31] = c
 *
 * Output:
 *   s[0]+256*s[1]+...+256^31*s[31] = (ab+c) mod l
 *   where l = 2^252 + 27742317777372353535851937790883648493.
 * @param s The scalar.
 * @param a The a.
 * @param b The b.
 * @param c The c.
 */
export function scalarMulAdd(s: Uint8Array, a: Uint8Array, b: Uint8Array, c: Uint8Array): void {
    const a0 = BIG_2097151 & load3BytesBigInt(a, 0);
    const a1 = BIG_2097151 & (load4BytesBigInt(a, 2) >> BIG_ARR[5]);
    const a2 = BIG_2097151 & (load3BytesBigInt(a, 5) >> BIG_ARR[2]);
    const a3 = BIG_2097151 & (load4BytesBigInt(a, 7) >> BIG_ARR[7]);
    const a4 = BIG_2097151 & (load4BytesBigInt(a, 10) >> BIG_ARR[4]);
    const a5 = BIG_2097151 & (load3BytesBigInt(a, 13) >> BIG_ARR[1]);
    const a6 = BIG_2097151 & (load4BytesBigInt(a, 15) >> BIG_ARR[6]);
    const a7 = BIG_2097151 & (load3BytesBigInt(a, 18) >> BIG_ARR[3]);
    const a8 = BIG_2097151 & load3BytesBigInt(a, 21);
    const a9 = BIG_2097151 & (load4BytesBigInt(a, 23) >> BIG_ARR[5]);
    const a10 = BIG_2097151 & (load3BytesBigInt(a, 26) >> BIG_ARR[2]);
    const a11 = (load4BytesBigInt(a, 28) >> BIG_ARR[7]);
    const b0 = BIG_2097151 & load3BytesBigInt(b, 0);
    const b1 = BIG_2097151 & (load4BytesBigInt(b, 2) >> BIG_ARR[5]);
    const b2 = BIG_2097151 & (load3BytesBigInt(b, 5) >> BIG_ARR[2]);
    const b3 = BIG_2097151 & (load4BytesBigInt(b, 7) >> BIG_ARR[7]);
    const b4 = BIG_2097151 & (load4BytesBigInt(b, 10) >> BIG_ARR[4]);
    const b5 = BIG_2097151 & (load3BytesBigInt(b, 13) >> BIG_ARR[1]);
    const b6 = BIG_2097151 & (load4BytesBigInt(b, 15) >> BIG_ARR[6]);
    const b7 = BIG_2097151 & (load3BytesBigInt(b, 18) >> BIG_ARR[3]);
    const b8 = BIG_2097151 & load3BytesBigInt(b, 21);
    const b9 = BIG_2097151 & (load4BytesBigInt(b, 23) >> BIG_ARR[5]);
    const b10 = BIG_2097151 & (load3BytesBigInt(b, 26) >> BIG_ARR[2]);
    const b11 = (load4BytesBigInt(b, 28) >> BIG_ARR[7]);
    const c0 = BIG_2097151 & load3BytesBigInt(c, 0);
    const c1 = BIG_2097151 & (load4BytesBigInt(c, 2) >> BIG_ARR[5]);
    const c2 = BIG_2097151 & (load3BytesBigInt(c, 5) >> BIG_ARR[2]);
    const c3 = BIG_2097151 & (load4BytesBigInt(c, 7) >> BIG_ARR[7]);
    const c4 = BIG_2097151 & (load4BytesBigInt(c, 10) >> BIG_ARR[4]);
    const c5 = BIG_2097151 & (load3BytesBigInt(c, 13) >> BIG_ARR[1]);
    const c6 = BIG_2097151 & (load4BytesBigInt(c, 15) >> BIG_ARR[6]);
    const c7 = BIG_2097151 & (load3BytesBigInt(c, 18) >> BIG_ARR[3]);
    const c8 = BIG_2097151 & load3BytesBigInt(c, 21);
    const c9 = BIG_2097151 & (load4BytesBigInt(c, 23) >> BIG_ARR[5]);
    const c10 = BIG_2097151 & (load3BytesBigInt(c, 26) >> BIG_ARR[2]);
    const c11 = (load4BytesBigInt(c, 28) >> BIG_ARR[7]);

    const carry = new BigInt64Array(32);

    let s0 = c0 + (a0 * b0);
    let s1 = c1 + (a0 * b1) + (a1 * b0);
    let s2 = c2 + (a0 * b2) + (a1 * b1) + (a2 * b0);
    let s3 = c3 + (a0 * b3) + (a1 * b2) + (a2 * b1) + (a3 * b0);
    let s4 = c4 + (a0 * b4) + (a1 * b3) + (a2 * b2) + (a3 * b1) + (a4 * b0);
    let s5 = c5 + (a0 * b5) + (a1 * b4) + (a2 * b3) + (a3 * b2) + (a4 * b1) + (a5 * b0);
    let s6 = c6 + (a0 * b6) + (a1 * b5) + (a2 * b4) + (a3 * b3) + (a4 * b2) + (a5 * b1) + (a6 * b0);
    let s7 = c7 + (a0 * b7) + (a1 * b6) + (a2 * b5) + (a3 * b4) + (a4 * b3) + (a5 * b2) + (a6 * b1) + (a7 * b0);
    let s8 = c8 + (a0 * b8) + (a1 * b7) + (a2 * b6) + (a3 * b5) + (a4 * b4) + (a5 * b3) + (a6 * b2) + (a7 * b1) + (a8 * b0);
    let s9 = c9 + (a0 * b9) + (a1 * b8) + (a2 * b7) + (a3 * b6) + (a4 * b5) + (a5 * b4) + (a6 * b3) + (a7 * b2) + (a8 * b1) + (a9 * b0);
    let s10 = c10 + (a0 * b10) + (a1 * b9) + (a2 * b8) + (a3 * b7) + (a4 * b6) + (a5 * b5) + (a6 * b4) + (a7 * b3) + (a8 * b2) + (a9 * b1) + (a10 * b0);
    let s11 = c11 + (a0 * b11) + (a1 * b10) + (a2 * b9) + (a3 * b8) + (a4 * b7) + (a5 * b6) + (a6 * b5) + (a7 * b4) + (a8 * b3) + (a9 * b2) + (a10 * b1) + (a11 * b0);
    let s12 = (a1 * b11) + (a2 * b10) + (a3 * b9) + (a4 * b8) + (a5 * b7) + (a6 * b6) + (a7 * b5) + (a8 * b4) + (a9 * b3) + (a10 * b2) + (a11 * b1);
    let s13 = (a2 * b11) + (a3 * b10) + (a4 * b9) + (a5 * b8) + (a6 * b7) + (a7 * b6) + (a8 * b5) + (a9 * b4) + (a10 * b3) + (a11 * b2);
    let s14 = (a3 * b11) + (a4 * b10) + (a5 * b9) + (a6 * b8) + (a7 * b7) + (a8 * b6) + (a9 * b5) + (a10 * b4) + (a11 * b3);
    let s15 = (a4 * b11) + (a5 * b10) + (a6 * b9) + (a7 * b8) + (a8 * b7) + (a9 * b6) + (a10 * b5) + (a11 * b4);
    let s16 = (a5 * b11) + (a6 * b10) + (a7 * b9) + (a8 * b8) + (a9 * b7) + (a10 * b6) + (a11 * b5);
    let s17 = (a6 * b11) + (a7 * b10) + (a8 * b9) + (a9 * b8) + (a10 * b7) + (a11 * b6);
    let s18 = (a7 * b11) + (a8 * b10) + (a9 * b9) + (a10 * b8) + (a11 * b7);
    let s19 = (a8 * b11) + (a9 * b10) + (a10 * b9) + (a11 * b8);
    let s20 = (a9 * b11) + (a10 * b10) + (a11 * b9);
    let s21 = (a10 * b11) + (a11 * b10);
    let s22 = (a11 * b11);
    let s23 = BIG_ARR[0];

    carry[0] = (s0 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[2] = (s2 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[4] = (s4 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[6] = (s6 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[8] = (s8 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[10] = (s10 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];
    carry[12] = (s12 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s13 += carry[12];
    s12 -= carry[12] << BIG_ARR[21];
    carry[14] = (s14 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s15 += carry[14];
    s14 -= carry[14] << BIG_ARR[21];
    carry[16] = (s16 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s17 += carry[16];
    s16 -= carry[16] << BIG_ARR[21];
    carry[18] = (s18 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s19 += carry[18];
    s18 -= carry[18] << BIG_ARR[21];
    carry[20] = (s20 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s21 += carry[20];
    s20 -= carry[20] << BIG_ARR[21];
    carry[22] = (s22 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s23 += carry[22];
    s22 -= carry[22] << BIG_ARR[21];

    carry[1] = (s1 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[3] = (s3 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[5] = (s5 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[7] = (s7 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[9] = (s9 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[11] = (s11 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];
    carry[13] = (s13 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s14 += carry[13];
    s13 -= carry[13] << BIG_ARR[21];
    carry[15] = (s15 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s16 += carry[15];
    s15 -= carry[15] << BIG_ARR[21];
    carry[17] = (s17 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s18 += carry[17];
    s17 -= carry[17] << BIG_ARR[21];
    carry[19] = (s19 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s20 += carry[19];
    s19 -= carry[19] << BIG_ARR[21];
    carry[21] = (s21 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s22 += carry[21];
    s21 -= carry[21] << BIG_ARR[21];

    s11 += s23 * BIG_666643;
    s12 += s23 * BIG_470296;
    s13 += s23 * BIG_654183;
    s14 -= s23 * BIG_997805;
    s15 += s23 * BIG_136657;
    s16 -= s23 * BIG_683901;
    s23 = BIG_ARR[0];

    s10 += s22 * BIG_666643;
    s11 += s22 * BIG_470296;
    s12 += s22 * BIG_654183;
    s13 -= s22 * BIG_997805;
    s14 += s22 * BIG_136657;
    s15 -= s22 * BIG_683901;
    s22 = BIG_ARR[0];

    s9 += s21 * BIG_666643;
    s10 += s21 * BIG_470296;
    s11 += s21 * BIG_654183;
    s12 -= s21 * BIG_997805;
    s13 += s21 * BIG_136657;
    s14 -= s21 * BIG_683901;
    s21 = BIG_ARR[0];

    s8 += s20 * BIG_666643;
    s9 += s20 * BIG_470296;
    s10 += s20 * BIG_654183;
    s11 -= s20 * BIG_997805;
    s12 += s20 * BIG_136657;
    s13 -= s20 * BIG_683901;
    s20 = BIG_ARR[0];

    s7 += s19 * BIG_666643;
    s8 += s19 * BIG_470296;
    s9 += s19 * BIG_654183;
    s10 -= s19 * BIG_997805;
    s11 += s19 * BIG_136657;
    s12 -= s19 * BIG_683901;
    s19 = BIG_ARR[0];

    s6 += s18 * BIG_666643;
    s7 += s18 * BIG_470296;
    s8 += s18 * BIG_654183;
    s9 -= s18 * BIG_997805;
    s10 += s18 * BIG_136657;
    s11 -= s18 * BIG_683901;
    s18 = BIG_ARR[0];

    carry[6] = (s6 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[8] = (s8 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[10] = (s10 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];
    carry[12] = (s12 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s13 += carry[12];
    s12 -= carry[12] << BIG_ARR[21];
    carry[14] = (s14 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s15 += carry[14];
    s14 -= carry[14] << BIG_ARR[21];
    carry[16] = (s16 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s17 += carry[16];
    s16 -= carry[16] << BIG_ARR[21];

    carry[7] = (s7 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[9] = (s9 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[11] = (s11 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];
    carry[13] = (s13 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s14 += carry[13];
    s13 -= carry[13] << BIG_ARR[21];
    carry[15] = (s15 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s16 += carry[15];
    s15 -= carry[15] << BIG_ARR[21];

    s5 += s17 * BIG_666643;
    s6 += s17 * BIG_470296;
    s7 += s17 * BIG_654183;
    s8 -= s17 * BIG_997805;
    s9 += s17 * BIG_136657;
    s10 -= s17 * BIG_683901;
    s17 = BIG_ARR[0];

    s4 += s16 * BIG_666643;
    s5 += s16 * BIG_470296;
    s6 += s16 * BIG_654183;
    s7 -= s16 * BIG_997805;
    s8 += s16 * BIG_136657;
    s9 -= s16 * BIG_683901;
    s16 = BIG_ARR[0];

    s3 += s15 * BIG_666643;
    s4 += s15 * BIG_470296;
    s5 += s15 * BIG_654183;
    s6 -= s15 * BIG_997805;
    s7 += s15 * BIG_136657;
    s8 -= s15 * BIG_683901;
    s15 = BIG_ARR[0];

    s2 += s14 * BIG_666643;
    s3 += s14 * BIG_470296;
    s4 += s14 * BIG_654183;
    s5 -= s14 * BIG_997805;
    s6 += s14 * BIG_136657;
    s7 -= s14 * BIG_683901;
    s14 = BIG_ARR[0];

    s1 += s13 * BIG_666643;
    s2 += s13 * BIG_470296;
    s3 += s13 * BIG_654183;
    s4 -= s13 * BIG_997805;
    s5 += s13 * BIG_136657;
    s6 -= s13 * BIG_683901;
    s13 = BIG_ARR[0];

    s0 += s12 * BIG_666643;
    s1 += s12 * BIG_470296;
    s2 += s12 * BIG_654183;
    s3 -= s12 * BIG_997805;
    s4 += s12 * BIG_136657;
    s5 -= s12 * BIG_683901;
    s12 = BIG_ARR[0];

    carry[0] = (s0 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[2] = (s2 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[4] = (s4 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[6] = (s6 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[8] = (s8 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[10] = (s10 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];

    carry[1] = (s1 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[3] = (s3 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[5] = (s5 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[7] = (s7 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[9] = (s9 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[11] = (s11 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];

    s0 += s12 * BIG_666643;
    s1 += s12 * BIG_470296;
    s2 += s12 * BIG_654183;
    s3 -= s12 * BIG_997805;
    s4 += s12 * BIG_136657;
    s5 -= s12 * BIG_683901;
    s12 = BIG_ARR[0];

    carry[0] = s0 >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[1] = s1 >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[2] = s2 >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[3] = s3 >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[4] = s4 >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[5] = s5 >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[6] = s6 >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[7] = s7 >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[8] = s8 >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[9] = s9 >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[10] = s10 >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];
    carry[11] = s11 >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];

    s0 += s12 * BIG_666643;
    s1 += s12 * BIG_470296;
    s2 += s12 * BIG_654183;
    s3 -= s12 * BIG_997805;
    s4 += s12 * BIG_136657;
    s5 -= s12 * BIG_683901;
    s12 = BIG_ARR[0];

    carry[0] = s0 >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[1] = s1 >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[2] = s2 >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[3] = s3 >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[4] = s4 >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[5] = s5 >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[6] = s6 >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[7] = s7 >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[8] = s8 >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[9] = s9 >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[10] = s10 >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];

    s[0] = Number(s0 >> BIG_ARR[0]);
    s[1] = Number(s0 >> BIG_ARR[8]);
    s[2] = Number((s0 >> BIG_ARR[16]) | (s1 << BIG_ARR[5]));
    s[3] = Number(s1 >> BIG_ARR[3]);
    s[4] = Number(s1 >> BIG_ARR[11]);
    s[5] = Number((s1 >> BIG_ARR[19]) | (s2 << BIG_ARR[2]));
    s[6] = Number(s2 >> BIG_ARR[6]);
    s[7] = Number((s2 >> BIG_ARR[14]) | (s3 << BIG_ARR[7]));
    s[8] = Number(s3 >> BIG_ARR[1]);
    s[9] = Number(s3 >> BIG_ARR[9]);
    s[10] = Number((s3 >> BIG_ARR[17]) | (s4 << BIG_ARR[4]));
    s[11] = Number(s4 >> BIG_ARR[4]);
    s[12] = Number(s4 >> BIG_ARR[12]);
    s[13] = Number((s4 >> BIG_ARR[20]) | (s5 << BIG_ARR[1]));
    s[14] = Number(s5 >> BIG_ARR[7]);
    s[15] = Number((s5 >> BIG_ARR[15]) | (s6 << BIG_ARR[6]));
    s[16] = Number(s6 >> BIG_ARR[2]);
    s[17] = Number(s6 >> BIG_ARR[10]);
    s[18] = Number((s6 >> BIG_ARR[18]) | (s7 << BIG_ARR[3]));
    s[19] = Number(s7 >> BIG_ARR[5]);
    s[20] = Number(s7 >> BIG_ARR[13]);
    s[21] = Number(s8 >> BIG_ARR[0]);
    s[22] = Number(s8 >> BIG_ARR[8]);
    s[23] = Number((s8 >> BIG_ARR[16]) | (s9 << BIG_ARR[5]));
    s[24] = Number(s9 >> BIG_ARR[3]);
    s[25] = Number(s9 >> BIG_ARR[11]);
    s[26] = Number((s9 >> BIG_ARR[19]) | (s10 << BIG_ARR[2]));
    s[27] = Number(s10 >> BIG_ARR[6]);
    s[28] = Number((s10 >> BIG_ARR[14]) | (s11 << BIG_ARR[7]));
    s[29] = Number(s11 >> BIG_ARR[1]);
    s[30] = Number(s11 >> BIG_ARR[9]);
    s[31] = Number(s11 >> BIG_ARR[17]);
}

/**
 * Scalar reduce.
 * where l = 2^252 + 27742317777372353535851937790883648493.
 * @param out s[0]+256*s[1]+...+256^31*s[31] = s mod l
 * @param s s[0]+256*s[1]+...+256^63*s[63] = s
 */
export function scalarReduce(out: Uint8Array, s: Uint8Array): void {
    let s0 = BIG_2097151 & load3BytesBigInt(s, 0);
    let s1 = BIG_2097151 & (load4BytesBigInt(s, 2) >> BIG_ARR[5]);
    let s2 = BIG_2097151 & (load3BytesBigInt(s, 5) >> BIG_ARR[2]);
    let s3 = BIG_2097151 & (load4BytesBigInt(s, 7) >> BIG_ARR[7]);
    let s4 = BIG_2097151 & (load4BytesBigInt(s, 10) >> BIG_ARR[4]);
    let s5 = BIG_2097151 & (load3BytesBigInt(s, 13) >> BIG_ARR[1]);
    let s6 = BIG_2097151 & (load4BytesBigInt(s, 15) >> BIG_ARR[6]);
    let s7 = BIG_2097151 & (load3BytesBigInt(s, 18) >> BIG_ARR[3]);
    let s8 = BIG_2097151 & load3BytesBigInt(s, 21);
    let s9 = BIG_2097151 & (load4BytesBigInt(s, 23) >> BIG_ARR[5]);
    let s10 = BIG_2097151 & (load3BytesBigInt(s, 26) >> BIG_ARR[2]);
    let s11 = BIG_2097151 & (load4BytesBigInt(s, 28) >> BIG_ARR[7]);
    let s12 = BIG_2097151 & (load4BytesBigInt(s, 31) >> BIG_ARR[4]);
    let s13 = BIG_2097151 & (load3BytesBigInt(s, 34) >> BIG_ARR[1]);
    let s14 = BIG_2097151 & (load4BytesBigInt(s, 36) >> BIG_ARR[6]);
    let s15 = BIG_2097151 & (load3BytesBigInt(s, 39) >> BIG_ARR[3]);
    let s16 = BIG_2097151 & load3BytesBigInt(s, 42);
    let s17 = BIG_2097151 & (load4BytesBigInt(s, 44) >> BIG_ARR[5]);
    let s18 = BIG_2097151 & (load3BytesBigInt(s, 47) >> BIG_ARR[2]);
    let s19 = BIG_2097151 & (load4BytesBigInt(s, 49) >> BIG_ARR[7]);
    let s20 = BIG_2097151 & (load4BytesBigInt(s, 52) >> BIG_ARR[4]);
    let s21 = BIG_2097151 & (load3BytesBigInt(s, 55) >> BIG_ARR[1]);
    let s22 = BIG_2097151 & (load4BytesBigInt(s, 57) >> BIG_ARR[6]);
    let s23 = (load4BytesBigInt(s, 60) >> BIG_ARR[3]);

    s11 += s23 * BIG_666643;
    s12 += s23 * BIG_470296;
    s13 += s23 * BIG_654183;
    s14 -= s23 * BIG_997805;
    s15 += s23 * BIG_136657;
    s16 -= s23 * BIG_683901;
    s23 = BIG_ARR[0];

    s10 += s22 * BIG_666643;
    s11 += s22 * BIG_470296;
    s12 += s22 * BIG_654183;
    s13 -= s22 * BIG_997805;
    s14 += s22 * BIG_136657;
    s15 -= s22 * BIG_683901;
    s22 = BIG_ARR[0];

    s9 += s21 * BIG_666643;
    s10 += s21 * BIG_470296;
    s11 += s21 * BIG_654183;
    s12 -= s21 * BIG_997805;
    s13 += s21 * BIG_136657;
    s14 -= s21 * BIG_683901;
    s21 = BIG_ARR[0];

    s8 += s20 * BIG_666643;
    s9 += s20 * BIG_470296;
    s10 += s20 * BIG_654183;
    s11 -= s20 * BIG_997805;
    s12 += s20 * BIG_136657;
    s13 -= s20 * BIG_683901;
    s20 = BIG_ARR[0];

    s7 += s19 * BIG_666643;
    s8 += s19 * BIG_470296;
    s9 += s19 * BIG_654183;
    s10 -= s19 * BIG_997805;
    s11 += s19 * BIG_136657;
    s12 -= s19 * BIG_683901;
    s19 = BIG_ARR[0];

    s6 += s18 * BIG_666643;
    s7 += s18 * BIG_470296;
    s8 += s18 * BIG_654183;
    s9 -= s18 * BIG_997805;
    s10 += s18 * BIG_136657;
    s11 -= s18 * BIG_683901;
    s18 = BIG_ARR[0];

    const carry = new BigInt64Array(17);

    carry[6] = (s6 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[8] = (s8 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[10] = (s10 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];
    carry[12] = (s12 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s13 += carry[12];
    s12 -= carry[12] << BIG_ARR[21];
    carry[14] = (s14 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s15 += carry[14];
    s14 -= carry[14] << BIG_ARR[21];
    carry[16] = (s16 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s17 += carry[16];
    s16 -= carry[16] << BIG_ARR[21];

    carry[7] = (s7 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[9] = (s9 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[11] = (s11 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];
    carry[13] = (s13 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s14 += carry[13];
    s13 -= carry[13] << BIG_ARR[21];
    carry[15] = (s15 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s16 += carry[15];
    s15 -= carry[15] << BIG_ARR[21];

    s5 += s17 * BIG_666643;
    s6 += s17 * BIG_470296;
    s7 += s17 * BIG_654183;
    s8 -= s17 * BIG_997805;
    s9 += s17 * BIG_136657;
    s10 -= s17 * BIG_683901;
    s17 = BIG_ARR[0];

    s4 += s16 * BIG_666643;
    s5 += s16 * BIG_470296;
    s6 += s16 * BIG_654183;
    s7 -= s16 * BIG_997805;
    s8 += s16 * BIG_136657;
    s9 -= s16 * BIG_683901;
    s16 = BIG_ARR[0];

    s3 += s15 * BIG_666643;
    s4 += s15 * BIG_470296;
    s5 += s15 * BIG_654183;
    s6 -= s15 * BIG_997805;
    s7 += s15 * BIG_136657;
    s8 -= s15 * BIG_683901;
    s15 = BIG_ARR[0];

    s2 += s14 * BIG_666643;
    s3 += s14 * BIG_470296;
    s4 += s14 * BIG_654183;
    s5 -= s14 * BIG_997805;
    s6 += s14 * BIG_136657;
    s7 -= s14 * BIG_683901;
    s14 = BIG_ARR[0];

    s1 += s13 * BIG_666643;
    s2 += s13 * BIG_470296;
    s3 += s13 * BIG_654183;
    s4 -= s13 * BIG_997805;
    s5 += s13 * BIG_136657;
    s6 -= s13 * BIG_683901;
    s13 = BIG_ARR[0];

    s0 += s12 * BIG_666643;
    s1 += s12 * BIG_470296;
    s2 += s12 * BIG_654183;
    s3 -= s12 * BIG_997805;
    s4 += s12 * BIG_136657;
    s5 -= s12 * BIG_683901;
    s12 = BIG_ARR[0];

    carry[0] = (s0 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[2] = (s2 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[4] = (s4 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[6] = (s6 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[8] = (s8 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[10] = (s10 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];

    carry[1] = (s1 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[3] = (s3 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[5] = (s5 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[7] = (s7 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[9] = (s9 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[11] = (s11 + BIG_1_SHIFTL_20) >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];

    s0 += s12 * BIG_666643;
    s1 += s12 * BIG_470296;
    s2 += s12 * BIG_654183;
    s3 -= s12 * BIG_997805;
    s4 += s12 * BIG_136657;
    s5 -= s12 * BIG_683901;
    s12 = BIG_ARR[0];

    carry[0] = s0 >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[1] = s1 >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[2] = s2 >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[3] = s3 >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[4] = s4 >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[5] = s5 >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[6] = s6 >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[7] = s7 >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[8] = s8 >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[9] = s9 >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[10] = s10 >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];
    carry[11] = s11 >> BIG_ARR[21];
    s12 += carry[11];
    s11 -= carry[11] << BIG_ARR[21];

    s0 += s12 * BIG_666643;
    s1 += s12 * BIG_470296;
    s2 += s12 * BIG_654183;
    s3 -= s12 * BIG_997805;
    s4 += s12 * BIG_136657;
    s5 -= s12 * BIG_683901;
    s12 = BIG_ARR[0];

    carry[0] = s0 >> BIG_ARR[21];
    s1 += carry[0];
    s0 -= carry[0] << BIG_ARR[21];
    carry[1] = s1 >> BIG_ARR[21];
    s2 += carry[1];
    s1 -= carry[1] << BIG_ARR[21];
    carry[2] = s2 >> BIG_ARR[21];
    s3 += carry[2];
    s2 -= carry[2] << BIG_ARR[21];
    carry[3] = s3 >> BIG_ARR[21];
    s4 += carry[3];
    s3 -= carry[3] << BIG_ARR[21];
    carry[4] = s4 >> BIG_ARR[21];
    s5 += carry[4];
    s4 -= carry[4] << BIG_ARR[21];
    carry[5] = s5 >> BIG_ARR[21];
    s6 += carry[5];
    s5 -= carry[5] << BIG_ARR[21];
    carry[6] = s6 >> BIG_ARR[21];
    s7 += carry[6];
    s6 -= carry[6] << BIG_ARR[21];
    carry[7] = s7 >> BIG_ARR[21];
    s8 += carry[7];
    s7 -= carry[7] << BIG_ARR[21];
    carry[8] = s8 >> BIG_ARR[21];
    s9 += carry[8];
    s8 -= carry[8] << BIG_ARR[21];
    carry[9] = s9 >> BIG_ARR[21];
    s10 += carry[9];
    s9 -= carry[9] << BIG_ARR[21];
    carry[10] = s10 >> BIG_ARR[21];
    s11 += carry[10];
    s10 -= carry[10] << BIG_ARR[21];

    out[0] = Number(s0 >> BIG_ARR[0]);
    out[1] = Number(s0 >> BIG_ARR[8]);
    out[2] = Number((s0 >> BIG_ARR[16]) | (s1 << BIG_ARR[5]));
    out[3] = Number(s1 >> BIG_ARR[3]);
    out[4] = Number(s1 >> BIG_ARR[11]);
    out[5] = Number((s1 >> BIG_ARR[19]) | (s2 << BIG_ARR[2]));
    out[6] = Number(s2 >> BIG_ARR[6]);
    out[7] = Number((s2 >> BIG_ARR[14]) | (s3 << BIG_ARR[7]));
    out[8] = Number(s3 >> BIG_ARR[1]);
    out[9] = Number(s3 >> BIG_ARR[9]);
    out[10] = Number((s3 >> BIG_ARR[17]) | (s4 << BIG_ARR[4]));
    out[11] = Number(s4 >> BIG_ARR[4]);
    out[12] = Number(s4 >> BIG_ARR[12]);
    out[13] = Number((s4 >> BIG_ARR[20]) | (s5 << BIG_ARR[1]));
    out[14] = Number(s5 >> BIG_ARR[7]);
    out[15] = Number((s5 >> BIG_ARR[15]) | (s6 << BIG_ARR[6]));
    out[16] = Number(s6 >> BIG_ARR[2]);
    out[17] = Number(s6 >> BIG_ARR[10]);
    out[18] = Number((s6 >> BIG_ARR[18]) | (s7 << BIG_ARR[3]));
    out[19] = Number(s7 >> BIG_ARR[5]);
    out[20] = Number(s7 >> BIG_ARR[13]);
    out[21] = Number(s8 >> BIG_ARR[0]);
    out[22] = Number(s8 >> BIG_ARR[8]);
    out[23] = Number((s8 >> BIG_ARR[16]) | (s9 << BIG_ARR[5]));
    out[24] = Number(s9 >> BIG_ARR[3]);
    out[25] = Number(s9 >> BIG_ARR[11]);
    out[26] = Number((s9 >> BIG_ARR[19]) | (s10 << BIG_ARR[2]));
    out[27] = Number(s10 >> BIG_ARR[6]);
    out[28] = Number((s10 >> BIG_ARR[14]) | (s11 << BIG_ARR[7]));
    out[29] = Number(s11 >> BIG_ARR[1]);
    out[30] = Number(s11 >> BIG_ARR[9]);
    out[31] = Number(s11 >> BIG_ARR[17]);
}

/**
 * Scalar Minimal returns true if the given scalar is less than the order of the Curve
 * @param scalar The scalar.
 * @returns True if the given scalar is less than the order of the Curve
 */
export function scalarMinimal(scalar: Uint8Array): boolean {
    const bigArray = new DataView(scalar.buffer);
    for (let i = 3; i >= 0; i--) {
        const v = bigArray.getBigUint64(i * 8, true);

        if (v > CONST_ORDER[i]) {
            return false;
        } else if (v < CONST_ORDER[i]) {
            break;
        } else if (i === 0) {
            return false;
        }
    }

    return true;
}

