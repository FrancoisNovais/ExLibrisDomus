import "dotenv/config";
import {
  Author,
  Shelf,
  Genre,
  Book,
  sequelize,
} from "../models/index.js";

async function seedDatabase() {
  try {
    // Crée toutes les tables définies dans les modèles
    await sequelize.sync({ force: true });
    // --- Genres ---
    const genres = await Genre.bulkCreate(
      [
        { category: "Dystopia" },
        { category: "Epic Fantasy" },
        { category: "Adventure" },
        { category: "Romance" },
        { category: "Philosophical Novel" },
      ],
      { returning: true }
    );

    // --- Shelves ---
    const shelves = await Shelf.bulkCreate(
      [
        { label: "Classics" },
        { label: "Fantasy" },
        { label: "Philosophy" },
        { label: "Science Fiction" },
        { label: "Children" },
      ],
      { returning: true }
    );

    // --- Authors ---
    const authors = await Author.bulkCreate(
      [
        { last_name: "Orwell", first_name: "George", birth_date: "1903-06-25" },
        { last_name: "Tolkien", first_name: "J.R.R.", birth_date: "1892-01-03" },
        { last_name: "Rowling", first_name: "J.K.", birth_date: "1965-07-31" },
        { last_name: "Camus", first_name: "Albert", birth_date: "1913-11-07" },
        { last_name: "Huxley", first_name: "Aldous", birth_date: "1894-07-26" },
        { last_name: "Dumas", first_name: "Alexandre", birth_date: "1802-07-24" },
        { last_name: "Verne", first_name: "Jules", birth_date: "1828-02-08" },
        { last_name: "Austen", first_name: "Jane", birth_date: "1775-12-16" },
        { last_name: "Homer" },
        { last_name: "Saint-Exupéry", first_name: "Antoine de", birth_date: "1900-06-29" },
      ],
      { returning: true }
    );

    // --- Books ---
    await Book.bulkCreate([
      {
        title: "1984",
        year: 1949,
        pages: 328,
        language: "English",
        rating: 5,
        favorite: true,
        synopsis: "Dystopian novel depicting a totalitarian society under constant surveillance.",
        read: true,
        id_author: authors[0].id,
        id_shelf: shelves[0].id,
        id_genre: genres[0].id,
      },
      {
        title: "Brave New World",
        year: 1932,
        pages: 311,
        language: "English",
        rating: 5,
        synopsis: "A futuristic society driven by technology and control.",
        id_author: authors[4].id,
        id_shelf: shelves[0].id,
        id_genre: genres[0].id,
      },
      {
        title: "The Lord of the Rings",
        year: 1954,
        pages: 1178,
        language: "English",
        rating: 5,
        favorite: true,
        synopsis: "Epic fantasy saga of the One Ring and the quest to destroy it.",
        id_author: authors[1].id,
        id_shelf: shelves[1].id,
        id_genre: genres[1].id,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        year: 1997,
        pages: 223,
        language: "English",
        rating: 4,
        favorite: true,
        synopsis: "The beginning of the journey of the young wizard Harry Potter.",
        id_author: authors[2].id,
        id_shelf: shelves[1].id,
        id_genre: genres[1].id,
      },
      {
        title: "The Stranger",
        year: 1942,
        pages: 123,
        language: "French",
        rating: 5,
        synopsis: "Existential novel exploring absurdity and alienation.",
        id_author: authors[3].id,
        id_shelf: shelves[2].id,
        id_genre: genres[4].id,
      },
      {
        title: "The Count of Monte Cristo",
        year: 1844,
        pages: 1276,
        language: "French",
        rating: 5,
        synopsis: "A man wrongfully imprisoned seeks revenge.",
        id_author: authors[5].id,
        id_shelf: shelves[0].id,
        id_genre: genres[2].id,
      },
      {
        title: "Twenty Thousand Leagues Under the Sea",
        year: 1870,
        pages: 384,
        language: "French",
        rating: 4,
        synopsis: "Captain Nemo and his submarine Nautilus travel the deep seas.",
        id_author: authors[6].id,
        id_shelf: shelves[3].id,
        id_genre: genres[2].id,
      },
      {
        title: "Pride and Prejudice",
        year: 1813,
        pages: 279,
        language: "English",
        rating: 5,
        synopsis: "Classic romance novel with wit and critique of society.",
        id_author: authors[7].id,
        id_shelf: shelves[0].id,
        id_genre: genres[3].id,
      },
      {
        title: "The Odyssey",
        year: -800,
        pages: 541,
        language: "Greek",
        rating: 5,
        synopsis: "Epic poem of Odysseus’ journey home.",
        id_author: authors[8].id,
        id_shelf: shelves[0].id,
        id_genre: genres[2].id,
      },
      {
        title: "The Little Prince",
        year: 1943,
        pages: 96,
        language: "French",
        rating: 5,
        favorite: true,
        synopsis: "A poetic tale with philosophical themes, disguised as a children's story.",
        id_author: authors[9].id,
        id_shelf: shelves[4].id,
        id_genre: genres[4].id,
      },
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
