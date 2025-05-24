<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	
	export let value: string = '';
	export let placeholder: string = 'Search...';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'filled' | 'ghost' = 'default';
	export let showClearButton: boolean = true;
	export let loading: boolean = false;
	export let suggestions: string[] = [];
	export let maxSuggestions: number = 5;
	export let debounceMs: number = 300;
	export let disabled: boolean = false;
	export let fullWidth: boolean = true;
	
	const dispatch = createEventDispatcher();
	
	let inputElement: HTMLInputElement;
	let showSuggestions = false;
	let selectedSuggestion = -1;
	let debounceTimer: ReturnType<typeof setTimeout>;
	
	$: filteredSuggestions = suggestions
		.filter(s => s.toLowerCase().includes(value.toLowerCase()))
		.slice(0, maxSuggestions);
	
	$: sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-5 py-3 text-lg'
	}[size];
	
	$: variantClasses = {
		default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
		filled: 'border-0 bg-gray-100 dark:bg-gray-700',
		ghost: 'border-0 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
	}[variant];
	
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		selectedSuggestion = -1;
		
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			dispatch('search', { value });
		}, debounceMs);
		
		showSuggestions = value.length > 0 && filteredSuggestions.length > 0;
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (!showSuggestions) return;
		
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedSuggestion = Math.min(selectedSuggestion + 1, filteredSuggestions.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedSuggestion = Math.max(selectedSuggestion - 1, -1);
				break;
			case 'Enter':
				event.preventDefault();
				if (selectedSuggestion >= 0) {
					selectSuggestion(filteredSuggestions[selectedSuggestion]);
				} else {
					dispatch('submit', { value });
				}
				break;
			case 'Escape':
				showSuggestions = false;
				selectedSuggestion = -1;
				break;
		}
	}
	
	function selectSuggestion(suggestion: string) {
		value = suggestion;
		showSuggestions = false;
		selectedSuggestion = -1;
		dispatch('select', { value: suggestion });
		dispatch('search', { value: suggestion });
	}
	
	function clearSearch() {
		value = '';
		showSuggestions = false;
		selectedSuggestion = -1;
		inputElement?.focus();
		dispatch('clear');
		dispatch('search', { value: '' });
	}
	
	function handleBlur() {
		// Delay hiding suggestions to allow for clicks
		setTimeout(() => {
			showSuggestions = false;
			selectedSuggestion = -1;
		}, 150);
	}
</script>

<div class="relative {fullWidth ? 'w-full' : ''}">
	<div class="relative">
		<!-- Search Icon -->
		<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
			{#if loading}
				<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
			{:else}
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			{/if}
		</div>
		
		<!-- Input Field -->
		<input
			bind:this={inputElement}
			bind:value
			type="text"
			{placeholder}
			{disabled}
			class="
				{sizeClasses}
				{variantClasses}
				pl-10
				{showClearButton && value ? 'pr-10' : 'pr-4'}
				rounded-lg
				{fullWidth ? 'w-full' : ''}
				text-gray-900 dark:text-white
				placeholder-gray-500 dark:placeholder-gray-400
				focus:ring-2 focus:ring-blue-500 focus:border-blue-500
				disabled:opacity-50 disabled:cursor-not-allowed
				transition-all duration-200
			"
			on:input={handleInput}
			on:keydown={handleKeydown}
			on:focus={() => showSuggestions = value.length > 0 && filteredSuggestions.length > 0}
			on:blur={handleBlur}
		/>
		
		<!-- Clear Button -->
		{#if showClearButton && value && !disabled}
			<button
				type="button"
				class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
				on:click={clearSearch}
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
	
	<!-- Suggestions Dropdown -->
	{#if showSuggestions}
		<div 
			class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
			transition:fly={{ y: -10, duration: 200 }}
		>
			{#each filteredSuggestions as suggestion, index}
				<button
					type="button"
					class="
						w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700
						{index === selectedSuggestion ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}
						{index === 0 ? 'rounded-t-lg' : ''}
						{index === filteredSuggestions.length - 1 ? 'rounded-b-lg' : ''}
						transition-colors duration-150
					"
					on:click={() => selectSuggestion(suggestion)}
				>
					{suggestion}
				</button>
			{/each}
		</div>
	{/if}
</div>
