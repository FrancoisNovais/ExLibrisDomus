# ExLibrisDomus

ExLibrisDomus est une application simple de gestion de bibliothèque personnelle. Elle permet à un utilisateur unique de suivre ses livres, auteurs, genres, étagères de rangement, notes et emprunts de manière centralisée et intuitive.

## Structure du projet

```
ExLibrisDomus
├── .env
├── .env.exemple
├── .gitignore
├── backend
│   ├── .env
│   ├── .env.example
│   ├── controllers
│   │   ├── base.controller.js
│   │   └── book.controller.js
│   ├── index.js
│   ├── migrations
│   │   ├── 01.create-tables.js
│   │   └── 02.seed-tables.js
│   ├── models
│   │   ├── author.model.js
│   │   ├── book.model.js
│   │   ├── borrow.model.js
│   │   ├── borrower.model.js
│   │   ├── genre.model.js
│   │   ├── index.js
│   │   ├── note.model.js
│   │   ├── sequelize.client.js
│   │   └── shelf.model.js
│   ├── package-lock.json
│   ├── package.json
│   └── routes
│       ├── book.routes.js
│       └── index.js
├── docker-compose.yml
├── docs
│   ├── endpoints.md
│   ├── mcd.md
│   ├── mcd.png
│   ├── mld.md
│   ├── mld.png
│   ├── mpd.sql
│   └── README.md
├── README.md
└── request.http
```

## Installation

1. Cloner le projet :

```bash
git clone <repo_url>
cd ExLibrisDomus
```

2. Installer les dépendances backend :

```bash
cd backend
npm install
```

3. Configurer les variables d’environnement :

* Créer un fichier `.env` à la racine de `backend/` basé sur `.env.example` :

```
# Server
PORT=4000

# PostgreSQL
PGUSER=<votre_utilisateur>
PGPASSWORD=<votre_mot_de_passe>
PGDATABASE=<votre_base>
PGHOST=localhost
PGPORT=5432
```

* Créer un fichier `.env` à la racine du projet pour Docker PostgreSQL :

```
POSTGRES_USER=<votre_utilisateur>
POSTGRES_PASSWORD=<votre_mot_de_passe>
POSTGRES_DB=<votre_base>
```

## Lancer PostgreSQL via Docker

Depuis la racine du projet :

```bash
docker-compose up -d
```

* Le conteneur PostgreSQL sera accessible sur `localhost:5432`.
* Vérifiez qu’il tourne :

```bash
docker ps
```

* Se connecter au conteneur (facultatif) :

```bash
docker exec -it exlibrisdomus-db psql -U <votre_utilisateur> -d <votre_base>
```

## Initialiser la base de données

1. Créer les tables :

```bash
npm run db:migrate
```

2. Seed les données :

```bash
npm run db:seed
```

> Cela ajoutera des auteurs, étagères, genres et livres d’exemple dans la base.

## Lancer le serveur backend

```bash
npm start
```

* Le serveur écoute sur le port défini dans `.env` (`PORT=4000` par défaut).
* API disponible sur `http://localhost:4000`.

## Notes

* La structure des modèles et relations se trouve dans `backend/models/`.
* Les migrations et seeds sont dans `backend/migrations/`.
* Les routes et controllers sont organisés dans `backend/routes/` et `backend/controllers/`.
