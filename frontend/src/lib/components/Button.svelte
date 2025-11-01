<script lang="ts">
  let {
    primary = false,
    danger = false,
    onclick = undefined,
    type = 'button',
    disabled = false,
    icon = '',
    size = 'medium',
    children
  }: {
    primary?: boolean;
    danger?: boolean;
    onclick?: (() => void) | undefined;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    icon?: string;
    size?: 'small' | 'medium' | 'large';
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
  class:btn--danger={danger}
  class:btn--small={size === 'small'}
  class:btn--large={size === 'large'}
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
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn--small {
    padding: 8px 14px;
    font-size: 10px;
    letter-spacing: 1px;
    gap: 4px;
    border-width: 1px;
  }

  .btn--small i {
    font-size: 12px;
  }

  .btn--large {
    padding: 18px 30px;
    font-size: 14px;
    letter-spacing: 2.5px;
    gap: 10px;
  }

  .btn--large i {
    font-size: 18px;
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

  .btn--danger {
    background-color: #dc2626;
    color: white;
    border-color: #dc2626;
  }

  .btn--danger:hover:not(:disabled) {
    background-color: #b91c1c;
    border-color: #b91c1c;
  }

  @media (max-width: 768px) {
    .btn {
      padding: 12px;
      width: 48px;
      height: 48px;
      justify-content: center;
    }

    .btn--small {
      padding: 8px;
      width: 36px;
      height: 36px;
    }

    .btn__text {
      display: none;
    }

    .btn i {
      font-size: 20px;
    }

    .btn--small i {
      font-size: 16px;
    }
  }
</style>