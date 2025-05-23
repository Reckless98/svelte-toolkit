<!-- Base Button Component with multiple variants -->
<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  
  // Props
  export let variant = 'primary'; // primary, secondary, accent, ghost, 3d, gradient, glass
  export let size = 'md'; // sm, md, lg, xl
  export let type = 'button';
  export let disabled = false;
  export let loading = false;
  export let icon = '';
  export let iconPosition = 'left'; // left, right
  export let animation = 'none'; // none, pulse, bounce, ripple
  export let fullWidth = false;
  export let href = '';
  export let target = '_self';
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Internal state
  let rippleElements = [];
  let isAnimating = false;
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant specific classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary/30',
    '3d': 'bg-primary text-white shadow-lg transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md',
    gradient: 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90',
    glass: 'backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30'
  };
  
  // Animation functions
  function handleRipple(event) {
    if (animation !== 'ripple' || disabled || loading) return;
    
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = { x, y, id: Date.now() };
    rippleElements = [...rippleElements, ripple];
    
    // Remove ripple after animation completes
    setTimeout(() => {
      rippleElements = rippleElements.filter(r => r.id !== ripple.id);
    }, 1000);
  }
  
  function handleClick(event) {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    
    if (animation === 'bounce' || animation === 'pulse') {
      isAnimating = true;
      setTimeout(() => isAnimating = false, 300);
    }
    
    dispatch('click', event);
  }
  
  // Computed classes
  $: classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    animation === 'pulse' ? 'hover:animate-pulse' : '',
    animation === 'bounce' && isAnimating ? 'animate-bounce' : ''
  ].join(' ');
  
  // Determine if we should render an <a> or <button>
  $: isLink = !!href && !disabled && !loading;
</script>

{#if isLink}
  <a
    {href}
    {target}
    class={classes}
    on:click={handleClick}
    on:mousedown={handleRipple}
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading...</span>
    {:else}
      {#if icon && iconPosition === 'left'}
        <span class="mr-2">{@html icon}</span>
      {/if}
      <slot />
      {#if icon && iconPosition === 'right'}
        <span class="ml-2">{@html icon}</span>
      {/if}
    {/if}
    
    {#if animation === 'ripple'}
      {#each rippleElements as ripple (ripple.id)}
        <span
          in:scale={{ duration: 700, start: 0 }}
          style="position: absolute; left: {ripple.x}px; top: {ripple.y}px; transform: translate(-50%, -50%); width: 200%; height: 200%; background-color: rgba(255, 255, 255, 0.3); border-radius: 50%;"
        ></span>
      {/each}
    {/if}
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    on:click={handleClick}
    on:mousedown={handleRipple}
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading...</span>
    {:else}
      {#if icon && iconPosition === 'left'}
        <span class="mr-2">{@html icon}</span>
      {/if}
      <slot />
      {#if icon && iconPosition === 'right'}
        <span class="ml-2">{@html icon}</span>
      {/if}
    {/if}
    
    {#if animation === 'ripple'}
      {#each rippleElements as ripple (ripple.id)}
        <span
          in:scale={{ duration: 700, start: 0 }}
          style="position: absolute; left: {ripple.x}px; top: {ripple.y}px; transform: translate(-50%, -50%); width: 200%; height: 200%; background-color: rgba(255, 255, 255, 0.3); border-radius: 50%;"
        ></span>
      {/each}
    {/if}
  </button>
{/if}

<style>
  /* Needed for ripple effect positioning */
  a, button {
    position: relative;
    overflow: hidden;
  }
</style>
