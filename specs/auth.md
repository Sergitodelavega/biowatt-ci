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

### Comptes de démonstration

- En développement local uniquement, l'écran peut proposer une connexion directe pour les cinq profils seedés : administration, État, collectivité, détenteur et opérateur.
- Le raccourci envoie uniquement le rôle à une route serveur dédiée ; cette route ne fait confiance qu'à une liste de rôles autorisés et à l'utilisateur de démonstration correspondant.
- Les mots de passe ne sont jamais affichés ni préremplis par l'interface.
- Les comptes sont créés par le seed avec `DEMO_SEED_PASSWORD`, configuré hors du dépôt et jamais documenté avec une valeur réelle.
- En production, la route de connexion directe n'est pas disponible ; email et mot de passe restent obligatoires.
- Si un compte de démonstration existe en base, la route vérifie que son rôle correspond et que son statut est `ACTIVE`.
- Le jeu local de démonstration peut servir de repli uniquement quand `NODE_ENV=development` et que la base ne contient pas ce compte.

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
- La route de connexion rapide est indisponible si `NODE_ENV` n'est pas `development`.
- Un rôle absent de la liste de démonstration ou un compte existant non actif ne peut pas ouvrir de session rapide.
- La route email/mot de passe ne crée aucune session sans vérifier le mot de passe hashé en base.
