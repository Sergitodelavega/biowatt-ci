# BIOWATT-CI — Spécification fonctionnelle et technique
## Version 1.0 — MVP — Document de référence pour développement assisté par IA

**Produit :** Plateforme web BIOWATT-CI  
**Slogan :** « Du déchet au watt, de la donnée à la décision »  
**Périmètre :** MVP prioritaire  
**Statut :** Spécification initiale à valider par BIOWATT-CI  
**Date :** 2026-10-06

---

# 1. Objectif du document

Ce document constitue la source de vérité fonctionnelle du MVP BIOWATT-CI.

Il doit être conservé dans le dépôt Git et mis à jour avant ou avec toute évolution fonctionnelle importante.

Le développement doit suivre une approche **spec-first / spec-anchored** :

1. comprendre et valider la spécification ;
2. produire un plan d’implémentation ;
3. faire valider le plan avant les changements structurants ;
4. implémenter par lots fonctionnels ;
5. tester chaque fonctionnalité contre ses critères d’acceptation ;
6. mettre à jour la spécification lorsqu’une décision fonctionnelle change.

**Règle fondamentale :** le code ne doit pas devenir la seule source de vérité de l’intention métier.

---

# 2. Vision produit

BIOWATT-CI est une plateforme de cartographie, qualification et mise en relation des gisements de déchets organiques et des unités de biogaz en Côte d’Ivoire.

La plateforme transforme :

**Gisements → Potentiel → Unités → Matching → Décision**

Elle doit permettre de :

- recenser les gisements ;
- qualifier leur fiabilité ;
- estimer leur potentiel biogaz ;
- recenser les unités de biogaz ;
- rapprocher gisements et unités ;
- protéger les données privées ;
- fournir aux acteurs publics des indicateurs agrégés pour la planification ;
- permettre une validation administrative des données sensibles.

La plateforme est un outil d’aide à la décision et de pré-diagnostic. Elle ne constitue pas automatiquement une étude de faisabilité, une garantie de production ou un contrat commercial.

---

# 3. Périmètre du MVP

## 3.1 Fonctionnalités obligatoires

Le MVP doit inclure :

1. inscription et connexion ;
2. rôles et contrôle d’accès côté serveur ;
3. profils utilisateurs et organisations ;
4. carte interactive de Côte d’Ivoire ;
5. affichage des gisements ;
6. affichage des unités de biogaz ;
7. filtres cartographiques ;
8. fiches détaillées gisements ;
9. fiches détaillées unités ;
10. création/modification d’un gisement par son détenteur ;
11. création/modification d’une unité par son exploitant ;
12. workflow de validation administrative ;
13. dashboard État ;
14. simulateur de potentiel biogaz ;
15. Smart Matching simple ;
16. demandes de mise en relation ;
17. journal d’activité ;
18. export de données agrégées ;
19. interface administrateur ;
20. README complet et code source documenté.

## 3.2 Hors périmètre MVP

À prévoir en phase 2 :

- télémétrie IoT ;
- capteurs connectés ;
- suivi temps réel de production ;
- optimisation complète de la logistique ;
- alertes SMS/WhatsApp ;
- analyses financières détaillées ;
- contractualisation automatique ;
- marketplace ;
- optimisation avancée des tournées de collecte.

---

# 4. Utilisateurs et rôles

## 4.1 ADMIN

**Administrateur BIOWATT-CI**

Droits :

- gérer les utilisateurs ;
- gérer les rôles ;
- gérer les organisations ;
- valider/rejeter les comptes institutionnels ;
- valider/rejeter les gisements ;
- valider/rejeter les unités ;
- gérer les sources ;
- consulter toutes les données ;
- consulter les journaux ;
- exporter les données autorisées ;
- gérer les paramètres du simulateur ;
- gérer les règles de matching.

## 4.2 STATE

**État / ministère / agence publique**

Droits :

- consulter le dashboard national ;
- consulter les indicateurs régionaux ;
- consulter les cartes ;
- consulter les données agrégées ;
- consulter les zones prioritaires ;
- exporter des données agrégées ;
- ne pas modifier directement les données privées des détenteurs.

Compte soumis à validation administrative.

## 4.3 COLLECTIVITY

**Collectivité**

Droits :

- consulter les données de son territoire ;
- consulter les indicateurs territoriaux ;
- signaler un gisement ;
- proposer une correction ;
- consulter l’état de vérification des données de son territoire.

Elle ne peut pas consulter les données privées hors de son périmètre d’autorisation.

Compte soumis à validation administrative.

## 4.4 FEEDSTOCK_OWNER

**Détenteur de gisement**

Exemples :

