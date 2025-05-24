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
		x: number;
		y: number;
		speed: number;
		color: string;
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
	
	// Enhanced mouse tracking for interactive effects
	let mouseX = 0;
	let mouseY = 0;
	let isMouseActive = false;
	let mouseVelocityX = 0;
	let mouseVelocityY = 0;
	let lastMouseX = 0;
	let lastMouseY = 0;

	// Component count - actual components in the project
	const componentCount = 19; // Alert, Badge, Button, Card, Documentation, Footer, Header, Input, List, Modal, Navigation, Progress, Search, Stats, Table, Tabs, Toast, HeroLayout, ParallaxLayout

	// Animation particles for different modes
	let animationElements: AnimationElement[] = [];

	// Subscribe to stores
	theme.subscribe((value) => (currentTheme = value));
	homeMode.subscribe((value) => (currentMode = value));

	// Performance optimization - throttled mouse tracking
	let mouseTrackingFrame: number;

	onMount(() => {
		mounted = true;
		createAnimationElements();
		
		// Enhanced mouse tracking with velocity calculation
		const handleMouseMove = (e: MouseEvent) => {
			if (mouseTrackingFrame) {
				cancelAnimationFrame(mouseTrackingFrame);
			}
			
			mouseTrackingFrame = requestAnimationFrame(() => {
				// Calculate mouse velocity for enhanced effects
				mouseVelocityX = e.clientX - lastMouseX;
				mouseVelocityY = e.clientY - lastMouseY;
				lastMouseX = mouseX;
				lastMouseY = mouseY;
				
				mouseX = e.clientX;
				mouseY = e.clientY;
				isMouseActive = true;
			});
		};

		const handleMouseLeave = () => {
			isMouseActive = false;
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);
		
		// Create interval for dynamic animations - optimized to 8 seconds
		const interval = setInterval(() => {
			if (currentMode === HOME_MODES.NEURAL || currentMode === HOME_MODES.GRADIENT || currentMode === HOME_MODES.AURORA) {
				createAnimationElements();
			}
		}, 8000);

		return () => {
			clearInterval(interval);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
			if (mouseTrackingFrame) {
				cancelAnimationFrame(mouseTrackingFrame);
			}
		};
	});

	function createAnimationElements() {
		// Detect device capabilities for performance optimization
		const isMobile = innerWidth < 768;
		const isLowPerformance = isMobile || navigator.hardwareConcurrency < 4;
		
		const configs = {
			[HOME_MODES.MATRIX]: { count: isLowPerformance ? 15 : 25, baseSize: 1, maxSize: 2 },
			[HOME_MODES.PARTICLES]: { count: isLowPerformance ? 20 : 30, baseSize: 2, maxSize: 4 },
			[HOME_MODES.COSMIC]: { count: isLowPerformance ? 12 : 20, baseSize: 3, maxSize: 6 },
			[HOME_MODES.WAVES]: { count: isLowPerformance ? 10 : 15, baseSize: 8, maxSize: 16 },
			[HOME_MODES.GEOMETRIC]: { count: isLowPerformance ? 8 : 12, baseSize: 10, maxSize: 20 },
			[HOME_MODES.NEURAL]: { count: isLowPerformance ? 35 : 60, baseSize: 1, maxSize: 4 }, // Enhanced with more nodes
			[HOME_MODES.CRYSTALLINE]: { count: isLowPerformance ? 12 : 18, baseSize: 6, maxSize: 12 },
			[HOME_MODES.AURORA]: { count: isLowPerformance ? 5 : 8, baseSize: 50, maxSize: 100 },
			[HOME_MODES.PARALLAX]: { count: isLowPerformance ? 20 : 35, baseSize: 3, maxSize: 8 }, // Added parallax config
			[HOME_MODES.GRADIENT]: { count: isLowPerformance ? 15 : 25, baseSize: 5, maxSize: 15 }, // Added gradient config
		};

		const config = configs[currentMode] || configs[HOME_MODES.PARTICLES];
		
		animationElements = Array.from({ length: config.count }, (_, i) => ({
			id: i,
			delay: Math.random() * (isLowPerformance ? 4 : 8),
			duration: (isLowPerformance ? 1.5 : 2) + Math.random() * (isLowPerformance ? 3 : 6),
			size: config.baseSize + Math.random() * (config.maxSize - config.baseSize),
			opacity: 0.2 + Math.random() * (isLowPerformance ? 0.4 : 0.6),
			x: Math.random() * 100,
			y: Math.random() * 100,
			speed: 0.5 + Math.random() * (isLowPerformance ? 1 : 2),
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
			[HOME_MODES.NEURAL]: ['#10b981', '#06b6d4', '#8b5cf6', '#3b82f6', '#22d3ee'],
			[HOME_MODES.CRYSTALLINE]: ['#e879f9', '#c084fc', '#a78bfa'],
			[HOME_MODES.AURORA]: ['#22d3ee', '#a78bfa', '#fb7185'],
			[HOME_MODES.PARALLAX]: ['#10b981', '#06b6d4', '#34d399', '#22d3ee', '#14b8a6'],
			[HOME_MODES.GRADIENT]: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#ef4444'],
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

	// Enhanced Mode selector configuration with consistent design patterns
	const modeSelectors = [
		{ 
			mode: HOME_MODES.PARTICLES, 
			icon: '✨', 
			label: 'Particles', 
			color: 'from-blue-500 to-purple-500',
			bgPattern: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
			hoverEffect: 'hover:shadow-blue-500/25',
			description: 'Interactive floating particles'
		},
		{ 
			mode: HOME_MODES.PARALLAX, 
			icon: '🌊', 
			label: 'Parallax', 
			color: 'from-emerald-500 to-teal-500',
			bgPattern: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)',
			hoverEffect: 'hover:shadow-emerald-500/25',
			description: 'Depth-based scroll effects'
		},
		{ 
			mode: HOME_MODES.GRADIENT, 
			icon: '🎨', 
			label: 'Gradient', 
			color: 'from-pink-500 to-orange-500',
			bgPattern: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3) 0%, rgba(251, 146, 60, 0.3) 100%)',
			hoverEffect: 'hover:shadow-pink-500/25',
			description: 'Dynamic color transitions'
		},
		{ 
			mode: HOME_MODES.MATRIX, 
			icon: '💻', 
			label: 'Matrix', 
			color: 'from-green-500 to-emerald-500',
			bgPattern: 'repeating-linear-gradient(0deg, rgba(34, 197, 94, 0.1) 0px, transparent 2px, transparent 4px, rgba(34, 197, 94, 0.1) 6px)',
			hoverEffect: 'hover:shadow-green-500/25',
			description: 'Digital rain cascades'
		},
		{ 
			mode: HOME_MODES.COSMIC, 
			icon: '🌌', 
			label: 'Cosmic', 
			color: 'from-purple-500 to-blue-500',
			bgPattern: 'radial-gradient(ellipse at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
			hoverEffect: 'hover:shadow-purple-500/25',
			description: 'Cosmic objects floating'
		},
		{ 
			mode: HOME_MODES.WAVES, 
			icon: '〰️', 
			label: 'Waves', 
			color: 'from-cyan-500 to-blue-500',
			bgPattern: 'linear-gradient(0deg, rgba(6, 182, 212, 0.2) 0%, transparent 30%, rgba(59, 130, 246, 0.2) 70%, transparent 100%)',
			hoverEffect: 'hover:shadow-cyan-500/25',
			description: 'Flowing wave animations'
		},
		{ 
			mode: HOME_MODES.GEOMETRIC, 
			icon: '🔶', 
			label: 'Geometric', 
			color: 'from-orange-500 to-red-500',
			bgPattern: 'conic-gradient(from 0deg at 50% 50%, rgba(251, 146, 60, 0.3) 0deg, transparent 90deg, rgba(239, 68, 68, 0.3) 180deg, transparent 270deg)',
			hoverEffect: 'hover:shadow-orange-500/25',
			description: 'Abstract geometric shapes'
		},
		{ 
			mode: HOME_MODES.NEURAL, 
			icon: '🧠', 
			label: 'Neural', 
			color: 'from-emerald-500 to-green-500',
			bgPattern: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
			hoverEffect: 'hover:shadow-emerald-500/25',
			description: 'Neural network connections'
		},
		{ 
			mode: HOME_MODES.CRYSTALLINE, 
			icon: '💎', 
			label: 'Crystal', 
			color: 'from-violet-500 to-purple-500',
			bgPattern: 'conic-gradient(from 45deg at 50% 50%, rgba(139, 92, 246, 0.3) 0deg, rgba(147, 51, 234, 0.2) 120deg, rgba(139, 92, 246, 0.3) 240deg)',
			hoverEffect: 'hover:shadow-violet-500/25',
			description: 'Prismatic crystal effects'
		},
		{ 
			mode: HOME_MODES.AURORA, 
			icon: '🌈', 
			label: 'Aurora', 
			color: 'from-cyan-500 to-purple-500',
			bgPattern: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(236, 72, 153, 0.3) 100%)',
			hoverEffect: 'hover:shadow-cyan-500/25',
			description: 'Northern lights dance'
		},
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
			{#if currentMode === HOME_MODES.PARALLAX}
				<div class="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-300/15 to-transparent rounded-full blur-2xl animate-parallax-float"></div>
				<div class="absolute bottom-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-teal-300/20 to-transparent rounded-full blur-xl animate-parallax-trail"></div>
			{/if}
		</div>
		
		<!-- Layer 2 - Medium -->
		<div 
			class="absolute inset-0 opacity-30"
			style="transform: translateY({scrollY * 0.3}px)"
		>
			<div class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-white/12 to-white/6 rounded-full blur-xl animate-float-delayed"></div>
			<div class="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-br from-white/10 to-white/4 rounded-full blur-lg animate-bounce-slow"></div>
			{#if currentMode === HOME_MODES.PARALLAX}
				<div class="absolute top-2/3 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-300/20 to-transparent rounded-full blur-2xl animate-float"></div>
				<div class="absolute bottom-1/4 right-2/3 w-32 h-32 bg-gradient-to-br from-emerald-400/25 to-transparent rounded-full blur-lg animate-parallax-float"></div>
			{/if}
		</div>
		
		<!-- Layer 3 - Fastest -->
		<div 
			class="absolute inset-0 opacity-25"
			style="transform: translateY({scrollY * 0.5}px)"
		>
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/15 to-white/8 rounded-full blur-3xl animate-float"></div>
			<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-white/12 to-white/5 rounded-full blur-2xl animate-float-delayed"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-white/8 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
			{#if currentMode === HOME_MODES.PARALLAX}
				<div class="absolute top-1/6 right-1/5 w-40 h-40 bg-gradient-to-br from-teal-400/30 to-transparent rounded-full blur-xl animate-parallax-trail"></div>
				<div class="absolute bottom-1/6 left-2/3 w-28 h-28 bg-gradient-to-br from-emerald-500/25 to-transparent rounded-full blur-md animate-parallax-float"></div>
			{/if}
		</div>
		
		<!-- Layer 4 - Floating particles for extra depth -->
		<div 
			class="absolute inset-0 opacity-20"
			style="transform: translateY({scrollY * 0.7}px)"
		>
			<div class="absolute top-3/4 left-1/5 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl animate-float"></div>
			<div class="absolute top-1/5 right-1/5 w-40 h-40 bg-gradient-to-br from-white/8 to-transparent rounded-full blur-2xl animate-bounce-slow"></div>
			<div class="absolute bottom-2/3 left-2/3 w-24 h-24 bg-gradient-to-br from-white/12 to-transparent rounded-full blur-lg animate-float-delayed"></div>
			{#if currentMode === HOME_MODES.PARALLAX}
				<div class="absolute top-1/5 left-3/4 w-16 h-16 bg-gradient-to-br from-emerald-300/35 to-transparent rounded-full blur-sm animate-parallax-float"></div>
				<div class="absolute bottom-1/5 right-1/6 w-20 h-20 bg-gradient-to-br from-teal-300/30 to-transparent rounded-full blur-md animate-parallax-trail"></div>
				<div class="absolute top-2/3 left-1/6 w-12 h-12 bg-gradient-to-br from-cyan-300/40 to-transparent rounded-full blur-sm animate-bounce-slow"></div>
			{/if}
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
					<!-- Enhanced Neural Nodes with pulsing effect and mouse interaction -->
					<div
						class="absolute animate-neural-pulse-enhanced"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 25 * (element.size / 4) : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 20 * (element.size / 4) : 0)}%;
							width: {element.size * 2 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.2 : 0)}px;
							height: {element.size * 2 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.2 : 0)}px;
							background: radial-gradient(circle, {element.color}80, {element.color}20, transparent);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration - (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.005 : 0)}s;
							opacity: {element.opacity + (isMouseActive ? 0.4 : 0)};
							border-radius: 50%;
							box-shadow: 0 0 {element.size * 4 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.5 : 0)}px {element.color}40;
							transition: all 0.1s ease-out;
						"
					></div>
					
					<!-- Neural Connections - Multiple dynamic connections per node with mouse response -->
					{#if element.id % 3 === 0}
						{#each Array(2 + Math.floor(Math.random() * 3)) as _, connIndex}
							<div
								class="absolute animate-neural-connection-flow"
								style="
									left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 15 : 0)}%;
									top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 12 : 0)}%;
									width: {50 + Math.random() * 150 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.5 : 0)}px;
									height: 2px;
									background: linear-gradient(90deg, transparent, {element.color}60, {element.color}80, {element.color}60, transparent);
									animation-delay: {element.delay + connIndex * 0.5}s;
									animation-duration: {(element.duration + connIndex) * 1.2}s;
									opacity: {element.opacity * 0.7 + (isMouseActive ? 0.3 : 0)};
									transform-origin: left center;
									transform: rotate({Math.random() * 360 + (isMouseActive ? mouseVelocityX * 0.2 : 0)}deg);
									border-radius: 1px;
									filter: brightness({1 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.01 : 0)});
									transition: all 0.15s ease-out;
								"
							></div>
						{/each}
					{/if}
					
					<!-- Neural Data Packets with mouse attraction -->
					{#if element.id % 5 === 0}
						<div
							class="absolute animate-neural-data-flow"
							style="
								left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 10 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 8 : 0)}%;
								width: {element.size + (isMouseActive ? Math.abs(mouseVelocityX) * 0.1 : 0)}px;
								height: {element.size + (isMouseActive ? Math.abs(mouseVelocityY) * 0.1 : 0)}px;
								background: {element.color};
								animation-delay: {element.delay + 2}s;
								animation-duration: {element.duration * 0.8 - (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.005 : 0)}s;
								opacity: {element.opacity + (isMouseActive ? 0.5 : 0)};
								border-radius: 2px;
								box-shadow: 0 0 {element.size * 2 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.2 : 0)}px {element.color};
								filter: brightness({1 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.02 : 0)});
								transition: all 0.1s ease-out;
							"
						></div>
					{/if}
					
					<!-- Mouse-activated neural impulses -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 10 && element.id % 12 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: 4px;
								height: 4px;
								background: {element.color};
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.05, 1)};
								border-radius: 50%;
								transform: translate(-50%, -50%);
								animation: neural-data-flow 3s ease-out forwards;
								box-shadow: 0 0 20px {element.color};
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.PARALLAX}
				{#each animationElements as element (element.id)}
					<!-- Multi-layer parallax elements with depth and mouse interaction -->
					<div
						class="absolute animate-parallax-float"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 20 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 15 * element.speed : 0)}%;
							width: {element.size}px;
							height: {element.size}px;
							background: radial-gradient(circle, {element.color}60, transparent);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration * (1 + element.speed)}s;
							opacity: {element.opacity * (0.5 + element.speed * 0.5) + (isMouseActive ? 0.2 : 0)};
							transform: translateZ({element.speed * 100}px) scale({0.8 + element.speed * 0.4 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.001 : 0)});
							border-radius: 50%;
							filter: blur({(1 - element.speed) * 2}px);
							transition: transform 0.1s ease-out, opacity 0.2s ease-out;
						"
					></div>
					
					<!-- Parallax trailing effect with mouse responsiveness -->
					{#if element.id % 4 === 0}
						<div
							class="absolute animate-parallax-trail"
							style="
								left: {element.x + 5 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 10 : 0)}%;
								top: {element.y + 5 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 8 : 0)}%;
								width: {element.size * 0.6}px;
								height: {element.size * 0.6}px;
								background: linear-gradient(45deg, {element.color}40, transparent);
								animation-delay: {element.delay + 0.5}s;
								animation-duration: {element.duration * 1.5}s;
								opacity: {element.opacity * 0.6 + (isMouseActive ? 0.3 : 0)};
								border-radius: 50%;
								transform: translateZ({element.speed * 50}px);
								transition: opacity 0.3s ease-out;
							"
						></div>
					{/if}
					
					<!-- Mouse trail effect for parallax mode -->
					{#if isMouseActive && element.id % 8 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.abs(mouseVelocityX + mouseVelocityY) * 0.5 + 5}px;
								height: {Math.abs(mouseVelocityX + mouseVelocityY) * 0.5 + 5}px;
								background: radial-gradient(circle, {element.color}80, transparent);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.01, 0.8)};
								border-radius: 50%;
								transform: translate(-50%, -50%);
								animation: parallax-trail 1s ease-out forwards;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.GRADIENT}
				{#each animationElements as element (element.id)}
					<!-- Dynamic gradient orbs with morphing shapes and mouse interaction -->
					<div
						class="absolute animate-gradient-morph"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 15 : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 12 : 0)}%;
							width: {element.size + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.1 : 0)}px;
							height: {element.size + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.1 : 0)}px;
							background: radial-gradient(ellipse at {Math.random() * 100}% {Math.random() * 100}%, {element.color}, transparent);
							animation-delay: {element.delay}s;
							animation-duration: {element.duration - (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.01 : 0)}s;
							opacity: {element.opacity + (isMouseActive ? 0.3 : 0)};
							border-radius: {30 + Math.random() * 70}%;
							filter: blur({Math.random() * 2}px) hue-rotate({Math.random() * 360 + (isMouseActive ? mouseVelocityX * 2 : 0)}deg);
							transition: all 0.2s ease-out;
						"
					></div>
					
					<!-- Gradient flow streams with mouse responsiveness -->
					{#if element.id % 3 === 0}
						<div
							class="absolute animate-gradient-flow"
							style="
								left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 10 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 8 : 0)}%;
								width: {element.size * 3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.2 : 0)}px;
								height: {element.size * 0.3}px;
								background: linear-gradient(90deg, transparent, {element.color}80, {element.color}, {element.color}80, transparent);
								animation-delay: {element.delay + 1}s;
								animation-duration: {element.duration * 2}s;
								opacity: {element.opacity * 0.8 + (isMouseActive ? 0.2 : 0)};
								border-radius: 50px;
								transform: rotate({Math.random() * 360 + (isMouseActive ? mouseVelocityX * 0.5 : 0)}deg);
								transition: all 0.15s ease-out;
							"
						></div>
					{/if}
					
					<!-- Gradient particles with color shifts and mouse interaction -->
					{#if element.id % 6 === 0}
						<div
							class="absolute animate-gradient-particle"
							style="
								left: {element.x + 10 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 8 : 0)}%;
								top: {element.y + 10 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 6 : 0)}%;
								width: {element.size * 0.5 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.05 : 0)}px;
								height: {element.size * 0.5 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.05 : 0)}px;
								background: {element.color};
								animation-delay: {element.delay + 2}s;
								animation-duration: {element.duration * 0.7}s;
								opacity: {element.opacity + (isMouseActive ? 0.4 : 0)};
								border-radius: 50%;
								box-shadow: 0 0 {element.size + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.1 : 0)}px {element.color};
								filter: hue-rotate({isMouseActive ? mouseVelocityX * 3 : 0}deg);
								transition: all 0.1s ease-out;
							"
						></div>
					{/if}
					
					<!-- Mouse-responsive gradient ripples -->
					{#if isMouseActive && element.id % 10 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.abs(mouseVelocityX + mouseVelocityY) * 2 + 10}px;
								height: {Math.abs(mouseVelocityX + mouseVelocityY) * 2 + 10}px;
								background: radial-gradient(circle, {element.color}60, transparent);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.02, 1)};
								border-radius: 50%;
								transform: translate(-50%, -50%);
								animation: gradient-morph 2s ease-out forwards;
								filter: hue-rotate({mouseVelocityX * 5}deg);
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
			<!-- Enhanced Mode Selection Grid with consistent sizing -->
			{#if mounted}
				<div class="fixed top-32 right-6 z-50" transition:fade={{ delay: 1000 }}>
					<div class="bg-black/10 backdrop-blur-2xl rounded-3xl p-4 border border-white/20 shadow-2xl shadow-black/20">
						<!-- Header -->
						<div class="text-center mb-4">
							<h3 class="text-sm font-semibold text-white/90 mb-1">Animation Mode</h3>
							<div class="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
						</div>
						
						<!-- Mode Grid with fixed dimensions -->
						<div class="grid grid-cols-2 gap-3 w-64">
							{#each modeSelectors as { mode, icon, label, color, bgPattern, hoverEffect, description }}
								<button
									on:click={() => setHomeMode(mode)}
									class="group relative overflow-hidden w-full h-20 rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 {hoverEffect} border-2 {currentMode === mode
										? 'bg-white/25 border-white/60 shadow-xl shadow-white/20'
										: 'bg-white/8 border-white/20 hover:bg-white/15 hover:border-white/40 shadow-lg'}"
									title="Switch to {label} mode - {description}"
									style="background-image: {bgPattern}; background-blend-mode: overlay;"
								>
									<!-- Background pattern overlay -->
									<div class="absolute inset-0 opacity-50 {currentMode === mode ? 'bg-gradient-to-br' : 'bg-gradient-to-br opacity-0 group-hover:opacity-30'} {color} transition-opacity duration-500"></div>
									
									<!-- Active state glow -->
									{#if currentMode === mode}
										<div class="absolute inset-0 bg-gradient-to-r {color} opacity-20 animate-pulse"></div>
									{/if}
									
									<!-- Content -->
									<div class="relative z-10 flex flex-col items-center justify-center h-full gap-1 p-2">
										<span class="text-xl group-hover:animate-bounce transition-transform duration-300 {currentMode === mode ? 'scale-110' : ''}">{icon}</span>
										<span class="font-medium text-xs text-white/90 group-hover:text-white transition-colors truncate max-w-full">{label}</span>
									</div>
									
									<!-- Hover ripple effect -->
									<div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r {color} rounded-2xl"></div>
								</button>
							{/each}
						</div>
						
						<!-- Enhanced Mode Description -->
						<div class="mt-4 pt-4 border-t border-white/10">
							<div class="text-center">
								<p class="text-xs text-white/70 leading-relaxed min-h-[2.5rem] flex items-center justify-center">
									{#key currentMode}
										<span in:fade={{ duration: 300 }}>
											{modeSelectors.find(m => m.mode === currentMode)?.description || config.description}
										</span>
									{/key}
								</p>
								
								<!-- Mode indicator dots -->
								<div class="flex justify-center gap-1 mt-2">
									{#each modeSelectors as { mode }}
										<div class="w-1 h-1 rounded-full transition-all duration-300 {currentMode === mode ? 'bg-white/80 w-3' : 'bg-white/30'}"></div>
									{/each}
								</div>
							</div>
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

	/* Enhanced Neural Network Animations */
	@keyframes neural-pulse-enhanced {
		0% { 
			transform: scale(1) translateY(0); 
			opacity: 0.3; 
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
		}
		25% {
			transform: scale(1.2) translateY(-5px);
			opacity: 0.7;
			box-shadow: 0 0 20px 5px rgba(16, 185, 129, 0.3);
		}
		50% { 
			transform: scale(1.5) translateY(-10px); 
			opacity: 0.9; 
			box-shadow: 0 0 40px 15px rgba(16, 185, 129, 0.2);
		}
		75% {
			transform: scale(1.3) translateY(-5px);
			opacity: 0.6;
			box-shadow: 0 0 25px 8px rgba(16, 185, 129, 0.3);
		}
		100% { 
			transform: scale(1) translateY(0); 
			opacity: 0.3; 
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
		}
	}

	@keyframes neural-connection-flow {
		0% { 
			opacity: 0; 
			transform: scaleX(0) scaleY(1);
			filter: brightness(0.5);
		}
		20% { 
			opacity: 0.8; 
			transform: scaleX(0.3) scaleY(1.2);
			filter: brightness(1.2);
		}
		50% { 
			opacity: 1; 
			transform: scaleX(1) scaleY(1);
			filter: brightness(1.5);
		}
		80% { 
			opacity: 0.6; 
			transform: scaleX(0.8) scaleY(0.8);
			filter: brightness(1);
		}
		100% { 
			opacity: 0; 
			transform: scaleX(0) scaleY(1);
			filter: brightness(0.5);
		}
	}

	@keyframes neural-data-flow {
		0% {
			transform: translateX(0) translateY(0) scale(0.5);
			opacity: 0;
		}
		25% {
			transform: translateX(50px) translateY(-20px) scale(1);
			opacity: 1;
		}
		50% {
			transform: translateX(100px) translateY(0) scale(1.2);
			opacity: 0.8;
		}
		75% {
			transform: translateX(150px) translateY(20px) scale(1);
			opacity: 0.6;
		}
		100% {
			transform: translateX(200px) translateY(0) scale(0.5);
			opacity: 0;
		}
	}

	/* Enhanced Parallax Animations */
	@keyframes parallax-float {
		0% { 
			transform: translateY(0) translateX(0) scale(1) rotateZ(0deg);
			opacity: 0.4;
		}
		25% { 
			transform: translateY(-30px) translateX(15px) scale(1.1) rotateZ(90deg);
			opacity: 0.7;
		}
		50% { 
			transform: translateY(-50px) translateX(-10px) scale(1.2) rotateZ(180deg);
			opacity: 0.9;
		}
		75% { 
			transform: translateY(-30px) translateX(-25px) scale(1.1) rotateZ(270deg);
			opacity: 0.6;
		}
		100% { 
			transform: translateY(0) translateX(0) scale(1) rotateZ(360deg);
			opacity: 0.4;
		}
	}

	@keyframes parallax-trail {
		0% {
			transform: translateY(0) translateX(0) scale(1);
			opacity: 0;
		}
		50% {
			transform: translateY(-20px) translateX(-20px) scale(0.8);
			opacity: 0.6;
		}
		100% {
			transform: translateY(-40px) translateX(-40px) scale(0.5);
			opacity: 0;
		}
	}

	/* Enhanced Gradient Animations */
	@keyframes gradient-morph {
		0% { 
			transform: scale(1) rotate(0deg);
			border-radius: 50%;
			filter: hue-rotate(0deg) blur(0px);
		}
		25% { 
			transform: scale(1.3) rotate(90deg);
			border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
			filter: hue-rotate(90deg) blur(1px);
		}
		50% { 
			transform: scale(1.5) rotate(180deg);
			border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
			filter: hue-rotate(180deg) blur(2px);
		}
		75% { 
			transform: scale(1.2) rotate(270deg);
			border-radius: 20% 80% 80% 20% / 20% 20% 80% 80%;
			filter: hue-rotate(270deg) blur(1px);
		}
		100% { 
			transform: scale(1) rotate(360deg);
			border-radius: 50%;
			filter: hue-rotate(360deg) blur(0px);
		}
	}

	@keyframes gradient-flow {
		0% {
			transform: translateX(-100%) scaleX(0.5) scaleY(1);
			opacity: 0;
			filter: hue-rotate(0deg);
		}
		25% {
			transform: translateX(-25%) scaleX(1) scaleY(1.5);
			opacity: 0.8;
			filter: hue-rotate(90deg);
		}
		50% {
			transform: translateX(50%) scaleX(1.5) scaleY(1);
			opacity: 1;
			filter: hue-rotate(180deg);
		}
		75% {
			transform: translateX(125%) scaleX(1) scaleY(0.8);
			opacity: 0.6;
			filter: hue-rotate(270deg);
		}
		100% {
			transform: translateX(200%) scaleX(0.5) scaleY(1);
			opacity: 0;
			filter: hue-rotate(360deg);
		}
	}

	@keyframes gradient-particle {
		0% {
			transform: scale(0) rotate(0deg);
			opacity: 0;
			filter: brightness(0.5);
		}
		25% {
			transform: scale(1.2) rotate(90deg);
			opacity: 0.8;
			filter: brightness(1.5);
		}
		50% {
			transform: scale(1) rotate(180deg);
			opacity: 1;
			filter: brightness(2);
		}
		75% {
			transform: scale(0.8) rotate(270deg);
			opacity: 0.6;
			filter: brightness(1.2);
		}
		100% {
			transform: scale(0) rotate(360deg);
			opacity: 0;
			filter: brightness(0.5);
		}
	}

	/* Mouse-responsive animation enhancements */
	@keyframes mouse-attraction {
		0% {
			transform: scale(1) translate(0, 0);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.3) translate(var(--mouse-x, 0), var(--mouse-y, 0));
			opacity: 0.9;
		}
		100% {
			transform: scale(1) translate(0, 0);
			opacity: 0.5;
		}
	}

	@keyframes mouse-ripple {
		0% {
			transform: scale(0) translate(-50%, -50%);
			opacity: 1;
		}
		100% {
			transform: scale(4) translate(-50%, -50%);
			opacity: 0;
		}
	}

	@keyframes neural-impulse {
		0% {
			transform: scale(0.5) translate(-50%, -50%);
			opacity: 1;
			filter: brightness(2);
		}
		50% {
			transform: scale(1) translate(-50%, -50%);
			opacity: 0.8;
			filter: brightness(1.5);
		}
		100% {
			transform: scale(0.2) translate(-50%, -50%);
			opacity: 0;
			filter: brightness(1);
		}
	}

	/* Performance optimized animations for mobile */
	@media (max-width: 768px) {
		.animate-neural-pulse-enhanced,
		.animate-neural-connection-flow,
		.animate-neural-data-flow,
		.animate-parallax-float,
		.animate-parallax-trail,
		.animate-gradient-morph,
		.animate-gradient-flow,
		.animate-gradient-particle {
			animation-duration: 150% !important;
			will-change: transform, opacity;
		}
	}

	/* Reduce motion for users who prefer it */
	@media (prefers-reduced-motion: reduce) {
		.animate-neural-pulse-enhanced,
		.animate-neural-connection-flow,
		.animate-neural-data-flow,
		.animate-parallax-float,
		.animate-parallax-trail,
		.animate-gradient-morph,
		.animate-gradient-flow,
		.animate-gradient-particle {
			animation: none !important;
		}
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
	
	/* Enhanced Animation Classes */
	.animate-neural-pulse-enhanced { animation: neural-pulse-enhanced 3s ease-in-out infinite; }
	.animate-neural-connection-flow { animation: neural-connection-flow 4s ease-in-out infinite; }
	.animate-neural-data-flow { animation: neural-data-flow 6s linear infinite; }
	.animate-parallax-float { animation: parallax-float 8s ease-in-out infinite; }
	.animate-parallax-trail { animation: parallax-trail 5s ease-out infinite; }
	.animate-gradient-morph { animation: gradient-morph 6s ease-in-out infinite; }
	.animate-gradient-flow { animation: gradient-flow 10s ease-in-out infinite; }
	.animate-gradient-particle { animation: gradient-particle 4s ease-in-out infinite; }
	
	/* Mouse-responsive classes */
	.animate-mouse-attraction { animation: mouse-attraction 2s ease-in-out infinite; }
	.animate-mouse-ripple { animation: mouse-ripple 1s ease-out forwards; }
	.animate-neural-impulse { animation: neural-impulse 3s ease-out forwards; }
</style>
