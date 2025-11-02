<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import type { Book, Note } from '$lib/types';
  import { books, fetchBooks } from '$lib/stores/books.svelte';
  import { authors, fetchAuthors } from '$lib/stores/authors.svelte';
  import { fetchGenres, genres } from '$lib/stores/genres.svelte';
  import { notes, fetchNotes } from '$lib/stores/notes.svelte';
  import { headerActions } from '$lib/stores/headerActions.svelte';
  import Button from '$lib/components/Button.svelte';
  import { onMount } from 'svelte';
  import { untrack } from 'svelte';

  // Récupérer l'ID du livre depuis l'URL
  let bookId = $derived($page.params.id ? parseInt($page.params.id) : 0);

  // Trouver le livre correspondant
  let book = $derived(books.current.find((b: Book) => b.id === bookId));

  // Auteur et genre
  let author = $derived(authors.current.find(a => a.id === book?.id_author));
  let genre = $derived(genres.current.find(g => g.id === book?.id_genre));

  let authorName = $derived(
    author ? `${author.first_name ?? ''} ${author.last_name}`.trim() : 'Auteur inconnu'
  );
  let genreName = $derived(genre ? genre.category : 'Genre inconnu');

  // Notes du livre
  let bookNotes = $derived(notes.current.filter((n: Note) => n.id_book === bookId));

  // États pour l'édition
  let editingSynopsis = $state(false);
  let editingAnalysis = $state(false);
  let synopsisText = $state('');
  let analysisText = $state('');

  // États pour les notes
  let editingNoteId = $state<number | null>(null);
  let editingNoteContent = $state('');
  let addingNote = $state(false);
  let newNoteContent = $state('');

  // Étoiles
  let stars = $derived(Array(5).fill(false).map((_, i) => i < (book?.rating || 0)));

  onMount(() => {
    // Charger les notes
    Promise.all([fetchAuthors(), fetchGenres(), fetchBooks(), fetchNotes()]);

    // Définir les actions du header pour cette page
    headerActions.current = [
      {
        label: 'Retour',
        icon: 'fa-arrow-left',
        primary: false,
        action: () => goto('/')
      },
      {
        label: 'Modifier',
        icon: 'fa-edit',
        primary: true,
        action: () => {
          // TODO: Ouvrir modal d'édition
          console.log('Modifier le livre');
        }
      }
    ];

    // Initialiser les textes
    if (book) {
      synopsisText = book.synopsis || '';
      analysisText = book.analysis || '';
    }

    // Nettoyer les actions en quittant la page
    return () => {
      untrack(() => {
        headerActions.current = [];
      });
    };
  });

  function toggleSynopsis() {
    if (editingSynopsis) {
      if (book) {
        book.synopsis = synopsisText;
        // TODO: Envoyer au backend
      }
    } else {
      synopsisText = book?.synopsis || '';
    }
    editingSynopsis = !editingSynopsis;
  }

  function cancelSynopsis() {
    synopsisText = book?.synopsis || '';
    editingSynopsis = false;
  }

  function toggleAnalysis() {
    if (editingAnalysis) {
      if (book) {
        book.analysis = analysisText;
        // TODO: Envoyer au backend
      }
    } else {
      analysisText = book?.analysis || '';
    }
    editingAnalysis = !editingAnalysis;
  }

  function cancelAnalysis() {
    analysisText = book?.analysis || '';
    editingAnalysis = false;
  }

  // Gestion des notes
  function startAddNote() {
    newNoteContent = '';
    addingNote = true;
  }

  function cancelAddNote() {
    newNoteContent = '';
    addingNote = false;
  }

  function saveNewNote() {
    if (newNoteContent.trim() && book) {
      // TODO: Envoyer au backend
      console.log('Ajouter note:', newNoteContent);
      // notes.current.push({ id: Date.now(), content: newNoteContent, id_book: book.id });
      cancelAddNote();
    }
  }

  function editNote(note: Note) {
    editingNoteId = note.id;
    editingNoteContent = note.content;
  }

  function cancelEditNote() {
    editingNoteId = null;
    editingNoteContent = '';
  }

  function saveEditNote(note: Note) {
    if (editingNoteContent.trim()) {
      // TODO: Envoyer au backend
      console.log('Modifier note:', editingNoteContent);
      note.content = editingNoteContent;
      cancelEditNote();
    }
  }

  function deleteNote(noteId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      // TODO: Envoyer au backend
      console.log('Supprimer note:', noteId);
    }
  }
</script>