- marché ;
- huilerie ;
- élevage ;
- abattoir ;
- coopérative ;
- usine de manioc ;
- agro-industrie.

Droits :

- créer ses propres gisements ;
- modifier ses propres gisements ;
- déclarer ses tonnages ;
- consulter le statut de validation de ses données ;
- utiliser le simulateur ;
- voir les opportunités de matching concernant ses gisements ;
- accepter/refuser une demande de mise en relation.

Il ne doit jamais pouvoir modifier ou consulter les données privées d’un autre détenteur.

## 4.5 BIOGAS_OPERATOR

**Unité de biogaz / valorisateur**

Droits :

- créer sa propre unité ;
- modifier sa propre unité ;
- déclarer ses besoins ;
- déclarer sa capacité ;
- consulter les gisements compatibles selon les règles de confidentialité ;
- demander une mise en relation ;
- suivre ses demandes.

Les coordonnées exactes et volumes confidentiels des gisements ne sont pas visibles par défaut.

## 4.6 PUBLIC

**Visiteur public**

Droits :

- consulter la carte publique ;
- consulter des statistiques agrégées ;
- consulter les contenus institutionnels.

Restrictions :

- aucune donnée commerciale sensible ;
- aucune coordonnée précise de site privé ;
- aucun contact privé ;
- aucun volume confidentiel ;
- aucune donnée permettant d’identifier indirectement un acteur privé lorsque l’agrégation est insuffisante.

---

# 5. Principes de sécurité

## 5.1 Règles obligatoires

- Les mots de passe ne doivent jamais être stockés en clair.
- Les contrôles d’autorisation doivent être effectués côté serveur.
- Le frontend ne doit jamais être considéré comme une barrière de sécurité.
- Toutes les requêtes sensibles doivent vérifier l’identité et les droits de l’utilisateur.
- Un utilisateur propriétaire d’un gisement ne peut modifier que ses propres gisements.
- Un exploitant d’unité ne peut modifier que ses propres unités.
- Les coordonnées privées doivent être protégées.
- Les volumes confidentiels doivent être protégés.
- Les exports doivent être contrôlés par rôle.
- Les opérations sensibles doivent être journalisées.
- Les changements de rôle doivent être journalisés.
- Les validations administratives doivent être journalisées.

## 5.2 Audit log

Les événements suivants doivent être enregistrés :

- création de compte ;
- connexion ;
- changement de rôle ;
- création de gisement ;
- modification de gisement ;
- validation/rejet de gisement ;
- création d’unité ;
- modification d’unité ;
- validation/rejet d’unité ;
- demande de mise en relation ;
- acceptation/refus d’une mise en relation ;
- export ;
- modification d’un paramètre du simulateur ;
- modification d’une règle de matching.

Chaque événement contient au minimum :

- id ;
- utilisateur ;
- action ;
- ressource ;
- identifiant de ressource ;
- date/heure ;
- résultat ;
- métadonnées utiles ;
- adresse IP si juridiquement et techniquement retenue par BIOWATT-CI.

---

# 6. Authentification

## 6.1 Fonctionnalités

- inscription ;
- connexion ;
- déconnexion ;
- mot de passe oublié ;
- réinitialisation ;
- session persistante sécurisée ;
- protection des routes privées ;
- redirection vers le dashboard correspondant au rôle.

## 6.2 Inscription

Le formulaire doit permettre de choisir :

- type de profil ;
- nom ;
- prénom ;
- email ;
- téléphone ;
- organisation ;
- fonction ;
- mot de passe ;
- confirmation du mot de passe ;
- consentement aux règles de partage des données.

Les comptes STATE et COLLECTIVITY doivent avoir le statut :

`PENDING_ADMIN_REVIEW`

jusqu’à validation.

Les organisations peuvent également être soumises à validation selon les règles BIOWATT-CI.

## 6.3 États de compte

- `PENDING`
- `ACTIVE`
- `REJECTED`
- `SUSPENDED`
- `DISABLED`

---

# 7. Organisations

Une organisation est distincte d’un utilisateur.

Une organisation peut avoir plusieurs utilisateurs.

Exemples :

- ministère ;
- mairie ;
- coopérative ;
- marché ;
- abattoir ;
- unité de biogaz ;
- entreprise agro-industrielle.

Le système doit éviter les comptes partagés.

**Chaque personne possède son compte individuel.**

---

# 8. Modèle de données fonctionnel

## 8.1 User

Champs minimum :

- id
- email
- prénom
- nom
- téléphone
- rôle
- statut
- organisation_id
- created_at
- updated_at
- last_login_at

## 8.2 Organization

