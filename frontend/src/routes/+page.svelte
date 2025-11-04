<script lang="ts">
  import { books, fetchBooks, loadingBooks, errorBooks } from '$lib/stores/books.svelte';
  import { headerActions } from '$lib/stores/headerActions.svelte';
  import BookCard from '$lib/components/BookCard.svelte';
  import AddBookModal from '$lib/components/AddBookModal.svelte';
  import { onMount } from 'svelte';
  import { untrack } from 'svelte';
  
  let showAddModal = $state(false);
  
  onMount(() => {
    headerActions.current = [
      {
        label: 'Nouveau livre',
        icon: 'fa-plus',
        primary: true,
        action: () => {
          showAddModal = true;
        }
      }
    ];
    
    fetchBooks();

    return () => {
      untrack(() => {
        headerActions.current = [];
      });
    };
  });
</script>

{#if loadingBooks.current}
  <p>Chargement...</p>
{:else if errorBooks.current}
  <p class="error">Erreur : {errorBooks.current}</p>
{:else}
  <div class="books-grid">
    {#each books.current as book (book.id)}
      <BookCard {book} />
    {/each}
  </div>
{/if}

<AddBookModal 
  isOpen={showAddModal} 
  onClose={() => showAddModal = false} 
/>

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