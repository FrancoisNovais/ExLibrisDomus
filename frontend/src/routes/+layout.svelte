<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/Header.svelte';
  import '../lib//assets/css/app.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main class="main">
	{@render children?.()}
</main>

<style>
	.main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 32px 24px;
	}
</style>