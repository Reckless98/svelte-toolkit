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
	const fundamentalsExample = `<!-- Basic Progress -->
<Progress value={75} />

<!-- Different Sizes -->
<Progress size="sm" value={60} />
<Progress size="md" value={60} />
<Progress size="lg" value={60} />

<!-- Progress States -->
<Progress value={0} color="gray" />
<Progress value={50} color="yellow" />
<Progress value={100} color="green" />`;

	const visualStylesExample = `<!-- Different Colors -->
<Progress color="blue" value={60} />
<Progress color="green" value={60} />
<Progress color="red" value={60} />
<Progress color="yellow" value={60} />
<Progress color="purple" value={60} />`;

	const progressVariantsExample = `<!-- Linear Progress -->
<Progress variant="linear" value={75} />

<!-- Circular Progress -->
<Progress variant="circular" value={75} />

<!-- Steps Progress -->
<Progress variant="steps" value={75} steps={4} />`;

	const advancedFeaturesExample = `<!-- Animated Progress -->
<Progress value={75} showLabel={true} animated={true} />

<!-- Striped Effect -->
<Progress value={50} striped={true} />

<!-- Indeterminate Progress -->
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
		<!-- Progress Fundamentals & Basic Usage -->
		<ComponentPreview
			title="Progress Fundamentals & Basic Usage"
			description="Core progress functionality with different sizes and states for essential progress tracking."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["basic-progress", "sizes", "states", "core-functionality"]}
		>
			<div class="space-y-6">
				<!-- Basic Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Basic Progress</h4>
					<Progress value={75} />
				</div>

				<!-- Progress Sizes -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Different Sizes</h4>
					<div class="space-y-3">
						{#each sizes as size}
							<div>
								<div class="text-xs text-gray-600 dark:text-gray-400 mb-1">{size.name}</div>
								<Progress size={size.value} value={60} />
							</div>
						{/each}
					</div>
				</div>

				<!-- Progress States -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Progress States</h4>
					<div class="space-y-3">
						<div>
							<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
								<span>Not Started</span>
								<span>0%</span>
							</div>
							<Progress value={0} color="gray" />
						</div>
						<div>
							<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
								<span>In Progress</span>
								<span>50%</span>
							</div>
							<Progress value={50} color="yellow" />
						</div>
						<div>
							<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
								<span>Completed</span>
								<span>100%</span>
							</div>
							<Progress value={100} color="green" />
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Visual Styles & Colors -->
		<ComponentPreview
			title="Visual Styles & Colors"
			description="Color schemes and visual presentation options for different contexts and states."
			codeSnippet={visualStylesExample}
			complexity="Intermediate"
			features={["colors", "visual-styles", "theming", "state-indication"]}
		>
			<div class="space-y-6">
				<!-- Color Options -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Color Schemes</h4>
					<div class="space-y-3">
						{#each colors as color}
							<div class="flex items-center gap-4">
								<span class="w-16 text-xs text-gray-600 dark:text-gray-400">{color.name}</span>
								<div class="flex-1">
									<Progress color={color.value} value={60} />
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Contextual Usage -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Contextual Usage</h4>
					<div class="space-y-3">
						<div>
							<div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Success (File Upload)</div>
							<Progress value={100} color="green" />
						</div>
						<div>
							<div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Warning (Storage Usage)</div>
							<Progress value={85} color="yellow" />
						</div>
						<div>
							<div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Danger (CPU Usage)</div>
							<Progress value={92} color="red" />
						</div>
						<div>
							<div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Info (Download Progress)</div>
							<Progress value={45} color="blue" />
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Progress Variants -->
		<ComponentPreview
			title="Progress Variants"
			description="Different form factors including linear, circular, and step-based progress indicators."
			codeSnippet={progressVariantsExample}
			complexity="Intermediate"
			features={["variants", "linear", "circular", "steps"]}
		>
			<div class="space-y-6">
				<!-- Linear Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Linear Progress</h4>
					<Progress variant="linear" value={65} />
				</div>

				<!-- Circular Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Circular Progress</h4>
					<div class="flex items-center justify-center gap-8 py-4">
						{#each sizes as size}
							<div class="text-center">
								<Progress variant="circular" size={size.value} value={75} color="blue" />
								<p class="mt-2 text-xs text-gray-600 dark:text-gray-400">{size.name}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Steps Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Steps Progress</h4>
					<div class="space-y-4">
						<div>
							<div class="text-xs text-gray-600 dark:text-gray-400 mb-2">4-Step Process (Step 2 of 4)</div>
							<Progress variant="steps" value={50} steps={4} />
						</div>
						<div>
							<div class="text-xs text-gray-600 dark:text-gray-400 mb-2">6-Step Workflow (Step 4 of 6)</div>
							<Progress variant="steps" value={66} steps={6} />
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced Features & Animation -->
		<ComponentPreview
			title="Advanced Features & Animation"
			description="Enhanced progress indicators with animations, effects, and dynamic behavior for engaging user experiences."
			codeSnippet={advancedFeaturesExample}
			complexity="Advanced"
			features={["animation", "striped", "indeterminate", "labels"]}
		>
			<div class="space-y-6">
				<!-- Animated Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Animated Progress with Label</h4>
					<Progress value={animatedValue > 100 ? 100 : animatedValue} showLabel={true} animated={true} />
				</div>

				<!-- Striped Effect -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Striped Effect</h4>
					<Progress value={75} striped={true} color="green" />
				</div>

				<!-- Indeterminate Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Indeterminate Progress</h4>
					<Progress indeterminate={true} color="purple" />
				</div>

				<!-- Real-world Examples -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Real-world Applications</h4>
					<div class="space-y-4">
						<div>
							<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
								<span>File Upload</span>
								<span>87%</span>
							</div>
							<Progress value={87} color="blue" animated={true} striped={true} />
						</div>
						<div>
							<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
								<span>System Health Check</span>
								<span>Running...</span>
							</div>
							<Progress indeterminate={true} color="green" />
						</div>
						<div>
							<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
								<span>Profile Completion</span>
								<span>3 of 5 steps</span>
							</div>
							<Progress variant="steps" value={60} steps={5} color="purple" />
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
