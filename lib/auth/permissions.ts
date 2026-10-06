import { SessionUser, FeedstockSitePermissionTarget, BiogasUnitPermissionTarget } from '../types/auth';

/**
 * Helper to check if a user is active.
 * Suspended, pending, or rejected accounts cannot perform protected actions.
 */
export function isUserActive(user: SessionUser | null): boolean {
  if (!user) return false;
  return user.status === 'ACTIVE';
}

/**
 * Checks whether a user can view detailed private data for a FeedstockSite.
 */
export function canViewFeedstock(
  user: SessionUser | null,
  feedstock: FeedstockSitePermissionTarget
): boolean {
  // Public visitors or unauthenticated users can only see public/aggregated views
  if (!user || user.role === 'PUBLIC_VISITOR') {
    return false;
  }

  // Account must be active
  if (!isUserActive(user)) {
    return false;
  }

  // Admin and State can view detailed feedstocks for governance/analytics
  if (user.role === 'ADMIN_BIOWATT' || user.role === 'STATE') {
    return true;
  }

  // Feedstock owner can view their own organisation's site
  if (user.role === 'FEEDSTOCK_OWNER' && user.organizationId === feedstock.ownerOrganizationId) {
    return true;
  }

  // Collectivity can view if sharing consent is true
  if (user.role === 'COLLECTIVITY' && feedstock.sharingConsent) {
    return true;
  }

  // Operators can view if consent is granted for matching purposes
  if (user.role === 'BIOGAS_OPERATOR' && feedstock.sharingConsent) {
    return true;
  }

  return false;
}

/**
 * Checks whether a user can edit/update a FeedstockSite.
 * Strictly controlled: ONLY the owning organization or ADMIN_BIOWATT.
 */
export function canEditFeedstock(
  user: SessionUser | null,
  feedstock: FeedstockSitePermissionTarget
): boolean {
  if (!user || !isUserActive(user)) {
    return false;
  }

  if (user.role === 'ADMIN_BIOWATT') {
    return true;
  }

  if (user.role === 'FEEDSTOCK_OWNER' && user.organizationId === feedstock.ownerOrganizationId) {
    return true;
  }

  return false;
}

/**
 * Checks whether a user can view detailed private data for a BiogasUnit.
 */
export function canViewUnit(
  user: SessionUser | null,
  unit: BiogasUnitPermissionTarget
): boolean {
  if (!user || user.role === 'PUBLIC_VISITOR') {
    return false;
  }

  if (!isUserActive(user)) {
    return false;
  }

  if (user.role === 'ADMIN_BIOWATT' || user.role === 'STATE' || user.role === 'COLLECTIVITY') {
    return true;
  }

  if (user.role === 'BIOGAS_OPERATOR' && user.organizationId === unit.operatorOrganizationId) {
    return true;
  }

  // Feedstock owners can see basic operational info of units for potential matching
  if (user.role === 'FEEDSTOCK_OWNER') {
    return true;
  }

  return false;
}

/**
 * Checks whether a user can view private contact details & exact coordinates for a BiogasUnit.
 * STRICT: ONLY the owning operator organization or ADMIN_BIOWATT.
 */
export function canViewUnitPrivateDetails(
  user: SessionUser | null,
  unit: BiogasUnitPermissionTarget
): boolean {
  if (!user || !isUserActive(user)) {
    return false;
  }

  if (user.role === 'ADMIN_BIOWATT') {
    return true;
  }

  if (user.role === 'BIOGAS_OPERATOR' && user.organizationId === unit.operatorOrganizationId) {
    return true;
  }

  return false;
}

/**
 * Checks whether a user can edit/update a BiogasUnit.
 * Strictly controlled: ONLY the operator organization or ADMIN_BIOWATT.
 */
export function canEditUnit(
  user: SessionUser | null,
  unit: BiogasUnitPermissionTarget
): boolean {
  if (!user || !isUserActive(user)) {
    return false;
  }

  if (user.role === 'ADMIN_BIOWATT') {
    return true;
  }

  if (user.role === 'BIOGAS_OPERATOR' && user.organizationId === unit.operatorOrganizationId) {
    return true;
  }

  return false;
}

/**
 * Checks export permissions.
 */
export function canExport(
  user: SessionUser | null,
  scope: 'aggregated' | 'detailed'
): boolean {
  if (!user || !isUserActive(user)) {
    return false;
  }

  if (user.role === 'ADMIN_BIOWATT' || user.role === 'STATE') {
    return true;
  }

  if (user.role === 'COLLECTIVITY' && scope === 'aggregated') {
    return true;
  }

  if ((user.role === 'FEEDSTOCK_OWNER' || user.role === 'BIOGAS_OPERATOR') && scope === 'aggregated') {
    return true;
  }

  return false;
}

/**
 * Checks administrative user management permissions.
 * STRICT: ONLY ADMIN_BIOWATT.
 */
export function canManageUser(user: SessionUser | null): boolean {
  if (!user || !isUserActive(user)) {
    return false;
  }
  return user.role === 'ADMIN_BIOWATT';
}
