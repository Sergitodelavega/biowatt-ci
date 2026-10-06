# TASKS.md — BIOWATT-CI

## Légende

- `[ ]` à faire
- `[-]` en cours
- `[x]` terminé
- `[!]` bloqué / décision requise

---

# Phase 0 — Préparation

## P0.1 — Initialisation du dépôt
- [x] Créer le dépôt BIOWATT-CI
- [x] Ajouter `SPEC.md`
- [x] Ajouter `AGENTS.md`
- [x] Ajouter `TASKS.md`
- [x] Ajouter `PROGRESS.md`
- [x] Ajouter les `specs/*.md`
- [x] Ajouter `README.md`
- [x] Ajouter `.env.example`
- [x] Ajouter `.gitignore`
- [x] Ajouter les règles de formatage/lint

## P0.2 — Architecture
- [x] Valider la stack (Next.js 14+ App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL + PostGIS)
- [x] Valider la stratégie d’authentification (JWT HTTP-only cookies + validation serveur RBAC)
- [x] Valider PostgreSQL/PostGIS
- [x] Valider le moteur cartographique (MapLibre / Leaflet avec masquage flou des coordonnées privées)
- [x] Définir les environnements dev/staging/prod
- [x] Définir les conventions de migration DB
- [x] Définir la stratégie de stockage privé

## P0.3 — Décisions métier
- [x] Valider les rôles (ADMIN_BIOWATT, STATE, COLLECTIVITY, FEEDSTOCK_OWNER, BIOGAS_OPERATOR, PUBLIC_VISITOR)
- [x] Valider les statuts de qualité (DEMONSTRATION, DECLARE, DOCUMENTARY_VERIFIED, SITE_VERIFIED, MEASURED)
- [x] Valider les règles de confidentialité (Isolations des détenteurs, masquage des coordonnées précises)
- [x] Valider les paramètres du simulateur
- [x] Valider le scoring du matching
- [x] Valider les données de démonstration (Compte de démo et gisements/unités seedés en statut DEMONSTRATION)

---

# Phase 1 — Socle technique

## P1.1 — Projet
- [x] Initialiser Next.js + TypeScript
- [x] Configurer Tailwind
- [x] Configurer lint/format
- [x] Configurer tests (Vitest + suites de tests automatisées)
- [x] Configurer gestion des variables d’environnement
- [x] Créer layout global
- [x] Créer navigation principale

## P1.2 — Base de données
- [x] Configurer PostgreSQL / Schema Prisma
- [x] Activer PostGIS / Coordonnées floues
- [x] Créer migrations initiales / Prisma Client
- [x] Créer tables organisations/utilisateurs
- [x] Créer tables gisements
- [x] Créer tables unités
- [x] Créer tables qualité/sources
- [x] Créer tables matching
- [x] Créer audit log
- [x] Ajouter indexes nécessaires
- [x] Ajouter contraintes d’intégrité

## P1.3 — Authentification
- [x] Inscription (AVEC gestion manuelle du statut PENDING pour comptes institutionnels/pros)
- [x] Connexion (Jetons JWT sécurisés HTTP-only)
- [x] Déconnexion
- [x] Réinitialisation mot de passe / Hachage bcrypt
- [x] Profil
- [x] Statut de compte (PENDING, ACTIVE, REJECTED, SUSPENDED)
- [x] Validation manuelle
- [x] Protection des routes
- [x] Autorisations serveur (lib/auth/permissions.ts : canViewFeedstock, canEditFeedstock, canViewUnit, canEditUnit, canExport, canManageUser)

---

# Phase 2 — Gisements

## P2.1 — CRUD gisement
- [x] Création propriétaire (Formulaire de déclaration avec calcul automatique fermentescible)
- [x] Lecture propriétaire & anonymisée
- [x] Modification propriétaire (Contrôlé par `canEditFeedstock`)
- [x] Suppression/archivage
- [x] Validation des champs (Schéma Zod `feedstockCreateSchema`)
- [x] Source et statut qualité (`DEMONSTRATION`, `DECLARE`, `DOCUMENTARY_VERIFIED`, `SITE_VERIFIED`, `MEASURED`)
- [x] Historique minimal & audit logs

## P2.2 — Carte
- [x] Carte Côte d’Ivoire (`components/FeedstockMap.tsx` interactive)
- [x] Couche gisements
- [ ] Couche unités (Phase 3)
- [x] Filtres par catégorie / secteur
- [x] Filtres par statut qualité
- [x] Filtres territoriaux & recherche textuelle
- [x] Agrégation publique
- [x] Protection coordonnées exactes (`lib/utils/privacy.ts`)

