<!-- Reusable Accordion Component -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// TypeScript types
	interface AccordionItem {
		id: string;
		title: string;
		content?: string;
		disabled?: boolean;
		icon?: string;
		badge?: string | number;
	}

	type AccordionVariant = 'default' | 'bordered' | 'elevated' | 'minimal' | 'modern' | 'glass';
	type AccordionSize = 'sm' | 'md' | 'lg';
	type AccordionAnimation = 'slide' | 'fade' | 'none';

	// Props
	export let items: AccordionItem[] = [];
	export let variant: AccordionVariant = 'default';
	export let size: AccordionSize = 'md';
	export let animation: AccordionAnimation = 'slide';
	export let multiple: boolean = false;
	export let collapsible: boolean = true;
	export let disabled: boolean = false;
	export let defaultOpen: string[] = [];
	export let rounded: boolean = true;
	export let showChevron: boolean = true;
	export let duration: number = 300;

	// Internal state
	let openItems: Set<string> = new Set(defaultOpen);

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		toggle: { id: string; open: boolean };
		change: { openItems: string[] };
	}>();

	// Variant classes
	const variantClasses = {
		default: 'bg-white border border-gray-200',
		bordered: 'bg-white border-2 border-gray-300',
		elevated: 'bg-white border border-gray-200 shadow-lg',
		minimal: 'bg-transparent border-0',
		modern: 'bg-white border border-gray-100 shadow-sm',
		glass: 'bg-white/80 backdrop-blur-sm border border-white/20'
	};

	// Header variant classes
	const headerVariantClasses = {
		default: 'hover:bg-gray-50',
		bordered: 'hover:bg-gray-50',
		elevated: 'hover:bg-gray-50',
		minimal: 'hover:bg-gray-100/50',
		modern: 'hover:bg-blue-50',
		glass: 'hover:bg-white/60'
	};

	// Size classes
	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	};

	// Header size classes
	const headerSizeClasses = {
		sm: 'px-3 py-2',
		md: 'px-4 py-3',
		lg: 'px-6 py-4'
	};

	// Content size classes
	const contentSizeClasses = {
		sm: 'px-3 pb-2',
		md: 'px-4 pb-3',
		lg: 'px-6 pb-4'
	};

	// Toggle item
	function toggleItem(id: string, itemDisabled: boolean = false): void {
		if (disabled || itemDisabled) return;

		const wasOpen = openItems.has(id);
		
		if (multiple) {
			// Multiple items can be open
			if (wasOpen) {
				if (collapsible) {
					openItems.delete(id);
				}
			} else {
				openItems.add(id);
			}
		} else {
			// Only one item can be open
			if (wasOpen && collapsible) {
				openItems.clear();
			} else {
				openItems.clear();
				openItems.add(id);
			}
		}

		// Update reactive state
		openItems = new Set(openItems);

		dispatch('toggle', { id, open: openItems.has(id) });
		dispatch('change', { openItems: Array.from(openItems) });
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent, id: string, itemDisabled: boolean = false): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleItem(id, itemDisabled);
		}
	}

	// Check if item is open
	$: isOpen = (id: string) => openItems.has(id);
</script>

<div 
	class="accordion {sizeClasses[size]} {rounded ? 'rounded-lg' : ''} overflow-hidden"
	class:opacity-50={disabled}
	role="presentation"
>
	{#each items as item, index}
		<div 
			class="accordion-item {variantClasses[variant]} {index > 0 ? 'border-t-0' : ''}"
			class:border-b-0={index === items.length - 1}
		>
			<!-- Accordion header -->
			<button
				type="button"
				class="accordion-header w-full text-left {headerSizeClasses[size]} {headerVariantClasses[variant]} transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
				class:cursor-not-allowed={disabled || item.disabled}
				class:opacity-50={item.disabled}
				disabled={disabled || item.disabled}
				aria-expanded={isOpen(item.id)}
				aria-controls="content-{item.id}"
				on:click={() => toggleItem(item.id, item.disabled)}
				on:keydown={(e) => handleKeydown(e, item.id, item.disabled)}
			>
				<div class="flex items-center space-x-3 flex-1 min-w-0">
					<!-- Icon -->
					{#if item.icon}
						<span class="flex-shrink-0 text-lg" aria-hidden="true">
							{item.icon}
						</span>
					{/if}

					<!-- Title -->
					<span class="font-medium text-gray-900 dark:text-gray-100 truncate">
						{item.title}
					</span>

					<!-- Badge -->
					{#if item.badge}
						<span class="flex-shrink-0 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
							{item.badge}
						</span>
					{/if}
				</div>

				<!-- Chevron -->
				{#if showChevron}
					<svg 
						class="flex-shrink-0 h-5 w-5 text-gray-500 transform transition-transform duration-200 {isOpen(item.id) ? 'rotate-180' : ''}"
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
						aria-hidden="true"
					>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							stroke-width="2" 
							d="M19 9l-7 7-7-7" 
						/>
					</svg>
				{/if}
			</button>

			<!-- Accordion content -->
			{#if isOpen(item.id)}
				<div
					id="content-{item.id}"
					class="accordion-content"
					role="region"
					aria-labelledby="header-{item.id}"
					transition:slide={{ duration, easing: quintOut }}
				>
					<div class="{contentSizeClasses[size]} text-gray-600 dark:text-gray-300">
						{#if item.content}
							<p>{item.content}</p>
						{:else}
							<slot name="content" {item} />
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.accordion {
		transition: all 0.2s ease;
	}

	.accordion-item:first-child .accordion-header {
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}

	.accordion-item:last-child .accordion-header {
		border-bottom-left-radius: inherit;
		border-bottom-right-radius: inherit;
	}

	.accordion-item:last-child .accordion-content {
		border-bottom-left-radius: inherit;
		border-bottom-right-radius: inherit;
	}
</style>
