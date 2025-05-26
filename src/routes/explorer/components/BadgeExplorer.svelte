<!-- Badge Component Explorer -->
<script>
	import { fade, slide } from 'svelte/transition';
	import { theme, THEMES } from '$lib/stores/theme.js';
	import ComponentPreview from '../ComponentPreview.svelte';

	let currentTheme = THEMES.LIGHT;

	// Subscribe to theme changes
	theme.subscribe((value) => {
		currentTheme = value;
	});

	// Badge variants
	const variants = [
		{ name: 'Default', class: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' },
		{ name: 'Primary', class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' },
		{
			name: 'Success',
			class: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
		},
		{
			name: 'Warning',
			class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
		},
		{ name: 'Error', class: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' },
		{
			name: 'Info',
			class: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
		},
		{
			name: 'Purple',
			class: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
		},
	];

	const solidVariants = [
		{ name: 'Default', class: 'bg-gray-600 text-white' },
		{ name: 'Primary', class: 'bg-blue-600 text-white' },
		{ name: 'Success', class: 'bg-green-600 text-white' },
		{ name: 'Warning', class: 'bg-yellow-600 text-white' },
		{ name: 'Error', class: 'bg-red-600 text-white' },
		{ name: 'Info', class: 'bg-indigo-600 text-white' },
		{ name: 'Purple', class: 'bg-purple-600 text-white' },
	];

	const outlineVariants = [
		{
			name: 'Default',
			class: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
		},
		{
			name: 'Primary',
			class: 'border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300',
		},
		{
			name: 'Success',
			class: 'border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300',
		},
		{
			name: 'Warning',
			class: 'border border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300',
		},
		{
			name: 'Error',
			class: 'border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300',
		},
		{
			name: 'Info',
			class: 'border border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300',
		},
		{
			name: 'Purple',
			class: 'border border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300',
		},
	];

	const sizes = [
		{ name: 'Small', class: 'px-2 py-0.5 text-xs' },
		{ name: 'Default', class: 'px-2.5 py-1 text-sm' },
		{ name: 'Large', class: 'px-3 py-1.5 text-base' },
	];

	const shapes = [
		{ name: 'Rounded', class: 'rounded-md' },
		{ name: 'Pill', class: 'rounded-full' },
		{ name: 'Square', class: 'rounded-none' },
	];

	// Comprehensive code examples
	const allVariantsExample = `<!-- Soft variants -->
<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Primary</span>
<span class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">Success</span>
<span class="px-2.5 py-1 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md">Warning</span>
<span class="px-2.5 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">Error</span>

<!-- Solid variants -->
<span class="px-2.5 py-1 text-sm bg-blue-600 text-white rounded-md">Primary</span>
<span class="px-2.5 py-1 text-sm bg-green-600 text-white rounded-md">Success</span>
<span class="px-2.5 py-1 text-sm bg-red-600 text-white rounded-md">Error</span>

<!-- Outline variants -->
<span class="px-2.5 py-1 text-sm border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 rounded-md">Primary</span>
<span class="px-2.5 py-1 text-sm border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 rounded-md">Success</span>`;

	const allSizesExample = `<!-- Small badges -->
<span class="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Small</span>
<span class="px-2 py-0.5 text-xs bg-green-600 text-white rounded-md">Small Solid</span>

<!-- Default badges -->
<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Default</span>
<span class="px-2.5 py-1 text-sm bg-green-600 text-white rounded-md">Default Solid</span>

<!-- Large badges -->
<span class="px-3 py-1.5 text-base bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Large</span>
<span class="px-3 py-1.5 text-base bg-green-600 text-white rounded-md">Large Solid</span>`;

	const shapesExample = `<!-- Rounded badges -->
<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Rounded</span>

<!-- Pill badges -->
<span class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">Pill</span>

<!-- Square badges -->
<span class="px-2.5 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-none">Square</span>`;

	const interactiveExample = `<!-- Clickable badges with hover effects -->
<button class="px-2.5 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-md transition-colors">
  Clickable
</button>

<!-- Dismissible badges -->
<span class="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
  Dismissible
  <button class="ml-1 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full p-0.5">×</button>
</span>

<!-- With icons -->
<span class="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
  </svg>
  Success
</span>`;
</script>

<section class="space-y-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1
				class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4"
			>
				Badge Component
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				Compact labels and indicators perfect for displaying status, categories, counts, and other
				metadata with beautiful styling for both light and dark modes.
			</p>
		</div>

		<!-- All Badge Variants - Comprehensive Overview -->
		<ComponentPreview
			title="All Badge Variants"
			description="Complete collection of badge styles: soft, solid, and outline variants with semantic colors"
			codeSnippet={allVariantsExample}
			complexity="Basic"
			features={['Semantic Colors', 'Theme Adaptive', 'Multiple Styles']}
			lazyLoad={true}
		>
			<div class="space-y-6">
				<!-- Soft Variants -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Soft Variants</h4>
					<div class="flex flex-wrap gap-3">
						{#each variants as variant}
							<span class="px-2.5 py-1 text-sm font-medium rounded-md {variant.class}">
								{variant.name}
							</span>
						{/each}
					</div>
				</div>

				<!-- Solid Variants -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Solid Variants</h4>
					<div class="flex flex-wrap gap-3">
						{#each solidVariants as variant}
							<span class="px-2.5 py-1 text-sm font-medium rounded-md {variant.class}">
								{variant.name}
							</span>
						{/each}
					</div>
				</div>

				<!-- Outline Variants -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Outline Variants</h4>
					<div class="flex flex-wrap gap-3">
						{#each outlineVariants as variant}
							<span class="px-2.5 py-1 text-sm font-medium rounded-md bg-transparent {variant.class}">
								{variant.name}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Sizes and Shapes -->
		<ComponentPreview
			title="Sizes & Shapes"
			description="Different badge sizes and border radius options for various design needs"
			codeSnippet={allSizesExample}
			complexity="Basic"
			features={['Multiple Sizes', 'Shape Variants', 'Responsive Design']}
			lazyLoad={true}
		>
			<div class="space-y-6">
				<!-- Sizes -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Size Variations</h4>
					<div class="flex flex-wrap items-center gap-6">
						{#each sizes as size}
							<div class="flex items-center space-x-3">
								<span class="text-sm text-gray-500 dark:text-gray-400 min-w-[60px]">{size.name}:</span>
								<span class="font-medium rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 {size.class}">
									Badge
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Shapes -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Shape Options</h4>
					<div class="flex flex-wrap items-center gap-6">
						{#each shapes as shape}
							<div class="flex items-center space-x-3">
								<span class="text-sm text-gray-500 dark:text-gray-400 min-w-[60px]">{shape.name}:</span>
								<span class="px-2.5 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 {shape.class}">
									Badge
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Size combinations with shapes -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Size + Shape Combinations</h4>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="space-y-2">
							<span class="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">Small Pill</span>
							<span class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">Default Pill</span>
							<span class="px-3 py-1.5 text-base bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">Large Pill</span>
						</div>
						<div class="space-y-2">
							<span class="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Small Round</span>
							<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Default Round</span>
							<span class="px-3 py-1.5 text-base bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Large Round</span>
						</div>
						<div class="space-y-2">
							<span class="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-none">Small Square</span>
							<span class="px-2.5 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-none">Default Square</span>
							<span class="px-3 py-1.5 text-base bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-none">Large Square</span>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Interactive & Enhanced Badges -->
		<ComponentPreview
			title="Interactive & Enhanced Badges"
			description="Clickable badges, dismissible badges, and badges with icons for enhanced user interaction"
			codeSnippet={interactiveExample}
			complexity="Intermediate"
			features={['Clickable', 'Dismissible', 'Icon Support', 'Hover Effects']}
			lazyLoad={true}
		>
			<div class="space-y-6">
				<!-- Badges with Icons -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Badges with Icons</h4>
					<div class="flex flex-wrap gap-3">
						<span class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
							<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
							</svg>
							Success
						</span>

						<span class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
							<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
							</svg>
							Error
						</span>

						<span class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md">
							<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
							</svg>
							Warning
						</span>

						<span class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">
							<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
							</svg>
							Info
						</span>
					</div>
				</div>

				<!-- Clickable Badges -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Clickable Badges</h4>
					<div class="flex flex-wrap gap-3">
						<button class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200">
							Clickable
						</button>

						<button class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-md transition-colors duration-200">
							Category
						</button>

						<button class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full transition-colors duration-200">
							Filter Tag
						</button>
					</div>
				</div>

				<!-- Dismissible Badges -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Dismissible Badges</h4>
					<div class="flex flex-wrap gap-3">
						<span class="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
							Removable Tag
							<button class="ml-1 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full p-0.5 transition-colors">×</button>
						</span>

						<span class="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">
							JavaScript
							<button class="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-0.5 transition-colors">×</button>
						</span>

						<span class="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
							React
							<button class="ml-1 hover:bg-green-200 dark:hover:bg-green-800/50 rounded-full p-0.5 transition-colors">×</button>
						</span>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Real-World Use Cases -->
		<ComponentPreview
			title="Real-World Use Cases"
			description="Practical examples showing badges in action for status indicators, notifications, and categorization"
			codeSnippet={'<!-- Status indicators -->\n<span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">● Online</span>\n\n<!-- Notification counts -->\n<span class="px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">3</span>\n\n<!-- Categories and tags -->\n<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">React</span>'}
			complexity="Advanced"
			features={['Status Indicators', 'Notification Counts', 'Category Tags', 'Practical Examples']}
			lazyLoad={true}
		>
			<div class="space-y-6">
				<!-- Status Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Status Indicators</h4>
					<div class="flex flex-wrap gap-3">
						<span class="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
							<span class="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
							Online
						</span>
						<span class="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">
							<span class="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>
							Away
						</span>
						<span class="inline-flex items-center px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
							<span class="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
							Offline
						</span>
						<span class="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
							<span class="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
							Busy
						</span>
					</div>
				</div>

				<!-- Notification Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Notification Counts</h4>
					<div class="flex items-center space-x-6">
						<div class="relative inline-flex items-center">
							<span class="text-gray-700 dark:text-gray-300 pr-3">Messages</span>
							<span class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">12</span>
						</div>
						<div class="relative inline-flex items-center">
							<span class="text-gray-700 dark:text-gray-300 pr-3">Notifications</span>
							<span class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full">3</span>
						</div>
						<div class="relative inline-flex items-center">
							<span class="text-gray-700 dark:text-gray-300 pr-3">Updates</span>
							<span class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-green-600 text-white rounded-full">1</span>
						</div>
					</div>
				</div>

				<!-- Category Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Categories & Technology Tags</h4>
					<div class="flex flex-wrap gap-2">
						<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">React</span>
						<span class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">Svelte</span>
						<span class="px-2.5 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-md">TypeScript</span>
						<span class="px-2.5 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-md">JavaScript</span>
						<span class="px-2.5 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-md">CSS</span>
						<span class="px-2.5 py-1 text-sm bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-md">HTML</span>
					</div>
				</div>

				<!-- Priority and Urgency Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Priority & Urgency Levels</h4>
					<div class="flex flex-wrap gap-3">
						<span class="px-2.5 py-1 text-sm bg-red-600 text-white rounded-md font-semibold">Critical</span>
						<span class="px-2.5 py-1 text-sm bg-orange-600 text-white rounded-md font-medium">High</span>
						<span class="px-2.5 py-1 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md">Medium</span>
						<span class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">Low</span>
						<span class="px-2.5 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md">Optional</span>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
