# SPEC — Authentification, comptes et rôles

## Objectif

Permettre à chaque utilisateur de disposer d’un compte individuel et de garantir que les permissions sont appliquées côté serveur.

## Rôles

- `ADMIN_BIOWATT`
- `STATE`
- `COLLECTIVITY`
- `FEEDSTOCK_OWNER`
- `BIOGAS_OPERATOR`
- `PUBLIC_VISITOR`

## États de compte

- `PENDING`
- `ACTIVE`
- `REJECTED`
- `SUSPENDED`

## Règles

1. Aucun compte partagé pour une institution.
2. Chaque personne utilise son propre compte.
3. Les comptes État/agence/collectivité/organisation peuvent nécessiter une validation manuelle.
4. Le rôle ne doit jamais être accepté uniquement depuis le navigateur.
5. Un utilisateur suspendu ne peut plus accéder aux fonctions protégées.
6. Le propriétaire ne peut pas accéder aux données privées d’un autre propriétaire.
7. L’administrateur BIOWATT-CI peut gérer les comptes selon les règles d’audit.

## Inscription

Champs minimum :
- nom ;
- prénom ;
- email ;
- téléphone facultatif ;
- mot de passe ;
- type de profil ;
- organisation ;
- territoire ;
- justification/description si nécessaire.

## Connexion

- email + mot de passe ;
- gestion session ;
- logout ;
- reset password.

## Profil

Un utilisateur peut consulter ses informations autorisées et modifier les informations non sensibles prévues.

## Validation

Pour un compte nécessitant validation :
1. inscription ;
2. statut `PENDING` ;
3. examen admin ;
4. acceptation → `ACTIVE` ;
5. refus → `REJECTED`.

## Sécurité

- mot de passe hashé par le fournisseur d’authentification ;
- cookies/session sécurisés ;
- protection CSRF selon architecture ;
- rate limiting si disponible ;
- aucune donnée sensible dans les logs ;
- autorisation côté serveur.

## Critères d’acceptation

- Un visiteur non connecté ne peut pas accéder aux écrans privés.
- Un utilisateur connecté ne peut pas changer lui-même son rôle vers `ADMIN_BIOWATT`.
- Un propriétaire A ne peut pas lire les données privées du propriétaire B.
- Un compte `PENDING` ne peut pas utiliser les fonctions réservées aux comptes actifs.
- Un utilisateur déconnecté ne peut pas appeler une API protégée.
