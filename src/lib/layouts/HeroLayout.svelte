<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly, fade, scale, blur } from 'svelte/transition';
	import { quintOut, elasticOut, bounceOut, backOut } from 'svelte/easing';

	// TypeScript interfaces
	interface Particle {
		id: number;
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;
		opacity: number;
		color: string;
	}

	type HeroVariant = 'standard' | 'split' | 'fullscreen' | 'minimal' | 'gradient' | 'particles' | 'animated' | 'video';
	type TextAlign = 'left' | 'center' | 'right';
	type ContentPosition = 'top' | 'center' | 'bottom';

	// Props with proper types
	export let variant: HeroVariant = 'standard';
	export let height = 'h-screen';
	export let backgroundImage = '';
	export let backgroundVideo = '';
	export let backgroundPosition = 'center';
	export let backgroundOverlay = 'rgba(0, 0, 0, 0.4)';
	export let parallax = false;
	export let staggered = false;
	export let animationDelay = 300;
	export let textAlign: TextAlign = 'center';
	export let contentPosition: ContentPosition = 'center';
	export let gradientDirection = 'to-br';
	export let primaryColor = 'blue';
	export let secondaryColor = 'purple';
	export let particleCount = 50;
	export let enableMouseTracker = false;
	export let backgroundGradient = '';

	// State variables with proper types
	let ready = false;
	let scrollY = 0;
	let innerHeight = 0;
	let innerWidth = 0;
	let mounted = false;
	let particles: Particle[] = [];
	let mouseX = 0;
	let mouseY = 0;
	let animationFrame: number | undefined;

	// Initialize particles for particle variant
	function initializeParticles() {
		particles = Array.from({ length: particleCount }, (_, i) => ({
			id: i,
			x: Math.random() * innerWidth,
			y: Math.random() * innerHeight,
			size: Math.random() * 4 + 1,
			speedX: (Math.random() - 0.5) * 2,
			speedY: (Math.random() - 0.5) * 2,
			opacity: Math.random() * 0.8 + 0.2,
			color: Math.random() > 0.5 ? primaryColor : secondaryColor,
		}));
	}

	// Animate particles
	function animateParticles() {
		if (variant !== 'particles' || !mounted) return;

		particles = particles.map((particle) => {
			let newX = particle.x + particle.speedX;
			let newY = particle.y + particle.speedY;

			// Bounce off edges
			if (newX < 0 || newX > innerWidth) {
				particle.speedX *= -1;
				newX = Math.max(0, Math.min(innerWidth, newX));
			}
			if (newY < 0 || newY > innerHeight) {
				particle.speedY *= -1;
				newY = Math.max(0, Math.min(innerHeight, newY));
			}

			// Mouse interaction
			if (enableMouseTracker) {
				const dx = mouseX - newX;
				const dy = mouseY - newY;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < 100) {
					const force = (100 - distance) / 100;
					newX -= (dx / distance) * force * 2;
					newY -= (dy / distance) * force * 2;
				}
			}

			return { ...particle, x: newX, y: newY };
		});

		animationFrame = requestAnimationFrame(animateParticles);
	}

	// Handle mouse movement
	function handleMouseMove(event: MouseEvent) {
		if (enableMouseTracker) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}
	}

	// Computed styles
	$: containerClasses = [
		'relative overflow-hidden',
		height,
		variant === 'fullscreen' ? 'min-h-screen' : '',
		variant === 'minimal' ? 'py-20' : '',
		textAlign === 'left' ? 'text-left' : textAlign === 'right' ? 'text-right' : 'text-center',
		contentPosition === 'top' ? 'justify-start' : contentPosition === 'bottom' ? 'justify-end' : 'justify-center',
	].filter(Boolean).join(' ');

	$: parallaxStyle = parallax ? `transform: translateY(${scrollY * 0.5}px);` : '';

	$: gradientClasses = variant === 'gradient'
		? backgroundGradient 
			? `bg-gradient-${gradientDirection} ${backgroundGradient}`
			: `bg-gradient-${gradientDirection} from-${primaryColor}-500 via-${secondaryColor}-500 to-${primaryColor}-700`
		: '';

	$: backgroundClasses = [
		gradientClasses,
		variant === 'animated' ? 'animate-gradient-x' : '',
		variant === 'particles'
			? backgroundGradient
				? `bg-gradient-${gradientDirection} ${backgroundGradient}`
				: `bg-gradient-${gradientDirection} from-${primaryColor}-900 to-${secondaryColor}-900`
			: '',
	].filter(Boolean).join(' ');

	onMount(() => {
		mounted = true;
		setTimeout(() => { ready = true; }, 100);

		if (variant === 'particles') {
			initializeParticles();
			animateParticles();
		}

		if (parallax) {
			const handleScroll = () => (scrollY = window.scrollY);
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}

		if (enableMouseTracker) {
			window.addEventListener('mousemove', handleMouseMove);
			return () => window.removeEventListener('mousemove', handleMouseMove);
		}
	});

	onDestroy(() => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<section class="{containerClasses} {backgroundClasses}">
	<!-- Particles Background for particles variant -->
	{#if variant === 'particles' && mounted}
		{#each particles as particle (particle.id)}
			<div
				class="particle"
				style="
					left: {particle.x}px; 
					top: {particle.y}px; 
					width: {particle.size}px; 
					height: {particle.size}px; 
					opacity: {particle.opacity};
					background: {particle.color === 'blue' ? '#3b82f6' : '#8b5cf6'};
				"
			></div>
		{/each}
	{/if}

	<!-- Background layers -->
	{#if variant === 'video' && backgroundVideo}
		<div class="absolute inset-0 w-full h-full overflow-hidden">
			<video autoplay muted loop playsinline class="absolute inset-0 min-w-full min-h-full object-cover">
				<source src={backgroundVideo} type="video/mp4" />
			</video>
		</div>
	{:else if backgroundImage && variant !== 'gradient' && variant !== 'particles'}
		<div
			class="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
			style="background-image: url('{backgroundImage}'); background-position: {backgroundPosition}; {parallaxStyle}"
		></div>
	{/if}

	<!-- Background overlay -->
	{#if backgroundOverlay && variant !== 'gradient'}
		<div class="absolute inset-0 w-full h-full" style="background: {backgroundOverlay};"></div>
	{/if}

	<!-- Content container -->
	<div class="relative z-10 container mx-auto px-4 h-full flex items-center">
		{#if variant === 'split'}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
				<div class={ready ? '' : 'opacity-0'}>
					{#if ready}
						<div in:fly={{ y: 50, duration: 1000, easing: quintOut }} class="animate-float">
							<slot name="left" />
						</div>
					{/if}
				</div>
				<div class={ready ? '' : 'opacity-0'}>
					{#if ready}
						<div in:fly={{ x: 50, duration: 1000, delay: animationDelay, easing: quintOut }} class="animate-float" style="animation-delay: 2s;">
							<slot name="right" />
						</div>
					{/if}
				</div>
			</div>
		{:else if variant === 'minimal'}
			<div class="w-full max-w-2xl mx-auto">
				{#if ready}
					<div in:fade={{ duration: 800, easing: quintOut }} class="hero-content rounded-2xl p-8">
						<slot />
					</div>
				{/if}
			</div>
		{:else if variant === 'animated'}
			<div class="w-full max-w-5xl mx-auto">
				{#if ready}
					<div in:scale={{ duration: 1200, start: 0.8, easing: backOut }} class="text-center space-y-8">
						<slot />
					</div>
				{/if}
			</div>
		{:else if variant === 'fullscreen'}
			<div class="w-full h-full flex flex-col justify-center items-center text-center">
				{#if ready}
					<div in:blur={{ duration: 1000, easing: quintOut }} class="space-y-12 max-w-4xl">
						<slot />
					</div>
				{/if}
			</div>
		{:else}
			<div class="w-full max-w-4xl mx-auto text-center">
				{#if staggered && ready}
					<div in:fly={{ y: 100, duration: 1000, easing: elasticOut }} class="space-y-8">
						<slot {animationDelay} />
					</div>
				{:else if ready}
					<div in:fly={{ y: 50, duration: 800, easing: quintOut }} class="space-y-6">
						<slot />
					</div>
				{:else}
					<div class="opacity-0">
						<slot />
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Floating elements for enhanced variants -->
	{#if variant === 'gradient' || variant === 'particles'}
		<div class="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
		<div class="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-15 rounded-full animate-float" style="animation-delay: 4s;"></div>
	{/if}
</section>

<style>
	@keyframes gradient-x {
		0%, 100% { transform: translateX(0%); }
		50% { transform: translateX(100%); }
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}

	.animate-gradient-x {
		animation: gradient-x 15s ease infinite;
		background-size: 400% 400%;
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.particle {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		filter: blur(1px);
	}

	.hero-content {
		backdrop-filter: blur(10px);
		background: rgba(255, 255, 255, 0.1);
	}
</style>
