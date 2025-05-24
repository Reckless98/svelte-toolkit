<!-- Reusable Navigation Component -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	// Types
	interface NavigationItem {
		id: string;
		label: string;
		href?: string;
		action?: () => void;
		children?: NavigationItem[];
	}

	type NavigationVariant =
		| 'horizontal'
		| 'vertical'
		| 'dropdown'
		| 'breadcrumb'
		| 'tabs'
		| 'modern'
		| 'floating';
	type NavigationTheme = 'light' | 'dark' | 'accent' | 'glass' | 'gradient';
	type NavigationSize = 'sm' | 'md' | 'lg' | 'xl';
	type NavigationAlignment = 'left' | 'center' | 'right' | 'space-between';
	type NavigationAnimation = 'none' | 'slide' | 'fade' | 'bounce';
	type NavigationRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
	type NavigationShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

	// Props
	export let variant: NavigationVariant = 'horizontal';
	export let items: NavigationItem[] = [];
	export let activeItem: string = '';
	export let logo: string = '';
	export let logoAlt: string = 'Logo';
	export let mobileToggle: boolean = true;
	export let sticky: boolean = false;
	export let transparent: boolean = false;
	export let theme: NavigationTheme = 'light';
	export let size: NavigationSize = 'md';
	export let alignment: NavigationAlignment = 'center';
	export let animation: NavigationAnimation = 'none';
	export let rounded: NavigationRounded = 'none';
	export let shadow: NavigationShadow = 'none';
	export let showBranding: boolean = false;

	// Internal state
	let mobileMenuOpen: boolean = false;
	let dropdownOpen: Record<string, boolean> = {};

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		navigate: { item: NavigationItem };
		itemClick: { item: NavigationItem };
	}>();

	// Toggle mobile menu
	function toggleMobileMenu(): void {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Toggle dropdown
	function toggleDropdown(itemId: string): void {
		dropdownOpen[itemId] = !dropdownOpen[itemId];
	}

	// Handle item click
	function handleItemClick(item: NavigationItem): void {
		if (item.href) {
			// External link or regular navigation
			dispatch('navigate', { item });
		} else if (item.action) {
			// Custom action
			item.action();
		}

		// Close mobile menu on item click
		if (mobileMenuOpen) {
			mobileMenuOpen = false;
		}

		dispatch('itemClick', { item });
	}
	// Size classes
	const sizeClasses = {
		sm: 'py-2 px-3 text-sm',
		md: 'py-3 px-4 text-base',
		lg: 'py-4 px-6 text-lg',
		xl: 'py-5 px-8 text-xl',
	};

	// Theme classes
	const themeClasses = {
		light: 'bg-white text-gray-900 border-gray-200',
		dark: 'bg-gray-900 text-white border-gray-700',
		accent: 'bg-blue-600 text-white border-blue-700',
		glass: 'backdrop-blur-md bg-white/20 text-gray-900 border-white/30',
		gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent',
	};

	// Alignment classes
	const alignmentClasses = {
		left: 'justify-start',
		center: 'justify-center',
		right: 'justify-end',
		'space-between': 'justify-between',
	};

	// Shadow classes
	const shadowClasses = {
		none: '',
		sm: 'shadow-sm',
		md: 'shadow-md',
		lg: 'shadow-lg',
		xl: 'shadow-xl',
	};

	// Animation classes
	const animationClasses = {
		none: '',
		slide: 'transform transition-transform duration-300',
		fade: 'transition-opacity duration-300',
		bounce: 'transition-all duration-300',
	};
</script>

<nav
	class="relative {sticky ? 'sticky top-0 z-40' : ''} {transparent
		? 'bg-transparent'
		: variant === 'modern' || variant === 'floating'
			? ''
			: themeClasses[theme]} {variant === 'horizontal' ? 'border-b' : ''} {shadowClasses[
		shadow
	]} {animationClasses[animation]} transition-all duration-300 {variant === 'floating'
		? ''
		: 'w-full'}"
	class:rounded-sm={rounded === 'sm'}
	class:rounded-md={rounded === 'md'}
	class:rounded-lg={rounded === 'lg'}
	class:rounded-xl={rounded === 'xl'}
	class:rounded-full={rounded === 'full'}
	aria-label="Main navigation"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center {alignmentClasses[alignment]} {sizeClasses[size]}">
			<!-- Logo -->
			{#if logo}
				<div class="flex-shrink-0">
					{#if typeof logo === 'string'}
						<img src={logo} alt={logoAlt} class="h-8 w-auto" />
					{:else}
						<div class="h-8 flex items-center">
							{@html logo}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Desktop Navigation -->
			{#if variant === 'horizontal'}
				<div class="hidden md:block {logo ? 'ml-10' : ''}">
					<div class="flex items-baseline space-x-4">
						{#each items as item}
							{#if item.children && item.children.length > 0}
								<!-- Dropdown -->
								<div class="relative">
									<button
										class="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 transition-colors duration-200 flex items-center"
										on:click={() => toggleDropdown(item.id)}
										aria-expanded={dropdownOpen[item.id]}
									>
										{item.label}
										<svg
											class="ml-1 h-4 w-4 transform {dropdownOpen[item.id]
												? 'rotate-180'
												: ''} transition-transform duration-200"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>

									{#if dropdownOpen[item.id]}
										<div
											class="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
											transition:fly={{ y: -10, duration: 200 }}
										>
											<div class="py-1">
												{#each item.children as child}
													<button
														class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
														on:click={() => handleItemClick(child)}
													>
														{child.label}
													</button>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{:else}
								<!-- Regular item -->
								<button
									class="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 transition-colors duration-200 {activeItem ===
									item.id
										? 'bg-opacity-50'
										: ''}"
									on:click={() => handleItemClick(item)}
								>
									{item.label}
								</button>
							{/if}
						{/each}

						<!-- Desktop Branding for horizontal variant -->
						{#if showBranding}
							<div class="ml-6 pl-6 border-l border-gray-300">
								<span class="text-xs text-gray-500">
									Made by
									<a
										href="https://github.com/Reckless98"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
									>
										Reckless98
									</a>
								</span>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Mobile menu button -->
			{#if mobileToggle && variant === 'horizontal'}
				<div class="md:hidden">
					<button
						class="p-2 rounded-md hover:bg-opacity-75 transition-colors duration-200"
						on:click={toggleMobileMenu}
						aria-expanded={mobileMenuOpen}
						aria-label="Toggle mobile menu"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{#if mobileMenuOpen}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							{/if}
						</svg>
					</button>
				</div>
			{/if}
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen && variant === 'horizontal'}
			<div class="md:hidden" transition:fly={{ y: -20, duration: 300 }}>
				<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{#each items as item}
						{#if item.children && item.children.length > 0}
							<div>
								<button
									class="block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-75 transition-colors duration-200 w-full text-left"
									on:click={() => toggleDropdown(item.id)}
								>
									{item.label}
								</button>
								{#if dropdownOpen[item.id]}
									<div class="pl-4 space-y-1">
										{#each item.children as child}
											<button
												class="block px-3 py-2 rounded-md text-sm hover:bg-opacity-75 transition-colors duration-200 w-full text-left"
												on:click={() => handleItemClick(child)}
											>
												{child.label}
											</button>
										{/each}
									</div>
								{/if}
							</div>
						{:else}
							<button
								class="block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-75 transition-colors duration-200 w-full text-left {activeItem ===
								item.id
									? 'bg-opacity-50'
									: ''}"
								on:click={() => handleItemClick(item)}
							>
								{item.label}
							</button>
						{/if}
					{/each}

					<!-- Mobile Branding -->
					{#if showBranding}
						<div class="border-t border-gray-200 pt-4 mt-4">
							<div class="px-3 py-2 text-sm text-gray-500 text-center">
								Made with ❤️ by
								<a
									href="https://github.com/Reckless98"
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
								>
									Reckless98
								</a>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<!-- Vertical Navigation -->
	{#if variant === 'vertical'}
		<div class="flex flex-col space-y-1 p-4">
			{#each items as item}
				{#if item.children && item.children.length > 0}
					<div>
						<button
							class="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 transition-colors duration-200"
							on:click={() => toggleDropdown(item.id)}
						>
							{item.label}
							<svg
								class="h-4 w-4 transform {dropdownOpen[item.id]
									? 'rotate-180'
									: ''} transition-transform duration-200"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
						{#if dropdownOpen[item.id]}
							<div class="pl-4 space-y-1 mt-1">
								{#each item.children as child}
									<button
										class="block px-3 py-2 rounded-md text-sm hover:bg-opacity-75 transition-colors duration-200 w-full text-left"
										on:click={() => handleItemClick(child)}
									>
										{child.label}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<button
						class="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 transition-colors duration-200 w-full text-left {activeItem ===
						item.id
							? 'bg-opacity-50'
							: ''}"
						on:click={() => handleItemClick(item)}
					>
						{item.label}
					</button>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Breadcrumb Navigation -->
	{#if variant === 'breadcrumb'}
		<div class="flex items-center space-x-2 px-4 py-2">
			{#each items as item, index}
				{#if index > 0}
					<svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
				<button
					class="text-sm {index === items.length - 1
						? 'font-medium text-gray-900'
						: 'text-gray-500 hover:text-gray-700'} transition-colors duration-200"
					on:click={() => handleItemClick(item)}
				>
					{item.label}
				</button>
			{/each}
		</div>
	{/if}
	<!-- Tab Navigation -->
	{#if variant === 'tabs'}
		<div class="border-b border-gray-200">
			<div class="flex space-x-8 px-4">
				{#each items as item}
					<button
						class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeItem ===
						item.id
							? 'border-accent text-accent'
							: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
						on:click={() => handleItemClick(item)}
					>
						{item.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Modern Navigation -->
	{#if variant === 'modern'}
		<div
			class="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl mx-4 my-2 shadow-lg"
		>
			<div class="flex items-center justify-between px-6 py-4">
				<!-- Logo section -->
				{#if logo}
					<div class="flex-shrink-0">
						{#if typeof logo === 'string'}
							<img src={logo} alt={logoAlt} class="h-8 w-auto" />
						{:else}
							<div class="h-8 flex items-center">
								{@html logo}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Navigation items -->
				<div class="hidden md:flex items-center space-x-1">
					{#each items as item}
						<button
							class="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 transform-gpu {activeItem ===
							item.id
								? 'bg-white/30 text-blue-600'
								: 'text-gray-700 hover:text-gray-900'}"
							on:click={() => handleItemClick(item)}
						>
							{item.label}
							{#if activeItem === item.id}
								<div
									class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse"
								></div>
							{/if}
						</button>
					{/each}

					<!-- Desktop Branding -->
					{#if showBranding}
						<div class="ml-6 pl-6 border-l border-gray-300">
							<span class="text-xs text-gray-500">
								Made by
								<a
									href="https://github.com/Reckless98"
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
								>
									Reckless98
								</a>
							</span>
						</div>
					{/if}
				</div>

				<!-- Mobile menu button -->
				{#if mobileToggle}
					<button
						class="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
						on:click={toggleMobileMenu}
						aria-expanded={mobileMenuOpen}
						aria-label="Toggle mobile menu"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{#if mobileMenuOpen}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							{/if}
						</svg>
					</button>
				{/if}
			</div>

			<!-- Modern Mobile menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden border-t border-white/20" transition:fly={{ y: -20, duration: 300 }}>
					<div class="px-4 py-3 space-y-2">
						{#each items as item}
							<button
								class="block w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] transform-gpu {activeItem ===
								item.id
									? 'bg-white/30 text-blue-600'
									: 'text-gray-700'}"
								on:click={() => handleItemClick(item)}
							>
								{item.label}
							</button>
						{/each}

						{#if showBranding}
							<div class="border-t border-white/20 pt-3 mt-3">
								<div class="px-4 py-2 text-xs text-gray-500 text-center">
									Made with ❤️ by
									<a
										href="https://github.com/Reckless98"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
									>
										Reckless98
									</a>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Floating Navigation -->
	{#if variant === 'floating'}
		<div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
			<div
				class="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full px-6 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform-gpu"
			>
				<div class="flex items-center space-x-6">
					<!-- Logo -->
					{#if logo}
						<div class="flex-shrink-0">
							{#if typeof logo === 'string'}
								<img src={logo} alt={logoAlt} class="h-6 w-auto" />
							{:else}
								<div class="h-6 flex items-center">
									{@html logo}
								</div>
							{/if}
						</div>
					{/if}

					<!-- Navigation items -->
					<div class="flex items-center space-x-1">
						{#each items as item}
							<button
								class="relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-110 transform-gpu {activeItem ===
								item.id
									? 'bg-blue-100 text-blue-600'
									: 'text-gray-700 hover:text-gray-900'}"
								on:click={() => handleItemClick(item)}
							>
								{item.label}
								{#if activeItem === item.id}
									<div
										class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-bounce"
									></div>
								{/if}
							</button>
						{/each}
					</div>

					<!-- Floating Branding -->
					{#if showBranding}
						<div class="border-l border-gray-300 pl-4">
							<a
								href="https://github.com/Reckless98"
								target="_blank"
								rel="noopener noreferrer"
								class="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
							>
								<span>R98</span>
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
									/>
								</svg>
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	/* Custom dropdown positioning */
	.relative:hover .absolute {
		display: block;
	}
</style>
