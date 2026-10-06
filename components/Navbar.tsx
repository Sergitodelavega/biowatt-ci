"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Flame,
  Home,
  LayoutDashboard,
  Leaf,
  LogIn,
  LogOut,
  Map,
  Menu,
  UserCheck,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Role, AccountStatus } from "@/lib/types/auth";
import { ThemeToggle } from "./ThemeToggle";

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: AccountStatus;
  organizationId?: string | null;
  organizationName?: string | null;
}

const navigationItems: { href: string; label: string; Icon?: LucideIcon }[] = [
  { href: "/", label: "Accueil", Icon: Home },
  { href: "/feedstocks", label: "Gisements", Icon: Map },
  { href: "/units", label: "Unités", Icon: Flame },
  { href: "/dashboard", label: "Tableau de bord", Icon: LayoutDashboard },
];

const roleLabels: Record<Role, string> = {
  ADMIN_BIOWATT: "ADMIN",
  STATE: "ÉTAT",
  COLLECTIVITY: "COLLECTIVITÉ",
  FEEDSTOCK_OWNER: "DÉTENTEUR",
  BIOGAS_OPERATOR: "VALORISATEUR",
  PUBLIC_VISITOR: "VISITEUR",
};

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);

    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user || null);
        } else {
          setCurrentUser(null);
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    void fetchSession();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderNavigation = (mobile = false) => (
    <nav
      aria-label={mobile ? "Navigation mobile" : "Navigation principale"}
      className={
        mobile ? "grid gap-1 p-3" : "hidden items-center gap-1 md:flex"
      }
    >
      {navigationItems.map(({ href, label, Icon }) => {
        const isActive =
          href === "/" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[var(--surface-muted)] text-[var(--primary)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="site-header">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="BIOWATT-CI, accueil"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--primary)] text-white sm:h-10 sm:w-10">
            <Leaf aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-bold leading-tight text-[var(--foreground)]">
              BIOWATT-CI
            </span>
            <span className="hidden text-xs text-[var(--muted)] sm:block">
              Côte d'Ivoire
            </span>
          </span>
        </Link>

        {renderNavigation()}

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <span className="hidden sm:block">
            <ThemeToggle />
          </span>
          {!loading && currentUser && (
            <>
              <div className="hidden text-right sm:block">
                <div className="text-sm font-semibold text-[var(--foreground)]">
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className="flex items-center justify-end gap-1 text-xs text-[var(--muted)]">
                  <span>{roleLabels[currentUser.role]}</span>
                  {currentUser.status === "PENDING" && (
                    <span>· EN ATTENTE</span>
                  )}
                </div>
              </div>
              <Link
                href="/dashboard"
                aria-label="Mon tableau de bord"
                title="Mon tableau de bord"
                className="flex h-10 w-10 items-center justify-center rounded-md border bg-[var(--surface)] text-[var(--primary)] hover:bg-[var(--surface-muted)]"
              >
                <UserCheck aria-hidden="true" className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Se déconnecter"
                title="Se déconnecter"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-red-300 text-[var(--danger)] hover:bg-red-50"
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
              </button>
            </>
          )}
          {!loading && !currentUser && (
            <Link
              href="/auth/login"
              className="hidden min-h-10 items-center gap-2 rounded-md bg-[var(--primary)] px-3 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] sm:flex"
            >
              <LogIn aria-hidden="true" className="h-4 w-4" />
              Connexion
            </Link>
          )}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border bg-[var(--surface)] text-[var(--foreground)] md:hidden"
            aria-label={
              mobileNavOpen ? "Fermer la navigation" : "Ouvrir la navigation"
            }
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          id="mobile-navigation"
          className="border-t bg-[var(--surface)] md:hidden"
        >
          {renderNavigation(true)}
          <div className="flex items-center justify-between border-t px-4 py-2 sm:hidden">
            <span className="text-sm text-[var(--muted)]">Thème</span>
            <ThemeToggle />
          </div>
          {!loading && !currentUser && (
            <div className="px-3 pb-3">
              <Link
                href="/auth/login"
                className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 text-sm font-semibold text-white"
              >
                <LogIn aria-hidden="true" className="h-4 w-4" />
                Connexion
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
