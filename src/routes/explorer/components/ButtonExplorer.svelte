<!-- Button Component Explorer -->
<script lang="ts">
	import { Button } from '$lib/components/Button';
	import ComponentPreview from '../ComponentPreview.svelte';

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'error' | 'ghost' | 'glass' | 'neon' | 'morphic' | 'gradient';
	type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
	type ButtonAnimation = 'none' | 'pulse' | 'bounce' | 'glow' | 'float' | 'scale';

	// Button variants
	const variants: { name: string; value: ButtonVariant }[] = [
		{ name: 'Primary', value: 'primary' },
		{ name: 'Secondary', value: 'secondary' },
		{ name: 'Success', value: 'success' },
		{ name: 'Danger', value: 'danger' },
		{ name: 'Warning', value: 'warning' },
		{ name: 'Ghost', value: 'ghost' },
		{ name: 'Gradient', value: 'gradient' },
		{ name: 'Glass', value: 'glass' },
		{ name: 'Neon', value: 'neon' },
		{ name: 'Morphic', value: 'morphic' },
	];

	// Button sizes
	const sizes: { name: string; value: ButtonSize }[] = [
		{ name: 'Small', value: 'sm' },
		{ name: 'Medium', value: 'md' },
		{ name: 'Large', value: 'lg' },
		{ name: 'Extra Large', value: 'xl' },
	];

	// Button animations
	const animations: { name: string; value: ButtonAnimation }[] = [
		{ name: 'None', value: 'none' },
		{ name: 'Pulse', value: 'pulse' },
		{ name: 'Bounce', value: 'bounce' },
		{ name: 'Glow', value: 'glow' },
		{ name: 'Float', value: 'float' },
		{ name: 'Scale', value: 'scale' },
	];

	// Button states
	const states = [
		{ name: 'Normal', loading: false, disabled: false },
		{ name: 'Loading', loading: true, disabled: false },
		{ name: 'Disabled', loading: false, disabled: true },
	];

	// Comprehensive code examples for each smart group
	const fundamentalsExample = `<!-- Button Variants -->
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="glass">Glass</Button>
<Button variant="neon">Neon</Button>
<Button variant="morphic">Morphic</Button>

<!-- Button Sizes -->
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`;

	const interactiveFeaturesExample = `<!-- Button Animations -->
<Button animation="pulse">Pulse</Button>
<Button animation="bounce">Bounce</Button>
<Button animation="glow">Glow</Button>
<Button animation="float">Float</Button>
<Button animation="scale">Scale</Button>

<!-- Button States -->
<Button>Normal</Button>
<Button loading={true}>Loading</Button>
<Button disabled={true}>Disabled</Button>

<!-- Interactive Combinations -->
<Button variant="primary" animation="glow" size="lg">
  Call to Action
</Button>`;

	const advancedButtonTypesExample = `<!-- Icon Buttons -->
<Button variant="primary">
  <span class="inline-flex items-center">
    <PlusIcon class="w-4 h-4 mr-2" />
    Add Item
  </span>
</Button>

<Button variant="success">
  <span class="inline-flex items-center">
    <CheckIcon class="w-4 h-4 mr-2" />
    Save Changes
  </span>
</Button>

<!-- Icon-only Buttons -->
<Button variant="ghost" size="sm" class="p-2">
  <SearchIcon class="w-4 h-4" />
</Button>

<!-- Floating Action Button -->
<Button variant="primary" size="lg" animation="float" class="rounded-full p-4">
  <PlusIcon class="w-6 h-6" />
</Button>`;

	const buttonGroupsExample = `<!-- Segmented Controls -->
<div class="inline-flex rounded-lg shadow-sm border overflow-hidden">
  <Button variant="secondary" class="rounded-none border-0">Left</Button>
  <Button variant="secondary" class="rounded-none border-0">Center</Button>
  <Button variant="secondary" class="rounded-none border-0">Right</Button>
</div>

<!-- Action Groups -->
<div class="flex gap-2">
  <Button variant="primary">Save</Button>
  <Button variant="ghost">Cancel</Button>
  <Button variant="danger">Delete</Button>
</div>

<!-- Toolbar Button Group -->
<div class="flex gap-1 p-2 bg-gray-100 rounded-lg">
  <Button variant="ghost" size="sm">Bold</Button>
  <Button variant="ghost" size="sm">Italic</Button>
  <Button variant="ghost" size="sm">Underline</Button>
</div>`;
</script>

