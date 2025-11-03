import axios from 'axios';

export interface ApiStore<T> {
  data: { current: T[] };
  loading: { current: boolean };
  error: { current: string | null };
  fetchAll: (includes?: string[]) => Promise<void>;
}

export function createApiStore<T>(endpoint: string): ApiStore<T> {
  const data = $state<{ current: T[] }>({ current: [] });
  const loading = $state<{ current: boolean }>({ current: false });
  const error = $state<{ current: string | null }>({ current: null });

  async function fetchAll(includes?: string[]) {
    loading.current = true;
    error.current = null;

    try {
      const url = new URL(`http://localhost:4000/api/${endpoint}`);
      if (includes && includes.length > 0) {
        url.searchParams.set('include', includes.join(','));
      }

      const res = await axios.get(url.toString(), {
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