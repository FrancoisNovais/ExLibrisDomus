import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Author } from '$lib/types.ts';

// ✅ On réutilise le type Author du fichier global
export const {
  data: authors,
  loading: loadingAuthors,
  error: errorAuthors,
  fetchAll: fetchAuthors
} = createApiStore<Author>('authors');
