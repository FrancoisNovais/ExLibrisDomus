import { Book } from "../models/index.js";
import BaseController from "./base.controller.js";


class BookController extends BaseController {
  constructor() {
    super(Book, "livre");
  }

  // Méthode pour lookup via ISBN
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
            // Séparer nom / prénom si possible
            const nameParts = author.name?.split(" ") || [];
            return {
              nom: nameParts.pop() || "",
              prenom: nameParts.join(" ") || ""
            };
          })
        );
        authors = authorsData.filter(Boolean);
      }

      // 3️⃣ Récupération de la langue (si dispo)
      let langue = "";
      if (bookData.languages?.length) {
        // ex: /languages/eng.json
        const langKey = bookData.languages[0].key; 
        langue = langKey.split("/").pop() || "";
      }

      // 4️⃣ Récupération des genres / sujets (si dispo)
      const genres = bookData.subjects || [];

      // 5️⃣ Couverture
      const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

      // 6️⃣ Synopsis / description
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

      res.json(prefillData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération du livre" });
    }
  };
}

export default new BookController();