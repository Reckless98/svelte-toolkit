<script lang="ts">
	import HeroLayout from '$lib/layouts/HeroLayout.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { onMount } from 'svelte';
	import { theme, homeMode, HOME_MODES } from '$lib/stores/theme.js';
	import { fade, fly, scale, blur } from 'svelte/transition';
	import { elasticOut, backOut, quintOut } from 'svelte/easing';

	// TypeScript interfaces
	interface AnimationElement {
		id: number;
		delay: number;
		duration: number;
		size: number;
		opacity: number;
		x?: number;
		y?: number;
		speed?: number;
		color?: string;
	}

	type HeroVariant = 'standard' | 'split' | 'fullscreen' | 'minimal' | 'gradient' | 'particles' | 'animated' | 'video';

	interface ModeConfig {
		title: string;
		subtitle: string;
		variant: HeroVariant;
		backgroundGradient: string;
		primaryColor: string;
		secondaryColor: string;
		description: string;
	}

	interface Feature {
		title: string;
		subtitle: string;
		description: string;
		variant: 'neon' | 'morphic' | 'gradient' | 'glass';
		delay: number;
		icon: string;
	}

	let currentTheme: string = 'light';
	let currentMode: string = HOME_MODES.PARTICLES;
	let mounted: boolean = false;
	let scrollY = 0;
	let innerWidth = 0;
	let innerHeight = 0;

	// Component count - actual components in the project
	const componentCount = 19; // Alert, Badge, Button, Card, Documentation, Footer, Header, Input, List, Modal, Navigation, Progress, Search, Stats, Table, Tabs, Toast, HeroLayout, ParallaxLayout

	// Animation particles for different modes
	let animationElements: AnimationElement[] = [];

	// Subscribe to stores
	theme.subscribe((value) => (currentTheme = value));
	homeMode.subscribe((value) => (currentMode = value));

	onMount(() => {
		mounted = true;
		createAnimationElements();
		
		// Create interval for dynamic animations
		const interval = setInterval(() => {
			if (currentMode === HOME_MODES.NEURAL || currentMode === HOME_MODES.AURORA) {
				createAnimationElements();
			}
		}, 5000);

		return () => clearInterval(interval);
	});

	function createAnimationElements() {
		const configs = {
			[HOME_MODES.MATRIX]: { count: 25, baseSize: 1, maxSize: 2 },
			[HOME_MODES.PARTICLES]: { count: 30, baseSize: 2, maxSize: 4 },
			[HOME_MODES.COSMIC]: { count: 20, baseSize: 3, maxSize: 6 },
			[HOME_MODES.WAVES]: { count: 15, baseSize: 8, maxSize: 16 },
			[HOME_MODES.GEOMETRIC]: { count: 12, baseSize: 10, maxSize: 20 },
			[HOME_MODES.NEURAL]: { count: 40, baseSize: 1, maxSize: 3 },
			[HOME_MODES.CRYSTALLINE]: { count: 18, baseSize: 6, maxSize: 12 },
			[HOME_MODES.AURORA]: { count: 8, baseSize: 50, maxSize: 100 },
		};

		const config = configs[currentMode] || configs[HOME_MODES.PARTICLES];
		
		animationElements = Array.from({ length: config.count }, (_, i) => ({
			id: i,
			delay: Math.random() * 8,
			duration: 2 + Math.random() * 6,
			size: config.baseSize + Math.random() * (config.maxSize - config.baseSize),
			opacity: 0.2 + Math.random() * 0.6,
			x: Math.random() * 100,
			y: Math.random() * 100,
			speed: 0.5 + Math.random() * 2,
			color: getRandomColor(currentMode)
		}));
	}

	function getRandomColor(mode: string): string {
		const colorPalettes = {
			[HOME_MODES.MATRIX]: ['#00ff41', '#008f11', '#00ff88'],
			[HOME_MODES.PARTICLES]: ['#60a5fa', '#a78bfa', '#34d399'],
			[HOME_MODES.COSMIC]: ['#a855f7', '#ec4899', '#f59e0b'],
			[HOME_MODES.WAVES]: ['#06b6d4', '#0ea5e9', '#3b82f6'],
			[HOME_MODES.GEOMETRIC]: ['#f97316', '#ef4444', '#eab308'],
			[HOME_MODES.NEURAL]: ['#10b981', '#06b6d4', '#8b5cf6'],
			[HOME_MODES.CRYSTALLINE]: ['#e879f9', '#c084fc', '#a78bfa'],
			[HOME_MODES.AURORA]: ['#22d3ee', '#a78bfa', '#fb7185'],
		};
		
		const palette = colorPalettes[mode] || colorPalettes[HOME_MODES.PARTICLES];
		return palette[Math.floor(Math.random() * palette.length)];
	}

	function setHomeMode(mode: string): void {
		homeMode.set(mode);
		createAnimationElements();
	}

	$: isDark = currentTheme === 'dark';

	// Enhanced mode-specific styles
	// Mode configuration
	const modeConfig: Record<string, ModeConfig> = {
		[HOME_MODES.PARTICLES]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Beautiful, responsive components with particle magic',
			variant: 'particles' as HeroVariant,
			backgroundGradient: 'from-slate-900 via-purple-900 to-slate-900',
			primaryColor: 'text-blue-300',
			secondaryColor: 'text-purple-300',
			description: 'Floating particles that respond to your interactions'
		},
		[HOME_MODES.PARALLAX]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Build amazing interfaces with depth and motion',
			variant: 'fullscreen' as HeroVariant,
			backgroundGradient: 'from-emerald-900 via-teal-900 to-cyan-900',
			primaryColor: 'text-emerald-300',
			secondaryColor: 'text-teal-300',
			description: 'Multi-layered parallax scrolling effects'
		},
		[HOME_MODES.GRADIENT]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Gradient-powered UI components that shine',
			variant: 'gradient' as HeroVariant,
			backgroundGradient: 'from-pink-900 via-red-900 to-orange-900',
			primaryColor: 'text-pink-300',
			secondaryColor: 'text-orange-300',
			description: 'Dynamic gradients that shift and flow'
		},
		[HOME_MODES.MATRIX]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Enter the component matrix • Reality.exe',
			variant: 'animated' as HeroVariant,
			backgroundGradient: 'from-black via-green-900/50 to-black',
			primaryColor: 'text-green-400',
			secondaryColor: 'text-green-300',
			description: 'Digital rain cascading through cyberspace'
		},
		[HOME_MODES.COSMIC]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Cosmic-level UI components from another dimension',
			variant: 'particles' as HeroVariant,
			backgroundGradient: 'from-purple-900 via-indigo-900 to-blue-900',
			primaryColor: 'text-purple-300',
			secondaryColor: 'text-blue-300',
			description: 'Floating cosmic objects drifting through space'
		},
		[HOME_MODES.WAVES]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Ride the waves of modern web development',
			variant: 'animated' as HeroVariant,
			backgroundGradient: 'from-cyan-900 via-blue-900 to-indigo-900',
			primaryColor: 'text-cyan-300',
			secondaryColor: 'text-blue-300',
			description: 'Flowing wave patterns that ebb and flow'
		},
		[HOME_MODES.GEOMETRIC]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Geometric precision meets creative freedom',
			variant: 'fullscreen' as HeroVariant,
			backgroundGradient: 'from-orange-900 via-red-900 to-yellow-900',
			primaryColor: 'text-orange-300',
			secondaryColor: 'text-yellow-300',
			description: 'Abstract geometric shapes in constant motion'
		},
		[HOME_MODES.NEURAL]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Neural networks of interconnected components',
			variant: 'animated' as HeroVariant,
			backgroundGradient: 'from-emerald-900 via-green-900 to-teal-900',
			primaryColor: 'text-emerald-300',
			secondaryColor: 'text-green-300',
			description: 'Neural pathways connecting nodes of possibility'
		},
		[HOME_MODES.CRYSTALLINE]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Crystal-clear components with prismatic beauty',
			variant: 'particles' as HeroVariant,
			backgroundGradient: 'from-violet-900 via-purple-900 to-fuchsia-900',
			primaryColor: 'text-violet-300',
			secondaryColor: 'text-fuchsia-300',
			description: 'Crystalline structures refracting light and color'
		},
		[HOME_MODES.AURORA]: {
			title: 'Svelte UI Toolkit',
			subtitle: 'Aurora borealis in your browser',
			variant: 'fullscreen' as HeroVariant,
			backgroundGradient: 'from-slate-900 via-purple-900/30 to-slate-900',
			primaryColor: 'text-cyan-300',
			secondaryColor: 'text-purple-300',
			description: 'Northern lights dancing across the interface'
		},
	};

	$: config = modeConfig[currentMode];

	// Enhanced features array
	const features: Feature[] = [
		{
			title: '19+ Components',
			subtitle: 'Production Ready',
			description: 'Buttons, Cards, Modals, Forms, Tables, and many more components ready for production use',
			variant: 'gradient',
			delay: 0,
			icon: '🎨'
		},
		{
			title: 'Fully Responsive',
			subtitle: 'Mobile First',
			description: 'Every component works perfectly across all device sizes with mobile-first design principles',
			variant: 'glass',
			delay: 100,
			icon: '📱'
		},
		{
			title: 'Dark Mode',
			subtitle: 'Built-in Support',
			description: 'Seamless light and dark theme switching with system preference detection',
			variant: 'neon',
			delay: 200,
			icon: '🌙'
		},
		{
			title: 'TypeScript Ready',
			subtitle: 'Type Safe',
			description: 'Full TypeScript support with comprehensive type definitions for better DX',
			variant: 'morphic',
			delay: 300,
			icon: '⚡'
		},
		{
			title: 'Animation System',
			subtitle: 'Smooth Transitions',
			description: 'Built-in animation system with customizable transitions and effects',
			variant: 'gradient',
			delay: 400,
			icon: '✨'
		},
		{
			title: 'Accessibility First',
			subtitle: 'WCAG Compliant',
			description: 'All components follow accessibility best practices and WCAG guidelines',
			variant: 'glass',
			delay: 500,
			icon: '♿'
		},
	];

	// Mode selector configuration
	const modeSelectors = [
		{ mode: HOME_MODES.PARTICLES, icon: '✨', label: 'Particles', color: 'from-blue-500 to-purple-500' },
		{ mode: HOME_MODES.PARALLAX, icon: '🌊', label: 'Parallax', color: 'from-emerald-500 to-teal-500' },
		{ mode: HOME_MODES.GRADIENT, icon: '🎨', label: 'Gradient', color: 'from-pink-500 to-orange-500' },
		{ mode: HOME_MODES.MATRIX, icon: '💻', label: 'Matrix', color: 'from-green-500 to-emerald-500' },
		{ mode: HOME_MODES.COSMIC, icon: '🌌', label: 'Cosmic', color: 'from-purple-500 to-blue-500' },
		{ mode: HOME_MODES.WAVES, icon: '〰️', label: 'Waves', color: 'from-cyan-500 to-blue-500' },
		{ mode: HOME_MODES.GEOMETRIC, icon: '🔶', label: 'Geometric', color: 'from-orange-500 to-red-500' },
		{ mode: HOME_MODES.NEURAL, icon: '🧠', label: 'Neural', color: 'from-emerald-500 to-green-500' },
		{ mode: HOME_MODES.CRYSTALLINE, icon: '💎', label: 'Crystal', color: 'from-violet-500 to-purple-500' },
		{ mode: HOME_MODES.AURORA, icon: '🌈', label: 'Aurora', color: 'from-cyan-500 to-purple-500' },
	];
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<!-- Enhanced Parallax Background with Multiple Layers -->
<div class="fixed inset-0 overflow-hidden">
	<!-- Base gradient layer -->
	<div class="absolute inset-0 bg-gradient-to-br {config.backgroundGradient}"></div>
	
	<!-- Multi-layer parallax backgrounds -->
	<div class="absolute inset-0">
		<!-- Layer 1 - Slowest -->
		<div 
			class="absolute inset-0 opacity-40"
			style="transform: translateY({scrollY * 0.1}px)"
		>
			<div class="absolute top-1/6 left-1/6 w-96 h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
			<div class="absolute bottom-1/6 right-1/6 w-80 h-80 bg-gradient-to-br from-white/8 to-white/3 rounded-full blur-2xl animate-float"></div>
		</div>
		
		<!-- Layer 2 - Medium -->
		<div 
			class="absolute inset-0 opacity-30"
			style="transform: translateY({scrollY * 0.3}px)"
		>
			<div class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-white/12 to-white/6 rounded-full blur-xl animate-float-delayed"></div>
			<div class="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-br from-white/10 to-white/4 rounded-full blur-lg animate-bounce-slow"></div>
		</div>
		
		<!-- Layer 3 - Fastest -->
		<div 
			class="absolute inset-0 opacity-25"
			style="transform: translateY({scrollY * 0.5}px)"
		>
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/15 to-white/8 rounded-full blur-3xl animate-float"></div>
			<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-white/12 to-white/5 rounded-full blur-2xl animate-float-delayed"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-white/8 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
		</div>
		
		<!-- Layer 4 - Floating particles for extra depth -->
		<div 
			class="absolute inset-0 opacity-20"
			style="transform: translateY({scrollY * 0.7}px)"
		>
			<div class="absolute top-3/4 left-1/5 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl animate-float"></div>
			<div class="absolute top-1/5 right-1/5 w-40 h-40 bg-gradient-to-br from-white/8 to-transparent rounded-full blur-2xl animate-bounce-slow"></div>
			<div class="absolute bottom-2/3 left-2/3 w-24 h-24 bg-gradient-to-br from-white/12 to-transparent rounded-full blur-lg animate-float-delayed"></div>
		</div>
	</div>

	<!-- Enhanced Mode-specific animations -->
	{#if mounted}
		<div class="absolute inset-0 pointer-events-none z-10">
			{#if currentMode === HOME_MODES.MATRIX}
				{#each animationElements as element (element.id)}
					<div
						class="absolute bg-green-400 animate-matrix-rain"
						style="
							left: {element.x}%;
							width: {element.size}px;
							height: {element.size * 30}px;
							animation-delay: {element.delay}s;
							animation-duration: {element.duration}s;
							opacity: {element.opacity};
							background: linear-gradient(to bottom, transparent, {element.color}, transparent);
						"
					></div>
				{/each}
				
			{:else if currentMode === HOME_MODES.COSMIC}
				{#each animationElements as element (element.id)}
					<div
						class="absolute rounded-full animate-cosmic-drift"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size}px;
							background: radial-gradient(circle, {element.color}, transparent);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration * 2}s;
							opacity: {element.opacity};
						"
					></div>
				{/each}
				
			{:else if currentMode === HOME_MODES.PARTICLES}
				{#each animationElements as element (element.id)}
					<div
						class="absolute rounded-full animate-particle-float"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size}px;
							background: {element.color};
							box-shadow: 0 0 {element.size * 2}px {element.color};
							animation-delay: {element.delay}s;
							animation-duration: {element.duration}s;
							opacity: {element.opacity};
						"
					></div>
				{/each}
				
			{:else if currentMode === HOME_MODES.WAVES}
				{#each animationElements as element (element.id)}
					<div
						class="absolute rounded-full animate-wave-motion"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size / 4}px;
							background: linear-gradient(90deg, transparent, {element.color}, transparent);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration}s;
							opacity: {element.opacity};
							transform-origin: center;
						"
					></div>
				{/each}
				
			{:else if currentMode === HOME_MODES.GEOMETRIC}
				{#each animationElements as element (element.id)}
					<div
						class="absolute animate-geometric-spin"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size}px;
							background: {element.color};
							clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration}s;
							opacity: {element.opacity};
						"
					></div>
				{/each}
				
			{:else if currentMode === HOME_MODES.NEURAL}
				{#each animationElements as element (element.id)}
					<div
						class="absolute animate-neural-pulse"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size}px;
							background: radial-gradient(circle, {element.color}, transparent);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration}s;
							opacity: {element.opacity};
						"
					></div>
					{#if Math.random() > 0.7}
						<div
							class="absolute animate-neural-connection"
							style="
								left: {element.x}%;
								top: {element.y}%;
								width: {Math.random() * 100}px;
								height: 1px;
								background: linear-gradient(90deg, {element.color}, transparent);
								animation-delay: {element.delay + 1}s;
								animation-duration: {element.duration * 1.5}s;
								opacity: {element.opacity * 0.5};
								transform-origin: left center;
								transform: rotate({Math.random() * 360}deg);
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.CRYSTALLINE}
				{#each animationElements as element (element.id)}
					<div
						class="absolute animate-crystal-refraction"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size}px;
							background: linear-gradient(45deg, {element.color}, transparent, {element.color});
							clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration}s;
							opacity: {element.opacity};
						"
					></div>
				{/each}
				
			{:else if currentMode === HOME_MODES.AURORA}
				{#each animationElements as element (element.id)}
					<div
						class="absolute animate-aurora-dance"
						style="
							left: {element.x}%;
							top: {element.y}%;
							width: {element.size}px;
							height: {element.size / 3}px;
							background: linear-gradient(90deg, transparent, {element.color}, transparent);
							filter: blur(2px);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration * 3}s;
							opacity: {element.opacity * 0.7};
							transform-origin: center;
						"
					></div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<!-- Main Content -->
