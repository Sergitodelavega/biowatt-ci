# SPEC — Unités de biogaz

## Objectif

Référencer les unités de biogaz et leurs besoins en substrats pour permettre la décision et le Smart Matching.

## Entité BiogasUnit

Champs recommandés :

- `id`
- `name`
- `operatorOrganizationId`
- `location`
- `technology`
- `commissioningYear`
- `operationalStatus`
- `dailySubstrateNeed`
- `capacity`
- `acceptedSubstrates`
- `production`
- `productionReliability`
- `sourceId`
- `dataQualityStatus`
- `updatedAt`
- `protectedContact`

## Statuts

Exemples :
- planifiée ;
- en construction ;
- opérationnelle ;
- arrêtée ;
- inactive.

La liste doit être configurable.

## Droits

L’opérateur peut :
- créer son unité ;
- modifier son unité ;
- consulter ses informations privées.

Les autres utilisateurs voient seulement les informations autorisées par leur rôle.

## Production

Une production déclarée doit indiquer sa fiabilité.

Ne jamais afficher une donnée déclarée comme une mesure instrumentée.

## Matching

L’unité peut fournir :
- besoin quotidien ;
- capacité ;
- substrats acceptés ;
- contraintes ;
- fréquence souhaitée.

## Validation

Une modification critique peut passer par validation admin selon le workflow retenu.

## Carte

Les unités sont affichées selon les droits.

Les coordonnées précises peuvent être masquées ou dégradées pour les rôles non autorisés.

## Critères d’acceptation

- Un opérateur ne peut modifier que ses unités.
- Le besoin journalier est validé comme valeur positive.
- Les substrats acceptés sont structurés.
- Le statut de production est visible.
- La qualité de la donnée est affichée.
- Les contacts privés ne sont pas publics.
