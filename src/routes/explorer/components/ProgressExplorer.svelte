<!-- Progress Component Explorer -->
<script lang="ts">
	import Progress from '$lib/components/Progress';
	import ComponentPreview from '../ComponentPreview.svelte';
	import { onMount } from 'svelte';

	type ProgressVariant = 'linear' | 'circular' | 'steps';
	type ProgressSize = 'sm' | 'md' | 'lg';
	type ProgressColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';

	// Progress variants
	const variants: { name: string; value: ProgressVariant }[] = [
		{ name: 'Linear', value: 'linear' },
		{ name: 'Circular', value: 'circular' },
		{ name: 'Steps', value: 'steps' },
	];

	// Progress sizes
	const sizes: { name: string; value: ProgressSize }[] = [
		{ name: 'Small', value: 'sm' },
		{ name: 'Medium', value: 'md' },
		{ name: 'Large', value: 'lg' },
	];

	// Progress colors
	const colors: { name: string; value: ProgressColor }[] = [
		{ name: 'Blue', value: 'blue' },
		{ name: 'Green', value: 'green' },
		{ name: 'Red', value: 'red' },
		{ name: 'Yellow', value: 'yellow' },
		{ name: 'Purple', value: 'purple' },
		{ name: 'Gray', value: 'gray' },
	];

	// Animated progress value
	let animatedValue = 0;
	let interval: number;

	onMount(() => {
		// Simulate progress animation
		interval = setInterval(() => {
			animatedValue = (animatedValue + 10) % 110;
		}, 1000);

		return () => {
			if (interval) clearInterval(interval);
		};
	});

	// Code examples
	const basicExample = '<Progress value={75} />';
	const variantsExample = `<Progress variant="linear" value={75} />
<Progress variant="circular" value={75} />
<Progress variant="steps" value={75} steps={4} />`;
	const sizesExample = `<Progress size="sm" value={60} />
<Progress size="md" value={60} />
<Progress size="lg" value={60} />`;
	const colorsExample = `<Progress color="blue" value={60} />
<Progress color="green" value={60} />
<Progress color="red" value={60} />
<Progress color="yellow" value={60} />
<Progress color="purple" value={60} />`;
	const featuresExample = `<Progress value={75} showLabel={true} animated={true} />
<Progress value={50} striped={true} />
<Progress indeterminate={true} />`;
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Progress Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Display progress indicators in various styles including linear, circular, and stepped progress bars.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Progress"
			description="A simple linear progress bar."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<Progress value={75} />
			</div>
		</ComponentPreview>

		<!-- Progress Variants -->
		<ComponentPreview
			title="Progress Variants"
			description="Different visual styles for progress indicators."
			codeSnippet={variantsExample}
		>
			<div class="space-y-6">
				{#each variants as variant}
					<div>
						<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">{variant.name}</h3>
						<Progress variant={variant.value} value={65} steps={variant.value === 'steps' ? 4 : undefined} />
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Progress Sizes -->
		<ComponentPreview
			title="Progress Sizes"
			description="Progress bars in different sizes."
			codeSnippet={sizesExample}
		>
			<div class="space-y-6">
				{#each sizes as size}
					<div>
						<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">{size.name}</h3>
						<Progress size={size.value} value={60} />
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Progress Colors -->
		<ComponentPreview
			title="Progress Colors"
			description="Progress bars with different color schemes."
			codeSnippet={colorsExample}
		>
			<div class="space-y-4">
				{#each colors as color}
					<div class="flex items-center gap-4">
						<span class="w-16 text-sm text-gray-600 dark:text-gray-400">{color.name}</span>
						<div class="flex-1">
							<Progress color={color.value} value={60} />
						</div>
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Circular Progress -->
		<ComponentPreview
			title="Circular Progress"
			description="Circular progress indicators in different sizes."
			codeSnippet='<Progress variant="circular" value={75} size="lg" />'
		>
			<div class="flex items-center justify-center gap-8 py-8">
				{#each sizes as size}
					<div class="text-center">
						<Progress variant="circular" size={size.value} value={75} color="blue" />
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{size.name}</p>
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Steps Progress -->
		<ComponentPreview
			title="Steps Progress"
			description="Step-based progress indicator for multi-step processes."
			codeSnippet='<Progress variant="steps" value={60} steps={5} />'
		>
			<div class="space-y-6">
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">4 Steps</h3>
					<Progress variant="steps" value={50} steps={4} />
				</div>
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">6 Steps</h3>
					<Progress variant="steps" value={66} steps={6} />
				</div>
			</div>
		</ComponentPreview>

		<!-- Animated Progress -->
		<ComponentPreview
			title="Animated Progress"
			description="Progress bars with smooth animations and different effects."
			codeSnippet={featuresExample}
		>
			<div class="space-y-6">
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Animated with Label</h3>
					<Progress value={animatedValue > 100 ? 100 : animatedValue} showLabel={true} animated={true} />
				</div>
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Striped Effect</h3>
					<Progress value={75} striped={true} color="green" />
				</div>
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Indeterminate</h3>
					<Progress indeterminate={true} color="purple" />
				</div>
			</div>
		</ComponentPreview>

		<!-- Various Progress States -->
		<ComponentPreview
			title="Progress States"
			description="Different progress states and values."
			codeSnippet='<Progress value={0} color="gray" />
<Progress value={25} color="red" />
<Progress value={50} color="yellow" />
<Progress value={75} color="blue" />
<Progress value={100} color="green" />'
		>
			<div class="space-y-4">
				<div>
					<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
						<span>Not Started</span>
						<span>0%</span>
					</div>
					<Progress value={0} color="gray" />
				</div>
				<div>
					<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
						<span>Low Progress</span>
						<span>25%</span>
					</div>
					<Progress value={25} color="red" />
				</div>
				<div>
					<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
						<span>Half Way</span>
						<span>50%</span>
					</div>
					<Progress value={50} color="yellow" />
				</div>
				<div>
					<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
						<span>Almost Done</span>
						<span>75%</span>
					</div>
					<Progress value={75} color="blue" />
				</div>
				<div>
					<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
						<span>Completed</span>
						<span>100%</span>
					</div>
					<Progress value={100} color="green" />
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
