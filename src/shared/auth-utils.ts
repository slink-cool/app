import { MessageSignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
import { sign } from 'tweetnacl';
import {
  bytesFromBase64,
  bytesToBase64,
  jsonParseFromBase64,
  jsonStringifyToBase64,
  strToBytes,
} from './encode-utils';

interface TokenHeader {
  typ: string;
  alg: string;
}

interface TokenBody {
  sub: string;
  iat: number;
  exp: number;
}

export class Token {
  constructor(
    readonly header: TokenHeader,
    readonly body: TokenBody,
    readonly signature: Uint8Array,
    private readonly headerBase64: string,
    private readonly bodyBase64: string,
    private readonly signatureBase64: string
  ) {}

  static async new(
    publicKey: PublicKey,
    signMessage: MessageSignerWalletAdapterProps['signMessage']
  ): Promise<Token> {
    const nowUtcSeconds = new Date().getTime() / 1000;

    const header = {
      typ: 'JWT',
      alg: 'ed25519',
    };

    const ttlMs = 1 * 60 * 60 * 1000; // 1h

    const body = {
      sub: publicKey.toBase58(),
      iat: Math.round(nowUtcSeconds),
      exp: Math.round(nowUtcSeconds + ttlMs / 1000),
    };

    const headerB64 = jsonStringifyToBase64(header);
    const bodyB64 = jsonStringifyToBase64(body);

    const payload = headerB64 + '.' + bodyB64;

    const signature = await signMessage(strToBytes(payload));

    return new Token(
      header,
      body,
      signature,
      headerB64,
      bodyB64,
      bytesToBase64(signature)
    );
  }

  static parse(jwt: string) {
    const [header, body, signature] = jwt.split('.');

    const token = new Token(
      jsonParseFromBase64(header),
      jsonParseFromBase64(body),
      bytesFromBase64(signature),
      header,
      body,
      signature
    );
    return token;
  }

  isValid() {
    if (!this.isSignatureValid()) {
      return false;
    }
    return !this.isExpired();
  }

  private isSignatureValid(): boolean {
    const msg = this.headerBase64 + '.' + this.bodyBase64;
    const signatureValid = sign.detached.verify(
      strToBytes(msg),
      this.signature,
      new PublicKey(this.body.sub).toBytes()
    );

    return signatureValid;
  }

  private isExpired(): boolean {
    const nowUtcSeconds = new Date().getTime() / 1000;
    const delta = 10;
    return nowUtcSeconds + delta > this.body.exp;
  }

  toString() {
    return (
      this.headerBase64 + '.' + this.bodyBase64 + '.' + this.signatureBase64
    );
  }
}
