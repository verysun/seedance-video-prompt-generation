import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-for-development'
);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    // Session expires in 24 hours
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: 'admin', expires });

    // Save the session in a cookie
    const cookieStore = await cookies();
    cookieStore.set('session', session, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return true;
  }
  return false;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}
