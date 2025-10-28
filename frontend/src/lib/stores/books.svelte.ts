import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Book } from '$lib/types.ts';

export const {
  data: books,
  loading: loadingBooks,
  error: errorBooks,
  fetchAll: fetchBooks
} = createApiStore<Book>('books');
