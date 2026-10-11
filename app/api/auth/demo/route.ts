import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { createSessionToken } from '@/lib/auth/jwt';
import { INITIAL_USERS } from '@/lib/store/localStore';
import type { Role, SessionUser } from '@/lib/types/auth';
import { z } from 'zod';

const demoRoles = [
  'ADMIN_BIOWATT',
  'STATE',
  'COLLECTIVITY',
  'FEEDSTOCK_OWNER',
  'BIOGAS_OPERATOR',
] as const satisfies readonly Role[];

const demoLoginSchema = z.object({ role: z.enum(demoRoles) });

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const parsed = demoLoginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Profil de démonstration invalide.' }, { status: 400 });
  }

  const demoUser = INITIAL_USERS.find((user) => user.role === parsed.data.role);
  if (!demoUser) {
    return NextResponse.json({ error: 'Profil de démonstration introuvable.' }, { status: 404 });
  }

  let sessionUser: SessionUser;

  try {
    const databaseUser = await prisma.user.findUnique({
      where: { email: demoUser.email },
      include: { organization: true },
    });

    if (databaseUser) {
      if (databaseUser.role !== parsed.data.role || databaseUser.status !== 'ACTIVE') {
        return NextResponse.json({ error: 'Ce profil de démonstration est indisponible.' }, { status: 403 });
      }

      sessionUser = {
        id: databaseUser.id,
        email: databaseUser.email,
        firstName: databaseUser.firstName,
        lastName: databaseUser.lastName,
        role: databaseUser.role,
        status: databaseUser.status,
        organizationId: databaseUser.organizationId,
        organizationName: databaseUser.organization?.name ?? null,
      };
    } else {
      sessionUser = demoUser;
    }
  } catch {
    sessionUser = demoUser;
  }

  const token = await createSessionToken(sessionUser);
  const response = NextResponse.json({ success: true, user: sessionUser });

  response.cookies.set({
    name: 'biowatt_session',
    value: token,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 86400,
  });

  return response;
}