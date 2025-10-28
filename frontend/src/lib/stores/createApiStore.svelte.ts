import axios from 'axios';

/**
 * Interface d'un store API générique avec Svelte 5
 * @template T - Le type de données stockées (ex: Book, Author, Genre)
 */
export interface ApiStore<T> {
  data: { current: T[] };
  loading: { current: boolean };
  error: { current: string | null };
  fetchAll: () => Promise<void>;
}

/**
 * Factory function qui crée un store générique pour gérer une ressource API
 * Compatible Svelte 5 avec les runes $state
 * 
 * UTILISATION :
 * 
 * 1. Créer un store dédié (dans stores/authors.ts) :
 * ```typescript
 * export const authorsStore = createApiStore<Author>('authors');
 * ```
 * 
 * 2. Utiliser dans un composant :
 * ```svelte
 * <script lang="ts">
 * import { authorsStore } from '$lib/stores/authors';
 * 
 * onMount(async () => {
 *   await authorsStore.fetchAll();
 * });
 * 
 * // Accès aux données
 * {authorsStore.data.current}
 * </script>
 * ```
 * 
 * @template T - Le type de données (ex: Book, Author, Genre)
 * @param {string} endpoint - Le nom de l'endpoint API (ex: 'books', 'authors')
 * @returns {ApiStore<T>} Un objet contenant les états réactifs et la fonction fetchAll
 */
export function createApiStore<T>(endpoint: string): ApiStore<T> {
  const data = $state<{ current: T[] }>({ current: [] });
  const loading = $state<{ current: boolean }>({ current: false });
  const error = $state<{ current: string | null }>({ current: null });

  async function fetchAll() {
    loading.current = true;
    error.current = null;

    try {
      const res = await axios.get(`http://localhost:4000/api/${endpoint}`, {
        headers: { Accept: 'application/json' },
      });
      data.current = res.data;
    } catch (err: any) {
      error.current = err.message || `Failed to fetch ${endpoint}`;
    } finally {
      loading.current = false;
    }
  }

  return { data, loading, error, fetchAll };
}