import { writable } from 'svelte/store';

/**
 * Type définissant une action (bouton) affichée dans le header
 * @property {string} label - Le texte affiché sur le bouton
 * @property {string} icon - La classe Font Awesome de l'icône (ex: "fa-plus", "fa-edit")
 * @property {boolean} [primary] - Optionnel. Si true, le bouton aura le style primary (fond noir)
 * @property {function} action - La fonction à exécuter lors du clic sur le bouton
 */
export type HeaderAction = {
  label: string;
  icon: string;
  primary?: boolean;
  action: () => void;
};

/**
 * Store Svelte contenant la liste des actions (boutons) à afficher dans le header
 * 
 * Ce store permet à chaque page de définir ses propres boutons dans le header
 * sans avoir à passer de props à travers les composants.
 * 
 * @example
 * // Dans une page, définir les boutons du header :
 * headerActions.set([
 *   {
 *     label: 'Nouveau livre',
 *     icon: 'fa-plus',
 *     primary: true,
 *     action: () => console.log('Ajouter')
 *   }
 * ]);
 * 
 * @example
 * // Dans le Header.svelte, lire les actions :
 * {#each $headerActions as action}
 *   <Button {...action} />
 * {/each}
 */
export const headerActions = writable<HeaderAction[]>([]);