<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { generateId } from '$lib/utils/helpers';

  export let value: string = '';
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let required: boolean = false;
  export let placeholder: string = '';
  export let label: string = '';
  export let description: string = '';
  export let variant: 'standard' | 'outlined' | 'filled' | 'modern' | 'glass' = 'standard';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  export let error: string = '';
  export let rows: number = 4;
  export let cols: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let maxlength: number | undefined = undefined;
  export let resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';
  export let autoResize: boolean = false;
  export let showCharCount: boolean = false;
  export let name: string = '';
  export let id: string = generateId('textarea');

  let textareaElement: HTMLTextAreaElement;
  let isFocused = false;

  const dispatch = createEventDispatcher<{
    input: { value: string };
    change: { value: string };
    focus: FocusEvent;
    blur: FocusEvent;
    keydown: KeyboardEvent;
    keyup: KeyboardEvent;
  }>();

  $: characterCount = value.length;
  $: isOverLimit = maxlength ? characterCount > maxlength : false;
  $: characterCountColor = isOverLimit ? 'text-red-500' : 
    maxlength && characterCount > maxlength * 0.9 ? 'text-yellow-500' : 'text-gray-500';

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    
    if (autoResize) {
      autoResizeTextarea();
    }
    
    dispatch('input', { value });
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    dispatch('change', { value });
  }

  function handleFocus(event: FocusEvent) {
    isFocused = true;
    dispatch('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    isFocused = false;
    dispatch('blur', event);
  }

  function handleKeydown(event: KeyboardEvent) {
    dispatch('keydown', event);
    
    // Handle Tab key for indentation if needed
    if (event.key === 'Tab' && event.ctrlKey) {
      event.preventDefault();
      const start = textareaElement.selectionStart;
      const end = textareaElement.selectionEnd;
      
      // Insert tab character
      value = value.substring(0, start) + '\t' + value.substring(end);
      
      // Restore cursor position
      setTimeout(() => {
        textareaElement.selectionStart = textareaElement.selectionEnd = start + 1;
      });
    }
  }

  function handleKeyup(event: KeyboardEvent) {
    dispatch('keyup', event);
  }

  function autoResizeTextarea() {
    if (!textareaElement || !autoResize) return;
    
    // Reset height to auto to get the correct scrollHeight
    textareaElement.style.height = 'auto';
    
    // Set height to scrollHeight to fit content
    const newHeight = Math.max(textareaElement.scrollHeight, textareaElement.offsetHeight);
    textareaElement.style.height = `${newHeight}px`;
  }

  function focus() {
    textareaElement?.focus();
  }

  function blur() {
    textareaElement?.blur();
  }

  function select() {
    textareaElement?.select();
  }

  function setSelectionRange(start: number, end: number) {
    textareaElement?.setSelectionRange(start, end);
  }

  // Export methods for parent components
  export { focus, blur, select, setSelectionRange };

  onMount(() => {
    if (autoResize) {
      autoResizeTextarea();
    }
  });

  // Watch value changes for auto-resize
  $: if (autoResize && textareaElement) {
    autoResizeTextarea();
  }
</script>

<div 
  class="textarea-wrapper {variant} {size} {color} {disabled ? 'disabled' : ''} {readonly ? 'readonly' : ''} {error ? 'error' : ''}"
  class:focused={isFocused}
>
  {#if label}
    <label for={id} class="textarea-label">
      {label}
      {#if required}
        <span class="required">*</span>
      {/if}
    </label>
  {/if}

  <div class="textarea-container">
    <textarea
      bind:this={textareaElement}
      {id}
      {name}
      {rows}
      {cols}
      {disabled}
      {readonly}
      {required}
      {placeholder}
      {minlength}
      {maxlength}
      bind:value
      class="textarea {resize}"
      aria-describedby={description ? `${id}-description` : error ? `${id}-error` : undefined}
      aria-invalid={error ? 'true' : 'false'}
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:keydown={handleKeydown}
      on:keyup={handleKeyup}
    />
    
    {#if showCharCount && maxlength}
      <div class="char-count {characterCountColor}">
        {characterCount}/{maxlength}
      </div>
    {/if}
  </div>

  {#if description}
    <div id="{id}-description" class="textarea-description">
      {description}
    </div>
  {/if}

  {#if error}
    <div id="{id}-error" class="textarea-error" role="alert">
      {error}
    </div>
  {/if}
</div>

<style>
  .textarea-wrapper {
    @apply relative w-full;
  }

  .textarea-label {
    @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
  }

  .required {
    @apply text-red-500 ml-1;
  }

  .textarea-container {
    @apply relative;
  }

  .textarea {
    @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
           placeholder-gray-500 dark:placeholder-gray-400
           focus:outline-none focus:ring-2 focus:border-transparent
           transition-all duration-200;
  }

  .textarea:hover:not(:disabled):not(:read-only) {
    @apply border-gray-400 dark:border-gray-500;
  }

  .char-count {
    @apply absolute bottom-2 right-2 text-xs font-mono bg-white dark:bg-gray-800 
           px-1 rounded opacity-75;
  }

  .textarea-description {
    @apply mt-1 text-sm text-gray-600 dark:text-gray-400;
  }

  .textarea-error {
    @apply mt-1 text-sm text-red-600 dark:text-red-400;
  }

  /* Resize options */
  .textarea.none {
    @apply resize-none;
  }

  .textarea.vertical {
    @apply resize-y;
  }

  .textarea.horizontal {
    @apply resize-x;
  }

  .textarea.both {
    @apply resize;
  }

  /* Variants */
  .textarea-wrapper.standard .textarea {
    @apply bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600;
  }

  .textarea-wrapper.outlined .textarea {
    @apply bg-transparent border-2 border-gray-400 dark:border-gray-500;
  }

  .textarea-wrapper.filled .textarea {
    @apply bg-gray-100 dark:bg-gray-700 border-transparent;
  }

  .textarea-wrapper.modern .textarea {
    @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
           shadow-sm rounded-xl;
  }

  .textarea-wrapper.glass .textarea {
    @apply bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
           border border-gray-200/50 dark:border-gray-700/50;
  }

  /* Sizes */
  .textarea-wrapper.sm .textarea {
    @apply px-2.5 py-1.5 text-sm;
  }

  .textarea-wrapper.md .textarea {
    @apply px-3 py-2 text-base;
  }

  .textarea-wrapper.lg .textarea {
    @apply px-4 py-3 text-lg;
  }

  .textarea-wrapper.xl .textarea {
    @apply px-5 py-4 text-xl;
  }

  /* Colors */
  .textarea-wrapper.primary .textarea:focus {
    @apply ring-blue-500 border-blue-500;
  }

  .textarea-wrapper.secondary .textarea:focus {
    @apply ring-gray-500 border-gray-500;
  }

  .textarea-wrapper.success .textarea:focus {
    @apply ring-green-500 border-green-500;
  }

  .textarea-wrapper.warning .textarea:focus {
    @apply ring-yellow-500 border-yellow-500;
  }

  .textarea-wrapper.error .textarea:focus {
    @apply ring-red-500 border-red-500;
  }

  .textarea-wrapper.info .textarea:focus {
    @apply ring-blue-400 border-blue-400;
  }

  /* States */
  .textarea-wrapper.disabled .textarea {
    @apply bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 
           cursor-not-allowed opacity-60;
  }

  .textarea-wrapper.readonly .textarea {
    @apply bg-gray-50 dark:bg-gray-800 cursor-default;
  }

  .textarea-wrapper.error .textarea {
    @apply border-red-500 dark:border-red-400;
  }

  .textarea-wrapper.focused .textarea {
    @apply ring-2 border-transparent;
  }
</style>
