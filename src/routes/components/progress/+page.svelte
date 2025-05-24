<script lang="ts">
	import Progress from '$lib/components/Progress/Progress.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { theme } from '$lib/stores/theme.js';
	import { onMount } from 'svelte';
	
	let currentTheme = 'light';
	theme.subscribe((value) => (currentTheme = value));
	$: isDark = currentTheme === 'dark';
	
	let dynamicProgress = 0;
	let animatedProgress = 0;
	let stepProgress = 25;
	
	onMount(() => {
		// Simulate progress for demo
		const interval = setInterval(() => {
			dynamicProgress = (dynamicProgress + 5) % 105;
			if (dynamicProgress === 0) dynamicProgress = 5;
		}, 500);
		
		return () => clearInterval(interval);
	});
	
	function startAnimation() {
		animatedProgress = 0;
		setTimeout(() => {
			animatedProgress = 75;
		}, 100);
	}
	
	function updateSteps(increment: number) {
		stepProgress = Math.max(0, Math.min(100, stepProgress + increment));
	}
</script>

<svelte:head>
	<title>Progress Component - Svelte UI Toolkit</title>
	<meta name="description" content="Progress bars, loaders, and completion indicators for showing task completion" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Progress Component
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				Progress bars, loaders, and completion indicators for showing task progress, loading states, and step completion.
			</p>
		</div>

		<!-- Examples Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			
			<!-- Linear Progress -->
			<Card title="Linear Progress" description="Standard horizontal progress bars">
				<div class="space-y-6">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Basic Linear</h4>
						<div class="space-y-4">
							<Progress value={25} />
							<Progress value={50} color="green" />
							<Progress value={75} color="blue" />
							<Progress value={90} color="purple" />
						</div>
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Without Labels</h4>
						<Progress value={60} showLabel={false} />
					</div>
				</div>
			</Card>

			<!-- Circular Progress -->
			<Card title="Circular Progress" description="Circular progress indicators">
				<div class="space-y-6">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Circular Variants</h4>
						<div class="flex flex-wrap gap-6 justify-center">
							<Progress variant="circular" value={25} color="red" />
							<Progress variant="circular" value={50} color="blue" />
							<Progress variant="circular" value={75} color="green" />
							<Progress variant="circular" value={90} color="purple" />
						</div>
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Different Sizes</h4>
						<div class="flex items-center gap-6 justify-center">
							<Progress variant="circular" value={65} size="sm" color="blue" />
							<Progress variant="circular" value={65} size="md" color="blue" />
							<Progress variant="circular" value={65} size="lg" color="blue" />
						</div>
					</div>
				</div>
			</Card>

			<!-- Progress Sizes -->
			<Card title="Progress Sizes" description="Different sizes for various use cases">
				<div class="space-y-4">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Small</h4>
						<Progress value={40} size="sm" />
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Medium (Default)</h4>
						<Progress value={60} size="md" />
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Large</h4>
						<Progress value={80} size="lg" />
					</div>
				</div>
			</Card>

			<!-- Progress Colors -->
			<Card title="Progress Colors" description="Various color options for different contexts">
				<div class="space-y-4">
					<Progress value={50} color="blue">
						<span slot="label">Blue Progress</span>
					</Progress>
					
					<Progress value={65} color="green">
						<span slot="label">Green Progress</span>
					</Progress>
					
					<Progress value={35} color="red">
						<span slot="label">Red Progress</span>
					</Progress>
					
					<Progress value={80} color="yellow">
						<span slot="label">Yellow Progress</span>
					</Progress>
					
					<Progress value={45} color="purple">
						<span slot="label">Purple Progress</span>
					</Progress>
				</div>
			</Card>

			<!-- Step Progress -->
			<Card title="Step Progress" description="Progress divided into discrete steps">
				<div class="space-y-6">
					<div>
						<Progress variant="steps" value={stepProgress} steps={4} color="blue" />
						<div class="flex gap-2 mt-4">
							<Button size="sm" on:click={() => updateSteps(-25)}>Previous Step</Button>
							<Button size="sm" on:click={() => updateSteps(25)}>Next Step</Button>
						</div>
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Different Step Count</h4>
						<Progress variant="steps" value={60} steps={5} color="green" />
					</div>
				</div>
			</Card>

			<!-- Animated Progress -->
			<Card title="Animated Progress" description="Progress with smooth animations">
				<div class="space-y-6">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Smooth Animation</h4>
						<Progress value={animatedProgress} animated color="blue" />
						<Button size="sm" class="mt-3" on:click={startAnimation}>
							Animate to 75%
						</Button>
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Dynamic Progress</h4>
						<Progress value={dynamicProgress} animated color="green">
							<span slot="label">Dynamic Demo</span>
						</Progress>
					</div>
				</div>
			</Card>

			<!-- Striped Progress -->
			<Card title="Striped Progress" description="Progress bars with striped patterns">
				<div class="space-y-4">
					<Progress value={70} striped color="blue">
						<span slot="label">Striped Progress</span>
					</Progress>
					
					<Progress value={45} striped animated color="green">
						<span slot="label">Striped + Animated</span>
					</Progress>
				</div>
			</Card>

			<!-- Indeterminate Progress -->
			<Card title="Indeterminate Progress" description="Loading indicators for unknown progress">
				<div class="space-y-6">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Linear Indeterminate</h4>
						<Progress indeterminate color="blue">
							<span slot="label">Loading...</span>
						</Progress>
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Circular Indeterminate</h4>
						<div class="flex justify-center">
							<Progress variant="circular" indeterminate color="purple" showLabel={false} />
						</div>
					</div>
				</div>
			</Card>

		</div>

		<!-- Real-world Examples -->
		<div class="mt-16">
			<Card title="Real-world Examples" description="Common use cases and implementations">
				<div class="space-y-8">
					
					<!-- File Upload -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-4">File Upload Progress</h4>
						<div class="space-y-3">
							<div class="flex items-center justify-between text-sm">
								<span class="text-gray-600 dark:text-gray-400">document.pdf</span>
								<span class="text-gray-500 dark:text-gray-500">2.4 MB / 3.1 MB</span>
							</div>
							<Progress value={77} color="green" showLabel={false} />
						</div>
					</div>

					<!-- Multi-step Form -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-4">Multi-step Form</h4>
						<Progress variant="steps" value={50} steps={4} color="blue">
							<span slot="label">Account Setup</span>
						</Progress>
						<div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
							<span>Personal Info</span>
							<span>Preferences</span>
							<span>Verification</span>
							<span>Complete</span>
						</div>
					</div>

					<!-- System Resource Usage -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-4">System Resources</h4>
						<div class="space-y-4">
							<div>
								<div class="flex justify-between text-sm mb-1">
									<span class="text-gray-600 dark:text-gray-400">CPU Usage</span>
									<span class="text-gray-500 dark:text-gray-500">45%</span>
								</div>
								<Progress value={45} color="blue" showLabel={false} size="sm" />
							</div>
							
							<div>
								<div class="flex justify-between text-sm mb-1">
									<span class="text-gray-600 dark:text-gray-400">Memory Usage</span>
									<span class="text-gray-500 dark:text-gray-500">78%</span>
								</div>
								<Progress value={78} color="yellow" showLabel={false} size="sm" />
							</div>
							
							<div>
								<div class="flex justify-between text-sm mb-1">
									<span class="text-gray-600 dark:text-gray-400">Disk Usage</span>
									<span class="text-gray-500 dark:text-gray-500">92%</span>
								</div>
								<Progress value={92} color="red" showLabel={false} size="sm" />
							</div>
						</div>
					</div>

				</div>
			</Card>
		</div>

		<!-- Usage Guide -->
		<div class="mt-16">
			<Card title="Usage Guide" description="How to implement progress indicators in your application">
				<div class="prose dark:prose-invert max-w-none">
					<h3>Basic Usage</h3>
					<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>&lt;Progress value={75} /&gt;
