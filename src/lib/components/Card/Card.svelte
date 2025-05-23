<!-- Reusable Card Component with multiple variants and effects -->
<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  
  // Props
  export let variant = 'standard'; // standard, elevated, outlined, glass, parallax, tilt, flip
  export let image = '';
  export let title = '';
  export let subtitle = '';
  export let href = '';
  export let aspectRatio = '16/9'; // image aspect ratio
  export let elevation = 'md'; // sm, md, lg
  export let animation = 'none'; // none, fade, slide, scale
  
  // Internal state
  let card;
  let cardContent;
  let isFlipped = false;
  let isTiltEnabled = variant === 'tilt';
  let isParallaxEnabled = variant === 'parallax';
  
  // 3D tilt effect
  let tiltX = 0;
  let tiltY = 0;
  let tiltZ = 0;
  let perspective = 1000;
  let tiltIntensity = 15;
  
  // Initialize tilt and parallax effects
  onMount(() => {
    if (isTiltEnabled && card) {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tiltX = ((y / rect.height) - 0.5) * tiltIntensity;
        tiltY = ((x / rect.width) - 0.5) * -tiltIntensity;
        tiltZ = 0;
      };
      
      const handleMouseLeave = () => {
        tiltX = 0;
        tiltY = 0;
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (card) {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  });
  
  // Handle flip card
  function toggleFlip() {
    if (variant === 'flip') {
      isFlipped = !isFlipped;
    }
  }
  
  // Computed classes
  $: containerClasses = [
    'overflow-hidden',
    variant === 'outlined' ? 'border border-gray-200' : '',
    variant === 'glass' ? 'backdrop-blur-md bg-white/20 border border-white/30' : 'bg-white',
    variant === 'flip' ? 'relative' : '',
    elevation === 'sm' && variant !== 'outlined' ? 'shadow-sm' : 
    elevation === 'md' && variant !== 'outlined' ? 'shadow-md' : 
    elevation === 'lg' && variant !== 'outlined' ? 'shadow-lg' : '',
    'rounded-lg transition-all duration-300',
    variant !== 'parallax' && variant !== 'tilt' && variant !== 'flip' ? 'hover:shadow-xl' : ''
  ].join(' ');
  
  // 3D transform styles for tilt effect
  $: tiltStyle = isTiltEnabled 
    ? `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg) scale3d(1.05, 1.05, 1.05)`
    : '';
    
  // Compute flip transform
  $: flipStyle = variant === 'flip' 
    ? `transform-style: preserve-3d; transform: ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'}`
    : '';
</script>

<div
  bind:this={card}
  class={containerClasses}
  style={isTiltEnabled ? `transform: ${tiltStyle}` : (variant === 'flip' ? flipStyle : '')}
  on:click={toggleFlip}
>
  <!-- Standard Card Structure -->
  {#if variant !== 'flip'}
    <!-- Card image -->
    {#if image}
      <div class="relative" style={aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}>
        <img
          src={image}
          alt={title}
          class="w-full h-full object-cover {variant === 'parallax' ? 'transform scale-110' : ''}"
          style={isParallaxEnabled ? `transform: translateY(${tiltY * 2}px)` : ''}
        />
      </div>
    {/if}
    
    <!-- Card content -->
    <div 
      class="p-4"
      style={isParallaxEnabled ? `transform: translateY(${tiltY * -1}px)` : ''}
    >
      {#if title}
        <h3 class="font-bold text-lg mb-1">{title}</h3>
      {/if}
      
      {#if subtitle}
        <p class="text-gray-600 text-sm mb-3">{subtitle}</p>
      {/if}
      
      <slot />
    </div>
    
    <!-- Card footer -->
    <slot name="footer" />
  {:else}
    <!-- Flip Card - Front -->
    <div 
      class="absolute w-full h-full backface-hidden"
      style="transform: rotateY(0deg); backface-visibility: hidden;"
    >
      {#if image}
        <div class="relative" style={aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}>
          <img src={image} alt={title} class="w-full h-full object-cover" />
        </div>
      {/if}
      
      <div class="p-4">
        {#if title}
          <h3 class="font-bold text-lg mb-1">{title}</h3>
        {/if}
        
        {#if subtitle}
          <p class="text-gray-600 text-sm mb-3">{subtitle}</p>
        {/if}
        
        <slot name="front" />
      </div>
    </div>
    
    <!-- Flip Card - Back -->
    <div 
      class="absolute w-full h-full backface-hidden bg-accent text-white p-4"
      style="transform: rotateY(180deg); backface-visibility: hidden;"
    >
      <slot name="back">
        <h3 class="font-bold text-lg mb-2">Back Content</h3>
        <p>Add your back content here using the "back" slot.</p>
      </slot>
    </div>
  {/if}
  
  <!-- Link overlay if href is provided -->
  {#if href && variant !== 'flip'}
    <a href={href} class="absolute inset-0 w-full h-full" aria-label={title}></a>
  {/if}
</div>

<style>
  /* For flip card */
  .backface-hidden {
    backface-visibility: hidden;
  }
</style>
