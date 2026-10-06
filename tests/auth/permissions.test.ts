import { describe, it, expect } from 'vitest';
import {
  canViewFeedstock,
  canEditFeedstock,
  canViewUnit,
  canEditUnit,
  canExport,
  canManageUser,
} from '../../lib/auth/permissions';
import { SessionUser } from '../../lib/types/auth';

describe('Server-side Permission Checks (RBAC & Data Ownership)', () => {
  const adminUser: SessionUser = {
    id: 'usr-admin',
    email: 'admin@biowatt.ci',
    firstName: 'Admin',
    lastName: 'Biowatt',
    role: 'ADMIN_BIOWATT',
    status: 'ACTIVE',
  };

  const ownerA: SessionUser = {
    id: 'usr-owner-a',
    email: 'owner-a@farm.ci',
    firstName: 'Kouassi',
    lastName: 'Jean',
    role: 'FEEDSTOCK_OWNER',
    status: 'ACTIVE',
    organizationId: 'org-a',
  };

  const ownerB: SessionUser = {
    id: 'usr-owner-b',
    email: 'owner-b@farm.ci',
    firstName: 'Konan',
    lastName: 'Yves',
    role: 'FEEDSTOCK_OWNER',
    status: 'ACTIVE',
    organizationId: 'org-b',
  };

  const pendingOwner: SessionUser = {
    id: 'usr-pending',
    email: 'pending@farm.ci',
    firstName: 'Pending',
    lastName: 'User',
    role: 'FEEDSTOCK_OWNER',
    status: 'PENDING',
    organizationId: 'org-a',
  };

  const suspendedUser: SessionUser = {
    id: 'usr-suspended',
    email: 'suspended@farm.ci',
    firstName: 'Suspended',
    lastName: 'User',
    role: 'FEEDSTOCK_OWNER',
    status: 'SUSPENDED',
    organizationId: 'org-a',
  };

  const feedstockOrgA = {
    id: 'fs-1',
    ownerOrganizationId: 'org-a',
    sharingConsent: false,
  };

  it('Feedstock Owner A can edit their own feedstock site, but cannot edit Owner B site', () => {
    expect(canEditFeedstock(ownerA, feedstockOrgA)).toBe(true);
    expect(canEditFeedstock(ownerB, feedstockOrgA)).toBe(false);
  });

  it('Owner B cannot view private details of Owner A feedstock without consent', () => {
    expect(canViewFeedstock(ownerB, feedstockOrgA)).toBe(false);
  });

  it('Admin BIOWATT can view and edit any feedstock site', () => {
    expect(canViewFeedstock(adminUser, feedstockOrgA)).toBe(true);
    expect(canEditFeedstock(adminUser, feedstockOrgA)).toBe(true);
  });

  it('Pending or Suspended accounts are DENIED editing permissions', () => {
    expect(canEditFeedstock(pendingOwner, feedstockOrgA)).toBe(false);
    expect(canEditFeedstock(suspendedUser, feedstockOrgA)).toBe(false);
  });

  it('Only Admin can access user management (canManageUser)', () => {
    expect(canManageUser(adminUser)).toBe(true);
    expect(canManageUser(ownerA)).toBe(false);
    expect(canManageUser(pendingOwner)).toBe(false);
  });

  it('Export rules prevent detailed exports for unauthorized roles', () => {
    expect(canExport(adminUser, 'detailed')).toBe(true);
    expect(canExport(ownerA, 'detailed')).toBe(false);
    expect(canExport(ownerA, 'aggregated')).toBe(true);
    expect(canExport(null, 'aggregated')).toBe(false);
  });
});
