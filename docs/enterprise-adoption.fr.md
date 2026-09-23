# Guide d'adoption de l'ADLC en entreprise

Ce guide rend opérationnels le [manifeste](../manifesto.md), le [cycle de vie](../lifecycle.md) et les [skills partagées](../shared-skills.md). C'est un modèle d'adoption illustratif, pas une certification, une garantie de conformité ni un ensemble universel de seuils. Adapter les contrôles à l'impact métier et au modèle de risque de l'organisation. La [version anglaise](enterprise-adoption.md) est la source de référence.

La gouvernance de la connaissance couvre documents, prompts, skills partagées, politiques, mémoire et contexte runtime, quelle que soit leur méthode de fourniture. La génération augmentée par récupération (RAG) est une technique optionnelle, pas un prérequis de l'ADLC. Lorsqu'elle est utilisée, gouverner qualité du retrieval, actualisation des sources, droits d'accès et citations, avec des tests de régression comportementale. Le context engineering compose le contexte opérationnel de l'agent ; il ne remplace pas ces contrôles.

## 1. Approuver le prochain incrément

**Aucune implémentation ne commence sans avoir validé le quality gate des exigences.**

Approuver le périmètre du prochain incrément plutôt que tenter de figer toutes les exigences futures. Consigner les responsables métier, ingénierie et risque ; le résultat attendu ; des critères d'acceptation mesurables ; les données autorisées ; les incertitudes connues ; les conditions imposant une nouvelle approbation.

Comparer automatisation déterministe, workflow LLM, agent unique et orchestration multi-agents. Utiliser le minimum d'autonomie et de complexité nécessaire au résultat validé. Davantage d'agents ne prouve pas une plus grande maturité.

Pour une expérimentation, l'incrément approuvé doit préciser hypothèse, sandbox, données autorisées, budget et critères de sortie. L'approbation expérimentale n'accorde pas d'accès à la production. Un agent de quality gate peut préparer des preuves, mais ne remplace pas la décision humaine responsable.

## 2. Définir un contrat d'autonomie

Versionner ce contrat avec l'implémentation et les preuves de release :

| Contrôle | Décision requise |
| --- | --- |
| Responsabilité | Responsable métier, opérateur technique, évaluateur du risque et voie d'escalade identifiés |
| Autorité | Actions autorisées et interdites, rôles délégués et limites d'approbation humaine |
| Données | Sources autorisées, classification, périmètre du tenant et de l'utilisateur, destinations des sorties |
| Limites | Budgets de coût, temps, appels d'outils et tentatives ; impact maximal de transaction ou métier |
| Application des contrôles | Identifiants à moindre privilège et contrôles de politique à la frontière de l'outil ou du service, pas seulement dans les prompts |
| Approbation | Approbateur autorisé, action exacte et version des entrées approuvées, expiration et nouvelle approbation après changement substantiel |
| Arrêt et récupération | Conditions d'arrêt, révocation, mode dégradé, responsables de réconciliation et de compensation |
| Délégation | Les agents en aval héritent de l'autorité ou la réduisent ; ils ne peuvent pas l'augmenter silencieusement |

Tester les actions refusées autant que les actions autorisées. Les documents récupérés, réponses d'outils et autres contenus non fiables ne peuvent pas supplanter le contrat. Consigner décisions et résultats sans journaliser de secrets ou données personnelles inutiles.

### Rendre la supervision humaine effective

Une supervision compétente, pas une approbation de pure forme. Désigner des personnes formées au domaine, aux limites des agents et aux risques décisionnels. Avant de leur confier l'approbation, utiliser des exercices proportionnés au risque avec recommandations erronées, preuves manquantes et incidents pour vérifier leur capacité à reconnaître l'incertitude et intervenir. Actualiser la formation après des changements substantiels ou incidents pertinents.

