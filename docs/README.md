# ExLibrisDomus API

## Description

L'API ExLibrisDomus permet de gérer une bibliothèque personnelle avec livres, auteurs, genres, étagères, emprunteurs, notes et emprunts. Elle est construite sur PostgreSQL et expose des endpoints RESTful pour toutes les opérations CRUD.

## Base URL

```
http://localhost:3000/api/v1
```

## Endpoints

### 1. Authors / Auteurs

| Méthode | Endpoint      | Description                        |
| ------- | ------------- | ---------------------------------- |
| GET     | /authors      | Liste tous les auteurs             |
| GET     | /authors/\:id | Récupère un auteur par ID          |
| POST    | /authors      | Crée un nouvel auteur              |
| PATCH   | /authors/\:id | Met à jour un auteur partiellement |
| DELETE  | /authors/\:id | Supprime un auteur                 |

### 2. Shelves / Étagères

| Méthode | Endpoint      | Description                          |
| ------- | ------------- | ------------------------------------ |
| GET     | /shelves      | Liste toutes les étagères            |
| GET     | /shelves/\:id | Récupère une étagère                 |
| POST    | /shelves      | Crée une étagère                     |
| PATCH   | /shelves/\:id | Met à jour une étagère partiellement |
| DELETE  | /shelves/\:id | Supprime une étagère                 |

### 3. Genres

| Méthode | Endpoint     | Description                       |
| ------- | ------------ | --------------------------------- |
| GET     | /genres      | Liste tous les genres             |
| GET     | /genres/\:id | Récupère un genre                 |
| POST    | /genres      | Crée un genre                     |
| PATCH   | /genres/\:id | Met à jour un genre partiellement |
| DELETE  | /genres/\:id | Supprime un genre                 |

### 4. Borrowers / Emprunteurs

| Méthode | Endpoint        | Description                            |
| ------- | --------------- | -------------------------------------- |
| GET     | /borrowers      | Liste tous les emprunteurs             |
| GET     | /borrowers/\:id | Récupère un emprunteur                 |
| POST    | /borrowers      | Crée un emprunteur                     |
| PATCH   | /borrowers/\:id | Met à jour un emprunteur partiellement |
| DELETE  | /borrowers/\:id | Supprime un emprunteur                 |

### 5. Books / Livres

| Méthode | Endpoint    | Description                                                              |
| ------- | ----------- | ------------------------------------------------------------------------ |
| GET     | /books      | Liste tous les livres (filtrable par auteur, genre, étagère, lecture...) |
| GET     | /books/\:id | Récupère un livre                                                        |
| POST    | /books      | Crée un livre                                                            |
| PATCH   | /books/\:id | Met à jour un livre partiellement                                        |
| DELETE  | /books/\:id | Supprime un livre                                                        |

### 6. Notes

| Méthode | Endpoint               | Description                       |
| ------- | ---------------------- | --------------------------------- |
| GET     | /books/\:book_id/notes | Liste toutes les notes d’un livre |
| GET     | /notes/\:id            | Récupère une note                 |
| POST    | /books/\:book_id/notes | Crée une note pour un livre       |
| PATCH   | /notes/\:id            | Met à jour une note partiellement |
| DELETE  | /notes/\:id            | Supprime une note                 |

### 7. Borrows / Emprunts

| Méthode | Endpoint      | Description                                                    |
| ------- | ------------- | -------------------------------------------------------------- |
| GET     | /borrows      | Liste tous les emprunts (filtrable par statut)                 |
| GET     | /borrows/\:id | Récupère un emprunt                                            |
| POST    | /borrows      | Crée un emprunt (livre + emprunteur)                           |
| PATCH   | /borrows/\:id | Met à jour un emprunt partiellement (statut ou date de retour) |
| DELETE  | /borrows/\:id | Supprime un emprunt                                            |

## Filtres et requêtes supplémentaires

- `/books?author_id=1&genre_id=2` → filtrer les livres par auteur et genre
- `/borrows?status=ongoing` → lister les emprunts en cours
- `/borrowers/:id/borrows` → lister tous les emprunts d’un emprunteur

## Format des réponses

- Toutes les réponses sont en JSON.
- Exemple de réponse pour un livre :

```json
{
  "id": 1,
  "title": "Le Grand Livre",
  "year": 2020,
  "pages": 300,
  "language": "FR",
  "rating": 5,
  "cover": "/images/couverture.jpg",
  "favorite": true,
  "synopsis": "Résumé...",
  "analysis": "Analyse...",
  "read": false,
  "id_author": 1,
  "id_shelf": 2,
  "id_genre": 3,
  "created_at": "2025-09-06T10:00:00Z",
  "updated_at": "2025-09-06T10:05:00Z"
}
```

## Authentification

- L’API ne gère pas d’authentification, car elle est conçue pour une utilisation personnelle (bibliothèque d’un seul utilisateur).

## Notes

- La suppression d’une étagère ou d’un auteur met à `NULL` les références dans les livres (ON DELETE SET NULL).
- La suppression d’un livre supprime automatiquement ses notes associées (ON DELETE CASCADE).
