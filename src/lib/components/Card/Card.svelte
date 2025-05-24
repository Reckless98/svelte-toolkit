<!-- Reusable Card Component with multiple variants and effects -->
<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
    // Props
  export let variant = 'standard'; // standard, elevated, outlined, glass, parallax, tilt, flip, gradient, neon, morphic
  export let image = '';
  export let title = '';
  export let subtitle = '';
  export let href = '';
  export let aspectRatio = '16/9'; // image aspect ratio
  export let elevation = 'md'; // none, sm, md, lg, xl
  export let animation = 'none'; // none, fade, slide, scale, bounce, float
  export let rounded = 'lg'; // sm, md, lg, xl, full
  export let gradientDirection = 'to-br'; // Tailwind gradient directions
  export let hoverEffect = 'scale'; // scale, lift, glow, tilt, pulse
  export let borderColor = 'gray-200'; // Border color for outlined variant
  
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
    'overflow-hidden transition-all duration-300 transform-gpu',
    `rounded-${rounded}`,
    
    // Variant styles
    variant === 'outlined' ? `border border-${borderColor}` : '',
    variant === 'glass' ? 'backdrop-blur-md bg-white/20 border border-white/30 shadow-lg' : '',
    variant === 'gradient' ? `bg-gradient-${gradientDirection} from-blue-500 to-purple-600 text-white` : '',
    variant === 'neon' ? 'bg-gray-900 border-2 border-cyan-400 shadow-lg shadow-cyan-400/20' : '',
    variant === 'morphic' ? 'bg-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : '',
    variant === 'standard' || variant === 'elevated' || variant === 'parallax' || variant === 'tilt' ? 'bg-white' : '',
    
    // Elevation shadows
    elevation === 'sm' && variant !== 'outlined' && variant !== 'morphic' ? 'shadow-sm' : '',
    elevation === 'md' && variant !== 'outlined' && variant !== 'morphic' ? 'shadow-md' : '',
    elevation === 'lg' && variant !== 'outlined' && variant !== 'morphic' ? 'shadow-lg' : '',
    elevation === 'xl' && variant !== 'outlined' && variant !== 'morphic' ? 'shadow-xl' : '',
    
    // Hover effects
    hoverEffect === 'scale' && variant !== 'tilt' && variant !== 'flip' ? 'hover:scale-105' : '',
    hoverEffect === 'lift' && variant !== 'tilt' && variant !== 'flip' ? 'hover:-translate-y-2 hover:shadow-xl' : '',
    hoverEffect === 'glow' && variant !== 'tilt' && variant !== 'flip' ? 'hover:shadow-2xl hover:shadow-blue-500/20' : '',
    hoverEffect === 'pulse' && variant !== 'tilt' && variant !== 'flip' ? 'hover:animate-pulse' : '',
    
    // Special variant styles
    variant === 'flip' ? 'relative' : '',
    variant === 'tilt' ? 'hover:shadow-2xl' : '',
    
    // Interactive cursor
    href || variant === 'flip' ? 'cursor-pointer' : ''
  ].filter(Boolean).join(' ');
  
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
