import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { findUnique, createSessionToken } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  createSessionToken: vi.fn(),
}));

vi.mock('@/lib/db/prisma', () => ({
  prisma: { user: { findUnique } },
}));

vi.mock('@/lib/auth/jwt', () => ({
  createSessionToken,
}));

import { POST } from '@/app/api/auth/demo/route';

function demoLoginRequest(role: string) {
  return new NextRequest('http://localhost/api/auth/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
}

describe('POST /api/auth/demo', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.clearAllMocks();
    createSessionToken.mockResolvedValue('signed-demo-session');
    findUnique.mockRejectedValue(new Error('database unavailable'));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('creates an HTTP-only local demo session for an allowed role', async () => {
    const response = await POST(demoLoginRequest('FEEDSTOCK_OWNER'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user.role).toBe('FEEDSTOCK_OWNER');
    expect(createSessionToken).toHaveBeenCalledOnce();
    expect(response.headers.get('set-cookie')).toContain('HttpOnly');
  });

  it('rejects roles without a demo account', async () => {
    const response = await POST(demoLoginRequest('PUBLIC_VISITOR'));

    expect(response.status).toBe(400);
    expect(createSessionToken).not.toHaveBeenCalled();
  });

  it('is unavailable outside development', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const response = await POST(demoLoginRequest('ADMIN_BIOWATT'));

    expect(response.status).toBe(404);
    expect(createSessionToken).not.toHaveBeenCalled();
  });
});