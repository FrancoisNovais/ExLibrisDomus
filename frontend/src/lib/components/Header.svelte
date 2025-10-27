<script lang="ts">
  import Button from './Button.svelte';
  import { headerActions } from '$lib/stores/headerActions';
</script>

<header class="header">
  <div class="header__container">
    <div class="header__brand">
      <div class="header__icon">
        <i class="fas fa-book-open"></i>
      </div>
      <div>
        <h1 class="header__title">ExLibrisDomus</h1>
        <p class="header__subtitle">Vos livres, sans superflu.</p>
      </div>
    </div>
    <div class="header__actions">
      {#each $headerActions as action}
        <Button 
          primary={action.primary} 
          icon={action.icon} 
          onclick={action.action}
        >
          {action.label}
        </Button>
      {/each}
    </div>
  </div>
</header>

<style>
  .header {
    background-color: #ffffff;
    border-bottom: 2px solid #1c1917;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .header__icon {
    width: 64px;
    height: 64px;
    background-color: #1c1917;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
  }

  .header__title {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .header__subtitle {
    font-size: 12px;
    color: #78716c;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-top: 4px;
  }

  .header__actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }
</style>