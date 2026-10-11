"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import type { Role } from "@/lib/types/auth";

const demoAccounts: { role: Role; label: string }[] = [
  { role: "ADMIN_BIOWATT", label: "Administration BIOWATT-CI" },
  { role: "STATE", label: "État / Ministère" },
  { role: "COLLECTIVITY", label: "Collectivité" },
  { role: "FEEDSTOCK_OWNER", label: "Détenteur de gisement" },
  { role: "BIOGAS_OPERATOR", label: "Opérateur biogaz" },
];
const isDevelopment = process.env.NODE_ENV === "development";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] = useState<Role | null>(null);

  const handleDemoLogin = async (role: Role) => {
    setError(null);
    setDemoLoadingRole(role);

    try {
      const response = await fetch("/api/auth/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Connexion de démonstration impossible.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDemoLoadingRole(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl bg-slate-900/80">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Connexion Sécurisée</h1>
          <p className="text-slate-400 text-xs mt-1">
            Accès aux espaces professionnels et institutionnels BIOWATT-CI
          </p>
        </div>

        {isDevelopment && (
          <section className="mb-6 border-b border-slate-700 pb-6" aria-labelledby="demo-login-title">
            <h2 id="demo-login-title" className="mb-3 text-sm font-semibold text-slate-200">
              Accès rapide par rôle
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  disabled={demoLoadingRole !== null}
                  onClick={() => void handleDemoLogin(account.role)}
                  className="flex min-h-11 items-center justify-between gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:border-emerald-500 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
                >
                  <span>{account.label}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-400" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Disponible uniquement sur le serveur de développement local.
            </p>
          </section>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-300 mb-2"
            >
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="nom@organisation.ci"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-300 mb-2"
            >
              Mot de Passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
