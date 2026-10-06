# AGENTS.md — BIOWATT-CI

## 1. Mission

Tu es l’agent de développement du projet **BIOWATT-CI**, une plateforme web de cartographie, qualification et valorisation des gisements organiques et du potentiel biogaz en Côte d’Ivoire.

La priorité est de produire un logiciel :
- utile pour la démonstration et la décision ;
- sécurisé ;
- traçable ;
- maintenable ;
- responsive ;
- basé sur des données qualifiées ;
- conforme aux spécifications présentes dans `SPEC.md` et `specs/*.md`.

Le dépôt est **spec-first** : la spécification est la source de vérité fonctionnelle. Ne transforme pas une hypothèse en règle métier sans décision explicite.

---

## 2. Sources de vérité

Ordre de priorité :

1. `SPEC.md`
2. `specs/*.md`
3. `AGENTS.md`
4. `TASKS.md`
5. `PROGRESS.md`
6. `docs/*`
7. code existant
8. hypothèses raisonnables de l’agent

En cas de contradiction :
- ne pas masquer le conflit ;
- identifier précisément les fichiers concernés ;
- proposer la décision ;
- ne modifier la règle métier qu’après validation humaine si elle impacte le périmètre, la sécurité, les données ou les calculs.

---

## 3. Règle fondamentale : ne pas tout construire d’un coup

Travaille par incréments verticaux et démontrables.

Chaque incrément doit idéalement contenir :

1. spécification relue ;
2. critères d’acceptation identifiés ;
3. plan court ;
4. implémentation ;
5. tests ;
6. vérification manuelle si nécessaire ;
7. documentation minimale ;
8. mise à jour de `TASKS.md` et `PROGRESS.md`.

Ne commence jamais une fonctionnalité complexe par une implémentation massive.

---

## 4. Périmètre MVP

Le MVP doit couvrir :

- authentification ;
- rôles et autorisations ;
- organisations ;
- comptes et validation manuelle ;
- gisements ;
- unités de biogaz ;
- carte interactive ;
- fiches détaillées ;
- simulateur de potentiel ;
- Smart Matching simple ;
- tableaux de bord ;
- validation administrateur ;
- exports agrégés ;
- audit minimal ;
- données de démonstration.

Les éléments suivants sont hors MVP sauf décision explicite :

- IoT temps réel ;
- télémétrie avancée ;
- optimisation logistique complète ;
- contrats automatiques ;
- paiement ;
- application mobile native ;
- moteur financier complet ;
- notifications SMS/WhatsApp avancées.

---

## 5. Architecture cible

Architecture recommandée :

- Frontend : Next.js + TypeScript ;
- UI : Tailwind CSS et composants accessibles ;
- Backend/API : routes serveur Next.js ou couche backend dédiée ;
- Base : PostgreSQL + PostGIS ;
- Authentification : solution gérée et portable, par exemple Supabase Auth ;
- Stockage : stockage objet privé ;
- Carte : MapLibre GL JS ou équivalent ;
- Validation : schémas TypeScript/Zod ou équivalent ;
- Tests : unitaires + intégration + tests d’acceptation critiques ;
- Déploiement : HTTPS, variables d’environnement, environnements séparés.

Ne couple pas inutilement le domaine métier à un fournisseur.

---

## 6. Sécurité non négociable

### 6.1 Autorisation serveur

Les permissions doivent être vérifiées côté serveur.

Ne jamais considérer :
- un bouton masqué ;
- un rôle dans le navigateur ;
- une URL non affichée ;
- un champ envoyé par le frontend

comme une protection suffisante.

### 6.2 Propriété des données

Un utilisateur propriétaire ne peut modifier ou consulter les données privées d’un autre propriétaire.

Les comptes institutionnels doivent être validés.

### 6.3 Données sensibles

Par défaut, protéger :
- coordonnées exactes ;
- contacts ;
- volumes commerciaux sensibles ;
- informations confidentielles ;
- données de connexion ;
- documents privés.

La carte publique doit utiliser agrégation, anonymisation ou géométrie dégradée selon le contexte.

### 6.4 Secrets

Ne jamais :
- écrire un secret dans le code ;
- committer un `.env` réel ;
- afficher un mot de passe dans les logs ;
- créer des comptes avec des mots de passe permanents documentés.

Utiliser `.env.example` avec des valeurs fictives.

---

## 7. Qualité des données

Tout objet métier important doit permettre de connaître :

- statut de qualité ;
- source ;
- date de mise à jour ;
- auteur ou organisation ;
- niveau de vérification ;
- justification si nécessaire.

Statuts de référence :

1. `DEMONSTRATION`
2. `DECLARE`
3. `DOCUMENTARY_VERIFIED`
4. `SITE_VERIFIED`
5. `MEASURED`

Règle absolue :

> Une donnée de démonstration, déclarée ou hypothétique ne doit jamais être présentée comme une mesure réelle.

---

## 8. Calculs du potentiel

Le simulateur est un outil de pré-diagnostic.

Il doit distinguer au minimum :

