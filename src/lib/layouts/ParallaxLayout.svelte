<!-- Parallax Layout with scroll-based animations -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Props
  export let backgroundImage = ''; // URL for the background image
  export let overlayColor = 'rgba(0, 0, 0, 0.4)'; // Overlay color
  export let speed = 0.5; // Parallax speed (0-1)
  export let fullHeight = true; // Make the section full viewport height
  export let fadeContent = true; // Fade in content on scroll
  
  // Internal state
  let container;
  let background;
  let content;
  let windowHeight;
  let scrollY;
  let contentVisible = false;
  
  // Initialize scroll tracking
  onMount(() => {
    windowHeight = window.innerHeight;
    
    const handleScroll = () => {
      scrollY = window.scrollY;
      
      if (background) {
        // Apply parallax effect to background
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + scrollY;
        const containerHeight = containerRect.height;
        
        // Calculate parallax position
        if (containerTop <= scrollY + windowHeight && containerTop + containerHeight >= scrollY) {
          const yOffset = (scrollY - containerTop) * speed;
          background.style.transform = `translateY(${yOffset}px)`;
        }
        
        // Determine if content should be visible
        if (fadeContent) {
          const contentTop = containerRect.top;
          const triggerPoint = windowHeight * 0.7;
          contentVisible = contentTop <= triggerPoint;
        } else {
          contentVisible = true;
        }
      }
    };
    
    const handleResize = () => {
      windowHeight = window.innerHeight;
      handleScroll();
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div 
  bind:this={container}
  class="relative overflow-hidden w-full {fullHeight ? 'h-screen' : ''}"
>
  <!-- Parallax Background -->
  <div
    bind:this={background}
    class="absolute inset-0 w-full h-full"
    style="background-image: url('{backgroundImage}'); background-size: cover; background-position: center; transform: translateY(0);"
  ></div>
  
  <!-- Overlay -->
  <div
    class="absolute inset-0 w-full h-full"
    style="background-color: {overlayColor};"
  ></div>
  
  <!-- Content -->
  <div
    bind:this={content}
    class="relative w-full h-full z-10 transition-opacity duration-1000"
    class:opacity-0={fadeContent && !contentVisible}
    class:opacity-100={!fadeContent || contentVisible}
  >
    <slot />
  </div>
</div>
