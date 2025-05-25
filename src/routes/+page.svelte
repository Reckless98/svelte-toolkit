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
	let lastMouseUpdate = 0;
	let mouseAcceleration = 0;
	let mouseTrail: Array<{x: number, y: number, time: number}> = [];
	let interactionIntensity = 0;

	// Dynamic component count - actual components in the project
	const componentLibrary = [
		'Alert', 'Badge', 'Button', 'Card', 'Checkbox', 'Documentation', 
		'Footer', 'Header', 'Input', 'List', 'Modal', 'Navigation', 
		'Progress', 'Search', 'Select', 'Stats', 'Table', 'Tabs', 
		'Textarea', 'Toast', 'Toggle', 'HeroLayout', 'ParallaxLayout'
	];
	const componentCount = componentLibrary.length;

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
		
		// Simplified smooth mouse tracking for subtle effects
		const handleMouseMove = (e: MouseEvent) => {
			if (mouseTrackingFrame) {
				cancelAnimationFrame(mouseTrackingFrame);
			}
			
			mouseTrackingFrame = requestAnimationFrame(() => {
				// Ultra-gentle velocity calculation for extremely minimal effects
				const newVelocityX = e.clientX - lastMouseX;
				const newVelocityY = e.clientY - lastMouseY;
				const deltaTime = Date.now() - lastMouseUpdate;
				
				if (deltaTime > 0) {
					// Ultra-reduced velocity with maximum dampening
					mouseVelocityX = mouseVelocityX * 0.98 + (newVelocityX / deltaTime * 1000) * 0.01;
					mouseVelocityY = mouseVelocityY * 0.98 + (newVelocityY / deltaTime * 1000) * 0.01;
				}
				
				// Ultra-minimal acceleration for barely perceptible effects
				mouseAcceleration = (Math.abs(mouseVelocityX) + Math.abs(mouseVelocityY)) * 0.01;
				
				lastMouseX = mouseX;
				lastMouseY = mouseY;
				mouseX = e.clientX;
				mouseY = e.clientY;
				isMouseActive = true;
				lastMouseUpdate = Date.now();
				
				// Barely noticeable interaction intensity
				const targetIntensity = Math.min(mouseAcceleration * 0.0005, 0.02);
				interactionIntensity = interactionIntensity * 0.99 + targetIntensity * 0.01;
				
				// Reduced mouse trail with fewer points
				mouseTrail = [...mouseTrail.slice(-2), { x: mouseX, y: mouseY, time: Date.now() }];
			});
		};

		const handleMouseLeave = () => {
			isMouseActive = false;
			// Very smooth fade-out transitions
			setTimeout(() => {
				mouseVelocityX *= 0.95;
				mouseVelocityY *= 0.95;
				mouseAcceleration *= 0.95;
				interactionIntensity *= 0.95;
			}, 16);
			// Gentle trail fade
			setTimeout(() => { mouseTrail = []; }, 500);
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

	// Enhanced features array with updated content
	const features: Feature[] = [
		{
			title: `${componentCount}+ Components`,
			subtitle: 'Production Ready Library',
			description: 'Comprehensive collection including Buttons, Cards, Modals, Forms, Tables, Navigation, and advanced layouts - all optimized for real-world applications',
			variant: 'gradient',
			delay: 0,
			icon: '🎨'
		},
		{
			title: 'Interactive Animations',
			subtitle: 'Mouse-Responsive Effects',
			description: `${Object.keys(HOME_MODES).length} unique animation modes with mouse tracking, velocity-based interactions, and smooth transitions that respond to user input`,
			variant: 'neon',
			delay: 100,
			icon: '✨'
		},
		{
			title: 'Fully Responsive',
			subtitle: 'Mobile-First Design',
			description: 'Every component adapts seamlessly across all device sizes with optimized touch interactions and performance-conscious mobile implementations',
			variant: 'glass',
			delay: 200,
			icon: '📱'
		},
		{
			title: 'Advanced Theme System',
			subtitle: 'Dark Mode & Customization',
			description: 'Intelligent theme switching with system preference detection, custom color schemes, and per-component theme overrides for maximum flexibility',
			variant: 'morphic',
			delay: 300,
			icon: '🌙'
		},
		{
			title: 'TypeScript Enhanced',
			subtitle: 'Type-Safe Development',
			description: 'Complete TypeScript support with intelligent autocompletion, strict type checking, and comprehensive interface definitions for enhanced developer experience',
			variant: 'gradient',
			delay: 400,
			icon: '⚡'
		},
		{
			title: 'Performance Optimized',
			subtitle: 'Zero-Dependency Core',
			description: 'Lightweight components with tree-shaking support, lazy loading capabilities, and performance monitoring to ensure optimal bundle sizes and runtime speed',
			variant: 'glass',
			delay: 500,
			icon: '🚀'
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
				<div class="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-300/20 to-transparent rounded-full blur-2xl animate-parallax-dimensional"></div>
				<div class="absolute bottom-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-teal-300/25 to-transparent rounded-full blur-xl animate-parallax-field"></div>
				<div class="absolute top-3/4 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-300/30 to-transparent rounded-full blur-lg animate-parallax-fragment"></div>
			{:else if currentMode === HOME_MODES.AURORA}
				<!-- Aurora background curtains -->
				<div class="absolute top-0 left-1/4 w-96 h-screen bg-gradient-to-b from-cyan-400/15 via-purple-400/10 via-pink-400/12 to-transparent blur-2xl animate-aurora-curtain-slow"></div>
				<div class="absolute top-0 right-1/3 w-80 h-screen bg-gradient-to-b from-green-400/12 via-cyan-400/8 via-blue-400/10 to-transparent blur-xl animate-aurora-curtain-slow" style="animation-delay: 1.5s;"></div>
				<div class="absolute top-0 left-2/3 w-64 h-screen bg-gradient-to-b from-purple-400/10 via-pink-400/15 via-cyan-400/8 to-transparent blur-3xl animate-aurora-curtain-slow" style="animation-delay: 3s;"></div>
			{:else if currentMode === HOME_MODES.CRYSTALLINE}
				<!-- Crystal background formations -->
				<div class="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-conic from-violet-400/20 via-purple-400/15 via-fuchsia-400/18 to-violet-400/20 rounded-full blur-2xl animate-crystal-rotation"></div>
				<div class="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-radial from-purple-400/25 via-violet-400/12 to-transparent blur-xl animate-crystal-pulse" style="animation-delay: 2s;"></div>
				<div class="absolute top-2/3 left-1/2 w-64 h-32 bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent blur-lg animate-crystal-beam" style="animation-delay: 1s;"></div>
			{:else if currentMode === HOME_MODES.COSMIC}
				<!-- Cosmic background nebulae -->
				<div class="absolute top-1/6 left-1/4 w-80 h-80 bg-gradient-radial from-blue-400/15 via-purple-400/20 via-pink-400/10 to-transparent rounded-full blur-3xl animate-cosmic-nebula-drift"></div>
				<div class="absolute bottom-1/4 right-1/5 w-96 h-64 bg-gradient-to-br from-purple-400/12 via-blue-400/18 to-transparent blur-2xl animate-cosmic-cloud-flow" style="animation-delay: 2.5s;"></div>
				<div class="absolute top-1/2 right-1/2 w-48 h-48 bg-gradient-conic from-cyan-400/20 via-blue-400/15 to-purple-400/20 rounded-full blur-xl animate-cosmic-vortex" style="animation-delay: 1.2s;"></div>
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
				<div class="absolute top-2/3 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-300/25 to-transparent rounded-full blur-2xl animate-parallax-dimensional"></div>
				<div class="absolute bottom-1/4 right-2/3 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-transparent rounded-full blur-lg animate-parallax-field"></div>
				<div class="absolute top-1/6 left-3/5 w-24 h-24 bg-gradient-to-br from-teal-400/35 to-transparent rounded-full blur-md animate-parallax-rift"></div>
			{:else if currentMode === HOME_MODES.AURORA}
				<!-- Aurora background waves -->
				<div class="absolute top-1/4 left-1/6 w-full h-32 bg-gradient-to-r from-transparent via-cyan-400/15 via-purple-400/20 via-green-400/12 to-transparent blur-lg animate-aurora-wave-flow"></div>
				<div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-pink-400/18 via-purple-400/10 to-transparent rounded-full blur-2xl animate-aurora-glow" style="animation-delay: 1s;"></div>
				<div class="absolute top-2/3 left-1/2 w-64 h-16 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent blur-md animate-aurora-streak" style="animation-delay: 2.5s;"></div>
			{:else if currentMode === HOME_MODES.CRYSTALLINE}
				<!-- Crystal background refractions -->
				<div class="absolute top-1/5 right-1/3 w-48 h-96 bg-gradient-to-b from-violet-400/20 via-transparent via-purple-400/15 to-transparent blur-lg animate-crystal-refraction-beam"></div>
				<div class="absolute bottom-1/4 left-1/5 w-72 h-24 bg-gradient-to-r from-transparent via-fuchsia-400/25 via-violet-400/15 to-transparent blur-md animate-crystal-light-ray" style="animation-delay: 1.5s;"></div>
				<div class="absolute top-1/2 right-1/6 w-40 h-40 bg-gradient-conic from-purple-400/20 to-violet-400/25 rounded-full blur-xl animate-crystal-facet-shine" style="animation-delay: 0.8s;"></div>
			{:else if currentMode === HOME_MODES.COSMIC}
				<!-- Cosmic background streams -->
				<div class="absolute top-1/3 left-1/8 w-full h-24 bg-gradient-to-r from-transparent via-blue-400/15 via-purple-400/20 via-cyan-400/12 to-transparent blur-lg animate-cosmic-stream-flow"></div>
				<div class="absolute bottom-1/5 right-1/3 w-64 h-64 bg-gradient-radial from-purple-400/20 via-blue-400/15 to-transparent rounded-full blur-2xl animate-cosmic-energy-pulse" style="animation-delay: 1.8s;"></div>
				<div class="absolute top-3/4 left-1/3 w-48 h-12 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-sm animate-cosmic-light-trail" style="animation-delay: 0.5s;"></div>
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
				<div class="absolute top-1/6 right-1/5 w-40 h-40 bg-gradient-to-br from-teal-400/35 to-transparent rounded-full blur-xl animate-parallax-dimensional"></div>
				<div class="absolute bottom-1/6 left-2/3 w-28 h-28 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full blur-md animate-parallax-fragment"></div>
				<div class="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-full blur-sm animate-parallax-rift"></div>
			{:else if currentMode === HOME_MODES.AURORA}
				<!-- Aurora background shimmer -->
				<div class="absolute top-1/6 left-1/3 w-56 h-56 bg-gradient-radial from-cyan-400/25 via-purple-400/15 to-transparent rounded-full blur-xl animate-aurora-shimmer-bg" style="animation-delay: 0.5s;"></div>
				<div class="absolute bottom-1/5 right-1/5 w-full h-20 bg-gradient-to-r from-transparent via-green-400/20 via-blue-400/15 to-transparent blur-lg animate-aurora-ripple" style="animation-delay: 2s;"></div>
				<div class="absolute top-3/5 left-1/8 w-32 h-64 bg-gradient-to-b from-pink-400/20 via-purple-400/10 to-transparent blur-md animate-aurora-column" style="animation-delay: 1.2s;"></div>
			{:else if currentMode === HOME_MODES.CRYSTALLINE}
				<!-- Crystal background prismatic effects -->
				<div class="absolute top-1/3 left-1/6 w-20 h-80 bg-gradient-to-b from-violet-400/30 via-purple-400/20 via-fuchsia-400/25 to-transparent blur-sm animate-crystal-prism-bg"></div>
				<div class="absolute bottom-1/6 right-1/4 w-64 h-32 bg-gradient-to-r from-transparent via-violet-400/25 via-purple-400/15 to-transparent blur-lg animate-crystal-spectrum" style="animation-delay: 1.8s;"></div>
				<div class="absolute top-2/5 right-1/3 w-48 h-48 bg-gradient-conic from-fuchsia-400/20 via-violet-400/25 via-purple-400/15 to-fuchsia-400/20 rounded-full blur-2xl animate-crystal-kaleidoscope" style="animation-delay: 0.3s;"></div>
			{:else if currentMode === HOME_MODES.COSMIC}
				<!-- Cosmic background stellar fields -->
				<div class="absolute top-1/5 right-1/6 w-72 h-72 bg-gradient-radial from-blue-400/20 via-purple-400/25 via-cyan-400/15 to-transparent rounded-full blur-2xl animate-cosmic-stellar-field"></div>
				<div class="absolute bottom-1/3 left-1/4 w-full h-16 bg-gradient-to-r from-transparent via-purple-400/20 via-blue-400/25 via-pink-400/15 to-transparent blur-md animate-cosmic-galaxy-arm" style="animation-delay: 1.5s;"></div>
				<div class="absolute top-2/3 right-1/8 w-40 h-40 bg-gradient-conic from-cyan-400/25 via-blue-400/20 to-purple-400/25 rounded-full blur-lg animate-cosmic-pulsar" style="animation-delay: 0.8s;"></div>
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
				<div class="absolute top-1/5 left-3/4 w-16 h-16 bg-gradient-to-br from-emerald-300/40 to-transparent rounded-full blur-sm animate-parallax-dimensional"></div>
				<div class="absolute bottom-1/5 right-1/6 w-20 h-20 bg-gradient-to-br from-teal-300/35 to-transparent rounded-full blur-md animate-parallax-field"></div>
				<div class="absolute top-2/3 left-1/6 w-12 h-12 bg-gradient-to-br from-cyan-300/45 to-transparent rounded-full blur-sm animate-parallax-rift"></div>
				<div class="absolute bottom-1/3 right-1/3 w-18 h-18 bg-gradient-to-br from-emerald-400/40 to-transparent rounded-full blur-md animate-parallax-fragment"></div>
			{:else if currentMode === HOME_MODES.AURORA}
				<!-- Aurora background particles -->
				<div class="absolute top-1/8 right-1/3 w-24 h-24 bg-gradient-radial from-cyan-400/30 to-transparent rounded-full blur-lg animate-aurora-particle-float" style="animation-delay: 0.8s;"></div>
				<div class="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-radial from-purple-400/35 to-transparent rounded-full blur-md animate-aurora-particle-drift" style="animation-delay: 2.2s;"></div>
				<div class="absolute top-1/2 right-1/8 w-20 h-20 bg-gradient-radial from-green-400/25 to-transparent rounded-full blur-sm animate-aurora-particle-dance" style="animation-delay: 1.5s;"></div>
				<div class="absolute bottom-2/3 left-1/2 w-12 h-12 bg-gradient-radial from-pink-400/40 to-transparent rounded-full blur-xs animate-aurora-particle-glow" style="animation-delay: 3s;"></div>
			{:else if currentMode === HOME_MODES.CRYSTALLINE}
				<!-- Crystal background fragments -->
				<div class="absolute top-1/6 left-1/8 w-16 h-16 bg-gradient-conic from-violet-400/35 to-purple-400/25 rounded-full blur-sm animate-crystal-fragment-spin" style="animation-delay: 1.2s;"></div>
				<div class="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-radial from-fuchsia-400/30 to-transparent rounded-full blur-md animate-crystal-fragment-pulse" style="animation-delay: 0.5s;"></div>
				<div class="absolute top-2/3 left-1/3 w-12 h-12 bg-gradient-to-br from-purple-400/40 to-violet-400/25 blur-xs animate-crystal-fragment-drift" style="animation-delay: 2.8s;"></div>
				<div class="absolute bottom-1/6 right-1/8 w-18 h-18 bg-gradient-conic from-violet-400/25 via-purple-400/35 to-fuchsia-400/30 rounded-full blur-sm animate-crystal-fragment-shimmer" style="animation-delay: 1.8s;"></div>
			{:else if currentMode === HOME_MODES.COSMIC}
				<!-- Cosmic background dust -->
				<div class="absolute top-1/4 left-1/6 w-20 h-20 bg-gradient-radial from-blue-400/30 to-transparent rounded-full blur-lg animate-cosmic-dust-drift" style="animation-delay: 1s;"></div>
				<div class="absolute bottom-1/5 right-1/3 w-16 h-16 bg-gradient-radial from-purple-400/35 to-transparent rounded-full blur-md animate-cosmic-dust-swirl" style="animation-delay: 2.5s;"></div>
				<div class="absolute top-3/5 left-1/2 w-12 h-12 bg-gradient-radial from-cyan-400/40 to-transparent rounded-full blur-sm animate-cosmic-dust-sparkle" style="animation-delay: 0.3s;"></div>
				<div class="absolute bottom-2/3 right-1/6 w-24 h-24 bg-gradient-conic from-blue-400/25 via-purple-400/30 to-pink-400/20 rounded-full blur-xl animate-cosmic-dust-nebula" style="animation-delay: 1.8s;"></div>
			{/if}
		</div>
	</div>

	<!-- Enhanced Mode-specific animations moved to background -->
	{#if mounted}
		<div class="absolute inset-0 pointer-events-none z-0">
			{#if currentMode === HOME_MODES.MATRIX}
				{#each animationElements as element (element.id)}
					<!-- Enhanced matrix rainfall - Primary falling blocks with character-like appearance -->
					<div
						class="absolute animate-matrix-rainfall-primary mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.5 * element.speed : 0)}%;
							top: {-20 + (element.id % 3) * -15}%;
							width: {Math.max(element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.008, 0.4) : 0), 10)}px;
							height: {Math.max(element.size * 1.5 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.008, 0.4) : 0), 15)}px;
							--animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0003, 0.15) : 0), 2)}s;
							opacity: {Math.min(element.opacity + (isMouseActive ? 0.03 : 0), 0.9)};
							background: linear-gradient(180deg, {element.color} 0%, {element.color}EE 20%, {element.color}CC 60%, {element.color}88 90%, transparent 100%);
							filter: 
								brightness({1.5 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.001, 0.1) : 0)})
								contrast({1.4 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0005 : 0)})
								saturate({1.8 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.002 : 0)})
								drop-shadow(0 0 {element.size * 0.8}px {element.color}CC);
							box-shadow: 
								0 0 {element.size * 2}px {element.color}80,
								0 0 {element.size * 4}px {element.color}40,
								0 2px {element.size}px {element.color}60,
								inset 0 1px {element.size * 0.2}px {element.color}AA,
								inset 0 -1px {element.size * 0.1}px {element.color}66;
							border-radius: 1px;
							border: 0.5px solid {element.color}EE;
							transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
							font-family: 'Courier New', monospace;
							font-size: {Math.max(element.size * 0.8, 8)}px;
							color: {element.color};
							text-shadow: 0 0 {element.size * 0.5}px {element.color}CC;
							line-height: 1;
						"
						data-content="{['0','1','ア','カ','サ','タ','ナ','ハ','マ','ヤ','ラ','ワ','Z','X','C','V','B','N','M'][element.id % 19]}"
					>
						{['0','1','ア','カ','サ','タ','ナ','ハ','マ','ヤ','ラ','ワ','Z','X','C','V','B','N','M'][element.id % 19]}
					</div>
					
					<!-- Secondary rainfall droplets with trailing effects -->
					{#if element.id % 2 === 0}
						<div
							class="absolute animate-matrix-rainfall-secondary"
							style="
								left: {element.x + Math.random() * 8 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.2 : 0)}%;
								top: {-30 + (element.id % 4) * -12}%;
								width: {6 + Math.random() * 4}px;
								height: {16 + Math.random() * 12}px;
								--animation-delay: {element.delay + Math.random() * 1.5}s;
								animation-duration: {3.5 + Math.random() * 2}s;
								background: linear-gradient(180deg, 
									{element.color}CC 0%, 
									{element.color}AA 20%, 
									{element.color}88 40%, 
									{element.color}66 60%, 
									{element.color}44 80%, 
									transparent 100%);
								opacity: {0.6 + Math.random() * 0.3 + (isMouseActive ? 0.05 : 0)};
								filter: 
									brightness({1.2 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.0008 : 0)})
									blur({0.1 + Math.random() * 0.2}px)
									drop-shadow(0 0 {3 + Math.random() * 2}px {element.color}80);
								border-radius: 1px;
								border: 0.5px solid {element.color}AA;
								box-shadow: 
									0 0 {4 + Math.random() * 3}px {element.color}60,
									inset 0 1px {2}px {element.color}80;
								transition: all 0.25s ease-out;
							"
						></div>
					{/if}
					
					<!-- Matrix code trail effects -->
					{#if element.id % 3 === 0}
						<div
							class="absolute animate-matrix-rainfall-trail"
							style="
								left: {element.x + 1 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 0.8 : 0)}%;
								top: {-15 + (element.id % 6) * -8}%;
								width: {3 + Math.random() * 2}px;
								height: {25 + Math.random() * 20}px;
								--animation-delay: {element.delay + 0.3}s;
								animation-duration: {element.duration * 1.5}s;
								background: linear-gradient(180deg, 
									transparent 0%,
									{element.color}40 15%, 
									{element.color}80 35%, 
									{element.color}60 55%, 
									{element.color}40 75%, 
									{element.color}20 90%, 
									transparent 100%);
								opacity: {element.opacity * 0.7 + (isMouseActive ? 0.03 : 0)};
								border-radius: 0.5px;
								filter: 
									blur({0.3 + Math.random() * 0.2}px)
									drop-shadow(0 0 {2}px {element.color}60);
								transition: all 0.2s ease-out;
							"
						></div>
					{/if}
					
					<!-- Enhanced mouse-triggered matrix burst -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 20 && element.id % 6 === 0}
						<div
							class="absolute pointer-events-none animate-matrix-rainfall-burst"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {10 + Math.random() * 8}px;
								height: {10 + Math.random() * 8}px;
								--animation-delay: 0s;
								animation-duration: 1.5s;
								background: radial-gradient(circle, {element.color} 0%, {element.color}DD 30%, {element.color}AA 60%, transparent 85%);
								box-shadow: 
									0 0 {Math.abs(mouseVelocityX) * 0.03}px {element.color}DD,
									0 0 {Math.abs(mouseVelocityX) * 0.06}px {element.color}88,
									0 0 {Math.abs(mouseVelocityY) * 0.04}px {element.color}99;
								opacity: {Math.min(Math.abs(mouseVelocityY) * 0.004, 0.5)};
								transform: 
									translate(-50%, -50%) 
									rotate({mouseVelocityX * 0.08}deg)
									scale({0.9 + Math.abs(mouseVelocityX) * 0.0004});
								filter: 
									brightness({2 + Math.abs(mouseVelocityX) * 0.001})
									blur({Math.max(0.1 - Math.abs(mouseVelocityX) * 0.0008, 0)}px)
									drop-shadow(0 0 {Math.abs(mouseVelocityX) * 0.02}px {element.color}CC);
								border-radius: 1px;
								border: 0.5px solid {element.color}EE;
							"
						></div>
					{/if}
					
					<!-- Matrix impact ripples -->
					{#if element.id % 5 === 0}
						<div
							class="absolute animate-matrix-rainfall-splash"
							style="
								left: {element.x + Math.random() * 12}%;
								top: {92 + Math.random() * 6}%;
								width: {8 + Math.random() * 12}px;
								height: {3 + Math.random() * 4}px;
								--animation-delay: {element.delay + Math.random() * 2.5}s;
								animation-duration: {1.5 + Math.random() * 1}s;
								background: radial-gradient(
									ellipse, 
									{element.color}AA 0%, 
									{element.color}88 25%, 
									{element.color}66 50%, 
									{element.color}44 75%, 
									transparent 90%
								);
								opacity: {0.6 + Math.random() * 0.4};
								border-radius: 50%;
								filter: 
									blur({0.15 + Math.random() * 0.2}px)
									drop-shadow(0 0 {2 + Math.random() * 2}px {element.color}80);
								border: 0.5px solid {element.color}66;
							"
						></div>
					{/if}
					
					<!-- Matrix data accumulation streams -->
					{#if element.id % 8 === 0}
						<div
							class="absolute animate-matrix-rainfall-accumulation"
							style="
								left: {element.x + Math.random() * 15}%;
								top: {90 + Math.random() * 8}%;
								width: {12 + Math.random() * 18}px;
								height: {2 + Math.random() * 3}px;
								--animation-delay: {element.delay + Math.random() * 4}s;
								animation-duration: {4 + Math.random() * 3}s;
								background: linear-gradient(
									90deg, 
									transparent 0%, 
									{element.color}50 15%, 
									{element.color}80 30%, 
									{element.color}90 50%, 
									{element.color}80 70%, 
									{element.color}50 85%, 
									transparent 100%
								);
								opacity: {0.4 + Math.random() * 0.3};
								border-radius: 1px;
								filter: 
									blur({0.2 + Math.random() * 0.15}px)
									drop-shadow(0 0 {1.5}px {element.color}70);
								border: 0.5px solid {element.color}60;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.COSMIC}
				{#each animationElements as element (element.id)}
					<!-- Enhanced cosmic star with refined aesthetic and minimal interaction -->
					<div
						class="absolute animate-cosmic-stellar mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.2 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 0.8 * element.speed : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.008, 0.5) : 0)}px;
							height: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.008, 0.5) : 0)}px;
							background: radial-gradient(
								circle, 
								{element.color}40 0%, 
								{element.color}20 40%, 
								{element.color}08 70%, 
								transparent 100%
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration * 3 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.001, 0.2) : 0), 2)}s;
							opacity: {Math.min(element.opacity * 0.6 + (isMouseActive ? 0.02 : 0), 0.8)};
							border-radius: 50%;
							transform-origin: center;
							transform: 
								rotate({element.id * 20 + (isMouseActive ? mouseVelocityX * 0.02 : 0)}deg)
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0001, 0.02) : 0)});
							box-shadow: 
								0 0 {element.size}px {element.color}20,
								0 0 {element.size * 2}px {element.color}10,
								0 0 {element.size * 3}px {element.color}05;
							filter: 
								brightness({1 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0001 : 0)})
								saturate({1.1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00002 : 0)});
							transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Refined cosmic nebula wisps -->
					{#if element.id % 3 === 0}
						<div
							class="absolute animate-cosmic-nebula"
							style="
								left: {element.x + 15 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 5 : 0)}%;
								top: {element.y - 10 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 3 : 0)}%;
								width: {element.size * 2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.08 : 0)}px;
								height: {element.size * 0.6 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.04 : 0)}px;
								background: linear-gradient(
									{45 + (isMouseActive ? Math.sin(mouseVelocityX * 0.005) * 30 : 0)}deg, 
									transparent 0%, 
									{element.color}12 30%, 
									{element.color}20 50%, 
									{element.color}12 70%, 
									transparent 100%
								);
								animation-delay: {element.delay + 0.8}s;
								animation-duration: {element.duration * 4}s;
								opacity: {Math.min(element.opacity * 0.4 + (isMouseActive ? 0.1 : 0), 0.5)};
								border-radius: 50% 20% 50% 20%;
								transform: 
									rotate({element.id * 10 + (isMouseActive ? mouseVelocityX * 0.1 : 0)}deg)
									scale({0.9 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.002 : 0)});
								filter: 
									blur({1.5 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.008 : 0)}px)
									brightness({1.05 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.002 : 0)});
								transition: all 0.5s ease-out;
							"
						></div>
					{/if}
					
					<!-- Subtle cosmic stardust trails -->
					{#if element.id % 5 === 0}
						<div
							class="absolute animate-cosmic-stardust"
							style="
								left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.5 : 0)}%;
								width: {element.size * 0.25 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.008 : 0)}px;
								height: {element.size * 0.25 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.008 : 0)}px;
								background: {element.color}30;
								animation-delay: {element.delay + 2}s;
								animation-duration: {element.duration * 2.5}s;
								opacity: {Math.min(element.opacity * 0.5 + (isMouseActive ? 0.15 : 0), 0.7)};
								border-radius: 50%;
								box-shadow: 
									0 0 {element.size * 0.5}px {element.color}15,
									0 0 {element.size}px {element.color}08;
								filter: brightness({1.02 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0003 : 0)});
								transition: all 0.6s ease-out;
							"
						></div>
					{/if}
					
					<!-- MINIMAL COSMIC CURSOR ANIMATIONS: Elegant and Subtle -->
					
					<!-- Gentle Cosmic Sparkle - Only on movement -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 10 && element.id % 10 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.15 + 3, 6)}px;
								height: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.15 + 3, 6)}px;
								background: radial-gradient(
									circle, 
									{element.color}20 0%, 
									{element.color}08 40%, 
									transparent 80%
								);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.002, 0.15)};
								border-radius: 50%;
								transform: 
									translate(-50%, -50%) 
									scale({0.3 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.004});
								animation: gentle-cosmic-sparkle 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
								filter: blur(0.2px);
							"
						></div>
					{/if}
					
					<!-- Subtle Cosmic Trail - Minimal stardust -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 20 && element.id % 15 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.08 + 2, 4)}px;
								height: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.08 + 2, 4)}px;
								background: {element.color}10;
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.001, 0.1)};
								border-radius: 50%;
								transform: 
									translate(-50%, -50%) 
									scale({0.2 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.002});
								animation: minimal-cosmic-dust 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
								filter: blur(0.1px);
							"
						></div>
					{/if}
					
					<!-- Cosmic gravitational lensing effect -->
					{#if element.id % 7 === 0}
						<div
							class="absolute animate-cosmic-lens"
							style="
								left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 4 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 3 : 0)}%;
								width: {element.size * 3}px;
								height: {element.size * 3}px;
								background: transparent;
								border: 1px solid {element.color}20;
								border-radius: 50%;
								animation-delay: {element.delay + 2}s;
								animation-duration: {element.duration * 4}s;
								opacity: {element.opacity * 0.3 + (isMouseActive ? 0.1 : 0)};
								transform: scale({0.8 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0005 : 0)});
								box-shadow: 
									inset 0 0 {element.size}px {element.color}10,
									0 0 {element.size * 2}px {element.color}05;
								transition: all 0.6s ease-out;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.PARTICLES}
				{#each animationElements as element (element.id)}
					<!-- Enhanced primary particle with sophisticated glow and physics - NO CONNECTION LINES -->
					<div
						class="absolute animate-particle-physics mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 16 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 12 * element.speed : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.012, 6) : 0)}px;
							height: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.012, 6) : 0)}px;
							background: radial-gradient(
								circle, 
								{element.color} 0%, 
								{element.color}CC 40%, 
								{element.color}60 70%, 
								transparent 100%
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.008, 2) : 0), 0.8)}s;
							opacity: {Math.min(element.opacity + (isMouseActive ? 0.4 : 0), 1)};
							border-radius: 50%;
							transform-origin: center;
							transform: 
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.003, 0.5) : 0)})
								rotate({element.id * 45 + (isMouseActive ? mouseVelocityX * 0.3 : 0)}deg);
							box-shadow: 
								0 0 {element.size * 3}px {element.color}80,
								0 0 {element.size * 6}px {element.color}40,
								0 0 {element.size * 9}px {element.color}20,
								inset 0 0 {element.size / 3}px {element.color}60;
							filter: 
								brightness({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0002, 0.1) : 0)})
								contrast({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00005 : 0)})
								saturate({1.05 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00003 : 0)});
							transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
						"
					></div>
					
					<!-- Enhanced mouse attraction particles -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 8 && element.id % 6 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.abs(mouseVelocityX + mouseVelocityY) * 0.03 + 6}px;
								height: {Math.abs(mouseVelocityX + mouseVelocityY) * 0.03 + 6}px;
								background: radial-gradient(
									circle, 
									{element.color} 0%, 
									{element.color}AA 50%, 
									transparent 100%
								);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0025, 0.9)};
								border-radius: 50%;
								transform: 
									translate(-50%, -50%) 
									scale({0.3 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.001});
								animation: particle-physics 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
								box-shadow: 
									0 0 {Math.abs(mouseVelocityX + mouseVelocityY) * 0.04}px {element.color},
									0 0 {Math.abs(mouseVelocityX + mouseVelocityY) * 0.08}px {element.color}60;
								filter: brightness({1.3 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.0005});
							"
						></div>
					{/if}
					
					<!-- Particle quantum tunneling effect -->
					{#if element.id % 8 === 0}
						<div
							class="absolute animate-particle-quantum"
							style="
								left: {element.x + 20 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 5 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 4 : 0)}%;
								width: {element.size * 0.8}px;
								height: {element.size * 0.8}px;
								background: {element.color};
								animation-delay: {element.delay + 3}s;
								animation-duration: {element.duration * 3}s;
								opacity: {Math.min(element.opacity * 0.6 + (isMouseActive ? 0.15 : 0), 0.8)};
								border-radius: 50%;
								transform: scale({0.9 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0008 : 0)});
								box-shadow: 
									0 0 {element.size * 2}px {element.color}50,
									0 0 {element.size * 4}px {element.color}25;
								filter: 
									blur({0.5 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.001 : 0)}px)
									brightness({1.1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0005 : 0)});
								transition: all 0.3s ease-out;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.WAVES}
				{#each animationElements as element (element.id)}
					<!-- Elegant fluid wave with minimal mouse response -->
					<div
						class="absolute animate-wave-motion mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 3 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.5 * Math.sin(Date.now() * 0.0008 + element.id * 0.3) : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.04, 2) : 0)}px;
							height: {element.size / 3 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.02, 1) : 0)}px;
							background: linear-gradient(
								{isMouseActive ? 90 + Math.sin(mouseVelocityX * 0.002) * 8 : 90}deg, 
								transparent 0%, 
								{element.color}20 10%, 
								{element.color}80 25%, 
								{element.color} 50%, 
								{element.color}80 75%, 
								{element.color}20 90%, 
								transparent 100%
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration - (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.0002, 0.3) : 0), 0.8)}s;
							opacity: {Math.min(element.opacity + (isMouseActive ? 0.08 : 0), 0.9)};
							transform-origin: center;
							transform: 
								rotate({isMouseActive ? Math.sin(mouseVelocityX * 0.002) * 0.5 : 0}deg)
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.00003, 0.05) : 0)});
							filter: 
								blur({Math.max(0.6 - (isMouseActive ? Math.abs(mouseVelocityX) * 0.0002 : 0), 0.1)}px)
								brightness({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.00008, 0.06) : 0)});
							border-radius: {element.size / 4}px;
							box-shadow: 
								0 0 {element.size / 3}px {element.color}50,
								0 0 {element.size / 1.5}px {element.color}25,
								0 0 {element.size}px {element.color}10;
							transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Enhanced wave ripples with fluid motion -->
					{#if element.id % 4 === 0}
						<div
							class="absolute animate-wave-ripple"
							style="
								left: {element.x + 15 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 18 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 9 * Math.cos(Date.now() * 0.0008 + element.id) : 0)}%;							width: {element.size * 2.5 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.08, 5) : 0)}px;
							height: {element.size / 6 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.015, 1) : 0)}px;
							background: linear-gradient(
								{isMouseActive ? 90 + Math.cos(mouseVelocityX * 0.003) * 15 : 90}deg, 
								transparent 0%, 
								{element.color}70 30%, 
								{element.color}40 70%, 
								transparent 100%
							);
							animation-delay: {element.delay + 0.3}s;
							animation-duration: {element.duration * 1.8}s;
							opacity: {Math.min(element.opacity * 0.7 + (isMouseActive ? 0.1 : 0), 0.9)};
								border-radius: {element.size / 3}px;
								transform: 
									rotate({isMouseActive ? Math.cos(mouseVelocityY * 0.01) * 10 : 0}deg)
									scaleX({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.003, 0.4) : 0)});
								filter: blur({Math.max(1.2 - (isMouseActive ? Math.abs(mouseVelocityX) * 0.02 : 0), 0.2)}px);
								transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
							"
						></div>
					{/if}
					
					<!-- MINIMAL WAVE CURSOR ANIMATIONS: Gentle and Aesthetic -->
					
					<!-- Subtle Wave Ripples - Only appears on gentle movement -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 8 && element.id % 8 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.6 + 12, 30)}px;
								height: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.6 + 12, 30)}px;
								background: radial-gradient(
									circle,
									transparent 20%,
									{element.color}08 40%,
									transparent 60%,
									{element.color}04 80%,
									transparent 100%
								);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.003, 0.3)};
								border-radius: 50%;
								transform: translate(-50%, -50%) scale({0.5 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.008});
								animation: minimal-wave-ripple 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
								filter: blur(0.5px);
							"
						></div>
					{/if}
					
					<!-- Gentle Wave Trail - Minimal particles -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 15 && element.id % 12 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.2 + 4, 8)}px;
								height: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.2 + 4, 8)}px;
								background: radial-gradient(
									circle,
									{element.color}12 0%,
									{element.color}06 50%,
									transparent 100%
								);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.002, 0.2)};
								border-radius: 50%;
								transform: translate(-50%, -50%) scale({0.5 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.003});
								animation: gentle-wave-drift 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
								filter: blur(0.3px);
							"
						></div>
					{/if}
					
					<!-- Ambient wave glow effects -->
					{#if element.id % 10 === 0}
						<div
							class="absolute pointer-events-none animate-wave-glow"
							style="
								left: {element.x + (isMouseActive ? (mouseVelocityX / 0.5) * 10 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseVelocityY / 0.5) * 5 : 0)}%;
								width: {element.size * 3}px;
								height: {element.size / 2}px;
								background: radial-gradient(
									ellipse, 
									{element.color}30 0%, 
									{element.color}15 40%, 
									transparent 70%
								);
								animation-delay: {element.delay + 1}s;
								animation-duration: {element.duration * 2.5}s;
								opacity: {element.opacity * 0.4 + (isMouseActive ? 0.2 : 0)};
								border-radius: 50%;
								filter: blur({2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.02 : 0)}px);
								transition: all 0.3s ease-out;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.GEOMETRIC}
				{#each animationElements as element (element.id)}
					<!-- Elegant geometric shape with minimal mouse response -->
					<div
						class="absolute animate-geometric-spin mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.5 : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.2 : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.003, 1.5) : 0)}px;
							height: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.003, 1.5) : 0)}px;
							background: linear-gradient(
								{element.id * 45 + (isMouseActive ? mouseVelocityX * 0.002 : 0)}deg, 
								{element.color} 0%, 
								{element.color}CC 40%, 
								{element.color}88 70%, 
								{element.color}40 100%
							);
							clip-path: {
								element.id % 4 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
								element.id % 4 === 1 ? 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' :
								element.id % 4 === 2 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
								'polygon(50% 0%, 85% 25%, 100% 50%, 85% 75%, 50% 100%, 15% 75%, 0% 50%, 15% 25%)'
							};
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration - (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0), 2)}s;
							opacity: {Math.min(element.opacity * 0.8 + (isMouseActive ? 0.02 : 0), 0.9)};
							transform-origin: center;
							transform: 
								rotate({element.id * 15 + (isMouseActive ? mouseVelocityX * 0.001 : 0)}deg)
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.00003, 0.05) : 0)});
							filter: 
								drop-shadow(0 0 {element.size / 4}px {element.color}40)
								brightness({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00004 : 0)})
								saturate({1.1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00002 : 0)});
							transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Subtle geometric outline -->
					{#if element.id % 3 === 0}
						<div
							class="absolute animate-geometric-orbit"
							style="
								left: {element.x + 2 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 0.8 : 0)}%;
								top: {element.y + 2 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 0.6 : 0)}%;
								width: {element.size * 1.2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.01 : 0)}px;
								height: {element.size * 1.2 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.01 : 0)}px;
								background: transparent;
								border: {1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.002 : 0)}px solid {element.color}30;
								clip-path: {
									element.id % 4 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
									element.id % 4 === 1 ? 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' :
									element.id % 4 === 2 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
									'polygon(50% 0%, 85% 25%, 100% 50%, 85% 75%, 50% 100%, 15% 75%, 0% 50%, 15% 25%)'
								};
								animation-delay: {element.delay + 0.8}s;
								animation-duration: {element.duration * 2}s;
								opacity: {element.opacity * 0.4 + (isMouseActive ? 0.01 : 0)};
								transform: 
									rotate({-element.id * 8 + (isMouseActive ? -mouseVelocityX * 0.0002 : 0)}deg)
									scale({0.95 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.000003 : 0)});
								filter: blur({0.3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0002 : 0)}px);
								transition: all 0.4s ease-out;
							"
						></div>
					{/if}
					
					<!-- Minimal mouse-triggered particles (higher threshold) -->
					{#if isMouseActive && Math.abs(mouseVelocityX) > 40 && element.id % 12 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.abs(mouseVelocityX) * 0.006 + 3}px;
								height: {Math.abs(mouseVelocityX) * 0.006 + 3}px;
								background: {element.color}80;
								clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
								opacity: {Math.min(Math.abs(mouseVelocityX) * 0.002, 0.4)};
								transform: 
									translate(-50%, -50%) 
									rotate({mouseVelocityX * 0.2}deg)
									scale({0.5 + Math.abs(mouseVelocityX) * 0.001});
								animation: geometric-burst 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
								filter: 
									drop-shadow(0 0 {Math.abs(mouseVelocityX) * 0.02}px {element.color})
									brightness({1.1 + Math.abs(mouseVelocityX) * 0.0005});
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.GRADIENT}
				{#each animationElements as element (element.id)}
					<!-- Enhanced gradient morphing orb with dynamic color transitions -->
					<div
						class="absolute animate-gradient-morph mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2.5 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.8 * Math.sin(Date.now() * 0.001 + element.id) : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.015, 8) : 0)}px;
							height: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.015, 8) : 0)}px;
							background: radial-gradient(
								circle, 
								{element.color} 0%, 
								{element.color}E6 25%, 
								{element.color}CC 50%, 
								{element.color}80 75%, 
								transparent 100%
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration * 1.5 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.001, 0.8) : 0), 2)}s;
							opacity: {Math.min(element.opacity * 0.8 + (isMouseActive ? 0.025 : 0), 0.9)};
							border-radius: 50%;
							transform-origin: center;
							transform: 
								rotate({element.id * 15 + (isMouseActive ? mouseVelocityX * 0.008 : 0)}deg)
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0002, 0.15) : 0)});
							box-shadow: 
								0 0 {element.size}px {element.color}40,
								0 0 {element.size * 2}px {element.color}25,
								0 0 {element.size * 3}px {element.color}15;
							filter: 
								brightness({1.2 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0001 : 0)})
								saturate({1.4 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00003 : 0)})
								blur({0.5 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.002, 0.3) : 0)}px);
							transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Dynamic gradient flow streamers -->
					{#if element.id % 3 === 0}
						<div
							class="absolute animate-gradient-flow"
							style="
								left: {element.x + 2 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.5 : 0)}%;
								top: {element.y - 10 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 0.8 : 0)}%;
								width: {element.size * 2.5 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.02 : 0)}px;
								height: {element.size / 2 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.01 : 0)}px;
								background: linear-gradient(
									{element.id * 30 + (isMouseActive ? mouseVelocityX * 0.005 : 0)}deg, 
									transparent 0%, 
									{element.color}60 20%, 
									{element.color}90 50%, 
									{element.color}60 80%, 
									transparent 100%
								);
								animation-delay: {element.delay + 0.5}s;
								animation-duration: {element.duration * 2.2}s;
								opacity: {element.opacity * 0.6 + (isMouseActive ? 0.02 : 0)};
								border-radius: 8px;
								transform: 
									rotate({element.id * 20 + (isMouseActive ? mouseVelocityX * 0.003 : 0)}deg)
									scaleX({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0008 : 0)});
								filter: 
									blur({1 + (isMouseActive ? -Math.abs(mouseVelocityX) * 0.008 : 0)}px)
									brightness({1.1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0)});
								transition: all 0.3s ease-out;
							"
						></div>
					{/if}
					
					<!-- Gradient color particles with interactive dispersion -->
					{#if element.id % 5 === 0}
						<div
							class="absolute animate-gradient-particle"
							style="
								left: {element.x + Math.random() * 10 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 3 : 0)}%;
								top: {element.y + Math.random() * 10 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 2 : 0)}%;
								width: {element.size * 0.4}px;
								height: {element.size * 0.4}px;
								background: radial-gradient(
									circle, 
									{element.color} 0%, 
									{element.color}CC 40%, 
									transparent 80%
								);
								animation-delay: {element.delay + Math.random() * 2}s;
								animation-duration: {element.duration * 3}s;
								opacity: {element.opacity * 0.5 + (isMouseActive ? 0.015 : 0)};
								border-radius: 50%;
								transform: 
									scale({0.8 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0005 : 0)})
									translate({(isMouseActive ? mouseVelocityX * 0.02 : 0)}px, {(isMouseActive ? mouseVelocityY * 0.02 : 0)}px);
								filter: 
									brightness({1.3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0)})
									blur({0.2 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.001 : 0)}px);
								transition: all 0.2s ease-out;
							"
						></div>
					{/if}
					
					<!-- Gradient mouse interaction effects -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 12 && element.id % 8 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {(mouseX / innerWidth) * 100}%;
								top: {(mouseY / innerHeight) * 100}%;
								width: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.8 + 15, 40)}px;
								height: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.8 + 15, 40)}px;
								background: conic-gradient(
									from {mouseVelocityX * 0.05}deg,
									{element.color}50 0deg,
									{element.color}80 60deg,
									{element.color}60 120deg,
									{element.color}90 180deg,
									{element.color}70 240deg,
									{element.color}50 300deg,
									{element.color}50 360deg
								);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.003, 0.4)};
								border-radius: 50%;
								transform: 
									translate(-50%, -50%) 
									scale({0.6 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.006})
									rotate({mouseVelocityX * 0.1}deg);
								animation: gradient-ripple 2.5s ease-out forwards;
								filter: blur(1px);
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.NEURAL}
				{#each animationElements as element (element.id)}
					<!-- Neural network node with synaptic connections -->
					<div
						class="absolute animate-neural-pulse-enhanced mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.8 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.2 : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.012, 4) : 0)}px;
							height: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.012, 4) : 0)}px;
							background: radial-gradient(
								circle, 
								{element.color} 0%, 
								{element.color}DD 30%, 
								{element.color}AA 60%, 
								{element.color}60 80%, 
								transparent 100%
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration * 2 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0008, 1) : 0), 1.5)}s;
							opacity: {Math.min(element.opacity * 0.7 + (isMouseActive ? 0.03 : 0), 0.85)};
							border-radius: 50%;
							transform: 
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0003, 0.08) : 0)});
							box-shadow: 
								0 0 {element.size * 0.8}px {element.color}50,
								0 0 {element.size * 1.5}px {element.color}30,
								0 0 {element.size * 2.5}px {element.color}15;
							filter: 
								brightness({1.1 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.00008 : 0)})
								contrast({1.2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00005 : 0)});
							transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Neural connection lines between nodes -->
					{#if element.id % 2 === 0 && element.id < animationElements.length - 1}
						<div
							class="absolute animate-neural-connection-flow"
							style="
								left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 0.8 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 0.5 : 0)}%;
								width: {Math.abs(animationElements[element.id + 1].x - element.x) * 0.8}%;
								height: 2px;
								background: linear-gradient(
									90deg, 
									transparent 0%, 
									{element.color}80 20%, 
									{element.color} 50%, 
									{element.color}80 80%, 
									transparent 100%
								);
								animation-delay: {element.delay + 0.3}s;
								animation-duration: {element.duration * 1.8}s;
								opacity: {element.opacity * 0.4 + (isMouseActive ? 0.02 : 0)};
								transform-origin: left center;
								transform: 
									rotate({Math.atan2(animationElements[element.id + 1].y - element.y, animationElements[element.id + 1].x - element.x) * 180 / Math.PI}deg)
									scaleX({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0005 : 0)});
								filter: 
									blur({0.5 - (isMouseActive ? Math.abs(mouseVelocityX) * 0.005 : 0)}px)
									brightness({1.2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0)});
								transition: all 0.25s ease-out;
							"
						></div>
					{/if}
					
					<!-- Neural data flow packets -->
					{#if element.id % 4 === 0}
						<div
							class="absolute animate-neural-data-flow"
							style="
								left: {element.x + 2 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2 : 0)}%;
								top: {element.y + 2 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.5 : 0)}%;
								width: {element.size * 0.3}px;
								height: {element.size * 0.3}px;
								background: radial-gradient(
									circle, 
									{element.color} 0%, 
									{element.color}EE 50%, 
									transparent 80%
								);
								animation-delay: {element.delay + Math.random() * 1.5}s;
								animation-duration: {element.duration * 1.2}s;
								opacity: {element.opacity * 0.6 + (isMouseActive ? 0.025 : 0)};
								border-radius: 50%;
								transform: 
									scale({0.9 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0008 : 0)});
								filter: 
									brightness({1.4 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0)})
									blur({0.1 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.002 : 0)}px);
								transition: all 0.2s ease-out;
							"
						></div>
					{/if}
					
					<!-- Neural synapse flashes on interaction -->
					{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 10 && element.id % 6 === 0}
						<div
							class="absolute pointer-events-none"
							style="
								left: {element.x + (mouseX / innerWidth - 0.5) * 4}%;
								top: {element.y + (mouseY / innerHeight - 0.5) * 3}%;
								width: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.5 + 8, 25)}px;
								height: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.5 + 8, 25)}px;
								background: radial-gradient(
									circle,
									{element.color} 0%,
									{element.color}CC 30%,
									{element.color}80 60%,
									transparent 90%
								);
								opacity: {Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.004, 0.6)};
								border-radius: 50%;
								transform: 
									translate(-50%, -50%) 
									scale({0.4 + Math.abs(mouseVelocityX + mouseVelocityY) * 0.008});
								animation: neural-synapse-flash 1.5s ease-out forwards;
								filter: 
									brightness({1.8 + Math.abs(mouseVelocityX) * 0.002})
									blur(0.5px);
							"
						></div>
					{/if}
					
					<!-- Neural network cluster connections -->
					{#if element.id % 7 === 0}
						<div
							class="absolute animate-neural-cluster-flow"
							style="
								left: {element.x - 5}%;
								top: {element.y - 5}%;
								width: {element.size * 3}px;
								height: {element.size * 3}px;
								background: conic-gradient(
									from {element.id * 51.43}deg,
									transparent 0deg,
									{element.color}20 45deg,
									transparent 90deg,
									{element.color}30 135deg,
									transparent 180deg,
									{element.color}25 225deg,
									transparent 270deg,
									{element.color}20 315deg,
									transparent 360deg
								);
								animation-delay: {element.delay + 1}s;
								animation-duration: {element.duration * 4}s;
								opacity: {element.opacity * 0.3 + (isMouseActive ? 0.015 : 0)};
								border-radius: 50%;
								transform: 
									rotate({element.id * 10 + (isMouseActive ? mouseVelocityX * 0.002 : 0)}deg)
									scale({0.8 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0002 : 0)});
								filter: 
									blur({2 - (isMouseActive ? Math.abs(mouseVelocityX) * 0.01 : 0)}px)
									brightness({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.00008 : 0)});
								transition: all 0.4s ease-out;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.CRYSTALLINE}
				{#each animationElements as element (element.id)}
					<!-- Crystalline structure with prismatic effects -->
					<div
						class="absolute animate-crystal-refraction mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.5 * element.speed : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.01, 2) : 0)}px;
							height: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.01, 2) : 0)}px;
							background: conic-gradient(
								from {element.id * 60}deg at 50% 50%,
								{element.color}40 0deg,
								{element.color}80 60deg,
								{element.color}60 120deg,
								{element.color}90 180deg,
								{element.color}50 240deg,
								{element.color}70 300deg,
								{element.color}40 360deg
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration * 2.5 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.001, 0.5) : 0), 2)}s;
							opacity: {Math.min(element.opacity * 0.8 + (isMouseActive ? 0.05 : 0), 0.9)};
							clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
							transform: 
								rotate({element.id * 30 + (isMouseActive ? mouseVelocityX * 0.15 : 0)}deg)
								scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0005, 0.1) : 0)});
							box-shadow: 
								0 0 {element.size * 0.5}px {element.color}60,
								0 0 {element.size}px {element.color}40,
								0 0 {element.size * 2}px {element.color}20,
								inset 0 0 {element.size * 0.3}px {element.color}30;
							filter: 
								brightness({1.2 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0002 : 0)})
								contrast(1.3)
								hue-rotate({element.id * 10 + (isMouseActive ? mouseVelocityX * 0.5 : 0)}deg);
							transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Crystal facet reflections -->
					{#if element.id % 3 === 0}
						<div
							class="absolute animate-crystal-facet"
							style="
								left: {element.x + 8 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 3 : 0)}%;
								top: {element.y - 5 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 2 : 0)}%;
								width: {element.size * 1.5}px;
								height: {element.size * 0.8}px;
								background: linear-gradient(
									{120 + element.id * 15}deg,
									transparent 0%,
									{element.color}20 25%,
									{element.color}60 50%,
									{element.color}20 75%,
									transparent 100%
								);
								animation-delay: {element.delay + 0.5}s;
								animation-duration: {element.duration * 3}s;
								opacity: {Math.min(element.opacity * 0.6 + (isMouseActive ? 0.1 : 0), 0.7)};
								clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
								transform: 
									rotate({element.id * 45 + (isMouseActive ? mouseVelocityX * 0.2 : 0)}deg)
									scale({0.8 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.003 : 0)});
								filter: 
									blur({0.5 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.01 : 0)}px)
									brightness({1.5 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0003 : 0)});
								transition: all 0.5s ease-out;
							"
						></div>
					{/if}
					
					<!-- Prismatic light rays -->
					{#if element.id % 4 === 0}
						<div
							class="absolute animate-crystal-prism"
							style="
								left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 1.5 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1 : 0)}%;
								width: {element.size * 0.3}px;
								height: {element.size * 4}px;
								background: linear-gradient(
									180deg,
									transparent 0%,
									{element.color}40 20%,
									{element.color}80 50%,
									{element.color}40 80%,
									transparent 100%
								);
								animation-delay: {element.delay + 1}s;
								animation-duration: {element.duration * 2}s;
								opacity: {Math.min(element.opacity * 0.5 + (isMouseActive ? 0.15 : 0), 0.6)};
								transform: 
									rotate({element.id * 20 + (isMouseActive ? mouseVelocityX * 0.1 : 0)}deg)
									scaleY({0.7 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.004 : 0)});
								filter: 
									blur({0.2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.005 : 0)}px)
									brightness({1.3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0002 : 0)});
								transition: all 0.3s ease-out;
							"
						></div>
					{/if}
					
					<!-- Crystal formations -->
					{#if element.id % 6 === 0}
						<div
							class="absolute animate-crystal-formation"
							style="
								left: {element.x - 3 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2.5 : 0)}%;
								top: {element.y - 3 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 2 : 0)}%;
								width: {element.size * 2}px;
								height: {element.size * 2}px;
								background: radial-gradient(
									ellipse at 30% 30%,
									{element.color}30 0%,
									{element.color}60 25%,
									{element.color}40 50%,
									{element.color}20 75%,
									transparent 100%
								);
								animation-delay: {element.delay + 2}s;
								animation-duration: {element.duration * 4}s;
								opacity: {Math.min(element.opacity * 0.4 + (isMouseActive ? 0.08 : 0), 0.5)};
								clip-path: polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%);
								transform: 
									rotate({element.id * 90 + (isMouseActive ? mouseVelocityX * 0.05 : 0)}deg)
									scale({0.6 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0008 : 0)});
								filter: 
									brightness({1.1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0)})
									saturate(1.5);
								transition: all 0.6s ease-out;
							"
						></div>
					{/if}
				{/each}
				
			{:else if currentMode === HOME_MODES.AURORA}
				{#each animationElements as element (element.id)}
					<!-- Aurora borealis streams -->
					<div
						class="absolute animate-aurora-flow mouse-interactive"
						style="
							left: {element.x + (isMouseActive ? (mouseX / innerWidth - 0.5) * 3 * element.speed : 0)}%;
							top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 2 * Math.sin(Date.now() * 0.001 + element.id) : 0)}%;
							width: {element.size + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.02, 5) : 0)}px;
							height: {element.size * 6 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.1, 20) : 0)}px;
							background: linear-gradient(
								{180 + element.id * 10 + (isMouseActive ? mouseVelocityX * 0.3 : 0)}deg,
								transparent 0%,
								{element.color}20 15%,
								{element.color}60 35%,
								{element.color}90 50%,
								{element.color}60 65%,
								{element.color}20 85%,
								transparent 100%
							);
							animation-delay: {element.delay}s;
							animation-duration: {Math.max(element.duration * 4 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.002, 1) : 0), 3)}s;
							opacity: {Math.min(element.opacity * 0.7 + (isMouseActive ? 0.1 : 0), 0.8)};
							border-radius: 50% 50% 0% 0%;
							transform: 
								rotate({element.id * 5 + (isMouseActive ? mouseVelocityX * 0.05 : 0)}deg)
								scaleX({0.8 + Math.sin(Date.now() * 0.001 + element.id) * 0.3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.002 : 0)})
								scaleY({1 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.005 : 0)});
							filter: 
								blur({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.02 : 0)}px)
								brightness({1.1 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.0003 : 0)})
								contrast(1.2);
							transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
						"
					></div>
					
					<!-- Aurora curtain waves -->
					{#if element.id % 2 === 0}
						<div
							class="absolute animate-aurora-curtain"
							style="
								left: {element.x - 10 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 4 : 0)}%;
								top: {element.y - 20 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 3 : 0)}%;
								width: {element.size * 8}px;
								height: {element.size * 12}px;
								background: radial-gradient(
									ellipse at 50% 0%,
									{element.color}30 0%,
									{element.color}50 20%,
									{element.color}30 40%,
									{element.color}15 60%,
									{element.color}05 80%,
									transparent 100%
								);
								animation-delay: {element.delay + 0.8}s;
								animation-duration: {element.duration * 5}s;
								opacity: {Math.min(element.opacity * 0.5 + (isMouseActive ? 0.08 : 0), 0.6)};
								border-radius: 50% 50% 30% 30%;
								transform: 
									rotate({element.id * 3 + (isMouseActive ? mouseVelocityX * 0.02 : 0)}deg)
									scaleX({0.6 + Math.sin(Date.now() * 0.0008 + element.id * 0.5) * 0.4 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.003 : 0)})
									scaleY({1 + Math.cos(Date.now() * 0.0006 + element.id * 0.3) * 0.2});
								filter: 
									blur({2 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.03 : 0)}px)
									brightness({1.05 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0002 : 0)});
								transition: all 0.8s ease-out;
							"
						></div>
					{/if}
					
					<!-- Aurora particle shimmer -->
					{#if element.id % 5 === 0}
						<div
							class="absolute animate-aurora-shimmer"
							style="
								left: {element.x + 5 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2 : 0)}%;
								top: {element.y + 10 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 1.5 : 0)}%;
								width: {element.size * 0.8}px;
								height: {element.size * 0.8}px;
								background: radial-gradient(
									circle,
									{element.color}80 0%,
									{element.color}60 30%,
									{element.color}40 60%,
									transparent 90%
								);
								animation-delay: {element.delay + Math.random() * 2}s;
								animation-duration: {element.duration * 1.5}s;
								opacity: {Math.min(element.opacity * 0.8 + (isMouseActive ? 0.12 : 0), 0.9)};
								border-radius: 50%;
								transform: 
									scale({0.5 + Math.sin(Date.now() * 0.002 + element.id) * 0.5 + (isMouseActive ? Math.abs(mouseVelocityX + mouseVelocityY) * 0.001 : 0)});
								box-shadow: 
									0 0 {element.size}px {element.color}40,
									0 0 {element.size * 2}px {element.color}20;
								filter: 
									brightness({1.3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0005 : 0)})
									blur({0.3 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.008 : 0)}px);
								transition: all 0.4s ease-out;
							"
						></div>
					{/if}
					
					<!-- Aurora magnetic field lines -->
					{#if element.id % 7 === 0}
						<div
							class="absolute animate-aurora-field"
							style="
								left: {element.x - 5 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 2.5 : 0)}%;
								top: {element.y + (isMouseActive ? (mouseY / innerHeight - 0.5) * 2 : 0)}%;
								width: {element.size * 10}px;
								height: {element.size * 0.5}px;
								background: linear-gradient(
									90deg,
									transparent 0%,
									{element.color}15 20%,
									{element.color}40 50%,
									{element.color}15 80%,
									transparent 100%
								);
								animation-delay: {element.delay + 1.5}s;
								animation-duration: {element.duration * 6}s;
								opacity: {Math.min(element.opacity * 0.3 + (isMouseActive ? 0.05 : 0), 0.4)};
								border-radius: 50px;
								transform: 
									rotate({element.id * 8 + Math.sin(Date.now() * 0.0005 + element.id) * 20 + (isMouseActive ? mouseVelocityX * 0.03 : 0)}deg)
									scaleX({1 + Math.sin(Date.now() * 0.0007 + element.id * 0.8) * 0.3});
								filter: 
									blur({0.8 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.015 : 0)}px)
									brightness({1.02 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0001 : 0)});
								transition: all 0.7s ease-out;
							"
						></div>
					{/if}
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
								<span class="text-sm opacity-70 group-hover:opacity-100">Modern Framework</span>
							</span>
							<div class="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						</Button>
					</div>

					<!-- Enhanced Quick Stats with dynamic values -->
					<div class="flex justify-center gap-8 mt-12 text-center">
						<div class="text-white/80 group hover:text-white transition-colors">
							<div class="text-2xl font-bold {config.primaryColor} group-hover:scale-110 transition-transform">{componentCount}+</div>
							<div class="text-sm">Components</div>
						</div>
						<div class="text-white/80 group hover:text-white transition-colors">
							<div class="text-2xl font-bold {config.secondaryColor} group-hover:scale-110 transition-transform">{Object.keys(HOME_MODES).length}</div>
							<div class="text-sm">Animations</div>
						</div>
						<div class="text-white/80 group hover:text-white transition-colors">
							<div class="text-2xl font-bold {config.primaryColor} group-hover:scale-110 transition-transform">100%</div>
							<div class="text-sm">TypeScript</div>
						</div>
						<div class="text-white/80 group hover:text-white transition-colors">
							<div class="text-2xl font-bold {config.secondaryColor} group-hover:scale-110 transition-transform">100%</div>
							<div class="text-sm">Svelte</div>
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
					
					<!-- Enhanced feature stats with dynamic values -->
					<div class="flex justify-center gap-8 mt-8">
						<div class="text-center group hover:scale-105 transition-transform">
							<div class="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">{Object.keys(HOME_MODES).length}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Animation Modes</div>
						</div>
						<div class="text-center group hover:scale-105 transition-transform">
							<div class="text-3xl font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">{componentCount}+</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">UI Components</div>
						</div>
						<div class="text-center group hover:scale-105 transition-transform">
							<div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">∞</div>
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

	<!-- Enhanced Call-to-Action Section with Mouse-Responsive Dynamic Background -->
	<section class="relative py-32 px-4 bg-gradient-to-br {config.backgroundGradient} text-white overflow-hidden">
		<!-- Enhanced Mouse-Responsive Background Animation -->
		<div class="absolute inset-0 opacity-30">
			<!-- Primary floating elements with mouse interaction -->
			<div 
				class="absolute animate-float blur-xl transition-all duration-300"
				style="
					top: {80 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 40 : 0)}px;
					left: {80 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 60 : 0)}px;
					width: {160 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.5, 40) : 0)}px;
					height: {160 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.05, 40) : 0)}px;
					background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 60%, transparent 100%);
					border-radius: 50%;
					filter: blur({16 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.01, 8) : 0)}px)
							brightness({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.0003 : 0)});
				"
			></div>
			
			<div 
				class="absolute animate-float blur-xl transition-all duration-500"
				style="
					bottom: {80 + (isMouseActive ? (mouseY / innerHeight - 0.5) * -30 : 0)}px;
					right: {80 + (isMouseActive ? (mouseX / innerWidth - 0.5) * -50 : 0)}px;
					width: {128 + (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.4, 30) : 0)}px;
					height: {128 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.4, 30) : 0)}px;
					background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 60%, transparent 100%);
					border-radius: 50%;
					animation-delay: 1s;
					filter: blur({16 - (isMouseActive ? Math.min(Math.abs(mouseVelocityY) * 0.08, 6) : 0)}px);
				"
			></div>
			
			<div 
				class="absolute animate-pulse-slow blur-2xl transition-all duration-700"
				style="
					top: 50%;
					left: 50%;
					transform: translate(
						{-50 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 20 : 0)}%, 
						{-50 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 15 : 0)}%
					) 
					scale({1 + (isMouseActive ? Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0002, 0.3) : 0)});
					width: {224 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.08 : 0)}px;
					height: {224 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.08 : 0)}px;
					background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, transparent 80%);
					border-radius: 50%;
					filter: blur({32 - (isMouseActive ? Math.min(Math.abs(mouseVelocityX) * 0.15, 12) : 0)}px)
							brightness({1 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.002 : 0)});
				"
			></div>
			
			<div 
				class="absolute animate-bounce-slow blur-lg transition-all duration-400"
				style="
					top: {160 + (isMouseActive ? (mouseY / innerHeight - 0.5) * 25 : 0)}px;
					right: {33.33 + (isMouseActive ? (mouseX / innerWidth - 0.5) * 15 : 0)}%;
					width: {96 + (isMouseActive ? Math.abs(mouseVelocityX) * 0.3 : 0)}px;
					height: {96 + (isMouseActive ? Math.abs(mouseVelocityY) * 0.3 : 0)}px;
					background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 70%, transparent 100%);
					border-radius: 50%;
					animation-delay: 2s;
					filter: blur({16 - (isMouseActive ? Math.abs(mouseVelocityY) * 0.08 : 0)}px);
				"
			></div>
			
			<!-- Mouse-triggered ambient effects -->
			{#if isMouseActive && Math.abs(mouseVelocityX + mouseVelocityY) > 5}
				<div
					class="absolute pointer-events-none transition-all duration-300"
					style="
						left: {(mouseX / innerWidth) * 100}%;
						top: {(mouseY / innerHeight) * 100}%;
						width: {Math.abs(mouseVelocityX + mouseVelocityY) * 2 + 50}px;
						height: {Math.abs(mouseVelocityX + mouseVelocityY) * 2 + 50}px;
						background: radial-gradient(
							circle, 
							rgba(255,255,255,{Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0003, 0.08)}) 0%, 
							rgba(255,255,255,{Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.0001, 0.04)}) 50%, 
							transparent 80%
						);
						transform: translate(-50%, -50%) scale({1 + Math.abs(mouseVelocityX) * 0.0008});
						border-radius: 50%;
						filter: blur({15 - Math.min(Math.abs(mouseVelocityX + mouseVelocityY) * 0.03, 5)}px);
						animation: cta-mouse-glow 3s ease-out forwards;
					"
				></div>
			{/if}
			
			<!-- Mode-specific background elements -->
			{#if currentMode === HOME_MODES.PARTICLES}
				<div class="absolute top-10 left-10 w-3 h-3 bg-blue-300/60 rounded-full animate-particle-float blur-sm"></div>
				<div class="absolute bottom-10 right-10 w-2 h-2 bg-purple-300/70 rounded-full animate-particle-float blur-sm" style="animation-delay: 1.5s;"></div>
				<div class="absolute top-1/3 right-1/4 w-4 h-4 bg-cyan-300/50 rounded-full animate-particle-float blur-sm" style="animation-delay: 3s;"></div>
			{:else if currentMode === HOME_MODES.NEURAL}
				<div class="absolute top-16 left-16 w-2 h-2 bg-emerald-300/80 rounded-full animate-neural-pulse-enhanced blur-sm"></div>
				<div class="absolute bottom-16 right-16 w-3 h-3 bg-green-300/70 rounded-full animate-neural-pulse-enhanced blur-sm" style="animation-delay: 2s;"></div>
			{:else if currentMode === HOME_MODES.COSMIC}
				<div class="absolute top-20 right-20 w-6 h-6 bg-purple-300/60 rounded-full animate-cosmic-drift blur-md"></div>
				<div class="absolute bottom-20 left-20 w-4 h-4 bg-pink-300/70 rounded-full animate-cosmic-drift blur-sm" style="animation-delay: 2.5s;"></div>
			{/if}
		</div>

		<div class="container mx-auto max-w-6xl relative z-10">
			{#if mounted}
				<div in:fade={{ delay: 300, duration: 800 }} class="text-center">
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
						Ready to Build Something Amazing?
					</h2>
					<p class="text-xl md:text-2xl lg:text-3xl mb-16 max-w-4xl mx-auto opacity-90 leading-relaxed font-light">
						Join thousands of developers using our cutting-edge component library to create stunning, interactive experiences with {componentCount}+ production-ready components and {Object.keys(HOME_MODES).length} unique animation modes.
					</p>
					
					<!-- Enhanced feature highlights with interactive elements -->
					<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
						<div class="text-center group hover:scale-105 transition-transform cursor-default">
							<div class="text-4xl mb-3 group-hover:animate-bounce">⚡</div>
							<div class="text-sm font-medium">Lightning Fast</div>
							<div class="text-xs opacity-70 mt-1">100% Svelte</div>
						</div>
						<div class="text-center group hover:scale-105 transition-transform cursor-default">
							<div class="text-4xl mb-3 group-hover:animate-bounce">🎨</div>
							<div class="text-sm font-medium">Beautiful Design</div>
							<div class="text-xs opacity-70 mt-1">{Object.keys(HOME_MODES).length} Animation Modes</div>
						</div>
						<div class="text-center group hover:scale-105 transition-transform cursor-default">
							<div class="text-4xl mb-3 group-hover:animate-bounce">📱</div>
							<div class="text-sm font-medium">Fully Responsive</div>
							<div class="text-xs opacity-70 mt-1">Mobile Optimized</div>
						</div>
						<div class="text-center group hover:scale-105 transition-transform cursor-default">
							<div class="text-4xl mb-3 group-hover:animate-bounce">🔧</div>
							<div class="text-sm font-medium">Highly Customizable</div>
							<div class="text-xs opacity-70 mt-1">TypeScript Ready</div>
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
									<div class="font-semibold text-lg whitespace-nowrap">Explore {componentCount}+ Components</div>
									<div class="text-sm opacity-70 font-normal">Full Interactive Library</div>
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
									<div class="text-sm opacity-70 font-normal">Modern Framework • Free Forever</div>
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
							class="text-white font-bold hover:text-blue-200 transition-colors underline decoration-blue-300/50 hover:decoration-white/70 hover:scale-105 inline-block transition-transform"
						>
							Reckless98
						</a>
					</p>
					<p class="text-white/60 text-sm md:text-base mb-4">Modern Framework • Beautiful • Lightning Fast</p>
					
					<!-- Enhanced social proof with dynamic stats -->
					<div class="flex flex-wrap justify-center gap-4 md:gap-6 text-white/40 text-sm">
						<span class="hover:text-white/60 transition-colors">✨ {Object.keys(HOME_MODES).length} Animation Modes</span>
						<span class="hover:text-white/60 transition-colors">🎨 {componentCount}+ Components</span>
						<span class="hover:text-white/60 transition-colors">⚡ 100% Svelte</span>
						<span class="hover:text-white/60 transition-colors">🚀 TypeScript Ready</span>
						<span class="hover:text-white/60 transition-colors">📱 Mobile Optimized</span>
					</div>
				</div>
			{/if}
		</div>
	</section>
</main>

<style>
	/* Enhanced Matrix Rain Animations */
	@keyframes matrix-rain-primary {
		0% { 
			transform: translateY(-100vh) scale(1.2); 
			opacity: 0; 
			filter: brightness(1.5) blur(0px);
		}
		5% { 
			opacity: 1; 
			filter: brightness(1.2) blur(0px);
		}
		85% { 
			opacity: 0.8; 
			filter: brightness(1) blur(0px);
		}
		100% { 
			transform: translateY(100vh) scale(0.8); 
			opacity: 0; 
			filter: brightness(0.5) blur(1px);
		}
	}

	@keyframes matrix-rain-secondary {
		0% { 
			transform: translateY(-120vh) scale(0.8); 
			opacity: 0; 
			filter: brightness(0.8);
		}
		10% { 
			opacity: 0.6; 
		}
		90% { 
			opacity: 0.4; 
		}
		100% { 
			transform: translateY(100vh) scale(0.6); 
			opacity: 0; 
		}
	}

	@keyframes matrix-rain-trail {
		0% { 
			transform: translateY(-80vh) scale(1); 
			opacity: 0; 
			filter: brightness(0.6);
		}
		15% { 
			opacity: 0.4; 
		}
		75% { 
			opacity: 0.2; 
		}
		100% { 
			transform: translateY(100vh) scale(0.4); 
			opacity: 0; 
		}
	}

	@keyframes matrix-rain-burst {
		0% { 
			transform: scale(0) rotate(0deg); 
			opacity: 0; 
			filter: brightness(2);
		}
		20% { 
			transform: scale(1.5) rotate(90deg); 
			opacity: 1; 
			filter: brightness(1.8);
		}
		60% { 
			transform: scale(2) rotate(180deg); 
			opacity: 0.6; 
			filter: brightness(1.2);
		}
		100% { 
			transform: scale(3) rotate(360deg); 
			opacity: 0; 
			filter: brightness(0.5);
		}
	}

	@keyframes matrix-rain-splash {
		0% { 
			transform: translateY(0) scale(0.5); 
			opacity: 0; 
			filter: brightness(1.5);
		}
		30% { 
			transform: translateY(-10px) scale(1.2); 
			opacity: 0.8; 
			filter: brightness(1.2);
		}
		70% { 
			transform: translateY(-5px) scale(1.5); 
			opacity: 0.4; 
		}
		100% { 
			transform: translateY(0) scale(2); 
			opacity: 0; 
		}
	}

	@keyframes matrix-rain-accumulation {
		0% { 
			transform: scale(0); 
			opacity: 0; 
		}
		20% { 
			transform: scale(1); 
			opacity: 0.3; 
		}
		80% { 
			transform: scale(1.1); 
			opacity: 0.2; 
		}
		100% { 
			transform: scale(1.2); 
			opacity: 0; 
		}
	}

	/* Matrix Animation Classes */
	.animate-matrix-rainfall-primary {
		animation: matrix-rain-primary 3s linear infinite;
		animation-delay: var(--animation-delay, 0s);
		will-change: transform, opacity;
	}

	.animate-matrix-rainfall-secondary {
		animation: matrix-rain-secondary 4s linear infinite;
		animation-delay: var(--animation-delay, 0s);
		will-change: transform, opacity;
	}

	.animate-matrix-rainfall-trail {
		animation: matrix-rain-trail 5s linear infinite;
		animation-delay: var(--animation-delay, 0s);
		will-change: transform, opacity;
	}

	.animate-matrix-rainfall-burst {
		animation: matrix-rain-burst 1.5s ease-out infinite;
		animation-delay: var(--animation-delay, 0s);
		will-change: transform, opacity;
	}

	.animate-matrix-rainfall-splash {
		animation: matrix-rain-splash 2s ease-out infinite;
		animation-delay: var(--animation-delay, 0s);
		will-change: transform, opacity;
	}

	.animate-matrix-rainfall-accumulation {
		animation: matrix-rain-accumulation 6s ease-in-out infinite;
		animation-delay: var(--animation-delay, 0s);
		will-change: transform, opacity;
	}

	@keyframes cosmic-drift {
		0%, 100% { transform: translate(0, 0); opacity: 0.3; }
		50% { transform: translate(15px, -10px); opacity: 0.6; }
	}

	@keyframes particle-float {
		0%, 100% { transform: translateY(0); opacity: 0.2; }
		50% { transform: translateY(-8px); opacity: 0.4; }
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	@keyframes float-delayed {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-12px); }
	}

	@keyframes bounce-slow {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	@keyframes pulse-slow {
		0%, 100% { opacity: 0.2; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.02); }
	}

	@keyframes wave-motion {
		0% { transform: translateX(-20px); opacity: 0.3; }
		50% { transform: translateX(20px); opacity: 0.6; }
		100% { transform: translateX(-20px); opacity: 0.3; }
	}

	@keyframes geometric-spin {
		0% { transform: rotate(0deg); opacity: 0.2; }
		50% { transform: rotate(180deg); opacity: 0.4; }
		100% { transform: rotate(360deg); opacity: 0.2; }
	}

	@keyframes neural-pulse {
		0%, 100% { 
			transform: scale(1); 
			opacity: 0.2; 
		}
		50% { 
			transform: scale(1.05); 
			opacity: 0.4; 
		}
	}

	@keyframes neural-connection {
		0%, 100% { 
			opacity: 0; 
			transform: scaleX(0); 
		}
		50% { 
			opacity: 0.3; 
			transform: scaleX(1); 
		}
	}

	@keyframes crystal-refraction {
		0%, 100% { 
			transform: rotate(0deg); 
			opacity: 0.2; 
		}
		50% { 
			transform: rotate(180deg); 
			opacity: 0.4; 
		}
	}

	@keyframes aurora-dance {
		0%, 100% { 
			transform: translateX(0); 
			opacity: 0.2; 
		}
		50% { 
			transform: translateX(30px); 
			opacity: 0.4; 
		}
	}

	@keyframes crystalline-grow {
		0%, 100% { 
			transform: scale(0.8); 
			opacity: 0.2; 
		}
		50% { 
			transform: scale(1.1); 
			opacity: 0.4; 
		}
	}

	@keyframes aurora-flow {
		0%, 100% { 
			transform: translateX(0); 
			opacity: 0.2; 
		}
		50% { 
			transform: translateX(20px); 
			opacity: 0.4; 
		}
	}

	@keyframes gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	/* Simplified Neural Network Animations */
	@keyframes neural-pulse-enhanced {
		0%, 100% { 
			transform: scale(1); 
			opacity: 0.2; 
		}
		50% { 
			transform: scale(1.08); 
			opacity: 0.5; 
		}
	}

	@keyframes neural-connection-flow {
		0%, 100% { 
			opacity: 0; 
			transform: scaleX(0); 
		}
		50% { 
			opacity: 0.4; 
			transform: scaleX(1); 
		}
	}

	@keyframes neural-data-flow {
		0% {
			transform: translateX(0) scale(0.8);
			opacity: 0;
		}
		50% {
			transform: translateX(50px) scale(1);
			opacity: 0.4;
		}
		100% {
			transform: translateX(100px) scale(0.8);
			opacity: 0;
		}
	}

	/* Simplified Parallax Animations */
	@keyframes parallax-dimensional {
		0%, 100% { 
			transform: translateY(0) scale(1);
			opacity: 0.3;
		}
		50% { 
			transform: translateY(-15px) scale(1.05);
			opacity: 0.5;
		}
	}

	@keyframes parallax-field {
		0% {
			transform: translateY(0) scale(1);
			opacity: 0;
		}
		25% {
			transform: translateY(-15px) translateX(-10px) scale(0.9) rotateZ(90deg);
			opacity: 0.5;
			filter: blur(1px);
		}
		50% {
			transform: translateY(-4px);
			opacity: 0.3;
		}
		100% {
			transform: translateY(-8px);
			opacity: 0;
		}
	}

	@keyframes parallax-fragment {
		0%, 100% {
			transform: translateY(0);
			opacity: 0;
		}
		50% {
			transform: translateY(-5px);
			opacity: 0.2;
		}
	}

	@keyframes parallax-rift {
		0%, 100% {
			transform: translateY(0);
			opacity: 0;
		}
		50% {
			transform: translateY(-3px);
			opacity: 0.2;
		}
	}

	@keyframes parallax-distortion {
		0% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0.3;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.2);
			opacity: 0.5;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.4);
			opacity: 0;
		}
	}

	@keyframes parallax-echo {
		0% {
			transform: scale(1);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.15);
			opacity: 0.2;
		}
		100% {
			transform: scale(1.3);
			opacity: 0;
		}
	}

	/* Enhanced Gradient Animations */
	@keyframes gradient-morph {
		0% { 
			transform: scale(1) rotate(0deg);
			background-position: 0% 50%;
			opacity: 0.6;
		}
		25% {
			transform: scale(1.1) rotate(90deg);
			background-position: 100% 25%;
			opacity: 0.8;
		}
		50% { 
			transform: scale(1.2) rotate(180deg);
			background-position: 50% 100%;
			opacity: 1;
		}
		75% {
			transform: scale(1.1) rotate(270deg);
			background-position: 25% 75%;
			opacity: 0.7;
		}
		100% { 
			transform: scale(1) rotate(360deg);
			background-position: 0% 50%;
			opacity: 0.6;
		}
	}

	@keyframes gradient-flow {
		0% {
			transform: translateY(0) scaleX(1);
			opacity: 0.4;
		}
		50% {
			transform: translateY(-8px);
			opacity: 0.4;
		}
		100% {
			transform: translateY(-16px);
			opacity: 0;
		}
	}

	@keyframes gradient-particle {
		0%, 100% {
			transform: scale(0.8);
			opacity: 0;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.3;
		}
	}

	/* NEW: Minimal Wave Cursor Animations */
	@keyframes minimal-wave-ripple {
		0% {
			transform: translate(-50%, -50%) scale(0.3);
			opacity: 0.3;
		}
		30% {
			transform: translate(-50%, -50%) scale(0.8);
			opacity: 0.15;
		}
		60% {
			transform: translate(-50%, -50%) scale(1.2);
			opacity: 0.08;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.8);
			opacity: 0;
		}
	}

	@keyframes gentle-wave-drift {
		0% {
			transform: translate(-50%, -50%) scale(0.5);
			opacity: 0.2;
		}
		40% {
			transform: translate(-50%, -50%) scale(0.9);
			opacity: 0.12;
		}
		70% {
			transform: translate(-50%, -50%) scale(1.3);
			opacity: 0.06;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.6);
			opacity: 0;
		}
	}

	/* NEW: Minimal Cosmic Cursor Animations */
	@keyframes gentle-cosmic-sparkle {
		0% {
			transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
			opacity: 0.15;
		}
		25% {
			transform: translate(-50%, -50%) scale(0.6) rotate(90deg);
			opacity: 0.1;
		}
		50% {
			transform: translate(-50%, -50%) scale(1) rotate(180deg);
			opacity: 0.06;
		}
		75% {
			transform: translate(-50%, -50%) scale(1.3) rotate(270deg);
			opacity: 0.03;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.6) rotate(360deg);
			opacity: 0;
		}
	}

	@keyframes minimal-cosmic-dust {
		0% {
			transform: translate(-50%, -50%) scale(0.3);
			opacity: 0.1;
		}
		30% {
			transform: translate(-50%, -50%) scale(0.7);
			opacity: 0.06;
		}
		60% {
			transform: translate(-50%, -50%) scale(1.1);
			opacity: 0.03;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.5);
			opacity: 0;
		}
	}

	/* New Gradient Animation Keyframes */
	@keyframes gradient-ripple {
		0% {
			transform: translate(-50%, -50%) scale(0.3);
			opacity: 0.4;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.2);
			opacity: 0.2;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.8);
			opacity: 0;
		}
	}

	@keyframes neural-synapse-flash {
		0%, 90%, 100% {
			opacity: 0.3;
			transform: scale(1);
		}
		5%, 15% {
			opacity: 1;
			transform: scale(1.3);
		}
	}

	@keyframes neural-cluster-flow {
		0% {
			transform: rotate(0deg) scale(0.8);
			opacity: 0.3;
		}
		50% {
			transform: rotate(180deg) scale(1);
			opacity: 0.4;
		}
		100% {
			transform: rotate(360deg) scale(0.8);
			opacity: 0.3;
		}
	}

	/* Aurora Background Animations */
	@keyframes aurora-curtain-slow {
		0%, 100% {
			transform: translateX(0) scaleY(1);
			opacity: 0.15;
		}
		33% {
			transform: translateX(10px) scaleY(1.1);
			opacity: 0.25;
		}
		66% {
			transform: translateX(-8px) scaleY(0.9);
			opacity: 0.2;
		}
	}

	@keyframes aurora-wave-flow {
		0% {
			transform: translateX(-100%) scaleX(0.8);
			opacity: 0.1;
		}
		50% {
			transform: translateX(0) scaleX(1.2);
			opacity: 0.3;
		}
		100% {
			transform: translateX(100%) scaleX(0.8);
			opacity: 0.1;
		}
	}

	@keyframes aurora-glow {
		0%, 100% {
			transform: scale(0.9);
			opacity: 0.15;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.25;
		}
	}

	@keyframes aurora-streak {
		0% {
			transform: translateX(-50%) scaleX(0);
			opacity: 0;
		}
		50% {
			transform: translateX(0) scaleX(1);
			opacity: 0.3;
		}
		100% {
			transform: translateX(50%) scaleX(0);
			opacity: 0;
		}
	}

	@keyframes aurora-shimmer-bg {
		0%, 100% {
			transform: scale(1) rotate(0deg);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.05) rotate(180deg);
			opacity: 0.3;
		}
	}

	@keyframes aurora-ripple {
		0% {
			transform: scaleY(0.5) translateX(-100%);
			opacity: 0;
		}
		50% {
			transform: scaleY(1) translateX(0);
			opacity: 0.25;
		}
		100% {
			transform: scaleY(0.5) translateX(100%);
			opacity: 0;
		}
	}

	@keyframes aurora-column {
		0%, 100% {
			transform: translateY(0) scaleY(1);
			opacity: 0.18;
		}
		50% {
			transform: translateY(-20px) scaleY(1.2);
			opacity: 0.28;
		}
	}

	@keyframes aurora-particle-float {
		0%, 100% {
			transform: translateY(0) scale(1);
			opacity: 0.25;
		}
		50% {
			transform: translateY(-15px) scale(1.1);
			opacity: 0.35;
		}
	}

	@keyframes aurora-particle-drift {
		0% {
			transform: translateX(0) rotate(0deg);
			opacity: 0.3;
		}
		100% {
			transform: translateX(30px) rotate(360deg);
			opacity: 0.1;
		}
	}

	@keyframes aurora-particle-dance {
		0%, 100% {
			transform: translate(0, 0) scale(1);
			opacity: 0.2;
		}
		33% {
			transform: translate(10px, -8px) scale(1.1);
			opacity: 0.3;
		}
		66% {
			transform: translate(-5px, 12px) scale(0.9);
			opacity: 0.25;
		}
	}

	@keyframes aurora-particle-glow {
		0%, 100% {
			transform: scale(0.8);
			opacity: 0.35;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.45;
		}
	}

	/* Crystal Background Animations */
	@keyframes crystal-rotation {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 0.2;
		}
		100% {
			transform: rotate(360deg) scale(1.05);
			opacity: 0.15;
		}
	}

	@keyframes crystal-pulse {
		0%, 100% {
			transform: scale(0.95);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.3;
		}
	}

	@keyframes crystal-beam {
		0%, 100% {
			transform: scaleX(0.5) translateX(-50%);
			opacity: 0;
		}
		50% {
			transform: scaleX(1) translateX(0);
			opacity: 0.25;
		}
	}

	@keyframes crystal-refraction-beam {
		0%, 100% {
			transform: translateY(0) scaleY(1) skewX(0deg);
			opacity: 0.18;
		}
		50% {
			transform: translateY(-10px) scaleY(1.1) skewX(2deg);
			opacity: 0.28;
		}
	}

	@keyframes crystal-light-ray {
		0% {
			transform: translateX(-100%) scaleX(0);
			opacity: 0;
		}
		50% {
			transform: translateX(0) scaleX(1);
			opacity: 0.3;
		}
		100% {
			transform: translateX(100%) scaleX(0);
			opacity: 0;
		}
	}

	@keyframes crystal-facet-shine {
		0%, 100% {
			transform: rotate(0deg) scale(1);
			opacity: 0.2;
		}
		50% {
			transform: rotate(180deg) scale(1.1);
			opacity: 0.3;
		}
	}

	@keyframes crystal-prism-bg {
		0%, 100% {
			transform: translateY(0) scaleY(1) skewY(0deg);
			opacity: 0.25;
		}
		50% {
			transform: translateY(-15px) scaleY(1.2) skewY(1deg);
			opacity: 0.35;
		}
	}

	@keyframes crystal-spectrum {
		0% {
			transform: translateX(-50%) scaleX(0);
			opacity: 0;
		}
		50% {
			transform: translateX(0) scaleX(1);
			opacity: 0.3;
		}
		100% {
			transform: translateX(50%) scaleX(0);
			opacity: 0;
		}
	}

	@keyframes crystal-kaleidoscope {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 0.15;
		}
		100% {
			transform: rotate(360deg) scale(1.1);
			opacity: 0.25;
		}
	}

	@keyframes crystal-fragment-spin {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 0.3;
		}
		100% {
			transform: rotate(360deg) scale(1.1);
			opacity: 0.2;
		}
	}

	@keyframes crystal-fragment-pulse {
		0%, 100% {
			transform: scale(0.9);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.35;
		}
	}

	@keyframes crystal-fragment-drift {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 0.35;
		}
		50% {
			transform: translate(8px, -12px) rotate(180deg);
			opacity: 0.25;
		}
	}

	@keyframes crystal-fragment-shimmer {
		0%, 100% {
			transform: rotate(0deg) scale(1);
			opacity: 0.2;
		}
		50% {
			transform: rotate(180deg) scale(1.05);
			opacity: 0.4;
		}
	}

	/* Cosmic Background Animations */
	@keyframes cosmic-nebula-drift {
		0%, 100% {
			transform: translate(0, 0) scale(1) rotate(0deg);
			opacity: 0.15;
		}
		50% {
			transform: translate(15px, -10px) scale(1.05) rotate(180deg);
			opacity: 0.25;
		}
	}

	@keyframes cosmic-cloud-flow {
		0% {
			transform: translateX(-20%) scaleX(0.8);
			opacity: 0.1;
		}
		50% {
			transform: translateX(0) scaleX(1.2);
			opacity: 0.2;
		}
		100% {
			transform: translateX(20%) scaleX(0.8);
			opacity: 0.1;
		}
	}

	@keyframes cosmic-vortex {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 0.18;
		}
		100% {
			transform: rotate(360deg) scale(1.1);
			opacity: 0.25;
		}
	}

	@keyframes cosmic-stream-flow {
		0% {
			transform: translateX(-100%) scaleX(0.5);
			opacity: 0;
		}
		50% {
			transform: translateX(0) scaleX(1);
			opacity: 0.2;
		}
		100% {
			transform: translateX(100%) scaleX(0.5);
			opacity: 0;
		}
	}

	@keyframes cosmic-energy-pulse {
		0%, 100% {
			transform: scale(0.9);
			opacity: 0.18;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.28;
		}
	}

	@keyframes cosmic-light-trail {
		0% {
			transform: translateX(-100%) scaleX(0);
			opacity: 0;
		}
		50% {
			transform: translateX(0) scaleX(1);
			opacity: 0.3;
		}
		100% {
			transform: translateX(100%) scaleX(0);
			opacity: 0;
		}
	}

	@keyframes cosmic-stellar-field {
		0%, 100% {
			transform: rotate(0deg) scale(1);
			opacity: 0.2;
		}
		50% {
			transform: rotate(180deg) scale(1.05);
			opacity: 0.3;
		}
	}

	@keyframes cosmic-galaxy-arm {
		0% {
			transform: translateX(-50%) rotate(-5deg);
			opacity: 0;
		}
		50% {
			transform: translateX(0) rotate(0deg);
			opacity: 0.25;
		}
		100% {
			transform: translateX(50%) rotate(5deg);
			opacity: 0;
		}
	}

	@keyframes cosmic-pulsar {
		0%, 100% {
			transform: rotate(0deg) scale(1);
			opacity: 0.2;
		}
		50% {
			transform: rotate(180deg) scale(1.2);
			opacity: 0.35;
		}
	}

	@keyframes cosmic-dust-drift {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 0.25;
		}
		50% {
			transform: translate(10px, -8px) rotate(180deg);
			opacity: 0.35;
		}
	}

	@keyframes cosmic-dust-swirl {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 0.3;
		}
		100% {
			transform: rotate(360deg) scale(1.1);
			opacity: 0.2;
		}
	}

	@keyframes cosmic-dust-sparkle {
		0%, 100% {
			transform: scale(0.8);
			opacity: 0.35;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.45;
		}
	}

	@keyframes cosmic-dust-nebula {
		0%, 100% {
			transform: rotate(0deg) scale(1);
			opacity: 0.15;
		}
		33% {
			transform: rotate(120deg) scale(1.05);
			opacity: 0.25;
		}
		66% {
			transform: rotate(240deg) scale(0.95);
			opacity: 0.2;
		}
	}

	/* Animation class assignments */
</style>
