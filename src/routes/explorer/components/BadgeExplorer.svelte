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

	// Code examples
	const basicExample = `<span class="px-2.5 py-1 text-sm bg-gray-100 dark:bg-gray-800 
              text-gray-800 dark:text-gray-200 rounded-md">
  Default
</span>`;

	const variantsExample = `<!-- Soft variants -->
<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 
              text-blue-800 dark:text-blue-300 rounded-md">Primary</span>
<span class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 
              text-green-800 dark:text-green-300 rounded-md">Success</span>
<span class="px-2.5 py-1 text-sm bg-red-100 dark:bg-red-900/30 
              text-red-800 dark:text-red-300 rounded-md">Error</span>

<!-- Solid variants -->
<span class="px-2.5 py-1 text-sm bg-blue-600 text-white rounded-md">Primary</span>
<span class="px-2.5 py-1 text-sm bg-green-600 text-white rounded-md">Success</span>
<span class="px-2.5 py-1 text-sm bg-red-600 text-white rounded-md">Error</span>`;

	const sizesExample = `<span class="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Small</span>
<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Default</span>
<span class="px-3 py-1.5 text-base bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">Large</span>`;
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

		<!-- Soft Variants -->
		<ComponentPreview
			title="Soft Variants"
			description="Subtle background badges with semantic colors that adapt to theme"
			codeSnippet={variantsExample}
		>
		>
			<div class="flex flex-wrap gap-3">
				{#each variants as variant}
					<span class="px-2.5 py-1 text-sm font-medium rounded-md {variant.class}">
						{variant.name}
					</span>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Solid Variants -->
		<ComponentPreview
			title="Solid Variants"
			description="High-contrast solid badges for important status indicators"
			codeSnippet={variantsExample}
		>
		>
			<div class="flex flex-wrap gap-3">
				{#each solidVariants as variant}
					<span class="px-2.5 py-1 text-sm font-medium rounded-md {variant.class}">
						{variant.name}
					</span>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Outline Variants -->
		<ComponentPreview
			title="Outline Variants"
			description="Minimalist outline badges with theme-aware borders"
			codeSnippet={variantsExample}
		>
		>
			<div class="flex flex-wrap gap-3">
				{#each outlineVariants as variant}
					<span class="px-2.5 py-1 text-sm font-medium rounded-md bg-transparent {variant.class}">
						{variant.name}
					</span>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Sizes -->
		<ComponentPreview
			title="Sizes"
			description="Different badge sizes for various use cases"
			codeSnippet={sizesExample}
		>
		>
			<div class="flex flex-wrap items-center gap-4">
				{#each sizes as size}
					<div class="flex items-center space-x-2">
						<span class="text-sm text-gray-500 dark:text-gray-400">{size.name}:</span>
						<span
							class="font-medium rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 {size.class}"
						>
							Badge
						</span>
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Shapes -->
		<ComponentPreview
			title="Shapes"
			description="Various badge shapes and border radius options"
			codeSnippet={sizesExample}
		>
		>
			<div class="flex flex-wrap items-center gap-4">
				{#each shapes as shape}
					<div class="flex items-center space-x-2">
						<span class="text-sm text-gray-500 dark:text-gray-400">{shape.name}:</span>
						<span
							class="px-2.5 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 {shape.class}"
						>
							Badge
						</span>
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- With Icons -->
		<ComponentPreview
			title="With Icons"
			description="Badges enhanced with icons for better visual communication"
			codeSnippet={'<span class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">\n  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">\n    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />\n  </svg>\n  Success\n</span>'}
		>
			<div class="flex flex-wrap gap-3">
				<span
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md"
				>
					<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
					Success
				</span>

				<span
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md"
				>
					<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
					Error
				</span>

				<span
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
				>
					<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/>
					</svg>
					Info
				</span>

				<span
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md"
				>
					<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					Warning
				</span>
			</div>
		</ComponentPreview>

		<!-- Interactive Badges -->
		<ComponentPreview
			title="Interactive Badges"
			description="Clickable badges with hover and focus states"
			codeSnippet={'<button class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">\n  Clickable Badge\n</button>'}
		>
		>
			<div class="flex flex-wrap gap-3">
				<button
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
				>
					Clickable
				</button>

				<button
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
				>
					Category
				</button>

				<button
					class="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
				>
					Tag
					<svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</ComponentPreview>

		<!-- Use Cases -->
		<ComponentPreview
			title="Common Use Cases"
			description="Real-world examples of badge usage"
			codeSnippet={'<!-- Status indicators -->\n<span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">Online</span>\n\n<!-- Notification counts -->\n<span class="px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">3</span>\n\n<!-- Categories and tags -->\n<span class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">React</span>'}
		>
		>
			<div class="space-y-6">
				<!-- Status Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Status Indicators</h4>
					<div class="flex flex-wrap gap-2">
						<span
							class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full"
							>● Online</span
						>
						<span
							class="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full"
							>● Away</span
						>
						<span
							class="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full"
							>● Offline</span
						>
						<span
							class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
							>● Busy</span
						>
					</div>
				</div>

				<!-- Notification Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
						Notification Counts
					</h4>
					<div class="flex items-center space-x-4">
						<div class="relative">
							<span class="text-gray-700 dark:text-gray-300">Messages</span>
							<span
								class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full"
								>12</span
							>
						</div>
						<div class="relative">
							<span class="text-gray-700 dark:text-gray-300">Notifications</span>
							<span
								class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full"
								>3</span
							>
						</div>
					</div>
				</div>

				<!-- Category Examples -->
				<div>
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Categories & Tags</h4>
					<div class="flex flex-wrap gap-2">
						<span
							class="px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
							>React</span
						>
						<span
							class="px-2.5 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md"
							>Svelte</span
						>
						<span
							class="px-2.5 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-md"
							>TypeScript</span
						>
						<span
							class="px-2.5 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-md"
							>JavaScript</span
						>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
