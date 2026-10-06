import { Role, AccountStatus, DataQualityStatus } from '../types/auth';

export interface FeedstockSiteItem {
  id: string;
  name: string;
  ownerOrganizationId: string;
  ownerOrganizationName?: string;
  territory?: string;
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
  dataQualityStatus: DataQualityStatus;
  sharingConsent: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  isPrivateView?: boolean;
}

export interface BiogasUnitItem {
  id: string;
  name: string;
  operatorOrganizationId: string;
  operatorOrganizationName?: string;
  territory?: string;
  latitude: number | null;
  longitude: number | null;
  fuzzyLatitude: number | null;
  fuzzyLongitude: number | null;
  technology: string;
  commissioningYear?: number | null;
  operationalStatus: string;
  dailySubstrateNeed: number;
  capacity: number;
  acceptedSubstrates: string; // JSON string or comma-separated
  acceptedSubstratesList: string[];
  declaredProduction?: number | null;
  productionReliability?: string | null;
  dataQualityStatus: DataQualityStatus;
  protectedContactEmail?: string | null;
  protectedContactPhone?: string | null;
  createdAt: string;
  updatedAt: string;
  isPrivateView?: boolean;
}

export interface DemoUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: AccountStatus;
  organizationId?: string | null;
  organizationName?: string | null;
}

// Initial Demonstration Dataset for Prototype
export const INITIAL_USERS: DemoUser[] = [
  {
    id: 'usr-admin',
    email: 'admin@biowatt.ci',
    firstName: 'Konan',
    lastName: 'Kouassi',
    role: 'ADMIN_BIOWATT',
    status: 'ACTIVE',
    organizationId: 'org-admin',
    organizationName: 'BIOWATT-CI Administration',
  },
  {
    id: 'usr-etat',
    email: 'etat@environnement.gouv.ci',
    firstName: 'Aminata',
    lastName: 'Touré',
    role: 'STATE',
    status: 'ACTIVE',
    organizationId: 'org-state',
    organizationName: 'Ministère de l\'Environnement',
  },
  {
    id: 'usr-collectivity',
    email: 'mairie@sanpedro.ci',
    firstName: 'Yao',
    lastName: 'Brou',
    role: 'COLLECTIVITY',
    status: 'ACTIVE',
    organizationId: 'org-sanpedro',
    organizationName: 'District Autonome de San-Pédro',
  },
  {
    id: 'usr-owner',
    email: 'detenteur@palm-ci.co',
    firstName: 'Gnamien',
    lastName: 'Kouadjo',
    role: 'FEEDSTOCK_OWNER',
    status: 'ACTIVE',
    organizationId: 'org-palm',
    organizationName: 'Coopérative Palmier Bas-Sassandra',
  },
  {
    id: 'usr-operator',
    email: 'operateur@biogaz.ci',
    firstName: 'Marc',
    lastName: 'Diallo',
    role: 'BIOGAS_OPERATOR',
    status: 'ACTIVE',
    organizationId: 'org-biogaz',
    organizationName: 'Ivoire Biogaz Énergie S.A.',
  },
];

