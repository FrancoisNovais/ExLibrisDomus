import { Book, Author, Genre, sequelize } from "../models/index.js";
import BaseController from "./base.controller.js";

/**
 * Controller pour le modèle Book.
 * Hérite de BaseController et fournit des méthodes CRUD génériques,
 * ainsi que des fonctionnalités avancées pour lookup ISBN et création complexe.
 */
class BookController extends BaseController {
  /**
   * Initialise le controller avec le modèle Book.
   */
  constructor() {
    super(Book, "livre");
  }

  /**
   * Récupère les informations d'un livre depuis OpenLibrary via son ISBN.
   * Renvoie un objet pré-rempli avec titre, auteurs, langue, couverture, synopsis et genres.
   *
   * @param {object} req - Requête Express contenant params.isbn
   * @param {object} res - Réponse Express
   */
  lookupByIsbn = async (req, res) => {
    const { isbn } = req.params;

    try {
      // 1️⃣ Récupération des données principales du livre
      const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      if (!response.ok) {
        return res.status(404).json({ error: "Livre non trouvé" });
      }
      const bookData = await response.json();

      // 2️⃣ Récupération des auteurs
      let authors = [];
      if (bookData.authors?.length) {
        const authorsData = await Promise.all(
          bookData.authors.map(async (a) => {
            const res = await fetch(`https://openlibrary.org${a.key}.json`);
            if (!res.ok) return null;
            const author = await res.json();
            const nameParts = author.name?.split(" ") || [];
            return {
              nom: nameParts.pop() || "",
              prenom: nameParts.join(" ") || ""
            };
          })
        );
        authors = authorsData.filter(Boolean);
      }

      // 3️⃣ Récupération de la langue
      let langue = "";
      if (bookData.languages?.length) {
        const langKey = bookData.languages[0].key; 
        langue = langKey.split("/").pop() || "";
      }

      // 4️⃣ Récupération des genres / sujets
      const genres = bookData.subjects || [];

      // 5️⃣ Récupération de la couverture
      const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

      // 6️⃣ Récupération du synopsis / description
      let synopsis = "";
      if (typeof bookData.description === "string") {
        synopsis = bookData.description;
      } else if (bookData.description?.value) {
        synopsis = bookData.description.value;
      }

      // 7️⃣ Préparer l'objet final
      const prefillData = {
        titre: bookData.title || "",
        subtitle: bookData.subtitle || "",
        année: bookData.publish_date || "",
        pages: bookData.number_of_pages || null,
        langue,
        couverture: cover,
        synopsis,
        authors,
        genres
      };

      // 8️⃣ Retourner les données au client
      res.json(prefillData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération du livre" });
    }
  };

  /**
   * Création avancée d'un livre avec gestion des auteurs et genres.
   * Si l'auteur ou le genre n'existe pas, ils sont créés.
   * Transaction Sequelize utilisée pour garantir la cohérence.
   *
   * @param {object} req - Requête Express contenant body avec données du livre
   * @param {object} res - Réponse Express
   */
  createAdvanced = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
      let authorId;
      let genreId;

      // 1️⃣ Gérer l'auteur (existant ou nouveau)
      if (req.body.id_author) {
        // Cas 1 : Auteur existant par ID
        authorId = req.body.id_author;
        const author = await Author.findByPk(authorId, { transaction });
        if (!author) {
          await transaction.rollback();
          return res.status(404).json({ error: 'Auteur non trouvé' });
        }
      } else if (req.body.author) {
        // Cas 2 : Nouvel auteur à créer
        const { first_name, last_name, birth_date } = req.body.author;
        const existingAuthor = await Author.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('last_name')),
            sequelize.fn('LOWER', last_name)
          ),
          transaction
        });
        authorId = existingAuthor ? existingAuthor.id : (await Author.create(
          { first_name, last_name, birth_date },
          { transaction }
        )).id;
      }

      // 2️⃣ Gérer le genre (existant ou nouveau)
      if (req.body.id_genre) {
        genreId = req.body.id_genre;
        const genre = await Genre.findByPk(genreId, { transaction });
        if (!genre) {
          await transaction.rollback();
          return res.status(404).json({ error: 'Genre non trouvé' });
        }
      } else if (req.body.genre) {
        const genreName = req.body.genre;
        const existingGenre = await Genre.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('category')),
            sequelize.fn('LOWER', genreName)
          ),
          transaction
        });
        genreId = existingGenre ? existingGenre.id : (await Genre.create(
          { category: genreName },
          { transaction }
        )).id;
      }

      // 3️⃣ Créer le livre avec toutes les données
      const book = await Book.create({
        title: req.body.title,
        year: req.body.year,
        pages: req.body.pages,
        language: req.body.language,
        rating: req.body.rating || null,
        cover: req.body.cover || null,
        favorite: req.body.favorite || false,
        synopsis: req.body.synopsis || null,
        analysis: req.body.analysis || null,
        read: req.body.read || false,
        id_author: authorId,
        id_genre: genreId,
        id_shelf: req.body.id_shelf || null,
      }, { transaction });

      // 4️⃣ Commit de la transaction
      await transaction.commit();

      // 5️⃣ Récupérer le livre avec toutes les relations pour la réponse
      const bookWithRelations = await Book.findByPk(book.id, {
        include: BaseController.generateInclude('author,genre,shelf,notes,borrows.borrower')
      });

      // 6️⃣ Retourner le livre créé au client
      res.status(201).json(bookWithRelations);
      
    } catch (error) {
      // 7️⃣ Rollback en cas d'erreur et renvoyer l'erreur
      await transaction.rollback();
      console.error('Erreur lors de la création avancée du livre:', error);
      res.status(500).json({ 
        error: 'Erreur lors de la création du livre',
        details: error.message 
      });
    }
  };
}

// Export d'une instance unique du controller
export default new BookController();