- id
- nom
- type
- identifiant légal si disponible
- région
- département
- commune
- statut de validation
- created_at
- updated_at

## 8.3 FeedstockSite / Gisement

Champs minimum :

- id
- identifiant public
- nom du site
- organization_id
- owner_user_id
- filière
- type de substrat
- région
- département
- commune
- latitude
- longitude
- adresse descriptive
- tonnage_total
- unité_de_tonnage
- fraction_fermentescible
- tonnage_fermentescible
- fréquence
- régularité
- saisonnalité
- tri_source
- contamination
- besoin_pretri
- statut_donnée
- niveau_confiance
- source
- source_reference
- justificatif
- date_mesure
- date_mise_a_jour
- consentement_partage
- consentement_coordonnees
- statut_validation
- created_at
- updated_at

## 8.4 BiogasUnit

- id
- identifiant_public
- nom
- organization_id
- operator_user_id
- région
- département
- commune
- latitude
- longitude
- technologie
- année_mise_en_service
- statut_unité
- besoin_quotidien_substrat
- capacité
- types_substrats_acceptés
- production_déclarée
- production_statut_fiabilité
- contact_privé
- source
- date_mise_a_jour
- statut_validation
- created_at
- updated_at

## 8.5 DataSource

- id
- nom
- type
- organisme
- référence
- document
- date
- niveau_fiabilité
- notes

## 8.6 Verification

- id
- ressource_type
- ressource_id
- type_verification
- statut
- vérificateur
- date
- commentaire
- justificatif

## 8.7 MatchingRequest

- id
- feedstock_id
- biogas_unit_id
- initiateur
- score
- statut
- message
- created_at
- updated_at

États :

- `REQUESTED`
- `ACCEPTED`
- `REFUSED`
- `CANCELLED`
- `CONTACT_SHARED`

Les coordonnées précises ne sont partagées qu’après acceptation conformément aux règles BIOWATT-CI.

## 8.8 AuditLog

Voir section sécurité.

---

# 9. Niveaux de fiabilité des données

Valeurs officielles :

1. `DEMONSTRATION`
2. `DECLAREE`
3. `VERIFIED_DOCUMENTARY`
4. `VERIFIED_ON_SITE`
5. `MEASURED`

Ordre de fiabilité :

`DEMONSTRATION < DECLAREE < VERIFIED_DOCUMENTARY < VERIFIED_ON_SITE < MEASURED`

La plateforme doit afficher explicitement ce niveau.

**Interdiction fonctionnelle :** une donnée `DEMONSTRATION` ou une hypothèse ne doit jamais être présentée comme une donnée `MEASURED`.

Chaque fiche doit afficher :

- statut ;
- date de mise à jour ;
- source ;
- auteur/déclarant ;
- justificatif si disponible.

---

# 10. Carte interactive

## 10.1 Objectif

Afficher les gisements et unités de Côte d’Ivoire sur une carte interactive.

## 10.2 Catégories de gisements

- marchés ;
- déchets alimentaires ;
- transformation du manioc / attiéké ;
- élevages ;
- abattoirs ;
- huileries de palme et effluents ;
- autres agro-industries.

## 10.3 Filtres

- région ;
- département ;
- commune ;
- filière ;
- type de substrat ;
- statut de vérification ;
- niveau de potentiel ;
- statut de l’unité ;
- type de technologie si disponible.

## 10.4 Confidentialité cartographique

Selon le rôle :

**PUBLIC**
- localisation agrégée ou approximative ;
- pas de coordonnées privées ;
- pas de volumes sensibles.

**STATE**
- accès aux données agrégées et indicateurs ;
- précision selon les règles définies par BIOWATT-CI.

**COLLECTIVITY**
- données autorisées dans son territoire.

**OWNER**
- coordonnées précises de ses propres sites ;
- autres sites visibles uniquement selon les règles de partage.

**BIOGAS_OPERATOR**
- sites compatibles sous forme protégée ;
- coordonnées exactes uniquement après accord de mise en relation lorsque nécessaire.

**ADMIN**
- accès complet.

---

# 11. Fiche gisement

La fiche doit afficher :

### Identité
- nom/identifiant ;
- organisation ;
- type de substrat ;
- filière.

### Localisation
- région ;
- département ;
- commune ;
- coordonnées selon niveau d’accès.

### Quantités
- tonnage total ;
- fraction fermentescible ;
- tonnage fermentescible ;
- fréquence ;
- saisonnalité ;
- régularité.

### Qualité
- tri à la source ;
- contamination ;
- besoin de pré-tri.

### Fiabilité
- statut ;
- source ;
- date ;
- justificatif ;
- niveau de confiance.