- Fournir sources, preuves, limites connues, incertitudes et conséquences de l'action proposée, pas seulement la recommandation de l'agent.
- Accorder assez de temps et une charge de travail gérable. Si une revue substantielle est impossible, suspendre l'action ou la confier à une alternative autorisée ; ne pas l'approuver implicitement.
- Donner l'autorité effective pour contester, refuser, suspendre, demander une révision et déclencher une escalade, sans dépendre de la coopération de l'agent.
- Consigner la personne chargée de la revue, les preuves examinées, la décision et sa justification proportionnée au risque. Échantillonner régulièrement la qualité des décisions et rechercher les signes d'approbation habituelle ; le nombre d'approbations ne démontre pas la supervision.

Une approbation formelle sans vérification substantielle n'est pas un contrôle de gouvernance.

## 3. Gouverner connaissance, contexte et mémoire

**Contexte d'entreprise distribué, accès gouverné.** Les agents doivent pouvoir découvrir et utiliser les informations pertinentes via des interfaces interopérables, telles que des API, MCP ou des mécanismes équivalents. Les sources conservent responsables, versions, provenance et autorisations. Le contexte doit être sélectionné pour la tâche et sa contribution à la qualité des résultats doit être évaluée.

[FAIR](https://www.gofair.foundation/fair-principles), [W3C DCAT 3](https://www.w3.org/TR/vocab-dcat-3/), [W3C PROV-DM](https://www.w3.org/TR/prov-dm/). Ces références soutiennent la découvrabilité, l'interopérabilité et la provenance ; elles ne garantissent pas à elles seules de meilleurs résultats des agents.

Garder documentation humaine et contexte des agents liés mais séparés. La documentation humaine sert la lecture, la revue et l'audit. Les endpoints pour agents exposent un contexte approuvé et pertinent pour la tâche, avec URL stables, accès authentifié si nécessaire, responsables des sources, versions, statut d'approbation et règles de retrieval.

Les instantanés versionnés des sources et la configuration du retrieval font partie des preuves de release. La mémoire mutable exige un historique d'événements gouverné : origine, auteur autorisé, périmètre, horodatage, rétention, correction et suppression. Isoler utilisateurs et tenants ; définir le traitement des faits contradictoires ou obsolètes. Ne pas transformer automatiquement une inférence de l'agent en connaissance faisant autorité.

La compression du contexte doit économiser des tokens sans supprimer permissions, contraintes, provenance des sources ou preuves nécessaires à une décision correcte. Évaluer le contexte compressé selon les mêmes exigences comportementales. Une URL, connexion MCP ou un fichier llms.txt ne suffit pas à établir confiance ou autorisation.

## 4. Évaluer le comportement avant promotion

### Vérifier le logiciel produit par des agents

La validation du logiciel produit par des agents exige une supervision humaine compétente. Les personnes responsables approuvent les critères d'acceptation, examinent la pertinence des tests et évaluent les preuves et le risque résiduel pour autoriser la release. Les agents peuvent générer et exécuter des tests, mais ne peuvent approuver leur propre travail ni affaiblir unilatéralement ses conditions d'acceptation. Un second agent ne remplace pas la responsabilité humaine ; la profondeur de la revue est proportionnée au risque, sans imposer l'exécution manuelle de chaque test.

- Déduire les résultats attendus des exigences approuvées, non de l'implémentation générée ; les faire examiner par des personnes compétentes indépendamment de l'implémentation.
- Protéger les tests d'acceptation et les règles CI. Supprimer des tests, affaiblir des assertions ou modifier les seuils d'acceptation exige une revue humaine explicite.
- Pour une correction, démontrer que le test échoue avant et réussit après. Utiliser des défauts contrôlés ou des tests de mutation lorsque pertinent pour vérifier que les assertions détectent les défauts concernés.
- Vérifier les effets observables, les données persistées et les limites d'autorisation, pas seulement les messages de succès ou les mocks. Inclure des tests d'intégration avec des services représentatifs.
- Couvrir les comportements existants, cas limites, actions interdites et dépendances indisponibles. Conserver les tests unitaires, d'intégration, end-to-end, de sécurité et non fonctionnels.
- Exécuter les contrôles dans un environnement CI défini et conserver les résultats réels liés aux exigences et au changement revu. Le rapport de l'agent ne prouve pas l'exécution.

Exemple : si un remboursement exige une approbation, vérifier qu'aucun paiement n'est exécuté sans elle, pas seulement que l'interface affiche une demande d'approbation.

Construire un dataset représentatif et versionné, lié aux exigences et cas de risque. Inclure résultats normaux, demandes ambiguës, actions non autorisées, injection, connaissances empoisonnées ou obsolètes, échecs de retrieval, accès entre tenants, timeouts d'outils, demandes dupliquées, escalade et comportement d'arrêt.

Répéter les essais avec un état isolé. Consigner dataset, configuration du modèle, prompts, outils, versions des connaissances et évaluateurs, taille d'échantillon, variabilité et lacunes de couverture. Examiner les changements réels d'état et le respect des politiques, pas seulement une réponse finale plausible ou une séquence exacte d'appels. Calibrer les évaluateurs fondés sur des modèles avec les jugements d'experts métier et examiner les désaccords.

Convenir de seuils d'acceptation fondés sur le risque avant les tests. Tout échec d'un contrôle obligatoire bloque la promotion. Un ensemble fini de tests ne prouve pas l'absence de défaillances futures. Répéter les tests de régression pertinents lorsqu'une entrée influençant le comportement change, même sans modification du code.

## 5. Livrer, exploiter et récupérer

Les preuves de release doivent relier exigence, source de connaissance, comportement de l'agent, résultat de test, approbation et identité de release. Inclure toutes les entrées influençant le comportement, contrat d'autonomie, limites connues, plan de déploiement et exercices de récupération.

Distinguer trois opérations :

- **Rollback de configuration :** restaurer, si disponible, une configuration antérieure du code, des prompts, connaissances, outils ou modèles.
- **Restauration d'état :** restaurer ou réconcilier l'état interne sans rejouer les effets externes.
- **Compensation :** appliquer une action métier autorisée séparément pour traiter un effet externe qui ne peut pas simplement être annulé.

Utiliser un déploiement progressif et des contrôles préventifs pour les actions irréversibles. Définir ce qui se passe si un approbateur est indisponible, un outil renvoie un résultat incertain ou un budget est épuisé. Les tentatives bornées ne doivent pas dupliquer paiements ou autres effets.

Surveiller succès, violations de politique, dérive, qualité du retrieval, coût par tâche réussie, latence, intervention humaine, reprises, escalade et valeur métier par rapport à la référence. Inclure les tentatives échouées et le traitement humain dans le coût. Les preuves peuvent justifier un workflow plus simple, moins d'autonomie ou un retrait. Le retrait inclut révocation des identifiants, désactivation des endpoints et tâches planifiées, conservation ou suppression de mémoire et preuves selon la politique approuvée.

## Exemple complet : assistance aux remboursements

Les chiffres suivants sont des seuils illustratifs pour un pilote, pas des exigences ADLC.

| Étape | Contrôle et preuves |
| --- | --- |
| Exigences | Approuver un incrément qui rédige des recommandations de remboursement à partir d'une commande et d'une politique approuvée. Comparer à une référence fondée uniquement sur des règles. Viser une réduction de 20% du temps médian de traitement sans diminuer la qualité décisionnelle évaluée indépendamment. |
| Adéquation | Utiliser un workflow LLM borné pour interpréter les demandes et expliquer les recommandations. Éligibilité et limites monétaires restent déterministes. Aucun système multi-agents n'est nécessaire pour cet incrément. |
| Autorité | Lire uniquement la commande du client authentifié et la politique approuvée. Le workflow ne peut modifier politique, destination du paiement ou identité du client. Une personne approuve chaque remboursement pour un identifiant immuable de proposition et un montant exact. |
| Implémentation | Le service de paiement vérifie autorisation, version de proposition, expiration de l'approbation et clé d'idempotence avant exécution. Toute modification des entrées invalide l'approbation. Une approbation absente ou expirée dirige vers une file humaine sans exécution. |
| Connaissance | Figer la version de la politique approuvée et la configuration du retrieval. Définir la durée de conservation du contexte temporaire du dossier ; interdire la mémoire partagée entre clients et les mises à jour de politique écrites par les agents. |
| Évaluation | Utiliser 200 cas revus, exécutés chacun cinq fois avec état isolé, incluant injection, approbation expirée, accès entre clients, demandes dupliquées et timeouts de paiement. Exiger zéro paiement non autorisé ou dupliqué observé, au moins 95% d'accord avec les résultats d'éligibilité arbitrés et une escalade pour chaque cas incertain défini. Déclarer limites de l'échantillon et désaccords. |
| Approbation et release | Les responsables métier et risque approuvent seuils, exceptions et risque résiduel. Les personnes chargées des remboursements effectuent des exercices sur montants erronés, politiques obsolètes et paiements au résultat incertain. Elles examinent commande, source de politique, montant et conséquences, avec temps et autorité pour refuser ou suspendre. Consigner preuves examinées et justification. Relier RF-01 à version de politique, comportement de proposition, rapport d'évaluation, contrôles du service et ID de release. Commencer par un petit groupe supervisé. |
| Exploitation | Suivre temps de traitement, qualité, escalade, reprises et coût total par dossier résolu, y compris tentatives et effort humain. Arrêter l'exécution automatique en cas d'action non autorisée, de contrôle d'approbation défaillant ou de signal de paiement dupliqué. |
| Incident et récupération | Après un timeout, interroger le service de paiement avec la clé d'idempotence avant de réessayer. Suspendre l'exécution et révoquer l'accès si nécessaire. Revenir à la politique ou configuration antérieure ; réconcilier l'état du dossier avec le registre des paiements. Un remboursement effectué ne s'annule pas par rollback de configuration : un responsable métier autorisé décide des compensations ou remèdes au client permis. |
| Amélioration ou retrait | Ajouter l'incident aux cas de régression et réapprouver l'incrément modifié. Si l'objectif de qualité ou de valeur n'est pas atteint, revenir aux seules recommandations ou retirer le workflow et gérer accès et mémoire selon les politiques. |

## Registre de preuves réutilisable

Conserver un enregistrement lié pour chaque incrément approuvé et release :

- ID d'exigence, responsable, résultat, décision d'adéquation, référence, risques et approbation.
- Contrat d'autonomie versionné, permissions, sources de connaissance, politique de mémoire et contrôles runtime.
- Inventaire des changements de code, prompts, skills, connaissances, outils, configuration du modèle et orchestration.
- Versions du dataset et des évaluateurs, résultats d'essais, seuils, lacunes de couverture et revue humaine.
- Autorisation de release, périmètre de déploiement, critères d'arrêt et résultats des exercices de récupération.
- Résultats opérationnels, incidents, décisions correctives et prochain incrément approuvé ou enregistrement de retrait.

## Références spécialisées

Ces sources ont éclairé les pratiques ci-dessus ; le guide est une adaptation ADLC, pas une déclaration de soutien ou de certification.

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) explique la simplicité et les compromis entre workflows et agents.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) traite des évaluations répétées, résultats et calibration des évaluateurs.
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) couvre gestion du contexte et mémoire.
- [OWASP: Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) présente les contrôles agentiques sous l'angle des menaces.
- [Microsoft: AI agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) décrit compromis d'orchestration et enjeux de fiabilité.
- [NIST: AI Risk Management Framework core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) encadre gouvernance et gestion du risque tout au long du cycle de vie.
