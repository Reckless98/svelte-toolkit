<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { generateId } from '$lib/utils/helpers';

  export let value: string | string[] = '';
  export let multiple: boolean = false;
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let placeholder: string = 'Select an option...';
  export let label: string = '';
  export let description: string = '';
  export let variant: 'standard' | 'outlined' | 'filled' | 'modern' | 'glass' = 'standard';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  export let error: string = '';
  export let searchable: boolean = false;
  export let clearable: boolean = false;
  export let maxHeight: string = '200px';
  export let name: string = '';
  export let id: string = generateId('select');
  export let options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
  }> = [];

  let isOpen = false;
  let searchTerm = '';
  let selectElement: HTMLElement;
  let inputElement: HTMLInputElement;
  let filteredOptions: typeof options = [];
  let focusedIndex = -1;

  const dispatch = createEventDispatcher<{
    change: { value: string | string[], option: typeof options[0] | null };
    focus: FocusEvent;
    blur: FocusEvent;
    search: { term: string };
  }>();

  $: {
    if (searchable && searchTerm) {
      filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filteredOptions = options;
    }
  }

  $: groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  $: selectedOption = multiple 
    ? options.filter(opt => Array.isArray(value) && value.includes(opt.value))
    : options.find(opt => opt.value === value);
  $: displayValue = multiple && Array.isArray(value)
    ? value.length > 0 
      ? `${value.length} selected`
      : placeholder
    : (selectedOption && !Array.isArray(selectedOption)) ? selectedOption.label : placeholder;

  function toggleDropdown() {
    if (disabled) return;
    isOpen = !isOpen;
    if (isOpen && searchable) {
      setTimeout(() => inputElement?.focus(), 0);
    }
    focusedIndex = -1;
  }

  function selectOption(option: typeof options[0]) {
    if (option.disabled) return;

    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(option.value)
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      value = newValue;
    } else {
      value = option.value;
      isOpen = false;
    }

    dispatch('change', { value, option });
    searchTerm = '';
  }

  function clearSelection() {
    value = multiple ? [] : '';
    dispatch('change', { value, option: null });
    searchTerm = '';
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          event.preventDefault();
          toggleDropdown();
        } else if (focusedIndex >= 0) {
          event.preventDefault();
          selectOption(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        isOpen = false;
        focusedIndex = -1;
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else {
          focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          focusedIndex = Math.max(focusedIndex - 1, 0);
        }
        break;
      case 'Tab':
        isOpen = false;
        break;
    }
  }

  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchTerm = target.value;
    dispatch('search', { term: searchTerm });
    focusedIndex = -1;
  }

  function handleClickOutside(event: MouseEvent) {
    if (selectElement && !selectElement.contains(event.target as Node)) {
      isOpen = false;
      focusedIndex = -1;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div 
  class="select-wrapper {variant} {size} {color} {disabled ? 'disabled' : ''} {error ? 'error' : ''}"
  class:open={isOpen}
>
  {#if label}
    <label for={id} class="select-label">
      {label}
      {#if required}
        <span class="required">*</span>
      {/if}
    </label>
  {/if}

  <div class="select-container" bind:this={selectElement}>    <div
      class="select-trigger"
      class:placeholder={!selectedOption && (!multiple || !Array.isArray(value) || value.length === 0)}
      tabindex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-controls="{id}-listbox"
      aria-haspopup="listbox"
      aria-labelledby={label ? `${id}-label` : undefined}
      aria-describedby={description ? `${id}-description` : error ? `${id}-error` : undefined}
      aria-invalid={error ? 'true' : 'false'}
      on:click={toggleDropdown}
      on:keydown={handleKeydown}
      on:focus
      on:blur
    >
      <span class="select-value">
        {#if multiple && Array.isArray(value) && value.length > 0}
          <div class="selected-tags">
            {#each value.slice(0, 3) as val}
              {@const option = options.find(opt => opt.value === val)}
              {#if option}
                <span class="tag">
                  {option.label}
                  <button
                    type="button"
                    class="tag-remove"
                    on:click|stopPropagation={() => selectOption(option)}
                    aria-label="Remove {option.label}"
                  >
                    ×
                  </button>
                </span>
              {/if}
            {/each}
            {#if value.length > 3}
              <span class="tag-more">+{value.length - 3} more</span>
            {/if}
          </div>
        {:else}
          {displayValue}
        {/if}
      </span>

      <div class="select-actions">
        {#if clearable && ((multiple && Array.isArray(value) && value.length > 0) || (!multiple && value))}
          <button
            type="button"
            class="clear-button"
            on:click|stopPropagation={clearSelection}
            aria-label="Clear selection"
          >
            ×
          </button>
        {/if}
        
        <svg
          class="dropdown-icon"
          class:rotated={isOpen}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    {#if isOpen}
      <div class="dropdown" style="max-height: {maxHeight}">
        {#if searchable}
          <div class="search-container">
            <input
              bind:this={inputElement}
              type="text"
              class="search-input"
              placeholder="Search options..."
              bind:value={searchTerm}
              on:input={handleSearch}
              on:keydown={handleKeydown}
            />
          </div>
        {/if}

        <div id="{id}-listbox" class="options-container" role="listbox" aria-multiselectable={multiple}>
          {#if filteredOptions.length === 0}
            <div class="no-options">
              {searchTerm ? 'No options found' : 'No options available'}
            </div>
          {:else}
            {#each Object.entries(groupedOptions) as [groupName, groupOptions]}
              {#if groupName !== 'default'}
                <div class="option-group-label">{groupName}</div>
              {/if}
              
              {#each groupOptions as option, index}
                {@const globalIndex = filteredOptions.indexOf(option)}
                {@const isSelected = multiple 
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value}
                
                <div
                  class="option"
                  class:selected={isSelected}
                  class:focused={focusedIndex === globalIndex}
                  class:disabled={option.disabled}
                  role="option"
                  aria-selected={isSelected}
                  on:click={() => selectOption(option)}
                >
                  {#if multiple}
                    <div class="checkbox-indicator" class:checked={isSelected}>
                      {#if isSelected}
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      {/if}
                    </div>
                  {/if}
                  
                  <span class="option-label">{option.label}</span>
                  
                  {#if !multiple && isSelected}
                    <svg class="selected-indicator" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  {/if}
                </div>
              {/each}
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </div>

  {#if description}
    <div id="{id}-description" class="select-description">
      {description}
    </div>
  {/if}

  {#if error}
    <div id="{id}-error" class="select-error" role="alert">
      {error}
    </div>
  {/if}
</div>

<input type="hidden" {name} value={Array.isArray(value) ? value.join(',') : value} />

<style>
  .select-wrapper {
    @apply relative w-full;
  }

  .select-label {
    @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
  }

  .required {
    @apply text-red-500 ml-1;
  }

  .select-container {
    @apply relative;
  }

  .select-trigger {
    @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
           focus:outline-none focus:ring-2 focus:border-transparent
           cursor-pointer transition-all duration-200 flex items-center justify-between;
  }

  .select-trigger:hover:not(.disabled) {
    @apply border-gray-400 dark:border-gray-500;
  }

  .select-trigger.placeholder {
    @apply text-gray-500 dark:text-gray-400;
  }

  .select-value {
    @apply flex-1 truncate;
  }

  .selected-tags {
    @apply flex flex-wrap gap-1;
  }

  .tag {
    @apply inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 
           text-gray-800 dark:text-gray-200 rounded-md;
  }

  .tag-remove {
    @apply ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
           focus:outline-none;
  }

  .tag-more {
    @apply inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-400;
  }

  .select-actions {
    @apply flex items-center space-x-1 ml-2;
  }

  .clear-button {
    @apply text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
           focus:outline-none transition-colors;
  }

  .dropdown-icon {
    @apply w-5 h-5 text-gray-400 transition-transform duration-200;
  }

  .dropdown-icon.rotated {
    @apply transform rotate-180;
  }

  .dropdown {
    @apply absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 
           border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg
           overflow-hidden;
  }

  .search-container {
    @apply p-2 border-b border-gray-200 dark:border-gray-700;
  }

  .search-input {
    @apply w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
           rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white
           focus:outline-none focus:ring-1 focus:border-transparent;
  }

  .options-container {
    @apply overflow-y-auto;
  }

  .no-options {
    @apply px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center;
  }

  .option-group-label {
    @apply px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 
           bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600;
  }

  .option {
    @apply px-3 py-2 cursor-pointer flex items-center text-sm text-gray-900 dark:text-white
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
  }

  .option.selected {
    @apply bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200;
  }

  .option.focused {
    @apply bg-gray-100 dark:bg-gray-700;
  }

  .option.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .checkbox-indicator {
    @apply w-4 h-4 mr-2 border border-gray-300 dark:border-gray-600 rounded
           flex items-center justify-center;
  }

  .checkbox-indicator.checked {
    @apply bg-blue-600 border-blue-600 text-white;
  }

  .checkbox-indicator svg {
    @apply w-3 h-3;
  }

  .option-label {
    @apply flex-1;
  }

  .selected-indicator {
    @apply w-4 h-4 ml-2 text-blue-600;
  }

  .select-description {
    @apply mt-1 text-sm text-gray-600 dark:text-gray-400;
  }

  .select-error {
    @apply mt-1 text-sm text-red-600 dark:text-red-400;
  }

  /* Variants */
  .select-wrapper.standard .select-trigger {
    @apply bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600;
  }

  .select-wrapper.outlined .select-trigger {
    @apply bg-transparent border-2 border-gray-400 dark:border-gray-500;
  }

  .select-wrapper.filled .select-trigger {
    @apply bg-gray-100 dark:bg-gray-700 border-transparent;
  }

  .select-wrapper.modern .select-trigger {
    @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
           shadow-sm rounded-xl;
  }

  .select-wrapper.glass .select-trigger {
    @apply bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50;
  }

  /* Sizes */
  .select-wrapper.sm .select-trigger {
    @apply px-2.5 py-1.5 text-sm;
  }

  .select-wrapper.md .select-trigger {
    @apply px-3 py-2 text-base;
  }

  .select-wrapper.lg .select-trigger {
    @apply px-4 py-3 text-lg;
  }

  .select-wrapper.xl .select-trigger {
    @apply px-5 py-4 text-xl;
  }

  /* Colors */
  .select-wrapper.primary .select-trigger:focus {
    @apply ring-blue-500 border-blue-500;
  }

  .select-wrapper.secondary .select-trigger:focus {
    @apply ring-gray-500 border-gray-500;
  }

  .select-wrapper.success .select-trigger:focus {
    @apply ring-green-500 border-green-500;
  }

  .select-wrapper.warning .select-trigger:focus {
    @apply ring-yellow-500 border-yellow-500;
  }

  .select-wrapper.error .select-trigger:focus {
    @apply ring-red-500 border-red-500;
  }

  .select-wrapper.info .select-trigger:focus {
    @apply ring-blue-400 border-blue-400;
  }

  /* States */
  .select-wrapper.disabled .select-trigger {
    @apply bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 
           cursor-not-allowed opacity-60;
  }

  .select-wrapper.error .select-trigger {
    @apply border-red-500 dark:border-red-400;
  }

  .select-wrapper.open .select-trigger {
    @apply ring-2 border-transparent;
  }
</style>
