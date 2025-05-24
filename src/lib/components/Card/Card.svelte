<script>
	import { createEventDispatcher } from 'svelte';
	import clsx from 'clsx';

	// Props
	export let variant = 'standard';
	export let title = '';
	export let subtitle = '';
	export let image = null;
	export let imageAlt = '';
	export let hoverEffect = 'none';
	export let clickable = false;
	export let padding = 'normal';
	export let borderRadius = 'lg';

	const dispatch = createEventDispatcher();

	// Base classes
	const baseClasses = 'relative overflow-hidden transition-all duration-300';

	// Variant classes
	const variantClasses = {
		standard: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
		elevated: 'bg-white dark:bg-gray-800 shadow-lg',
		outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
		glass: 'bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30',
		neon: 'bg-gray-900 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
		morphic: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]',
		gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30'
	};

	// Hover effect classes
	const hoverEffectClasses = {
		none: '',
		lift: 'hover:-translate-y-2 hover:shadow-xl',
		scale: 'hover:scale-105',
		glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
		tilt: 'hover:rotate-1'
	};

	// Padding classes
	const paddingClasses = {
		none: '',
		small: 'p-4',
		normal: 'p-6',
		large: 'p-8'
	};

	// Border radius classes
	const borderRadiusClasses = {
		none: '',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		full: 'rounded-full'
	};

	// Computed classes
	$: cardClasses = clsx(
		baseClasses,
		variantClasses[variant],
		hoverEffectClasses[hoverEffect],
		paddingClasses[padding],
		borderRadiusClasses[borderRadius],
		clickable && 'cursor-pointer',
		$$props.class
	);

	// Handle click
	function handleClick(event) {
		if (clickable) {
			dispatch('click', event);
		}
	}
</script>

<article 
	class={cardClasses}
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick(e)}
	role={clickable ? 'button' : 'article'}
	tabindex={clickable ? 0 : -1}
>
	{#if image}
		<div class="relative -mx-6 -mt-6 mb-6 aspect-video overflow-hidden">
			<img 
				src={image} 
				alt={imageAlt || title}
				class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
			/>
			{#if variant === 'neon'}
				<div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
			{/if}
		</div>
	{/if}

	{#if title || subtitle}
		<header class="mb-4">
			{#if subtitle}
				<p class="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
					{subtitle}
				</p>
			{/if}
			{#if title}
				<h3 class="text-xl font-bold text-gray-900 dark:text-white">
					{title}
				</h3>
			{/if}
		</header>
	{/if}

	<div class="text-gray-600 dark:text-gray-300">
		<slot />
	</div>

	{#if $$slots.footer}
		<footer class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
			<slot name="footer" />
		</footer>
	{/if}

	{#if variant === 'neon'}
		<div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
	{/if}
</article>

<style>
	@keyframes tilt {
		0%, 100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(1deg);
		}
		75% {
			transform: rotate(-1deg);
		}
	}

	.hover\:rotate-1:hover {
		animation: tilt 0.3s ease-in-out;
	}
</style>
