<script>
	import ScrollReveal from '$animations/ScrollReveal.svelte';
	
	const skills = [
		{ name: 'Svelte', level: 95, color: 'from-orange-400 to-red-500' },
		{ name: 'TypeScript', level: 90, color: 'from-blue-400 to-blue-600' },
		{ name: 'TailwindCSS', level: 95, color: 'from-cyan-400 to-blue-500' },
		{ name: 'Animation', level: 85, color: 'from-purple-400 to-pink-500' },
		{ name: 'Accessibility', level: 90, color: 'from-green-400 to-emerald-500' },
		{ name: 'Performance', level: 88, color: 'from-yellow-400 to-orange-500' }
	];
</script>

<section class="py-20 px-4 bg-white dark:bg-gray-900">
	<div class="container mx-auto max-w-6xl">
		<ScrollReveal animation="fade">
			<h2 class="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
				Built with Modern Technologies
			</h2>
		</ScrollReveal>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each skills as skill, i}
				<ScrollReveal animation="fly" x={i % 2 === 0 ? -30 : 30} delay={i * 100}>
					<div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
						<div class="flex justify-between items-center mb-3">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								{skill.name}
							</h3>
							<span class="text-sm font-medium text-gray-600 dark:text-gray-400">
								{skill.level}%
							</span>
						</div>
						<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
							<div
								class="h-full bg-gradient-to-r {skill.color} transition-all duration-1000 ease-out rounded-full"
								style="width: {skill.level}%"
							></div>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
