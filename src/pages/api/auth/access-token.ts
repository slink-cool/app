import { WalletToken } from '@shared/auth-utils';
import { supabase } from '@shared/supabase';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

interface AuthResponse {
  token: string;
}

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }
  const { token: tokenStr } = req.body;
  const token = WalletToken.parse(tokenStr);

  if (!token.isValid()) {
    res.status(403);
    return;
  }

  await supabase.from('user').upsert({ id: token.body.sub }).throwOnError();

  const nowUtcSec = Math.round(new Date().getTime() / 1000);
  const ttlSec = 1 * 60 * 60; // 1h

  const accessToken = jwt.sign(
    { role: 'authenticated', sub: token.body.sub, exp: nowUtcSec + ttlSec },
    JWT_SECRET
  );

  setCookie({ res }, 'sb-access-token', accessToken, {
    // httpOnly: true,
    maxAge: ttlSec,
    path: '/',
    secure: true,
    sameSite: 'lax',
  });

  res.json({ token: accessToken });
}
