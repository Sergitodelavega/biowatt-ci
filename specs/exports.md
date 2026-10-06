# SPEC — Exports, audit et gouvernance des données

## Objectif

Permettre l’export des données autorisées et assurer une traçabilité minimale des actions sensibles.

## Exports

Formats MVP :
- CSV ;
- éventuellement XLSX après validation du besoin.

## Règles

Un export doit respecter les mêmes permissions que la consultation.

Un utilisateur ne doit pas pouvoir exporter une donnée qu’il ne peut pas consulter.

## Exports publics/institutionnels

Privilégier :
- agrégation ;
- anonymisation ;
- suppression des coordonnées exactes ;
- suppression des contacts privés ;
- exclusion des champs commerciaux sensibles.

## Audit

Journaliser au minimum :
- création ;
- modification ;
- validation ;
- archivage/suppression logique ;
- changement de rôle ;
- export ;
- demande de contact ;
- acceptation/refus d’une demande.

## AuditLog

Champs recommandés :
- `id`
- `actorUserId`
- `action`
- `entityType`
- `entityId`
- `timestamp`
- `metadata`
- `ipHashOrSafeReference` si nécessaire et conforme à la politique retenue.

Ne pas enregistrer de secrets.

## Validation

L’administrateur doit pouvoir :
- approuver ;
- rejeter ;
- demander une correction ;
- consulter la source ;
- voir l’historique.

## Historique

Pour les données critiques, conserver au minimum :
- date ;
- auteur ;
- ancienne valeur ou résumé ;
- nouvelle valeur ou résumé ;
- motif si applicable.

## Critères d’acceptation

- Un export respecte les permissions.
- Un export sensible est impossible pour un rôle non autorisé.
- Les actions critiques sont auditables.
- L’audit ne contient pas de mots de passe ou secrets.
- Une validation laisse une trace.
