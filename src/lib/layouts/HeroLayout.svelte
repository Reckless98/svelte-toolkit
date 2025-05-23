<!-- Hero Layout Component with multiple styles -->
<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  // Props
  export let variant = 'standard'; // standard, split, video, animated, parallax
  export let backgroundImage = '';
  export let backgroundVideo = '';
  export let backgroundOverlay = 'rgba(0, 0, 0, 0.5)';
  export let backgroundPosition = 'center';
  export let textColor = 'text-white';
  export let textAlignment = 'text-center'; // text-left, text-center, text-right
  export let fullHeight = true;
  export let staggered = true; // Staggered animation of child elements
  export let animationDelay = 200; // ms between animations
  
  // Internal state
  let ready = false;
  let mouseMoveActive = variant === 'parallax';
  let mouseX = 0;
  let mouseY = 0;
  
  // Initialize animations and effects
  onMount(() => {
    ready = true;
    
    if (mouseMoveActive) {
      const handleMouseMove = (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  });
  
  // Computed styles for parallax effect
  $: parallaxStyle = mouseMoveActive
    ? `transform: translate(${(mouseX - 0.5) * -30}px, ${(mouseY - 0.5) * -30}px);`
    : '';
    
  // Container classes
  $: containerClasses = [
    'relative overflow-hidden',
    fullHeight ? 'h-screen' : 'py-20',
    textColor,
    textAlignment
  ].join(' ');
</script>

<section class={containerClasses}>
  <!-- Background layers -->
  {#if variant === 'video' && backgroundVideo}
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="absolute inset-0 min-w-full min-h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  {:else if backgroundImage}
    <div 
      class="absolute inset-0 w-full h-full bg-cover bg-no-repeat" 
      style="background-image: url('{backgroundImage}'); background-position: {backgroundPosition}; {parallaxStyle}"
    ></div>
  {/if}
  
  <!-- Background overlay -->
  <div 
    class="absolute inset-0 w-full h-full" 
    style="background: {backgroundOverlay};"
  ></div>
  
  <!-- Content container -->
  <div class="relative z-10 container mx-auto px-4 h-full flex items-center">
    {#if variant === 'split'}
      <!-- Split layout (image on one side, content on the other) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
        <div class={ready ? '' : 'opacity-0'}>
          {#if ready}
            <div in:fly={{ y: 50, duration: 800 }}>
              <slot name="left" />
            </div>
          {/if}
        </div>
        <div class={ready ? '' : 'opacity-0'}>
          {#if ready}
            <div in:fly={{ y: 50, duration: 800, delay: animationDelay }}>
              <slot name="right" />
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Standard layout with optional staggered animations -->
      <div class="w-full max-w-4xl mx-auto">
        {#if staggered && ready}
          <slot {animationDelay} />
        {:else}
          <slot />
        {/if}
      </div>
    {/if}
  </div>
</section>
