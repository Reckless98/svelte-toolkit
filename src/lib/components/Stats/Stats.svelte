<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	
	interface StatItem {
		id: string;
		label: string;
		value: number;
		unit?: string;
		prefix?: string;
		suffix?: string;
		icon?: string;
		color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
		trend?: {
			direction: 'up' | 'down' | 'neutral';
			value: number;
			period?: string;
		};
		description?: string;
	}
	
	export let stats: StatItem[] = [];
	export let layout: 'grid' | 'row' | 'column' = 'grid';
	export let variant: 'default' | 'cards' | 'minimal' | 'detailed' = 'default';
	export let animated: boolean = true;
	export let showTrends: boolean = true;
	export let columns: number = 0; // 0 = auto
	export let loading: boolean = false;
	
	const animatedValues = new Map();
	
	onMount(() => {
		if (animated) {
			stats.forEach(stat => {
				const tween = tweened(0, {
					duration: 1500,
					easing: cubicOut
				});
				animatedValues.set(stat.id, tween);
				tween.set(stat.value);
			});
		}
	});
	
	$: if (animated && stats.length > 0) {
		stats.forEach(stat => {
			if (animatedValues.has(stat.id)) {
				animatedValues.get(stat.id).set(stat.value);
			}
		});
	}
	
	function formatValue(value: number, stat: StatItem): string {
		const displayValue = animated && animatedValues.has(stat.id) 
			? animatedValues.get(stat.id) 
			: { subscribe: (fn: (value: number) => void) => fn(value) };
		
		let formattedValue = '';
		
		displayValue.subscribe((val: number) => {
			if (val >= 1000000) {
				formattedValue = (val / 1000000).toFixed(1) + 'M';
			} else if (val >= 1000) {
				formattedValue = (val / 1000).toFixed(1) + 'K';
			} else {
				formattedValue = Math.round(val).toString();
			}
		});
		
		return `${stat.prefix || ''}${formattedValue}${stat.unit || ''}${stat.suffix || ''}`;
	}
	
	function getColorClasses(color?: string) {
		const colors = {
			blue: {
				background: 'bg-blue-50 dark:bg-blue-900/20',
				text: 'text-blue-600 dark:text-blue-400',
				icon: 'text-blue-500'
			},
			green: {
				background: 'bg-green-50 dark:bg-green-900/20',
				text: 'text-green-600 dark:text-green-400',
				icon: 'text-green-500'
			},
			red: {
				background: 'bg-red-50 dark:bg-red-900/20',
				text: 'text-red-600 dark:text-red-400',
				icon: 'text-red-500'
			},
			yellow: {
				background: 'bg-yellow-50 dark:bg-yellow-900/20',
				text: 'text-yellow-600 dark:text-yellow-400',
				icon: 'text-yellow-500'
			},
			purple: {
				background: 'bg-purple-50 dark:bg-purple-900/20',
				text: 'text-purple-600 dark:text-purple-400',
				icon: 'text-purple-500'
			},
			gray: {
				background: 'bg-gray-50 dark:bg-gray-800',
				text: 'text-gray-600 dark:text-gray-400',
				icon: 'text-gray-500'
			}
		};
		return colors[color as keyof typeof colors] || colors.gray;
	}
	
	function getTrendIcon(direction: string) {
		const icons = {
			up: '↗',
			down: '↘',
			neutral: '→'
		};
		return icons[direction as keyof typeof icons] || '→';
	}
	
	function getTrendColor(direction: string) {
		const colors = {
			up: 'text-green-500',
			down: 'text-red-500',
			neutral: 'text-gray-500'
		};
		return colors[direction as keyof typeof colors] || 'text-gray-500';
	}
	
	$: gridClasses = layout === 'grid' 
		? `grid gap-4 ${columns > 0 
			? `grid-cols-${Math.min(columns, stats.length)}` 
			: stats.length === 1 ? 'grid-cols-1' 
			: stats.length === 2 ? 'grid-cols-1 md:grid-cols-2'
			: stats.length === 3 ? 'grid-cols-1 md:grid-cols-3'
			: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`
		: layout === 'row' 
			? 'flex flex-wrap gap-4' 
			: 'space-y-4';
</script>

{#if loading}
	<div class="flex items-center justify-center py-12">
		<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
		<span class="ml-3 text-gray-500 dark:text-gray-400">Loading stats...</span>
	</div>
{:else}
	<div class={gridClasses}>
		{#each stats as stat, i (stat.id)}
			<div
				class="
					{variant === 'cards' 
						? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
						: variant === 'minimal'
							? 'p-4'
							: variant === 'detailed'
								? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6'
								: 'p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
					}
					{layout === 'row' ? 'flex-1 min-w-0' : ''}
				"
				transition:fly={{ y: 20, duration: 300, delay: i * 100 }}
			>
				<div class="flex items-start justify-between">
					<div class="flex-1 min-w-0">
						{#if stat.icon}
							<div class="flex items-center gap-3 mb-2">
								<div class="
									{variant === 'minimal' 
										? 'w-8 h-8'
										: 'w-10 h-10'
									} rounded-lg flex items-center justify-center
									{getColorClasses(stat.color).background}
								">
									<span class="text-lg {getColorClasses(stat.color).icon}">
										{stat.icon}
									</span>
								</div>
								{#if variant !== 'minimal'}
									<div>
										<h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
											{stat.label}
										</h3>
									</div>
								{/if}
							</div>
						{:else if variant !== 'minimal'}
							<h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 truncate">
								{stat.label}
							</h3>
						{/if}
						
						<div class="flex items-baseline gap-2">
							<span class="
								{variant === 'minimal' 
									? 'text-xl'
									: variant === 'detailed'
										? 'text-3xl'
										: 'text-2xl'
								} font-bold text-gray-900 dark:text-gray-100
							">
								{formatValue(stat.value, stat)}
							</span>
							
							{#if showTrends && stat.trend}
								<div class="flex items-center gap-1">
									<span class="{getTrendColor(stat.trend.direction)} text-sm">
										{getTrendIcon(stat.trend.direction)}
									</span>
									<span class="text-sm {getTrendColor(stat.trend.direction)}">
										{stat.trend.value}%
									</span>
									{#if stat.trend.period}
										<span class="text-xs text-gray-500 dark:text-gray-400">
											{stat.trend.period}
										</span>
									{/if}
								</div>
							{/if}
						</div>
						
						{#if variant === 'minimal' && stat.icon}
							<p class="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
								{stat.label}
							</p>
						{/if}
						
						{#if stat.description && variant === 'detailed'}
							<p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
								{stat.description}
							</p>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
