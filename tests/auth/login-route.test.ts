import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { findUnique, verifyPassword, createSessionToken } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  verifyPassword: vi.fn(),
  createSessionToken: vi.fn(),
}));

vi.mock('@/lib/db/prisma', () => ({
  prisma: { user: { findUnique } },
}));

vi.mock('@/lib/auth/jwt', () => ({
  verifyPassword,
  createSessionToken,
}));

import { POST } from '@/app/api/auth/login/route';

const databaseUser = {
  id: 'usr-admin',
  email: 'admin@biowatt.ci',
  passwordHash: 'bcrypt-hash',
  firstName: 'Konan',
  lastName: 'Kouassi',
  role: 'ADMIN_BIOWATT',
  status: 'ACTIVE',
  organizationId: 'org-admin',
  organization: { name: 'BIOWATT-CI Administration' },
};

function loginRequest(email: string, password: string) {
  return new NextRequest('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createSessionToken.mockResolvedValue('signed-session-token');
  });

  it('does not authenticate a local demo account when the database is unavailable', async () => {
    findUnique.mockRejectedValue(new Error('database unavailable'));

    const response = await POST(loginRequest('admin@biowatt.ci', 'any-password'));

    expect(response.status).toBe(503);
    expect(verifyPassword).not.toHaveBeenCalled();
    expect(createSessionToken).not.toHaveBeenCalled();
  });

  it('does not authenticate a demo account absent from the database', async () => {
    findUnique.mockResolvedValue(null);

    const response = await POST(loginRequest('admin@biowatt.ci', 'any-password'));

    expect(response.status).toBe(401);
    expect(createSessionToken).not.toHaveBeenCalled();
  });

  it('rejects a database user when the password does not match', async () => {
    findUnique.mockResolvedValue(databaseUser);
    verifyPassword.mockResolvedValue(false);

    const response = await POST(loginRequest('admin@biowatt.ci', 'wrong-password'));

    expect(response.status).toBe(401);
    expect(createSessionToken).not.toHaveBeenCalled();
  });

  it('creates a session only after the database password is verified', async () => {
    findUnique.mockResolvedValue(databaseUser);
    verifyPassword.mockResolvedValue(true);

    const response = await POST(loginRequest('admin@biowatt.ci', 'valid-password'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(verifyPassword).toHaveBeenCalledWith('valid-password', 'bcrypt-hash');
    expect(data.user.role).toBe('ADMIN_BIOWATT');
    expect(createSessionToken).toHaveBeenCalledOnce();
  });
});