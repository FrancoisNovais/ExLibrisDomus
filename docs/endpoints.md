# ExLibrisDomus API Endpoints

## 1. Authors

- **GET** `/authors` → liste tous les auteurs
- **GET** `/authors/:id` → récupère un auteur par son ID
- **POST** `/authors` → crée un nouvel auteur
- **PATCH** `/authors/:id` → met à jour un auteur partiellement
- **DELETE** `/authors/:id` → supprime un auteur

## 2. Shelves

- **GET** `/shelves` → liste toutes les étagères
- **GET** `/shelves/:id` → récupère une étagère
- **POST** `/shelves` → crée une étagère
- **PATCH** `/shelves/:id` → met à jour une étagère partiellement
- **DELETE** `/shelves/:id` → supprime une étagère

## 3. Genres

- **GET** `/genres` → liste tous les genres
- **GET** `/genres/:id` → récupère un genre
- **POST** `/genres` → crée un genre
- **PATCH** `/genres/:id` → met à jour un genre partiellement
- **DELETE** `/genres/:id` → supprime un genre

## 4. Borrowers

- **GET** `/borrowers` → liste tous les emprunteurs
- **GET** `/borrowers/:id` → récupère un emprunteur
- **POST** `/borrowers` → crée un emprunteur
- **PATCH** `/borrowers/:id` → met à jour un emprunteur partiellement
- **DELETE** `/borrowers/:id` → supprime un emprunteur

## 5. Books

- **GET** `/books` → liste tous les livres (avec filtres possibles par genre, auteur, shelf, lecture…)
- **GET** `/books/:id` → récupère un livre
- **POST** `/books` → crée un livre
- **PATCH** `/books/:id` → met à jour un livre partiellement
- **DELETE** `/books/:id` → supprime un livre

## 6. Notes

- **GET** `/books/:book_id/notes` → liste toutes les notes d’un livre
- **GET** `/notes/:id` → récupère une note spécifique
- **POST** `/books/:book_id/notes` → crée une note pour un livre
- **PATCH** `/notes/:id` → met à jour une note partiellement
- **DELETE** `/notes/:id` → supprime une note

## 7. Borrows

- **GET** `/borrows` → liste tous les emprunts (avec filtres possibles : en cours, retournés, en retard…)
- **GET** `/borrows/:id` → récupère un emprunt
- **POST** `/borrows` → crée un emprunt (livre + emprunteur)
- **PATCH** `/borrows/:id` → met à jour un emprunt partiellement (statut ou date de retour)
- **DELETE** `/borrows/:id` → supprime un emprunt

## 8. Filtres et requêtes supplémentaires

- `/books?author_id=1&genre_id=2` → filtrer les livres par auteur et genre
- `/borrows?status=ongoing` → lister seulement les emprunts en cours
- `/borrowers/:id/borrows` → lister tous les emprunts d’un emprunteur
