<script>
	import { fade, slide } from 'svelte/transition';
	import { theme, THEMES } from '$lib/stores/theme.js';
	import ComponentPreview from '../ComponentPreview.svelte';

	let currentTheme = THEMES.LIGHT;

	// Subscribe to theme changes
	theme.subscribe((value) => {
		currentTheme = value;
	});

	// Add isDark computed value
	$: isDark = currentTheme === THEMES.DARK;

	// Typography variants
	const headingVariants = [
		{ name: 'Display', class: 'text-5xl md:text-6xl font-bold', text: 'Display Text' },
		{ name: 'H1', class: 'text-4xl font-bold', text: 'Heading 1' },
		{ name: 'H2', class: 'text-3xl font-bold', text: 'Heading 2' },
		{ name: 'H3', class: 'text-2xl font-bold', text: 'Heading 3' },
		{ name: 'H4', class: 'text-xl font-bold', text: 'Heading 4' },
		{ name: 'H5', class: 'text-lg font-bold', text: 'Heading 5' },
		{ name: 'H6', class: 'text-base font-bold', text: 'Heading 6' },
	];

	const textVariants = [
		{
			name: 'Body Large',
			class: 'text-lg',
			text: 'Large body text for enhanced readability and emphasis',
		},
		{
			name: 'Body',
			class: 'text-base',
			text: 'Regular body text for general content and paragraphs',
		},
		{ name: 'Body Small', class: 'text-sm', text: 'Small body text for secondary information' },
		{ name: 'Caption', class: 'text-xs', text: 'Caption text for image descriptions and notes' },
		{
			name: 'Label',
			class: 'text-sm font-medium',
			text: 'Label text for form fields and UI elements',
		},
		{
			name: 'Code',
			class: 'text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded',
			text: 'const example = "code"',
		},
	];

	const colorVariants = [
		{ name: 'Primary', class: 'text-gray-900 dark:text-white', text: 'Primary text color' },
		{ name: 'Secondary', class: 'text-gray-600 dark:text-gray-300', text: 'Secondary text color' },
		{ name: 'Muted', class: 'text-gray-500 dark:text-gray-400', text: 'Muted text color' },
		{ name: 'Success', class: 'text-green-600 dark:text-green-400', text: 'Success text color' },
		{ name: 'Warning', class: 'text-yellow-600 dark:text-yellow-400', text: 'Warning text color' },
		{ name: 'Error', class: 'text-red-600 dark:text-red-400', text: 'Error text color' },
		{ name: 'Info', class: 'text-blue-600 dark:text-blue-400', text: 'Info text color' },
		{ name: 'Accent', class: 'text-purple-600 dark:text-purple-400', text: 'Accent text color' },
	];

	const gradientVariants = [
		{
			name: 'Blue Purple',
			class:
				'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent',
			text: 'Gradient Text',
		},
		{
			name: 'Green Blue',
			class:
				'bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-300 dark:to-blue-400 bg-clip-text text-transparent',
			text: 'Gradient Text',
		},
		{
			name: 'Pink Purple',
			class:
				'bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent',
			text: 'Gradient Text',
		},
		{
			name: 'Orange Red',
			class:
				'bg-gradient-to-r from-orange-400 to-red-500 dark:from-orange-300 dark:to-red-400 bg-clip-text text-transparent',
			text: 'Gradient Text',
		},
	];

	// Code examples for smart grouped sections
	const fundamentalsExample = `<!-- Complete typography hierarchy -->
<h1 class="text-5xl font-bold">Display Heading</h1>
<h2 class="text-4xl font-bold">Heading 1</h2>
<h3 class="text-3xl font-bold">Heading 2</h3>
<h4 class="text-2xl font-bold">Heading 3</h4>
<h5 class="text-xl font-bold">Heading 4</h5>
<h6 class="text-lg font-bold">Heading 5</h6>

<!-- Text sizing scale -->
<p class="text-2xl">2XL text</p>
<p class="text-xl">XL text</p>
<p class="text-lg">Large text</p>
<p class="text-base">Base text (default)</p>
<p class="text-sm">Small text</p>
<p class="text-xs">Extra small text</p>`;

	const stylingExample = `<!-- Font weights and formatting -->
<p class="font-thin">Thin weight (100)</p>
<p class="font-light">Light weight (300)</p>
<p class="font-normal">Normal weight (400)</p>
<p class="font-medium">Medium weight (500)</p>
<p class="font-semibold">Semibold weight (600)</p>
<p class="font-bold">Bold weight (700)</p>
<p class="font-black">Black weight (900)</p>

<!-- Text decorations -->
<p class="italic">Italic text</p>
<p class="underline">Underlined text</p>
<p class="line-through">Strikethrough text</p>
<p class="uppercase">Uppercase text</p>
<p class="tracking-wide">Wide letter spacing</p>

<!-- Special text styles -->
<code class="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
  const code = "example";
</code>`;

	const colorsAndEffectsExample = `<!-- Semantic text colors -->
<p class="text-gray-900 dark:text-white">Primary text</p>
<p class="text-gray-600 dark:text-gray-300">Secondary text</p>
<p class="text-gray-500 dark:text-gray-400">Muted text</p>
<p class="text-green-600 dark:text-green-400">Success text</p>
<p class="text-yellow-600 dark:text-yellow-400">Warning text</p>
<p class="text-red-600 dark:text-red-400">Error text</p>
<p class="text-blue-600 dark:text-blue-400">Info text</p>

<!-- Gradient text effects -->
<h2 class="bg-gradient-to-r from-blue-600 to-purple-600 
         dark:from-blue-400 dark:to-purple-400 
         bg-clip-text text-transparent text-3xl font-bold">
  Gradient Text Effect
</h2>
<h3 class="bg-gradient-to-r from-green-400 to-blue-500 
         dark:from-green-300 dark:to-blue-400 
         bg-clip-text text-transparent text-2xl font-bold">
  Another Gradient
</h3>`;

	const advancedExample = `<!-- Responsive typography -->
<h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
  Responsive Heading
</h1>
<p class="text-sm md:text-base lg:text-lg">
  Responsive body text that scales with screen size
</p>

<!-- Prose content -->
<article class="prose dark:prose-invert max-w-none">
  <h2>Article Title</h2>
  <p class="lead">Lead paragraph with enhanced styling.</p>
  <p>Regular paragraph text with proper spacing.</p>
  <blockquote>
    <p>This is a blockquote with proper styling.</p>
  </blockquote>
  <ul>
    <li>Unordered list item</li>
    <li>Another list item</li>
  </ul>
</article>

<!-- Advanced text utilities -->
<p class="truncate max-w-xs">This text will be truncated...</p>
<p class="break-words">Thisverylongwordwillbeproperlywrapped</p>`;

	// Typography scale
	const headings = [
		{ tag: 'h1', class: 'text-5xl font-bold', text: 'Heading 1' },
		{ tag: 'h2', class: 'text-4xl font-bold', text: 'Heading 2' },
		{ tag: 'h3', class: 'text-3xl font-semibold', text: 'Heading 3' },
		{ tag: 'h4', class: 'text-2xl font-semibold', text: 'Heading 4' },
		{ tag: 'h5', class: 'text-xl font-medium', text: 'Heading 5' },
		{ tag: 'h6', class: 'text-lg font-medium', text: 'Heading 6' }
	];
	
	const textSizes = [
		{ name: 'Extra Small', class: 'text-xs', sample: 'The quick brown fox jumps over the lazy dog' },
		{ name: 'Small', class: 'text-sm', sample: 'The quick brown fox jumps over the lazy dog' },
		{ name: 'Base', class: 'text-base', sample: 'The quick brown fox jumps over the lazy dog' },
		{ name: 'Large', class: 'text-lg', sample: 'The quick brown fox jumps over the lazy dog' },
		{ name: 'Extra Large', class: 'text-xl', sample: 'The quick brown fox jumps over the lazy dog' },
		{ name: '2XL', class: 'text-2xl', sample: 'The quick brown fox jumps over the lazy dog' }
	];
	
	const fontWeights = [
		{ name: 'Thin', class: 'font-thin', weight: '100' },
		{ name: 'Extra Light', class: 'font-extralight', weight: '200' },
		{ name: 'Light', class: 'font-light', weight: '300' },
		{ name: 'Normal', class: 'font-normal', weight: '400' },
		{ name: 'Medium', class: 'font-medium', weight: '500' },
		{ name: 'Semibold', class: 'font-semibold', weight: '600' },
		{ name: 'Bold', class: 'font-bold', weight: '700' },
		{ name: 'Extra Bold', class: 'font-extrabold', weight: '800' },
		{ name: 'Black', class: 'font-black', weight: '900' }
	];
