# SPEC — Simulateur de potentiel biogaz

## Objectif

Fournir un pré-diagnostic indicatif du potentiel biogaz à partir d’un substrat et d’un tonnage.

## Positionnement

Le simulateur :
- aide à comparer des scénarios ;
- donne un ordre de grandeur ;
- ne remplace pas une étude de faisabilité ;
- ne constitue pas une promesse de production.

## Entrées

Minimum :
- substrat ;
- tonnage ;
- fréquence ;
- scénario de mobilisation.

Entrées optionnelles :
- fraction fermentescible ;
- paramètre spécifique au substrat ;
- taux de mobilisation ;
- facteur de conversion ;
- rendement de valorisation.

## Sorties

Afficher séparément :

### Potentiel théorique
Potentiel calculé avant prise en compte des contraintes de mobilisation.

### Potentiel mobilisable
Potentiel après application d’un scénario réaliste de mobilisation.

### Potentiel valorisable
Part estimée pouvant effectivement être valorisée dans le scénario.

## Principes

Ne pas utiliser un taux national fixe comme vérité universelle.

Le taux de mobilisation doit pouvoir dépendre :
- du secteur ;
- du territoire ;
- du scénario ;
- de la qualité des données.

## Paramètres

Les paramètres scientifiques doivent être :
- centralisés ;
- versionnés ;
- documentés ;
- testables.

## Affichage

Chaque résultat doit afficher :
- unité ;
- hypothèses principales ;
- qualité des données d’entrée ;
- avertissement « pré-diagnostic ».

## Cas limites

Refuser ou signaler :
- tonnage négatif ;
- valeur impossible ;
- substrat inconnu ;
- unité incompatible ;
- données insuffisantes.

## Critères d’acceptation

- Deux substrats différents peuvent avoir des paramètres différents.
- Le potentiel mobilisable peut être inférieur au théorique.
- Le potentiel valorisable ne peut pas être supérieur au potentiel mobilisable sans justification explicite.
- Les calculs sont testés.
- Les hypothèses sont visibles.
- Le résultat n’est jamais présenté comme une mesure réelle.
