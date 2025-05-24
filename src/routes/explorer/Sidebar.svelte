<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme.js';
	
	// Component categories with icons and items
	const categories = [
		{
			name: 'Foundation',
			icon: '🎨',
			items: [
				{ name: 'Button', path: '/explorer#button', icon: '🔘' },
				{ name: 'Badge', path: '/explorer#badge', icon: '🏷️' },
				{ name: 'Input', path: '/explorer#input', icon: '📝' },
				{ name: 'Checkbox', path: '/explorer#checkbox', icon: '☑️' },
				{ name: 'Select', path: '/explorer#select', icon: '📋' },
				{ name: 'Textarea', path: '/explorer#textarea', icon: '📄' },
				{ name: 'Toggle', path: '/explorer#toggle', icon: '🔄' }
			]
		},
		{
			name: 'Layout',
			icon: '📐',
			items: [
				{ name: 'Card', path: '/explorer#card', icon: '🃏' },
				{ name: 'Modal', path: '/explorer#modal', icon: '🪟' }
			]
		},
		{
			name: 'Navigation',
			icon: '🧭',
			items: [
				{ name: 'Header', path: '/explorer#header', icon: '📄' },
				{ name: 'Navigation', path: '/explorer#navigation', icon: '🗂️' },
				{ name: 'Footer', path: '/explorer#footer', icon: '📋' },
				{ name: 'Tabs', path: '/explorer#tabs', icon: '📑' }
			]
		},
		{
			name: 'Data Display',
			icon: '📊',
			items: [
				{ name: 'Table', path: '/explorer#table', icon: '📋' },
				{ name: 'List', path: '/explorer#list', icon: '📝' },
				{ name: 'Stats', path: '/explorer#stats', icon: '📈' }
			]
		},
		{
			name: 'Feedback',
			icon: '💬',
			items: [
				{ name: 'Alert', path: '/explorer#alert', icon: '⚠️' },
				{ name: 'Toast', path: '/explorer#toast', icon: '🍞' },
				{ name: 'Progress', path: '/explorer#progress', icon: '⏳' }
			]
		},
		{
			name: 'Advanced',
			icon: '⚡',
			items: [
				{ name: 'Animation', path: '/explorer#animation', icon: '✨' },
				{ name: 'Search', path: '/explorer#search', icon: '🔍' },
				{ name: 'Layout', path: '/explorer#layout', icon: '🏗️' }
			]
		}
	];
	
	// Search functionality
	let searchQuery = '';
	let isOpen = true;
	let currentTheme = 'light';
	
	theme.subscribe(value => currentTheme = value);
	
	$: isDark = currentTheme === 'dark';
	$: currentPath = $page.url.pathname;
	
	// Filter items based on search
	$: filteredCategories = categories.map(category => ({
		...category,
		items: category.items.filter(item => 
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	})).filter(category => category.items.length > 0);
	
	// Toggle sidebar
	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

<!-- Mobile toggle button -->
<button
	class="fixed top-20 left-4 z-50 lg:hidden p-2 rounded-lg {isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg"
	on:click={toggleSidebar}
	aria-label="Toggle sidebar"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
	</svg>
</button>

<!-- Sidebar -->
<aside
	class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 transform transition-transform duration-300 z-40
		{isOpen ? 'translate-x-0' : '-translate-x-full'} 
		lg:translate-x-0
		{isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} 
		border-r overflow-hidden flex flex-col"
>
	<!-- Search -->
	<div class="p-4 border-b {isDark ? 'border-gray-800' : 'border-gray-200'}">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search components..."
				class="w-full pl-10 pr-4 py-2 rounded-lg text-sm
					{isDark ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500' : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-600'}
					border {isDark ? 'border-gray-700' : 'border-gray-300'}
					focus:outline-none focus:ring-2 focus:border-transparent
					transition-all duration-200"
			/>
			<svg class="absolute left-3 top-2.5 w-4 h-4 {isDark ? 'text-gray-400' : 'text-gray-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
	</div>
	
	<!-- Navigation -->
	<nav class="flex-1 overflow-y-auto p-4" aria-label="Component explorer navigation">
		{#if searchQuery && filteredCategories.length === 0}
			<p class="text-center py-8 {isDark ? 'text-gray-400' : 'text-gray-600'}">
				No components found matching "{searchQuery}"
			</p>
		{:else}
			{#each filteredCategories as category}
				<div class="mb-6" in:fade={{ duration: 200 }}>
					<h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider {isDark ? 'text-gray-400' : 'text-gray-600'} mb-2">
						<span class="text-base">{category.icon}</span>
						{category.name}
					</h3>
					<ul class="space-y-1" role="list">
						{#each category.items as item}
							<li>
								<a
									href={item.path}
									class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
										{currentPath === item.path 
											? isDark 
												? 'bg-blue-900/50 text-blue-400 border-l-4 border-blue-400' 
												: 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
											: isDark
												? 'text-gray-300 hover:bg-gray-800 hover:text-white'
												: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}"
									aria-current={currentPath === item.path ? 'page' : undefined}
								>
									<span class="text-base">{item.icon}</span>
									{item.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{/if}
	</nav>
	
	<!-- Footer branding -->
	<div class="p-4 border-t {isDark ? 'border-gray-800' : 'border-gray-200'}">
		<p class="text-xs {isDark ? 'text-gray-500' : 'text-gray-600'} text-center">
			Made with ❤️ by
			<a 
				href="https://github.com/Reckless98" 
				target="_blank" 
				rel="noopener noreferrer"
				class="{isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium transition-colors"
			>
				Reckless98
			</a>
		</p>
	</div>
</aside>

<style>
	/* Custom scrollbar for sidebar */
	nav::-webkit-scrollbar {
		width: 6px;
	}
	
	nav::-webkit-scrollbar-track {
		background: transparent;
	}
	
	nav::-webkit-scrollbar-thumb {
		@apply bg-gray-300 dark:bg-gray-700 rounded-full;
	}
	
	nav::-webkit-scrollbar-thumb:hover {
		@apply bg-gray-400 dark:bg-gray-600;
	}
</style>
