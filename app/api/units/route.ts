import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifySessionToken } from '@/lib/auth/jwt';
import { sanitizeBiogasUnitForUser } from '@/lib/utils/privacy';
import { isUserActive } from '@/lib/auth/permissions';
import { INITIAL_UNITS } from '@/lib/store/localStore';
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

    let rawUnits: any[] = [];

    try {
      const whereClause: any = {};
      if (status && status !== 'all') whereClause.operationalStatus = status;
      if (technology && technology !== 'all') whereClause.technology = technology;
      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { technology: { contains: search, mode: 'insensitive' } },
          { acceptedSubstrates: { contains: search, mode: 'insensitive' } },
        ];
      }

      rawUnits = await prisma.biogasUnit.findMany({
        where: whereClause,
        include: {
          operatorOrganization: { select: { id: true, name: true, territory: true } },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch {
      // Prototype Fallback when DB is not connected
      rawUnits = INITIAL_UNITS.filter((u) => {
        if (status && status !== 'all' && u.operationalStatus !== status) return false;
        if (technology && technology !== 'all' && u.technology !== technology) return false;
        if (search) {
          const query = search.toLowerCase();
          return (
            u.name.toLowerCase().includes(query) ||
            u.technology.toLowerCase().includes(query) ||
            u.acceptedSubstrates.toLowerCase().includes(query)
          );
        }
        return true;
      });
    }

    const sanitized = rawUnits.map((u) => sanitizeBiogasUnitForUser(user, u));

    return NextResponse.json({
      success: true,
      count: sanitized.length,
      units: sanitized,
    });
  } catch (err: any) {
    console.error('GET /api/units error:', err);
    return NextResponse.json({ success: true, count: INITIAL_UNITS.length, units: INITIAL_UNITS });
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

    const newUnit = {
      id: `unit-user-${Date.now()}`,
      name: data.name,
      operatorOrganizationId: user.organizationId || 'org-operator',
      operatorOrganizationName: user.organizationName || 'Exploitant Déclarant',
      territory: 'Côte d\'Ivoire',
      technology: data.technology,
      commissioningYear: data.commissioningYear || null,
      operationalStatus: data.operationalStatus,
      dailySubstrateNeed: data.dailySubstrateNeed,
      capacity: data.capacity,
      acceptedSubstrates: JSON.stringify(data.acceptedSubstrates),
      acceptedSubstratesList: data.acceptedSubstrates,
      declaredProduction: data.declaredProduction || null,
      productionReliability: data.productionReliability || null,
      dataQualityStatus: data.dataQualityStatus,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      fuzzyLatitude,
      fuzzyLongitude,
      protectedContactEmail: data.protectedContactEmail || user.email,
      protectedContactPhone: data.protectedContactPhone || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await prisma.biogasUnit.create({
        data: {
          name: newUnit.name,
          operatorOrganizationId: newUnit.operatorOrganizationId,
          technology: newUnit.technology,
          commissioningYear: newUnit.commissioningYear,
          operationalStatus: newUnit.operationalStatus,
          dailySubstrateNeed: newUnit.dailySubstrateNeed,
          capacity: newUnit.capacity,
          acceptedSubstrates: newUnit.acceptedSubstrates,
          declaredProduction: newUnit.declaredProduction,
          productionReliability: newUnit.productionReliability,
          dataQualityStatus: newUnit.dataQualityStatus as any,
          latitude: newUnit.latitude,
          longitude: newUnit.longitude,
          fuzzyLatitude: newUnit.fuzzyLatitude,
          fuzzyLongitude: newUnit.fuzzyLongitude,
          protectedContactEmail: newUnit.protectedContactEmail,
          protectedContactPhone: newUnit.protectedContactPhone,
        },
      });
    } catch {
      // Prototype mode - fallback handled gracefully
    }

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
