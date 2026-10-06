# Procédure de Déploiement Vercel — BIOWATT-CI

Ce document décrit la procédure officielle et spec-first pour déployer la plateforme **BIOWATT-CI** sur **Vercel** en environnement de Staging ou Production.

---

## 1. Pré-requis de Déploiement

1. **Un compte Vercel** relié au dépôt GitHub ou à la CLI `vercel`.
2. **Une base de données PostgreSQL + PostGIS managée** :
   - *Option recommandée* : [Neon.tech](https://neon.tech) ou [Supabase](https://supabase.com) (base de données PostgreSQL hautement disponible).
   - *Option alternative* : Vercel Postgres / Railway PostgreSQL.
3. **Clés et Variables d'Environnement**.

---

## 2. Variables d'Environnement Obligatoires sur Vercel

Dans le tableau de bord Vercel (**Project Settings → Environment Variables**), configurer les 4 variables suivantes :

| Nom de la variable | Description / Exemple | Type |
|---|---|---|
| `DATABASE_URL` | String de connexion PostgreSQL avec SSL : `postgresql://user:pass@ep-xyz.neon.tech/biowatt_db?sslmode=require` | Secret |
| `JWT_SECRET` | Clé secrète de signature des jetons de session (minimum 32 caractères) | Secret |
| `NEXT_PUBLIC_APP_URL` | URL du domaine principal : `https://biowatt-ci.vercel.app` | Plaintext |
| `NODE_ENV` | `production` | Plaintext |

---

## 3. Déploiement pas-à-pas

### Méthode A — Via l'interface Web Vercel & GitHub (Recommandée)

1. **Push du code** sur le dépôt GitHub BIOWATT-CI :
   ```bash
   git add .
   git commit -m "feat(deploy): preparation du deploiement Vercel avec Prisma et PostGIS"
   git push origin main
   ```

2. **Importer le projet sur Vercel** :
   - Sur [Vercel Dashboard](https://vercel.com/new), cliquer sur **Import Project**.
   - Sélectionner le dépôt GitHub `biowatt-ci`.
   - Framework Preset : **Next.js**.
   - Renseigner les **Environment Variables** (voir section 2).

3. **Lancer le déploiement** :
   - Vercel exécute automatiquement `npm install`, puis `postinstall` (`npx prisma generate`), puis `npm run build`.

---

### Méthode B — Via la CLI Vercel

Si vous disposez de la CLI Vercel installée sur votre machine :

```bash
# 1. Connexion à Vercel
npx vercel login

# 2. Lier et déployer en environnement de preview / staging
npx vercel

# 3. Déployer en Production
npx vercel --prod
```

---

## 4. Initialisation de la Base de Données de Production

Une fois le projet créé sur Vercel et la variable `DATABASE_URL` configurée, initialiser la structure des tables et alimenter les données de démonstration depuis votre terminal local :

```bash
# 1. Pousser le schéma Prisma et créer les tables PostgreSQL sur la DB distante
npx prisma db push

# 2. Alimenter les données et comptes de démonstration (statut DEMONSTRATION)
npx prisma db seed
```

---

## 5. Comptes de Démonstration disponibles après Seed

| Rôle | Email | Mot de Passe | Description |
|---|---|---|---|
| **ADMIN_BIOWATT** | `admin@biowatt.ci` | `DemoBiowatt2026!` | Administration globale et validation des comptes |
| **STATE** | `etat@environnement.gouv.ci` | `DemoBiowatt2026!` | Vue agrégée ministérielle |
| **COLLECTIVITY** | `mairie@sanpedro.ci` | `DemoBiowatt2026!` | Vue territoriale San-Pédro |
| **FEEDSTOCK_OWNER** | `detenteur@palm-ci.co` | `DemoBiowatt2026!` | Gestion des gisements de palmier |
| **BIOGAS_OPERATOR** | `operateur@biogaz.ci` | `DemoBiowatt2026!` | Gestion de la centrale biogaz |

---

## 6. Vérifications Post-Déploiement

- [ ] L'URL HTTPS Vercel se charge sans erreur (`https://biowatt-ci.vercel.app`).
- [ ] Le bouton de basculement **Light / Dark Mode** fonctionne.
- [ ] La connexion avec les comptes de démonstration fonctionne (`/auth/login`).
- [ ] La carte des gisements (`/feedstocks`) et la carte des unités (`/units`) affichent correctement les repères de Côte d'Ivoire.
- [ ] Les coordonnées GPS précises et les contacts privés sont correctement masqués pour les visiteurs anonymes.
