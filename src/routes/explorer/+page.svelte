<!-- Component Explorer Main Page -->
<script>
  import { onMount } from 'svelte';
  import Sidebar from './Sidebar.svelte';  import ButtonExplorer from './components/ButtonExplorer.svelte';
  import HeaderExplorer from './components/HeaderExplorer.svelte';
  import FooterExplorer from './components/FooterExplorer.svelte';
  import CardExplorer from './components/CardExplorer.svelte';
  import LayoutExplorer from './components/LayoutExplorer.svelte';
  import AnimationExplorer from './components/AnimationExplorer.svelte';
  import InputExplorer from './components/InputExplorer.svelte';
  import ModalExplorer from './components/ModalExplorer.svelte';
  import NavigationExplorer from './components/NavigationExplorer.svelte';
  
  // State
  let activeCategory = 'buttons';
  let darkMode = false;
  
  // Toggle dark mode
  function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }  // Get the active component explorer based on category
  $: ActiveExplorer = {
    'buttons': ButtonExplorer,
    'headers': HeaderExplorer,
    'footers': FooterExplorer,
    'cards': CardExplorer,
    'inputs': InputExplorer,
    'modals': ModalExplorer,
    'navigation': NavigationExplorer,
    'layouts': LayoutExplorer,
    'animations': AnimationExplorer
  }[activeCategory];
</script>

<div class={darkMode ? 'dark' : ''}>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Sidebar bind:activeCategory />
    
    <div class="pl-64">
      <header class="bg-white dark:bg-gray-800 shadow">
        <div class="flex items-center justify-between p-4">
          <h2 class="text-xl font-semibold capitalize">{activeCategory}</h2>
          
          <div class="flex items-center space-x-4">
            <button
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              on:click={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {#if darkMode}
                <!-- Sun icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              {:else}
                <!-- Moon icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              {/if}
            </button>
          </div>
        </div>
      </header>
      
      <main class="p-6">
        <svelte:component this={ActiveExplorer} />
      </main>
    </div>
  </div>
</div>

<style>
  :global(.dark) {
    color-scheme: dark;
  }
</style>
