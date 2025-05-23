<!-- Reusable Footer Component with multiple variants -->
<script>
  // Props
  export let variant = 'standard'; // standard, simple, expanded, centered, minimal
  export let logo = '';
  export let title = 'Brand';
  export let description = 'A brief description of your company or project.';
  export let links = [
    { 
      title: 'Company', 
      items: [
        { text: 'About', href: '#about' },
        { text: 'Careers', href: '#careers' },
        { text: 'Contact', href: '#contact' }
      ]
    },
    { 
      title: 'Resources', 
      items: [
        { text: 'Blog', href: '#blog' },
        { text: 'Documentation', href: '#docs' },
        { text: 'Help Center', href: '#help' }
      ]
    },
    { 
      title: 'Legal', 
      items: [
        { text: 'Privacy', href: '#privacy' },
        { text: 'Terms', href: '#terms' },
        { text: 'Cookie Policy', href: '#cookies' }
      ]
    }
  ];
  export let socialLinks = [
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>', href: 'https://twitter.com/' },
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>', href: 'https://github.com/' },
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>', href: 'https://linkedin.com/' },
  ];
  export let newsletter = true;
  export let copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`;
  export let dark = false;
  export let bgColor = dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';
  
  // Newsletter state
  let email = '';
  let subscribed = false;
  
  // Handle newsletter subscription
  function handleSubscribe() {
    if (email) {
      subscribed = true;
      setTimeout(() => {
        subscribed = false;
        email = '';
      }, 3000);
    }
  }
</script>

<!-- Standard Footer -->
{#if variant === 'standard'}
  <footer class={`${bgColor} py-12`}>
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand section -->
        <div class="md:col-span-1">
          {#if logo}
            <img src={logo} alt={title} class="h-10 w-auto mb-4" />
          {:else}
            <h3 class="text-2xl font-bold mb-4">{title}</h3>
          {/if}
          <p class="mb-4 text-sm opacity-75">{description}</p>
          
          <!-- Social Links -->
          <div class="flex space-x-4 mt-6">
            {#each socialLinks as link}
              <a href={link.href} class="opacity-75 hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer">
                {@html link.icon}
              </a>
            {/each}
          </div>
        </div>
        
        <!-- Links section -->
        <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {#each links as section}
            <div>
              <h4 class="text-lg font-semibold mb-4">{section.title}</h4>
              <ul class="space-y-2">
                {#each section.items as item}
                  <li>
                    <a href={item.href} class="opacity-75 hover:opacity-100 transition-opacity">{item.text}</a>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
        
        <!-- Newsletter section -->
        {#if newsletter}
          <div class="md:col-span-1">
            <h4 class="text-lg font-semibold mb-4">Stay Updated</h4>
            <p class="text-sm opacity-75 mb-4">Subscribe to our newsletter for updates.</p>
            
            <form on:submit|preventDefault={handleSubscribe} class="mt-4">
              <div class="flex flex-col space-y-2">
                <input
                  type="email"
                  bind:value={email}
                  placeholder="Your email address"
                  required
                  class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                />
                <button
                  type="submit"
                  class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        {/if}
      </div>
      
      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm opacity-75">
        <p>{copyright}</p>
      </div>
    </div>
  </footer>

<!-- Simple Footer -->
{:else if variant === 'simple'}
  <footer class={`${bgColor} py-8`}>
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between">
        <div class="mb-4 md:mb-0">
          {#if logo}
            <img src={logo} alt={title} class="h-8 w-auto" />
          {:else}
            <h3 class="text-xl font-bold">{title}</h3>
          {/if}
        </div>
        
        <div class="flex flex-wrap gap-x-8 gap-y-2 mb-4 md:mb-0">
          {#each links[0]?.items || [] as item}
            <a href={item.href} class="opacity-75 hover:opacity-100 transition-opacity">{item.text}</a>
          {/each}
        </div>
        
        <div class="flex space-x-4">
          {#each socialLinks as link}
            <a href={link.href} class="opacity-75 hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer">
              {@html link.icon}
            </a>
          {/each}
        </div>
      </div>
      
      <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm opacity-75">
        <p>{copyright}</p>
      </div>
    </div>
  </footer>

<!-- Expanded Footer -->
{:else if variant === 'expanded'}
  <footer class={`${bgColor} py-16`}>
    <div class="container mx-auto px-4">
      <!-- Top section with brand and newsletter -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-12 pb-12 border-b border-gray-200 dark:border-gray-800">
        <div class="mb-8 md:mb-0">
          {#if logo}
            <img src={logo} alt={title} class="h-12 w-auto mb-4" />
          {:else}
            <h3 class="text-3xl font-bold mb-4">{title}</h3>
          {/if}
          <p class="max-w-md opacity-75">{description}</p>
        </div>
        
        {#if newsletter}
          <div class="w-full md:w-auto">
            <h4 class="text-lg font-semibold mb-4">Stay Updated</h4>
            <form on:submit|preventDefault={handleSubscribe} class="flex">
              <input
                type="email"
                bind:value={email}
                placeholder="Your email address"
                required
                class="px-4 py-2 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 min-w-[240px]"
              />
              <button
                type="submit"
                class="px-4 py-2 bg-accent text-white rounded-r-lg hover:bg-accent/90 transition-colors"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        {/if}
      </div>
      
      <!-- Links grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {#each links as section}
          <div>
            <h4 class="text-lg font-semibold mb-4">{section.title}</h4>
            <ul class="space-y-2">
              {#each section.items as item}
                <li>
                  <a href={item.href} class="opacity-75 hover:opacity-100 transition-opacity">{item.text}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
        
        <!-- Social links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Connect With Us</h4>
          <div class="flex flex-wrap gap-4">
            {#each socialLinks as link}
              <a 
                href={link.href} 
                class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-accent hover:text-white transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {@html link.icon}
              </a>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Copyright and legal -->
      <div class="flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
        <p>{copyright}</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#privacy" class="hover:underline">Privacy Policy</a>
          <a href="#terms" class="hover:underline">Terms of Service</a>
          <a href="#cookies" class="hover:underline">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

<!-- Centered Footer -->
{:else if variant === 'centered'}
  <footer class={`${bgColor} py-12 text-center`}>
    <div class="container mx-auto px-4">
      <div class="mb-8">
        {#if logo}
          <img src={logo} alt={title} class="h-12 w-auto mx-auto mb-4" />
        {:else}
          <h3 class="text-2xl font-bold mb-4">{title}</h3>
        {/if}
        <p class="max-w-md mx-auto opacity-75 mb-8">{description}</p>
        
        <!-- Links -->
        <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
          {#each links.flatMap(section => section.items) as item}
            <a href={item.href} class="opacity-75 hover:opacity-100 transition-opacity">{item.text}</a>
          {/each}
        </div>
        
        <!-- Social Links -->
        <div class="flex justify-center space-x-6 mb-8">
          {#each socialLinks as link}
            <a 
              href={link.href} 
              class="opacity-75 hover:opacity-100 transition-opacity" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {@html link.icon}
            </a>
          {/each}
        </div>
        
        <!-- Newsletter -->
        {#if newsletter}
          <div class="max-w-md mx-auto mb-8">
            <h4 class="text-lg font-semibold mb-4">Stay Updated</h4>
            <form on:submit|preventDefault={handleSubscribe} class="flex flex-col sm:flex-row sm:justify-center">
              <input
                type="email"
                bind:value={email}
                placeholder="Your email address"
                required
                class="px-4 py-2 sm:rounded-l-lg rounded-lg sm:rounded-r-none mb-2 sm:mb-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
              />
              <button
                type="submit"
                class="px-4 py-2 bg-accent text-white sm:rounded-r-lg rounded-lg sm:rounded-l-none hover:bg-accent/90 transition-colors"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        {/if}
      </div>
      
      <!-- Copyright -->
      <div class="text-sm opacity-75">
        <p>{copyright}</p>
      </div>
    </div>
  </footer>

<!-- Minimal Footer -->
{:else if variant === 'minimal'}
  <footer class={`${bgColor} py-6`}>
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="mb-4 sm:mb-0">
          <span class="text-sm opacity-75">{copyright}</span>
        </div>
        
        <div class="flex space-x-6">
          {#each socialLinks as link}
            <a 
              href={link.href} 
              class="opacity-75 hover:opacity-100 transition-opacity" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {@html link.icon}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </footer>
{/if}
