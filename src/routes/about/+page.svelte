<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.js';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>About - Svelte UI Toolkit</title>
	<meta
		name="description"
		content="Learn about Svelte UI Toolkit - a comprehensive collection of modern, responsive UI components built with Svelte and Tailwind CSS."
	/>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-all duration-300"
>
	<!-- Hero Section -->
	<section class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto text-center">
			<div class="animate-fade-in-up" class:opacity-100={mounted} class:opacity-0={!mounted}>
				<h1
					class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
				>
					About Svelte UI Toolkit
				</h1>
				<p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
					A modern, comprehensive collection of UI components designed to accelerate your
					development workflow
				</p>
			</div>
		</div>
	</section>

	<!-- Story Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div class="space-y-6">
					<h2 class="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
					<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
						Svelte UI Toolkit was born from the need for a comprehensive, modern component library
						that doesn't compromise on performance or developer experience. Built with Svelte's
						revolutionary approach to web development, our toolkit provides everything you need to
						create stunning user interfaces.
					</p>
					<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
						We believe in the power of simplicity and elegance. Every component is crafted with
						attention to detail, ensuring both visual appeal and functional excellence. Our toolkit
						is designed to grow with your projects, from simple prototypes to enterprise
						applications.
					</p>
				</div>
				<div class="relative">
					<div
						class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-300"
					>
						<div class="space-y-4">
							<div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<h3 class="text-xl font-bold">Quality First</h3>
							<p class="text-white/90">
								Every component is thoroughly tested and optimized for performance.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					What Makes Us Different
				</h2>
				<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					We've built our toolkit with modern development practices and future-proof technologies
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<div
					class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
				>
					<div
						class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4"
					>
						<svg
							class="w-6 h-6 text-blue-600 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Built with Svelte for optimal performance and minimal bundle size.
					</p>
				</div>

				<div
					class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
				>
					<div
						class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4"
					>
						<svg
							class="w-6 h-6 text-purple-600 dark:text-purple-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Every component works perfectly across all devices and screen sizes.
					</p>
				</div>

				<div
					class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
				>
					<div
						class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
					>
						<svg
							class="w-6 h-6 text-green-600 dark:text-green-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Accessibility First</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Built with WCAG guidelines in mind for inclusive user experiences.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
				<p class="text-gray-600 dark:text-gray-300">
					The principles that guide our development process
				</p>
			</div>

			<div class="space-y-8">
				<div class="flex items-start space-x-4">
					<div
						class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
					>
						<span class="text-white font-bold text-sm">1</span>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
							Developer Experience
						</h3>
						<p class="text-gray-600 dark:text-gray-300">
							We prioritize intuitive APIs and comprehensive documentation to make development
							enjoyable and efficient.
						</p>
					</div>
				</div>

				<div class="flex items-start space-x-4">
					<div
						class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
					>
						<span class="text-white font-bold text-sm">2</span>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Performance</h3>
						<p class="text-gray-600 dark:text-gray-300">
							Every component is optimized for speed and efficiency, ensuring your applications run
							smoothly.
						</p>
					</div>
				</div>

				<div class="flex items-start space-x-4">
					<div
						class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
					>
						<span class="text-white font-bold text-sm">3</span>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Community</h3>
						<p class="text-gray-600 dark:text-gray-300">
							We believe in open source and building tools that benefit the entire development
							community.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
			<p class="text-blue-100 mb-8 text-lg">
				Explore our component library and start building amazing user interfaces today.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/explorer"
					class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
				>
					Explore Components
				</a>
				<a
					href="/contact"
					class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
				>
					Get in Touch
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	.animate-fade-in-up {
		animation: fadeInUp 1s ease-out;
		transition: opacity 0.3s ease-in-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
