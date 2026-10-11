import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { verifyPassword, createSessionToken } from '@/lib/auth/jwt';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données de connexion invalides.' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    let user: Prisma.UserGetPayload<{ include: { organization: true } }> | null;

    try {
      user = await prisma.user.findUnique({
        where: { email },
        include: { organization: true },
      });
    } catch {
      return NextResponse.json(
        { error: 'Le service de connexion est temporairement indisponible.' },
        { status: 503 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { error: 'Ce compte a été suspendu par l\'administration BIOWATT-CI.' },
        { status: 403 }
      );
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      organizationId: user.organizationId || null,
      organizationName: user.organization?.name || null,
    };

    const token = await createSessionToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    response.cookies.set({
      name: 'biowatt_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Une erreur serveur est survenue lors de la connexion.' },
      { status: 500 }
    );
  }
}
