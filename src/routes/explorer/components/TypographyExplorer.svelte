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

	// Code examples
	const headingsExample = `<h1 class="text-4xl font-bold">Heading 1</h1>
<h2 class="text-3xl font-bold">Heading 2</h2>
<h3 class="text-2xl font-bold">Heading 3</h3>
<h4 class="text-xl font-bold">Heading 4</h4>`;

	const textExample = `<p class="text-lg">Large body text</p>
<p class="text-base">Regular body text</p>
<p class="text-sm">Small body text</p>
<span class="text-xs">Caption text</span>`;

	const colorsExample = `<p class="text-gray-900 dark:text-white">Primary text</p>
<p class="text-gray-600 dark:text-gray-300">Secondary text</p>
<p class="text-green-600 dark:text-green-400">Success text</p>
<p class="text-red-600 dark:text-red-400">Error text</p>`;

	const gradientExample = `<h2 class="bg-gradient-to-r from-blue-600 to-purple-600 
         dark:from-blue-400 dark:to-purple-400 
         bg-clip-text text-transparent">
  Gradient Text
</h2>`;

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

		<!-- Headings -->
		<ComponentPreview
			title="Headings"
			description="Semantic heading styles with proper hierarchy and responsive sizing"
			codeSnippet={headingsExample}
		>
			<div class="space-y-6">
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
		</ComponentPreview>

		<!-- Text Variants -->
		<ComponentPreview
			title="Text Styles"
			description="Various text styles for different content types and hierarchy levels"
			codeSnippet={textExample}
		>
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
		</ComponentPreview>

		<!-- Color Variants -->
		<ComponentPreview
			title="Text Colors"
			description="Semantic color variants that adapt to light and dark themes"
			codeSnippet={colorsExample}
		>
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
		</ComponentPreview>

		<!-- Gradient Text -->
		<ComponentPreview
			title="Gradient Text"
			description="Eye-catching gradient text effects with theme adaptation"
			codeSnippet={gradientExample}
		>
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
		</ComponentPreview>

		<!-- Typography Scale -->
		<ComponentPreview
			title="Typography Scale"
			description="Complete typography scale showing size relationships"
			codeSnippet="<!-- Typography scale demonstration -->"
		>
			<div
				class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
			>
				<div class="space-y-4">
					<div class="text-6xl font-bold text-gray-900 dark:text-white">Aa</div>
					<div class="text-5xl font-bold text-gray-900 dark:text-white">Aa</div>
					<div class="text-4xl font-bold text-gray-900 dark:text-white">Aa</div>
					<div class="text-3xl font-bold text-gray-900 dark:text-white">Aa</div>
					<div class="text-2xl font-bold text-gray-900 dark:text-white">Aa</div>
					<div class="text-xl font-bold text-gray-900 dark:text-white">Aa</div>
					<div class="text-lg text-gray-900 dark:text-white">Aa</div>
					<div class="text-base text-gray-900 dark:text-white">Aa</div>
					<div class="text-sm text-gray-900 dark:text-white">Aa</div>
					<div class="text-xs text-gray-900 dark:text-white">Aa</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Text Formatting -->
		<ComponentPreview
			title="Text Formatting"
			description="Common text formatting utilities and combinations"
			codeSnippet={'<p class="font-bold">Bold text</p>\n<p class="italic">Italic text</p>\n<p class="underline">Underlined text</p>\n<p class="line-through">Strikethrough text</p>'}
			>
			<div class="grid md:grid-cols-2 gap-4">
				<div class="space-y-4">
					<div
						class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
					>
						<div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
							Font Weights
						</div>
						<div class="space-y-2 text-gray-900 dark:text-white">
							<div class="font-thin">Thin (100)</div>
							<div class="font-light">Light (300)</div>
							<div class="font-normal">Normal (400)</div>
							<div class="font-medium">Medium (500)</div>
							<div class="font-semibold">Semibold (600)</div>
							<div class="font-bold">Bold (700)</div>
							<div class="font-extrabold">Extra Bold (800)</div>
						</div>
					</div>
				</div>

				<div class="space-y-4">
					<div
						class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
					>
						<div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
							Text Decorations
						</div>
						<div class="space-y-2 text-gray-900 dark:text-white">
							<div class="underline">Underlined text</div>
							<div class="line-through">Strikethrough text</div>
							<div class="italic">Italic text</div>
							<div class="uppercase">Uppercase text</div>
							<div class="lowercase">Lowercase text</div>
							<div class="capitalize">Capitalized text</div>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Headings -->
		<ComponentPreview
			title="Headings"
			description="Semantic heading elements with consistent sizing and weight"
			codeSnippet={`<h1 class="text-5xl font-bold">Heading 1</h1>
<h2 class="text-4xl font-bold">Heading 2</h2>
<h3 class="text-3xl font-semibold">Heading 3</h3>
<h4 class="text-2xl font-semibold">Heading 4</h4>
<h5 class="text-xl font-medium">Heading 5</h5>
<h6 class="text-lg font-medium">Heading 6</h6>`}
		>
			<div class="space-y-4">
				{#each headings as heading}
					<svelte:element this={heading.tag} class="{heading.class} {isDark ? 'text-white' : 'text-gray-900'}">
						{heading.text}
					</svelte:element>
				{/each}
			</div>
		</ComponentPreview>
		
		<!-- Text Sizes -->
		<ComponentPreview
			title="Text Sizes"
			description="Consistent text sizing scale for body copy and UI elements"
			codeSnippet={`<p class="text-xs">Extra small text</p>
<p class="text-sm">Small text</p>
<p class="text-base">Base text (default)</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large text</p>
<p class="text-2xl">2XL text</p>`}
		>
			<div class="space-y-3">
				{#each textSizes as size}
					<div>
						<span class="text-xs font-medium {isDark ? 'text-gray-400' : 'text-gray-500'}">{size.name}:</span>
						<p class="{size.class} {isDark ? 'text-gray-200' : 'text-gray-700'}">{size.sample}</p>
					</div>
				{/each}
			</div>
		</ComponentPreview>
		
		<!-- Font Weights -->
		<ComponentPreview
			title="Font Weights"
			description="Full range of font weights for emphasis and hierarchy"
			codeSnippet={`<p class="font-thin">Thin (100)</p>
<p class="font-extralight">Extra Light (200)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra Bold (800)</p>
<p class="font-black">Black (900)</p>`}
		>
			<div class="space-y-2">
				{#each fontWeights as weight}
					<p class="text-lg {weight.class} {isDark ? 'text-gray-200' : 'text-gray-700'}">
						{weight.name} ({weight.weight})
					</p>
				{/each}
			</div>
		</ComponentPreview>
		
		<!-- Prose Content -->
		<ComponentPreview
			title="Prose Content"
			description="Optimized typography for long-form content with proper line height and spacing"
			codeSnippet={`<article class="prose dark:prose-invert max-w-none">
  <h2>Article Title</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
  <blockquote>
    <p>This is a blockquote with proper styling.</p>
  </blockquote>
  <ul>
    <li>Unordered list item</li>
    <li>Another list item</li>
  </ul>
</article>`}
		>
			<article class="prose dark:prose-invert max-w-none">
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
		</ComponentPreview>
		
		<!-- Special Text Styles -->
		<ComponentPreview
			title="Special Text Styles"
			description="Decorative and functional text styles for various use cases"
			codeSnippet={`<!-- Gradient text -->
<h3 class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Gradient Text
</h3>

<!-- Truncated text -->
<p class="truncate">This is a very long text that will be truncated...</p>

<!-- Letter spacing -->
<p class="tracking-tight">Tight letter spacing</p>
<p class="tracking-wide">Wide letter spacing</p>

<!-- Text decoration -->
<p class="underline">Underlined text</p>
<p class="line-through">Strikethrough text</p>`}
		>
			<div class="space-y-4">
				<h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
					Gradient Text Effect
				</h3>
				
				<div class="space-y-2">
					<p class="truncate {isDark ? 'text-gray-300' : 'text-gray-700'}">
						This is a very long text that will be truncated with an ellipsis when it exceeds the container width
					</p>
					
					<p class="tracking-tight {isDark ? 'text-gray-300' : 'text-gray-700'}">Tight letter spacing</p>
					<p class="tracking-normal {isDark ? 'text-gray-300' : 'text-gray-700'}">Normal letter spacing</p>
					<p class="tracking-wide {isDark ? 'text-gray-300' : 'text-gray-700'}">Wide letter spacing</p>
					
					<p class="underline {isDark ? 'text-gray-300' : 'text-gray-700'}">Underlined text</p>
					<p class="line-through {isDark ? 'text-gray-300' : 'text-gray-700'}">Strikethrough text</p>
					<p class="italic {isDark ? 'text-gray-300' : 'text-gray-700'}">Italic text style</p>
				</div>
			</div>
		</ComponentPreview>
		
		<!-- Responsive Typography -->
		<ComponentPreview
			title="Responsive Typography"
			description="Typography that adapts to different screen sizes"
			codeSnippet={`<h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
  Responsive Heading
</h1>
<p class="text-sm md:text-base lg:text-lg">
  Responsive body text that scales with screen size
</p>`}
		>
			<div class="space-y-4">
				<h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">
					Responsive Heading
				</h1>
				<p class="text-sm md:text-base lg:text-lg {isDark ? 'text-gray-300' : 'text-gray-700'}">
					This text adapts its size based on the screen size, ensuring optimal readability across all devices.
				</p>
			</div>
		</ComponentPreview>

		<!-- Typography Guidelines -->
		<ComponentPreview
			title="Typography Guidelines"
			description="Best practices and recommendations for using typography effectively"
			codeSnippet="<!-- Typography guidelines and best practices -->"
		>
			<div class="grid md:grid-cols-2 gap-6">
				<div class="space-y-4">
					<h4 class="text-lg font-semibold {currentTheme === THEMES.DARK ? 'text-white' : 'text-gray-900'}">
						Best Practices
					</h4>
					<ul class="space-y-2 {currentTheme === THEMES.DARK ? 'text-gray-300' : 'text-gray-700'}">
						<li class="flex items-start">
							<span class="text-green-500 mr-2">✓</span>
							Use consistent font sizes throughout your application
						</li>
						<li class="flex items-start">
							<span class="text-green-500 mr-2">✓</span>
							Maintain proper contrast ratios for accessibility
						</li>
						<li class="flex items-start">
							<span class="text-green-500 mr-2">✓</span>
							Use semantic HTML elements for proper hierarchy
						</li>
						<li class="flex items-start">
							<span class="text-green-500 mr-2">✓</span>
							Test typography on different screen sizes
						</li>
					</ul>
				</div>
				
				<div class="space-y-4">
					<h4 class="text-lg font-semibold {currentTheme === THEMES.DARK ? 'text-white' : 'text-gray-900'}">
						Avoid
					</h4>
					<ul class="space-y-2 {currentTheme === THEMES.DARK ? 'text-gray-300' : 'text-gray-700'}">
						<li class="flex items-start">
							<span class="text-red-500 mr-2">✗</span>
							Using too many different font sizes
						</li>
						<li class="flex items-start">
							<span class="text-red-500 mr-2">✗</span>
							Poor color contrast between text and background
						</li>
						<li class="flex items-start">
							<span class="text-red-500 mr-2">✗</span>
							Extremely long lines of text without breaks
						</li>
						<li class="flex items-start">
							<span class="text-red-500 mr-2">✗</span>
							Inconsistent spacing between text elements
						</li>
					</ul>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
