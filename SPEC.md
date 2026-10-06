# SPEC.md — Spécification Principale BIOWATT-CI

## 1. Vision et Mission

**BIOWATT-CI** est la plateforme numérique nationale de cartographie, qualification et valorisation des gisements organiques et du potentiel biogaz en Côte d’Ivoire.

Slogan : **« Du déchet au watt, de la donnée à la décision »**

Parcours de valeur :
**Gisements → Potentiel → Unités → Matching → Décision**

---

## 2. Principes directeurs

1. **Spec-first** : La spécification est la source de vérité absolue.
2. **Qualité et traçabilité des données** : Statuts explicites (`DEMONSTRATION`, `DECLARE`, `DOCUMENTARY_VERIFIED`, `SITE_VERIFIED`, `MEASURED`). Une hypothèse/déclaration ne doit jamais être présentée comme une mesure réelle.
3. **Sécurité et confidentialité** : Autorisation contrôlée côté serveur (RBAC). Les coordonnées précises et contacts des gisements/unités sont protégés et masqués pour le public/rôles non autorisés.
4. **Smart Matching non engageant** : Moteur de mise en relation indicatif sans contractualisation automatique.
5. **Pré-diagnostic du potentiel** : Distingue *Potentiel théorique*, *Potentiel mobilisable*, et *Potentiel valorisable*.

---

## 3. Rôles et Autorisations (RBAC)

- `ADMIN_BIOWATT` : Administrateur plateforme (validation comptes, gouvernance, audit, gestion).
- `STATE` : Ministères et institutions publiques (vue agrégée nationale, KPI, planification).
- `COLLECTIVITY` : Collectivités territoriales (vue territoriale autorisée, signalements).
- `FEEDSTOCK_OWNER` : Détenteur de gisements (gestion de ses propres gisements, consentement, demandes entrant).
- `BIOGAS_OPERATOR` : Opérateur d’unité biogaz (gestion de ses propres unités, besoins substrats, matching).
- `PUBLIC_VISITOR` : Grand public (carte agrégée anonymisée, simulateur public, informations générales).

---

## 4. États des Comptes

- `PENDING` : En attente de validation par l'administrateur (pour comptes institutionnels/professionnels).
- `ACTIVE` : Compte actif et autorisé.
- `REJECTED` : Compte refusé lors de la vérification.
- `SUSPENDED` : Compte suspendu.

---

## 5. Modules Spécifiés

Pour les spécifications détaillées par module, se référer aux documents dédiés :
- `specs/auth.md` : Authentification, comptes et rôles.
- `specs/feedstocks.md` : Gestion des gisements organiques et carte.
- `specs/biogas-units.md` : Gestion des unités de biogaz et besoins.
- `specs/simulator.md` : Moteur de simulation de potentiel biogaz.
- `specs/matching.md` : Algorithme de Smart Matching et demandes de contact.
- `specs/dashboards.md` : Tableaux de bord par rôle (État, Collectivité, Détenteur, Valorisateur, Admin).
- `specs/exports.md` : Exports sécurisés, journal d'audit et gouvernance.

---

## 6. Propriété et Gouvernance (Ownership)

L'intégralité du code, des données, de la base PostgreSQL/PostGIS, des clés d'API et des secrets de production est et reste la propriété exclusive de **BIOWATT-CI**.
