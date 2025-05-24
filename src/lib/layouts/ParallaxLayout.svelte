<!-- Enhanced Parallax Layout with advanced scroll-based animations -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  // Props
  export let backgroundImage = ''; // URL for the background image
  export let overlayColor = 'rgba(0, 0, 0, 0.4)'; // Overlay color
  export let speed = 0.5; // Parallax speed (0-1)
  export let fullHeight = true; // Make the section full viewport height
  export let fadeContent = true; // Fade in content on scroll
  export let animationType = 'fade'; // 'fade', 'slide', 'zoom', 'float'
  export let intensity = 1; // Animation intensity multiplier
  
  // Internal state
  let container;
  let background;
  let content;
  let windowHeight = 0;
  let scrollY = 0;
  let contentVisible = false;
  let mounted = false;
  let isInView = false;
  let scrollProgress = 0;
  
  // Enhanced scroll tracking with better performance
  onMount(() => {
    mounted = true;
    windowHeight = window.innerHeight;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollY = window.scrollY;
          
          if (background && container) {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top + scrollY;
            const containerHeight = containerRect.height;
            
            // Check if element is in viewport
            isInView = containerTop <= scrollY + windowHeight && containerTop + containerHeight >= scrollY;
            
            if (isInView) {
              // Calculate scroll progress through the element
              const elementCenter = containerTop + containerHeight / 2;
              const viewportCenter = scrollY + windowHeight / 2;
              const distance = Math.abs(elementCenter - viewportCenter);
              const maxDistance = windowHeight / 2 + containerHeight / 2;
              scrollProgress = Math.max(0, 1 - distance / maxDistance);
              
              // Enhanced parallax effect with easing
              const parallaxOffset = (scrollY - containerTop) * speed * intensity;
              const easeOffset = parallaxOffset * (1 + Math.sin(parallaxOffset * 0.01) * 0.1);
              
              background.style.transform = `translateY(${easeOffset}px) scale(${1 + scrollProgress * 0.05})`;
              
              // Content visibility with improved trigger
              if (fadeContent) {
                const contentTop = containerRect.top;
                const triggerPoint = windowHeight * 0.8;
                contentVisible = contentTop <= triggerPoint && contentTop >= -containerHeight;
              } else {
                contentVisible = true;
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleResize = () => {
      windowHeight = window.innerHeight;
      handleScroll();
    };
    
    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
  
  // Dynamic animation styles based on type
  $: animationStyles = (() => {
    if (!contentVisible) return { opacity: 0, transform: getTransformForType(animationType, false) };
    return { opacity: 1, transform: getTransformForType(animationType, true) };
  })();
  
  function getTransformForType(type, visible) {
    const factor = visible ? 0 : intensity;
    switch (type) {
      case 'slide':
        return `translateY(${factor * 50}px)`;
      case 'zoom':
        return `scale(${visible ? 1 : 0.8})`;
      case 'float':
        return `translateY(${Math.sin(scrollProgress * Math.PI) * -10}px)`;
      default:
        return 'translateY(0)';
    }
  }
</script>

{#if mounted}
<div 
  bind:this={container}
  class="relative overflow-hidden w-full {fullHeight ? 'min-h-screen' : 'min-h-[50vh]'}"
  class:cursor-pointer={$$slots.default}
>
  <!-- Enhanced Parallax Background with gradient overlay -->
  <div
    bind:this={background}
    class="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
    style="
      background-image: linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%), url('{backgroundImage}');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      filter: brightness(0.9) contrast(1.1);
    "
  ></div>
  
  <!-- Dynamic Overlay with breathing effect -->
  <div
    class="absolute inset-0 w-full h-full transition-all duration-1000"
    style="
      background: linear-gradient(135deg, {overlayColor} 0%, rgba(0,0,0,0.2) 100%);
      opacity: {0.8 + scrollProgress * 0.2};
    "
  ></div>
  
  <!-- Floating particles effect -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    {#each Array(12) as _, i}
      <div
        class="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation-delay: {i * 0.2}s;
          animation-duration: {3 + Math.random() * 2}s;
        "
      ></div>
    {/each}
  </div>
  
  <!-- Content with enhanced animations -->
  <div
    bind:this={content}
    class="relative w-full h-full z-10 flex items-center justify-center transition-all duration-1000 ease-out"
    style="
      opacity: {animationStyles.opacity};
      transform: {animationStyles.transform};
      filter: {contentVisible ? 'blur(0px)' : 'blur(2px)'};
    "
  >
    <div class="text-center space-y-6 px-4 max-w-4xl mx-auto">
      <slot />
    </div>
  </div>
  
  <!-- Scroll indicator -->
  {#if isInView && fullHeight}
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  {/if}
</div>
{/if}
