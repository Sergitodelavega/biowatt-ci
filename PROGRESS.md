# PROGRESS.md — BIOWATT-CI

> Ce fichier est le journal synthétique de l’avancement. Il doit être mis à jour après chaque incrément significatif.

## Statut global

**Phase actuelle : Phase 3 — Unités de biogaz (Terminée) / Prêt pour Phase 4 — Simulateur de potentiel**

**Pourcentage indicatif : 55 %**

**Dernière mise à jour : 2026-10-06**

## UX/UI — Incrément 2

- Audit initial réalisé sur les pages existantes, la navigation, les cartes, les formulaires et les spécifications métier.
- Tokens visuels centralisés, thème clair comme valeur initiale, focus clavier global et lien d'évitement ajoutés.
- Navigation mobile ajoutée et limitée aux routes réellement disponibles ; les mots de passe démo ne sont plus préremplis depuis l'écran de connexion.
- Accueil refondu autour du territoire, des parcours existants et des cinq niveaux de qualité de données.
- Marqueurs des deux cartes rendus accessibles au clavier ; les objets sans coordonnées ne reçoivent plus de position fictive et le fond est annoncé comme schématique.
- Dashboard : données chiffrées statiques signalées comme démonstration et raccourci vers le simulateur absent retiré.
- **Responsive** : aucune barre de défilement horizontale observée aux largeurs 320, 768, 1024 et 1440 ; capture mobile vérifiée. Le bouton de thème reste accessible dans le menu mobile.
- **Vérifications** : TypeScript OK ; 17 tests Vitest réussis ; le build Next a compilé mais la résolution finale de `/_document` a échoué pendant qu'un serveur `next dev` partageait `.next`.
- **Limite navigateur** : les pages rendues ont ensuite renvoyé des 404 sur les chunks JS ; l'interaction du menu n'est donc pas vérifiée. Redémarrer le serveur Next puis refaire le contrôle navigateur.
- **À reprendre** : poursuivre les listes, formulaires, dashboards et cartes.

---

## 1. Ce qui est validé

- [x] Vision générale et principe spec-first
- [x] Rôles et RBAC serveur (`ADMIN_BIOWATT`, `STATE`, `COLLECTIVITY`, `FEEDSTOCK_OWNER`, `BIOGAS_OPERATOR`, `PUBLIC_VISITOR`)
- [x] Modèle de données PostgreSQL / Prisma
- [x] Authentification JWT HTTP-only & hachage bcrypt
- [x] Bouton de basculement **Light / Dark Mode** dynamique avec persistance dans `localStorage`
- [x] **Module Gisements (Étape B)** : Carte interactive, CRUD, filtres et masquage des coordonnées GPS exactes
- [x] **Module Unités de Biogaz (Étape C)** :
  - Carte interactive des centrales et projets de biogaz (`components/BiogasUnitMap.tsx`).
  - API `/api/units` (GET avec filtres par statut et technologie, POST pour enregistrement par exploitant).
  - Validation du besoin quotidien en substrats (tonnage journalier strictement positif).
  - Masquage automatique des coordonnées précises et des contacts privés (`protectedContactEmail`, `protectedContactPhone`) pour les non-exploitants (`lib/utils/privacy.ts` `sanitizeBiogasUnitForUser`).
  - Formulaire de référencement d'une unité (`app/units/new/page.tsx`) avec sélection des substrats compatibles et capacité.
  - Cartes individuelles d'unité et filtres dynamiques (`components/BiogasUnitCard.tsx`, `app/units/page.tsx`).

---

## 2. Ce qui reste à décider

- [ ] Intégration de tuiles vectorielles MapLibre / OpenStreetMap personnalisées en haute définition pour la Côte d'Ivoire.
- [ ] Grille d'équivalence biométhanogène centralisée pour le moteur du simulateur (Phase 4).

---

## 3. Avancement par module

| Module             | Statut                  | Tests                      | Documentation                      | Blocage |
| ------------------ | ----------------------- | -------------------------- | ---------------------------------- | ------- |
| Architecture       | Terminé                 | Passant                    | Fait                               | —       |
| Auth / rôles       | Terminé                 | Passant (Vitest OK)        | Fait                               | —       |
| Base de données    | Terminé                 | Passant (Prisma OK)        | Fait                               | —       |
| Theme Light/Dark   | Terminé                 | Passant                    | Fait                               | —       |
| Gisements          | Terminé                 | Passant (Vitest OK)        | Fait (`specs/feedstocks.md`)       | —       |
| Unités             | Terminé                 | Passant (Vitest OK)        | Fait (`specs/biogas-units.md`)     | —       |
| Déploiement Vercel | Configuration Prête     | Build OK (`npm run build`) | Fait (`docs/DEPLOYMENT_VERCEL.md`) | —       |
| Carte              | Opérationnelle          | Visualisation OK           | Fait                               | —       |
| Simulateur         | À démarrer (Phase 4)    | —                          | Fait (`specs/simulator.md`)        | —       |
| Matching           | À démarrer (Phase 5)    | —                          | Fait (`specs/matching.md`)         | —       |
| Dashboards         | À démarrer (Phase 6)    | —                          | Fait (`specs/dashboards.md`)       | —       |
| Exports            | À démarrer (Phase 7)    | —                          | Fait (`specs/exports.md`)          | —       |
| Admin              | Socle prêt              | —                          | Fait (`specs/auth.md`)             | —       |
| Sécurité           | Implémenté côté serveur | Passant                    | Fait (`AGENTS.md`)                 | —       |
| Déploiement        | Prêt pour dev/staging   | Build OK                   | Fait (`.env.example`)              | —       |

---

## 4. Journal des Incréments

### Incrément 1 — 2026-10-06

- **Date** : 2026-10-06
- **Nom** : Incrément 1 — Audit, initialisation de la stack, socle DB & authentification serveur (RBAC)
- **Réalisé** :
  - Diagnostic complet du dépôt & création de `SPEC.md`.
  - Stack Next.js 14 App Router + TypeScript + Tailwind CSS initialisée et validée.
  - Schéma de base de données PostgreSQL / Prisma (`Organization`, `User`, `DataSource`, `FeedstockSite`, `BiogasUnit`, `Verification`, `MatchingRequest`, `AuditLog`).
  - Système d'autorisation et d'isolation des données côté serveur (`lib/auth/permissions.ts` avec `canViewFeedstock`, `canEditFeedstock`, `canViewUnit`, `canEditUnit`, `canExport`, `canManageUser`).
  - Authentification par jetons JWT HTTP-only et hachage bcrypt (`lib/auth/jwt.ts`).
  - Routes d'API `/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/logout`.
  - Compte de démonstration seedé avec statut de qualité `DEMONSTRATION`.
  - Design system sombre modernisé avec Slogan **« Du déchet au watt, de la donnée à la décision »** et la chaîne de valeur **Gisements → Potentiel → Unités → Matching → Décision**.
- **Tests** :
  - Suite de tests unitaires Vitest automatisés (`tests/auth/permissions.test.ts`, `tests/auth/jwt.test.ts`). **9 tests exécutés et validés (100% passing)**.
  - Compilation Next.js (`npm run build`) validée avec **0 erreur**.
- **Prochaine étape** : Étape B — Module Gisements (CRUD propriétaire, confidentialité, carte interactive des gisements).
