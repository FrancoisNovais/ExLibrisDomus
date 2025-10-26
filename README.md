# ExLibrisDomus

ExLibrisDomus est une application simple de gestion de bibliothèque personnelle. Elle permet à un utilisateur unique de suivre ses livres, auteurs, genres, étagères de rangement, notes et emprunts de manière centralisée et intuitive.

## Structure du projet

```
ExLibrisDomus
├── .env
├── .env.exemple
├── .gitignore
├── README.md
├── backend
│   ├── .env
│   ├── .env.example
│   ├── controllers
│   │   ├── author.controller.js
│   │   ├── base.controller.js
│   │   ├── book.controller.js
│   │   ├── borrow.controller.js
│   │   ├── borrower.controller.js
│   │   ├── genre.controller.js
│   │   ├── note.controller.js
│   │   └── shelf.controller.js
│   ├── errors
│   │   └── httpError.js
│   ├── index.js
│   ├── middlewares
│   │   ├── error404.js
│   │   ├── errorHandler.js
│   │   ├── validate.js
│   │   └── validateBorrow.js
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
│   ├── routes
│   │   ├── author.routes.js
│   │   ├── book.routes.js
│   │   ├── borrow.routes.js
│   │   ├── borrower.routes.js
│   │   ├── genre.routes.js
│   │   ├── index.js
│   │   ├── note.routes.js
│   │   └── shelf.routes.js
│   └── validation
│       ├── author.schemas.js
│       ├── book.schemas.js
│       ├── borrow.schemas.js
│       ├── borrower.schemas.js
│       ├── genre.schemas.js
│       ├── global.schemas.js
│       ├── note.schemas.js
│       └── shelf.schemas.js
├── docker-compose.postgres.yml
├── docs
│   ├── README.md
│   ├── endpoints.md
│   ├── mcd.md
│   ├── mcd.png
│   ├── mld.md
│   ├── mld.png
│   └── mpd.sql
└── requests
    ├── authors.requests.http
    ├── books.requests.http
    ├── borrow.requests.http
    ├── borrowers.requests.http
    ├── genres.requests.http
    ├── notes.requests.http
    └── shelves.requests.http
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
docker-compose -f docker-compose.postgres.yml up -d
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
npm run db:create
```

2. Seed les données :

```bash
npm run db:seed
```

> Cela ajoutera des auteurs, étagères, genres et livres d’exemple dans la base.

3. Pour reset la base de données (créer + seed) :

```bash
npm run db:reset
```

## Lancer le serveur backend

```bash
npm run dev
```

* Le serveur écoute sur le port défini dans `.env` (`PORT=4000` par défaut).
* API disponible sur `http://localhost:4000`.

## Notes

* La structure des modèles et relations se trouve dans `backend/models/`.
* Les migrations et seeds sont dans `backend/migrations/`.
* Les routes et controllers sont organisés dans `backend/routes/` et `backend/controllers/`.

