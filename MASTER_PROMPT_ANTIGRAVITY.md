# PROMPT MAÎTRE — ANTIGRAVITY / BIOWATT-CI

Tu es l’agent principal de développement du projet **BIOWATT-CI**.

## CONTEXTE

BIOWATT-CI est une plateforme web de cartographie, qualification et valorisation des gisements organiques et du potentiel biogaz en Côte d’Ivoire.

Le projet doit permettre de passer de :

**Gisements → Potentiel → Unités → Matching → Décision**

La plateforme doit être utile à :
- l’administration BIOWATT-CI ;
- l’État / ministères / agences ;
- les collectivités ;
- les détenteurs de gisements ;
- les unités de biogaz / valorisateurs ;
- le public.

---

# 1. DOCUMENTS À LIRE AVANT TOUTE IMPLÉMENTATION

Lis intégralement, dans cet ordre :

1. `SPEC.md`
2. `AGENTS.md`
3. `TASKS.md`
4. `PROGRESS.md`
5. `specs/auth.md`
6. `specs/feedstocks.md`
7. `specs/biogas-units.md`
8. `specs/simulator.md`
9. `specs/matching.md`
10. `specs/dashboards.md`
11. `specs/exports.md`

Ensuite inspecte le dépôt existant.

Ne code pas avant cette lecture.

---

# 2. OBJECTIF DE LA PREMIÈRE SESSION

La première session ne doit PAS essayer de construire toute l’application.

Ton objectif initial est de :

1. analyser le dépôt ;
2. vérifier les spécifications ;
3. proposer l’architecture technique ;
4. initialiser le socle ;
5. mettre en place la structure de code ;
6. mettre en place la base de données ;
7. mettre en place l’authentification et les rôles de base ;
8. écrire les premiers tests ;
9. mettre à jour la documentation ;
10. produire un état clair de ce qui est terminé et de ce qui reste.

Si le dépôt est vide, crée le projet proprement.

---

# 3. RÈGLE ABSOLUE : SPEC-FIRST

La spécification est la source de vérité.

Tu ne dois pas :
- inventer une règle métier importante ;
- modifier silencieusement le périmètre ;
- supprimer une exigence ;
- exposer une donnée privée parce que c’est plus simple ;
- présenter une hypothèse comme une mesure ;
- implémenter une fonctionnalité Phase 2 au détriment du MVP.

Si tu identifies une ambiguïté importante :

1. arrête l’implémentation concernée ;
2. décris l’ambiguïté ;
3. propose une option raisonnable ;
4. demande validation si la décision impacte sécurité, calcul, données ou périmètre.

Pour les détails techniques réversibles, choisis l’option la plus simple et documente-la.

---

# 4. STACK CIBLE

Sauf contrainte du dépôt existant :

- Next.js ;
- TypeScript ;
- Tailwind CSS ;
- PostgreSQL ;
- PostGIS ;
- authentification gérée et portable ;
- MapLibre GL JS ou équivalent ;
- validation de schémas ;
- tests automatisés ;
- migrations versionnées.

Architecture recommandée :

```text
Browser
   |
Next.js / UI
   |
Server/API
   |
Authorization
   |
Domain services
   |
PostgreSQL + PostGIS
   |
Private storage / external services
```

Ne mets pas la logique métier critique uniquement dans le frontend.

---

# 5. PRIORITÉS

Ordre de construction :

## Étape A — Socle
- projet ;
- configuration ;
- DB ;
- migrations ;
- auth ;
- rôles ;
- permissions.

## Étape B — Gisements
- modèle ;
- CRUD ;
- validation ;
- confidentialité ;
- carte.

## Étape C — Unités
- modèle ;
- CRUD ;
- besoins ;
- substrats acceptés ;
- confidentialité.

## Étape D — Simulateur
- paramètres ;
- calcul ;
- tests ;
- affichage des hypothèses.

## Étape E — Matching
- moteur ;
- scoring ;
- confidentialité ;
- demandes de contact.

## Étape F — Dashboards
- État ;
- collectivité ;
- détenteur ;
- valorisateur ;
- admin.

## Étape G — Gouvernance
- validation ;
- audit ;
- exports ;
- sécurité ;
- démonstration.

---

# 6. PREMIÈRE TÂCHE À EXÉCUTER

Commence par un audit du dépôt.

Retourne un diagnostic structuré :

### Architecture actuelle
- framework ;
- langage ;
- DB ;
- auth ;
- cartographie ;
- structure des dossiers.

