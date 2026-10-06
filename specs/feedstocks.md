# SPEC — Gisements

## Objectif

Gérer les gisements organiques et leurs caractéristiques utiles au calcul de potentiel, à la cartographie et au matching.

## Entité FeedstockSite

Champs recommandés :

- `id`
- `name`
- `ownerOrganizationId`
- `sector`
- `substrateType`
- `location`
- `totalWasteVolume`
- `fermentableFraction`
- `estimatedFermentableVolume`
- `frequency`
- `regularity`
- `seasonality`
- `sortingStatus`
- `contaminationStatus`
- `pretreatment`
- `dataQualityStatus`
- `sourceId`
- `updatedAt`
- `sharingConsent`
- `status`

## Secteurs possibles

Exemples :
- marché ;
- huilerie ;
- élevage ;
- abattoir ;
- coopérative ;
- manioc ;
- agro-industrie ;
- autres.

La liste doit être configurable.

## Confidentialité

Selon le rôle, afficher :
- niveau public : agrégation ou localisation dégradée ;
- niveau institutionnel : données territoriales autorisées ;
- propriétaire : données détaillées de ses propres gisements ;
- opérateur : informations nécessaires au matching, sans exposition automatique des coordonnées privées.

## CRUD

Le détenteur peut :
- créer ;
- consulter ;
- modifier ;
- archiver

ses propres gisements.

Il ne peut pas modifier ceux d’un autre détenteur.

## Qualité

Chaque gisement doit afficher son statut de qualité.

Les statuts sont :
- `DEMONSTRATION`
- `DECLARE`
- `DOCUMENTARY_VERIFIED`
- `SITE_VERIFIED`
- `MEASURED`

## Validation

Une donnée peut nécessiter une validation admin avant d’être utilisée dans certains agrégats officiels.

## Carte

Filtres :
- secteur ;
- type de substrat ;
- territoire ;
- qualité ;
- disponibilité ;
- statut.

Les coordonnées exactes ne sont jamais exposées à un rôle qui n’en a pas besoin.

## Critères d’acceptation

- Un propriétaire peut créer son gisement.
- Un propriétaire peut modifier son gisement.
- Un propriétaire ne peut pas modifier celui d’un autre.
- Les données sensibles sont masquées selon le rôle.
- Un gisement apparaît sur la carte selon son statut et sa visibilité.
- Toute donnée affichée comme mesurée possède effectivement le statut `MEASURED`.