- potentiel théorique ;
- potentiel mobilisable ;
- potentiel valorisable.

Ne jamais afficher un résultat comme une promesse de production réelle.

Les paramètres de mobilisation doivent pouvoir varier selon le secteur, le territoire ou le scénario.

Les constantes scientifiques ou techniques doivent être :
- documentées ;
- versionnées ;
- isolées du code d’interface ;
- modifiables sans réécrire tout le frontend.

---

## 9. Smart Matching

Le matching doit considérer au minimum :

- compatibilité du substrat ;
- volume disponible ;
- besoin de l’unité ;
- régularité ;
- distance ;
- qualité des données ;
- tri/contamination ;
- prétraitement éventuel.

Résultats possibles :

- `A_VERIFIER_TERRAIN`
- `COMPATIBLE_SOUS_CONDITIONS`
- `NON_PRIORITAIRE`

Le matching ne crée jamais automatiquement un contrat.

La demande de contact suit un mécanisme d’accord :
1. opérateur demande ;
2. détenteur accepte ou refuse ;
3. les informations privées sont partagées selon les règles d’accès.

---

## 10. Conception API

Les endpoints doivent :

- valider les entrées ;
- vérifier l’authentification ;
- vérifier l’autorisation ;
- limiter les données retournées ;
- utiliser une pagination lorsque nécessaire ;
- gérer proprement les erreurs ;
- éviter de retourner des champs privés par défaut.

Préférer des DTO/serializers explicites aux retours bruts de tables.

---

## 11. Base de données

Utiliser des migrations versionnées.

Ne pas modifier manuellement la base de production.

Les opérations sensibles doivent être auditables.

Les contraintes d’intégrité importantes doivent être portées par la base lorsque cela est pertinent.

Pour les données géographiques, utiliser PostGIS plutôt que des coordonnées flottantes seules lorsque le contexte l’exige.

---

## 12. Frontend

Le frontend doit être :

- responsive ;
- accessible ;
- cohérent visuellement ;
- utilisable sur ordinateur portable et mobile ;
- explicite sur les états de chargement, erreur et absence de données.

Prévoir :
- skeletons ;
- messages d’erreur compréhensibles ;
- confirmations pour actions destructives ;
- formulaires validés ;
- labels explicites ;
- navigation clavier pour les composants critiques.

---

## 13. Règles de développement

Avant de modifier un fichier :

1. lire son contexte ;
2. comprendre ses dépendances ;
3. vérifier qu’il n’existe pas déjà une abstraction réutilisable ;
4. modifier le minimum nécessaire.

Éviter :
- duplication ;
- gros fichiers monolithiques ;
- logique métier dans les composants visuels ;
- requêtes DB dispersées dans toute l’interface ;
- `any` injustifiés ;
- TODO silencieux pour une fonctionnalité critique.

---

## 14. Tests

Toute fonctionnalité métier importante doit avoir des tests.

Priorité :

1. contrôle des permissions ;
2. calculs du simulateur ;
3. filtrage de visibilité ;
4. matching ;
5. transitions de statut ;
6. CRUD propriétaire ;
7. validation admin.

Un test doit protéger une règle métier identifiable.

---

## 15. Git et changements

Faire des changements petits et cohérents.

Messages de commit recommandés :

- `feat(auth): ...`
- `feat(feedstocks): ...`
- `feat(map): ...`
- `feat(simulator): ...`
- `feat(matching): ...`
- `feat(dashboard): ...`
- `fix(security): ...`
- `test(...): ...`
- `docs(...): ...`

Ne pas réécrire l’historique Git sans instruction.

---

## 16. Démo

Le produit doit pouvoir être démontré avec des données fictives clairement identifiées comme telles.

Prévoir des comptes de démonstration pour les principaux rôles, sans secrets de production.

Le parcours de démonstration recommandé :

Accueil → Connexion → Tableau de bord → Carte → Gisement → Simulateur → Unité → Matching → Demande de contact → Validation admin.

---

## 17. Mise à jour documentaire

Après une évolution significative :

- `TASKS.md` : statut de la tâche ;
- `PROGRESS.md` : avancement ;
- documentation concernée : règle ou architecture ;
- changelog si nécessaire.

Si une décision modifie le comportement fonctionnel, mettre à jour la spécification concernée.

---

## 18. Ownership

BIOWATT-CI doit rester propriétaire de :

- code source ;
- base de données ;
- domaine ;
- hébergement ;
- comptes administrateurs ;
- secrets de production ;
- comptes des services externes ;
- données produites par la plateforme.

Les accès GitHub, hébergement, domaine, base de données et services externes doivent être créés au nom de BIOWATT-CI ou partagés avec un compte administrateur contrôlé par BIOWATT-CI.

---

## 19. Règle finale pour l’agent

Si une instruction semble utile mais contredit une spécification métier, ne l’implémente pas silencieusement.

Explique :
- le conflit ;
- le risque ;
- la décision proposée ;
- l’impact.

La priorité est une application correcte, vérifiable et gouvernable, pas la quantité de code produite.
