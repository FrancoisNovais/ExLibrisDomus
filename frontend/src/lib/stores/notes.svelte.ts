import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Note } from '$lib/types.ts';

export const {
  data: notes,
  loading: loadingNotes,
  error: errorNotes,
  fetchAll: fetchNotes
} = createApiStore<Note>('notes');
