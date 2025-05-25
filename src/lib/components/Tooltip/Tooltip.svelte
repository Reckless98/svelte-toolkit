<!-- Reusable Tooltip Component -->
<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	// TypeScript types
	type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
	type TooltipVariant = 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success' | 'info' | 'glass' | 'minimal';
	type TooltipSize = 'sm' | 'md' | 'lg';
	type TooltipAnimation = 'fade' | 'fly' | 'scale' | 'none';

	// Props
	export let content: string = '';
	export let position: TooltipPosition = 'top';
	export let variant: TooltipVariant = 'default';
	export let size: TooltipSize = 'md';
	export let delay: number = 200;
	export let duration: number = 200;
	export let disabled: boolean = false;
	export let arrow: boolean = true;
	export let offset: number = 8;
	export let maxWidth: string = 'max-w-xs';
	export let multiline: boolean = false;
	export let interactive: boolean = false;
	export let trigger: 'hover' | 'click' | 'manual' = 'hover';
	export let open: boolean = false;

	// Internal state
	let tooltipElement: HTMLElement;
	let triggerElement: HTMLElement;
	let showTooltip: boolean = false;
	let timeoutId: number;
	let mounted = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		show: void;
		hide: void;
	}>();

	// Position calculations
	let tooltipStyle = '';

	// Variant classes
	const variantClasses = {
		default: 'bg-gray-900 text-white border-gray-700',
		dark: 'bg-black text-white border-gray-800',
		light: 'bg-white text-gray-900 border-gray-200 shadow-lg',
		error: 'bg-red-600 text-white border-red-500',
		warning: 'bg-yellow-500 text-black border-yellow-400',
		success: 'bg-green-600 text-white border-green-500',
		info: 'bg-blue-600 text-white border-blue-500',
		glass: 'bg-white/10 backdrop-blur-sm text-white border-white/20',
		minimal: 'bg-gray-800 text-white border-transparent shadow-none'
	};

	// Size classes
	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};

	// Arrow classes for each position
	const arrowClasses = {
		top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent',
		bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent',
		left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent',
		right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent',
		'top-start': 'bottom-[-6px] left-3 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent',
		'top-end': 'bottom-[-6px] right-3 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent',
		'bottom-start': 'top-[-6px] left-3 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent',
		'bottom-end': 'top-[-6px] right-3 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent',
		'left-start': 'right-[-6px] top-2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent',
		'left-end': 'right-[-6px] bottom-2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent',
		'right-start': 'left-[-6px] top-2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent',
		'right-end': 'left-[-6px] bottom-2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent'
	};

	// Get arrow border color based on variant
	function getArrowBorderColor(variant: TooltipVariant): string {
		const colorMap = {
			default: 'border-t-gray-900',
			dark: 'border-t-black',
			light: 'border-t-white',
			error: 'border-t-red-600',
			warning: 'border-t-yellow-500',
			success: 'border-t-green-600',
			info: 'border-t-blue-600',
			glass: 'border-t-white/10',
			minimal: 'border-t-gray-800'
		};
		return colorMap[variant] || colorMap.default;
	}

	// Show tooltip
	function show(): void {
		if (disabled || !content.trim()) return;
		
		clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			showTooltip = true;
			dispatch('show');
		}, delay);
	}

	// Hide tooltip
	function hide(): void {
		clearTimeout(timeoutId);
		if (!interactive || !showTooltip) {
			showTooltip = false;
			dispatch('hide');
		}
	}

	// Handle manual trigger
	function toggle(): void {
		if (showTooltip) {
			hide();
		} else {
			show();
		}
	}

	// Calculate tooltip position
	function calculatePosition(): void {
		if (!tooltipElement || !triggerElement) return;

		const triggerRect = triggerElement.getBoundingClientRect();
		const tooltipRect = tooltipElement.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		let top = 0;
		let left = 0;

		// Calculate position based on position prop
		switch (position) {
			case 'top':
				top = triggerRect.top - tooltipRect.height - offset;
				left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
				break;
			case 'bottom':
				top = triggerRect.bottom + offset;
				left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
				break;
			case 'left':
				top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
				left = triggerRect.left - tooltipRect.width - offset;
				break;
			case 'right':
				top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
				left = triggerRect.right + offset;
				break;
			case 'top-start':
				top = triggerRect.top - tooltipRect.height - offset;
				left = triggerRect.left;
				break;
			case 'top-end':
				top = triggerRect.top - tooltipRect.height - offset;
				left = triggerRect.right - tooltipRect.width;
				break;
			case 'bottom-start':
				top = triggerRect.bottom + offset;
				left = triggerRect.left;
				break;
			case 'bottom-end':
				top = triggerRect.bottom + offset;
				left = triggerRect.right - tooltipRect.width;
				break;
			case 'left-start':
				top = triggerRect.top;
				left = triggerRect.left - tooltipRect.width - offset;
				break;
			case 'left-end':
				top = triggerRect.bottom - tooltipRect.height;
				left = triggerRect.left - tooltipRect.width - offset;
				break;
			case 'right-start':
				top = triggerRect.top;
				left = triggerRect.right + offset;
				break;
			case 'right-end':
				top = triggerRect.bottom - tooltipRect.height;
				left = triggerRect.right + offset;
				break;
		}

		// Adjust for viewport boundaries
		if (left < 0) left = 8;
		if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 8;
		if (top < 0) top = 8;
		if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height - 8;

		tooltipStyle = `top: ${top}px; left: ${left}px;`;
	}

	// Handle clicks outside
	function handleClickOutside(event: MouseEvent): void {
		if (trigger === 'click' && showTooltip && tooltipElement && !tooltipElement.contains(event.target as Node) && !triggerElement.contains(event.target as Node)) {
			hide();
		}
	}

	// Reactive statement for manual control
	$: if (trigger === 'manual') {
		showTooltip = open;
	}

	// Update position when shown
	$: if (showTooltip && mounted) {
		setTimeout(calculatePosition, 10);
	}

	onMount(() => {
		mounted = true;
		if (trigger === 'click') {
			document.addEventListener('click', handleClickOutside);
		}
		
		return () => {
			clearTimeout(timeoutId);
			if (trigger === 'click') {
				document.removeEventListener('click', handleClickOutside);
			}
		};
	});

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<!-- Trigger wrapper -->
<div
	bind:this={triggerElement}
	class="inline-block relative"
	on:mouseenter={trigger === 'hover' ? show : undefined}
	on:mouseleave={trigger === 'hover' ? hide : undefined}
	on:click={trigger === 'click' ? toggle : undefined}
	on:keydown={trigger === 'click'
		? (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggle();
			}
		}
		: undefined
	}
	role="button"
	tabindex="0"
	aria-describedby={showTooltip ? 'tooltip' : undefined}
>
	<slot />
</div>

<!-- Tooltip -->
{#if showTooltip && content.trim()}
	<div
		bind:this={tooltipElement}
		id="tooltip"
		class="fixed z-50 pointer-events-none {variantClasses[variant]} {sizeClasses[size]} {maxWidth} rounded-lg border {multiline ? 'whitespace-normal' : 'whitespace-nowrap'}"
		class:pointer-events-auto={interactive}
		style={tooltipStyle}
		role="tooltip"
		aria-hidden="false"
		on:mouseenter={interactive ? () => clearTimeout(timeoutId) : undefined}
		on:mouseleave={interactive ? hide : undefined}
		transition:fade={{ duration }}
	>
		<!-- Tooltip content -->
		<div class="relative">
			{content}
			
			<!-- Arrow -->
			{#if arrow}
				<div
					class="absolute {arrowClasses[position]} {getArrowBorderColor(variant)}"
					style="border-color: inherit;"
				></div>
			{/if}
		</div>
	</div>
{/if}
