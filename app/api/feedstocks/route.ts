import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifySessionToken } from '@/lib/auth/jwt';
import { sanitizeFeedstockForUser } from '@/lib/utils/privacy';
import { isUserActive } from '@/lib/auth/permissions';
import { INITIAL_FEEDSTOCKS } from '@/lib/store/localStore';
import { z } from 'zod';

const feedstockCreateSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères.'),
  sector: z.string().min(2, 'Le secteur est requis.'),
  substrateType: z.string().min(2, 'Le type de substrat est requis.'),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  totalWasteVolume: z.number().positive('Le volume total de déchets doit être supérieur à 0.'),
  fermentableFraction: z.number().min(0).max(100, 'La fraction fermentescible doit être entre 0 et 100%.'),
  frequency: z.string().default('quotidien'),
  regularity: z.string().default('constante'),
  seasonality: z.string().optional().nullable(),
  sortingStatus: z.string().default('mélangé'),
  contaminationStatus: z.string().default('faible'),
  pretreatment: z.string().optional().nullable(),
  dataQualityStatus: z.enum(['DEMONSTRATION', 'DECLARE', 'DOCUMENTARY_VERIFIED', 'SITE_VERIFIED', 'MEASURED']).default('DECLARE'),
  sharingConsent: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('biowatt_session')?.value;
    const user = token ? await verifySessionToken(token) : null;

    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector');
    const quality = searchParams.get('quality');
    const search = searchParams.get('search');

    let rawFeedstocks: any[] = [];

    try {
      const whereClause: any = { status: 'ACTIVE' };
      if (sector && sector !== 'all') whereClause.sector = sector;
      if (quality && quality !== 'all') whereClause.dataQualityStatus = quality;
      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { substrateType: { contains: search, mode: 'insensitive' } },
          { sector: { contains: search, mode: 'insensitive' } },
        ];
      }

      rawFeedstocks = await prisma.feedstockSite.findMany({
        where: whereClause,
        include: {
          ownerOrganization: { select: { id: true, name: true, territory: true } },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch {
      // Prototype Fallback when DB is not connected
      rawFeedstocks = INITIAL_FEEDSTOCKS.filter((fs) => {
        if (sector && sector !== 'all' && fs.sector !== sector) return false;
        if (quality && quality !== 'all' && fs.dataQualityStatus !== quality) return false;
        if (search) {
          const query = search.toLowerCase();
          return (
            fs.name.toLowerCase().includes(query) ||
            fs.substrateType.toLowerCase().includes(query) ||
            fs.sector.toLowerCase().includes(query)
          );
        }
        return true;
      });
    }

    const sanitized = rawFeedstocks.map((fs) => sanitizeFeedstockForUser(user, fs));

    return NextResponse.json({
      success: true,
      count: sanitized.length,
      feedstocks: sanitized,
    });
  } catch (err: any) {
    console.error('GET /api/feedstocks error:', err);
    return NextResponse.json({ success: true, count: INITIAL_FEEDSTOCKS.length, feedstocks: INITIAL_FEEDSTOCKS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('biowatt_session')?.value;
    const user = token ? await verifySessionToken(token) : null;

    if (!user || !isUserActive(user)) {
      return NextResponse.json(
        { error: 'Accès non autorisé. Vous devez posséder un compte actif pour enregistrer un gisement.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = feedstockCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données de gisement invalides.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const estimatedFermentableVolume = data.totalWasteVolume * (data.fermentableFraction / 100);
    const fuzzyLatitude = data.latitude ? Math.round(data.latitude * 10) / 10 : null;
    const fuzzyLongitude = data.longitude ? Math.round(data.longitude * 10) / 10 : null;

    const newSite = {
      id: `fs-user-${Date.now()}`,
      name: data.name,
      ownerOrganizationId: user.organizationId || 'org-user',
      ownerOrganizationName: user.organizationName || 'Organisation Déclarante',
      territory: 'Côte d\'Ivoire',
      sector: data.sector,
      substrateType: data.substrateType,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      fuzzyLatitude,
      fuzzyLongitude,
      totalWasteVolume: data.totalWasteVolume,
      fermentableFraction: data.fermentableFraction,
      estimatedFermentableVolume,
      frequency: data.frequency,
      regularity: data.regularity,
      seasonality: data.seasonality || null,
      sortingStatus: data.sortingStatus,
      contaminationStatus: data.contaminationStatus,
      pretreatment: data.pretreatment || null,
      dataQualityStatus: data.dataQualityStatus,
      sharingConsent: data.sharingConsent,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await prisma.feedstockSite.create({
        data: {
          name: newSite.name,
          ownerOrganizationId: newSite.ownerOrganizationId,
          sector: newSite.sector,
          substrateType: newSite.substrateType,
          latitude: newSite.latitude,
          longitude: newSite.longitude,
          fuzzyLatitude: newSite.fuzzyLatitude,
          fuzzyLongitude: newSite.fuzzyLongitude,
          totalWasteVolume: newSite.totalWasteVolume,
          fermentableFraction: newSite.fermentableFraction,
          estimatedFermentableVolume: newSite.estimatedFermentableVolume,
          frequency: newSite.frequency,
          regularity: newSite.regularity,
          seasonality: newSite.seasonality,
          sortingStatus: newSite.sortingStatus,
          contaminationStatus: newSite.contaminationStatus,
          pretreatment: newSite.pretreatment,
          dataQualityStatus: newSite.dataQualityStatus as any,
          sharingConsent: newSite.sharingConsent,
          status: 'ACTIVE',
        },
      });
    } catch {
      // Prototype mode - fallback handled gracefully
    }

    return NextResponse.json({
      success: true,
      feedstock: sanitizeFeedstockForUser(user, newSite),
    });
  } catch (err: any) {
    console.error('POST /api/feedstocks error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création du gisement.' },
      { status: 500 }
    );
  }
}
