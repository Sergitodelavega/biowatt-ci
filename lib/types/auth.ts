export type Role =
  | 'ADMIN_BIOWATT'
  | 'STATE'
  | 'COLLECTIVITY'
  | 'FEEDSTOCK_OWNER'
  | 'BIOGAS_OPERATOR'
  | 'PUBLIC_VISITOR';

export type AccountStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'REJECTED'
  | 'SUSPENDED';

export type DataQualityStatus =
  | 'DEMONSTRATION'
  | 'DECLARE'
  | 'DOCUMENTARY_VERIFIED'
  | 'SITE_VERIFIED'
  | 'MEASURED';

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: AccountStatus;
  organizationId?: string | null;
  organizationName?: string | null;
}

export interface FeedstockSitePermissionTarget {
  id: string;
  ownerOrganizationId: string;
  sharingConsent?: boolean;
  dataQualityStatus?: DataQualityStatus;
  latitude?: number | null;
  longitude?: number | null;
  fuzzyLatitude?: number | null;
  fuzzyLongitude?: number | null;
}

export interface BiogasUnitPermissionTarget {
  id: string;
  operatorOrganizationId: string;
  protectedContactEmail?: string | null;
  protectedContactPhone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  fuzzyLatitude?: number | null;
  fuzzyLongitude?: number | null;
}
