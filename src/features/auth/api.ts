import ky from 'ky';

export async function requestAccessToken(walletToken: string): Promise<{
  token: string;
}> {
  return ky
    .post('/api/auth/access-token', { json: { token: walletToken } })
    .json();
}
