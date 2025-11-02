import "dotenv/config";
import {
  Author,
  Shelf,
  Genre,
  Book,
  Note,
  sequelize,
} from "../models/index.js";

async function seedDatabase() {
  try {
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
    const books = await Book.bulkCreate(
      [
        {
          title: "1984",
          year: 1949,
          pages: 328,
          language: "English",
          rating: 5,
          favorite: true,
          synopsis:
            "Dystopian novel depicting a totalitarian society under constant surveillance.",
          read: true,
          analysis:
            "A chilling portrayal of state control and manipulation, 1984 warns of the dangers of losing individuality and truth.",
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
          analysis:
            "Huxley explores how comfort and pleasure can become tools of oppression, questioning freedom in a technological world.",
          read: true,
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
          synopsis:
            "Epic fantasy saga of the One Ring and the quest to destroy it.",
          read: false,
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
          read: false,
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
          analysis:
            "Camus captures the absurd condition of man through Meursault’s indifference and confrontation with the meaningless.",
          read: true,
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
          analysis:
            "A timeless tale of vengeance, justice, and redemption that explores the darkness and nobility of the human soul.",
          read: true,
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
          synopsis:
            "Captain Nemo and his submarine Nautilus travel the deep seas.",
          analysis:
            "A visionary novel merging science and adventure, reflecting both human curiosity and isolation.",
          read: true,
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
          synopsis:
            "Classic romance novel with wit and critique of society.",
          analysis:
            "A sharp yet tender critique of class and gender roles, balanced by wit and the triumph of sincerity.",
          read: true,
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
          analysis:
            "An exploration of perseverance, identity, and humanity’s endless search for home.",
          read: true,
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
          synopsis:
            "A poetic tale with philosophical themes, disguised as a children's story.",
          analysis:
            "A touching allegory on love, loss, and innocence, reminding us to see with the heart rather than the eyes.",
          read: true,
          id_author: authors[9].id,
          id_shelf: shelves[4].id,
          id_genre: genres[4].id,
        },
      ],
      { returning: true }
    );

    // --- Notes ---
    await Note.bulkCreate([
      // 1984
      { page: 12, content: "Introduction to the concept of Big Brother.", id_book: books[0].id },
      { page: 240, content: "Winston begins to realize the depth of manipulation.", id_book: books[0].id },

      // Brave New World
      { page: 45, content: "The conditioning process shows total control over humans.", id_book: books[1].id },
      { page: 220, content: "John's moral conflict with the society's emptiness.", id_book: books[1].id },

      // The Stranger
      { page: 30, content: "Meursault’s detachment from his mother’s death is unsettling.", id_book: books[4].id },
      { page: 110, content: "Existential reflection before execution.", id_book: books[4].id },

      // The Count of Monte Cristo
      { page: 90, content: "Edmond Dantès imprisoned unjustly.", id_book: books[5].id },
      { page: 700, content: "The transformation from vengeance to forgiveness.", id_book: books[5].id },

      // Twenty Thousand Leagues Under the Sea
      { page: 20, content: "Discovery of the Nautilus.", id_book: books[6].id },
      { page: 360, content: "Captain Nemo’s melancholy revealed.", id_book: books[6].id },

      // Pride and Prejudice
      { page: 40, content: "Darcy’s pride first clashes with Elizabeth’s wit.", id_book: books[7].id },
      { page: 260, content: "Reconciliation and realization of love.", id_book: books[7].id },

      // The Odyssey
      { page: 100, content: "Odysseus faces the Cyclops.", id_book: books[8].id },
      { page: 500, content: "Return to Ithaca and reunion with Penelope.", id_book: books[8].id },

      // The Little Prince
      { page: 10, content: "The first meeting between the narrator and the Prince.", id_book: books[9].id },
      { page: 80, content: "The fox teaches the essence of love and loss.", id_book: books[9].id },
    ]);

    console.log("✅ Database seeded successfully with analyses and notes!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
