<!-- Reusable Header Component with multiple variants -->
<script>
  import { onMount } from 'svelte';
  import { fade, slide, fly } from 'svelte/transition';
    // Props
  export let variant = 'standard'; // standard, minimal, withSearch, animated, glass, gradient, floating
  export let logo = '';
  export let title = 'Brand';
  export let links = [
    { text: 'Home', href: '#' },
    { text: 'About', href: '#about' },
    { text: 'Services', href: '#services' },
    { text: 'Contact', href: '#contact' }
  ];
  export let sticky = false;
  export let transparent = false;
  export let dark = false;
  export let animated = false;
  export let withSearch = false;
  export let showBranding = true; // Show "Made by Reckless98" 
  export let gradientDirection = 'to-r'; // Tailwind gradient directions
  export let borderRadius = 'none'; // none, md, lg, xl, full
  /** @type {{ text: string; href: string; variant?: string } | null} */
  export let ctaButton = null;
  
  // Internal state
  let isOpen = false;
  let isScrolled = false;
  let searchQuery = '';
  
  // Handle scroll for sticky header
  onMount(() => {
    if (sticky) {
      const handleScroll = () => {
        isScrolled = window.scrollY > 20;
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  });
  
  // Handle search submit
  function handleSearchSubmit() {
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      // Dispatch event or handle search
    }
  }
  
  // Toggle mobile menu
  function toggleMenu() {
    isOpen = !isOpen;
  }
    // Computed classes based on props and state
  $: headerClasses = [
    'w-full z-50 transition-all duration-300',
    sticky ? 'fixed top-0 left-0' : 'relative',
    isScrolled ? 'shadow-lg' : '',
    
    // Border radius for floating variant
    borderRadius !== 'none' && variant === 'floating' ? `rounded-${borderRadius}` : '',
    variant === 'floating' ? 'mx-4 mt-4' : '',
    
    // Background variants
    transparent && !isScrolled ? 'bg-transparent' : 
    variant === 'glass' ? 'backdrop-blur-md bg-white/20 border-b border-white/30' : 
    variant === 'gradient' ? `bg-gradient-${gradientDirection} from-blue-600 to-purple-600 text-white` :
    variant === 'floating' ? 'bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/20' :
    dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800',
    
    transparent && isScrolled ? 'bg-white/95 backdrop-blur-sm' : '',
    animated ? 'transform-gpu' : ''
  ].filter(Boolean).join(' ');
  
  // Define enhanced link animation classes
  $: linkClasses = animated ? 
    'relative px-3 py-2 rounded-md transition-all duration-300 hover:bg-white/10 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300 after:-translate-x-1/2' : 
    'px-3 py-2 rounded-md transition-colors hover:text-blue-500 hover:bg-gray-50';
</script>

<header class={headerClasses}>
  <div class="container mx-auto px-4 py-3">
    <div class="flex justify-between items-center">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        {#if logo}
          <img src={logo} alt={title} class="h-10 w-auto mr-2" />
        {/if}
        <span class="text-xl font-bold">{title}</span>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        {#if variant !== 'minimal'}
          <ul class="flex space-x-6">
            {#each links as link}
              <li>
                <a href={link.href} class={linkClasses}>{link.text}</a>
              </li>
            {/each}
          </ul>
        {/if}
        
        <!-- Search (if enabled) -->
        {#if withSearch || variant === 'withSearch'}
          <form on:submit|preventDefault={handleSearchSubmit} class="relative">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search..."
              class="px-4 py-2 rounded-full text-sm bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        {/if}
        
        <!-- CTA Button (if provided) -->
        {#if ctaButton}
          <a 
            href={ctaButton.href} 
            class={`px-4 py-2 rounded-lg ${ctaButton.variant === 'primary' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {ctaButton.text}
          </a>
        {/if}
      </nav>
      
      <!-- Mobile menu button -->
      <button class="md:hidden" on:click={toggleMenu} aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Mobile Navigation -->
  {#if isOpen}
    <div transition:slide={{ duration: 300 }} class="md:hidden">
      <nav class="container mx-auto px-4 py-3 bg-white dark:bg-gray-900">
        <ul class="space-y-4">
          {#each links as link}
            <li>
              <a 
                href={link.href} 
                class="block py-2 hover:text-accent" 
                on:click={() => isOpen = false}
              >
                {link.text}
              </a>
            </li>
          {/each}
        </ul>
        
        {#if withSearch || variant === 'withSearch'}
          <form on:submit|preventDefault={handleSearchSubmit} class="mt-4">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search..."
              class="w-full px-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </form>
        {/if}
          {#if ctaButton}
          <div class="mt-4">
            <a 
              href={ctaButton.href} 
              class={`block text-center px-4 py-2 rounded-lg ${ctaButton.variant === 'primary' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {ctaButton.text}
            </a>
          </div>
        {/if}

        {#if showBranding}
          <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <span class="text-xs opacity-60">Made with ❤️ by </span>
            <a 
              href="https://github.com/Reckless98" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors hover:underline"
            >
              Reckless98
            </a>
          </div>
        {/if}
      </nav>
    </div>
  {/if}
</header>
