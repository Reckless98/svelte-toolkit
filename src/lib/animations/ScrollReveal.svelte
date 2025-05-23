<!-- ScrollReveal Component: Animates elements when they enter the viewport -->
<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale, slide } from 'svelte/transition';
  
  // Props
  export let animation = 'fade'; // fade, fly, scale, slide
  export let delay = 0;
  export let duration = 800;
  export let threshold = 0.2; // Percentage of element visible to trigger
  export let x = 0; // For fly animation
  export let y = 30; // For fly animation
  export let start = 0.95; // For scale animation
  export let axis = 'y'; // For slide animation: x or y
  
  // State
  let visible = false;
  let element;
  let observer;
  
  // Initialize intersection observer
  onMount(() => {
    if (browser) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          visible = entry.isIntersecting;
          
          // Unobserve after element becomes visible
          if (visible && observer) {
            observer.unobserve(element);
          }
        },
        { threshold }
      );
      
      observer.observe(element);
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  });
  
  // Check for browser environment
  const browser = typeof window !== 'undefined';
</script>

<div bind:this={element}>
  {#if visible}
    <div
      in:fade={{ duration, delay: delay + 0 }}
    >
      {#if animation === 'fade'}
        <div in:fade={{ duration, delay: delay + 50 }}>
          <slot />
        </div>
      {:else if animation === 'fly'}
        <div in:fly={{ x, y, duration, delay: delay + 50 }}>
          <slot />
        </div>
      {:else if animation === 'scale'}
        <div in:scale={{ start, duration, delay: delay + 50 }}>
          <slot />
        </div>
      {:else if animation === 'slide'}
        <div in:slide={{ axis, duration, delay: delay + 50 }}>
          <slot />
        </div>
      {/if}
    </div>
  {:else}
    <div class="opacity-0">
      <slot />
    </div>
  {/if}
</div>
