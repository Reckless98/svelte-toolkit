<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.js';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	const services = [
		{
			icon: '🎨',
			title: 'UI/UX Design',
			description:
				'Custom design systems and user interfaces that prioritize user experience and visual appeal.',
			features: [
				'Custom Design Systems',
				'Responsive Layouts',
				'User Experience Optimization',
				'Brand Integration',
			],
		},
		{
			icon: '⚡',
			title: 'Frontend Development',
			description:
				'Modern web applications built with cutting-edge technologies and best practices.',
			features: [
				'React & Svelte Development',
				'Progressive Web Apps',
				'Performance Optimization',
				'Cross-browser Compatibility',
			],
		},
		{
			icon: '🔧',
			title: 'Component Libraries',
			description:
				'Reusable component systems that scale with your project and maintain consistency.',
			features: [
				'Custom Component Libraries',
				'Design System Integration',
				'Documentation & Storybook',
				'Testing & Quality Assurance',
			],
		},
		{
			icon: '🚀',
			title: 'Performance Optimization',
			description:
				'Comprehensive performance audits and optimizations for blazing-fast user experiences.',
			features: [
				'Core Web Vitals Optimization',
				'Bundle Size Reduction',
				'Lazy Loading Implementation',
				'Caching Strategies',
			],
		},
		{
			icon: '📱',
			title: 'Mobile Development',
			description: 'Responsive web applications and mobile-first development approaches.',
			features: [
				'Mobile-First Design',
				'Touch-Friendly Interfaces',
				'Offline Functionality',
				'App-like Experiences',
			],
		},
		{
			icon: '🛠️',
			title: 'Consulting & Training',
			description: 'Expert guidance on modern web development practices and team training.',
			features: [
				'Technical Consulting',
				'Code Reviews',
				'Team Training',
				'Best Practices Workshops',
			],
		},
	];
</script>

<svelte:head>
	<title>Services - Svelte UI Toolkit</title>
	<meta
		name="description"
		content="Professional web development services including UI/UX design, frontend development, component libraries, and performance optimization."
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
					Our Services
				</h1>
				<p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
					Professional web development services to bring your digital vision to life
				</p>
			</div>
		</div>
	</section>

	<!-- Services Grid -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each services as service, index}
					<div
						class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						style="animation-delay: {index * 100}ms"
					>
						<div class="text-4xl mb-4">{service.icon}</div>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
						<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
							{service.description}
						</p>

						<div class="space-y-2">
							{#each service.features as feature}
								<div class="flex items-center space-x-2">
									<svg
										class="w-4 h-4 text-green-500 flex-shrink-0"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h2>
				<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					A structured approach to deliver exceptional results on time and within budget
				</p>
			</div>

			<div class="grid md:grid-cols-4 gap-8">
				<div class="text-center">
					<div
						class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
					</div>
					<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Discovery</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Understanding your needs, goals, and technical requirements
					</p>
				</div>

				<div class="text-center">
					<div
						class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
					</div>
					<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Planning</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Creating detailed project roadmaps and technical specifications
					</p>
				</div>

				<div class="text-center">
					<div
						class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
					</div>
					<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Development</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Building with modern technologies and best practices
					</p>
				</div>

				<div class="text-center">
					<div
						class="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
					</div>
					<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Delivery</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Testing, optimization, and seamless deployment
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Technologies Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technologies We Use</h2>
				<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Cutting-edge tools and frameworks to build modern, scalable applications
				</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
				{#each ['Svelte', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Vite'] as tech}
					<div
						class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
					>
						<div class="text-2xl mb-2">⚡</div>
						<h4 class="font-semibold text-gray-900 dark:text-white text-sm">{tech}</h4>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Flexible Pricing</h2>
				<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Choose the engagement model that works best for your project
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Project-Based</h3>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						Fixed scope, timeline, and budget for well-defined projects.
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Clear deliverables</span>
						</li>
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Fixed budget</span>
						</li>
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Milestone-based payments</span>
						</li>
					</ul>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-blue-500">
					<div class="flex items-center justify-between mb-2">
						<h3 class="text-xl font-bold text-gray-900 dark:text-white">Hourly Rate</h3>
						<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
					</div>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						Flexible engagement for ongoing development and consulting.
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Flexible scope</span>
						</li>
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Quick turnaround</span>
						</li>
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Weekly billing</span>
						</li>
					</ul>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Retainer</h3>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						Ongoing partnership for continuous development and support.
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Priority support</span>
						</li>
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Discounted rates</span>
						</li>
						<li class="flex items-center space-x-2">
							<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-gray-600 dark:text-gray-300">Monthly commitment</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
			<p class="text-blue-100 mb-8 text-lg">
				Let's discuss how we can help bring your vision to life with modern web technologies.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/contact"
					class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
				>
					Get a Quote
				</a>
				<a
					href="/explorer"
					class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
				>
					View Our Work
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
