<!-- Base Button Component with multiple variants -->
<script lang="ts">  import { createEventDispatcher } from 'svelte';
  import { fly, scale } from 'svelte/transition';

  // TypeScript interfaces
  interface RippleElement {
    id: number;
    x: number;
    y: number;
  }

  type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | '3d' | 'gradient' | 'glass' | 'neon' | 'morphic' | 'animated';
  type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type ButtonType = 'button' | 'submit' | 'reset';
  type ButtonAnimation = 'none' | 'pulse' | 'bounce' | 'ripple' | 'glow' | 'shake' | 'float';
  type ButtonRounded = 'sm' | 'md' | 'lg' | 'xl' | 'full';
  type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    // Props
  export let variant = 'primary'; // primary, secondary, accent, ghost, 3d, gradient, glass, neon, morphic, animated
  export let size = 'md'; // xs, sm, md, lg, xl
  export let type = 'button';
  export let disabled = false;
  export let loading = false;
  export let icon = '';
  export let iconPosition = 'left'; // left, right
  export let animation = 'none'; // none, pulse, bounce, ripple, glow, shake, float
  export let fullWidth = false;  export let href = '';
  export let target = '_self';
  export let rel = ''; // Add rel attribute support
  export let rounded = 'lg'; // sm, md, lg, xl, full
  export let shadow = 'md'; // none, sm, md, lg, xl, 2xl
  export let gradientDirection = 'to-r'; // Tailwind gradient directions
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Internal state
  let rippleElements = [];
  let isAnimating = false;
    // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  // Rounded classes
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };
  
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu select-none';
  
  // Variant specific classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50 hover:scale-105 active:scale-95',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500/50 hover:scale-105 active:scale-95',
    accent: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500/50 hover:scale-105 active:scale-95',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500/30 border border-blue-200 hover:border-blue-300',
    '3d': 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md border-b-4 border-blue-700',
    gradient: `bg-gradient-${gradientDirection} from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 hover:scale-105 active:scale-95`,
    glass: 'backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl',
    neon: 'bg-transparent text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg hover:shadow-cyan-400/50 hover:scale-105',
    morphic: 'bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)] active:shadow-[inset_0_6px_12px_rgba(0,0,0,0.2)]',
    animated: 'bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-violet-500 hover:to-pink-500 hover:scale-105 active:scale-95 animate-pulse hover:animate-none'
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
    
    if (animation === 'bounce' || animation === 'pulse' || animation === 'glow' || animation === 'shake' || animation === 'float') {
      isAnimating = true;
      setTimeout(() => isAnimating = false, animation === 'float' ? 1000 : 300);
    }
    
    dispatch('click', event);
  }
  
  // Computed classes
  $: classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    roundedClasses[rounded],
    shadowClasses[shadow],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed transform-none' : '',
    animation === 'pulse' && !isAnimating ? 'hover:animate-pulse' : '',
    animation === 'bounce' && isAnimating ? 'animate-bounce' : '',
    animation === 'glow' && !disabled ? 'hover:shadow-lg hover:shadow-current/25' : '',
    animation === 'shake' && isAnimating ? 'animate-ping' : '',
    animation === 'float' && !disabled ? 'hover:animate-bounce' : ''
  ].filter(Boolean).join(' ');
  
  // Determine if we should render an <a> or <button>
  $: isLink = !!href && !disabled && !loading;
</script>

{#if isLink}
  <a
    {href}
    {target}
    {rel}
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
