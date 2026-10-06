# SPEC — Smart Matching

## Objectif

Identifier des couples gisement/unité potentiellement intéressants, sans automatiser la contractualisation.

## Entrées

Gisement :
- type de substrat ;
- volume ;
- fréquence ;
- régularité ;
- saisonnalité ;
- distance ;
- tri ;
- contamination ;
- prétraitement ;
- qualité des données.

Unité :
- substrats acceptés ;
- besoin quotidien ;
- capacité ;
- contraintes ;
- localisation ;
- statut opérationnel.

## Étapes

1. filtrer les unités compatibles ;
2. filtrer les gisements compatibles ;
3. calculer la distance ;
4. estimer le volume mobilisable ;
5. comparer au besoin de l’unité ;
6. évaluer la qualité des données ;
7. intégrer les contraintes de tri/contamination ;
8. produire un score ;
9. classer le résultat.

## Résultat

Champs minimum :
- gisement ;
- unité ;
- distance ;
- volume mobilisable estimé ;
- pourcentage du besoin couvert ;
- score de compatibilité ;
- statut.

Statuts :
- `A_VERIFIER_TERRAIN`
- `COMPATIBLE_SOUS_CONDITIONS`
- `NON_PRIORITAIRE`

## Confidentialité

Le matching peut utiliser des coordonnées exactes côté serveur sans les exposer au demandeur.

Le demandeur reçoit uniquement les informations nécessaires.

## Contact

Workflow :

1. opérateur sélectionne un résultat ;
2. il envoie une demande ;
3. propriétaire reçoit la demande ;
4. propriétaire accepte ou refuse ;
5. en cas d’acceptation, les informations de contact autorisées sont partagées.

Aucun contrat n’est créé automatiquement.

## Score

Le score doit être explicable.

Il peut combiner :
- compatibilité substrat ;
- couverture du besoin ;
- distance ;
- régularité ;
- qualité de donnée ;
- contraintes de prétraitement.

Les pondérations doivent être configurables.

## Critères d’acceptation

- Un gisement incompatible ne doit pas être classé prioritaire.
- Une unité hors service ne doit pas être proposée comme priorité opérationnelle.
- Le score est explicable.
- Les coordonnées privées restent protégées.
- Une demande de contact n’ouvre pas automatiquement les données confidentielles.
- Aucun contrat n’est créé par le moteur.
