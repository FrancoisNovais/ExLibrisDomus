<script lang="ts">
  export let primary: boolean = false;
  export let onclick: (() => void) | undefined = undefined;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled: boolean = false;
  export let icon: string = ''; // Classe Font Awesome (ex: "fa-plus")

  function handleClick() {
    if (!disabled) {
      onclick?.();
    }
  }
</script>

<button
  class="btn"
  class:btn--primary={primary}
  {type}
  {disabled}
  on:click={handleClick}
>
  {#if icon}
    <i class="fas {icon}"></i>
  {/if}
  <span class="btn__text">
    <slot />
  </span>
</button>

<style>
  .btn {
    padding: 12px 24px;
    border: 2px solid #1c1917;
    background-color: white;
    color: #1c1917;
    font-family: inherit;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn:hover:not(:disabled) {
    background-color: #f5f5f4;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn--primary {
    background-color: #1c1917;
    color: white;
  }

  .btn--primary:hover:not(:disabled) {
    background-color: #292524;
  }

  @media (max-width: 768px) {
    .btn {
      padding: 12px;
      width: 48px;
      height: 48px;
      justify-content: center;
    }

    .btn__text {
      display: none;
    }

    .btn i {
      font-size: 20px;
    }
  }
</style>