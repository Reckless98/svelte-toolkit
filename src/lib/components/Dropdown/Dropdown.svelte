<!-- Reusable Dropdown Component -->
<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// TypeScript types
	interface DropdownItem {
		id: string;
		label: string;
		value?: any;
		icon?: string;
		disabled?: boolean;
		divider?: boolean;
		href?: string;
		action?: () => void;
		children?: DropdownItem[];
	}

	type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
	type DropdownVariant = 'default' | 'minimal' | 'bordered' | 'elevated' | 'glass' | 'dark';
	type DropdownSize = 'sm' | 'md' | 'lg';
	type DropdownAnimation = 'fade' | 'fly' | 'scale' | 'slide';
	type DropdownTrigger = 'click' | 'hover' | 'manual';

	// Props
	export let items: DropdownItem[] = [];
	export let position: DropdownPosition = 'bottom-start';
	export let variant: DropdownVariant = 'default';
	export let size: DropdownSize = 'md';
	export let animation: DropdownAnimation = 'fly';
	export let trigger: DropdownTrigger = 'click';
	export let disabled: boolean = false;
	export let closeOnSelect: boolean = true;
	export let closeOnClickOutside: boolean = true;
	export let offset: number = 4;
	export let maxHeight: string = 'max-h-64';
	export let searchable: boolean = false;
	export let placeholder: string = 'Search...';
	export let open: boolean = false;
	export let loading: boolean = false;
	export let emptyMessage: string = 'No items found';

	// Internal state
	let dropdownElement: HTMLElement;
	let triggerElement: HTMLElement;
	let searchInput: HTMLInputElement;
	let searchTerm: string = '';
	let selectedIndex: number = -1;
	let mounted = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		select: { item: DropdownItem };
		open: void;
		close: void;
		search: { term: string };
	}>();

	// Position calculation
	let dropdownStyle = '';

	// Variant classes
	const variantClasses = {
		default: 'bg-white border border-gray-200 shadow-lg',
		minimal: 'bg-white border border-gray-100 shadow-sm',
		bordered: 'bg-white border-2 border-gray-300 shadow-md',
		elevated: 'bg-white border border-gray-200 shadow-xl',
		glass: 'bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg',
		dark: 'bg-gray-800 border border-gray-700 shadow-lg text-white'
	};

	// Size classes
	const sizeClasses = {
		sm: 'py-1 text-sm min-w-32',
		md: 'py-2 text-base min-w-40',
		lg: 'py-3 text-lg min-w-48'
	};

	// Item size classes
	const itemSizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-5 py-3 text-lg'
	};

	// Filter items based on search
	$: filteredItems = searchable && searchTerm
		? items.filter(item => 
			item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(item.value && item.value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
		)
		: items;

	// Animation properties
	$: animationProps = getAnimationProps(animation, position);

	function getAnimationProps(anim: DropdownAnimation, pos: DropdownPosition) {
		switch (anim) {
			case 'fly':
				return {
					y: pos.startsWith('top') ? 10 : -10,
					duration: 200,
					easing: quintOut
				};
			case 'scale':
				return {
					start: 0.95,
					duration: 150,
					easing: quintOut
				};
			case 'fade':
				return { duration: 150 };
			default:
				return { duration: 0 };
		}
	}

	// Show dropdown
	function show(): void {
		if (disabled) return;
		open = true;
		selectedIndex = -1;
		dispatch('open');
		
		if (searchable) {
			setTimeout(() => searchInput?.focus(), 10);
		}
		
		if (mounted) {
			setTimeout(calculatePosition, 10);
		}
	}

	// Hide dropdown
	function hide(): void {
		open = false;
		searchTerm = '';
		selectedIndex = -1;
		dispatch('close');
	}

	// Toggle dropdown
	function toggle(): void {
		if (open) {
			hide();
		} else {
			show();
		}
	}

	// Handle item selection
	function selectItem(item: DropdownItem): void {
		if (item.disabled) return;

		if (item.action) {
			item.action();
		}

		dispatch('select', { item });

		if (closeOnSelect) {
			hide();
		}
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent): void {
		if (!open) return;

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				hide();
				break;
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				break;
			case 'Enter':
				event.preventDefault();
				if (selectedIndex >= 0 && filteredItems[selectedIndex]) {
					selectItem(filteredItems[selectedIndex]);
				}
				break;
		}
	}

	// Handle clicks outside
	function handleClickOutside(event: MouseEvent): void {
		if (closeOnClickOutside && open && dropdownElement && !dropdownElement.contains(event.target as Node) && !triggerElement.contains(event.target as Node)) {
			hide();
		}
	}

	// Calculate dropdown position
	function calculatePosition(): void {
		if (!dropdownElement || !triggerElement) return;

		const triggerRect = triggerElement.getBoundingClientRect();
		const dropdownRect = dropdownElement.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		let top = 0;
		let left = 0;

		// Calculate based on position
		switch (position) {
			case 'bottom-start':
				top = triggerRect.bottom + offset;
				left = triggerRect.left;
				break;
			case 'bottom-end':
				top = triggerRect.bottom + offset;
				left = triggerRect.right - dropdownRect.width;
				break;
			case 'top-start':
				top = triggerRect.top - dropdownRect.height - offset;
				left = triggerRect.left;
				break;
			case 'top-end':
				top = triggerRect.top - dropdownRect.height - offset;
				left = triggerRect.right - dropdownRect.width;
				break;
			case 'left-start':
				top = triggerRect.top;
				left = triggerRect.left - dropdownRect.width - offset;
				break;
			case 'left-end':
				top = triggerRect.bottom - dropdownRect.height;
				left = triggerRect.left - dropdownRect.width - offset;
				break;
			case 'right-start':
				top = triggerRect.top;
				left = triggerRect.right + offset;
				break;
			case 'right-end':
				top = triggerRect.bottom - dropdownRect.height;
				left = triggerRect.right + offset;
				break;
		}

		// Adjust for viewport boundaries
		if (left < 8) left = 8;
		if (left + dropdownRect.width > viewportWidth - 8) {
			left = viewportWidth - dropdownRect.width - 8;
		}
		if (top < 8) top = 8;
		if (top + dropdownRect.height > viewportHeight - 8) {
			top = viewportHeight - dropdownRect.height - 8;
		}

		dropdownStyle = `top: ${top}px; left: ${left}px;`;
	}

	// Handle search
	function handleSearch(): void {
		selectedIndex = -1;
		dispatch('search', { term: searchTerm });
	}

	// Handle manual trigger
	$: if (trigger === 'manual') {
		if (open && mounted) {
			setTimeout(calculatePosition, 10);
		}
	}

	onMount(() => {
		mounted = true;
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<!-- Trigger wrapper -->
<div
	bind:this={triggerElement}
	class="relative inline-block"
	on:click={trigger === 'click' ? toggle : undefined}
	on:mouseenter={trigger === 'hover' ? show : undefined}
	on:mouseleave={trigger === 'hover' ? hide : undefined}
	role="button"
	tabindex="0"
	aria-haspopup="true"
	aria-expanded={open}
	class:opacity-50={disabled}
	class:cursor-not-allowed={disabled}
>
	<slot name="trigger" {open} {toggle} />
</div>

<!-- Dropdown menu -->
{#if open}
	<div
		bind:this={dropdownElement}
		class="fixed z-50 rounded-lg {variantClasses[variant]} {sizeClasses[size]} {maxHeight} overflow-y-auto"
		style={dropdownStyle}
		role="menu"
		aria-orientation="vertical"
		transition:fade={animation === 'fade' ? animationProps : undefined}
		transition:fly={animation === 'fly' ? animationProps : undefined}
		transition:scale={animation === 'scale' ? animationProps : undefined}
		on:mouseenter={trigger === 'hover' ? () => {} : undefined}
		on:mouseleave={trigger === 'hover' ? hide : undefined}
	>
		<!-- Search input -->
		{#if searchable}
			<div class="p-2 border-b border-gray-200 dark:border-gray-700">
				<input
					bind:this={searchInput}
					bind:value={searchTerm}
					type="text"
					placeholder={placeholder}
					class="w-full px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600"
					on:input={handleSearch}
				/>
			</div>
		{/if}

		<!-- Loading state -->
		{#if loading}
			<div class="flex items-center justify-center p-4">
				<svg class="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			</div>
		{:else if filteredItems.length === 0}
			<!-- Empty state -->
			<div class="px-4 py-3 text-sm text-gray-500 text-center">
				{emptyMessage}
			</div>
		{:else}
			<!-- Dropdown items -->
			{#each filteredItems as item, index}
				{#if item.divider}
					<div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
				{:else}
					<button
						type="button"
						class="w-full text-left {itemSizeClasses[size]} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center justify-between {selectedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}"
						class:opacity-50={item.disabled}
						class:cursor-not-allowed={item.disabled}
						disabled={item.disabled}
						role="menuitem"
						on:click={() => selectItem(item)}
						on:mouseenter={() => selectedIndex = index}
					>
						<div class="flex items-center space-x-2">
							{#if item.icon}
								<span class="text-lg">{item.icon}</span>
							{/if}
							<span>{item.label}</span>
						</div>
						
						{#if item.children && item.children.length > 0}
							<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						{/if}
					</button>
				{/if}
			{/each}
		{/if}

		<!-- Custom content slot -->
		<slot name="content" />
	</div>
{/if}

<style>
	/* Custom scrollbar for dropdown */
	.overflow-y-auto::-webkit-scrollbar {
		width: 4px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: rgba(156, 163, 175, 0.5);
		border-radius: 2px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: rgba(156, 163, 175, 0.7);
	}
</style>
