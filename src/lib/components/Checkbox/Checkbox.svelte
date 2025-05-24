<!-- Reusable Checkbox Component with multiple variants -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// TypeScript types
	type CheckboxVariant = 'standard' | 'outlined' | 'filled' | 'modern' | 'neon' | 'glass';
	type CheckboxSize = 'sm' | 'md' | 'lg' | 'xl';
	type CheckboxAnimation = 'none' | 'scale' | 'bounce' | 'slide';

	// Props with TypeScript types
	export let checked: boolean = false;
	export let variant: CheckboxVariant = 'standard';
	export let size: CheckboxSize = 'md';
	export let animation: CheckboxAnimation = 'scale';
	export let label: string = '';
	export let description: string = '';
	export let name: string = '';
	export let id: string = name || Math.random().toString(36).substring(2);
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let value: string = '';
	export let indeterminate: boolean = false;
	export let error: string = '';
	export let color: string = 'blue';

	// Internal state
	let checkboxElement: HTMLInputElement;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// Handle change event
	function handleChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
		dispatch('change', { checked, value, event });
	}

	// Size classes
	$: sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6',
		xl: 'w-7 h-7',
	};

	$: labelSizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
	};

	// Variant classes
	$: variantClasses = {
		standard: `border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded 
			checked:bg-${color}-600 checked:border-${color}-600 
			focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`,
		outlined: `border-2 border-${color}-400 bg-transparent rounded 
			checked:bg-${color}-100 dark:checked:bg-${color}-900 checked:border-${color}-600
			focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`,
		filled: `border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded 
			checked:bg-${color}-600 checked:border-${color}-600
			focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`,
		modern: `border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm
			checked:bg-gradient-to-r checked:from-${color}-500 checked:to-${color}-600 checked:border-${color}-600
			focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 hover:shadow-md transition-all`,
		neon: `border-2 border-${color}-400 bg-transparent rounded 
			checked:bg-${color}-500 checked:border-${color}-400 checked:shadow-lg checked:shadow-${color}-500/50
			focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 hover:shadow-md hover:shadow-${color}-500/25 transition-all`,
		glass: `border-2 border-white/30 dark:border-gray-600/30 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded
			checked:bg-${color}-500/80 checked:border-${color}-400
			focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`,
	};

	// Animation classes
	$: animationClasses = {
		none: '',
		scale: 'transform transition-transform duration-150 checked:scale-110',
		bounce: 'transform transition-all duration-200 checked:animate-bounce',
		slide: 'transform transition-all duration-200 checked:translate-x-0.5',
	};

	// Disabled classes
	$: disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

	// Error classes
	$: errorClasses = error ? `border-red-500 focus:ring-red-500` : '';

	// Combined classes
	$: checkboxClasses = [
		'transition-all duration-200',
		sizeClasses[size],
		variantClasses[variant],
		animationClasses[animation],
		disabledClasses,
		errorClasses,
	]
		.filter(Boolean)
		.join(' ');

	// Set indeterminate state
	$: if (checkboxElement) {
		checkboxElement.indeterminate = indeterminate;
	}
</script>

<div class="flex items-start gap-3">
	<!-- Checkbox Input -->
	<div class="relative flex items-center">
		<input
			bind:this={checkboxElement}
			type="checkbox"
			{id}
			{name}
			{value}
			{disabled}
			{required}
			bind:checked
			class={checkboxClasses}
			on:change={handleChange}
			on:focus
			on:blur
		/>
		
		<!-- Custom checkmark for better styling -->
		{#if checked && !indeterminate}
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<svg 
					class="w-3 h-3 text-white fill-current transform transition-transform duration-150 scale-110" 
					viewBox="0 0 20 20"
				>
					<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
				</svg>
			</div>
		{:else if indeterminate}
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div class="w-2.5 h-0.5 bg-white rounded-full"></div>
			</div>
		{/if}
	</div>

	<!-- Label and Description -->
	{#if label || description || $$slots.default}
		<div class="flex-1">
			{#if label}
				<label 
					for={id} 
					class="block font-medium text-gray-900 dark:text-white {labelSizeClasses[size]} {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}"
				>
					{label}
					{#if required}
						<span class="text-red-500 ml-1">*</span>
					{/if}
				</label>
			{/if}
			
			{#if description}
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 {disabled ? 'opacity-50' : ''}">
					{description}
				</p>
			{/if}
			
			<!-- Slot for custom content -->
			{#if $$slots.default}
				<div class="mt-1 {disabled ? 'opacity-50' : ''}">
					<slot />
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Error Message -->
{#if error}
	<p class="text-sm text-red-600 dark:text-red-400 mt-1 ml-8">
		{error}
	</p>
{/if}

<style>
	/* Remove default checkbox appearance */
	input[type="checkbox"] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
</style>
