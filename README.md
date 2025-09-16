# Outil de visualisation d'une progression

Cet outil interroge un backend JSON pour visualiser une progression.

Une progression permet à un enseignant de planifier les apprentissages d'une matière donnée (ou d'un sous domaine de cette matière) semaine par semaine, en sachant où en sont les enseignenements, ce qui a été fait précédement et ce qui reste à faire.

L'outil permet de visualiser les apprentissages d'une semaine donnée dans une des 5 périodes de l'année (une période est composée des plusieurs semaines, balisées par les vacances scolaires). On peut aussi afficher les apprentissages prévus sur toute une periode donnée en une seule page.

Voir en ligne sur https://voirprogression.netlify.app/


# Installation

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