### Partage
- consentement de partage ;
- consentement des coordonnées.

---

# 12. Création et modification d’un gisement

Un FEEDSTOCK_OWNER peut :

- créer un gisement ;
- enregistrer un brouillon ;
- soumettre le gisement ;
- modifier ses propres données ;
- consulter le statut de validation.

Workflow :

`DRAFT → SUBMITTED → UNDER_REVIEW → VERIFIED / REJECTED`

Une modification importante d’un gisement validé peut repasser par validation.

L’interface doit clairement distinguer :

- sauvegarde ;
- soumission ;
- validation ;
- rejet.

---

# 13. Registre des unités de biogaz

Une fiche unité contient :

- nom/identifiant ;
- organisation ;
- localisation ;
- technologie ;
- année de mise en service ;
- statut ;
- besoin quotidien en substrat ;
- capacité ;
- types de substrats acceptés ;
- production déclarée ;
- fiabilité de la production ;
- contacts protégés ;
- source ;
- date de mise à jour.

États :

- `IN_PROJECT`
- `OPERATIONAL`
- `STOPPED`
- `TO_CONFIRM`

L’exploitant ne peut modifier que sa propre unité.

---

# 14. Simulateur de potentiel biogaz

## 14.1 Objectif

Fournir un ordre de grandeur de potentiel.

Le résultat est un **pré-diagnostic**.

Le résultat ne constitue :

- ni une étude de faisabilité ;
- ni une garantie de production ;
- ni une promesse énergétique ;
- ni un engagement contractuel.

## 14.2 Entrées

Minimum :

- type de substrat ;
- tonnage.

Paramètres facultatifs :

- fraction fermentescible ;
- facteur de production biogaz ;
- facteur méthane ;
- rendement énergétique ;
- taux de mobilisation ;
- taux de valorisation.

## 14.3 Trois niveaux de potentiel

### Potentiel théorique

Potentiel issu du tonnage et du facteur de production applicable.

### Potentiel mobilisable

Potentiel théorique × taux de mobilisation.

Le taux de mobilisation doit être paramétrable selon :

- filière ;
- territoire ;
- qualité des données ;
- saisonnalité ;
- contraintes opérationnelles.

**Interdiction :** ne pas utiliser un taux national fixe présenté comme définitif.

### Potentiel valorisable

Potentiel mobilisable × facteurs de valorisation appropriés.

Les hypothèses utilisées doivent être visibles.

## 14.4 Sortie

Afficher :

- potentiel théorique ;
- potentiel mobilisable ;
- potentiel valorisable ;
- unité ;
- hypothèses ;
- niveau de confiance ;
- avertissement de pré-diagnostic.

---

# 15. Smart Matching

## 15.1 Objectif

Identifier les couples gisement/unité potentiellement compatibles.

Le matching ne crée aucun contrat.

## 15.2 Critères MVP

Le score utilise au minimum :

- distance ;
- type de substrat ;
- tonnage disponible ;
- besoin quotidien de l’unité ;
- régularité ;
- statut de fiabilité des données ;
- tri/contamination lorsqu’ils sont disponibles.

## 15.3 Résultat

Afficher :

- identifiant du gisement ;
- unité concernée ;
- distance estimée ;
- volume mobilisable estimé ;
- pourcentage potentiel du besoin couvert ;
- score de compatibilité ;
- niveau de fiabilité ;
- statut.

Statuts :

- `A_VERIFIER_SUR_LE_TERRAIN`
- `COMPATIBLE_SOUS_CONDITIONS`
- `NON_PRIORITAIRE`

## 15.4 Principe de confidentialité

Le moteur de matching peut utiliser les données nécessaires au calcul sans exposer automatiquement toutes les données privées à l’utilisateur.

Le résultat doit appliquer le principe de moindre privilège.

## 15.5 Mise en relation

Un utilisateur peut demander une mise en relation.

Le détenteur du gisement doit accepter avant partage des coordonnées précises, lorsque celles-ci sont protégées.

---

# 16. Dashboard État

Le dashboard doit afficher :

- nombre de gisements recensés ;
- nombre d’unités recensées ;
- potentiel théorique ;
- potentiel mobilisable ;
- potentiel valorisable ;
- répartition régionale ;
- données à vérifier ;
- zones prioritaires ;
- évolution du recensement ;
- graphiques ;
- carte synthétique.

Les chiffres doivent préciser leur périmètre et leur niveau de fiabilité.

---

# 17. Dashboard Collectivité

Afficher :

- gisements du territoire ;
- unités du territoire ;
- indicateurs locaux ;
- données à vérifier ;
- nouveaux gisements signalés ;
- opportunités de valorisation ;
- statut des validations.

