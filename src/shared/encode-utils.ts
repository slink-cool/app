const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function strToBytes(str: string): Uint8Array {
  return encoder.encode(str);
}

export function strFromBytes(bytes: Uint8Array): string {
  return decoder.decode(bytes);
}

export function strToBase64(str: string): string {
  return btoa(str).replaceAll('=', '');
}

export function strFromBase64(base64: string): string {
  return atob(base64);
}

export function bytesToBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64').replaceAll('=', '');
}

export function bytesFromBase64(base64: string): Uint8Array {
  return Buffer.from(base64, 'base64');
}

export function jsonStringifyToBase64<T>(t: T): string {
  const json = JSON.stringify(t);
  return strToBase64(json);
}

export function jsonParseFromBase64<T>(base64: string): T {
  const payload = strFromBase64(base64);
  return JSON.parse(payload) as T;
}
