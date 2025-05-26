<!-- Component Explorer - Interactive showcase of all UI components -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme.js';
	
	// Layout and animation components
	import ParallaxLayout from '$lib/layouts/ParallaxLayout.svelte';
	import ScrollReveal from '$lib/animations/ScrollReveal.svelte';
	import Parallax from '$lib/animations/Parallax.svelte';
	import Sidebar from './Sidebar.svelte';
	
	// Component Explorers - organized by sidebar categories
	import ButtonExplorer from './components/ButtonExplorer.svelte';
	import BadgeExplorer from './components/BadgeExplorer.svelte';
	import AvatarExplorer from './components/AvatarExplorer.svelte';
	import DividerExplorer from './components/DividerExplorer.svelte';
	import InputExplorer from './components/InputExplorer.svelte';
	import TextareaExplorer from './components/TextareaExplorer.svelte';
	import SelectExplorer from './components/SelectExplorer.svelte';
	import CheckboxExplorer from './components/CheckboxExplorer.svelte';
	import ToggleExplorer from './components/ToggleExplorer.svelte';
	import LayoutExplorer from './components/LayoutExplorer.svelte';
	import CardExplorer from './components/CardExplorer.svelte';
	import AccordionExplorer from './components/AccordionExplorer.svelte';
	import HeaderExplorer from './components/HeaderExplorer.svelte';
	import NavigationExplorer from './components/NavigationExplorer.svelte';
	import FooterExplorer from './components/FooterExplorer.svelte';
	import TabsExplorer from './components/TabsExplorer.svelte';
	import DropdownExplorer from './components/DropdownExplorer.svelte';
	import TableExplorer from './components/TableExplorer.svelte';
	import ListExplorer from './components/ListExplorer.svelte';
	import StatsExplorer from './components/StatsExplorer.svelte';
	import AlertExplorer from './components/AlertExplorer.svelte';
	import ToastExplorer from './components/ToastExplorer.svelte';
	import ProgressExplorer from './components/ProgressExplorer.svelte';
	import ModalExplorer from './components/ModalExplorer.svelte';	import TooltipExplorer from './components/TooltipExplorer.svelte';
	import AnimationExplorer from './components/AnimationExplorer.svelte';
	
	// Only keep essential UI components for Toast and Button in hero
	import Button from '$lib/components/Button/Button.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';
	
	// Theme management
	let currentTheme = 'light';
	theme.subscribe(value => currentTheme = value);
	$: isDark = currentTheme === 'dark';
	
	// Toast notification functionality
	let showToast = false;
	let toastMessage = '';
	
	// Toast notification function
	function showToastNotification(message: string) {
		toastMessage = message;
		showToast = true;
		setTimeout(() => showToast = false, 3000);
	}
	
	// Scroll tracking for sidebar highlighting
	let activeSection = '';
	let sectionElements: { [key: string]: HTMLElement } = {};	
	// Component categories matching sidebar structure
	const componentSections = [
		{ id: 'foundation', name: 'Foundation', icon: '🎨' },
		{ id: 'form-controls', name: 'Form Controls', icon: '📝' },
		{ id: 'layout-containers', name: 'Layout & Containers', icon: '🏗️' },
		{ id: 'navigation', name: 'Navigation', icon: '🧭' },
		{ id: 'data-display', name: 'Data Display', icon: '📊' },
		{ id: 'feedback-status', name: 'Feedback & Status', icon: '💬' },
		{ id: 'overlays-dialogs', name: 'Overlays & Dialogs', icon: '🪟' },
		{ id: 'animation-effects', name: 'Animation & Effects', icon: '✨' }
	];
	
	// Enhanced scroll tracking with intersection observer
	onMount(() => {
		// Intersection Observer for scroll animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -100px 0px'
		};
		
		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);
		
		// Observe all component sections
		document.querySelectorAll('.component-section').forEach((section) => {
			sectionObserver.observe(section);
			if (section.id) {
				sectionElements[section.id] = section as HTMLElement;
			}
		});
		
		return () => {
			sectionObserver.disconnect();
		};
	});
		// Smooth scroll to section
	function scrollToSection(sectionId: string) {
		const element = sectionElements[sectionId] || document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start',
				inline: 'nearest'
			});
		}
	}
</script>

<svelte:head>
	<title>Component Explorer - Interactive UI Showcase</title>
	<meta name="description" content="Explore and interact with all available UI components in our design system" />
</svelte:head>

