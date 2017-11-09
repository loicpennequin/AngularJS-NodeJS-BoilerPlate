# Boilerplate NodeJS-AngularJs-MySQL

Ce repo contient un boilerplate pour démarrer facilement un projet de site ou application se basant sur NodeJS(framework Express) et MySQL pour le backend, et AngularJs(version 1.6) en framework frontend. Ce projet contient également un générateur de composants angular via gulp.

## Installation

### Prérequis
* [NodeJS](https://nodejs.org/en/)
Installer nodeJS installera automatiquement NPM.
* Installer gulp et nodemon globalement sur votre système :
```
npm install -g gulp nodemon
```
* Livereload
Afin de profiter de la feature de rafraichissement automatique du navigateur lors de la modification des fichiers HTML/SASS/JS, il est préférable de télécharger l'extension chrome livereload.

### Installation du boilerplate
```
cd dans le dossier
npm install
```

### Configuration
* Créez une base de données MySQL à l'aide de'l'outil de votre choix. Afin de faire fonctionner l'application de démonstration, ajoutez y également une table user avec les colonnes suivantes:
  - id (int)
  - username (varchar)
  - password (varchar)
  - email (varchar)
* configurez le fichier .env situé dans le dossier config avec vos identifiants mysql, votre hôte, ainsi que le nom de votre base de données.

## Utilisation
```
cd dans le dossier
gulp
ou
nodemon
```

Ensuite rendez vous à l'adresse localhost:8000. Si vous avez utilisé la commande gulp, cela se fera automatiquement à condition que vous ayiez Google Chrome d'installé. Une documentation sur l'architecture des dossiers ainsi que l'utilisation des générateurs gulp s'afficheront alors dans l'application de démonstration.

## Auteur

* **Loïc Pennequin** [GitHub](https://github.com/loicpennequin)

## Licence

MIT
