
# Outil de visualisation d'une progression
Une version en ligne de cette app est visible à cette adressse: [https://voirprogression.netlify.app/](https://voirprogression.netlify.app/matiere/a8d4ddaf-7981-4b83-98c7-506e71c04903)

# Table des matières

- [Présentation](#presentation)
- [Utilisation de l'IA](#utilisation-de-lia)
- [Restitution](#restitution)
  - [1. Choix techniques](#1-choix-techniques)
  - [2. Limites et compromis](#2-limites-et-compromis)
  - [3. Améliorations futures](#3-améliorations-futures)
  - [4. Modélisation](#4-modélisation)
    - [Les tables](#les-tables)
    - [Les routes api potentielles](#les-routes-api-potentielles)
- [Installation](#installation)

# Présentation
Cet outil interroge un backend JSON pour visualiser une progression.

Une progression permet à un enseignant de planifier les apprentissages d'une matière donnée (ou d'un sous domaine de cette matière) semaine par semaine, en sachant où en sont les enseignenements, ce qui a été fait précédement et ce qui reste à faire.

L'outil permet de visualiser les apprentissages d'une semaine donnée dans une des 5 périodes de l'année (une période est composée des plusieurs semaines, balisées par les vacances scolaires). On peut aussi afficher les apprentissages prévus sur toute une periode donnée en une seule page.



## Utilisation de l'IA
J'ai eu recours à l'IA (ChatGPT) pour la mise en place initiale du projet: Ça fait un moment que je n'avais pas fait de React, et j'avais fait beaucoup de VueJS depuis, j'avais perdu mes repères. Donc pour aller plus vite je lui ai demandé de me guider pour l'initialisation du projet : les fichiers de config, les dossiers, certaines dépendances, certains élements de syntaxe.

J'y ai aussi eu recours dans la création de certaines layout Tailwind histoire de gagner du temps

Et de temps en temps pour me faire expliquer certains messages d'erreur à la compilation ou me mettre à jours sur certains éléments de syntaxe React ou TS

J'ai aussi eu recours à l'IA pour construire la table des matières de ce README à partir de ce que j'avais rédigé. 

## Restitution

### 1. Choix techniques

J'ai respecté la consigne en utilisant React avec Typescript. J'ai aussi installé un linter afin de respecter au mieux les normes de rédaction du code dans ce contexte. J'ai fait appel à des components et des views pour structurer mes pages. J'ai aussi défini mes types globaux dans un dossier dédié afin de pouvoir les partager dans mes composants.

J'ai choisi d'utiliser Axios pour l'appel à l'API, avec un interceptor, même si je n'avais qu'une requête asynchrone assez simple, et que cela aurait pu être fait avec fetch. Mais je voulais créer une bonne base pour anticiper de futurs besoins d'appels asynchrones.

J'ai utilisé Tailwind pour les layouts, j'ai hésité avec Bulma, que j'utilise souvent. C'est un framework peut-être moins puissant mais un peu plus lisible que Tailwind. Mais j'ai finalement opté pour Tailwind car là aussi dans un souci de maintenabilité, si je devais anticiper l'évolution de cette application vers quelque chose de plus complexe, Tailwind serait plus adapté.

J'ai opté pour une internationalisation minimaliste, afin là aussi d'anticiper une future version multilangues de l'outil, et de centraliser les formulations de l'appli à un endroit unique.

### 2. Limites et compromis

Je n'ai pas forcément tout découpé en composant comme on pourrait l'attendre dans un contexte applicatif.

Mon internationalisation est très basique et ne permet pas de variables dans les libellés, de gestion du pluriel, etc. Là aussi, pour gagner du temps.

La gestion des périodes composées de semaines est faite côté front, et ne se base pas sur une donnée venant de l'API (même si elle respecte la définition d'une période donnée dans l'énoncé).

L'API retourne un tableau de matières, et un tableau de domaines, ce qui veut dire qu'il peut potentiellement y en avoir plusieurs, mais je n'ai pas du tout géré ce cas et considéré qu'il y avait une seule matière et un seul domaine.

### 3. Améliorations futures

Si j'avais eu plus de temps j'aurais mis en composant plus d'éléments, comme les boutons de sélection des périodes par exemple, ou d'autres petits composants d'UI réutilisables.

J'aurais ajouté un state manager pour embarquer les données dans l'application.

J'aurais pris le temps d'élaborer des tests, et de vérifier l'accessibilité avec des outils d'audit.

J'aurais peut-être aussi opté pour un scroll horizontal de la progression, ou bien une vue calendrier, pour bien ancrer les items de la progression dans un planning. Je ne sais pas si ce serait judicieux mais je l'aurais envisagé, au moins en mobile.

J'aurais fait en sorte de gérer des matières multiples et des domaines multiples, si applicable.

Peut-être faire un peu de ménage car au fil de la création de l'appli il y a peut-être des morceaux de code qui au final ne servent pas, ou pourraient être refactorisés pour être moins verbeux ou moins gourmands en ressources.

Plus globalement  une revue de code par un autre dev senior mieux au clair que moi sur les sujest React/TS serait bénéfique pour améliorer l'ensemble.


### 4. Modélisation

#### Les tables  

##### Progressions

> découpage chonologique des enseignements d'une matière (ou d'un domaine)

* `id` (UUID)
* `name` (string)
* `shortDescription` (text)
* `date` (date)
* Relations :
  * 1 à n **Periodes**
  * 1 à n **Matieres**

##### Periodes

> Divisions de l'année scolaire (ex. « Période 1 », « Période 2 »).

* `id` (UUID)
* `name` (string)
* `startDate` (date)
* `endDate` (date)
* `progressionId` (Lien vers la progression)
* Relations :
  * 1 à n **Semaines**

##### Semaines

> Chaque période contient des semaines numérotées.

* `id` (UUID)
* `name` (string)
* `startDate` (date)
* `endDate` (date)
* `periodeId` (Lien avec ue période)
* `programmationId` (Lien avec la programmation)
* Relations :
  * 1 à n **Items**

##### Matieres

> les matières enseignées (Français, Maths, Histoire-Géo…).

* `id` (UUID)
* `name` (string)
* `progressionId` (Lien avec une progression)
* Relations :
  * 1 à n **Domaines**

##### Domaines

> Sous-parties d'une matière (ex. en Histoire et Géographie : Histoire).

* `id` (UUID)
* `name` (string)
* `matiereId` (Lien avec une matiere)
* Relations :
  * 1 à n **Items**

##### Items (Apprentissages pédagogiques)

> Le contenu pédagogique associé à une semaine et un domaine.

* `id` (UUID)
* `value` (text / HTML riche)
* `periodeId` (Lien vers une periode)
* `semaineId` (Lien vers une semaine)
* `domaineId` (Lien vers un domaine)

##### Programmations

> Liste des notions à enseigner, sans ordre chronologique

* `id` (UUID)
* `name` (string)

#### Les routes api potentielles 

##### `GET` `/progression/:id`
détail d'une progression (nom, description, date, periodes, matieres, items).

##### `GET` `/progressions/:id/periodes`
liste des périodes associées à une progression

##### `GET` `/periodes/:id/semaines`
liste des semaines d'une période.

##### `GET` `/matieres/:id/domaines`
domaines associés à une matière.

##### `GET` `/domaines/:id/items`
apprentissages pédagogiques d'un domaine.

##### `POST` `/items`
créer un nouvel apprentissage pédagogique.

##### `PUT` `/items/:id`
modifier un apprentissage existant.

##### `DELETE` `/items/:id`
supprimer.

Et bien d'autres...

## Installation

Cloner le dépot puis lancer

```shell
npm install
```` 

Renseignez le token d'autentification de l'api dans le fichier `.env.local` (En se basant sur le fichier `.env.local.modele`)

Vous pouvez ensuite lancer un serveur local de test avec la commande

```shell
npm run start
```` 

Ou bien compiler un build de votre application avec

```shell
npm run build
```` 


