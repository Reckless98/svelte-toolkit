<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	export let type: 'success' | 'warning' | 'error' | 'info' = 'info';
	export let title: string = '';
	export let dismissible: boolean = false;
	export let icon: boolean = true;
	export let variant: 'filled' | 'outlined' | 'subtle' = 'filled';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	
	let visible = true;
	
	const dismiss = () => {
		visible = false;
	};

	$: typeConfig = {
		success: {
			icon: '✓',
			colors: {
				filled: 'bg-green-500 text-white border-green-500',
				outlined: 'bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 border-green-500',
				subtle: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
			}
		},
		warning: {
			icon: '⚠',
			colors: {
				filled: 'bg-yellow-500 text-white border-yellow-500',
				outlined: 'bg-white dark:bg-gray-800 text-yellow-700 dark:text-yellow-400 border-yellow-500',
				subtle: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
			}
		},
		error: {
			icon: '✕',
			colors: {
				filled: 'bg-red-500 text-white border-red-500',
				outlined: 'bg-white dark:bg-gray-800 text-red-700 dark:text-red-400 border-red-500',
				subtle: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'
			}
		},
		info: {
			icon: 'ℹ',
			colors: {
				filled: 'bg-blue-500 text-white border-blue-500',
				outlined: 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 border-blue-500',
				subtle: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
			}
		}
	};

	$: sizeClasses = {
		sm: 'px-3 py-2 text-sm',
		md: 'px-4 py-3 text-base',
		lg: 'px-6 py-4 text-lg'
	};

	$: alertClasses = `
		border rounded-lg flex items-start gap-3 transition-all duration-200
		${typeConfig[type].colors[variant]}
		${sizeClasses[size]}
	`.trim();
</script>

{#if visible}
	<div
		class={alertClasses}
		role="alert"
		transition:fly={{ y: -20, duration: 300, easing: quintOut }}
	>
		{#if icon}
			<div class="flex-shrink-0 mt-0.5">
				<span class="font-bold text-lg">{typeConfig[type].icon}</span>
			</div>
		{/if}
		
		<div class="flex-1 min-w-0">
			{#if title}
				<h3 class="font-semibold mb-1">{title}</h3>
			{/if}
			<div class="leading-relaxed">
				<slot />
			</div>
		</div>
		
		{#if dismissible}
			<button
				type="button"
				class="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
				on:click={dismiss}
				aria-label="Dismiss alert"
			>
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
			</button>
		{/if}
	</div>
{/if}