<main class="relative z-20">
	<!-- Hero Section -->
	<section class="min-h-screen flex items-center justify-center px-4 py-20">
		<div class="text-center max-w-6xl mx-auto">
			<!-- Enhanced Mode Selection Grid - Moved lower -->
			{#if mounted}
				<div class="fixed top-32 right-6 z-50" transition:fade={{ delay: 1000 }}>
					<div class="bg-black/20 backdrop-blur-xl rounded-2xl p-3 border border-white/20">
						<div class="grid grid-cols-2 gap-2 max-w-xs">
							{#each modeSelectors as { mode, icon, label, color }}
								<button
									on:click={() => setHomeMode(mode)}
									class="group relative overflow-hidden px-3 py-2 text-xs rounded-xl transition-all duration-500 hover:scale-105 active:scale-95 backdrop-blur-xl border {currentMode === mode
										? 'bg-white/30 text-white border-white/60 shadow-xl shadow-white/25'
										: 'bg-white/10 text-white/80 border-white/30 hover:bg-white/20 hover:text-white hover:border-white/50'}"
									title="Switch to {label} mode - {modeConfig[mode]?.description}"
								>
									<div class="relative z-10 flex flex-col items-center gap-1">
										<span class="text-lg group-hover:animate-bounce">{icon}</span>
										<span class="font-medium truncate">{label}</span>
									</div>
									{#if currentMode !== mode}
										<div class="absolute inset-0 bg-gradient-to-r {color} opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
									{/if}
								</button>
							{/each}
						</div>
						
						<!-- Mode Description -->
						<div class="mt-3 pt-3 border-t border-white/20">
							<p class="text-xs text-white/70 text-center leading-relaxed">
								{config.description}
							</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Hero Content with Enhanced Animations -->
			{#key currentMode}
				<div in:scale={{ duration: 1000, easing: elasticOut, start: 0.8 }} class="space-y-8">
					<!-- Main Title with Dynamic Colors -->
					<h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight drop-shadow-2xl">
						<span class="bg-gradient-to-r from-white via-{config.primaryColor.split('-')[1]}-100 to-white bg-clip-text text-transparent">
							{config.title}
						</span>
					</h1>

					<!-- Enhanced Credit Section -->
					<div class="text-sm text-white/80 mb-6 animate-pulse">
						<div class="flex items-center justify-center gap-2">
							<span>Crafted with</span>
							<span class="text-red-400 animate-bounce">❤️</span>
							<span>by</span>
							<a
								href="https://github.com/Reckless98"
								target="_blank"
								rel="noopener noreferrer"
								class="text-{config.primaryColor.split('-')[1]}-300 hover:text-white transition-all duration-300 font-semibold underline decoration-{config.primaryColor.split('-')[1]}-400/50 hover:decoration-white/70 hover:scale-110"
							>
								Reckless98
							</a>
						</div>
					</div>

					<!-- Dynamic Subtitle -->
					<div class="relative">
						<p class="text-xl md:text-2xl lg:text-3xl mb-16 max-w-4xl mx-auto text-white/90 leading-relaxed drop-shadow-lg font-light">
							{config.subtitle}
						</p>
						
						<!-- Animated underline based on mode -->
						<div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r {config.primaryColor.replace('text', 'from')} {config.secondaryColor.replace('text', 'to')} rounded-full opacity-60 animate-pulse"></div>
					</div>

					<!-- Enhanced Action Buttons -->
					<div class="flex flex-col sm:flex-row justify-center gap-6 items-center">
						<Button
							variant="glass"
							size="xl"
							href="/explorer"
							class="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-white/20 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
						>
							<span class="relative z-10 flex items-center gap-3 font-semibold text-lg">
								<span class="text-2xl group-hover:animate-bounce">🚀</span>
								<span>Explore Components</span>
								<span class="text-sm opacity-70 group-hover:opacity-100">(Full Library)</span>
							</span>
							<div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						</Button>

						<Button
							variant="primary"
							size="xl"
							href="https://github.com/Reckless98/svelte-toolkit"
							target="_blank"
							rel="noopener noreferrer"
							class="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-2 border-transparent hover:border-white/30 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
						>
							<span class="relative z-10 flex items-center gap-3 font-semibold text-lg">
								<span class="text-2xl group-hover:animate-pulse">⭐</span>
								<span>Star on GitHub</span>
								<span class="text-sm opacity-70 group-hover:opacity-100">Open Source</span>
							</span>
							<div class="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						</Button>
					</div>

					<!-- Quick Stats -->
					<div class="flex justify-center gap-8 mt-12 text-center">
						<div class="text-white/80">
							<div class="text-2xl font-bold {config.primaryColor}">{componentCount}+</div>
							<div class="text-sm">Components</div>
						</div>
						<div class="text-white/80">
							<div class="text-2xl font-bold {config.secondaryColor}">100%</div>
							<div class="text-sm">TypeScript</div>
						</div>
						<div class="text-white/80">
							<div class="text-2xl font-bold {config.primaryColor}">5+</div>
							<div class="text-sm">Features</div>
						</div>
					</div>
				</div>
			{/key}
		</div>
	</section>

	<!-- Enhanced Features Section -->
	<section class="relative py-32 px-4 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-900/95 dark:via-slate-900/95 dark:to-gray-800/95 backdrop-blur-sm">
		<div class="container mx-auto max-w-7xl">
			{#if mounted}
				<div in:fade={{ delay: 200, duration: 800 }} class="text-center mb-20">
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent">
						Enhanced Features
					</h2>
					<p class="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
						Discover the powerful features that make this UI toolkit perfect for modern web development
					</p>
					
					<!-- Feature stats -->
					<div class="flex justify-center gap-8 mt-8">
						<div class="text-center">
							<div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{Object.keys(HOME_MODES).length}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Animation Modes</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{features.length}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Key Features</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">∞</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Possibilities</div>
						</div>
					</div>
				</div>
			{/if}

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#if mounted}
					{#each features as feature, index}
						<div in:fly={{ y: 50, delay: 200, duration: 800, easing: backOut }}>
							<Card
								variant={feature.variant}
								title={feature.title}
								subtitle={feature.subtitle}
								class="h-full bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group"
								hoverEffect="glow"
							>
								<div class="space-y-4">
									<div class="flex items-center gap-3 mb-4">
										<span class="text-3xl group-hover:animate-bounce">{feature.icon}</span>
										<div>
											<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h3>
											<p class="text-sm text-gray-500 dark:text-gray-400">{feature.subtitle}</p>
										</div>
									</div>
									<p class="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
										{feature.description}
									</p>
								</div>
							</Card>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</section>

	<!-- Enhanced Call-to-Action Section -->
	<section class="relative py-32 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
		<!-- Enhanced Background Animation -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl"></div>
			<div class="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-float blur-xl" style="animation-delay: 1s;"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-white/5 rounded-full animate-pulse-slow blur-2xl"></div>
			<div class="absolute top-40 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-bounce-slow blur-lg" style="animation-delay: 2s;"></div>
		</div>

		<div class="container mx-auto max-w-6xl relative z-10">
			{#if mounted}
				<div in:fade={{ delay: 300, duration: 800 }} class="text-center">
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
						Ready to Get Started?
					</h2>
					<p class="text-xl md:text-2xl lg:text-3xl mb-16 max-w-4xl mx-auto opacity-90 leading-relaxed font-light">
						Explore our enhanced component library and build beautiful, interactive websites with modern animations and creative effects.
					</p>
					
					<!-- Feature highlights -->
					<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
						<div class="text-center">
							<div class="text-3xl mb-2">⚡</div>
							<div class="text-sm">Lightning Fast</div>
						</div>
						<div class="text-center">
							<div class="text-3xl mb-2">🎨</div>
							<div class="text-sm">Beautiful UI</div>
						</div>
						<div class="text-center">
							<div class="text-3xl mb-2">📱</div>
							<div class="text-sm">Responsive</div>
						</div>
						<div class="text-center">
							<div class="text-3xl mb-2">🔧</div>
							<div class="text-sm">Customizable</div>
						</div>
					</div>
				</div>
			{/if}

			<div class="flex flex-col sm:flex-row justify-center items-stretch gap-6 max-w-4xl mx-auto px-4">
				{#if mounted}
					<div in:scale={{ delay: 500, duration: 800, easing: elasticOut }} class="flex-1 sm:flex-initial">
						<Button
							variant="glass"
							size="xl"
							href="/explorer"
							class="group relative w-full min-h-[80px] bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-xl shadow-2xl hover:shadow-white/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
						>
							<div class="flex items-center justify-center gap-3 w-full">
								<span class="text-2xl group-hover:animate-bounce shrink-0">🚀</span>
								<div class="text-center min-w-0">
									<div class="font-semibold text-lg whitespace-nowrap">Explore Components</div>
									<div class="text-sm opacity-70 font-normal">Browse 19+ components</div>
								</div>
							</div>
						</Button>
					</div>

					<div in:scale={{ delay: 700, duration: 800, easing: elasticOut }} class="flex-1 sm:flex-initial">
						<Button
							variant="glass"
							size="xl"
							href="https://github.com/Reckless98/svelte-toolkit"
							target="_blank"
							rel="noopener noreferrer"
							class="group relative w-full min-h-[80px] bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-xl shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
						>
							<div class="flex items-center justify-center gap-3 w-full">
								<span class="text-2xl group-hover:animate-pulse shrink-0">⭐</span>
								<div class="text-center min-w-0">
									<div class="font-semibold text-lg whitespace-nowrap">Star on GitHub</div>
									<div class="text-sm opacity-70 font-normal">Open source & free</div>
								</div>
							</div>
						</Button>
					</div>
				{/if}
			</div>

			<!-- Enhanced Branding -->
			{#if mounted}
				<div in:fade={{ delay: 900, duration: 800 }} class="text-center mt-20 pt-8 border-t border-white/20">
					<p class="text-white/80 text-lg md:text-xl mb-3">
						Crafted with passion by
						<a
							href="https://github.com/Reckless98"
							target="_blank"
							rel="noopener noreferrer"
							class="text-white font-bold hover:text-blue-200 transition-colors underline decoration-blue-300/50 hover:decoration-white/70"
						>
							Reckless98
						</a>
					</p>
					<p class="text-white/60 text-sm md:text-base mb-4">Open source • Modern • Beautiful • Fast</p>
					
					<!-- Social proof -->
					<div class="flex justify-center gap-6 text-white/40 text-sm">
						<span>✨ {Object.keys(HOME_MODES).length} Animation Modes</span>
						<span>🎨 {features.length}+ Features</span>
						<span>⚡ Zero Dependencies</span>
					</div>
				</div>
			{/if}
		</div>
	</section>
</main>

<style>
	@keyframes matrix-rain {
		0% { transform: translateY(-100%); opacity: 0; }
		10% { opacity: 1; }
		90% { opacity: 1; }
		100% { transform: translateY(100vh); opacity: 0; }
	}

	@keyframes cosmic-drift {
		0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
		50% { transform: translate(100px, -50px) scale(1.5); opacity: 0.2; }
		100% { transform: translate(-50px, 100px) scale(1); opacity: 0.4; }
	}

	@keyframes particle-float {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
		50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
	}

	@keyframes float {
		0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
		25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
		50% { transform: translateY(0) translateX(-10px) rotate(-5deg); }
		75% { transform: translateY(20px) translateX(5px) rotate(3deg); }
	}

	@keyframes float-delayed {
		0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
		25% { transform: translateY(20px) translateX(-10px) rotate(-5deg); }
		50% { transform: translateY(0) translateX(10px) rotate(5deg); }
		75% { transform: translateY(-20px) translateX(-5px) rotate(-3deg); }
	}

	@keyframes bounce-slow {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-30px) scale(1.1); }
	}

	@keyframes pulse-slow {
		0%, 100% { opacity: 0.3; transform: scale(1); }
		50% { opacity: 0.7; transform: scale(1.05); }
	}

	@keyframes wave-motion {
		0% { transform: translateX(-100%) translateY(0) scaleY(1); opacity: 0.6; }
		50% { transform: translateX(50vw) translateY(-20px) scaleY(1.5); opacity: 0.4; }
		100% { transform: translateX(100vw) translateY(0) scaleY(1); opacity: 0.6; }
	}

	@keyframes geometric-spin {
		0% { transform: rotate(0deg) scale(1); opacity: 0.3; }
		25% { transform: rotate(90deg) scale(1.2); opacity: 0.6; }
		50% { transform: rotate(180deg) scale(0.8); opacity: 0.4; }
		75% { transform: rotate(270deg) scale(1.1); opacity: 0.5; }
		100% { transform: rotate(360deg) scale(1); opacity: 0.3; }
	}

	@keyframes neural-pulse {
		0% { 
			transform: scale(1) translateY(0); 
			opacity: 0.2; 
			box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
		}
		50% { 
			transform: scale(1.3) translateY(-10px); 
			opacity: 0.8; 
			box-shadow: 0 0 30px 10px rgba(59, 130, 246, 0.2);
		}
		100% { 
			transform: scale(1) translateY(0); 
			opacity: 0.2; 
			box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
		}
	}

	@keyframes neural-connection {
		0% { 
			opacity: 0; 
			transform: scaleX(0); 
		}
		25% { 
			opacity: 0.6; 
			transform: scaleX(0.5); 
		}
		50% { 
			opacity: 0.8; 
			transform: scaleX(1); 
		}
		75% { 
			opacity: 0.4; 
			transform: scaleX(0.8); 
		}
		100% { 
			opacity: 0; 
			transform: scaleX(0); 
		}
	}

	@keyframes crystal-refraction {
		0% { 
			transform: scale(0) rotate(0deg); 
			opacity: 0; 
			filter: hue-rotate(0deg);
		}
		25% { 
			transform: scale(0.5) rotate(90deg); 
			opacity: 0.6; 
			filter: hue-rotate(90deg);
		}
		50% { 
			transform: scale(1) rotate(180deg); 
			opacity: 0.8; 
			filter: hue-rotate(180deg);
		}
		75% { 
			transform: scale(1.2) rotate(270deg); 
			opacity: 0.4; 
			filter: hue-rotate(270deg);
		}
		100% { 
			transform: scale(0) rotate(360deg); 
			opacity: 0; 
			filter: hue-rotate(360deg);
		}
	}

	@keyframes aurora-dance {
		0% { 
			transform: translateX(-50%) translateY(0) scaleX(1) scaleY(1) skewX(0deg); 
			opacity: 0.3; 
		}
		25% { 
			transform: translateX(-25%) translateY(-10px) scaleX(1.5) scaleY(0.8) skewX(15deg); 
			opacity: 0.7; 
		}
		50% { 
			transform: translateX(25%) translateY(0) scaleX(1.2) scaleY(1.3) skewX(-10deg); 
			opacity: 0.5; 
		}
		75% { 
			transform: translateX(50%) translateY(-5px) scaleX(0.8) scaleY(1.1) skewX(20deg); 
			opacity: 0.8; 
		}
		100% { 
			transform: translateX(100%) translateY(0) scaleX(1) scaleY(1) skewX(0deg); 
			opacity: 0.3; 
		}
	}

	@keyframes crystalline-grow {
		0% { 
			transform: scale(0) rotate(0deg); 
			opacity: 0; 
			clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		}
		25% { 
			transform: scale(0.5) rotate(45deg); 
			opacity: 0.6; 
			clip-path: polygon(50% 0%, 20% 80%, 80% 80%);
		}
		50% { 
			transform: scale(1) rotate(90deg); 
			opacity: 0.8; 
			clip-path: polygon(50% 20%, 10% 80%, 90% 80%);
		}
		75% { 
			transform: scale(1.2) rotate(135deg); 
			opacity: 0.4; 
			clip-path: polygon(50% 10%, 5% 90%, 95% 90%);
		}
		100% { 
			transform: scale(0) rotate(180deg); 
			opacity: 0; 
			clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		}
	}

	@keyframes aurora-flow {
		0% { 
			transform: translateX(-50%) scaleX(1) scaleY(1); 
			opacity: 0.3; 
			background: linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6);
		}
		25% { 
			transform: translateX(0%) scaleX(1.5) scaleY(0.8); 
			opacity: 0.7; 
			background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
		}
		50% { 
			transform: translateX(25%) scaleX(1.2) scaleY(1.3); 
			opacity: 0.5; 
			background: linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b);
		}
		75% { 
			transform: translateX(50%) scaleX(0.8) scaleY(1.1); 
			opacity: 0.8; 
			background: linear-gradient(45deg, #ec4899, #f59e0b, #10b981);
		}
		100% { 
			transform: translateX(100%) scaleX(1) scaleY(1); 
			opacity: 0.3; 
			background: linear-gradient(45deg, #f59e0b, #10b981, #3b82f6);
		}
	}

	@keyframes gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.animate-matrix-rain { animation: matrix-rain linear infinite; }
	.animate-cosmic-drift { animation: cosmic-drift ease-in-out infinite; }
	.animate-particle-float { animation: particle-float ease-in-out infinite; }
	.animate-float { animation: float 6s ease-in-out infinite; }
	.animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
	.animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
	.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
	.animate-wave-motion { animation: wave-motion 8s ease-in-out infinite; }
	.animate-geometric-spin { animation: geometric-spin 6s linear infinite; }
	.animate-neural-pulse { animation: neural-pulse 4s ease-in-out infinite; }
	.animate-neural-connection { animation: neural-connection 3s ease-in-out infinite; }
	.animate-crystal-refraction { animation: crystal-refraction 8s ease-in-out infinite; }
	.animate-aurora-dance { animation: aurora-dance 15s ease-in-out infinite; }
	.animate-crystalline-grow { animation: crystalline-grow 10s ease-in-out infinite; }
	.animate-aurora-flow { animation: aurora-flow 12s ease-in-out infinite; }
	.animate-gradient-shift { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
</style>
