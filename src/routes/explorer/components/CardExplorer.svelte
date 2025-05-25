<!-- Card Component Explorer -->
<script>
	import { Card } from '$lib/components/Card';
	import ComponentPreview from '../ComponentPreview.svelte';

	// Card variants
	const variants = [
		{ name: 'Standard', value: 'standard' },
		{ name: 'Elevated', value: 'elevated' },
		{ name: 'Outlined', value: 'outlined' },
		{ name: 'Glass', value: 'glass' },
		{ name: 'Neon', value: 'neon' },
		{ name: 'Morphic', value: 'morphic' },
		{ name: 'Gradient', value: 'gradient' },
	];

	// Code examples - simplified to avoid template literal conflicts
	const basicExample = `import { Card } from 'svelte-ui-toolkit';

<Card title="Card Title" subtitle="Card Subtitle">
  <p>Card content goes here...</p>
</Card>`;

	const imageCardExample = `<Card 
  title="Mountain Landscape" 
  subtitle="A beautiful mountain view"
  image="/path/to/image.jpg"
>
  <p>This card showcases a beautiful mountain landscape with snow-capped peaks.</p>
</Card>`;

	const variantsExample = `<Card variant="standard" title="Standard Card">
  Standard card with shadow
</Card>

<Card variant="elevated" title="Elevated Card">
  Card with larger shadow
</Card>

<Card variant="outlined" title="Outlined Card">
  Card with border instead of shadow
</Card>

<Card variant="glass" title="Glass Card">
  Card with glassmorphism effect
</Card>

<Card variant="neon" title="Neon Card">
  Card with neon glow effect
</Card>`;

	const hoverEffectsExample = `<Card hoverEffect="lift" title="Lift Effect">
  Card lifts on hover
</Card>

<Card hoverEffect="scale" title="Scale Effect">
  Card scales on hover
</Card>

<Card hoverEffect="glow" title="Glow Effect">
  Card glows on hover
</Card>`;

	// Sample image for cards
	const sampleImage =
		'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80';
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Card Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Versatile card components with multiple variants, including parallax and 3D effects.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Card"
			description="The default card component."
			codeSnippet={basicExample}
		>
			<div class="w-full max-w-sm">
				<Card title="Card Title" subtitle="Card Subtitle">
					<p>
						This is a basic card with title and subtitle. Cards are used to group related content
						and actions.
					</p>
				</Card>
			</div>
		</ComponentPreview>

		<!-- Image Card -->
		<ComponentPreview
			title="Image Card"
			description="Card with an image."
			codeSnippet={imageCardExample}
		>
			<div class="w-full max-w-sm">
				<Card title="Mountain Landscape" subtitle="A beautiful mountain view" image={sampleImage}>
					<p>This card showcases a beautiful mountain landscape with snow-capped peaks.</p>
				</Card>
			</div>
		</ComponentPreview>

		<!-- Card Variants -->
		<ComponentPreview
			title="Card Variants"
			description="Different visual styles for cards."
			codeSnippet={variantsExample}
		>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<Card variant="standard" title="Standard Card" subtitle="Default variant">
					<p>Standard card with subtle shadow and hover effect.</p>
				</Card>

				<Card variant="elevated" title="Elevated Card" subtitle="More prominent">
					<p>Card with larger shadow for more emphasis.</p>
				</Card>

				<Card variant="outlined" title="Outlined Card" subtitle="Borderline">
					<p>Card with border instead of shadow for a more subtle look.</p>
				</Card>

				<Card variant="glass" title="Glass Card" subtitle="Transparency">
					<p>Card with glassmorphism effect for modern UI.</p>
				</Card>

				<Card variant="neon" title="Neon Card" subtitle="Glow effect">
					<p>Card with neon glow effect for cyberpunk aesthetics.</p>
				</Card>

				<Card variant="gradient" title="Gradient Card" subtitle="Colorful">
					<p>Card with gradient background for vibrant displays.</p>
				</Card>
			</div>
		</ComponentPreview>

		<!-- Hover Effects -->
		<ComponentPreview
			title="Hover Effects"
			description="Cards with interactive hover animations."
			codeSnippet={hoverEffectsExample}
		>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
				<Card hoverEffect="lift" title="Lift Effect" subtitle="Hover to lift" image={sampleImage}>
					<p>This card lifts up when you hover over it.</p>
				</Card>

				<Card hoverEffect="scale" title="Scale Effect" subtitle="Hover to scale" image={sampleImage}>
					<p>This card scales up when you hover over it.</p>
				</Card>

				<Card hoverEffect="glow" title="Glow Effect" subtitle="Hover to glow" image={sampleImage}>
					<p>This card glows when you hover over it.</p>
				</Card>
			</div>
		</ComponentPreview>

		<!-- Card with Link -->
		<ComponentPreview
			title="Clickable Card"
			description="Interactive card with click events."
			codeSnippet={'<Card clickable={true} title="Clickable Card" on:click={handleClick}>'}
		>
			<div class="w-full max-w-sm">
				<Card
					title="Clickable Card"
					subtitle="Click anywhere on this card"
					image={sampleImage}
					clickable={true}
					on:click={() => alert('Card clicked!')}
				>
					<p>This card demonstrates interactive content with click handling.</p>
				</Card>
			</div>
		</ComponentPreview>
	</div>
</section>
