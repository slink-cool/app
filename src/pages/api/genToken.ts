// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Token } from '@shared/auth-utils';
import { supabase } from '@shared/supabaseClient';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

interface AuthResponse {
  token: string;
}

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }
  const strToken = req.body as string;
  const token = Token.parse(strToken);

  if (!token.isValid()) {
    res.status(403);
    return;
  }

  const user = await supabase.from('user').insert({
    id: token.body.sub,
    test: '000',
    created_at: new Date(),
  });

  console.log(user);

  const signedToken = jwt.sign({}, JWT_SECRET, {
    subject: token.body.sub,
    expiresIn: '1h',
  });

  res.send(signedToken);
}
