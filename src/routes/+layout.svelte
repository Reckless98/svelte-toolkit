<script>
	import '../app.css';
	import { theme } from '$lib/stores/theme.js';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	// Initialize theme on mount
	onMount(() => {
		theme.init();
	});

	// Navigation links
	const navLinks = [
		{ text: 'Home', href: '/' },
		{ text: 'About', href: '/about' },
		{ text: 'Services', href: '/services' },
		{ text: 'Explorer', href: '/explorer' },
		{ text: 'Contact', href: '/contact' }
	];

	// Reactive class for current route
	$: currentPath = $page.url.pathname;
</script>

<svelte:head>
	<title>Svelte UI Toolkit - Beautiful Components for Modern Web</title>
	<meta name="description" content="A powerful UI toolkit for Svelte with beautiful components, animations, and modern design patterns." />
</svelte:head>

<div class="app min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
	<Header 
		variant="glass"
		title="UI Toolkit"
		{navLinks}
		sticky={true}
		animated={true}
		dark={$theme === 'dark'}
		ctaButton={{ text: 'Get Started', href: '/explorer', variant: 'primary' }}
	/>

	<main class="flex-1">
		{#key currentPath}
			<div in:fade={{ duration: 300, delay: 150 }} out:fade={{ duration: 150 }}>
				<slot />
			</div>
		{/key}
	</main>

	<Footer 
		variant="expanded"
		title="Svelte UI Toolkit"
		description="Building beautiful, accessible, and performant web experiences with modern Svelte components."
		dark={$theme === 'dark'}
		newsletter={true}
		showBranding={true}
	/>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(.dark) {
		color-scheme: dark;
	}
</style>
