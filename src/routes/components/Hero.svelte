<script>
	import { onMount } from 'svelte';
	import ScrollReveal from '$animations/ScrollReveal.svelte';
	import Parallax from '$animations/Parallax.svelte';
	import Button from '$components/Button/Button.svelte';
	import { theme } from '$stores/theme.js';

	let mouseX = 0;
	let mouseY = 0;
	let mounted = false;

	onMount(() => {
		mounted = true;
		
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
	<!-- Animated background -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
		<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
		<div class="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
	</div>

	<!-- Grid pattern -->
	<div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

	<!-- Content -->
	<div class="relative z-10 container mx-auto px-4 text-center">
		<Parallax speed={0.3}>
			<ScrollReveal animation="fade" duration={1000}>
				<h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight">
					<span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Beautiful Svelte
					</span>
					<br />
					<span class="text-gray-900 dark:text-white">
						UI Components
					</span>
				</h1>
			</ScrollReveal>
		</Parallax>

		<ScrollReveal animation="fly" y={30} delay={200}>
			<p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
				A modern collection of <span class="font-semibold text-blue-600 dark:text-blue-400">accessible</span>, 
				<span class="font-semibold text-purple-600 dark:text-purple-400">performant</span>, and 
				<span class="font-semibold text-pink-600 dark:text-pink-400">beautiful</span> components 
				for your next Svelte project.
			</p>
		</ScrollReveal>

		<ScrollReveal animation="scale" delay={400}>
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
				<Button
					variant="neon"
					size="lg"
					animation="glow"
					href="/explorer"
				>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					Get Started
				</Button>
				<Button
					variant="glass"
					size="lg"
					animation="float"
					href="#features"
				>
					Learn More
				</Button>
			</div>
		</ScrollReveal>

		<!-- Theme toggle -->
		<ScrollReveal animation="fade" delay={600}>
			<button
				on:click={theme.toggle}
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
			>
				{#if $theme === 'light'}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
					<span>Dark Mode</span>
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
					<span>Light Mode</span>
				{/if}
			</button>
		</ScrollReveal>
	</div>

	<!-- 3D effect on mouse move -->
	{#if mounted}
		<div 
			class="absolute inset-0 pointer-events-none"
			style="transform: translate3d({mouseX}px, {mouseY}px, 0) scale(1.1)"
		>
			<div class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl"></div>
			<div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full filter blur-3xl"></div>
		</div>
	{/if}
</section>

<style>
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}

	.animate-blob {
		animation: blob 7s infinite;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}

	.bg-grid-pattern {
		background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	:global(.dark) .bg-grid-pattern {
		background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
	}
</style>
