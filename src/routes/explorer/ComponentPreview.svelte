<!-- Enhanced Component Preview Container with Individual Theme Control -->
<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Prism from 'prismjs';

	// Props
	export let title = '';
	export let description = '';
	export let codeSnippet = '';
	export let controls = false; // Show prop controls
	export let complexity = 'Basic'; // Basic, Intermediate, Advanced
	export let features = []; // Array of feature strings

	// Internal state
	let showCode = false;
	let componentTheme = 'light'; // Individual component theme
	let isAnimating = false;

	// Theme switching for component preview only
	const toggleComponentTheme = () => {
		if (isAnimating) return;
		isAnimating = true;
		componentTheme = componentTheme === 'light' ? 'dark' : 'light';
		setTimeout(() => { isAnimating = false; }, 300);
	};

	// Initialize syntax highlighting
	onMount(() => {
		if (showCode) {
			Prism.highlightAll();
		}
	});

	// Toggle code visibility
	function toggleCode() {
		showCode = !showCode;
		// Apply syntax highlighting after showing code
		if (showCode) {
			setTimeout(() => {
				Prism.highlightAll();
			}, 0);
		}
	}

	// Copy code to clipboard
	function copyCode() {
		navigator.clipboard.writeText(codeSnippet);
		// Simple feedback without alert
		const button = event.target;
		const originalText = button.textContent;
		button.textContent = 'Copied!';
		button.classList.add('bg-green-100', 'text-green-800');
		setTimeout(() => {
			button.textContent = originalText;
			button.classList.remove('bg-green-100', 'text-green-800');
		}, 1500);
	}

	// Get complexity color
	const getComplexityColor = (level) => {
		switch (level) {
			case 'Basic': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
			case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
			case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
			default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
		}
	};
</script>

<div 
	class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-8 border border-gray-200 dark:border-gray-700"
	in:fly={{ y: 30, duration: 600, delay: 100 }}
>
	<!-- Enhanced Header -->
	<div class="p-6 border-b border-gray-200 dark:border-gray-700">
		<div class="flex items-start justify-between mb-3">
			<div class="flex-1">
				<div class="flex items-center gap-3 mb-2">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
					<span class="px-2 py-1 text-xs font-medium rounded-full {getComplexityColor(complexity)}">
						{complexity}
					</span>
				</div>
				{#if description}
					<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
				{/if}
			</div>

			<div class="flex items-center gap-2 ml-4">
				<!-- Component Theme Toggle -->
				<div class="flex items-center gap-2">
					<span class="text-xs text-gray-500 dark:text-gray-400">Preview:</span>
					<button
						class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {componentTheme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}"
						on:click={toggleComponentTheme}
						disabled={isAnimating}
						aria-label="Toggle component theme"
					>
						<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {componentTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'}"></span>
					</button>
					<span class="text-xs text-gray-500 dark:text-gray-400">
						{componentTheme === 'light' ? '☀️' : '🌙'}
					</span>
				</div>

				<div class="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>

				<button
					class="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
					on:click={toggleCode}
				>
					{showCode ? '📄 Hide Code' : '💻 View Code'}
				</button>

				{#if showCode}
					<button
						class="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
						on:click={copyCode}
					>
						📋 Copy
					</button>
				{/if}
			</div>
		</div>

		<!-- Features Pills -->
		{#if features && features.length > 0}
			<div class="flex flex-wrap gap-2 mt-3">
				{#each features as feature}
					<span class="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
						{feature}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Preview Area with Individual Theme -->
	<div class="relative overflow-hidden">
		<!-- Theme-specific background for component preview -->
		<div class="p-8 transition-colors duration-300 {componentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}">
			<!-- Theme provider wrapper for component -->
			<div class="{componentTheme === 'dark' ? 'dark' : ''} transition-all duration-300">
				<div class="flex items-center justify-center min-h-[120px]">
					<slot />
				</div>
			</div>
		</div>

		<!-- Subtle animation indicator -->
		{#if isAnimating}
			<div 
				class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
				transition:fade={{ duration: 300 }}
			></div>
		{/if}
	</div>

	<!-- Controls Area (optional) -->
	{#if controls}
		<div class="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
			<h4 class="text-sm font-semibold mb-4 text-gray-900 dark:text-white">Component Properties</h4>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<slot name="controls" />
			</div>
		</div>
	{/if}

	<!-- Code Snippet with Enhanced Styling -->
	{#if showCode}
		<div 
			class="border-t border-gray-200 dark:border-gray-700 bg-gray-900"
			transition:fly={{ y: -20, duration: 300 }}
		>
			<div class="p-4 overflow-x-auto">
				<div class="flex items-center justify-between mb-3">
					<span class="text-sm font-medium text-gray-300">Component Code</span>
					<span class="text-xs text-gray-400">Svelte</span>
				</div>
				<pre class="language-svelte text-sm"><code class="language-svelte">{codeSnippet}</code></pre>
			</div>
		</div>
	{/if}
</div>