---

# 18. Dashboard Détenteur

Afficher :

- ses gisements ;
- tonnages ;
- statut de validation ;
- niveau de fiabilité ;
- simulateur ;
- opportunités de matching ;
- demandes de mise en relation.

---

# 19. Dashboard Unité

Afficher :

- unité ;
- capacité ;
- besoin quotidien ;
- substrats acceptés ;
- gisements compatibles ;
- scores de matching ;
- demandes de mise en relation ;
- production déclarée si disponible.

---

# 20. Dashboard Administrateur

Sections :

- utilisateurs ;
- organisations ;
- validations ;
- gisements ;
- unités ;
- sources ;
- paramètres du simulateur ;
- règles de matching ;
- journaux ;
- exports.

---

# 21. Exports

Le MVP doit permettre l’export de données agrégées.

Formats prioritaires :

- CSV ;
- XLSX si nécessaire.

Les exports doivent respecter les permissions.

Un utilisateur public ne doit jamais pouvoir exporter les données privées.

Chaque export doit être journalisé.

---

# 22. Architecture technique recommandée

## 22.1 Principe

Architecture web moderne, responsive et sécurisée :

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS
- composants UI accessibles

**Backend**
- API serveur Next.js ou backend dédié ;
- validation stricte des entrées ;
- logique métier côté serveur.

**Base de données**
- PostgreSQL ;
- extension PostGIS pour les données géographiques.

**Authentification**
- système d’authentification géré ;
- sessions sécurisées ;
- reset password ;
- RBAC.

**Cartographie**
- MapLibre GL JS ou solution cartographique équivalente ;
- fonds de carte configurables.

**Stockage**
- stockage objet pour justificatifs et documents.

**Observabilité**
- logs applicatifs ;
- audit logs ;
- monitoring des erreurs.

## 22.2 Option recommandée pour accélérer le MVP

Une architecture basée sur :

**Next.js + TypeScript + PostgreSQL/PostGIS + Supabase Auth/Storage + MapLibre**

est recommandée pour réduire le temps d’implémentation tout en conservant une architecture exploitable et portable.

Le choix définitif doit être confirmé avant développement.

---

# 23. Autorisation

L’autorisation doit être appliquée à plusieurs niveaux :

1. route ;
2. API ;
3. service métier ;
4. requête base de données ;
5. affichage de champs sensibles.

Il faut éviter le modèle :

> « Le frontend cache le bouton donc l’utilisateur n’a pas accès. »

Le serveur doit refuser l’opération même si l’utilisateur contourne l’interface.

---

# 24. Géospatial

La base doit stocker les coordonnées sous forme géographique exploitable.

La plateforme doit pouvoir calculer :

- distance gisement/unité ;
- proximité ;
- regroupement géographique ;
- agrégation régionale ;
- filtrage territorial.

Les coordonnées précises doivent être séparées conceptuellement des informations publiques.

---

# 25. API

Les endpoints doivent être conçus autour des ressources métier.

Exemples :

`POST /api/auth/...`

`GET /api/feedstocks`

`POST /api/feedstocks`

`GET /api/feedstocks/:id`

`PATCH /api/feedstocks/:id`

`POST /api/feedstocks/:id/submit`

`GET /api/biogas-units`

`POST /api/biogas-units`

`PATCH /api/biogas-units/:id`

`GET /api/matching`

`POST /api/matching-requests`

`POST /api/simulations`

`GET /api/dashboard/state`

`GET /api/admin/validations`

Les noms exacts peuvent évoluer mais doivent rester cohérents.

Toutes les entrées API doivent être validées côté serveur.

---

# 26. Validation des données

Les formulaires doivent appliquer :

- validation des types ;
- validation des plages ;
- validation des champs obligatoires ;
- validation géographique ;
- validation de cohérence métier.

Exemples :

- tonnage >= 0 ;
- latitude entre -90 et 90 ;
- longitude entre -180 et 180 ;
- besoin quotidien >= 0 ;
- année de mise en service plausible ;
- tonnage fermentescible <= tonnage total ;
- pourcentage entre 0 et 100.

---

# 27. Interface utilisateur

L’application doit être responsive :

- desktop ;
- tablette ;
- mobile.

Priorités UX :

- simplicité ;
- lisibilité ;
- visibilité du statut de fiabilité ;
- visibilité des permissions ;
- cartes faciles à filtrer ;
- formulaires progressifs ;
- messages d’erreur explicites ;
- confirmation des actions sensibles.

L’interface doit utiliser la terminologie BIOWATT-CI et éviter le jargon technique destiné aux utilisateurs finaux.

