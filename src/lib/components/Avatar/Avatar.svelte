<!-- Reusable Avatar Component -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// TypeScript types
	type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type AvatarVariant = 'circular' | 'rounded' | 'square';
	type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

	// Props
	export let src: string = '';
	export let alt: string = '';
	export let size: AvatarSize = 'md';
	export let variant: AvatarVariant = 'circular';
	export let initials: string = '';
	export let name: string = '';
	export let status: AvatarStatus = 'none';
	export let badge: string | number = '';
	export let clickable: boolean = false;
	export let loading: boolean = false;
	export let fallbackIcon: boolean = true;
	export let borderColor: string = '';
	export let borderWidth: number = 0;

	// Internal state
	let imageError = false;
	let imageLoaded = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		click: { name: string; alt: string };
		imageLoad: void;
		imageError: void;
	}>();

	// Size classes
	const sizeClasses = {
		xs: 'w-6 h-6 text-xs',
		sm: 'w-8 h-8 text-sm',
		md: 'w-10 h-10 text-base',
		lg: 'w-12 h-12 text-lg',
		xl: 'w-16 h-16 text-xl',
		'2xl': 'w-20 h-20 text-2xl'
	};
	// Status indicator sizes (fixed positioning and sizing)
	const statusSizes = {
		xs: 'w-2 h-2',
		sm: 'w-2.5 h-2.5',
		md: 'w-3 h-3',
		lg: 'w-3.5 h-3.5',
		xl: 'w-4 h-4',
		'2xl': 'w-5 h-5'
	};

	// Badge sizes
	const badgeSizes = {
		xs: 'w-3 h-3 text-xs',
		sm: 'w-4 h-4 text-xs',
		md: 'w-5 h-5 text-xs',
		lg: 'w-6 h-6 text-sm',
		xl: 'w-8 h-8 text-sm',
		'2xl': 'w-10 h-10 text-base'
	};

	// Variant classes
	const variantClasses = {
		circular: 'rounded-full',
		rounded: 'rounded-lg',
		square: 'rounded-none'
	};
	// Status colors (enhanced contrast)
	const statusColors = {
		online: 'bg-green-500 border-white dark:border-gray-800',
		offline: 'bg-gray-400 border-white dark:border-gray-800',
		busy: 'bg-red-500 border-white dark:border-gray-800',
		away: 'bg-yellow-500 border-white dark:border-gray-800',
		none: ''
	};

	// Generate initials from name
	function generateInitials(name: string): string {
		if (!name) return '';
		const words = name.trim().split(' ');
		if (words.length === 1) {
			return words[0].charAt(0).toUpperCase();
		}
		return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
	}

	// Handle image load
	function handleImageLoad(): void {
		imageLoaded = true;
		imageError = false;
		dispatch('imageLoad');
	}

	// Handle image error
	function handleImageError(): void {
		imageError = true;
		imageLoaded = false;
		dispatch('imageError');
	}

	// Handle click
	function handleClick(): void {
		if (clickable) {
			dispatch('click', { name, alt });
		}
	}

	// Get display initials
	$: displayInitials = initials || generateInitials(name);

	// Generate background color from name/initials
	function getBackgroundColor(text: string): string {
		if (!text) return 'bg-gray-400';
		
		const colors = [
			'bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-yellow-400',
			'bg-lime-400', 'bg-green-400', 'bg-emerald-400', 'bg-teal-400',
			'bg-cyan-400', 'bg-sky-400', 'bg-blue-400', 'bg-indigo-400',
			'bg-violet-400', 'bg-purple-400', 'bg-fuchsia-400', 'bg-pink-400'
		];
		
		let hash = 0;
		for (let i = 0; i < text.length; i++) {
			hash = text.charCodeAt(i) + ((hash << 5) - hash);
		}
		
		return colors[Math.abs(hash) % colors.length];
	}

	$: backgroundColor = getBackgroundColor(displayInitials || name);
</script>

<div 
	class="avatar relative inline-flex items-center justify-center {sizeClasses[size]} {variantClasses[variant]} {backgroundColor} text-white font-medium select-none overflow-hidden {clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}"
	class:border-2={borderWidth === 2}
	class:border-4={borderWidth === 4}
	style={borderColor ? `border-color: ${borderColor}` : ''}
	role={clickable ? 'button' : 'img'}
	tabindex={clickable ? 0 : -1}
	aria-label={alt || name || 'Avatar'}
	on:click={handleClick}
	on:keydown={(e) => {
		if (clickable && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			handleClick();
		}
	}}
>
	<!-- Loading state -->
	{#if loading}
		<div class="animate-pulse bg-gray-300 w-full h-full {variantClasses[variant]}"></div>
	
	<!-- Image avatar -->
	{:else if src && !imageError}
		<img
			{src}
			{alt}
			class="w-full h-full object-cover {variantClasses[variant]}"
			on:load={handleImageLoad}
			on:error={handleImageError}
			loading="lazy"
		/>
	
	<!-- Initials or fallback -->
	{:else if displayInitials}
		<span class="font-medium">{displayInitials}</span>
	
	<!-- Fallback icon -->
	{:else if fallbackIcon}
		<svg class="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
		</svg>
	{/if}
	<!-- Status indicator -->
	{#if status !== 'none'}
		<div 
			class="absolute bottom-0 right-0 {statusSizes[size]} {statusColors[status]} rounded-full border-2 z-10"
			aria-label="Status: {status}"
		></div>
	{/if}
	<!-- Badge -->
	{#if badge}
		<div 
			class="absolute -top-1 -right-1 {badgeSizes[size]} bg-red-500 text-white rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center font-medium z-10"
			aria-label="Badge: {badge}"
		>
			{#if typeof badge === 'number' && badge > 99}
				99+
			{:else}
				{badge}
			{/if}
		</div>
	{/if}
</div>

<style>
	.avatar {
		transition: all 0.2s ease;
	}

	.avatar:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}
</style>
