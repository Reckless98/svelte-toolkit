<!-- Explorer Sidebar Component -->
<script>
  // Props
  export let categories = [
    { id: 'buttons', name: 'Buttons' },
    { id: 'headers', name: 'Headers' },
    { id: 'footers', name: 'Footers' },
    { id: 'cards', name: 'Cards' },
    { id: 'inputs', name: 'Inputs' },
    { id: 'modals', name: 'Modals' },
    { id: 'layouts', name: 'Layouts' },
    { id: 'animations', name: 'Animations' }
  ];
  export let activeCategory = 'buttons';
  
  // Event handler
  function setActiveCategory(id) {
    activeCategory = id;
  }
</script>

<aside class="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-1">Svelte UI Toolkit</h1>
    <p class="text-sm text-gray-400 mb-8">Component Explorer</p>
    
    <nav>
      <ul class="space-y-1">
        {#each categories as category}
          <li>
            <button
              class="w-full text-left px-4 py-2 rounded-lg transition-colors {activeCategory === category.id ? 'bg-accent text-white' : 'hover:bg-gray-800'}"
              on:click={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  
  <div class="absolute bottom-0 left-0 w-full p-4 text-center text-xs text-gray-500">
    <p>Created with ❤️</p>
    <p>© {new Date().getFullYear()}</p>
  </div>
</aside>