</script>

<section class="space-y-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1
				class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4"
			>
				Typography System
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				A comprehensive typography system with responsive text styles, semantic hierarchy, and
				beautiful color variants that work perfectly in both light and dark modes.
			</p>
		</div>

		<!-- Typography Fundamentals & Hierarchy -->
		<ComponentPreview
			title="Typography Fundamentals & Hierarchy"
			description="Complete typography system showing heading hierarchy, text sizing scale, and fundamental structure"
			codeSnippet={fundamentalsExample}
			complexity="Basic"
		>
			<div class="space-y-8">
				<!-- Headings Hierarchy -->
				<div class="space-y-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Heading Hierarchy
					</h4>
					{#each headingVariants as variant}
						<div
							class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
						>
							<div class="flex items-center justify-between mb-3">
								<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
									>{variant.name}</span
								>
								<code class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
									>{variant.class}</code
								>
							</div>
							<div class="{variant.class} text-gray-900 dark:text-white">
								{variant.text}
							</div>
						</div>
					{/each}
				</div>

				<!-- Typography Scale Visualization -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Typography Scale
					</h4>
					<div
						class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
					>
						<div class="space-y-4">
							<div class="text-6xl font-bold text-gray-900 dark:text-white">6xl</div>
							<div class="text-5xl font-bold text-gray-900 dark:text-white">5xl</div>
							<div class="text-4xl font-bold text-gray-900 dark:text-white">4xl</div>
							<div class="text-3xl font-bold text-gray-900 dark:text-white">3xl</div>
							<div class="text-2xl font-bold text-gray-900 dark:text-white">2xl</div>
							<div class="text-xl font-bold text-gray-900 dark:text-white">xl</div>
							<div class="text-lg text-gray-900 dark:text-white">lg</div>
							<div class="text-base text-gray-900 dark:text-white">base</div>
							<div class="text-sm text-gray-900 dark:text-white">sm</div>
							<div class="text-xs text-gray-900 dark:text-white">xs</div>
						</div>
					</div>
				</div>

				<!-- Text Sizes -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Text Sizing Guide
					</h4>
					<div class="space-y-3">
						{#each textSizes as size}
							<div>
								<span class="text-xs font-medium {isDark ? 'text-gray-400' : 'text-gray-500'}">{size.name}:</span>
								<p class="{size.class} {isDark ? 'text-gray-200' : 'text-gray-700'}">{size.sample}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Text Styling & Formatting -->
		<ComponentPreview
			title="Text Styling & Formatting"
			description="Comprehensive text formatting options including font weights, decorations, and special styles"
			codeSnippet={stylingExample}
			complexity="Intermediate"
		>
			<div class="space-y-8">
				<!-- Font Weights -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Font Weights
					</h4>
					<div class="space-y-2">
						{#each fontWeights as weight}
							<div class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
								<p class="text-lg {weight.class} {isDark ? 'text-gray-200' : 'text-gray-700'}">
									{weight.name}
								</p>
								<span class="text-xs text-gray-500 dark:text-gray-400">({weight.weight})</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Text Variants -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Text Variants
					</h4>
					<div class="space-y-4">
						{#each textVariants as variant}
							<div
								class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
							>
								<div class="flex items-center justify-between mb-3">
									<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
										>{variant.name}</span
									>
									<code class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
										>{variant.class}</code
									>
								</div>
								<div class="{variant.class} text-gray-900 dark:text-white">
									{variant.text}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Text Decorations -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Text Decorations & Effects
					</h4>
					<div class="grid md:grid-cols-2 gap-4">
						<div
							class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
						>
							<div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
								Text Decorations
							</div>
							<div class="space-y-2 text-gray-900 dark:text-white">
								<div class="underline">Underlined text</div>
								<div class="line-through">Strikethrough text</div>
								<div class="italic">Italic text</div>
								<div class="uppercase">Uppercase text</div>
								<div class="lowercase">LOWERCASE text</div>
								<div class="capitalize">capitalized text</div>
							</div>
						</div>

						<div
							class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
						>
							<div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
								Letter Spacing
							</div>
							<div class="space-y-2 text-gray-900 dark:text-white">
								<div class="tracking-tight">Tight letter spacing</div>
								<div class="tracking-normal">Normal letter spacing</div>
								<div class="tracking-wide">Wide letter spacing</div>
								<div class="tracking-wider">Wider letter spacing</div>
								<div class="tracking-widest">Widest letter spacing</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Color Systems & Visual Effects -->
		<ComponentPreview
			title="Color Systems & Visual Effects"
			description="Semantic color variants and stunning gradient text effects that adapt to light and dark themes"
			codeSnippet={colorsAndEffectsExample}
			complexity="Intermediate"
		>
			<div class="space-y-8">
				<!-- Text Colors -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Semantic Text Colors
					</h4>
					<div class="grid md:grid-cols-2 gap-4">
						{#each colorVariants as variant}
							<div
								class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
							>
								<div class="flex items-center justify-between mb-3">
									<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
										>{variant.name}</span
									>
								</div>
								<div class="{variant.class} text-base font-medium">
									{variant.text}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Gradient Text Effects -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Gradient Text Effects
					</h4>
					<div class="grid md:grid-cols-2 gap-6">
						{#each gradientVariants as variant}
							<div
								class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-center"
							>
								<div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
									{variant.name}
								</div>
								<div class="{variant.class} text-2xl font-bold">
									{variant.text}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Special Text Styles -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Special Text Styles
					</h4>
					<div class="space-y-4">
						<h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
							Large Gradient Heading
						</h3>
						
						<div class="space-y-3">
							<div class="max-w-xs">
								<span class="text-xs font-medium {isDark ? 'text-gray-400' : 'text-gray-500'}">Truncated text:</span>
								<p class="truncate {isDark ? 'text-gray-300' : 'text-gray-700'}">
									This is a very long text that will be truncated with an ellipsis when it exceeds the container width
								</p>
							</div>
							
							<div>
								<span class="text-xs font-medium {isDark ? 'text-gray-400' : 'text-gray-500'}">Code text:</span>
								<code class="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded {isDark ? 'text-gray-200' : 'text-gray-800'}">
									const example = "code";
								</code>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced Typography & Best Practices -->
		<ComponentPreview
			title="Advanced Typography & Best Practices"
			description="Responsive typography, prose content styling, and professional typography guidelines"
			codeSnippet={advancedExample}
			complexity="Advanced"
		>
			<div class="space-y-8">
				<!-- Responsive Typography -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Responsive Typography
					</h4>
					<div class="space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
						<h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">
							Responsive Heading
						</h1>
						<p class="text-sm md:text-base lg:text-lg {isDark ? 'text-gray-300' : 'text-gray-700'}">
							This text adapts its size based on the screen size, ensuring optimal readability across all devices.
						</p>
					</div>
				</div>

				<!-- Prose Content -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Prose Content Styling
					</h4>
					<article class="prose dark:prose-invert max-w-none p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
						<h2>The Art of Typography</h2>
						<p class="lead">
							Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
						</p>
						<p>
							Good typography enhances the reading experience and helps communicate the message effectively. It involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
						</p>
						<h3>Key Principles</h3>
						<ul>
							<li><strong>Hierarchy:</strong> Establish clear visual hierarchy</li>
							<li><strong>Readability:</strong> Ensure text is easy to read</li>
							<li><strong>Consistency:</strong> Maintain consistent styling</li>
							<li><strong>Contrast:</strong> Use contrast to create emphasis</li>
						</ul>
						<blockquote>
							<p>"Typography is what language looks like."</p>
							<cite>— Ellen Lupton</cite>
						</blockquote>
					</article>
				</div>

				<!-- Typography Guidelines -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Typography Guidelines & Best Practices
					</h4>
					<div class="grid md:grid-cols-2 gap-6">
						<div class="space-y-4">
							<h5 class="text-lg font-semibold {currentTheme === THEMES.DARK ? 'text-white' : 'text-gray-900'}">
								✅ Best Practices
							</h5>
							<ul class="space-y-2 {currentTheme === THEMES.DARK ? 'text-gray-300' : 'text-gray-700'}">
								<li class="flex items-start">
									<span class="text-green-500 mr-2">✓</span>
									Use consistent font sizes throughout your application
								</li>
								<li class="flex items-start">
									<span class="text-green-500 mr-2">✓</span>
									Maintain proper contrast ratios for accessibility (4.5:1 minimum)
								</li>
								<li class="flex items-start">
									<span class="text-green-500 mr-2">✓</span>
									Use semantic HTML elements for proper hierarchy
								</li>
								<li class="flex items-start">
									<span class="text-green-500 mr-2">✓</span>
									Test typography on different screen sizes and devices
								</li>
								<li class="flex items-start">
									<span class="text-green-500 mr-2">✓</span>
									Limit line length to 45-75 characters for readability
								</li>
							</ul>
						</div>
						
						<div class="space-y-4">
							<h5 class="text-lg font-semibold {currentTheme === THEMES.DARK ? 'text-white' : 'text-gray-900'}">
								❌ Common Mistakes
							</h5>
							<ul class="space-y-2 {currentTheme === THEMES.DARK ? 'text-gray-300' : 'text-gray-700'}">
								<li class="flex items-start">
									<span class="text-red-500 mr-2">✗</span>
									Using too many different font sizes or weights
								</li>
								<li class="flex items-start">
									<span class="text-red-500 mr-2">✗</span>
									Poor color contrast between text and background
								</li>
								<li class="flex items-start">
									<span class="text-red-500 mr-2">✗</span>
									Extremely long lines of text without proper breaks
								</li>
								<li class="flex items-start">
									<span class="text-red-500 mr-2">✗</span>
									Inconsistent spacing between text elements
								</li>
								<li class="flex items-start">
									<span class="text-red-500 mr-2">✗</span>
									Overusing decorative fonts or effects
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
