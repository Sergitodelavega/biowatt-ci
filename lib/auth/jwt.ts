import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { SessionUser } from '../types/auth';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'biowatt-ci-dev-secret-key-32-chars-long-minimum-secret'
);

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    organizationId: user.organizationId || null,
    organizationName: user.organizationName || null,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.sub as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      role: payload.role as SessionUser['role'],
      status: payload.status as SessionUser['status'],
      organizationId: payload.organizationId as string | null,
      organizationName: payload.organizationName as string | null,
    };
  } catch (err) {
    return null;
  }
}