<div class="min-h-screen {isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300">	<!-- Sidebar Navigation -->
	<Sidebar />
	
	<!-- Hero Section with Enhanced Parallax -->
	<ParallaxLayout 
		backgroundImage="" 
		overlayColor={isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'}
		speed={0.8}
		fullHeight={false}
		animationType="float"
		intensity={1.5}
	>
		<div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
			<!-- Floating Background Elements -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				<!-- Animated geometric shapes -->
				<div class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
				<div class="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-15 animate-bounce" style="animation-delay: 0.5s;"></div>
				<div class="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-20" style="animation: float 6s ease-in-out infinite;"></div>
				<div class="absolute bottom-1/4 left-1/2 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-12" style="animation: float 8s ease-in-out infinite reverse;"></div>
				
				<!-- Grid pattern overlay -->
				<div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
			</div>
			
			<div class="relative z-10 text-center py-32">
				<h1 class="text-6xl font-bold mb-6 {isDark ? 'text-white' : 'text-gray-900'}" 
					in:fly={{ y: 50, duration: 800, delay: 200 }}>
					Component Explorer
				</h1>
				<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8"
					in:fly={{ y: 30, duration: 800, delay: 400 }}>
					Discover and interact with our comprehensive collection of UI components. 
					Each component is designed with accessibility, performance, and beautiful aesthetics in mind.
				</p>
				<div class="flex gap-4 justify-center"
					in:fly={{ y: 20, duration: 800, delay: 600 }}>
					<Button variant="primary" size="lg" on:click={() => scrollToSection('foundation')}>
						Explore Components
					</Button>
					<Button variant="ghost" size="lg" on:click={() => scrollToSection('examples')}>
						View Examples
					</Button>
				</div>
			</div>
			
			<!-- Floating particles for visual enhancement -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				{#each Array(12) as _, i}
					<div 
						class="absolute w-2 h-2 {isDark ? 'bg-blue-400' : 'bg-blue-500'} rounded-full opacity-20 animate-pulse"
						style="
							left: {Math.random() * 100}%; 
							top: {Math.random() * 100}%;
							animation-delay: {i * 0.5}s;
							animation-duration: {2 + Math.random() * 3}s;
						"
					></div>
				{/each}
			</div>
			
			<!-- Interactive gradient orbs -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				<div class="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl" style="animation: float 10s ease-in-out infinite;"></div>
				<div class="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-radial from-purple-400/25 to-transparent rounded-full blur-2xl" style="animation: float 8s ease-in-out infinite reverse;"></div>
				<div class="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-radial from-green-400/30 to-transparent rounded-full blur-xl" style="animation: float 12s ease-in-out infinite;"></div>
			</div>
		</div>
	</ParallaxLayout>	
	<!-- Main Content Area -->
	<div class="lg:ml-80 transition-all duration-300 relative">
		<!-- Dynamic background pattern -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
			<div class="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10"></div>
			<div class="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-radial from-blue-400/5 to-transparent rounded-full blur-3xl" style="animation: float 15s ease-in-out infinite;"></div>
			<div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-purple-400/5 to-transparent rounded-full blur-3xl" style="animation: float 20s ease-in-out infinite reverse;"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 py-12">
					<!-- Foundation Components Section -->
			<section id="foundation" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold mb-6 shadow-lg">
						🎨
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Foundation Components
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Essential building blocks for any modern user interface. These components form the core of your design system.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<ButtonExplorer />
					<BadgeExplorer />
					<AvatarExplorer />
					<DividerExplorer />
				</div>
			</section>
					<!-- Form Controls Section -->
			<section id="form-controls" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 text-white text-2xl font-bold mb-6 shadow-lg">
						📝
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
						Form Controls
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Interactive form elements for user input. Build beautiful and accessible forms with these components.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<InputExplorer />
					<TextareaExplorer />
					<SelectExplorer />
					<CheckboxExplorer />
					<ToggleExplorer />
				</div>
			</section>
					<!-- Layout & Containers Section -->
			<section id="layout-containers" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-2xl font-bold mb-6 shadow-lg">
						🏗️
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
						Layout & Containers
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Flexible layout primitives for responsive design. Create stunning layouts with these container components.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<LayoutExplorer />
					<CardExplorer />
					<AccordionExplorer />
				</div>
			</section>
					<!-- Navigation Section -->
			<section id="navigation" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-2xl font-bold mb-6 shadow-lg">
						🧭
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
						Navigation
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Navigation components for seamless user experience and intuitive site traversal.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<HeaderExplorer />
					<NavigationExplorer />
					<FooterExplorer />
					<TabsExplorer />
					<DropdownExplorer />
				</div>
			</section>
			
			<!-- Data Display Section -->
			<section id="data-display" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white text-2xl font-bold mb-6 shadow-lg">
						📊
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
						Data Display
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Components for presenting and organizing data in beautiful, accessible formats.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<TableExplorer />
					<ListExplorer />
					<StatsExplorer />
				</div>
			</section>
					<!-- Feedback & Status Section -->
			<section id="feedback-status" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-600 text-white text-2xl font-bold mb-6 shadow-lg">
						💬
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
						Feedback & Status
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Components for user feedback and status indication. Keep users informed with these interactive elements.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<AlertExplorer />
					<ToastExplorer />
					<ProgressExplorer />
				</div>
			</section>
			
			<!-- Overlays & Dialogs Section -->
			<section id="overlays-dialogs" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-2xl font-bold mb-6 shadow-lg">
						🪟
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
						Overlays & Dialogs
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Modal dialogs and overlay components for enhanced user interactions and content display.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<ModalExplorer />
					<TooltipExplorer />
				</div>
			</section>
			
			<!-- Animation & Effects Section -->
			<section id="animation-effects" class="mb-24 component-section">
				<div class="text-center mb-16" in:fade={{ duration: 600 }}>
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-2xl font-bold mb-6 shadow-lg">
						✨
					</div>
					<h2 class="text-5xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
						Animation & Effects
					</h2>
					<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed">
						Beautiful animations and visual effects to bring your interfaces to life with smooth, delightful interactions.
					</p>
					<div class="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-8 rounded-full"></div>
				</div>
				
				<div class="space-y-8">
					<AnimationExplorer />
				</div>
			</section>
		</div>
	</div>

</div>

<!-- Toast Notification System -->
{#if showToast}
	<div 
		class="fixed bottom-6 right-6 z-50"
		in:fly={{ x: 300, duration: 300 }}
		out:fly={{ x: 300, duration: 300 }}
	>
		<Toast message={toastMessage} type="success" />
	</div>
{/if}

<!-- Floating Navigation Button -->
<div class="fixed bottom-6 left-6 z-40 lg:hidden">
	<Button 
		variant="primary" 
		class="rounded-full w-12 h-12 shadow-lg"
		on:click={() => scrollToSection('foundation')}
		title="Navigate to Components"
	>
		↑
	</Button>
</div>

<style type="postcss">
	/* Custom animations for enhanced visual appeal */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		33% { transform: translateY(-10px) rotate(1deg); }
		66% { transform: translateY(5px) rotate(-1deg); }
	}
	
	/* Smooth scroll behavior */
	:global(html) {
	scroll-behavior: smooth;
	}
	
	/* Custom floating animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(5deg); }
	}
	
	@keyframes pulse-glow {
		0%, 100% { opacity: 0.1; transform: scale(1); }
		50% { opacity: 0.3; transform: scale(1.1); }
	}
		/* Grid pattern for background */
	.bg-grid-pattern {
		background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}
	
	/* Gradient utilities */
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}
	
	/* Parallax container enhancements */
	:global(.parallax-container) {
		position: relative;
		overflow: hidden;
	}
	
	:global(.parallax-element) {
		will-change: transform;
		transform-style: preserve-3d;
	}
	/* This class is dynamically applied by Intersection Observer - not unused */
	:global(.component-card.animate-in) {
		opacity: 1;
		transform: translateY(0) scale(1);
		animation: cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	
	@keyframes cardSlideIn {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	
	/* Staggered animation for component sections */
	.component-section {
		animation: slideInUp 0.6s ease-out forwards;
		opacity: 0;
		transform: translateY(30px);
	}
	
	.component-section:nth-child(1) { animation-delay: 0.1s; }
	.component-section:nth-child(2) { animation-delay: 0.2s; }
	.component-section:nth-child(3) { animation-delay: 0.3s; }
	.component-section:nth-child(4) { animation-delay: 0.4s; }
	.component-section:nth-child(5) { animation-delay: 0.5s; }
	.component-section:nth-child(6) { animation-delay: 0.6s; }
	
	@keyframes slideInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	/* Enhanced focus styles for accessibility */
	:global(.focus\:ring-2:focus) {
		outline: none;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
	}
	
	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.lg\:ml-80 {
			margin-left: 0;
		}
	}
</style>