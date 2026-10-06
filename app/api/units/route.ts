import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifySessionToken } from '@/lib/auth/jwt';
import { sanitizeBiogasUnitForUser } from '@/lib/utils/privacy';
import { isUserActive } from '@/lib/auth/permissions';
import { z } from 'zod';

const biogasUnitCreateSchema = z.object({
  name: z.string().min(3, 'Le nom de l\'unité doit contenir au moins 3 caractères.'),
  technology: z.string().min(2, 'La technologie est requise.'),
  commissioningYear: z.number().optional().nullable(),
  operationalStatus: z.enum(['opérationnelle', 'en construction', 'planifiée', 'arrêtée', 'inactive']).default('opérationnelle'),
  dailySubstrateNeed: z.number().positive('Le besoin quotidien doit être un chiffre strictement positif.'),
  capacity: z.number().positive('La capacité doit être un chiffre strictement positif.'),
  acceptedSubstrates: z.array(z.string()).min(1, 'Veuillez renseigner au moins un substrat accepté.'),
  declaredProduction: z.number().optional().nullable(),
  productionReliability: z.string().optional().nullable(),
  dataQualityStatus: z.enum(['DEMONSTRATION', 'DECLARE', 'DOCUMENTARY_VERIFIED', 'SITE_VERIFIED', 'MEASURED']).default('DECLARE'),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  protectedContactEmail: z.string().email().optional().nullable(),
  protectedContactPhone: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('biowatt_session')?.value;
    const user = token ? await verifySessionToken(token) : null;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const technology = searchParams.get('technology');
    const search = searchParams.get('search');

    const whereClause: any = {};

    if (status && status !== 'all') {
      whereClause.operationalStatus = status;
    }

    if (technology && technology !== 'all') {
      whereClause.technology = technology;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { technology: { contains: search, mode: 'insensitive' } },
        { acceptedSubstrates: { contains: search, mode: 'insensitive' } },
      ];
    }

    const units = await prisma.biogasUnit.findMany({
      where: whereClause,
      include: {
        operatorOrganization: {
          select: { id: true, name: true, territory: true },
        },
        source: {
          select: { id: true, name: true, type: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const sanitized = units.map((u) => sanitizeBiogasUnitForUser(user, u));

    return NextResponse.json({
      success: true,
      count: sanitized.length,
      units: sanitized,
    });
  } catch (err: any) {
    console.error('GET /api/units error:', err);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des unités de biogaz.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('biowatt_session')?.value;
    const user = token ? await verifySessionToken(token) : null;

    if (!user || !isUserActive(user)) {
      return NextResponse.json(
        { error: 'Accès non autorisé. Seul un utilisateur actif peut enregistrer une unité.' },
        { status: 401 }
      );
    }

    if (user.role !== 'BIOGAS_OPERATOR' && user.role !== 'ADMIN_BIOWATT') {
      return NextResponse.json(
        { error: 'Seuls les exploitants d\'unités de biogaz et les administrateurs peuvent enregistrer une unité.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = biogasUnitCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données de l\'unité invalides.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const fuzzyLatitude = data.latitude ? Math.round(data.latitude * 10) / 10 : null;
    const fuzzyLongitude = data.longitude ? Math.round(data.longitude * 10) / 10 : null;

    const operatorOrgId = user.organizationId || (await prisma.organization.findFirst())?.id || '';

    const newUnit = await prisma.biogasUnit.create({
      data: {
        name: data.name,
        operatorOrganizationId: operatorOrgId,
        technology: data.technology,
        commissioningYear: data.commissioningYear || null,
        operationalStatus: data.operationalStatus,
        dailySubstrateNeed: data.dailySubstrateNeed,
        capacity: data.capacity,
        acceptedSubstrates: JSON.stringify(data.acceptedSubstrates),
        declaredProduction: data.declaredProduction || null,
        productionReliability: data.productionReliability || null,
        dataQualityStatus: data.dataQualityStatus,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        fuzzyLatitude,
        fuzzyLongitude,
        protectedContactEmail: data.protectedContactEmail || user.email,
        protectedContactPhone: data.protectedContactPhone || null,
      },
      include: {
        operatorOrganization: {
          select: { id: true, name: true, territory: true },
        },
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'CREATE_BIOGAS_UNIT',
        entityType: 'BIOGAS_UNIT',
        entityId: newUnit.id,
        metadata: JSON.stringify({ name: newUnit.name, dailyNeed: newUnit.dailySubstrateNeed }),
      },
    });

    return NextResponse.json({
      success: true,
      unit: sanitizeBiogasUnitForUser(user, newUnit),
    });
  } catch (err: any) {
    console.error('POST /api/units error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de l\'unité.' },
      { status: 500 }
    );
  }
}
