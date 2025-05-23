<!-- Parallax Component: Creates parallax effect on scroll -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Props
  export let speed = 0.5; // Parallax speed (0-1)
  export let direction = 'up'; // up, down, left, right
  export let overflow = 'hidden'; // hidden, visible
  export let containerClass = ''; // Additional class for container
  
  // Internal state
  let container;
  let content;
  let windowHeight;
  let scrollY;
  let transformValue = 0;
  
  // Setup parallax effect
  onMount(() => {
    windowHeight = window.innerHeight;
    
    const handleScroll = () => {
      scrollY = window.scrollY;
      
      if (container) {
        const rect = container.getBoundingClientRect();
        const offsetTop = rect.top + scrollY;
        const elementHeight = rect.height;
        
        // Check if element is in view
        if (
          offsetTop + elementHeight >= scrollY &&
          offsetTop <= scrollY + windowHeight
        ) {
          // Calculate how far the element is from the top of the viewport
          const elementViewportOffset = rect.top;
          // Calculate parallax value
          if (direction === 'up' || direction === 'down') {
            const directionModifier = direction === 'up' ? -1 : 1;
            transformValue = elementViewportOffset * speed * directionModifier;
          } else {
            const directionModifier = direction === 'left' ? -1 : 1;
            transformValue = elementViewportOffset * speed * directionModifier;
          }
        }
      }
    };
    
    const handleResize = () => {
      windowHeight = window.innerHeight;
      handleScroll();
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
  
  // Transform style based on direction
  $: transformStyle = direction === 'up' || direction === 'down'
    ? `transform: translateY(${transformValue}px);`
    : `transform: translateX(${transformValue}px);`;
</script>

<div 
  bind:this={container}
  class="relative {overflow === 'hidden' ? 'overflow-hidden' : ''} {containerClass}"
>
  <div
    bind:this={content}
    class="will-change-transform"
    style={transformStyle}
  >
    <slot />
  </div>
</div>
