<script>
	import HeroLayout from '$lib/layouts/HeroLayout.svelte';
	// Note: ParallaxLayout component needs to be created or imported if it exists
	import ComponentPreview from '../ComponentPreview.svelte';

	// Sample background images
	const mountainImage =
		'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80';
	const cityImage =
		'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

	// Code examples
	const heroExample = `<HeroLayout
  variant="standard"
  height="h-96"
  backgroundImage={mountainImage}
  backgroundOverlay="rgba(0, 0, 0, 0.5)"
>
  <h1 class="text-4xl font-bold text-white mb-4">Welcome to Our Site</h1>
  <p class="text-xl text-gray-200">Discover amazing components</p>
  <button class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
    Get Started
  </button>
</HeroLayout>`;

	const gradientExample = `<HeroLayout
  variant="gradient"
  height="h-96"
  primaryColor="blue"
  secondaryColor="purple"
>
  <h1 class="text-4xl font-bold text-white mb-4">Gradient Hero</h1>
  <p class="text-xl text-gray-100">Beautiful gradient backgrounds</p>
</HeroLayout>`;

	const particlesExample = `<HeroLayout
  variant="particles"
  height="h-96"
  particleCount={30}
  enableMouseTracker={true}
>
  <h1 class="text-4xl font-bold text-white mb-4">Interactive Particles</h1>
  <p class="text-xl text-gray-200">Move your mouse to see the effect</p>
</HeroLayout>`;
</script>

<section class="space-y-8">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
				Layout Components
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				Powerful layout components for creating stunning hero sections, parallax effects, and more.
			</p>
		</div>

		<!-- Standard Hero -->
		<ComponentPreview
			title="Standard Hero Layout"
			description="Classic hero section with background image and overlay"
			codeSnippet={heroExample}
		>
			<div class="w-full -m-8">
				<HeroLayout
					variant="standard"
					height="h-96"
					backgroundImage={mountainImage}
					backgroundOverlay="rgba(0, 0, 0, 0.5)"
				>
					<h1 class="text-4xl font-bold text-white mb-4">Welcome to Our Site</h1>
					<p class="text-xl text-gray-200 mb-6">Discover amazing components</p>
					<button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
						Get Started
					</button>
				</HeroLayout>
			</div>
		</ComponentPreview>

		<!-- Gradient Hero -->
		<ComponentPreview
			title="Gradient Hero Layout"
			description="Hero section with animated gradient background"
			codeSnippet={gradientExample}
		>
			<div class="w-full -m-8">
				<HeroLayout
					variant="gradient"
					height="h-96"
					primaryColor="blue"
					secondaryColor="purple"
					animated={true}
				>
					<h1 class="text-4xl font-bold text-white mb-4">Gradient Hero</h1>
					<p class="text-xl text-gray-100 mb-6">Beautiful gradient backgrounds</p>
					<div class="flex gap-4 justify-center">
						<button class="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors">
							Learn More
						</button>
						<button class="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
							Get Started
						</button>
					</div>
				</HeroLayout>
			</div>
		</ComponentPreview>

		<!-- Particles Hero -->
		<ComponentPreview
			title="Particles Hero Layout"
			description="Interactive hero section with animated particles"
			codeSnippet={particlesExample}
		>
			<div class="w-full -m-8">
				<HeroLayout
					variant="particles"
					height="h-96"
					particleCount={30}
					enableMouseTracker={true}
					primaryColor="blue"
					secondaryColor="purple"
				>
					<h1 class="text-4xl font-bold text-white mb-4">Interactive Particles</h1>
					<p class="text-xl text-gray-200 mb-6">Move your mouse to see the effect</p>
					<button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105">
						Explore Components
					</button>
				</HeroLayout>
			</div>
		</ComponentPreview>

		<!-- Split Hero -->
		<ComponentPreview
			title="Split Hero Layout"
			description="Two-column hero section for showcasing content and images"
			codeSnippet={`<HeroLayout variant="split" height="h-96">
  <div slot="left">
    <h1 class="text-4xl font-bold mb-4">Split Layout</h1>
    <p class="text-lg text-gray-600 mb-6">Perfect for showcasing products</p>
    <button class="px-6 py-3 bg-blue-600 text-white rounded-lg">
      Learn More
    </button>
  </div>
  <div slot="right">
    <img src="/product.png" alt="Product" class="rounded-lg shadow-xl" />
  </div>
</HeroLayout>`}
		>
			<div class="w-full -m-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
				<HeroLayout variant="split" height="h-96">
					<div slot="left" class="text-left">
						<h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Split Layout</h1>
						<p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
							Perfect for showcasing products or features side by side
						</p>
						<button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
							Learn More
						</button>
					</div>
					<div slot="right" class="flex items-center justify-center">
						<div class="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg shadow-xl flex items-center justify-center">
							<span class="text-white text-6xl">🚀</span>
						</div>
					</div>
				</HeroLayout>
			</div>
		</ComponentPreview>

		<!-- Minimal Hero -->
		<ComponentPreview
			title="Minimal Hero Layout"
			description="Clean and minimal hero section with glassmorphic effect"
			codeSnippet={`<HeroLayout variant="minimal" height="h-64">
  <h2 class="text-3xl font-bold mb-2">Minimal Design</h2>
  <p class="text-gray-600">Less is more</p>
</HeroLayout>`}
		>
			<div class="w-full -m-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
				<HeroLayout variant="minimal" height="h-64">
					<h2 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Minimal Design</h2>
					<p class="text-gray-600 dark:text-gray-300">Less is more - focus on what matters</p>
				</HeroLayout>
			</div>
		</ComponentPreview>
	</div>
</section>