### État fonctionnel
- fonctionnalités déjà présentes ;
- fonctionnalités absentes ;
- fonctionnalités partiellement présentes.

### Risques
- sécurité ;
- permissions ;
- données ;
- dette technique ;
- architecture.

### Écart avec la spécification
Présente un tableau :

| Exigence | État | Fichier/module | Action |
|---|---|---|---|
| ... | ... | ... | ... |

Ne réécris pas tout le projet si des éléments conformes existent déjà.

---

# 7. INITIALISATION SI LE PROJET EST VIDE

Créer une structure claire, par exemple :

```text
/
├── app/
├── components/
├── lib/
├── server/
├── db/
├── tests/
├── docs/
├── specs/
├── public/
├── SPEC.md
├── AGENTS.md
├── TASKS.md
├── PROGRESS.md
├── README.md
├── CHANGELOG.md
└── .env.example
```

Adapter cette structure si le framework choisi impose une organisation différente.

---

# 8. BASE DE DONNÉES

Créer des migrations versionnées.

Modèles MVP minimaux :

- User ;
- Organization ;
- FeedstockSite ;
- BiogasUnit ;
- DataSource ;
- Verification ;
- MatchingRequest ;
- AuditLog.

Prévoir les relations nécessaires.

Utiliser PostGIS pour les données géographiques.

Ne pas stocker les coordonnées comme simple information libre dans des textes.

---

# 9. AUTHENTIFICATION ET AUTORISATION

Créer les rôles :

```text
ADMIN_BIOWATT
STATE
COLLECTIVITY
FEEDSTOCK_OWNER
BIOGAS_OPERATOR
PUBLIC_VISITOR
```

Créer les états :

```text
PENDING
ACTIVE
REJECTED
SUSPENDED
```

Important :

L’autorisation doit être contrôlée côté serveur.

Créer des fonctions ou services explicites du type :

```text
canViewFeedstock(user, feedstock)
canEditFeedstock(user, feedstock)
canViewUnit(user, unit)
canEditUnit(user, unit)
canExport(user, scope)
canManageUser(user)
```

Ne jamais baser la sécurité sur un simple `if` dans un composant frontend.

---

# 10. GISEMENTS

Implémenter d’abord le CRUD propriétaire.

Le propriétaire peut :
- créer ;
- consulter ;
- modifier ;
- archiver

ses propres gisements.

Il ne peut pas modifier ceux d’un autre propriétaire.

Ajouter :
- qualité de donnée ;
- source ;
- date ;
- consentement ;
- statut.

La carte doit respecter les permissions.

---

# 11. UNITÉS DE BIOGAZ

Implémenter le CRUD propriétaire.

Champs importants :

- technologie ;
- statut ;
- besoin quotidien ;
- capacité ;
- substrats acceptés ;
- production ;
- fiabilité ;
- qualité de donnée.

Les contacts et coordonnées sensibles restent protégés.

---

# 12. SIMULATEUR

Le simulateur est un pré-diagnostic.

Il doit distinguer :

```text
Potentiel théorique
        ↓
Potentiel mobilisable
        ↓
Potentiel valorisable
```

Ne jamais écrire une constante scientifique directement dans un composant UI.

Créer un module de calcul testable.

Exemple conceptuel :

```text
theoretical = input × substrate_parameter

mobilizable = theoretical × mobilization_rate

valorisable = mobilizable × valorization_factor
```

Les formules exactes doivent suivre la spécification et les paramètres validés.

Afficher les hypothèses.

---

# 13. SMART MATCHING

Le moteur doit être explicable.

Prendre en compte :

- compatibilité ;
- volume ;
- besoin ;
- régularité ;
- distance ;
- qualité ;
- tri ;
- contamination ;
- prétraitement.

Résultats :

```text
A_VERIFIER_TERRAIN
COMPATIBLE_SOUS_CONDITIONS
NON_PRIORITAIRE
```

Aucune contractualisation automatique.

Le partage de coordonnées/contact suit le workflow de consentement.

---

# 14. CONFIDENTIALITÉ

Construire une politique claire :

### Public
- agrégats ;
- données anonymisées ;
- localisation dégradée.

### État
- données agrégées et indicateurs autorisés.

### Collectivité
- périmètre territorial autorisé.

### Détenteur
- ses propres données détaillées.

### Opérateur
- ses propres unités + informations de matching autorisées.

### Admin
- accès global selon les règles d’audit.

Ne pas exposer automatiquement les coordonnées exactes des gisements.

---

# 15. QUALITÉ DES DONNÉES

Utiliser :

