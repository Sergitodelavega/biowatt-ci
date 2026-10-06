import { SessionUser } from '../types/auth';
import { canViewFeedstock, canViewUnit, canViewUnitPrivateDetails } from '../auth/permissions';

export interface RawFeedstock {
  id: string;
  name: string;
  ownerOrganizationId: string;
  sector: string;
  substrateType: string;
  latitude: number | null;
  longitude: number | null;
  fuzzyLatitude: number | null;
  fuzzyLongitude: number | null;
  totalWasteVolume: number;
  fermentableFraction: number;
  estimatedFermentableVolume: number;
  frequency: string;
  regularity: string;
  seasonality?: string | null;
  sortingStatus: string;
  contaminationStatus: string;
  pretreatment?: string | null;
  dataQualityStatus: any;
  sourceId?: string | null;
  sharingConsent: boolean;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  ownerOrganization?: {
    id: string;
    name: string;
    territory?: string | null;
  } | null;
  source?: {
    id: string;
    name: string;
    type: string;
  } | null;
}

export interface RawBiogasUnit {
  id: string;
  name: string;
  operatorOrganizationId: string;
  latitude: number | null;
  longitude: number | null;
  fuzzyLatitude: number | null;
  fuzzyLongitude: number | null;
  technology: string;
  commissioningYear?: number | null;
  operationalStatus: string;
  dailySubstrateNeed: number;
  capacity: number;
  acceptedSubstrates: string; // JSON array string
  declaredProduction?: number | null;
  productionReliability?: string | null;
  sourceId?: string | null;
  dataQualityStatus: any;
  protectedContactEmail?: string | null;
  protectedContactPhone?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  operatorOrganization?: {
    id: string;
    name: string;
    territory?: string | null;
  } | null;
  source?: {
    id: string;
    name: string;
    type: string;
  } | null;
}

/**
 * Sanitizes a feedstock record for API responses according to user permissions.
 */
export function sanitizeFeedstockForUser(
  user: SessionUser | null,
  feedstock: RawFeedstock
) {
  const hasFullAccess = canViewFeedstock(user, feedstock);

  if (hasFullAccess) {
    return {
      ...feedstock,
      isPrivateView: true,
    };
  }

  return {
    id: feedstock.id,
    name: feedstock.name,
    sector: feedstock.sector,
    substrateType: feedstock.substrateType,
    latitude: feedstock.fuzzyLatitude ?? (feedstock.latitude ? Math.round(feedstock.latitude * 100) / 100 : null),
    longitude: feedstock.fuzzyLongitude ?? (feedstock.longitude ? Math.round(feedstock.longitude * 100) / 100 : null),
    fuzzyLatitude: feedstock.fuzzyLatitude,
    fuzzyLongitude: feedstock.fuzzyLongitude,
    totalWasteVolume: feedstock.totalWasteVolume,
    fermentableFraction: feedstock.fermentableFraction,
    estimatedFermentableVolume: feedstock.estimatedFermentableVolume,
    frequency: feedstock.frequency,
    regularity: feedstock.regularity,
    seasonality: feedstock.seasonality,
    sortingStatus: feedstock.sortingStatus,
    contaminationStatus: feedstock.contaminationStatus,
    pretreatment: feedstock.pretreatment,
    dataQualityStatus: feedstock.dataQualityStatus,
    sharingConsent: feedstock.sharingConsent,
    status: feedstock.status,
    createdAt: feedstock.createdAt,
    updatedAt: feedstock.updatedAt,
    ownerOrganizationName: feedstock.sharingConsent && feedstock.ownerOrganization
      ? feedstock.ownerOrganization.name
      : 'Organisation Masquée (Confidentiel)',
    territory: feedstock.ownerOrganization?.territory || 'Côte d\'Ivoire',
    isPrivateView: false,
  };
}

/**
 * Sanitizes a biogas unit record according to user permissions.
 * Protects operator contact email & phone for unauthorized roles.
 */
export function sanitizeBiogasUnitForUser(
  user: SessionUser | null,
  unit: RawBiogasUnit
) {
  const hasFullAccess = canViewUnitPrivateDetails(user, unit);

  let parsedSubstrates: string[] = [];
  try {
    parsedSubstrates = JSON.parse(unit.acceptedSubstrates);
  } catch {
    parsedSubstrates = [unit.acceptedSubstrates];
  }

  if (hasFullAccess) {
    return {
      ...unit,
      acceptedSubstratesList: parsedSubstrates,
      isPrivateView: true,
    };
  }

  // Sanitized view: Mask protected contact email/phone and exact coordinates
  return {
    id: unit.id,
    name: unit.name,
    technology: unit.technology,
    commissioningYear: unit.commissioningYear,
    operationalStatus: unit.operationalStatus,
    dailySubstrateNeed: unit.dailySubstrateNeed,
    capacity: unit.capacity,
    acceptedSubstrates: unit.acceptedSubstrates,
    acceptedSubstratesList: parsedSubstrates,
    declaredProduction: unit.declaredProduction,
    productionReliability: unit.productionReliability,
    dataQualityStatus: unit.dataQualityStatus,
    latitude: unit.fuzzyLatitude ?? (unit.latitude ? Math.round(unit.latitude * 100) / 100 : null),
    longitude: unit.fuzzyLongitude ?? (unit.longitude ? Math.round(unit.longitude * 100) / 100 : null),
    fuzzyLatitude: unit.fuzzyLatitude,
    fuzzyLongitude: unit.fuzzyLongitude,
    operatorOrganizationName: unit.operatorOrganization
      ? unit.operatorOrganization.name
      : 'Exploitant Masqué',
    territory: unit.operatorOrganization?.territory || 'Côte d\'Ivoire',
    protectedContactEmail: 'contact-protege@biowatt.ci (Accès Réservé)',
    protectedContactPhone: '+225 ** ** ** ** (Accès Réservé)',
    isPrivateView: false,
    createdAt: unit.createdAt,
    updatedAt: unit.updatedAt,
  };
}