---

# 28. Page d’accueil

Contenu minimum :

### Hero

**BIOWATT-CI**

« Du déchet au watt, de la donnée à la décision »

Actions :

- Consulter la carte ;
- Se connecter ;
- Créer un compte.

### Explication en 5 étapes

1. Gisements
2. Potentiel
3. Unités
4. Matching
5. Décision

### Sections

- présentation de BIOWATT-CI ;
- intérêt de la plateforme ;
- chiffres clés ;
- aperçu cartographique ;
- appel à contribuer aux données.

---

# 29. Données de démonstration

Le MVP doit inclure un jeu de données de démonstration clairement marqué.

Toutes les données fictives doivent porter :

`DEMONSTRATION`

Elles ne doivent jamais être confondues avec des données réelles.

Créer des comptes de démonstration pour au minimum :

- ADMIN ;
- STATE ;
- COLLECTIVITY ;
- FEEDSTOCK_OWNER ;
- BIOGAS_OPERATOR ;
- PUBLIC.

Les identifiants de démonstration doivent être documentés dans le README et ne doivent jamais être utilisés en production.

---

# 30. Tests

## 30.1 Tests fonctionnels

Chaque fonctionnalité majeure doit avoir des tests.

## 30.2 Tests d’autorisation

Tester notamment :

- propriétaire A ne peut pas modifier le gisement B ;
- propriétaire A ne peut pas voir les coordonnées privées de B ;
- opérateur X ne peut pas modifier l’unité Y ;
- public ne peut pas accéder aux endpoints privés ;
- STATE ne peut pas accéder aux fonctions ADMIN ;
- COLLECTIVITY ne peut pas modifier les données globales ;
- export respecte le rôle.

## 30.3 Tests métier

Tester :

- calcul du potentiel ;
- mobilisation ;
- valorisation ;
- distance ;
- matching ;
- couverture du besoin ;
- changement de statut ;
- validation.

## 30.4 Critère de fin

Une fonctionnalité n’est considérée comme terminée que lorsque :

- elle est implémentée ;
- elle respecte les permissions ;
- ses critères d’acceptation sont vérifiés ;
- les tests pertinents passent ;
- la documentation est mise à jour.

---

# 31. Critères d’acceptation MVP

## Authentification

- [ ] Un utilisateur peut créer un compte.
- [ ] Un utilisateur peut se connecter.
- [ ] Un utilisateur peut se déconnecter.
- [ ] Un utilisateur peut réinitialiser son mot de passe.
- [ ] Chaque utilisateur possède son propre compte.
- [ ] Les comptes institutionnels peuvent être soumis à validation.

## Rôles

- [ ] Les six profils fonctionnels existent.
- [ ] Les permissions sont vérifiées côté serveur.
- [ ] Un utilisateur ne peut pas élever lui-même son rôle.

## Gisements

- [ ] Un détenteur peut créer son gisement.
- [ ] Il peut modifier uniquement ses propres gisements.
- [ ] Il peut soumettre son gisement à validation.
- [ ] Le niveau de fiabilité est visible.
- [ ] La source et la date sont visibles.

## Unités

- [ ] Un exploitant peut créer son unité.
- [ ] Il peut modifier uniquement son unité.
- [ ] L’unité possède un statut.
- [ ] Le besoin quotidien est enregistré.

## Carte

- [ ] Les gisements sont visibles.
- [ ] Les unités sont visibles.
- [ ] Les filtres fonctionnent.
- [ ] Les données privées ne sont pas exposées.

## Simulateur

- [ ] Un type de substrat peut être sélectionné.
- [ ] Un tonnage peut être saisi.
- [ ] Les trois potentiels sont affichés.
- [ ] Les hypothèses sont visibles.
- [ ] Le résultat est présenté comme pré-diagnostic.

## Matching

- [ ] Un gisement peut être comparé à une unité.
- [ ] La distance est calculée.
- [ ] La compatibilité du substrat est prise en compte.
- [ ] Le tonnage et le besoin sont pris en compte.
- [ ] Un score est calculé.
- [ ] Un statut de compatibilité est affiché.
- [ ] Le matching ne crée pas automatiquement de contrat.
- [ ] Une demande de mise en relation peut être créée.

## Confidentialité

- [ ] Les coordonnées privées sont protégées.
- [ ] Les volumes confidentiels sont protégés.
- [ ] Le public ne voit que les données autorisées.
- [ ] Les actions sensibles sont journalisées.

## Administration

- [ ] L’administrateur peut valider un compte.
- [ ] L’administrateur peut valider un gisement.
- [ ] L’administrateur peut valider une unité.
- [ ] L’administrateur peut consulter les journaux.
- [ ] L’administrateur peut gérer les paramètres du simulateur.

