<script lang="ts">
  import axios from 'axios';
  import type { Author, Genre, Shelf } from '$lib/types';
  import { fetchBooks } from '$lib/stores/books.svelte';
  import { authors, fetchAuthors } from '$lib/stores/authors.svelte';
  import { genres, fetchGenres } from '$lib/stores/genres.svelte';
  import { shelves, fetchShelves } from '$lib/stores/shelves.svelte';
  import Button from '$lib/components/Button.svelte';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  // Étapes du modal
  let step = $state<'search' | 'form'>('search');
  
  // Recherche ISBN
  let isbn = $state('');
  let lookupLoading = $state(false);
  let lookupError = $state('');

  // Formulaire
  let submitting = $state(false);
  let formError = $state('');

  // Modes de saisie
  let authorMode = $state<'existing' | 'new'>('existing');
  let genreMode = $state<'existing' | 'new'>('existing');

  // Données du formulaire
  let formData = $state({
    title: '',
    year: new Date().getFullYear(),
    pages: 0,
    language: 'French',
    cover: '',
    synopsis: '',
    rating: 0,
    read: false,
    favorite: false,
    
    // Auteur existant
    id_author: null as number | null,
    // Nouvel auteur
    newAuthorFirstName: '',
    newAuthorLastName: '',
    newAuthorBirthDate: '',
    
    // Genre existant
    id_genre: null as number | null,
    // Nouveau genre
    newGenre: '',
    
    // Étagère (optionnelle)
    id_shelf: null as number | null
  });

  // Charger les données pour les dropdowns
  async function loadDropdownData() {
    try {
      await Promise.all([fetchAuthors(), fetchGenres(), fetchShelves()]);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  }

  // Recherche par ISBN
  async function handleISBNLookup() {
    if (!isbn.trim()) return;
    
    lookupLoading = true;
    lookupError = '';
    
    try {
      const res = await axios.get(`http://localhost:4000/api/books/lookup/${isbn}`);
      const data = res.data;
      
      // Pré-remplir le formulaire
      formData.title = data.titre || '';
      formData.year = parseInt(data.année) || new Date().getFullYear();
      formData.pages = data.pages || 0;
      formData.language = data.langue || 'French';
      formData.cover = data.couverture || '';
      formData.synopsis = data.synopsis || '';
      
      // Essayer de matcher l'auteur existant
      if (data.authors?.[0]) {
        const matchedAuthor = authors.current.find((a: Author) => 
          a.last_name.toLowerCase() === data.authors[0].nom.toLowerCase()
        );
        
        if (matchedAuthor) {
          formData.id_author = matchedAuthor.id;
          authorMode = 'existing';
        } else {
          formData.newAuthorFirstName = data.authors[0].prenom || '';
          formData.newAuthorLastName = data.authors[0].nom || '';
          authorMode = 'new';
        }
      }
      
      // Essayer de matcher le genre existant
      if (data.genres?.[0]) {
        const matchedGenre = genres.current.find((g: Genre) => 
          g.category.toLowerCase() === data.genres[0].toLowerCase()
        );
        
        if (matchedGenre) {
          formData.id_genre = matchedGenre.id;
          genreMode = 'existing';
        } else {
          formData.newGenre = data.genres[0];
          genreMode = 'new';
        }
      }
      
      step = 'form';
    } catch (error: any) {
      lookupError = error.response?.data?.error || 'Livre non trouvé';
    } finally {
      lookupLoading = false;
    }
  }

  // Passer directement au formulaire (sans ISBN)
  function skipToForm() {
    step = 'form';
  }

  // Soumettre le formulaire
  async function handleSubmit() {
    formError = '';
    submitting = true;

    try {
      // Construire le payload
      const payload: any = {
        title: formData.title,
        year: formData.year,
        pages: formData.pages,
        language: formData.language,
        cover: formData.cover || null,
        synopsis: formData.synopsis || null,
        rating: formData.rating || null,
        read: formData.read,
        favorite: formData.favorite,
        id_shelf: formData.id_shelf || null
      };

      // Gérer l'auteur
      if (authorMode === 'existing') {
        payload.id_author = formData.id_author;
      } else {
        payload.author = {
          first_name: formData.newAuthorFirstName || null,
          last_name: formData.newAuthorLastName,
          birth_date: formData.newAuthorBirthDate || null
        };
      }

      // Gérer le genre
      if (genreMode === 'existing') {
        payload.id_genre = formData.id_genre;
      } else {
        payload.genre = formData.newGenre;
      }

      // Envoyer à l'API
      await axios.post('http://localhost:4000/api/books/advanced', payload);
      
      // Rafraîchir la liste des livres
      await fetchBooks();
      
      // Fermer le modal
      handleClose();
    } catch (error: any) {
      console.error('Erreur création livre:', error);
      formError = error.response?.data?.error || 'Erreur lors de la création du livre';
    } finally {
      submitting = false;
    }
  }

  // Fermer et réinitialiser le modal
  function handleClose() {
    // Réinitialiser tout
    step = 'search';
    isbn = '';
    lookupError = '';
    formError = '';
    authorMode = 'existing';
    genreMode = 'existing';
    
    formData = {
      title: '',
      year: new Date().getFullYear(),
      pages: 0,
      language: 'French',
      cover: '',
      synopsis: '',
      rating: 0,
      read: false,
      favorite: false,
      id_author: null,
      newAuthorFirstName: '',
      newAuthorLastName: '',
      newAuthorBirthDate: '',
      id_genre: null,
      newGenre: '',
      id_shelf: null
    };
    
    onClose();
  }

  // Charger les données quand le modal s'ouvre
  $effect(() => {
    if (isOpen && authors.current.length === 0) {
      loadDropdownData();
    }
  });

  // Prévisualisation de la couverture
  let showCoverPreview = $state(false);
  let coverPreviewUrl = $state('');

  function handleCoverMouseEnter() {
    if (formData.cover && formData.cover.trim()) {
      coverPreviewUrl = formData.cover;
      showCoverPreview = true;
    }
  }

  function handleCoverMouseLeave() {
    showCoverPreview = false;
  }

  // Gérer la touche Escape
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      handleClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" onclick={handleClose}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal__header">
        <h2 class="modal__title">
          {step === 'search' ? 'Ajouter un livre' : 'Nouveau livre'}
        </h2>
        <button class="modal__close" onclick={handleClose} aria-label="Fermer">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal__body">
        {#if step === 'search'}
          <!-- ÉTAPE 1 : Recherche ISBN -->
          <div class="search-section">
            <p class="search-section__description">
              Recherchez un livre par ISBN pour pré-remplir automatiquement les informations.
            </p>

            <div class="search-section__input-group">
              <input
                type="text"
                bind:value={isbn}
                placeholder="Entrez l'ISBN (ex: 9780261103573)"
                class="search-section__input"
                onkeydown={(e) => e.key === 'Enter' && handleISBNLookup()}
              />
              <Button
                primary
                icon="fa-search"
                onclick={handleISBNLookup}
                disabled={lookupLoading || !isbn.trim()}
              >
                {lookupLoading ? 'Recherche...' : 'Rechercher'}
              </Button>
            </div>

            {#if lookupError}
              <p class="error-message">{lookupError}</p>
            {/if}

            <div class="search-section__divider">
              <span>OU</span>
            </div>

            <Button onclick={skipToForm} icon="fa-edit">
              Saisir manuellement
            </Button>
          </div>
        {:else}
          <!-- ÉTAPE 2 : Formulaire -->
          <form class="form" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <!-- Informations principales -->
            <div class="form__section">
              <h3 class="form__section-title">Informations principales</h3>

              <div class="form__group">
                <label for="title" class="form__label">Titre *</label>
                <input
                  id="title"
                  type="text"
                  bind:value={formData.title}
                  class="form__input"
                  required
                />
              </div>

              <div class="form__row">
                <div class="form__group">
                  <label for="year" class="form__label">Année</label>
                  <input
                    id="year"
                    type="number"
                    bind:value={formData.year}
                    class="form__input"
                    min="0"
                  />
                </div>

                <div class="form__group">
                  <label for="pages" class="form__label">Pages</label>
                  <input
                    id="pages"
                    type="number"
                    bind:value={formData.pages}
                    class="form__input"
                    min="0"
                  />
                </div>

                <div class="form__group">
                  <label for="language" class="form__label">Langue</label>
                  <input
                    id="language"
                    type="text"
                    bind:value={formData.language}
                    class="form__input"
                  />
                </div>
              </div>

              <div class="form__group">
                <label for="cover" class="form__label">URL Couverture</label>
                <div class="cover-input-wrapper">
                  <input
                    id="cover"
                    type="url"
                    bind:value={formData.cover}
                    class="form__input"
                    placeholder="https://..."
                    onmouseenter={handleCoverMouseEnter}
                    onmouseleave={handleCoverMouseLeave}
                  />
                  {#if showCoverPreview}
                    <div class="cover-preview">
                      <img src={coverPreviewUrl} alt="Aperçu de la couverture" />
                    </div>
                  {/if}
                </div>
              </div>

              <div class="form__group">
                <label for="synopsis" class="form__label">Synopsis</label>
                <textarea
                  id="synopsis"
                  bind:value={formData.synopsis}
                  class="form__textarea"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <!-- Auteur -->
            <div class="form__section">
              <h3 class="form__section-title">Auteur *</h3>

              <div class="form__toggle">
                <button
                  type="button"
                  class="form__toggle-btn"
                  class:active={authorMode === 'existing'}
                  onclick={() => authorMode = 'existing'}
                >
                  Choisir un auteur existant
                </button>
                <button
                  type="button"
                  class="form__toggle-btn"
                  class:active={authorMode === 'new'}
                  onclick={() => authorMode = 'new'}
                >
                  Créer un nouvel auteur
                </button>
              </div>

              {#if authorMode === 'existing'}
                <div class="form__group">
                  <label for="author" class="form__label">Auteur</label>
                  <select
                    id="author"
                    bind:value={formData.id_author}
                    class="form__select"
                    required
                  >
                    <option value={null}>Sélectionnez un auteur</option>
                    {#each authors.current as author (author.id)}
                      <option value={author.id}>
                        {author.first_name || ''} {author.last_name}
                      </option>
                    {/each}
                  </select>
                </div>
              {:else}
                <div class="form__row">
                  <div class="form__group">
                    <label for="author-firstname" class="form__label">Prénom</label>
                    <input
                      id="author-firstname"
                      type="text"
                      bind:value={formData.newAuthorFirstName}
                      class="form__input"
                    />
                  </div>
                  <div class="form__group">
                    <label for="author-lastname" class="form__label">Nom *</label>
                    <input
                      id="author-lastname"
                      type="text"
                      bind:value={formData.newAuthorLastName}
                      class="form__input"
                      required
                    />
                  </div>
                </div>
                <div class="form__group">
                  <label for="author-birthdate" class="form__label">Date de naissance</label>
                  <input
                    id="author-birthdate"
                    type="date"
                    bind:value={formData.newAuthorBirthDate}
                    class="form__input"
                  />
                </div>
              {/if}
            </div>

            <!-- Genre -->
            <div class="form__section">
              <h3 class="form__section-title">Genre *</h3>

              <div class="form__toggle">
                <button
                  type="button"
                  class="form__toggle-btn"
                  class:active={genreMode === 'existing'}
                  onclick={() => genreMode = 'existing'}
                >
                  Choisir un genre existant
                </button>
                <button
                  type="button"
                  class="form__toggle-btn"
                  class:active={genreMode === 'new'}
                  onclick={() => genreMode = 'new'}
                >
                  Créer un nouveau genre
                </button>
              </div>

              {#if genreMode === 'existing'}
                <div class="form__group">
                  <label for="genre" class="form__label">Genre</label>
                  <select
                    id="genre"
                    bind:value={formData.id_genre}
                    class="form__select"
                    required
                  >
                    <option value={null}>Sélectionnez un genre</option>
                    {#each genres.current as genre (genre.id)}
                      <option value={genre.id}>{genre.category}</option>
                    {/each}
                  </select>
                </div>
              {:else}
                <div class="form__group">
                  <label for="new-genre" class="form__label">Nouveau genre</label>
                  <input
                    id="new-genre"
                    type="text"
                    bind:value={formData.newGenre}
                    class="form__input"
                    placeholder="ex: Fantasy, Science-Fiction..."
                    required
                  />
                </div>
              {/if}
            </div>

            <!-- Étagère -->
            <div class="form__section">
              <h3 class="form__section-title">Étagère (optionnel)</h3>

              <div class="form__group">
                <label for="shelf" class="form__label">Étagère</label>
                <select
                  id="shelf"
                  bind:value={formData.id_shelf}
                  class="form__select"
                >
                  <option value={null}>Aucune étagère</option>
                  {#each shelves.current as shelf (shelf.id)}
                    <option value={shelf.id}>{shelf.label}</option>
                  {/each}
                </select>
              </div>
            </div>

            <!-- Options -->
            <div class="form__section">
              <h3 class="form__section-title">Options</h3>

              <div class="form__group">
                <label for="rating" class="form__label">Note (1-5)</label>
                <input
                  id="rating"
                  type="number"
                  bind:value={formData.rating}
                  class="form__input"
                  min="0"
                  max="5"
                />
              </div>

              <div class="form__checkboxes">
                <label class="form__checkbox">
                  <input
                    type="checkbox"
                    bind:checked={formData.read}
                  />
                  <span>Déjà lu</span>
                </label>

                <label class="form__checkbox">
                  <input
                    type="checkbox"
                    bind:checked={formData.favorite}
                  />
                  <span>Favori</span>
                </label>
              </div>
            </div>

            {#if formError}
              <p class="error-message">{formError}</p>
            {/if}

            <div class="form__actions">
              <Button type="button" onclick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" primary disabled={submitting}>
                {submitting ? 'Création...' : 'Créer le livre'}
              </Button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 24px;
  }

  .modal {
    background-color: white;
    border: 2px solid #1c1917;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 2px solid #e7e5e4;
  }

  .modal__title {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #1c1917;
  }

  .modal__close {
    background: none;
    border: none;
    font-size: 20px;
    color: #78716c;
    cursor: pointer;
    padding: 8px;
    transition: color 0.2s;
  }

  .modal__close:hover {
    color: #1c1917;
  }

  .modal__body {
    padding: 24px;
    overflow-y: auto;
  }

  /* Étape recherche */
  .search-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    text-align: center;
  }

  .search-section__description {
    font-size: 14px;
    color: #78716c;
    line-height: 1.6;
  }

  .search-section__input-group {
    display: flex;
    gap: 12px;
    width: 100%;
    max-width: 500px;
  }

  .search-section__input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e7e5e4;
    font-family: inherit;
    font-size: 14px;
    color: #1c1917;
    background-color: white;
  }

  .search-section__input:focus {
    outline: none;
    border-color: #1c1917;
  }

  .search-section__divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    color: #a8a29e;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .search-section__divider::before,
  .search-section__divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #e7e5e4;
  }

  /* Formulaire */
  .form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .form__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form__section-title {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #1c1917;
    padding-bottom: 8px;
    border-bottom: 2px solid #e7e5e4;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cover-input-wrapper {
    position: relative;
  }

  .cover-input-wrapper .form__input {
    width: 100%;
  }

  .cover-preview {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background-color: white;
    border: 2px solid #1c1917;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }

  .cover-preview::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #1c1917;
  }

  .cover-preview img {
    display: block;
    width: 160px;
    height: auto;
    max-height: 240px;
    object-fit: contain;
    filter: grayscale(100%);
  }

  .form__row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  .form__label {
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #78716c;
  }

  .form__input,
  .form__select,
  .form__textarea {
    padding: 12px 16px;
    border: 2px solid #e7e5e4;
    font-family: inherit;
    font-size: 14px;
    color: #1c1917;
    background-color: white;
  }

  .form__input:focus,
  .form__select:focus,
  .form__textarea:focus {
    outline: none;
    border-color: #1c1917;
  }

  .form__textarea {
    resize: vertical;
    line-height: 1.6;
  }

  .form__toggle {
    display: flex;
    gap: 8px;
  }

  .form__toggle-btn {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e7e5e4;
    background-color: white;
    font-family: inherit;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #78716c;
    cursor: pointer;
    transition: all 0.2s;
  }

  .form__toggle-btn:hover {
    border-color: #1c1917;
    color: #1c1917;
  }

  .form__toggle-btn.active {
    background-color: #1c1917;
    border-color: #1c1917;
    color: white;
  }

  .form__checkboxes {
    display: flex;
    gap: 24px;
  }

  .form__checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #1c1917;
    cursor: pointer;
  }

  .form__checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .form__actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 16px;
    border-top: 2px solid #e7e5e4;
  }

  .error-message {
    padding: 12px 16px;
    background-color: #fef2f2;
    border: 2px solid #fecaca;
    color: #dc2626;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .modal {
      max-height: 100vh;
      height: 100vh;
    }

    .modal__body {
      padding: 16px;
    }

    .form__row {
      grid-template-columns: 1fr;
    }

    .form__checkboxes {
      flex-direction: column;
      gap: 12px;
    }

    .cover-preview img {
      width: 120px;
      max-height: 180px;
    }
  }
</style>