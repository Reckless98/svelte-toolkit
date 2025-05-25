<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme.js';
	
	// Enhanced component categories with comprehensive collection
	const categories = [
		{
			name: 'Foundation',
			icon: '🎨',
			items: [
				{ name: 'Button', path: '/explorer#button', icon: '🔘' },
				{ name: 'Button Groups', path: '/explorer#button-groups', icon: '🔘' },
				{ name: 'Icon Button', path: '/explorer#icon-button', icon: '⭕' },
				{ name: 'Floating Action', path: '/explorer#fab', icon: '🎯' },
				{ name: 'Badge', path: '/explorer#badge', icon: '🏷️' },
				{ name: 'Chip', path: '/explorer#chip', icon: '🏷️' },
				{ name: 'Avatar', path: '/explorer/avatar', icon: '👤' },
				{ name: 'Avatar Group', path: '/explorer#avatar-group', icon: '👥' },
				{ name: 'Divider', path: '/explorer/divider', icon: '➖' },
				{ name: 'Skeleton', path: '/explorer#skeleton', icon: '💀' },
				{ name: 'Spinner', path: '/explorer#spinner', icon: '🔄' }
			]
		},
		{
			name: 'Form Controls',
			icon: '📝',
			items: [
				{ name: 'Input', path: '/explorer#input', icon: '📝' },
				{ name: 'Input Groups', path: '/explorer#input-groups', icon: '📝' },
				{ name: 'Textarea', path: '/explorer#textarea', icon: '📄' },
				{ name: 'Select', path: '/explorer#select', icon: '📋' },
				{ name: 'Multi Select', path: '/explorer#multi-select', icon: '📋' },
				{ name: 'Autocomplete', path: '/explorer#autocomplete', icon: '✨' },
				{ name: 'Checkbox', path: '/explorer#checkbox', icon: '☑️' },
				{ name: 'Radio Button', path: '/explorer#radio', icon: '🔘' },
				{ name: 'Toggle Switch', path: '/explorer#toggle', icon: '🔄' },
				{ name: 'Range Slider', path: '/explorer#range', icon: '🎚️' },
				{ name: 'File Upload', path: '/explorer#file-upload', icon: '📎' },
				{ name: 'Date Picker', path: '/explorer#date-picker', icon: '📅' },
				{ name: 'Time Picker', path: '/explorer#time-picker', icon: '🕐' },
				{ name: 'Color Picker', path: '/explorer#color-picker', icon: '🎨' },
				{ name: 'Rating', path: '/explorer#rating', icon: '⭐' },
				{ name: 'Pin Input', path: '/explorer#pin-input', icon: '🔢' }
			]
		},
		{
			name: 'Layout & Containers',
			icon: '📐',
			items: [
				{ name: 'Card', path: '/explorer#card', icon: '🃏' },
				{ name: 'Card Variants', path: '/explorer#card-variants', icon: '🃏' },
				{ name: 'Container', path: '/explorer#container', icon: '📦' },
				{ name: 'Grid System', path: '/explorer#grid', icon: '⚏' },
				{ name: 'Flex Layout', path: '/explorer#flex', icon: '📏' },
				{ name: 'Stack', path: '/explorer#stack', icon: '📚' },
				{ name: 'Spacer', path: '/explorer#spacer', icon: '↔️' },
				{ name: 'Accordion', path: '/explorer/accordion', icon: '📋' },
				{ name: 'Collapsible', path: '/explorer#collapsible', icon: '📁' },
				{ name: 'Stepper', path: '/explorer#stepper', icon: '📊' },
				{ name: 'Timeline', path: '/explorer#timeline', icon: '⏰' },
				{ name: 'Masonry', path: '/explorer#masonry', icon: '🧱' }
			]
		},
		{
			name: 'Navigation',
			icon: '🧭',
			items: [
				{ name: 'Header', path: '/explorer#header', icon: '🎯' },
				{ name: 'Header Variants', path: '/explorer#header-variants', icon: '🎯' },
				{ name: 'Navigation Bar', path: '/explorer#navbar', icon: '🗂️' },
				{ name: 'Sidebar', path: '/explorer#sidebar', icon: '📄' },
				{ name: 'Bottom Navigation', path: '/explorer#bottom-nav', icon: '⬇️' },
				{ name: 'Breadcrumbs', path: '/explorer#breadcrumbs', icon: '🍞' },
				{ name: 'Pagination', path: '/explorer#pagination', icon: '📄' },
				{ name: 'Tabs', path: '/explorer#tabs', icon: '📑' },
				{ name: 'Tab Variants', path: '/explorer#tab-variants', icon: '📑' },
				{ name: 'Menu', path: '/explorer#menu', icon: '🍔' },
				{ name: 'Dropdown', path: '/explorer/dropdown', icon: '⬇️' },
				{ name: 'Context Menu', path: '/explorer#context-menu', icon: '📋' },
				{ name: 'Footer', path: '/explorer#footer', icon: '📋' },
				{ name: 'Footer Variants', path: '/explorer#footer-variants', icon: '📋' }
			]
		},
		{
			name: 'Data Display',
			icon: '📊',
			items: [
				{ name: 'Table', path: '/explorer#table', icon: '📋' },
				{ name: 'Data Table', path: '/explorer#data-table', icon: '📊' },
				{ name: 'Virtual Table', path: '/explorer#virtual-table', icon: '📋' },
				{ name: 'List', path: '/explorer#list', icon: '📝' },
				{ name: 'Virtual List', path: '/explorer#virtual-list', icon: '📝' },
				{ name: 'Tree View', path: '/explorer#tree', icon: '🌳' },
				{ name: 'Stats', path: '/explorer#stats', icon: '📈' },
				{ name: 'KPI Cards', path: '/explorer#kpi', icon: '📊' },
				{ name: 'Metrics', path: '/explorer#metrics', icon: '📈' },
				{ name: 'Code Block', path: '/explorer#code', icon: '💻' },
				{ name: 'Syntax Highlighter', path: '/explorer#syntax', icon: '🎨' },
				{ name: 'JSON Viewer', path: '/explorer#json', icon: '📄' },
				{ name: 'Image Gallery', path: '/explorer#gallery', icon: '🖼️' },
				{ name: 'Carousel', path: '/explorer#carousel', icon: '🎠' },
				{ name: 'Slideshow', path: '/explorer#slideshow', icon: '🎞️' }
			]
		},
		{
			name: 'Feedback & Status',
			icon: '💬',
			items: [
				{ name: 'Alert', path: '/explorer#alert', icon: '⚠️' },
				{ name: 'Banner', path: '/explorer#banner', icon: '🏷️' },
				{ name: 'Toast', path: '/explorer#toast', icon: '🍞' },
				{ name: 'Notification', path: '/explorer#notification', icon: '🔔' },
				{ name: 'Snackbar', path: '/explorer#snackbar', icon: '📱' },
				{ name: 'Progress', path: '/explorer#progress', icon: '⏳' },
				{ name: 'Progress Circle', path: '/explorer#progress-circle', icon: '⭕' },
				{ name: 'Loading States', path: '/explorer#loading', icon: '⏳' },
				{ name: 'Empty States', path: '/explorer#empty', icon: '📭' },
				{ name: 'Error States', path: '/explorer#error', icon: '❌' },
				{ name: 'Status Indicator', path: '/explorer#status', icon: '🔴' },
				{ name: 'Health Check', path: '/explorer#health', icon: '💚' }
			]
		},
		{
			name: 'Overlays & Dialogs',
			icon: '🪟',
			items: [
				{ name: 'Modal', path: '/explorer#modal', icon: '🪟' },
				{ name: 'Dialog', path: '/explorer#dialog', icon: '💬' },
				{ name: 'Drawer', path: '/explorer#drawer', icon: '📄' },
				{ name: 'Popover', path: '/explorer#popover', icon: '💭' },
				{ name: 'Tooltip', path: '/explorer/tooltip', icon: '💡' },
				{ name: 'Confirmation', path: '/explorer#confirmation', icon: '❓' },
				{ name: 'Alert Dialog', path: '/explorer#alert-dialog', icon: '⚠️' },
				{ name: 'Sheet', path: '/explorer#sheet', icon: '📄' },
				{ name: 'Backdrop', path: '/explorer#backdrop', icon: '🎭' },
				{ name: 'Lightbox', path: '/explorer#lightbox', icon: '💡' }
			]
		},
		{
			name: 'Interactive',
			icon: '⚡',
			items: [
				{ name: 'Search', path: '/explorer#search', icon: '🔍' },
				{ name: 'Search Advanced', path: '/explorer#search-advanced', icon: '🔍' },
				{ name: 'Filter', path: '/explorer#filter', icon: '🏗️' },
				{ name: 'Sort', path: '/explorer#sort', icon: '🔄' },
				{ name: 'Drag & Drop', path: '/explorer#drag-drop', icon: '🤏' },
				{ name: 'Resizable', path: '/explorer#resizable', icon: '↔️' },
				{ name: 'Infinite Scroll', path: '/explorer#infinite-scroll', icon: '♾️' },
				{ name: 'Virtual Scroll', path: '/explorer#virtual-scroll', icon: '📜' },
				{ name: 'Keyboard Navigation', path: '/explorer#keyboard', icon: '⌨️' },
				{ name: 'Gesture Handler', path: '/explorer#gestures', icon: '👆' }
			]
		},
		{
			name: 'Visualization',
			icon: '📈',
			items: [
				{ name: 'Charts', path: '/explorer#charts', icon: '📊' },
				{ name: 'Graphs', path: '/explorer#graphs', icon: '📈' },
				{ name: 'Sparklines', path: '/explorer#sparklines', icon: '⚡' },
				{ name: 'Heatmap', path: '/explorer#heatmap', icon: '🔥' },
				{ name: 'Gauge', path: '/explorer#gauge', icon: '🎯' },
				{ name: 'Dashboard', path: '/explorer#dashboard', icon: '📊' },
				{ name: 'Calendar', path: '/explorer#calendar', icon: '📅' },
				{ name: 'Gantt Chart', path: '/explorer#gantt', icon: '📊' },
				{ name: 'Org Chart', path: '/explorer#org-chart', icon: '🏢' },
				{ name: 'Mind Map', path: '/explorer#mind-map', icon: '🧠' }
			]
		},
		{
			name: 'Media & Assets',
			icon: '🎬',
			items: [
				{ name: 'Image', path: '/explorer#image', icon: '🖼️' },
				{ name: 'Video Player', path: '/explorer#video', icon: '🎥' },
				{ name: 'Audio Player', path: '/explorer#audio', icon: '🎵' },
				{ name: 'Icon Library', path: '/explorer#icons', icon: '⭐' },
				{ name: 'QR Code', path: '/explorer#qr-code', icon: '📱' },
				{ name: 'Barcode', path: '/explorer#barcode', icon: '📊' },
				{ name: 'PDF Viewer', path: '/explorer#pdf', icon: '📄' },
				{ name: 'File Viewer', path: '/explorer#file-viewer', icon: '📁' }
			]
		},
		{
			name: 'Advanced Layouts',
			icon: '🏗️',
			items: [
				{ name: 'Split Pane', path: '/explorer#split-pane', icon: '📱' },
				{ name: 'Dock Layout', path: '/explorer#dock', icon: '⚓' },
				{ name: 'Window Manager', path: '/explorer#window-manager', icon: '🪟' },
				{ name: 'Workspace', path: '/explorer#workspace', icon: '💼' },
				{ name: 'Dashboard Layout', path: '/explorer#dashboard-layout', icon: '📊' },
				{ name: 'Grid Layout', path: '/explorer#grid-layout', icon: '⚏' },
				{ name: 'Mosaic', path: '/explorer#mosaic', icon: '🎨' },
				{ name: 'Flexible Layout', path: '/explorer#flexible', icon: '🤸' }
			]
		},
		{
			name: 'Animation & Effects',
			icon: '✨',
			items: [
				{ name: 'Parallax', path: '/explorer#parallax', icon: '🌌' },
				{ name: 'Scroll Reveal', path: '/explorer#scroll-reveal', icon: '👁️' },
				{ name: 'Morphing', path: '/explorer#morphing', icon: '🔄' },
				{ name: 'Particle System', path: '/explorer#particles', icon: '✨' },
				{ name: 'Lottie Animation', path: '/explorer#lottie', icon: '🎭' },
				{ name: 'CSS Animations', path: '/explorer#css-animations', icon: '🎨' },
				{ name: 'Spring Physics', path: '/explorer#spring', icon: '🌸' },
				{ name: 'Gesture Animations', path: '/explorer#gesture-animations', icon: '👆' }
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
	class="fixed top-24 left-4 z-50 lg:hidden p-2 rounded-lg {isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg"
	on:click={toggleSidebar}
	aria-label="Toggle sidebar"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
	</svg>
</button>

<!-- Sidebar -->
<aside
	class="fixed top-20 left-0 h-[calc(100vh-5rem)] w-80 transform transition-transform duration-300 z-40
		{isOpen ? 'translate-x-0' : '-translate-x-full'} 
		lg:translate-x-0
		{isDark ? 'bg-gray-900/95 border-gray-800 backdrop-blur-sm' : 'bg-white/95 border-gray-200 backdrop-blur-sm'} 
		border-r overflow-hidden flex flex-col shadow-xl"
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
