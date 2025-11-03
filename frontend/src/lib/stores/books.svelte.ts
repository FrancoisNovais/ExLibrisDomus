import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Book } from '$lib/types.ts';

const store = createApiStore<Book>('books');

// Fonction wrapper qui ajoute automatiquement tous les includes
async function fetchBooksWithIncludes() {
  await store.fetchAll(['author', 'genre', 'shelf', 'notes', 'borrows.borrower']);
}

export const {
  data: books,
  loading: loadingBooks,
  error: errorBooks
} = store;

export const fetchBooks = fetchBooksWithIncludes;