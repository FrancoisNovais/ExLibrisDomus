<script lang="ts">
  let {
    primary = false,
    onclick = undefined,
    type = 'button',
    disabled = false,
    icon = '',
    children
  }: {
    primary?: boolean;
    onclick?: (() => void) | undefined;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    icon?: string;
    children?: any;
  } = $props();

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
  onclick={handleClick}
>
  {#if icon}
    <i class="fas {icon}"></i>
  {/if}
  <span class="btn__text">
    {@render children?.()}
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