## P2.3 — Fiche gisement
- [x] Informations générales
- [x] Données de volume (Tonnage total et fermentescible)
- [x] Fréquence/régularité
- [x] Saison
- [x] Tri/contamination
- [x] Prétraitement
- [x] Qualité de donnée (Badge dynamique)
- [x] Consentement de partage (Toggle Smart Matching)

---

# Phase 3 — Unités de biogaz

- [x] CRUD unité propriétaire (API `/api/units` GET & POST)
- [x] Fiche & Cartographie des unités (`app/units/page.tsx`, `components/BiogasUnitCard.tsx`, `components/BiogasUnitMap.tsx`)
- [x] Technologie (CSTR Continu, Plug Flow, Lagune couverte, Voûte/Dôme)
- [x] Capacité & besoin en substrat (Tonnage journalier validé comme valeur strictement positive)
- [x] Substrats acceptés (Liste structurée et sélectionnable)
- [x] Statut de fonctionnement (`opérationnelle`, `en construction`, `planifiée`, `arrêtée`)
- [x] Production déclarée & fiabilité
- [x] Source & fiabilité (`dataQualityStatus` avec statut `DEMONSTRATION`, `DECLARE`, `DOCUMENTARY_VERIFIED`, `SITE_VERIFIED`, `MEASURED`)
- [x] Validation admin si nécessaire & Audit logs (`CREATE_BIOGAS_UNIT`)
- [x] Confidentialité contact/coordonnées (`lib/utils/privacy.ts` `sanitizeBiogasUnitForUser` masquant les emails/téléphones privés pour les non-opérateurs)

---

# Phase 4 — Simulateur

- [ ] Formulaire de simulation
- [ ] Validation tonnage
- [ ] Paramètres substrat
- [ ] Potentiel théorique
- [ ] Potentiel mobilisable
- [ ] Potentiel valorisable
- [ ] Scénarios
- [ ] Affichage des hypothèses
- [ ] Affichage du niveau de confiance
- [ ] Tests unitaires des calculs

---

# Phase 5 — Smart Matching

- [ ] Modèle MatchingRequest
- [ ] Compatibilité substrat
- [ ] Besoin unité
- [ ] Volume disponible
- [ ] Régularité
- [ ] Distance
- [ ] Qualité des données
- [ ] Tri/contamination
- [ ] Score
- [ ] Catégorie de résultat
- [ ] Demande de contact
- [ ] Acceptation/refus propriétaire
- [ ] Masquage coordonnées privées
- [ ] Tests du moteur

---

# Phase 6 — Dashboards

## État
- [ ] KPI nationaux
- [ ] Répartition territoriale
- [ ] Carte agrégée
- [ ] Gisements par secteur
- [ ] Unités par statut
- [ ] Potentiel agrégé

## Collectivité
- [ ] KPI territoire
- [ ] Gisements
- [ ] Unités
- [ ] Potentiel
- [ ] Signalement/proposition

## Détenteur
- [ ] Mes gisements
- [ ] Qualité des données
- [ ] Matching entrant
- [ ] Demandes de contact

## Valorisateur
- [ ] Mon unité
- [ ] Besoins
- [ ] Matching
- [ ] Demandes envoyées

## Admin
- [ ] Validation comptes
- [ ] Validation données
- [ ] Gestion utilisateurs
- [ ] Gestion rôles
- [ ] Audit
- [ ] Exports

---

# Phase 7 — Exports et gouvernance

- [ ] Export CSV agrégé
- [ ] Export selon permissions
- [ ] Journal d’audit
- [ ] Journal des validations
- [ ] Traçabilité des modifications
- [ ] Contrôle des données sensibles

---

# Phase 8 — Tests et démonstration

- [ ] Tests auth
- [ ] Tests permissions
- [ ] Tests CRUD propriétaire
- [ ] Tests confidentialité
- [ ] Tests simulateur
- [ ] Tests matching
- [ ] Tests dashboards
- [ ] Tests responsive
- [ ] Jeu de données démo
- [ ] Comptes démo
- [ ] Parcours démo
- [ ] Vérification sécurité

---

# Phase 9 — Déploiement

- [ ] Environnement staging
- [ ] HTTPS
- [ ] Variables production
- [ ] Base production
- [ ] Migrations production
- [ ] Sauvegardes
- [ ] Monitoring
- [ ] Logs
- [ ] Procédure restauration
- [ ] Compte administrateur BIOWATT-CI
- [ ] Documentation de remise

---

# Backlog Phase 2

- [ ] IoT
- [ ] Télémétrie temps réel
- [ ] Optimisation logistique
- [ ] Notifications SMS/WhatsApp
- [ ] Analyse financière avancée
- [ ] Contrats numériques
- [ ] Application mobile
- [ ] API partenaires
