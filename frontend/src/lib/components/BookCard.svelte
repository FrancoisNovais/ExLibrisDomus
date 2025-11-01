<script lang="ts">
  import type { Book, Author, Genre } from '$lib/types';
  import { authors } from '$lib/stores/authors.svelte';
  import { genres } from '$lib/stores/genres.svelte';

  interface Props {
    book: Book;
    onEdit?: ((book: Book) => void) | undefined;
    onDelete?: ((book: Book) => void) | undefined;
  }

  let { book, onEdit, onDelete }: Props = $props();

  let authorName = $derived.by(() => {
    const author = authors.current?.find((a: Author) => a.id === book.id_author);
    return author
      ? `${author.first_name ?? ''} ${author.last_name}`.trim()
      : 'Auteur inconnu';
  });

  let genreName = $derived.by(() => {
    const genre = genres.current?.find((g: Genre) => g.id === book.id_genre);
    return genre ? genre.category : 'Genre inconnu';
  });

  let stars = $derived(
    Array(5).fill(false).map((_, i) => i < (book.rating || 0))
  );

    function handleEdit() {
        onEdit?.(book);
  }

  function handleDelete() {
      onDelete?.(book);
  }
 </script>

<div class="book-card">
  <div class="book-card__image-container">
    <img
      src={book.cover || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop'}
      alt={book.title}
      class="book-card__image"
    />
    {#if book.read}
      <div class="book-card__status book-card__status--read">Lu</div>
    {:else}
      <div class="book-card__status book-card__status--to-read">À lire</div>
    {/if}
  </div>
  <div class="book-card__content">
    <h3 class="book-card__title">{book.title}</h3>
    <p class="book-card__author">{authorName}</p>
    <div class="book-card__meta">
      <span class="book-card__genre">{genreName}</span>
      <span>{book.year}</span>
    </div>

    {#if book.rating && book.rating > 0}
      <div class="book-card__rating">
        {#each stars as filled}
          <i class="fas fa-star book-card__star {filled ? 'book-card__star--filled' : ''}"></i>
        {/each}
      </div>
    {/if}

    <div class="book-card__actions">
      <button class="book-card__action" onclick={handleEdit} aria-label="Modifier le livre">
        <i class="fas fa-edit"></i>
      </button>
      <button
        class="book-card__action book-card__action--delete"
        onclick={handleDelete}
        aria-label="Supprimer le livre"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</div>

<style>
  .book-card {
    background-color: white;
    border: 2px solid #e7e5e4;
    transition: border-color 0.2s;
  }

  .book-card:hover {
    border-color: #1c1917;
  }

  .book-card__image-container {
    position: relative;
  }

  .book-card__image {
    width: 100%;
    height: 320px;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.3s;
  }

  .book-card:hover .book-card__image {
    filter: grayscale(0%);
  }

  .book-card__status {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 1px solid;
  }

  .book-card__status--read {
    background-color: #f0fdf4;
    color: #15803d;
    border-color: #bbf7d0;
  }

  .book-card__status--to-read {
    background-color: #f8fafc;
    color: #475569;
    border-color: #e2e8f0;
  }

  .book-card__content {
    padding: 16px;
  }

  .book-card__title {
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    color: #1c1917;
  }

  .book-card__author {
    color: #78716c;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  .book-card__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    color: #a8a29e;
    margin-bottom: 12px;
  }

  .book-card__genre {
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .book-card__rating {
    display: flex;
    gap: 2px;
    margin-bottom: 12px;
  }

  .book-card__star {
    font-size: 12px;
    color: #d1d5db;
  }

  .book-card__star--filled {
    color: #eab308;
  }

  .book-card__actions {
    display: flex;
    justify-content: space-between;
  }

  .book-card__action {
    padding: 8px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .book-card__action:hover {
    background-color: #f5f5f4;
  }

  .book-card__action--delete:hover {
    background-color: #fef2f2;
  }

  .book-card__action i {
    font-size: 14px;
    color: #78716c;
  }

  .book-card__action--delete i {
    color: #dc2626;
  }
</style>