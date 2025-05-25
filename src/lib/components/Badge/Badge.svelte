<script context="module" lang="ts">
	// Type definitions
	export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
	export type BadgeSize = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Props
	export let variant: BadgeVariant = 'default';
	export let size: BadgeSize = 'md';
	export let outline: boolean = false;
	export let removable: boolean = false;
	export let icon: string = '';
	export let href: string = '';
	export let ariaLabel: string = '';
	
	// Allow custom CSS classes
	let className: string = '';
	export { className as class };

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		remove: void;
		click: MouseEvent | KeyboardEvent;
	}>();

	const handleRemove = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (removable) {
			dispatch('remove');
		}
	};

	const handleClick = (event: MouseEvent) => {
		if (!href) {
			dispatch('click', event);
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			dispatch('click', event);
		}
	};

	$: variantClasses = {
		default: outline 
			? 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600' 
			: 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800',
		success: outline 
			? 'bg-green-50 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700' 
			: 'bg-green-500 text-white dark:bg-green-600',
		warning: outline 
			? 'bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' 
			: 'bg-yellow-500 text-white dark:bg-yellow-600',
		error: outline 
			? 'bg-red-50 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700' 
			: 'bg-red-500 text-white dark:bg-red-600',
		info: outline 
			? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700' 
			: 'bg-blue-500 text-white dark:bg-blue-600'
	};

	$: sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-sm',
		lg: 'px-3 py-1.5 text-base'
	};	$: badgeClasses = `
		inline-flex items-center gap-1 font-medium rounded-full transition-all duration-200
		${variantClasses[variant]}
		${sizeClasses[size]}
		${outline ? 'border' : ''}
		${href ? 'hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : ''}
		${removable ? 'pr-1' : ''}
		${className}
	`.trim();

	// Generate unique ID for accessibility
	const badgeId = `badge-${Math.random().toString(36).substr(2, 9)}`;
</script>

{#if href}
	<a 
		{href} 
		class={badgeClasses}
		id={badgeId}
		aria-label={ariaLabel || undefined}
		on:click={handleClick}
		tabindex="0"
	>
		{#if icon}
			<span class="text-current" aria-hidden="true">{icon}</span>
		{/if}
		<slot />
		{#if removable}
			<button
				type="button"
				class="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
				on:click={handleRemove}
				aria-label="Remove badge"
				tabindex="0"
			>
				<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
			</button>
		{/if}
	</a>
{:else}
	<span 
		class={badgeClasses}
		id={badgeId}
		aria-label={ariaLabel || undefined}
		on:click={handleClick}
		on:keydown={handleKeydown}
		role={removable || $$restProps.onclick ? 'button' : 'status'}
		tabindex={removable || $$restProps.onclick ? 0 : -1}
	>
		{#if icon}
			<span class="text-current" aria-hidden="true">{icon}</span>
		{/if}
		<slot />
		{#if removable}
			<button
				type="button"
				class="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
				on:click={handleRemove}
				aria-label="Remove badge"
				tabindex="0"
			>
				<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
			</button>
		{/if}
	</span>
{/if}