export const INITIAL_FEEDSTOCKS: FeedstockSiteItem[] = [
  {
    id: 'fs-demo-1',
    name: 'Gisement Rafles & Effluents Huilerie San-Pédro [DÉMO]',
    ownerOrganizationId: 'org-palm',
    ownerOrganizationName: 'Coopérative Palmier Bas-Sassandra',
    territory: 'San-Pédro',
    sector: 'huilerie',
    substrateType: 'rafles de palme & effluents POME',
    latitude: 4.7521,
    longitude: -6.6342,
    fuzzyLatitude: 4.75,
    fuzzyLongitude: -6.63,
    totalWasteVolume: 12500,
    fermentableFraction: 85,
    estimatedFermentableVolume: 10625,
    frequency: 'quotidien',
    regularity: 'constante',
    seasonality: 'Toute l\'année (Pointe Mars-Juin)',
    sortingStatus: 'trié à la source',
    contaminationStatus: 'faible',
    pretreatment: 'broyage mécanique',
    dataQualityStatus: 'DEMONSTRATION',
    sharingConsent: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fs-demo-2',
    name: 'Gisement Déchets Organiques Marché de Marcory [DÉMO]',
    ownerOrganizationId: 'org-marcory',
    ownerOrganizationName: 'Commune de Marcory (Abidjan)',
    territory: 'Abidjan',
    sector: 'marché',
    substrateType: 'épluchures de bananes & légumes de marché',
    latitude: 5.3021,
    longitude: -3.9842,
    fuzzyLatitude: 5.30,
    fuzzyLongitude: -3.98,
    totalWasteVolume: 8200,
    fermentableFraction: 90,
    estimatedFermentableVolume: 7380,
    frequency: 'quotidien',
    regularity: 'variable',
    seasonality: 'Toute l\'année',
    sortingStatus: 'mélangé',
    contaminationStatus: 'moyenne',
    pretreatment: 'tri manuel préalable',
    dataQualityStatus: 'DOCUMENTARY_VERIFIED',
    sharingConsent: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fs-demo-3',
    name: 'Effluents Abattoir Municipal Bouaké [DÉMO]',
    ownerOrganizationId: 'org-bouake',
    ownerOrganizationName: 'Abattoir Municipal Bouaké',
    territory: 'Bouaké',
    sector: 'abattoir',
    substrateType: 'contenu de rumen & sang d\'abattage',
    latitude: 7.6912,
    longitude: -5.0311,
    fuzzyLatitude: 7.69,
    fuzzyLongitude: -5.03,
    totalWasteVolume: 4500,
    fermentableFraction: 95,
    estimatedFermentableVolume: 4275,
    frequency: 'quotidien',
    regularity: 'constante',
    seasonality: 'Toute l\'année',
    sortingStatus: 'trié à la source',
    contaminationStatus: 'faible',
    pretreatment: 'séparation solide/liquide',
    dataQualityStatus: 'SITE_VERIFIED',
    sharingConsent: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_UNITS: BiogasUnitItem[] = [
  {
    id: 'unit-demo-1',
    name: 'Centrale Biogaz San-Pédro 1 [DÉMO]',
    operatorOrganizationId: 'org-biogaz',
    operatorOrganizationName: 'Ivoire Biogaz Énergie S.A.',
    territory: 'San-Pédro',
    latitude: 4.7610,
    longitude: -6.6210,
    fuzzyLatitude: 4.76,
    fuzzyLongitude: -6.62,
    technology: 'CSTR Continu (Digesteur Industriel)',
    commissioningYear: 2023,
    operationalStatus: 'opérationnelle',
    dailySubstrateNeed: 35,
    capacity: 50,
    acceptedSubstrates: JSON.stringify(['rafles de palme', 'effluents POME', 'déchets de marché']),
    acceptedSubstratesList: ['rafles de palme', 'effluents POME', 'déchets de marché'],
    declaredProduction: 450000,
    productionReliability: 'Déclaré par exploitant',
    dataQualityStatus: 'DEMONSTRATION',
    protectedContactEmail: 'contact-prive@biogaz.ci',
    protectedContactPhone: '+225 07 00 00 11 22',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'unit-demo-2',
    name: 'Projet Méthanisation Industrielle Abidjan Sud [DÉMO]',
    operatorOrganizationId: 'org-biogaz',
    operatorOrganizationName: 'Ivoire Biogaz Énergie S.A.',
    territory: 'Abidjan',
    latitude: 5.2910,
    longitude: -3.9910,
    fuzzyLatitude: 5.29,
    fuzzyLongitude: -3.99,
    technology: 'Plug Flow (Méthaniseur à piston)',
    commissioningYear: 2025,
    operationalStatus: 'en construction',
    dailySubstrateNeed: 25,
    capacity: 40,
    acceptedSubstrates: JSON.stringify(['déchets de marché', 'effluents d\'abattoir']),
    acceptedSubstratesList: ['déchets de marché', 'effluents d\'abattoir'],
    declaredProduction: 300000,
    productionReliability: 'Projet certifié',
    dataQualityStatus: 'DOCUMENTARY_VERIFIED',
    protectedContactEmail: 'projet-abidjan@biogaz.ci',
    protectedContactPhone: '+225 07 22 33 44 55',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// LocalStorage Helper functions
export function getStoredFeedstocks(): FeedstockSiteItem[] {
  if (typeof window === 'undefined') return INITIAL_FEEDSTOCKS;
  try {
    const raw = localStorage.getItem('biowatt_feedstocks');
    if (!raw) {
      localStorage.setItem('biowatt_feedstocks', JSON.stringify(INITIAL_FEEDSTOCKS));
      return INITIAL_FEEDSTOCKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FEEDSTOCKS;
  }
}

export function saveFeedstock(item: FeedstockSiteItem): FeedstockSiteItem[] {
  const current = getStoredFeedstocks();
  const updated = [item, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('biowatt_feedstocks', JSON.stringify(updated));
  }
  return updated;
}

export function getStoredUnits(): BiogasUnitItem[] {
  if (typeof window === 'undefined') return INITIAL_UNITS;
  try {
    const raw = localStorage.getItem('biowatt_units');
    if (!raw) {
      localStorage.setItem('biowatt_units', JSON.stringify(INITIAL_UNITS));
      return INITIAL_UNITS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_UNITS;
  }
}

export function saveUnit(item: BiogasUnitItem): BiogasUnitItem[] {
  const current = getStoredUnits();
  const updated = [item, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('biowatt_units', JSON.stringify(updated));
  }
  return updated;
}

export function getStoredUsers(): DemoUser[] {
  if (typeof window === 'undefined') return INITIAL_USERS;
  try {
    const raw = localStorage.getItem('biowatt_users');
    if (!raw) {
      localStorage.setItem('biowatt_users', JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

export function saveUser(user: DemoUser): DemoUser[] {
  const current = getStoredUsers();
  const updated = [user, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('biowatt_users', JSON.stringify(updated));
  }
  return updated;
}
