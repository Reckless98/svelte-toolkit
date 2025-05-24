<!-- Enhanced Header Component with logo and dark mode support -->
<script>
	import { onMount } from 'svelte';
	import { fade, slide, fly } from 'svelte/transition';
	import { theme, THEMES } from '$lib/stores/theme.js';

	// Props
	export let variant = 'standard'; // standard, minimal, withSearch, animated, glass, gradient, floating
	export let logo = '/pnglogo.png';
	export let title = 'Svelte UI Toolkit';
	export let links = [
		{ text: 'Home', href: '/' },
		{ text: 'Explorer', href: '/explorer' },
		{ text: 'About', href: '/about' },
		{ text: 'Services', href: '/services' },
		{ text: 'Contact', href: '/contact' },
	];
	export let sticky = true;
	export let transparent = false;
	export let animated = true;
	export let withSearch = false;
	export let showBranding = true; // Show "Made by Reckless98"
	export let gradientDirection = 'to-r'; // Tailwind gradient directions
	export let borderRadius = 'xl'; // none, md, lg, xl, full
	/** @type {{ text: string; href: string; variant?: string } | null} */
	export let ctaButton = { text: 'Get Started', href: '/explorer', variant: 'primary' };

	// Internal state
	let isOpen = false;
	let isScrolled = false;
	let searchQuery = '';
	let currentTheme = THEMES.LIGHT;

	// Subscribe to theme changes
	theme.subscribe((value) => {
		currentTheme = value;
	});

	// Handle scroll for sticky header
	onMount(() => {
		if (sticky) {
			const handleScroll = () => {
				isScrolled = window.scrollY > 20;
			};

			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});

	// Handle search submit
	function handleSearchSubmit() {
		if (searchQuery.trim()) {
			console.log('Search query:', searchQuery);
			// Dispatch event or handle search
		}
	}
	// Toggle mobile menu
	function toggleMenu() {
		isOpen = !isOpen;
	}

	// Toggle theme
	function toggleTheme() {
		theme.toggle();
	}

	// Computed classes based on props and state
	$: isDarkMode = currentTheme === THEMES.DARK;

	$: headerClasses = [
		'w-full z-50 transition-all duration-500 ease-in-out',
		sticky ? 'fixed top-0 left-0' : 'relative',
		isScrolled ? 'shadow-2xl backdrop-blur-lg' : 'shadow-lg',

		// Border radius for floating variant
		borderRadius !== 'none' && variant === 'floating' ? `rounded-${borderRadius}` : '',
		variant === 'floating' ? 'mx-4 mt-4' : '',

		// Enhanced background variants with dark mode support
		transparent && !isScrolled
			? 'bg-transparent'
			: variant === 'glass'
				? `backdrop-blur-xl ${isDarkMode ? 'bg-gray-900/80 border-b border-gray-700/50' : 'bg-white/80 border-b border-gray-200/50'}`
				: variant === 'gradient'
					? `bg-gradient-${gradientDirection} from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl`
					: variant === 'floating'
						? `${isDarkMode ? 'bg-gray-800/95 border-gray-700/30' : 'bg-white/95 border-gray-200/30'} backdrop-blur-xl shadow-2xl border`
						: isDarkMode
							? 'bg-gray-900/95 text-white border-b border-gray-800'
							: 'bg-white/95 text-gray-800 border-b border-gray-100',

		transparent && isScrolled
			? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl`
			: '',
		animated ? 'transform-gpu hover:shadow-3xl' : '',
	]
		.filter(Boolean)
		.join(' ');

	// Enhanced link animation classes with dark mode
	$: linkClasses = [
		'relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group',
		animated ? 'hover:scale-105 active:scale-95' : '',
		isDarkMode
			? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
			: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50',
		// Animated underline effect
		'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 hover:after:w-3/4 after:transition-all after:duration-300 after:-translate-x-1/2',
	]
		.filter(Boolean)
		.join(' ');
</script>

<header class={headerClasses}>
	<div class="container mx-auto px-6 py-4">
		<div class="flex justify-between items-center">
			<!-- Enhanced Logo/Brand Section -->
			<div class="flex items-center space-x-3 group">
				{#if logo}
					<div class="relative">
						<img
							src={logo}
							alt={title}
							class="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
						/>
						{#if animated}
							<div
								class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
							></div>
						{/if}
					</div>
				{/if}
				<div class="flex flex-col">
					<span
						class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
					>
						{title}
					</span>
					{#if showBranding}
						<span class="text-xs opacity-75 font-medium"> Made by Reckless98 </span>
					{/if}
				</div>
			</div>
			<!-- Enhanced Desktop Navigation -->
			<nav class="hidden lg:flex items-center space-x-2">
				{#if variant !== 'minimal'}
					<ul class="flex items-center space-x-1">
						{#each links as link, index}
							<li>
								<a
									href={link.href}
									class={linkClasses}
									style={animated ? `transition-delay: ${index * 50}ms` : ''}
								>
									{link.text}
								</a>
							</li>
						{/each}
					</ul>
				{/if}

				<!-- Theme Toggle Button -->
				<button
					on:click={toggleTheme}
					class="p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 {isDarkMode
						? 'text-yellow-400 hover:bg-gray-700/50'
						: 'text-gray-600 hover:bg-gray-100/50'}"
					aria-label="Toggle theme"
					title="Toggle dark/light mode"
				>
					{#if isDarkMode}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
					{/if}
				</button>
				<!-- Search (if enabled) -->
				{#if withSearch || variant === 'withSearch'}
					<form on:submit|preventDefault={handleSearchSubmit} class="relative">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search..."
							class="px-4 py-2 rounded-xl text-sm transition-all duration-300 {isDarkMode
								? 'bg-gray-800 text-white border-gray-700'
								: 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button
							type="submit"
							class="absolute right-3 top-1/2 transform -translate-y-1/2 {isDarkMode
								? 'text-gray-400 hover:text-white'
								: 'text-gray-500 hover:text-gray-700'} transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</form>
				{/if}

				<!-- Enhanced CTA Button -->
				{#if ctaButton}
					<a
						href={ctaButton.href}
						class="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl {ctaButton.variant ===
						'primary'
							? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
							: isDarkMode
								? 'bg-gray-700 text-white hover:bg-gray-600'
								: 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
					>
						{ctaButton.text}
					</a>
				{/if}
			</nav>

			<!-- Enhanced Mobile menu button -->
			<div class="lg:hidden flex items-center space-x-2">
				<!-- Mobile theme toggle -->
				<button
					on:click={toggleTheme}
					class="p-2 rounded-lg transition-all duration-300 {isDarkMode
						? 'text-yellow-400 hover:bg-gray-700/50'
						: 'text-gray-600 hover:bg-gray-100/50'}"
					aria-label="Toggle theme"
				>
					{#if isDarkMode}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
					{/if}
				</button>

				<button
					class="p-2 rounded-lg transition-all duration-300 {isDarkMode
						? 'text-white hover:bg-gray-700/50'
						: 'text-gray-700 hover:bg-gray-100/50'}"
					on:click={toggleMenu}
					aria-label="Toggle menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 transition-transform duration-300 {isOpen ? 'rotate-90' : ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Enhanced Mobile Navigation -->
	{#if isOpen}
		<div
			transition:slide={{ duration: 300 }}
			class="lg:hidden border-t {isDarkMode
				? 'border-gray-700 bg-gray-800/95'
				: 'border-gray-200 bg-white/95'} backdrop-blur-xl"
		>
			<nav class="container mx-auto px-6 py-6">
				<ul class="space-y-3">
					{#each links as link, index}
						<li>
							<a
								href={link.href}
								class="block py-3 px-4 rounded-xl font-medium transition-all duration-300 {isDarkMode
									? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
									: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}"
								style={animated ? `transition-delay: ${index * 50}ms` : ''}
								on:click={() => (isOpen = false)}
							>
								{link.text}
							</a>
						</li>
					{/each}
				</ul>

				{#if withSearch || variant === 'withSearch'}
					<form on:submit|preventDefault={handleSearchSubmit} class="mt-6">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search..."
							class="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 {isDarkMode
								? 'bg-gray-700 text-white border-gray-600'
								: 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</form>
				{/if}

				{#if ctaButton}
					<div class="mt-6">
						<a
							href={ctaButton.href}
							class="block text-center px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg {ctaButton.variant ===
							'primary'
								? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
								: isDarkMode
									? 'bg-gray-700 text-white hover:bg-gray-600'
									: 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
							on:click={() => (isOpen = false)}
						>
							{ctaButton.text}
						</a>
					</div>
				{/if}

				{#if showBranding}
					<div
						class="mt-8 pt-6 border-t {isDarkMode
							? 'border-gray-700'
							: 'border-gray-200'} text-center"
					>
						<p class="text-sm {isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium">
							Made by <span
								class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold"
								>Reckless98</span
							>
						</p>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
</header>
