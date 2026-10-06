import { describe, it, expect } from 'vitest';
import { createSessionToken, verifySessionToken } from '../../lib/auth/jwt';
import { INITIAL_USERS } from '../../lib/store/localStore';

describe('Login Authentication & Session Flow', () => {
  it('Successfully authenticates admin demo user and verifies session token', async () => {
    const adminUser = INITIAL_USERS.find((u) => u.email === 'admin@biowatt.ci')!;
    expect(adminUser).toBeDefined();

    const token = await createSessionToken({
      id: adminUser.id,
      email: adminUser.email,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      role: adminUser.role,
      status: adminUser.status,
      organizationId: adminUser.organizationId,
      organizationName: adminUser.organizationName,
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const verified = await verifySessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe('admin@biowatt.ci');
    expect(verified?.role).toBe('ADMIN_BIOWATT');
    expect(verified?.status).toBe('ACTIVE');
  });

  it('Successfully authenticates feedstock owner demo user and verifies session token', async () => {
    const ownerUser = INITIAL_USERS.find((u) => u.email === 'detenteur@palm-ci.co')!;
    expect(ownerUser).toBeDefined();

    const token = await createSessionToken({
      id: ownerUser.id,
      email: ownerUser.email,
      firstName: ownerUser.firstName,
      lastName: ownerUser.lastName,
      role: ownerUser.role,
      status: ownerUser.status,
      organizationId: ownerUser.organizationId,
      organizationName: ownerUser.organizationName,
    });

    const verified = await verifySessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe('detenteur@palm-ci.co');
    expect(verified?.role).toBe('FEEDSTOCK_OWNER');
  });
});