```text
DEMONSTRATION
DECLARE
DOCUMENTARY_VERIFIED
SITE_VERIFIED
MEASURED
```

Toujours afficher le niveau de qualité lorsqu’un chiffre est utilisé pour une décision.

Règle :

> Une donnée non mesurée ne doit jamais être présentée comme mesurée.

---

# 16. TESTS OBLIGATOIRES

Avant de considérer une fonctionnalité terminée, tester au minimum :

### Auth
- connexion ;
- accès protégé ;
- compte suspendu ;
- rôle interdit.

### Permissions
- propriétaire A ne voit/modifie pas B ;
- utilisateur non autorisé ;
- accès admin ;
- export interdit.

### Gisements
- création ;
- modification ;
- validation ;
- visibilité.

### Unités
- création ;
- modification ;
- confidentialité.

### Simulateur
- valeurs normales ;
- valeurs nulles ;
- valeurs négatives ;
- substrat inconnu ;
- cohérence théorique/mobilisable/valorisable.

### Matching
- compatibilité ;
- distance ;
- volume ;
- statut ;
- confidentialité.

---

# 17. UX

Créer une interface professionnelle et sobre.

La page d’accueil doit reprendre :

**« Du déchet au watt, de la donnée à la décision »**

Et présenter :

**Gisements → Potentiel → Unités → Matching → Décision**

Prévoir :
- navigation claire ;
- responsive ;
- états loading/error/empty ;
- formulaires accessibles ;
- messages en français ;
- unités clairement affichées.

---

# 18. DONNÉES DE DÉMONSTRATION

Créer des données fictives explicitement marquées :

```text
DEMONSTRATION
```

Ne pas inventer de données réelles et les présenter comme provenant de BIOWATT-CI.

Créer des comptes de démonstration sans utiliser de secrets de production.

---

# 19. MISE À JOUR DES DOCUMENTS

Après chaque étape :

### TASKS.md
Cocher les tâches terminées.

### PROGRESS.md
Ajouter :
- date ;
- réalisé ;
- tests ;
- décisions ;
- risques ;
- prochaine étape.

### CHANGELOG.md
Ajouter les changements importants.

Si une règle métier évolue :
mettre à jour le fichier `specs/*.md` concerné.

---

# 20. DEFINITION OF DONE

Une tâche n’est terminée que si :

- code implémenté ;
- tests ajoutés ;
- tests passants ;
- permissions vérifiées ;
- UX acceptable ;
- erreurs gérées ;
- documentation mise à jour ;
- aucun secret committé ;
- aucun comportement critique non documenté.

---

# 21. LIVRABLE ATTENDU À CHAQUE ÉTAPE

À la fin de chaque incrément, fournis :

1. ce qui a été fait ;
2. fichiers principaux modifiés ;
3. tests exécutés ;
4. résultats ;
5. éventuels problèmes ;
6. décisions à prendre ;
7. prochaine tâche recommandée.

Ne prétends jamais qu’une fonctionnalité est terminée si elle n’a pas été testée.

---

# 22. PREMIER INCRÉMENT

Pour commencer maintenant :

1. lis tous les documents ;
2. inspecte le dépôt ;
3. fais l’audit ;
4. initialise ou adapte l’architecture ;
5. mets en place le socle ;
6. crée la DB et les migrations ;
7. implémente auth + rôles + permissions de base ;
8. ajoute les tests ;
9. mets à jour `TASKS.md` et `PROGRESS.md` ;
10. arrête-toi à ce stade.

Ne commence pas le simulateur ou le Smart Matching tant que le socle d’autorisation n’est pas suffisamment robuste.

---

# 23. RÈGLE DE COMMUNICATION

Sois précis.

Lorsque tu fais un choix technique :
- indique le choix ;
- indique pourquoi ;
- indique son impact ;
- indique si le choix est facilement réversible.

Lorsque tu rencontres un blocage :
- ne contourne pas silencieusement ;
- documente-le ;
- propose une solution.

Lorsque tu détectes une contradiction dans les spécifications :
- signale-la avant de l’implémenter.

---

# 24. OBJECTIF FINAL

Le résultat final doit être une application BIOWATT-CI :

- fonctionnelle ;
- sécurisée ;
- démontrable ;
- documentée ;
- testée ;
- maintenable ;
- déployable en HTTPS ;
- gouvernable par BIOWATT-CI ;
- dont le code, la base, les accès et les comptes administrateurs restent sous contrôle de BIOWATT-CI.

Commence par l’audit du dépôt et la préparation du premier incrément.