## Export

- [ ] Les exports respectent les permissions.
- [ ] Les exports agrégés sont disponibles.
- [ ] Chaque export est journalisé.

---

# 32. Workflow de développement avec Antigravity

Ne pas demander à l’agent de construire tout le produit en une seule fois.

## Étape 1 — Compréhension

L’agent doit :

- lire `SPEC.md` ;
- identifier les ambiguïtés ;
- résumer les contraintes ;
- proposer les décisions manquantes.

## Étape 2 — Architecture

Produire :

- architecture ;
- modèle de données ;
- stratégie d’authentification ;
- stratégie RBAC ;
- structure des routes ;
- stratégie cartographique ;
- stratégie de tests.

**Validation humaine obligatoire avant implémentation.**

## Étape 3 — Fondations

Construire :

- projet ;
- base ;
- authentification ;
- rôles ;
- organisations ;
- audit.

## Étape 4 — Gisements

Construire :

- CRUD ;
- validation ;
- carte ;
- confidentialité.

## Étape 5 — Unités

Construire :

- CRUD ;
- validation ;
- carte.

## Étape 6 — Simulateur

Construire :

- paramètres ;
- calcul ;
- interface ;
- tests.

## Étape 7 — Matching

Construire :

- calcul distance ;
- compatibilité ;
- score ;
- demande de mise en relation ;
- confidentialité.

## Étape 8 — Dashboards

Construire :

- État ;
- Collectivité ;
- Détenteur ;
- Unité ;
- Administrateur.

## Étape 9 — Exports

Construire les exports autorisés.

## Étape 10 — Hardening

Effectuer :

- tests ;
- tests de permissions ;
- sécurité ;
- UX responsive ;
- performance ;
- documentation ;
- préparation démonstration.

---

# 33. Fichiers de contexte recommandés pour le projet

Le dépôt doit idéalement contenir :

```text
/
├── SPEC.md
├── AGENTS.md
├── README.md
├── CHANGELOG.md
├── PROGRESS.md
├── TASKS.md
├── docs/
│   ├── architecture.md
│   ├── data-model.md
│   ├── security.md
│   ├── api.md
│   └── decisions/
├── specs/
│   ├── auth.md
│   ├── feedstocks.md
│   ├── biogas-units.md
│   ├── simulator.md
│   ├── matching.md
│   ├── dashboards.md
│   └── exports.md
└── tests/
```

`SPEC.md` est la référence fonctionnelle globale.

`AGENTS.md` contient les règles de travail de l’agent.

`PROGRESS.md` conserve l’état du projet entre les sessions.

`TASKS.md` contient les tâches en cours et terminées.

---

# 34. Règles pour l’agent IA

L’agent doit :

1. lire les spécifications pertinentes avant de modifier le code ;
2. ne pas inventer une règle métier absente de la spécification sans la signaler ;
3. privilégier les changements petits et vérifiables ;
4. ne pas modifier l’architecture sans justification ;
5. ne pas supprimer une règle de sécurité pour simplifier l’implémentation ;
6. écrire les tests correspondants ;
7. exécuter les tests avant de déclarer une fonctionnalité terminée ;
8. mettre à jour la documentation lorsqu’une décision change ;
9. signaler les ambiguïtés ;
10. respecter le principe du moindre privilège.

Les contraintes importantes doivent être formulées de manière testable.

---

# 35. Démonstration intermédiaire

Une démonstration intermédiaire doit être organisée avant la livraison finale.

Scénario recommandé :

1. visiteur ouvre la page d’accueil ;
2. visiteur consulte la carte ;
3. utilisateur FEEDSTOCK_OWNER se connecte ;
4. il crée un gisement ;
5. il renseigne tonnage et qualité ;
6. il soumet le gisement ;
7. ADMIN valide le gisement ;
8. BIOGAS_OPERATOR se connecte ;
9. il consulte les gisements compatibles ;
10. il lance un matching ;
11. il demande une mise en relation ;
12. le détenteur accepte ;
13. les informations autorisées sont alors partagées ;
14. STATE consulte le dashboard national ;
15. STATE exporte les données agrégées.

Ce scénario doit être fonctionnel de bout en bout avant la présentation finale.

---

# 36. Livrables

Le prestataire/développeur doit remettre :

- code source complet ;
- dépôt Git ;
- base de données et migrations ;
- schéma de données ;
- configuration d’authentification ;
- documentation API ;
- README ;
- documentation d’installation ;
- documentation de déploiement ;
- comptes de démonstration ;
- jeu de données de démonstration ;
- tests ;
- documentation de sécurité ;
- documentation des rôles ;
- documentation du simulateur ;
- documentation du Smart Matching ;
- procédure de sauvegarde/restauration ;
- procédure de récupération des accès.

