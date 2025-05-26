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

	// Code examples
	const basicExample = '<Button>Click Me</Button>';
	const variantsExample =
		'<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="success">Success</Button>\n<Button variant="danger">Danger</Button>\n<Button variant="warning">Warning</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="gradient">Gradient</Button>';
	const sizesExample =
		'<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n<Button size="xl">Extra Large</Button>';
	const animationsExample =
		'<Button animation="none">No Animation</Button>\n<Button animation="pulse">Pulse</Button>\n<Button animation="bounce">Bounce</Button>\n<Button animation="glow">Glow</Button>\n<Button animation="float">Float</Button>\n<Button animation="scale">Scale</Button>';
	const statesExample =
		'<Button>Normal</Button>\n<Button loading={true}>Loading</Button>\n<Button disabled={true}>Disabled</Button>';
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Button Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				A versatile button component with multiple variants, sizes, and animations.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Button"
			description="The default button component."
			codeSnippet={basicExample}
		>
			<div class="flex space-x-4">
				<Button>Click Me</Button>
			</div>
		</ComponentPreview>

		<!-- Variants -->
		<ComponentPreview
			title="Button Variants"
			description="Different visual styles for the button."
			codeSnippet={variantsExample}
		>
			<div class="flex flex-wrap gap-4">
				{#each variants as variant}
					<Button variant={variant.value}>{variant.name}</Button>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Sizes -->
		<ComponentPreview
			title="Button Sizes"
			description="Buttons in different sizes."
			codeSnippet={sizesExample}
		>
			<div class="flex flex-wrap items-center gap-4">
				{#each sizes as size}
					<Button size={size.value} variant="primary">{size.name}</Button>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Animations -->
		<ComponentPreview
			title="Button Animations"
			description="Various interactive animations for buttons."
			codeSnippet={animationsExample}
		>
			<div class="flex flex-wrap gap-4">
				{#each animations as animation}
					<Button animation={animation.value} variant="primary">{animation.name}</Button>
				{/each}
			</div>
		</ComponentPreview>

		<!-- States -->
		<ComponentPreview
			title="Button States"
			description="Different states a button can have."
			codeSnippet={statesExample}
		>
			<div class="flex flex-wrap gap-4">
				{#each states as state}
					<Button loading={state.loading} disabled={state.disabled} variant="primary">
						{state.name}
					</Button>
				{/each}
			</div>
		</ComponentPreview>

		<!-- With Icons -->
		<ComponentPreview
			title="Buttons with Icons"
			description="Buttons that include icons for enhanced visual appeal."
			codeSnippet={'<Button>\n  <svg slot="icon" class="h-5 w-5" fill="currentColor">\n    <!-- icon paths -->\n  </svg>\n  Button Text\n</Button>'}
		>
			<div class="flex flex-wrap gap-4">
				<Button variant="primary" size="md">
					<span class="inline-flex items-center">
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
						</svg>
						Add Item
					</span>
				</Button>

				<Button variant="secondary" size="md">
					<span class="inline-flex items-center">
						Download
						<svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
						</svg>
					</span>
				</Button>

				<Button variant="success" size="md">
					<span class="inline-flex items-center">
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						Save Changes
					</span>
				</Button>
			</div>
		</ComponentPreview>
	</div>
</section>
