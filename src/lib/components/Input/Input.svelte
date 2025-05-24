<!-- Reusable Input Component with multiple variants -->
<script>
  import { createEventDispatcher } from 'svelte';
    // Props
  export let type = 'text'; // text, password, email, number, search, etc.
  export let variant = 'standard'; // standard, outlined, filled, floating, glass, underlined, modern, neon
  export let value = '';
  export let placeholder = '';
  export let label = '';
  export let name = '';
  export let id = name || Math.random().toString(36).substring(2);
  export let disabled = false;
  export let readonly = false;
  export let required = false;
  export let error = '';
  export let success = '';
  export let icon = '';
  export let iconPosition = 'left'; // left, right
  export let helper = '';
  export let size = 'md'; // xs, sm, md, lg, xl
  export let min = '';
  export let max = '';
  export let step = '';
  export let autocomplete = '';
  export let width = 'w-full';
  export let loading = false;
  export let rounded = 'md'; // none, sm, md, lg, xl, full
  export let animation = 'none'; // none, pulse, glow, float
  
  // Internal state
  let focused = false;
  let touched = false;
  let inputElement;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Handle focus event
  function handleFocus(event) {
    focused = true;
    dispatch('focus', event);
  }
  
  // Handle blur event
  function handleBlur(event) {
    focused = false;
    touched = true;
    dispatch('blur', event);
  }
  
  // Handle change event
  function handleChange(event) {
    value = event.target.value;
    dispatch('change', event);
  }
  
  // Handle input event
  function handleInput(event) {
    value = event.target.value;
    dispatch('input', event);
  }
    // Size classes
  $: sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-5 py-4 text-xl'
  };
  
  // Variant classes
  $: variantClasses = {
    standard: `bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-${rounded}`,
    outlined: `bg-transparent border-2 border-gray-300 dark:border-gray-700 rounded-${rounded} hover:border-blue-400 transition-colors`,
    filled: `bg-gray-50 dark:bg-gray-900 border border-transparent rounded-${rounded} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`,
    floating: `bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-${rounded}`,
    glass: `backdrop-blur-md bg-white/20 dark:bg-gray-900/30 border border-white/30 dark:border-gray-800/30 rounded-${rounded} shadow-lg`,
    underlined: 'bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-700 rounded-none px-0 focus:border-blue-500',
    modern: `bg-gray-50 dark:bg-gray-900 border-2 border-transparent rounded-${rounded} shadow-sm hover:shadow-md transition-all duration-200`,
    neon: `bg-gray-900 border-2 border-cyan-400 rounded-${rounded} text-cyan-100 shadow-lg shadow-cyan-400/20 focus:shadow-cyan-400/40`
  };
    // Focus classes
  $: focusClasses = error 
    ? 'focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900' 
    : success 
      ? 'focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900' 
      : variant === 'neon'
        ? 'focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30'
        : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900';
  
  // Error/Success classes
  $: statusClasses = error 
    ? 'border-red-500 text-red-900' 
    : success 
      ? 'border-green-500 text-green-900' 
      : '';
  
  // Animation classes
  $: animationClasses = {
    none: '',
    pulse: 'focus:animate-pulse',
    glow: 'focus:shadow-lg focus:shadow-blue-500/25',
    float: 'hover:-translate-y-0.5 transition-transform'
  };
  
  // Disabled classes
  $: disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';
  
  // Combined classes
  $: inputClasses = [
    'w-full focus:outline-none transition-all duration-200 transform-gpu',
    sizeClasses[size],
    variantClasses[variant],
    focusClasses,
    statusClasses,
    disabledClasses,
    animationClasses[animation],
    icon && iconPosition === 'left' ? 'pl-10' : '',
    icon && iconPosition === 'right' ? 'pr-10' : '',
    variant === 'modern' ? 'focus:bg-white dark:focus:bg-gray-800' : ''
  ].filter(Boolean).join(' ');
  
  // Floating label style
  $: labelFloating = variant === 'floating' && (focused || value);
</script>

<div class="{width} relative">
  <!-- Label (non-floating) -->
  {#if label && variant !== 'floating'}
    <label for={id} class="block text-sm font-medium mb-1">
      {label}{required ? ' *' : ''}
    </label>
  {/if}
  
  <div class="relative">
    <!-- Icon (left) -->
    {#if icon && iconPosition === 'left'}
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        {@html icon}
      </div>
    {/if}
    
    <!-- Loading spinner (right) -->
    {#if loading}
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {/if}
    
    <!-- Icon (right) -->
    {#if icon && iconPosition === 'right' && !loading}
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        {@html icon}
      </div>
    {/if}
    
    <!-- Input element -->
    <input
      bind:this={inputElement}
      {type}
      {id}
      {name}
      {placeholder}
      {autocomplete}
      {disabled}
      {readonly}
      {required}
      value={value}
      class={inputClasses}
      min={type === 'number' || type === 'date' ? min : null}
      max={type === 'number' || type === 'date' ? max : null}
      step={type === 'number' ? step : null}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:change={handleChange}
      on:input={handleInput}
    />
    
    <!-- Floating label -->
    {#if label && variant === 'floating'}
      <label 
        for={id} 
        class="absolute transition-all duration-200 pointer-events-none {labelFloating ? '-top-2 left-2 text-xs bg-white dark:bg-gray-800 px-1' : 'top-1/2 transform -translate-y-1/2 left-3'}"
      >
        {label}{required ? ' *' : ''}
      </label>
    {/if}
  </div>
  
  <!-- Helper text / Error message / Success message -->
  {#if error || success || helper}
    <div class="mt-1 text-sm">
      {#if error}
        <p class="text-red-600 dark:text-red-500">{error}</p>
      {:else if success}
        <p class="text-green-600 dark:text-green-500">{success}</p>
      {:else if helper}
        <p class="text-gray-500 dark:text-gray-400">{helper}</p>
      {/if}
    </div>
  {/if}
</div>
