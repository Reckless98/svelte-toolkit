<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.js';

	interface FormStatus {
		type: 'success' | 'error';
		message: string;
	}

	let mounted = false;
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: '',
	};
	let formStatus: FormStatus | null = null;

	onMount(() => {
		mounted = true;
	});

	function handleSubmit() {
		// Simple form validation
		if (!formData.name || !formData.email || !formData.message) {
			formStatus = { type: 'error', message: 'Please fill in all required fields.' };
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			formStatus = { type: 'error', message: 'Please enter a valid email address.' };
			return;
		}

		// Simulate form submission
		formStatus = {
			type: 'success',
			message: "Thank you for your message! We'll get back to you soon.",
		};

		// Reset form
		formData = {
			name: '',
			email: '',
			subject: '',
			message: '',
		};

		// Clear status after 5 seconds
		setTimeout(() => {
			formStatus = null;
		}, 5000);
	}

	const contactInfo = [
		{
			icon: '✉️',
			title: 'Email',
			value: 'filipwolf@gmail.com',
			description: 'Send us an email for any inquiries',
		},
		{
			icon: '📍',
			title: 'Locations',
			value: 'Belgrade, Serbia & Zagreb, Croatia',
			description: 'Available for remote and local projects',
		},
		{
			icon: '💬',
			title: 'Response Time',
			value: 'Within 24 hours',
			description: 'We typically respond quickly',
		},
	];
</script>

<svelte:head>
	<title>Contact - Svelte UI Toolkit</title>
	<meta
		name="description"
		content="Get in touch with our team for web development projects, consulting, or questions about Svelte UI Toolkit."
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
					Get in Touch
				</h1>
				<p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
					Ready to start your next project? Let's discuss how we can help bring your ideas to life.
				</p>
			</div>
		</div>
	</section>

	<!-- Contact Info Cards -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-6xl mx-auto">
			<div class="grid md:grid-cols-3 gap-8 mb-16">
				{#each contactInfo as info, index}
					<div
						class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
						style="animation-delay: {index * 100}ms"
					>
						<div class="text-4xl mb-4">{info.icon}</div>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
						<p class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">{info.value}</p>
						<p class="text-gray-600 dark:text-gray-300 text-sm">{info.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Form & Info -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-6xl mx-auto">
			<div class="grid lg:grid-cols-2 gap-12">
				<!-- Contact Form -->
				<div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
					<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>

					{#if formStatus}
						<div
							class="mb-6 p-4 rounded-lg {formStatus.type === 'success'
								? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
								: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}"
						>
							{formStatus.message}
						</div>
					{/if}

					<form on:submit|preventDefault={handleSubmit} class="space-y-6">
						<div class="grid md:grid-cols-2 gap-6">
							<div>
								<label
									for="name"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Name *
								</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
									placeholder="Your full name"
								/>
							</div>
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Email *
								</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
									placeholder="your.email@example.com"
								/>
							</div>
						</div>

						<div>
							<label
								for="subject"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Subject
							</label>
							<input
								type="text"
								id="subject"
								bind:value={formData.subject}
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
								placeholder="Project inquiry, consultation, etc."
							/>
						</div>

						<div>
							<label
								for="message"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Message *
							</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="6"
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-vertical"
								placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
							></textarea>
						</div>

						<button
							type="submit"
							class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
						>
							Send Message
						</button>
					</form>
				</div>

				<!-- Additional Info -->
				<div class="space-y-8">
					<!-- About -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
						<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							Let's Work Together
						</h3>
						<p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
							We're passionate about creating exceptional web experiences. Whether you need a
							complete web application, UI components, or consulting on your existing project, we're
							here to help.
						</p>

						<div class="space-y-4">
							<div class="flex items-center space-x-3">
								<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="text-gray-700 dark:text-gray-300">Free initial consultation</span>
							</div>
							<div class="flex items-center space-x-3">
								<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="text-gray-700 dark:text-gray-300">Competitive pricing</span>
							</div>
							<div class="flex items-center space-x-3">
								<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="text-gray-700 dark:text-gray-300">Ongoing support</span>
							</div>
						</div>
					</div>

					<!-- Quick Contact -->
					<div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
						<h3 class="text-2xl font-bold mb-4">Prefer Email?</h3>
						<p class="mb-6 text-blue-100">
							Drop us a line directly for quick questions or project discussions.
						</p>
						<a
							href="mailto:filipwolf@gmail.com"
							class="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span>filipwolf@gmail.com</span>
						</a>
					</div>

					<!-- FAQ -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
						<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked</h3>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-2">
									What's your typical response time?
								</h4>
								<p class="text-gray-600 dark:text-gray-300 text-sm">
									We usually respond within 24 hours, often much sooner.
								</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-2">
									Do you work with international clients?
								</h4>
								<p class="text-gray-600 dark:text-gray-300 text-sm">
									Absolutely! We work with clients worldwide and are flexible with time zones.
								</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-2">
									What's included in the consultation?
								</h4>
								<p class="text-gray-600 dark:text-gray-300 text-sm">
									Initial consultations are free and include project assessment, recommendations,
									and timeline estimates.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Location Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Locations</h2>
				<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Based in the heart of the Balkans, serving clients globally
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8">
				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
					<div class="text-4xl mb-4">🇷🇸</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Belgrade, Serbia</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Our primary base in one of Europe's most vibrant tech hubs
					</p>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
					<div class="text-4xl mb-4">🇭🇷</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Zagreb, Croatia</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Expanding our presence in the beautiful capital of Croatia
					</p>
				</div>
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