&lt;Progress variant="circular" value={50} color="blue" /&gt;
&lt;Progress variant="steps" value={60} steps={4} /&gt;</code></pre>

					<h3>Props</h3>
					<ul>
						<li><strong>value:</strong> number - Progress value (0-100)</li>
						<li><strong>max:</strong> number - Maximum value (default: 100)</li>
						<li><strong>variant:</strong> 'linear' | 'circular' | 'steps' - Progress type</li>
						<li><strong>size:</strong> 'sm' | 'md' | 'lg' - Component size</li>
						<li><strong>color:</strong> 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'</li>
						<li><strong>showLabel:</strong> boolean - Show/hide label</li>
						<li><strong>animated:</strong> boolean - Enable smooth animations</li>
						<li><strong>striped:</strong> boolean - Add striped pattern</li>
						<li><strong>steps:</strong> number - Number of steps (steps variant)</li>
						<li><strong>indeterminate:</strong> boolean - Unknown progress state</li>
					</ul>

					<h3>Slots</h3>
					<ul>
						<li><strong>label:</strong> Custom label content</li>
					</ul>

					<h3>Best Practices</h3>
					<ul>
						<li>Use appropriate variants for different contexts</li>
						<li>Provide clear labels when progress isn't self-explanatory</li>
						<li>Use indeterminate states for unknown durations</li>
						<li>Choose colors that match the semantic meaning</li>
						<li>Consider accessibility with sufficient color contrast</li>
					</ul>
				</div>
			</Card>
		</div>
	</div>
</div>