<section>
	<div class="max-w-6xl mx-auto">
		<div class="mb-8">
			<h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
				Button Component
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
				A versatile button component with multiple variants, sizes, animations, and interactive states.
				Perfect for CTAs, forms, and user interactions.
			</p>
		</div>

		<!-- Smart Grouped Examples -->
		<ComponentPreview
			title="Button Fundamentals & Basic Usage"
			description="Essential button styles and sizing options including all visual variants and size configurations for common interface needs."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["visual-styles", "sizing", "variants", "theme-support", "accessibility"]}
		>
			<div class="p-6 space-y-8">
				<!-- Button Variants Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Visual Variants</h3>
					<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{#each variants as variant}
							<div class="flex flex-col items-center space-y-2">
								<Button variant={variant.value} size="md" class="w-full">
									{variant.name}
								</Button>
								<span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
									{variant.name}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Button Sizes Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Size Options</h3>
					<div class="flex flex-wrap items-center justify-center gap-6">
						{#each sizes as size}
							<div class="flex flex-col items-center space-y-2">
								<Button size={size.value} variant="primary">
									{size.name}
								</Button>
								<span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
									{size.value}
								</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ComponentPreview>

		<ComponentPreview
			title="Interactive Features & Animations"
			description="Dynamic button behaviors including hover animations, loading states, and interactive feedback for enhanced user experience."
			codeSnippet={interactiveFeaturesExample}
			complexity="Intermediate"
			features={["animations", "states", "micro-interactions", "loading-states", "visual-feedback"]}
		>
			<div class="p-6 space-y-8">
				<!-- Animations Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Interactive Animations</h3>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
						{#each animations as animation}
							<div class="flex flex-col items-center space-y-3">
								<Button animation={animation.value} variant="primary" size="md">
									{animation.name}
								</Button>
								<span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
									{animation.value}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- States Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Button States</h3>
					<div class="flex flex-wrap items-center justify-center gap-8">
						{#each states as state}
							<div class="flex flex-col items-center space-y-3">
								<Button 
									loading={state.loading} 
									disabled={state.disabled} 
									variant="primary"
									size="md"
								>
									{state.name}
								</Button>
								<span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
									{state.name}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Interactive Showcase -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Feature Combination</h3>
					<div class="flex justify-center">
						<Button variant="primary" animation="glow" size="lg" class="px-8">
							Enhanced Call to Action
						</Button>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<ComponentPreview
			title="Advanced Button Types & Icons"
			description="Specialized button implementations including icon integration, floating action buttons, and complex button designs for advanced interfaces."
			codeSnippet={advancedButtonTypesExample}
			complexity="Advanced"
			features={["icon-integration", "floating-buttons", "specialized-buttons", "action-clarity"]}
		>
			<div class="p-6 space-y-8">
				<!-- Icon Buttons Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Buttons with Icons</h3>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Button variant="primary" size="md" class="w-full">
							<span class="inline-flex items-center justify-center">
								<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
								</svg>
								Add Item
							</span>
						</Button>

						<Button variant="success" size="md" class="w-full">
							<span class="inline-flex items-center justify-center">
								<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								Save Changes
							</span>
						</Button>

						<Button variant="secondary" size="md" class="w-full">
							<span class="inline-flex items-center justify-center">
								Download
								<svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
							</span>
						</Button>
					</div>
				</div>

				<!-- Icon-only Buttons -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Icon-only Buttons</h3>
					<div class="flex flex-wrap items-center justify-center gap-4">
						<Button variant="ghost" size="sm" class="p-2">
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
							</svg>
						</Button>
						<Button variant="ghost" size="sm" class="p-2">
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
							</svg>
						</Button>
						<Button variant="ghost" size="sm" class="p-2">
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd" />
								<path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 000 2h4a1 1 0 100-2H8z" clip-rule="evenodd" />
							</svg>
						</Button>
					</div>
				</div>

				<!-- Floating Action Button -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Floating Action Button</h3>
					<div class="flex justify-center">
						<Button variant="primary" size="lg" animation="float" class="rounded-full p-4 shadow-lg">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<ComponentPreview
			title="Button Groups & Layout Patterns"
			description="Advanced button arrangements including segmented controls, action groups, and toolbar patterns for complex interface organization."
			codeSnippet={buttonGroupsExample}
			complexity="Advanced"
			features={["button-groups", "segmented-controls", "toolbar-patterns", "layout-organization"]}
		>
			<div class="p-6 space-y-8">
				<!-- Segmented Controls -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Segmented Controls</h3>
					<div class="flex flex-col items-center space-y-3">
						<div class="inline-flex rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
							<Button variant="secondary" size="md" class="rounded-none border-0 border-r border-gray-200 dark:border-gray-600">
								Left
							</Button>
							<Button variant="secondary" size="md" class="rounded-none border-0 border-r border-gray-200 dark:border-gray-600">
								Center
							</Button>
							<Button variant="secondary" size="md" class="rounded-none border-0">
								Right
							</Button>
						</div>
						<span class="text-xs text-gray-500 dark:text-gray-400">Mutually exclusive options</span>
					</div>
				</div>

				<!-- Action Groups -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Action Groups</h3>
					<div class="flex flex-col items-center space-y-3">
						<div class="flex gap-2">
							<Button variant="primary" size="md">
								Save
							</Button>
							<Button variant="ghost" size="md">
								Cancel
							</Button>
							<Button variant="danger" size="md">
								Delete
							</Button>
						</div>
						<span class="text-xs text-gray-500 dark:text-gray-400">Related actions</span>
					</div>
				</div>

				<!-- Toolbar Pattern -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Toolbar Patterns</h3>
					<div class="flex flex-col items-center space-y-3">
						<div class="flex gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
							<Button variant="ghost" size="sm" class="text-xs">
								<span class="font-semibold">B</span>
							</Button>
							<Button variant="ghost" size="sm" class="text-xs">
								<span class="italic">I</span>
							</Button>
							<Button variant="ghost" size="sm" class="text-xs">
								<span class="underline">U</span>
							</Button>
							<div class="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
							<Button variant="ghost" size="sm" class="text-xs">
								←
							</Button>
							<Button variant="ghost" size="sm" class="text-xs">
								→
							</Button>
						</div>
						<span class="text-xs text-gray-500 dark:text-gray-400">Text formatting toolbar</span>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
