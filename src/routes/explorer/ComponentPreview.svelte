<!-- Enhanced Component Preview Container with Lazy Loading and Performance Optimizations -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import Prism from 'prismjs';

	// Props
	export let title = '';
	export let description = '';
	export let codeSnippet = '';
	export let controls = false; // Show prop controls
	export let complexity = 'Basic'; // Basic, Intermediate, Advanced
	export let features: string[] = []; // Array of feature strings
	export let lazyLoad = true; // Enable lazy loading

	// Internal state
	let showCode = false;
	let componentTheme = 'light'; // Individual component theme
	let isAnimating = false;
	let isVisible = false;
	let previewElement: HTMLElement;
	let hasLoaded = false;

	// Intersection Observer for lazy loading
	let observer: IntersectionObserver;

	// Theme switching for component preview only
	const toggleComponentTheme = () => {
		if (isAnimating) return;
		isAnimating = true;
		componentTheme = componentTheme === 'light' ? 'dark' : 'light';
		setTimeout(() => { isAnimating = false; }, 300);
	};

	// Initialize syntax highlighting
	onMount(() => {
		if (lazyLoad) {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !hasLoaded) {
							isVisible = true;
							hasLoaded = true;
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: '50px 0px'
				}
			);

			if (previewElement) {
				observer.observe(previewElement);
			}
		} else {
			isVisible = true;
			hasLoaded = true;
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	});

	// Toggle code visibility
	function toggleCode() {
		showCode = !showCode;
		// Apply syntax highlighting after showing code
		if (showCode) {
			setTimeout(() => {
				Prism.highlightAll();
			}, 100);
		}
	}

	// Copy code to clipboard with enhanced feedback
	async function copyCode(event: MouseEvent) {
		try {
			await navigator.clipboard.writeText(codeSnippet);
			// Enhanced feedback without alert
			const button = event.currentTarget as HTMLButtonElement;
			if (!button) return;
			
			const originalText = button.textContent;
			const originalClasses = button.className;
			
			button.textContent = 'Copied!';
			button.className = originalClasses.replace('bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300', 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300');
			
			setTimeout(() => {
				button.textContent = originalText;
				button.className = originalClasses;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}

	// Get complexity color with enhanced styling
	const getComplexityColor = (level: string) => {
		switch (level) {
			case 'Basic': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800';
			case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
			case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800';
			default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border border-gray-200 dark:border-gray-800';
		}
	};

	// Enhanced loading placeholder
	$: loadingClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] animate-[gradient_2s_ease-in-out_infinite]';
</script>

<div 
	bind:this={previewElement}
	class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden mb-8 border border-gray-200 dark:border-gray-700 group"
	in:fly={{ y: 50, duration: 600, delay: Math.random() * 200 }}
>
	{#if isVisible}
		<!-- Enhanced Header with better contrast -->
		<div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-900/50">
			<div class="flex items-start justify-between mb-3">
				<div class="flex-1">
					<div class="flex items-center gap-3 mb-3">
						<h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
							{title}
						</h3>
						<span class="px-3 py-1 text-xs font-semibold rounded-full {getComplexityColor(complexity)} shadow-sm">
							{complexity}
						</span>
					</div>
					{#if description}
						<p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
							{description}
						</p>
					{/if}
				</div>

				<div class="flex items-center gap-3 ml-4">
					<!-- Component Theme Toggle with enhanced styling -->
					<div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
						<span class="text-xs text-gray-600 dark:text-gray-400 font-medium">Preview:</span>
						<button
							class="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700 {componentTheme === 'dark' ? 'bg-blue-600 shadow-inner' : 'bg-gray-300'} hover:scale-105"
							on:click={toggleComponentTheme}
							disabled={isAnimating}
							aria-label="Toggle component theme"
						>
							<span class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out {componentTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'}"></span>
						</button>
						<span class="text-sm transition-all duration-300">
							{componentTheme === 'light' ? '☀️' : '🌙'}
						</span>
					</div>

					<div class="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

					<button
						class="px-4 py-2 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:scale-105 active:scale-95"
						on:click={toggleCode}
					>
						{showCode ? '📄 Hide Code' : '💻 View Code'}
					</button>

					{#if showCode}
						<button
							class="px-4 py-2 text-xs font-medium rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
							on:click={copyCode}
							transition:scale={{ duration: 200 }}
						>
							📋 Copy
						</button>
					{/if}
				</div>
			</div>

			<!-- Enhanced Features Pills -->
			{#if features && features.length > 0}
				<div class="flex flex-wrap gap-2 mt-4">
					{#each features as feature, index}
						<span 
							class="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-md transition-all duration-200"
							in:scale={{ duration: 200, delay: index * 50 }}
						>
							{feature}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Enhanced Preview Area with better theme contrast -->
		<div class="relative overflow-hidden">
			<!-- Theme-specific background with improved contrast -->
			<div class="p-8 transition-all duration-500 {componentTheme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100/50'}">
				<!-- Theme provider wrapper for component -->
				<div class="{componentTheme === 'dark' ? 'dark' : ''} transition-all duration-500">
					<div class="flex items-center justify-center min-h-[120px] relative">
						<slot />
					</div>
				</div>
			</div>

			<!-- Enhanced animation indicator -->
			{#if isAnimating}
				<div 
					class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"
					transition:fade={{ duration: 300 }}
				></div>
			{/if}

			<!-- Loading state overlay -->
			{#if !hasLoaded}
				<div class="absolute inset-0 {loadingClasses}"></div>
			{/if}
		</div>

		<!-- Enhanced Controls Area -->
		{#if controls}
			<div class="p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/30 to-transparent dark:from-gray-900/30">
				<h4 class="text-sm font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
					<span class="w-2 h-2 bg-blue-500 rounded-full"></span>
					Component Properties
				</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<slot name="controls" />
				</div>
			</div>
		{/if}

		<!-- Enhanced Code Snippet -->
		{#if showCode}
			<div 
				class="border-t border-gray-200 dark:border-gray-700 bg-gray-900 relative overflow-hidden"
				transition:fly={{ y: -20, duration: 400 }}
			>
				<div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
				<div class="relative p-6 overflow-x-auto">
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center gap-3">
							<div class="flex gap-1.5">
								<div class="w-3 h-3 bg-red-500 rounded-full"></div>
								<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
								<div class="w-3 h-3 bg-green-500 rounded-full"></div>
							</div>
							<span class="text-sm font-medium text-gray-300">Component Code</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Svelte</span>
						</div>
					</div>
					<pre class="language-svelte text-sm leading-relaxed"><code class="language-svelte">{codeSnippet}</code></pre>
				</div>
			</div>
		{/if}
	{:else}
		<!-- Loading placeholder with better styling -->
		<div class="h-96 {loadingClasses} rounded-xl"></div>
	{/if}
</div>
