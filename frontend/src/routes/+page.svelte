<script lang="ts">
  import { headerActions } from '$lib/stores/headerActions';
  import { onMount, onDestroy } from 'svelte';
  
  // Charger toutes les ressources en parallèle
  onMount(async () => {
    // Définir les actions du header pour cette page
    headerActions.set([
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
    ]);
  });

  // Nettoyer les actions en quittant la page
  onDestroy(() => {
    headerActions.set([]);
  });
</script>