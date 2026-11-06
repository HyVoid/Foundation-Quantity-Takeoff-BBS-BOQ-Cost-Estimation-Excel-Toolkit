[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)


# Métré de fondations (QTO) et modèle Excel BOQ pour la construction : Bar Bending Schedule (BBS) automatisé des armatures, volumes de béton et estimateur de coûts
<img width="1049" height="790" alt="image" src="https://github.com/user-attachments/assets/55faa135-a626-40be-b88a-ee7264fbc96a" />


[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)](#access)
[![Tool Type](https://img.shields.io/badge/Tool-Construction%20Estimation%20Software-orange.svg)](#what-it-helps-track)

**Un calculateur de fondations prêt à l'emploi et un modèle Excel d'estimation des coûts (.xlsx)** conçu pour les débutants, les petits entrepreneurs et les économistes de la construction. Convertissez instantanément les dimensions brutes de semelles, pieux, dalles et poutres en **volumes de béton précis ($m^3$), quantités de terrassement, surfaces de coffrage ($m^2$), Bar Bending Schedules (BBS) automatisés pour le tonnage d'armatures et bordereaux des quantités (BOQ) chiffrés** — une **alternative logicielle de métré bâtiment** prête à l'emploi, qui ne nécessite aucun glisser-déposer de formule ni aucune configuration de macro.

<p align="center">
  <img width="1381" height="827" alt="Construction Foundation Quantity Takeoff QTO and BOQ Cost Estimation Excel Template Dashboard showing concrete volume and rebar weight calculations" src="https://github.com/user-attachments/assets/bf8dad7d-687c-48f0-a8ec-bf2cb4bda94e" />
</p>

> **Essayez le calculateur en ligne dans votre navigateur ou téléchargez le classeur Excel hors ligne définitif :**  
> Testez immédiatement la logique de calcul dans votre navigateur, ou téléchargez le **classeur d'estimation Microsoft Excel** déverrouillé et réutilisable pour le stockage local de vos projets, la remise d'offres aux clients, les pistes d'audit financier et l'exécution des périodes de soumission intenses (garantie satisfait ou remboursé de 30 jours).
>
> * [🌐 **Lancer le calculateur Web gratuit de métré de fondations et d'armatures béton** *(Aperçu en ligne instantané — aucune création de compte ni installation de logiciel)*](https://hyvoid.github.io/Foundation-Quantity-Takeoff-BBS-BOQ-Cost-Estimation-Excel-Toolkit/)
> * [📥 **Télécharger le modèle Excel hors ligne de BOQ de fondations, BBS et estimation des coûts (.xlsx)** *(Workflow SOP préconstruit et formules à mise à jour automatique pour un nombre illimité de projets commerciaux)*](https://theseusworkshop.com/l/ncaol?utm_source=github&utm_medium=GitHub%20README)

Pensé pour un déploiement immédiat : réalisez un métré d'infrastructure rapide directement dans votre navigateur, ou téléchargez le tableur `.xlsx` local pour y coller les dimensions de votre propre projet et générer en quelques secondes des décompositions de coûts prêtes à présenter au client.

---

## Ce que ce modèle vous aide à suivre : les difficultés du métré d'infrastructure et les solutions Excel automatisées

| Difficulté courante du chiffrage | Indicateur de suivi à haute fréquence | Solution apportée par le modèle Excel automatisé |
| :--- | :--- | :--- |
| **Calculs de fondations et de semelles fragmentés** | **Quantités d'éléments d'infrastructure** *(pieux, têtes de pieux, semelles isolées, longrines, poteaux, fouilles en tranchée)* | Centralise toutes les **mesures de métré de l'infrastructure** dans un tableau de saisie unique, en supprimant les tableurs manuels distincts pour chaque type d'élément en béton. |
| **Déconnexion entre les dimensions des plans et les volumes** | **Volume de béton ($m^3$), surface de coffrage ($m^2$), déblais et remblais** | Relie automatiquement les dimensions de métré et le nombre d'éléments issus de **PlanSwift, Bluebeam Revu, AutoCAD ou de plans PDF** aux formules de volume structurel et de coffrage. |
| **Détail d'armatures complexe et chronophage** | **Calculateur de poids d'armatures et Bar Bending Schedule (BBS) par diamètre de barre** | Génère automatiquement **les longueurs de coupe des aciers, les mètres linéaires totaux, le poids théorique des armatures ($kg / tonnes$) et les tolérances de chutes**, triés par diamètre de barre (par ex. de 10 mm à 32 mm). |
| **Erreurs de copier-coller manuel lors du chiffrage de l'appel d'offres** | **Bordereau des quantités (BOQ) chiffré et ventilation des coûts par lot** | Reporte directement les totaux calculés de terrassement, de béton, de coffrage et d'armatures dans un **bordereau BOQ commercial normalisé**, en multipliant automatiquement les quantités par les prix unitaires. |
| **Soumission à l'aveugle, sans contrôle des ratios de matériaux** | **Intensité d'armatures ($kg/m^3$) et indicateurs de coût unitaire** | Calcule en temps réel **la densité d'armatures par mètre cube de béton ($kg/m^3$)** et la répartition des coûts, ce qui permet aux débutants comme aux responsables de repérer instantanément une sous-estimation ou une sur-commande. |
| **Erreurs de saisie invisibles qui ruinent les marges finales** | **Détection des erreurs avant soumission et indicateurs d'audit des formules** | Exécute des **contrôles de validation des données** automatisés pour signaler les dimensions de semelle manquantes, les prix unitaires à zéro, les paramètres d'armatures invalides ou les lignes BOQ non liées avant la remise de l'offre. |

---

## Tutoriel de démarrage rapide : comment automatiser votre métré de fondations et votre estimation de coûts en 4 étapes

Même sans aucune formation avancée sur Excel ni parcours formel en métré, cette boîte à outils intègre un **workflow SOP (Standard Operating Procedure) préconstruit**. Les mathématiques d'ingénierie sous-jacentes et les règles de liaison commerciale sont préconfigurées : il vous suffit de suivre les onglets numérotés, de coller vos mesures brutes et de lire le retour analytique instantané.

### Étape 1 : paramétrer les prix locaux des matériaux de construction et les facteurs de perte
Ouvrez le tableau de bord de paramétrage pour initialiser votre environnement de soumission. Saisissez votre devise locale, les prix unitaires du **béton structurel prêt à l'emploi, du terrassement, du coffrage bois/acier et des aciers d'armature**, ainsi que les tolérances standard pour **les chutes de coupe d'armatures (%)** et **les facteurs de foisonnement/retrait des sols**.

### Étape 2 : coller vos dimensions brutes de métré de fondations (aucune formule à glisser)
Copiez et collez vos éléments de fondation mesurés — issus de **Bluebeam, PlanSwift, CostX ou de métrés manuels sur plans PDF** — directement dans le tableau de saisie structuré. Saisissez l'identifiant de l'élément, la référence du plan, la catégorie de fondation (pieu, tête de pieu, semelle, longrine ou poteau), les dimensions longueur/largeur/profondeur, ainsi que les paramètres de base d'espacement et de diamètre des armatures.

### Étape 3 : consulter les volumes de béton, le BBS d'armatures et le BOQ chiffré générés automatiquement
Regardez le moteur d'estimation tout calculer simultanément. Comme toutes les règles de recherche et les formules de matrice dynamique sont pré-cartographiées dans le modèle, **vous n'avez même pas besoin de double-cliquer sur la poignée de recopie Excel ni de faire glisser les formules vers le bas**. Vos volumes de béton, surfaces de coffrage, **Bar Bending Schedule (BBS)** diamètre par diamètre, **bordereau des quantités (BOQ)** commercial et **diagnostics d'intensité d'armatures ($kg/m^3$)** se remplissent en un seul clic.

### Étape 4 : télécharger le classeur Excel réutilisable pour les périodes de soumission chargées
Lorsque les ingénieurs structure publient des révisions de plans, des avenants ou des ordres de modification (VO), il suffit d'écraser les cellules de dimensions modifiées ou de mettre à jour un seul prix unitaire de matériau : chaque tableau BBS en aval et chaque total BOQ se met à jour automatiquement.

> **Arrêtez de reconstruire vos tableurs de zéro à chaque période de soumission :**  
> Les calculs de construction et le recoupement commercial sont complexes, mais votre flux de travail quotidien ne doit pas l'être. Grâce à des règles de calcul à correspondance automatique préconstruites, des formules dynamiques à mise à jour automatique et une SOP intégrée pas à pas, vous pouvez faire l'économie totale du débogage de formules. Téléchargez simplement le fichier en local, collez vos données de projet et obtenez un retour décisionnel commercial immédiat, pour rester concentré sur la conquête de projets plutôt que sur des tableurs défaillants.
>
> 👉 **[📥 Télécharger le modèle Excel hors ligne complet de métré de fondations, BBS et BOQ (.xlsx) pour un usage local illimité](https://theseusworkshop.com/l/ncaol?utm_source=github&utm_medium=GitHub%20README)**

---

## La logique métier et la méthodologie : éliminer les fuites de profit cachées dans la soumission de fondations

Pour les débutants, les estimateurs juniors et les petits entrepreneurs débordés, la soumission d'infrastructure est l'une des phases les plus risquées d'un projet de construction. La plupart des pertes sur appel d'offres ne surviennent pas parce qu'un estimateur est incapable de mesurer une semelle sur un plan, mais à cause des **angles morts du workflow structurel** entre le métré et la tarification finale.

Voici les trois risques commerciaux objectifs qui font perdre de l'argent aux entrepreneurs, et la façon dont la logique métier intégrée à ce modèle les élimine :

### 1. Éliminer la « taxe de ressaisie manuelle » entre des feuilles déconnectées
* **Le fait objectif :** dans les workflows traditionnels, l'estimateur calcule le volume de béton dans une feuille, estime le poids d'armatures dans un deuxième fichier, puis retape manuellement ces totaux dans une troisième feuille de bordereau des quantités (BOQ) pour la tarification. Les études d'audit du secteur montrent systématiquement que les transferts de cellules manuels et les retouches de `VLOOKUP` codées en dur introduisent un **écart de quantité ou de prix de 3 % à 8 %**. Comme les marges nettes typiques d'une entreprise générale se situent entre **5 % et 10 %**, une seule ligne oubliée ou une seule liaison de formule cassée anéantit la totalité du profit du projet avant même le premier coup de pelle.
* **La solution intégrée :** cette boîte à outils impose un pipeline de données linéaire strict, à source unique de vérité :
  $$\text{Measured Drawing Dimensions} \longrightarrow \text{Automated Geometry (Concrete / Formwork / Earthwork)} \longrightarrow \text{Linked Rebar BBS} \longrightarrow \text{Priced Commercial BOQ} \longrightarrow \text{Automated Error Validation}$$
  Vous saisissez les dimensions brutes une seule fois. Chaque état commercial s'alimente directement à cette saisie unique.

### 2. Révéler l'angle mort décisionnel de l'« intensité d'armatures ($kg/m^3$) »
* **Le fait objectif :** les débutants jugent presque toujours une estimation en ne regardant que le montant final. Or les directeurs commerciaux expérimentés auditent les estimations à l'aide de **l'intensité d'armatures ($kg \text{ of steel per } m^3 \text{ of concrete}$)**. Si une semelle isolée ou une longrine commerciale standard exige typiquement **80 à 130 $kg/m^3$** d'armatures, et que votre tableur manuel produit accidentellement **25 $kg/m^3$** (à cause d'un multiplicateur de nombre de barres oublié) ou **260 $kg/m^3$** (à cause d'une erreur d'unité millimètre-mètre), regarder le coût total seul masquera l'erreur. À **25 $kg/m^3$**, vous gagnez l'appel d'offres mais subissez une perte financière massive à l'achat d'acier sur chantier ; à **260 $kg/m^3$**, votre offre est surévaluée et rejetée d'office.
* **La solution intégrée :** le tableau de bord calcule et affiche automatiquement **l'intensité d'armatures globale et par élément ($kg/m^3$)** à côté du tonnage total, offrant aux utilisateurs novices exactement la même visibilité de diagnostic qu'un économiste de la construction senior.

### 3. Protéger la trésorerie contre les pertes de matières et le foisonnement des sols non comptabilisés
* **Le fait objectif :** payer exactement le volume géométrique indiqué sur les plans structurels CAD garantit des ruptures de stock sur chantier. Les armatures exigent des tolérances de chutes de coupe et de recouvrement (généralement **5 % à 10 %**), et les terres excavées augmentent de volume une fois déblayées (facteurs de foisonnement des terrassements de **15 % à 30 %**), ce qui impacte directement le nombre de camions de transport et les coûts d'évacuation.
* **La solution intégrée :** des cellules de paramètres globaux dédiées appliquent automatiquement les multiplicateurs de pertes et de foisonnement à tous les postes BOQ concernés, garantissant que votre prix d'offre couvre la consommation réelle sur chantier plutôt que la géométrie nette théorique.

---

## Tableurs de construction manuels vs. boîte à outils Excel automatisée de métré de fondations et de BOQ

| Opération d'estimation de construction | Workflow traditionnel sur tableur improvisé | Boîte à outils Excel automatisée QTO et BOQ de fondations |
| :--- | :--- | :--- |
| **Transfert des quantités métrées vers la tarification** | Les quantités mesurées sur PDF sont ressaisies ou copiées et collées manuellement dans un onglet de tarification BOQ distinct, avec un risque élevé de désalignement de lignes et d'erreurs `#REF!`. | Les dimensions des éléments alimentent directement le **moteur de calcul BOQ automatisé** via des références structurées dynamiques, sans aucune ressaisie manuelle. |
| **Calcul du poids d'armatures et des longueurs de coupe** | Les estimateurs calculent les Bar Bending Schedules (BBS) dans des tableaux isolés à l'aide de formules manuelles $D^2 / 162$ qui deviennent inopérantes dès que les dimensions de fondation changent. | Les **paramètres d'armatures (BBS)** sont mathématiquement liés à la géométrie de l'élément, avec calcul automatique des longueurs de barres, des déductions de pliage, des poids unitaires et des totaux par diamètre. |
| **Changement de type d'élément d'infrastructure** | Les utilisateurs jonglent entre des onglets de calcul distincts pour les pieux forés, têtes de pieux, semelles isolées, longrines, poteaux courts et fouilles en tranchée. | Les **étiquettes de catégorie d'élément** intégrées déclenchent automatiquement la formule géométrique exacte requise pour le volume de béton, la surface de coffrage périmétrique et le terrassement. |
| **Gestion des révisions de plans et des avenants** | Lorsqu'un ingénieur modifie la profondeur d'une semelle ou la classe de béton, les estimateurs passent des heures à traquer les cellules codées en dur dans de multiples feuilles. | La mise à jour d'une seule ligne de dimensions ou du **tableau de bord central des prix unitaires** recalcule instantanément tous les poids BBS et tous les prix d'offre en aval. |
| **Audit de l'estimation avant remise de l'offre** | Les dimensions manquantes, les postes non tarifés ou les plages `SUM` cassées survivent régulièrement, sans que personne ne le remarque, jusqu'au dossier d'appel d'offres final remis au client. | Des **indicateurs de validation automatisés** dédiés signalent en temps réel les géométries incomplètes, les prix à zéro, les incohérences d'armatures et les écarts de rapprochement BOQ. |

---

## Qui doit utiliser ce modèle Excel d'estimation de fondations ? (Rôles et cas d'usage)

Cette boîte à outils est conçue pour les professionnels de la construction, les entrepreneurs de corps d'état et les débutants qui ont besoin d'un pont immédiat et fiable entre **le métré sur plans, le calcul des armatures et la tarification commerciale**, sans débourser des milliers de dollars pour un logiciel ERP d'estimation d'entreprise lourd :

* **Économistes de la construction juniors (QS) et ingénieurs de coûts débutants :** à la recherche d'un **modèle Excel de bordereau des quantités (BOQ)** normalisé, doté d'une SOP intégrée qui évite les erreurs de calcul embarrassantes et maintient une piste d'audit transparente pour la revue par un senior.
* **Petites entreprises générales et constructeurs de maisons individuelles :** ayant besoin d'un **tableur d'estimation des coûts de fondations** rapide et accessible aux débutants pour chiffrer avec précision les semelles de maison, les longrines et les dalles béton pendant les périodes de soumission intenses, sans embaucher un estimateur à temps plein.
* **Sous-traitants béton, coffrage et armatures :** cherchant un **calculateur de poids d'armatures et une feuille Excel de Bar Bending Schedule (BBS)** automatisés pour convertir les plans structurels en tonnage d'approvisionnement acier et en offres de lots techniques compétitives en quelques minutes.
* **Estimateurs en génie civil et ingénieurs de chantier :** nécessitant une **alternative légère aux logiciels de métré de génie civil** pour recouper les demandes de paiement des entrepreneurs, vérifier les réquisitions de matériaux sur chantier et suivre les ratios d'intensité béton-acier ($kg/m^3$).
* **Chefs de projet construction et représentants du maître d'ouvrage :** utilisant un **modèle structuré de suivi budgétaire d'infrastructure** pour comparer les devis des sous-traitants, évaluer les options d'ingénierie de valeur et auditer l'impact financier des ordres de modification (VO).
* **Étudiants en génie civil, stagiaires et estimateurs indépendants :** apprenant les **workflows concrets de métré et d'estimation de construction** grâce à un modèle Excel transparent et de qualité production, qui fait le lien entre la géométrie des manuels et l'appel d'offres commercial réel.

---

## Scénarios de construction fréquents et applications de projets à longue traîne

* **Préparation rapide de dossiers d'appel d'offres et de soumissions commerciales :** convertissez des mesures brutes exportées de **PlanSwift, Bluebeam Revu, Cubicost ou de plans AutoCAD** en un **bordereau des quantités (BOQ) d'infrastructure** entièrement chiffré et prêt pour le client, en moins de 15 minutes.
* **Bar Bending Schedule (BBS) automatisé et approvisionnement en armatures :** générez des listes de coupe d'acier triées par diamètre et des synthèses de tonnage théorique ($kg$ et tonnes métriques) pour les commandes de fabrication d'acier, sans plugins complexes de détail CAO.
* **Chiffrage des révisions de plans, avenants et ordres de modification (VO) :** quantifiez instantanément le coût exact et l'écart de matériaux lorsque les ingénieurs structure révisent des têtes de pieux, approfondissent des fouilles de semelles ou modifient l'espacement des armatures en cours de projet.
* **Audit des devis de sous-traitants et vérification des références de marché :** utilisez **l'indicateur automatisé d'intensité d'armatures ($kg/m^3$)** et la ventilation des prix unitaires pour repérer les offres de sous-traitants gonflées ou les devis anormalement bas avant de signer les contrats de sous-traitance.
* **Études de faisabilité préliminaires et budgétisation conceptuelle de l'infrastructure :** saisissez des dimensions structurelles de référence et les prix locaux des matériaux pour établir des estimations de coûts de fondations défendables en phase amont, pour des projets résidentiels, commerciaux ou industriels.

*(Avertissement d'ingénierie : cette boîte à outils est conçue pour automatiser les mathématiques du métré, l'agrégation BBS et la tarification commerciale BOQ. Elle ne remplace pas un logiciel de conception structurelle agréé tel que ETABS, STAAD.Pro ou SAFE. Les utilisateurs doivent toujours vérifier les règles de détail des armatures, les longueurs de recouvrement, les facteurs de perte et les prix unitaires au regard des plans structurels propres au projet, des codes de construction locaux et des conditions géotechniques du site.)*

---

## À propos de Theseus Workshop : des boîtes à outils Excel pragmatiques d'aide à la décision et d'exploitation

Je conçois des **modèles Excel et des outils d'aide à la décision dans le navigateur** légers et prêts pour la production, destinés à des workflows opérationnels et commerciaux qui comportent trop d'éléments variables pour être gérés de façon fiable dans un tableur improvisé ou de mémoire.

Chaque boîte à outils de **Theseus Workshop** repose sur un principe d'ingénierie central :

> **Quelle information critique doit être reliée en un seul endroit pour que vous puissiez prendre la prochaine décision commerciale avec une confiance totale ?**

Cette **boîte à outils de métré de fondations (QTO), BBS et estimation des coûts BOQ** applique ce principe à la soumission d'infrastructures de génie civil : elle relie les dimensions brutes des plans, les quantités de béton, de terrassement et de coffrage, le détail des armatures, la tarification commerciale et la validation des erreurs dans un workflow SOP unique, réutilisable et infaillible pour les débutants.

### Découvrez d'autres boîtes à outils métier et d'ingénierie prêtes à l'emploi
* 🛒 **[Visiter la boutique officielle Theseus Workshop (`theseusworkshop.com`)](https://theseusworkshop.com)** — Parcourez notre catalogue complet de modèles Excel prêts à l'emploi, de modèles d'analyse commerciale automatisée et de boîtes à outils SOP opérationnelles, conçus pour vous faire gagner des heures de travail manuel sur tableur.
* 📥 **[Obtenir ici le modèle Excel hors ligne de métré de fondations QTO, BBS et estimation des coûts BOQ](https://theseusworkshop.com/l/ncaol?utm_source=github&utm_medium=GitHub%20README)** — Téléchargement numérique instantané (.xlsx), avec accès à vie et garantie satisfait ou remboursé de 30 jours.

## Détails techniques

<details>
<summary>Pour les relecteurs techniques, les praticiens d'Excel et les collaborateurs</summary>

### Architecture du classeur

Le classeur est structuré en une chaîne de calcul contrôlée de six feuilles :

| Feuille | Rôle | Sortie principale |
|---|---|---|
| `01_Parameters` | Configuration centralisée des paramètres | Devise, prix des matériaux, constante d'armatures, tolérance de pertes, facteur de terrassement |
| `02_Qty_Input` | Couche principale de saisie des données | Quantités d'éléments, volume de béton, surface de coffrage, saisie des armatures |
| `03_Reinforcement_Engine` | Moteur de calcul des armatures | Longueur de coupe, nombre de barres, mètres linéaires, poids théorique, total en tonnes |
| `04_BOQ_Summary` | Agrégation commerciale | Quantités BOQ, prix unitaires, montants par poste, coût total estimé |
| `05_Cost_Dashboard` | Analyse de gestion | Coût total, quantités de matériaux, structure des coûts, intensité d'armatures |
| `06_Validation` | Contrôle d'intégrité et des erreurs | État de la géométrie, de la tarification, de l'alignement des armatures et du rapprochement BOQ |

Le flux de données prévu est le suivant :

```text
Measured Drawings / Takeoff Data
            │
            ▼
    02_Qty_Input
            │
      ┌─────┴─────┐
      ▼           ▼
03_Reinforcement  04_BOQ_Summary
      │           │
      └─────┬─────┘
            ▼
    05_Cost_Dashboard
            │
            ▼
      06_Validation

01_Parameters
      │
      └──────► shared assumptions and rates
````

La spécification source définit `02_Qty_Input` comme la feuille de saisie manuelle principale, les colonnes `A:K` étant utilisées pour les identifiants d'éléments, les références de plans, les catégories, les dimensions, les quantités et les paramètres d'armatures. Les champs calculés occupent `L:P`. 

Le moteur d'armatures est piloté par des formules et ne filtre que les éléments contenant des paramètres d'armatures. Sa sortie comprend la référence de l'élément, la catégorie, le diamètre de barre, la longueur de coupe, le nombre total de barres, le total de mètres linéaires, le poids unitaire théorique, le poids net et le poids incluant les pertes. 

La couche BOQ agrège six postes d'estimation prédéfinis couvrant le terrassement, le béton de pieux, le béton de fondations structurelles, le coffrage, les armatures à `>=16mm` et les armatures inférieures à `16mm`. 

### Trois pièges qui guettent même les estimateurs expérimentés

#### Piège 1 — Métré correct, total commercial erroné

1. **Une décision a été prise :**
   Un prix d'offre est préparé à partir des quantités de fondations métrées.

2. **Le défaut caché :**
   Les valeurs de quantités et les prix commerciaux sont maintenus dans des tableaux distincts, copiés manuellement.

3. **En quoi le défaut change la recommandation :**
   Une révision de prix peut laisser une partie de l'estimation sur une hypothèse ancienne, ce qui fait paraître l'offre plus compétitive qu'elle ne l'est réellement.

4. **Pourquoi le raisonnement est incorrect :**
   Le résultat commercial n'est plus une fonction fiable des hypothèses actuelles du projet.

5. **Approche corrigée :**
   Maintenir les prix de référence de façon centralisée et calculer les montants BOQ à partir des totaux de quantités actuels.

6. **Résultat décisionnel corrigé :**
   Une modification de prix se propage dans les valeurs BOQ concernées, ce qui permet à l'estimateur de revoir la position d'offre qui en résulte depuis une chaîne de calcul unique.

<details>
<summary>Référence des formules</summary>

Le montant BOQ suit la relation de base :

```excel
=Quantity*Unit_Rate
```

Le total est ensuite rapproché ainsi :

```excel
=SUM(F5:F10)
```

</details>

#### Piège 2 — Un tonnage d'armatures plausible mais déconnecté

1. **Une décision a été prise :**
   L'approvisionnement en acier repose sur un total d'armatures préparé séparément.

2. **Le défaut caché :**
   La synthèse acier n'est pas directement liée aux dimensions au niveau des éléments, aux diamètres de barres, aux quantités et aux longueurs de coupe calculées.

3. **En quoi le défaut change la recommandation :**
   Une modification du nombre d'éléments ou de la géométrie peut changer les armatures nécessaires alors que le chiffre d'approvisionnement reste inchangé.

4. **Pourquoi le raisonnement est incorrect :**
   Un total plausible ne suffit pas si sa source ne peut pas être rattachée à la saisie structurelle actuelle.

5. **Approche corrigée :**
   Dériver les enregistrements d'armatures depuis le même tableau de saisie des éléments et calculer les mètres linéaires totaux avant de convertir en poids théorique.

6. **Résultat décisionnel corrigé :**
   L'estimation d'armatures évolue avec les données d'éléments sous-jacentes et peut être rapprochée du nombre d'éléments source.

<details>
<summary>Référence des formules</summary>

L'implémentation utilise la relation théorique des armatures :

```excel
W = den * d^2
```

puis convertit la valeur en kilogrammes obtenue en tonnes après application de la tolérance de pertes configurée :

```excel
=(tot_m*(den*dia*dia)*(1+waste))/1000
```

</details>

#### Piège 3 — Une saisie manquante prise pour un résultat à bas coût

1. **Une décision a été prise :**
   L'estimation apparaît anormalement basse et est acceptée comme un chiffre compétitif.

2. **Le défaut caché :**
   Un élément structurel présente une quantité positive mais une dimension omise ou nulle.

3. **En quoi le défaut change la recommandation :**
   La dimension manquante peut réduire la quantité calculée et donc sous-estimer la valeur commerciale.

4. **Pourquoi le raisonnement est incorrect :**
   Le modèle produit un résultat mathématiquement valide à partir de données de construction incomplètes. La validité mathématique ne garantit pas la validité de l'estimation.

5. **Approche corrigée :**
   Valider la géométrie requise et les données de tarification avant d'accepter l'estimation.

6. **Résultat décisionnel corrigé :**
   L'estimation est revue avant de devenir un engagement d'offre ou d'approvisionnement.

<details>
<summary>Référence des formules</summary>

La couche de validation recherche les éléments hors terrassement dont le nombre est positif mais dont la profondeur/hauteur manque :

```excel
=IF(
  COUNTIFS(
    '02_Qty_Input'!C:C,"<>Earthwork",
    '02_Qty_Input'!H:H,">0",
    '02_Qty_Input'!F:F,"<=0"
  )=0,
  "PASS",
  "FAIL"
)
```

</details>

### Scénario d'exemple

Prenons une estimation de fondations comprenant des pieux, des têtes de pieux, des longrines, des poteaux courts et du terrassement.

Le workflow commence par des saisies au niveau des éléments, telles que :

| Saisie                      |           Exemple |
| --------------------------- | ----------------: |
| Diamètre du pieu            |            0.60 m |
| Profondeur du pieu          |           18.00 m |
| Quantité de pieux           |                24 |
| Longueur de tête de pieu    |            2.40 m |
| Largeur de tête de pieu     |            2.40 m |
| Profondeur de tête de pieu  |            0.80 m |
| Quantité de têtes de pieux  |                 6 |
| Diamètre acier principal    |             20 mm |
| Nombre d'aciers principaux  | 16 barres / élément |

La couche de saisie calcule la quantité propre à la géométrie de chaque élément. Les éléments circulaires utilisent le calcul basé sur le diamètre, tandis que les éléments rectangulaires utilisent longueur × largeur × profondeur. Le terrassement reçoit le facteur de terrassement configuré séparément des quantités d'éléments structurels. 

Le moteur d'armatures filtre ensuite les éléments comportant des informations d'armatures et dérive le nombre total de barres à partir de la quantité d'éléments et du nombre d'armatures spécifié. La longueur de coupe est ajustée selon la catégorie d'élément, et le total de mètres linéaires est converti en poids théorique à l'aide de la constante de diamètre et de la tolérance de pertes configurées. 

Les quantités obtenues alimentent le BOQ. Les quantités de béton, de coffrage, de terrassement et d'armatures sont multipliées par leurs prix configurés pour produire les montants par poste et un coût total estimé. 

La couche de gestion expose ensuite le résultat commercial à travers un ensemble plus restreint d'indicateurs : coût total, volume de béton, tonnage d'armatures, quantité de terrassement et intensité d'armatures par mètre cube de béton structurel. 

La décision finale n'est pas simplement **« Quel est le total ? »**

C'est :

**« La quantité, le besoin d'armatures, l'hypothèse de prix et le total commercial forment-ils une estimation traçable et cohérente en interne ? »**

Cette distinction est importante lorsque le classeur sert à la revue de l'appel d'offres, à la préparation budgétaire ou à la planification des approvisionnements.

### Référence des formules

<details>
<summary>Géométrie des éléments</summary>

Pour les éléments circulaires, l'implémentation calcule le volume à partir du diamètre et de la hauteur/profondeur :

```excel
=LET(
    len, A5:INDEX(D:D, COUNTA(A:A)),
    wid, E5:INDEX(E:E, COUNTA(A:A)),
    hgt, F5:INDEX(F:F, COUNTA(A:A)),
    dia, G5:INDEX(G:G, COUNTA(A:A)),
    IF(dia>0, 3.1415926*(dia/2)^2*hgt, len*wid*hgt)
)
```

Pour les éléments rectangulaires, le calcul retombe sur :

```text
Length × Width × Height
```

</details>

<details>
<summary>Quantité de terrassement</summary>

Le terrassement reçoit le facteur configuré dans `01_Parameters` :

```excel
=LET(
    u_vol, L5#,
    qty, H5:INDEX(H:H, COUNTA(A:A)),
    cat, C5:INDEX(C:C, COUNTA(A:A)),
    IF(
        cat="Earthwork",
        u_vol*qty*'01_Parameters'!$B$13,
        u_vol*qty
    )
)
```

L'implémentation maintient donc le facteur de terrassement en dehors du calcul géométrique de base et l'applique selon la catégorie d'élément. 

</details>

<details>
<summary>Calcul du coffrage</summary>

La quantité de coffrage est déterminée à partir de la catégorie d'élément :

```excel
=LET(
    cat, C5:INDEX(C:C, COUNTA(A:A)),
    len, D5:INDEX(D:D, COUNTA(A:A)),
    wid, E5:INDEX(E:E, COUNTA(A:A)),
    hgt, F5:INDEX(F:F, COUNTA(A:A)),
    qty, H5:INDEX(H:H, COUNTA(A:A)),
    SWITCH(
        cat,
        "Pile", 0,
        "Earthwork", 0,
        "Pile Cap", 2*(len+wid)*hgt*qty,
        "Beam", (2*hgt+wid)*len*qty,
        "Column", 2*(len+wid)*hgt*qty,
        0
    )
)
```

Cela reflète le traitement, tel que déclaré dans l'implémentation, des surfaces de contact de coffrage par catégorie d'élément. 

</details>

<details>
<summary>Poids des armatures</summary>

Le moteur d'armatures calcule le poids total à l'aide de la constante de poids théorique et de la tolérance de pertes configurées :

```excel
=LET(
    dia, C5#,
    tot_m, F5#,
    den, '01_Parameters'!$B$11,
    waste, '01_Parameters'!$B$12,
    (tot_m*(den*dia*dia)*(1+waste))/1000
)
```

La table des paramètres définit la constante de poids théorique à `0.006165` et la tolérance de pertes d'armatures par défaut à `3.0%`. 

</details>

<details>
<summary>Agrégation BOQ</summary>

Le BOQ utilise une agrégation par catégorie, par exemple :

```excel
=SUMIFS(
    '02_Qty_Input'!M:M,
    '02_Qty_Input'!C:C,
    "Earthwork"
)
```

et une agrégation par diamètre d'armatures, par exemple :

```excel
=SUMIFS(
    '03_Reinforcement_Engine'!I:I,
    '03_Reinforcement_Engine'!C:C,
    ">=16"
)
```

Le total BOQ final est :

```excel
=SUM(F5:F10)
```

</details>

<details>
<summary>Indicateurs du tableau de bord des coûts</summary>

L'indicateur d'intensité d'armatures est calculé ainsi :

```excel
=LET(
    conc_vol, '04_BOQ_Summary'!$D$7,
    rebar_ton, '04_BOQ_Summary'!$D$9+'04_BOQ_Summary'!$D$10,
    IF(conc_vol>0,(rebar_ton*1000)/conc_vol,0)
)
```

Cette valeur exprime la consommation d'armatures en kilogrammes par mètre cube de béton structurel. 

</details>

### Règles de validation

| Champ / Contrôle       | Règle                                                                                          | Comportement en cas d'erreur          |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| Complétude géométrique  | Les éléments hors terrassement dont le nombre est positif doivent avoir une hauteur/profondeur positive. | `FAIL`                                |
| Validité des prix unitaires | Les prix configurés du béton, du terrassement, du coffrage et des armatures doivent être supérieurs à zéro. | `WARNING`                             |
| Alignement des armatures | Les lignes d'armatures générées doivent correspondre aux éléments saisis contenant des données d'armatures. | `MISMATCH`                            |
| Rapprochement BOQ       | Le total BOQ doit être égal à la somme des valeurs quantité × prix unitaire après arrondi.     | `ERR`                                 |
| Intégrité des matrices dynamiques | Les plages de propagation des formules doivent rester libres de valeurs saisies manuellement ou de cellules fusionnées. | `#SPILL!` nécessite le nettoyage de la zone de saisie |

La matrice de validation source définit quatre contrôles essentiels couvrant la géométrie, la tarification, l'alignement des lignes d'armatures et le rapprochement des montants BOQ. 

</details>

---

## Autres outils de cette série

* **[DIN-743-Shaft-Calculations](https://github.com/HyVoid/DIN-743-Shaft-Calculations)** — La conception de l'arbre satisfait-elle la logique de calcul applicable ? — Appliquez les normes de calcul d'arbre DIN 743 aux décisions de conception technique.
* **[construction-estimating](https://github.com/HyVoid/construction-estimating)** — Combien coûtera ce périmètre de construction dans les hypothèses actuelles ? — Normalisez l'estimation d'appel d'offres de construction et transformez les estimations réalisées en bibliothèques de coûts réutilisables.
* **[aia-construction-cost-tracker-excel](https://github.com/HyVoid/aia-construction-cost-tracker-excel)** — Comment les estimations et les coûts suivis se comparent-ils tout au long de la réalisation ? — Comparez les estimations de construction aux coûts réels pendant toute la réalisation du projet, au format standard AIA.
* **[construction-project-management-excel](https://github.com/HyVoid/construction-project-management-excel)** — La situation financière du projet est-elle exacte après intégration des modifications approuvées, des coûts réels et de l'avancement de la facturation ? — Intégrez budgets, ordres de modification, facturation à l'avancement et trésorerie dans un cadre unique de contrôle de projet de construction.
* **[industrial-energy-tco-calculator](https://github.com/HyVoid/industrial-energy-tco-calculator)** — Quelle option énergétique offre le coût total de possession le plus bas pour ce projet précis, dans ses conditions d'exploitation réelles ? — Comparez les sources d'énergie industrielles sur une base d'énergie réellement utile, en normalisant les coûts de combustible, l'efficacité des équipements, l'investissement en infrastructures et les coûts de possession sur le cycle de vie.
* **[residential-boq-template](https://github.com/HyVoid/residential-boq-template)** — Combien coûtera ce projet résidentiel et quels lots sont déjà en dépassement budgétaire ? — Estimez les coûts de construction résidentielle à partir des métrés et des prix BOQ, tout en suivant les budgets approuvés par rapport aux dépenses réelles.
* **[tunnel-cost-estimator-boq-excel](https://github.com/HyVoid/tunnel-cost-estimator-boq-excel)** — Combien coûtera ce projet de tunnel à l'explosif dans le cycle de construction supposé ? — Estimez les besoins de terrassement, de forage, de tir, de soutènement, d'équipement et de main-d'œuvre d'un tunnel à l'explosif pour obtenir un coût de projet et un BOQ complets.

## Licence

Ce projet est publié sous la **Apache License 2.0**.

Consultez le fichier [`LICENSE`](LICENSE) pour les conditions complètes de la licence.


