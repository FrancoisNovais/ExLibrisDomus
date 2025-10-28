<script lang="ts">
  import { books, fetchBooks, loadingBooks, errorBooks } from '$lib/stores/books.svelte';
  import { authors, fetchAuthors, loadingAuthors, errorAuthors } from '$lib/stores/authors.svelte';
  import { genres, fetchGenres, loadingGenres, errorGenres } from '$lib/stores/genres.svelte';
  import { headerActions } from '$lib/stores/headerActions.svelte';
  import BookCard from '$lib/components/BookCard.svelte';
  import { onMount } from 'svelte';
  import { untrack } from 'svelte';
  
  // Charger toutes les ressources en parallèle
  onMount(() => {
    // Définir les actions du header pour cette page
    headerActions.current = [
      {
        label: 'Nouveau livre',
        icon: 'fa-plus',
        primary: true,
        action: () => {
          // TODO: Logique pour ouvrir le modal d'ajout de livre
          console.log('Ajouter un livre');
        }
      },
      {
        label: 'Modifier livre',
        icon: 'fa-plus',
        primary: false,
        action: () => {
          // TODO: Logique pour ouvrir le modal d'ajout de livre
          console.log('Ajouter un livre');
        }
      }
    ];

    // Charger les données en parallèle (sans await dans onMount)
    Promise.all([fetchAuthors(), fetchGenres(), fetchBooks()]);

      // Nettoyer les actions en quittant la page
    return () => {
      untrack(() => {
        headerActions.current = [];
      });
    };
  });
</script>

{#if loadingBooks.current || loadingAuthors.current || loadingGenres.current}
  <p>Chargement...</p>
{:else if errorBooks.current || errorAuthors.current || errorGenres.current}
  <p class="error">
    Erreur :
    {errorBooks.current ?? errorAuthors.current ?? errorGenres.current}
  </p>
{:else}
  <div class="books-grid">
    {#each books.current as book (book.id)}
      <BookCard {book} />
    {/each}
  </div>
{/if}

<style>
  .books-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    .books-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .books-grid {
      grid-template-columns: 1fr;
    }
  }
</style>