<!-- Component Preview Container -->
<script>
  import { onMount } from 'svelte';
  import Prism from 'prismjs';
  
  // Props
  export let title = '';
  export let description = '';
  export let codeSnippet = '';
  export let controls = false; // Show prop controls
  
  // Internal state
  let showCode = false;
  
  // Initialize syntax highlighting
  onMount(() => {
    if (showCode) {
      Prism.highlightAll();
    }
  });
  
  // Toggle code visibility
  function toggleCode() {
    showCode = !showCode;
    
    // Apply syntax highlighting after showing code
    if (showCode) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }
  
  // Copy code to clipboard
  function copyCode() {
    navigator.clipboard.writeText(codeSnippet);
    alert('Code copied to clipboard!');
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
  <!-- Header -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">{title}</h3>
      
      <div class="flex space-x-2">
        <button
          class="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          on:click={toggleCode}
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
        
        {#if showCode}
          <button
            class="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            on:click={copyCode}
          >
            Copy
          </button>
        {/if}
      </div>
    </div>
    
    {#if description}
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    {/if}
  </div>
  
  <!-- Preview Area -->
  <div class="p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <slot />
  </div>
  
  <!-- Controls Area (optional) -->
  {#if controls}
    <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <h4 class="text-sm font-medium mb-3">Component Properties</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <slot name="controls" />
      </div>
    </div>
  {/if}
  
  <!-- Code Snippet -->
  {#if showCode}
    <div class="p-4 border-t border-gray-200 dark:border-gray-700 overflow-x-auto">
      <pre class="language-svelte"><code class="language-svelte">{codeSnippet}</code></pre>
    </div>
  {/if}
</div>
