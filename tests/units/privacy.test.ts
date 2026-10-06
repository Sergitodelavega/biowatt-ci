import { describe, it, expect } from 'vitest';
import { sanitizeBiogasUnitForUser, RawBiogasUnit } from '../../lib/utils/privacy';
import { SessionUser } from '../../lib/types/auth';

describe('Biogas Unit Data Privacy & Contact Protection', () => {
  const sampleUnit: RawBiogasUnit = {
    id: 'unit-1',
    name: 'Centrale Biogaz Industrielle San-Pédro',
    operatorOrganizationId: 'org-op-1',
    latitude: 4.7610,
    longitude: -6.6210,
    fuzzyLatitude: 4.76,
    fuzzyLongitude: -6.62,
    technology: 'CSTR Continu',
    commissioningYear: 2023,
    operationalStatus: 'opérationnelle',
    dailySubstrateNeed: 40,
    capacity: 60,
    acceptedSubstrates: JSON.stringify(['rafles de palme', 'effluents POME']),
    declaredProduction: 500000,
    productionReliability: 'Mesuré sur site',
    dataQualityStatus: 'SITE_VERIFIED',
    protectedContactEmail: 'directeur@biogaz-sanpedro.ci',
    protectedContactPhone: '+225 07 11 22 33 44',
    createdAt: new Date(),
    updatedAt: new Date(),
    operatorOrganization: {
      id: 'org-op-1',
      name: 'Ivoire Biogaz Énergie',
      territory: 'San-Pédro',
    },
  };

  const operatorUser: SessionUser = {
    id: 'usr-operator',
    email: 'operator@biogaz-sanpedro.ci',
    firstName: 'Marc',
    lastName: 'Diallo',
    role: 'BIOGAS_OPERATOR',
    status: 'ACTIVE',
    organizationId: 'org-op-1',
  };

  const strangerUser: SessionUser = {
    id: 'usr-stranger',
    email: 'stranger@ferme.ci',
    firstName: 'Paul',
    lastName: 'Yao',
    role: 'FEEDSTOCK_OWNER',
    status: 'ACTIVE',
    organizationId: 'org-ferme',
  };

  it('Operator user receives full private contact details and exact coordinates', () => {
    const sanitized = sanitizeBiogasUnitForUser(operatorUser, sampleUnit);
    expect(sanitized.isPrivateView).toBe(true);
    expect(sanitized.protectedContactEmail).toBe('directeur@biogaz-sanpedro.ci');
    expect(sanitized.protectedContactPhone).toBe('+225 07 11 22 33 44');
    expect(sanitized.latitude).toBe(4.7610);
  });

  it('Non-operator user receives masked contact email/phone and fuzzy coordinates', () => {
    const sanitized = sanitizeBiogasUnitForUser(strangerUser, sampleUnit);
    expect(sanitized.isPrivateView).toBe(false);
    expect(sanitized.protectedContactEmail).toContain('Accès Réservé');
    expect(sanitized.protectedContactPhone).toContain('Accès Réservé');
    expect(sanitized.latitude).toBe(4.76);
  });

  it('Public visitor receives masked contact details', () => {
    const sanitized = sanitizeBiogasUnitForUser(null, sampleUnit);
    expect(sanitized.isPrivateView).toBe(false);
    expect(sanitized.protectedContactEmail).toContain('Accès Réservé');
  });
});
