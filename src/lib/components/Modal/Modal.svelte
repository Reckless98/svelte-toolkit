<!-- Reusable Modal Component with multiple variants -->
<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { fade, fly, scale, slide } from 'svelte/transition';
  
  // Props
  export let open = false;
  export let variant = 'standard'; // standard, fullscreen, slide, centered, minimal, glass
  export let title = '';
  export let closeButton = true;
  export let closeOnEsc = true;
  export let closeOnClickOutside = true;
  export let animation = 'fade'; // fade, fly, scale, slide
  export let duration = 300;
  export let width = 'max-w-lg'; // CSS class for width
  export let height = ''; // CSS class for height (empty for auto)
  export let position = 'center'; // center, top, right, bottom, left
  export let backdrop = true;
  export let backdropBlur = false;
  export let zIndex = 'z-50';
  
  // Internal state
  let modalElement;
  let animationProps = {};
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Close modal function
  function close() {
    open = false;
    dispatch('close');
  }
  
  // Handle keydown events for escape key
  function handleKeydown(event) {
    if (open && closeOnEsc && event.key === 'Escape') {
      close();
    }
  }
  
  // Handle clicks outside the modal
  function handleOutsideClick(event) {
    if (closeOnClickOutside && modalElement && !modalElement.contains(event.target)) {
      close();
    }
  }
  
  // Add event listeners
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
  
  // Set animation properties based on selected animation and position
  $: {
    if (animation === 'fade') {
      animationProps = { duration };
    } else if (animation === 'scale') {
      animationProps = { duration, start: 0.95 };
    } else if (animation === 'fly') {
      const y = position === 'top' ? -20 : position === 'bottom' ? 20 : 0;
      const x = position === 'left' ? -20 : position === 'right' ? 20 : 0;
      animationProps = { duration, y, x };
    } else if (animation === 'slide') {
      animationProps = { duration };
    }
  }
  
  // Position classes
  $: positionClass = 
    position === 'top' ? 'items-start' :
    position === 'bottom' ? 'items-end' :
    position === 'left' ? 'items-center justify-start' :
    position === 'right' ? 'items-center justify-end' :
    'items-center justify-center'; // default center
  
  // Variant specific classes
  $: variantClass = 
    variant === 'standard' ? 'bg-white dark:bg-gray-800 rounded-lg shadow-xl' :
    variant === 'minimal' ? 'bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700' :
    variant === 'fullscreen' ? 'bg-white dark:bg-gray-800 w-screen h-screen max-w-none' :
    variant === 'glass' ? 'backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-800/20 rounded-lg shadow-xl' :
    'bg-white dark:bg-gray-800 rounded-lg shadow-xl'; // default
</script>

{#if open}
  <!-- Modal backdrop -->
  {#if backdrop}
    <div 
      class="fixed inset-0 {zIndex} {backdropBlur ? 'backdrop-blur-sm' : ''}"
      transition:fade={{ duration: duration / 2 }}
      on:click={handleOutsideClick}
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>
  {/if}
  
  <!-- Modal container -->
  <div 
    class="fixed inset-0 overflow-y-auto {zIndex} flex {positionClass} p-4"
    class:pointer-events-none={!backdrop}
  >
    <!-- Modal content -->
    <div
      bind:this={modalElement}
      class="pointer-events-auto {width} {height} {variantClass} overflow-hidden flex flex-col"
      class:w-screen={variant === 'fullscreen'}
      class:h-screen={variant === 'fullscreen'}
      class:max-w-none={variant === 'fullscreen'}
      class:h-auto={!height && variant !== 'fullscreen'}
      on:click|stopPropagation
    >
      {#if animation === 'fade'}
        <div transition:fade={animationProps} class="w-full h-full flex flex-col">
          <slot name="modal-content">
            <!-- Modal header -->
            {#if title || closeButton}
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {#if title}
                  <h3 class="text-lg font-semibold">{title}</h3>
                {:else}
                  <div></div>
                {/if}
                
                {#if closeButton}
                  <button 
                    type="button" 
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    on:click={close}
                    aria-label="Close"
                  >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                {/if}
              </div>
            {/if}
            
            <!-- Modal body -->
            <div class="relative flex-1 px-6 py-4 overflow-y-auto">
              <slot></slot>
            </div>
            
            <!-- Modal footer -->
            <slot name="footer">
              {#if $$slots.footer}
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <slot name="footer"></slot>
                </div>
              {/if}
            </slot>
          </slot>
        </div>
      {:else if animation === 'scale'}
        <div transition:scale={animationProps} class="w-full h-full flex flex-col">
          <slot name="modal-content">
            <!-- Modal header -->
            {#if title || closeButton}
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {#if title}
                  <h3 class="text-lg font-semibold">{title}</h3>
                {:else}
                  <div></div>
                {/if}
                
                {#if closeButton}
                  <button 
                    type="button" 
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    on:click={close}
                    aria-label="Close"
                  >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                {/if}
              </div>
            {/if}
            
            <!-- Modal body -->
            <div class="relative flex-1 px-6 py-4 overflow-y-auto">
              <slot></slot>
            </div>
            
            <!-- Modal footer -->
            <slot name="footer">
              {#if $$slots.footer}
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <slot name="footer"></slot>
                </div>
              {/if}
            </slot>
          </slot>
        </div>
      {:else if animation === 'fly'}
        <div transition:fly={animationProps} class="w-full h-full flex flex-col">
          <slot name="modal-content">
            <!-- Modal header -->
            {#if title || closeButton}
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {#if title}
                  <h3 class="text-lg font-semibold">{title}</h3>
                {:else}
                  <div></div>
                {/if}
                
                {#if closeButton}
                  <button 
                    type="button" 
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    on:click={close}
                    aria-label="Close"
                  >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                {/if}
              </div>
            {/if}
            
            <!-- Modal body -->
            <div class="relative flex-1 px-6 py-4 overflow-y-auto">
              <slot></slot>
            </div>
            
            <!-- Modal footer -->
            <slot name="footer">
              {#if $$slots.footer}
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <slot name="footer"></slot>
                </div>
              {/if}
            </slot>
          </slot>
        </div>
      {:else if animation === 'slide'}
        <div transition:slide={animationProps} class="w-full h-full flex flex-col">
          <slot name="modal-content">
            <!-- Modal header -->
            {#if title || closeButton}
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {#if title}
                  <h3 class="text-lg font-semibold">{title}</h3>
                {:else}
                  <div></div>
                {/if}
                
                {#if closeButton}
                  <button 
                    type="button" 
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    on:click={close}
                    aria-label="Close"
                  >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                {/if}
              </div>
            {/if}
            
            <!-- Modal body -->
            <div class="relative flex-1 px-6 py-4 overflow-y-auto">
              <slot></slot>
            </div>
            
            <!-- Modal footer -->
            <slot name="footer">
              {#if $$slots.footer}
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <slot name="footer"></slot>
                </div>
              {/if}
            </slot>
          </slot>
        </div>
      {/if}
    </div>
  </div>
{/if}
