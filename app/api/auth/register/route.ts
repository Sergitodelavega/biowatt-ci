import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { hashPassword, createSessionToken } from '@/lib/auth/jwt';
import { z } from 'zod';
import { Role, AccountStatus } from '@prisma/client';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().optional(),
  requestedRole: z.enum([
    'STATE',
    'COLLECTIVITY',
    'FEEDSTOCK_OWNER',
    'BIOGAS_OPERATOR',
    'PUBLIC_VISITOR',
  ]),
  organizationName: z.string().optional(),
  territory: z.string().optional(),
  justification: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données d\'inscription invalides.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Cet addresse email est déjà utilisée par un autre compte.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);

    // Determine default status: Institutional / professional roles require ADMIN validation (PENDING)
    const requiresValidation = data.requestedRole !== 'PUBLIC_VISITOR';
    const status: AccountStatus = requiresValidation ? AccountStatus.PENDING : AccountStatus.ACTIVE;

    // Create organization if provided
    let organizationId: string | undefined = undefined;
    if (data.organizationName) {
      const org = await prisma.organization.create({
        data: {
          name: data.organizationName,
          type: data.requestedRole,
          territory: data.territory || null,
        },
      });
      organizationId = org.id;
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || null,
        role: data.requestedRole as Role,
        status,
        organizationId,
        justification: data.justification || null,
      },
      include: { organization: true },
    });

    // Log action for audit
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'REGISTER',
        entityType: 'USER',
        entityId: user.id,
        metadata: JSON.stringify({
          role: user.role,
          status: user.status,
          requiresValidation,
        }),
      },
    });

    const sessionUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      organizationId: user.organizationId,
      organizationName: user.organization?.name || null,
    };

    const token = await createSessionToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
      message: requiresValidation
        ? 'Votre compte a été créé et est en attente de validation administrative BIOWATT-CI.'
        : 'Votre compte a été créé avec succès.',
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
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du compte.' },
      { status: 500 }
    );
  }
}
