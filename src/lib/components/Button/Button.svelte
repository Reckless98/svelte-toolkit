<script>
	import { createEventDispatcher } from 'svelte';
	import clsx from 'clsx';

	// Props
	export let variant = 'primary';
	export let size = 'md';
	export let animation = 'none';
	export let disabled = false;
	export let loading = false;
	/** @type {string | null} */
	export let href = null;
	/** @type {string | null} */
	export let target = null;
	/** @type {string | null} */
	export let rel = null;
	export let type = 'button';
	export let fullWidth = false;
	
	const dispatch = createEventDispatcher();

	// Base classes
	const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	// Size classes
	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm rounded-md',
		md: 'px-4 py-2 text-base rounded-lg',
		lg: 'px-6 py-3 text-lg rounded-xl',
		xl: 'px-8 py-4 text-xl rounded-2xl'
	};

	// Variant classes
	const variantClasses = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
		secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
		success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
		ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
		glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 focus:ring-white/50',
		neon: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
		morphic: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
		gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500'
	};

	// Animation classes
	const animationClasses = {
		none: '',
		pulse: 'animate-pulse',
		bounce: 'hover:animate-bounce',
		glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]',
		float: 'hover:-translate-y-1 hover:shadow-lg',
		scale: 'hover:scale-105 active:scale-95'
	};

	// Computed classes
	$: buttonClasses = clsx(
		baseClasses,
		sizeClasses[size],
		variantClasses[variant],
		animationClasses[animation],
		fullWidth && 'w-full',
		$$props.class
	);

	// Handle click
	function handleClick(event) {
		if (!disabled && !loading) {
			dispatch('click', event);
		}
	}
</script>

{#if href}
	<a
		{href}
		{target}
		{rel}
		class={buttonClasses}
		class:opacity-50={disabled || loading}
		class:cursor-not-allowed={disabled || loading}
		on:click={handleClick}
		{...$$restProps}
	>
		{#if loading}
			<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		<slot />
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={buttonClasses}
		on:click={handleClick}
		{...$$restProps}
	>
		{#if loading}
			<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		<slot />
	</button>
{/if}

<style>
	@keyframes glow {
		0%, 100% {
			box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
		}
		50% {
			box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
