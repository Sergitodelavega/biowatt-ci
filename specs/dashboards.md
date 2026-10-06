# SPEC — Dashboards

## Objectif

Fournir des tableaux de bord adaptés aux rôles.

## Dashboard État

Indicateurs possibles :
- nombre de gisements ;
- potentiel agrégé ;
- unités par statut ;
- répartition territoriale ;
- répartition par secteur ;
- qualité des données ;
- évolution temporelle si historique disponible.

Les données doivent être agrégées selon les règles de confidentialité.

## Dashboard Collectivité

Périmètre :
- territoire de la collectivité ;
- gisements ;
- unités ;
- potentiel ;
- qualité des données ;
- propositions/signalements.

Une collectivité ne doit pas accéder aux données privées hors de son périmètre ou de ses permissions.

## Dashboard Détenteur

Afficher :
- mes gisements ;
- statut de validation ;
- qualité ;
- dernière mise à jour ;
- opportunités de matching ;
- demandes de contact.

## Dashboard Valorisateur

Afficher :
- mon unité ;
- besoin quotidien ;
- substrats acceptés ;
- résultats Smart Matching ;
- demandes envoyées ;
- statut des demandes.

## Dashboard Admin

Afficher :
- comptes en attente ;
- validations ;
- gisements à vérifier ;
- unités à vérifier ;
- qualité des données ;
- audit ;
- exports.

## KPI

Chaque KPI doit préciser :
- période si applicable ;
- territoire ;
- statut qualité inclus ;
- date de mise à jour.

## Visualisation

Utiliser :
- cartes ;
- cartes KPI ;
- graphiques simples ;
- tableaux filtrables.

Éviter les visualisations décoratives sans valeur décisionnelle.

## Critères d’acceptation

- Chaque rôle voit son dashboard.
- Les KPI sont calculés à partir des données autorisées.
- Les données privées ne sont pas exposées.
- Les filtres modifient effectivement les résultats.
- Les dashboards affichent l’état de fraîcheur des données.
