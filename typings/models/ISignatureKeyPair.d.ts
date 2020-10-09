/// <reference types="node" />
/**
 * Definition of signature key pair.
 */
export interface ISignatureKeyPair {
    /**
     * The public key.
     */
    publicKey: Buffer;
    /**
     * The private key.
     */
    secretKey: Buffer;
}
