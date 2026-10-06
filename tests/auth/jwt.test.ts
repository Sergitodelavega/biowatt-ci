import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, createSessionToken, verifySessionToken } from '../../lib/auth/jwt';
import { SessionUser } from '../../lib/types/auth';

describe('JWT & Password Hashing Utilities', () => {
  it('Hashes and correctly verifies passwords', async () => {
    const rawPass = 'BiowattPass2026!';
    const hash = await hashPassword(rawPass);
    
    expect(hash).not.toEqual(rawPass);
    expect(await verifyPassword(rawPass, hash)).toBe(true);
    expect(await verifyPassword('WrongPassword', hash)).toBe(false);
  });

  it('Creates and verifies valid JWT session tokens', async () => {
    const mockUser: SessionUser = {
      id: 'usr-123',
      email: 'test@biowatt.ci',
      firstName: 'Jean',
      lastName: 'Kouassi',
      role: 'FEEDSTOCK_OWNER',
      status: 'ACTIVE',
      organizationId: 'org-456',
    };

    const token = await createSessionToken(mockUser);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const decoded = await verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.id).toBe(mockUser.id);
    expect(decoded?.email).toBe(mockUser.email);
    expect(decoded?.role).toBe(mockUser.role);
    expect(decoded?.organizationId).toBe(mockUser.organizationId);
  });

  it('Returns null for invalid or corrupted token', async () => {
    const decoded = await verifySessionToken('invalid.token.structure');
    expect(decoded).toBeNull();
  });
});
