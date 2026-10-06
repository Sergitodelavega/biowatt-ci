import { describe, it, expect } from 'vitest';
import { sanitizeFeedstockForUser, RawFeedstock } from '../../lib/utils/privacy';
import { SessionUser } from '../../lib/types/auth';

describe('Feedstock Data Privacy & Coordinate Fuzzing', () => {
  const sampleFeedstock: RawFeedstock = {
    id: 'fs-123',
    name: 'Gisement Usine Palmeraie',
    ownerOrganizationId: 'org-palme',
    sector: 'huilerie',
    substrateType: 'rafles de palme',
    latitude: 5.34821,
    longitude: -4.02981,
    fuzzyLatitude: 5.35,
    fuzzyLongitude: -4.03,
    totalWasteVolume: 10000,
    fermentableFraction: 80,
    estimatedFermentableVolume: 8000,
    frequency: 'quotidien',
    regularity: 'constante',
    sortingStatus: 'trié à la source',
    contaminationStatus: 'faible',
    dataQualityStatus: 'DOCUMENTARY_VERIFIED',
    sharingConsent: false,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerOrganization: {
      id: 'org-palme',
      name: 'Palmeraie Privée S.A.',
      territory: 'Bas-Sassandra',
    },
  };

  const ownerUser: SessionUser = {
    id: 'usr-owner',
    email: 'owner@palmeraie.ci',
    firstName: 'Kouassi',
    lastName: 'Jean',
    role: 'FEEDSTOCK_OWNER',
    status: 'ACTIVE',
    organizationId: 'org-palme',
  };

  const strangerUser: SessionUser = {
    id: 'usr-stranger',
    email: 'stranger@autre.ci',
    firstName: 'Autre',
    lastName: 'Utilisateur',
    role: 'FEEDSTOCK_OWNER',
    status: 'ACTIVE',
    organizationId: 'org-autre',
  };

  it('Owner receives exact coordinates and organization details', () => {
    const sanitized = sanitizeFeedstockForUser(ownerUser, sampleFeedstock);
    expect(sanitized.isPrivateView).toBe(true);
    expect(sanitized.latitude).toBe(5.34821);
    expect(sanitized.longitude).toBe(-4.02981);
  });

  it('Unrelated user receives fuzzy coordinates and masked organization when sharing consent is false', () => {
    const sanitized = sanitizeFeedstockForUser(strangerUser, sampleFeedstock);
    expect(sanitized.isPrivateView).toBe(false);
    expect(sanitized.latitude).toBe(5.35); // Rounded / Fuzzy
    expect(sanitized.longitude).toBe(-4.03); // Rounded / Fuzzy
    expect(sanitized.ownerOrganizationName).toContain('Confidentiel');
  });

  it('Public visitor receives fuzzy coordinates', () => {
    const sanitized = sanitizeFeedstockForUser(null, sampleFeedstock);
    expect(sanitized.isPrivateView).toBe(false);
    expect(sanitized.latitude).toBe(5.35);
  });
});
