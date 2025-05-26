<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { generateId } from '$lib/utils/helpers';

  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let label: string = '';
  export let description: string = '';
  export let variant: 'standard' | 'modern' | 'ios' | 'material' | 'neon' = 'standard';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  export let labelPosition: 'left' | 'right' = 'right';
  export let showIcons: boolean = false;
  export let checkedIcon: string = '✓';
  export let uncheckedIcon: string = '✕';
  export let value: string = '';
  export let name: string = '';
  export let id: string = generateId('toggle');

  const dispatch = createEventDispatcher<{
    change: { checked: boolean, value: string };
    focus: FocusEvent;
    blur: FocusEvent;
  }>();

  function toggle() {
    if (disabled) return;
    checked = !checked;
    dispatch('change', { checked, value });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggle();
    }
  }

  function handleFocus(event: FocusEvent) {
    dispatch('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }
</script>

<div 
  class="toggle-wrapper {variant} {size} {color} {disabled ? 'disabled' : ''}"
  class:label-left={labelPosition === 'left'}
>
  {#if label && labelPosition === 'left'}
    <label for={id} class="toggle-label left">
      {label}
      {#if required}
        <span class="required">*</span>
      {/if}
    </label>
  {/if}

  <button
    type="button"
    role="switch"
    {id}
    class="toggle-button"
    class:checked
    {disabled}
    aria-checked={checked}
    aria-describedby={description ? `${id}-description` : undefined}
    on:click={toggle}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
  >
    <span class="toggle-track">
      <span class="toggle-thumb">
        {#if showIcons}
          <span class="toggle-icon">
            {checked ? checkedIcon : uncheckedIcon}
          </span>
        {/if}
      </span>
      
      {#if variant === 'ios' || variant === 'material'}
        <span class="toggle-labels">
          <span class="label-on">ON</span>
          <span class="label-off">OFF</span>
        </span>
      {/if}
    </span>
  </button>

  {#if label && labelPosition === 'right'}
    <label for={id} class="toggle-label right">
      {label}
      {#if required}
        <span class="required">*</span>
      {/if}
    </label>
  {/if}

  {#if description}
    <div id="{id}-description" class="toggle-description">
      {description}
    </div>
  {/if}
</div>

<input type="hidden" {name} value={checked ? value || 'on' : ''} />

<style lang="postcss">
  .toggle-wrapper {
    @apply flex items-center gap-3;
  }

  .toggle-wrapper.label-left {
    @apply flex-row-reverse justify-end;
  }

  .toggle-label {
    @apply text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none;
  }

  .toggle-label.left {
    @apply order-2;
  }

  .toggle-label.right {
    @apply order-1;
  }

  .required {
    @apply text-red-500 ml-1;
  }

  .toggle-button {
    @apply relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
           focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out;
  }

  .toggle-button:disabled {
    @apply cursor-not-allowed opacity-50;
  }

  .toggle-track {
    @apply relative inline-block rounded-full transition-all duration-200 ease-in-out;
  }

  .toggle-thumb {
    @apply absolute top-0 left-0 inline-block rounded-full bg-white shadow transform
           transition-transform duration-200 ease-in-out flex items-center justify-center;
  }

  .toggle-icon {
    @apply text-xs font-bold;
  }

  .toggle-labels {
    @apply absolute inset-0 flex items-center justify-between px-1 text-xs font-medium;
  }

  .label-on, .label-off {
    @apply transition-opacity duration-200;
  }

  .toggle-description {
    @apply mt-1 text-sm text-gray-600 dark:text-gray-400 w-full;
  }

  /* Standard variant */
  .toggle-wrapper.standard .toggle-track {
    @apply bg-gray-200 dark:bg-gray-700;
  }

  .toggle-wrapper.standard .toggle-button.checked .toggle-track {
    @apply bg-blue-600;
  }

  /* Modern variant */
  .toggle-wrapper.modern .toggle-track {
    @apply bg-gray-300 dark:bg-gray-600 shadow-inner;
  }

  .toggle-wrapper.modern .toggle-button.checked .toggle-track {
    @apply bg-gradient-to-r from-blue-500 to-blue-600;
  }

  .toggle-wrapper.modern .toggle-thumb {
    @apply shadow-lg;
  }

  /* iOS variant */
  .toggle-wrapper.ios .toggle-track {
    @apply bg-gray-300 dark:bg-gray-600;
  }

  .toggle-wrapper.ios .toggle-button.checked .toggle-track {
    @apply bg-green-500;
  }

  .toggle-wrapper.ios .toggle-thumb {
    @apply border border-gray-200 dark:border-gray-500;
  }

  /* Material variant */
  .toggle-wrapper.material .toggle-track {
    @apply bg-gray-400 dark:bg-gray-600;
  }

  .toggle-wrapper.material .toggle-button.checked .toggle-track {
    @apply bg-blue-400;
  }

  .toggle-wrapper.material .toggle-thumb {
    @apply shadow-md;
  }

  /* Neon variant */
  .toggle-wrapper.neon .toggle-track {
    @apply bg-gray-800 border border-gray-600;
  }

  .toggle-wrapper.neon .toggle-button.checked .toggle-track {
    @apply bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg;
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }

  .toggle-wrapper.neon .toggle-thumb {
    @apply bg-white;
  }

  .toggle-wrapper.neon .toggle-button.checked .toggle-thumb {
    @apply bg-white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }

  /* Sizes */
  .toggle-wrapper.sm .toggle-track {
    @apply w-8 h-4;
  }

  .toggle-wrapper.sm .toggle-thumb {
    @apply w-3 h-3 text-xs;
  }

  .toggle-wrapper.sm .toggle-button.checked .toggle-thumb {
    @apply transform translate-x-4;
  }

  .toggle-wrapper.md .toggle-track {
    @apply w-11 h-6;
  }

  .toggle-wrapper.md .toggle-thumb {
    @apply w-5 h-5 text-xs;
  }

  .toggle-wrapper.md .toggle-button.checked .toggle-thumb {
    @apply transform translate-x-5;
  }

  .toggle-wrapper.lg .toggle-track {
    @apply w-14 h-7;
  }

  .toggle-wrapper.lg .toggle-thumb {
    @apply w-6 h-6 text-sm;
  }

  .toggle-wrapper.lg .toggle-button.checked .toggle-thumb {
    @apply transform translate-x-7;
  }

  .toggle-wrapper.xl .toggle-track {
    @apply w-16 h-8;
  }

  .toggle-wrapper.xl .toggle-thumb {
    @apply w-7 h-7 text-base;
  }

  .toggle-wrapper.xl .toggle-button.checked .toggle-thumb {
    @apply transform translate-x-8;
  }

  /* Colors */
  .toggle-wrapper.primary .toggle-button:focus {
    @apply ring-blue-500;
  }

  .toggle-wrapper.primary .toggle-button.checked .toggle-track {
    @apply bg-blue-600;
  }

  .toggle-wrapper.secondary .toggle-button:focus {
    @apply ring-gray-500;
  }

  .toggle-wrapper.secondary .toggle-button.checked .toggle-track {
    @apply bg-gray-600;
  }

  .toggle-wrapper.success .toggle-button:focus {
    @apply ring-green-500;
  }

  .toggle-wrapper.success .toggle-button.checked .toggle-track {
    @apply bg-green-600;
  }

  .toggle-wrapper.warning .toggle-button:focus {
    @apply ring-yellow-500;
  }

  .toggle-wrapper.warning .toggle-button.checked .toggle-track {
    @apply bg-yellow-500;
  }

  .toggle-wrapper.error .toggle-button:focus {
    @apply ring-red-500;
  }

  .toggle-wrapper.error .toggle-button.checked .toggle-track {
    @apply bg-red-600;
  }

  .toggle-wrapper.info .toggle-button:focus {
    @apply ring-blue-400;
  }

  .toggle-wrapper.info .toggle-button.checked .toggle-track {
    @apply bg-blue-400;
  }

  /* Icon states */
  .toggle-button.checked .toggle-icon {
    @apply text-gray-600;
  }

  .toggle-button:not(.checked) .toggle-icon {
    @apply text-gray-400;
  }

  /* Label states for iOS/Material */
  .toggle-button.checked .label-on {
    @apply opacity-100 text-white;
  }

  .toggle-button.checked .label-off {
    @apply opacity-0;
  }

  .toggle-button:not(.checked) .label-on {
    @apply opacity-0;
  }

  .toggle-button:not(.checked) .label-off {
    @apply opacity-100 text-gray-600 dark:text-gray-300;
  }

  /* Disabled state */
  .toggle-wrapper.disabled .toggle-label {
    @apply text-gray-400 dark:text-gray-500 cursor-not-allowed;
  }

  .toggle-wrapper.disabled .toggle-track {
    @apply bg-gray-200 dark:bg-gray-700;
  }

  .toggle-wrapper.disabled .toggle-thumb {
    @apply bg-gray-100 dark:bg-gray-600;
  }
</style>