---

# 37. Déploiement

La plateforme doit être déployable en HTTPS.

Les ressources critiques doivent être sous le contrôle de BIOWATT-CI :

- dépôt GitHub ;
- hébergement ;
- domaine ;
- base de données ;
- stockage ;
- comptes administrateurs ;
- services externes.

Les secrets ne doivent pas être commités dans Git.

Utiliser des variables d’environnement.

---

# 38. Environnements

Prévoir au minimum :

- développement ;
- staging/démonstration ;
- production.

Les données de démonstration ne doivent pas être mélangées avec les données de production.

---

# 39. Sauvegarde

La stratégie doit couvrir :

- base de données ;
- fichiers justificatifs ;
- configuration ;
- procédure de restauration.

La procédure de restauration doit être documentée.

---

# 40. Propriété et contrôle

BIOWATT-CI doit rester propriétaire :

- du code source ;
- de la base de données ;
- des données ;
- du domaine ;
- des identifiants d’hébergement ;
- des comptes administrateurs ;
- des comptes GitHub ;
- des services externes ;
- des clés et secrets nécessaires à l’exploitation.

Aucun compte critique ne doit être exclusivement contrôlé par le développeur.

---

# 41. Décisions à confirmer avant développement

Les points suivants doivent être validés par BIOWATT-CI avant implémentation :

- nom définitif du domaine ;
- identité visuelle ;
- logo ;
- palette de couleurs ;
- fournisseurs cartographiques ;
- hébergeur ;
- politique exacte de confidentialité ;
- précision publique des coordonnées ;
- paramètres initiaux du simulateur ;
- facteurs de production par substrat ;
- taux de mobilisation ;
- facteurs de valorisation ;
- formule exacte du score de matching ;
- sources initiales ;
- jeu de données initial ;
- politique de conservation des logs ;
- politique de sauvegarde ;
- échéance exacte de présentation SIREXE.

Aucune valeur scientifique ou opérationnelle non fournie par BIOWATT-CI ne doit être présentée comme une donnée officielle.

---

# 42. Estimation de réalisation du MVP

Estimation indicative, à ajuster après validation de l’architecture et des données.

| Lot | Durée indicative |
|---|---:|
| Architecture + setup | 2–4 jours |
| Auth + rôles + organisations | 3–5 jours |
| Gisements + validation | 4–7 jours |
| Carte + filtres | 3–5 jours |
| Unités de biogaz | 3–5 jours |
| Simulateur | 2–4 jours |
| Smart Matching | 3–5 jours |
| Dashboards | 4–7 jours |
| Admin + audit | 3–5 jours |
| Exports | 1–3 jours |
| Tests + sécurité + responsive | 4–7 jours |
| Documentation + déploiement | 2–4 jours |

**Ordre de grandeur MVP : 34–61 jours de travail**, selon la maturité des données, les choix techniques, le niveau de finition UX et le nombre d’itérations.

Cette estimation ne constitue pas un engagement contractuel.

---

# 43. Definition of Done

Le MVP est considéré comme livré lorsque :

- toutes les fonctionnalités MVP sont disponibles ;
- les critères d’acceptation sont validés ;
- les permissions sont testées ;
- les données privées sont protégées ;
- les calculs du simulateur sont documentés ;
- le Smart Matching est fonctionnel ;
- les dashboards principaux fonctionnent ;
- les exports respectent les permissions ;
- les journaux fonctionnent ;
- l’application est responsive ;
- les tests critiques passent ;
- le README permet à une nouvelle personne de lancer le projet ;
- BIOWATT-CI possède les accès administrateurs ;
- le déploiement HTTPS est opérationnel ;
- une démonstration de bout en bout a été réalisée.

---

# 44. Principe final de gouvernance du projet

Toute modification fonctionnelle importante doit suivre :

**Besoin → Spécification → Critères d’acceptation → Plan → Implémentation → Tests → Validation → Mise à jour de la spécification**

La spécification doit évoluer avec le produit.

Une fonctionnalité modifiée sans mise à jour de sa spécification doit être considérée comme un risque de dérive du produit.

---

# 45. Propriété des accès

« Je souhaite rester propriétaire du code source, de la base de données, des identifiants d’hébergement et des comptes administrateurs. Les accès GitHub, hébergement, domaine, base de données et services externes doivent être créés au nom de BIOWATT-CI ou partagés avec un compte administrateur dont je contrôle l’accès. »