{#if !book}
  <div class="error">
    <h2>Livre non trouvé</h2>
    <Button onclick={() => goto('/')}>Retour à l'accueil</Button>
  </div>
{:else}
  <!-- Book Header -->
  <section class="book-header">
    <div class="book-cover">
      <img
        src={book.cover || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop'}
        alt={book.title}
        class="book-cover__image"
      />
      {#if book.read}
        <div class="book-status book-status--read">Lu</div>
      {:else}
        <div class="book-status book-status--to-read">À lire</div>
      {/if}
    </div>

    <div class="book-info">
      <h1 class="book-title">{book.title}</h1>
      <p class="book-author">{authorName}</p>

      <div class="book-meta">
        <div class="book-meta__item">
          <span class="book-meta__label">Genre</span>
          <span class="book-meta__value">{genreName}</span>
        </div>
        <div class="book-meta__item">
          <span class="book-meta__label">Année</span>
          <span class="book-meta__value">{book.year}</span>
        </div>
        <div class="book-meta__item">
          <span class="book-meta__label">Pages</span>
          <span class="book-meta__value">{book.pages}</span>
        </div>
        {#if book.language}
          <div class="book-meta__item">
            <span class="book-meta__label">Langue</span>
            <span class="book-meta__value">{book.language}</span>
          </div>
        {/if}
      </div>

      {#if book.rating && book.rating > 0}
        <div class="book-rating">
          <div class="book-rating__stars">
            {#each stars as filled}
              <i class="fas fa-star book-rating__star {filled ? 'book-rating__star--filled' : ''}"></i>
            {/each}
          </div>
          <span class="book-rating__text">{book.rating}/5</span>
        </div>
      {/if}
      <div class="book-actions">
          <Button icon="fa-heart"> Favoris</Button>
          <Button primary icon="fas fa-bookmark">Marquer comme lu</Button>
          <Button icon="fa-trash" danger>Supprimer</Button>
      </div>
    </div>
  </section>

  <!-- Synopsis -->
  <section class="content-section">
    <div class="content-section__header">
      <h2 class="content-section__title">Synopsis</h2>
      <button
        class="content-section__edit-btn"
        onclick={toggleSynopsis}
        aria-label={editingSynopsis ? 'Sauvegarder le synopsis' : 'Modifier le synopsis'}
        title={editingSynopsis ? 'Sauvegarder le synopsis' : 'Modifier le synopsis'}
      >
        <i class="fas {editingSynopsis ? 'fa-save' : 'fa-edit'}"></i>
      </button>
    </div>

    {#if editingSynopsis}
      <div class="content-section__edit">
        <textarea
          bind:value={synopsisText}
          class="content-section__textarea"
          placeholder="Entrez le synopsis du livre..."
        ></textarea>
        <div class="content-section__actions">
          <Button size="small" onclick={cancelSynopsis}>Annuler</Button>
          <Button size="small" primary onclick={toggleSynopsis}>Sauvegarder</Button>
        </div>
      </div>
    {:else if book.synopsis}
      <p class="content-section__text">{book.synopsis}</p>
    {:else}
      <p class="content-section__empty">Aucun synopsis pour ce livre.</p>
    {/if}
  </section>

  <!-- Notes -->
  <section class="content-section">
    <div class="content-section__header">
      <h2 class="content-section__title">Mes Notes</h2>
      <button class="content-section__edit-btn" aria-label="Ajouter une note" title="Ajouter une note" onclick={startAddNote}>
        <i class="fas fa-plus" aria-hidden="true"></i>
      </button>
    </div>

    {#if addingNote}
      <div class="content-section__note content-section__note--new">
        <textarea
          bind:value={newNoteContent}
          class="content-section__textarea"
          placeholder="Votre note..."
          style="min-height: 80px"
        ></textarea>
        <div class="content-section__actions">
          <Button size="small" onclick={cancelAddNote}>Annuler</Button>
          <Button size="small" primary onclick={saveNewNote}>Ajouter</Button>
        </div>
      </div>
    {/if}

    {#each bookNotes as note (note.id)}
      <div class="content-section__note">
        {#if editingNoteId === note.id}
          <div class="content-section__edit">
            <textarea
              bind:value={editingNoteContent}
              class="content-section__textarea"
              placeholder="Votre note..."
              style="min-height: 80px"
            ></textarea>
            <div class="content-section__actions">
              <Button size="small" onclick={cancelEditNote}>Annuler</Button>
              <Button size="small" primary onclick={() => saveEditNote(note)}>Sauvegarder</Button>
              <Button
              size="small" 
                danger icon="fa-trash"
                onclick={() => deleteNote(note.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        {:else}
          <button class="content-section__note-edit-btn" onclick={() => editNote(note)} aria-label="Modifier la note" title="Modifier la note">
            <i class="fas fa-edit" aria-hidden="true"></i>
          </button>
          <p class="content-section__note-page">Page {note.page}</p>
          <p class="content-section__text">{note.content}</p>
        {/if}
      </div>
    {/each}

    {#if bookNotes.length === 0 && !addingNote}
      <p class="content-section__empty">Aucune note pour ce livre.</p>
    {/if}
  </section>

  <!-- Analyse -->
  <section class="content-section">
    <div class="content-section__header">
      <h2 class="content-section__title">Mon Analyse</h2>
      <button
        class="content-section__edit-btn"
        onclick={toggleAnalysis}
        aria-label={editingAnalysis ? "Sauvegarder l'analyse" : "Modifier l'analyse"}
        title={editingAnalysis ? "Sauvegarder l'analyse" : "Modifier l'analyse"}
      >
        <i class="fas {editingAnalysis ? 'fa-save' : 'fa-edit'}"></i>
      </button>
    </div>

    {#if editingAnalysis}
      <div class="content-section__edit">
        <textarea
          bind:value={analysisText}
          class="content-section__textarea"
          placeholder="Entrez votre analyse du livre..."
          style="min-height: 180px"
        ></textarea>
        <div class="content-section__actions">
          <Button size="small" onclick={cancelAnalysis}>Annuler</Button>
          <Button size="small" primary onclick={toggleAnalysis}>Sauvegarder</Button>
        </div>
      </div>
    {:else if book.analysis}
      <p class="content-section__text">{book.analysis}</p>
    {:else}
      <p class="content-section__empty">Aucune analyse pour ce livre.</p>
    {/if}
  </section>
{/if}

<style>
  .error {
    text-align: center;
    padding: 48px 24px;
  }

  .error h2 {
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 24px;
  }

  .book-header {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 48px;
    margin-bottom: 48px;
  }

  .book-cover {
    position: relative;
  }

  .book-cover__image {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border: 2px solid #e7e5e4;
    filter: grayscale(100%);
    transition: filter 0.3s;
  }

  .book-cover:hover .book-cover__image {
    filter: grayscale(0%);
  }

  .book-status {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px 12px;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 2px solid;
  }

  .book-status--read {
    background-color: #f0fdf4;
    color: #15803d;
    border-color: #bbf7d0;
  }

  .book-status--to-read {
    background-color: #f8fafc;
    color: #475569;
    border-color: #e2e8f0;
  }

  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .book-title {
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 16px;
    color: #1c1917;
  }

  .book-author {
    font-size: 24px;
    color: #78716c;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 24px;
  }

  .book-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-bottom: 32px;
  }

  .book-meta__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .book-meta__label {
    font-size: 10px;
    color: #a8a29e;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
  }

  .book-meta__value {
    font-size: 14px;
    color: #1c1917;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .book-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
  }

  .book-rating__stars {
    display: flex;
    gap: 4px;
  }

  .book-rating__star {
    font-size: 20px;
    color: #d1d5db;
  }

  .book-rating__star--filled {
    color: #eab308;
  }

  .book-rating__text {
    font-size: 12px;
    color: #78716c;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .book-actions {
      display: flex;
      gap: 16px;
  }

  .content-section {
    background-color: white;
    border: 2px solid #e7e5e4;
    padding: 32px;
    margin-bottom: 32px;
  }

  .content-section__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #e7e5e4;
    padding-bottom: 8px;
    margin-bottom: 32px;
  }

  .content-section__title {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #1c1917;
  }

  .content-section__edit-btn {
    background: none;
    border: none;
    color: #78716c;
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    transition: color 0.2s;
  }

  .content-section__edit-btn:hover {
    color: #1c1917;
  }

  .content-section__text {
    font-size: 14px;
    line-height: 1.8;
    color: #1c1917;
  }

  .content-section__empty {
    font-size: 14px;
    color: #a8a29e;
    text-align: center;
    font-style: italic;
  }

  .content-section__edit {
    display: flex;
    flex-direction: column;
  }

  .content-section__textarea {
    width: 100%;
    min-height: 120px;
    padding: 16px;
    border: 2px solid #e7e5e4;
    background-color: #f5f5f4;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.8;
    color: #1c1917;
    resize: vertical;
  }

  .content-section__textarea:focus {
    outline: none;
    border-color: #1c1917;
  }

  .content-section__actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    justify-content: flex-end;
  }

  /* Notes spécifiques */
  .content-section__note {
    padding: 16px;
    background-color: #fffbeb;
    border-left: 4px solid #eab308;
    margin-bottom: 16px;
    position: relative;
  }

  .content-section__note--new {
    background-color: #f0fdf4;
    border-left-color: #15803d;
  }

  .content-section__note:last-child {
    margin-bottom: 0;
  }

  .content-section__note-edit-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: #b45309;
    cursor: pointer;
    font-size: 14px;
    padding: 4px;
    transition: color 0.2s;
  }

  .content-section__note-edit-btn:hover {
    color: #92400e;
  }

  .content-section__note .content-section__textarea {
    background-color: #fffbeb;
    border-color: #fed7aa;
  }

  .content-section__note .content-section__textarea:focus {
    border-color: #eab308;
  }

  .content-section__note-page {
    font-size: 10px;
    color: #b45309;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .book-header {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
    }

    .book-cover__image {
      height: 400px;
      max-width: 280px;
      margin: 0 auto;
    }

    .book-title {
      font-size: 32px;
      letter-spacing: 2px;
    }

    .book-author {
      font-size: 18px;
    }

    .book-meta {
      justify-content: center;
    }
  }
</style>