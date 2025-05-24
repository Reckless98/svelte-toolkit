<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let value: number = 0;
	export let max: number = 100;
	export let variant: 'linear' | 'circular' | 'steps' = 'linear';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' = 'blue';
	export let showLabel: boolean = true;
	export let animated: boolean = true;
	export let striped: boolean = false;
	export let steps: number = 4; // For step variant
	export let indeterminate: boolean = false;

	const progress = tweened(0, {
		duration: animated ? 800 : 0,
		easing: cubicOut
	});

	onMount(() => {
		if (!indeterminate) {
			progress.set(value);
		}
	});

	$: if (!indeterminate) {
		progress.set(value);
	}

	$: percentage = Math.round(($progress / max) * 100);
	
	$: colorClasses = {
		blue: 'bg-blue-500',
		green: 'bg-green-500',
		red: 'bg-red-500',
		yellow: 'bg-yellow-500',
		purple: 'bg-purple-500',
		gray: 'bg-gray-500'
	};

	$: sizeClasses = {
		sm: variant === 'linear' ? 'h-1' : 'w-8 h-8',
		md: variant === 'linear' ? 'h-2' : 'w-12 h-12',
		lg: variant === 'linear' ? 'h-3' : 'w-16 h-16'
	};

	$: currentStep = Math.floor((value / max) * steps);
</script>

<div class="w-full">
	{#if showLabel && variant !== 'circular'}
		<div class="flex justify-between items-center mb-2">
			<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
				<slot name="label">Progress</slot>
			</span>
			{#if !indeterminate}
				<span class="text-sm text-gray-500 dark:text-gray-400">{percentage}%</span>
			{/if}
		</div>
	{/if}

	{#if variant === 'linear'}
		<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden {sizeClasses[size]}">
			{#if indeterminate}
				<div class="h-full bg-gradient-to-r {colorClasses[color]} animate-pulse opacity-75"></div>
				<div class="h-full {colorClasses[color]} animate-bounce" style="width: 30%; margin-left: -30%; animation-duration: 1.5s;"></div>
			{:else}
				<div
					class="h-full {colorClasses[color]} transition-all duration-300 ease-out {striped ? 'bg-stripes' : ''}"
					style="width: {percentage}%"
				></div>
			{/if}
		</div>
	{:else if variant === 'circular'}
		<div class="relative {sizeClasses[size]} mx-auto">
			<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
				<path
					class="stroke-gray-200 dark:stroke-gray-700"
					stroke-width="3"
					fill="none"
					d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				{#if !indeterminate}
					<path
						class="stroke-current {colorClasses[color].replace('bg-', 'text-')}"
						stroke-width="3"
						stroke-linecap="round"
						fill="none"
						stroke-dasharray="{percentage}, 100"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
				{:else}
					<path
						class="stroke-current {colorClasses[color].replace('bg-', 'text-')} animate-spin"
						stroke-width="3"
						stroke-linecap="round"
						fill="none"
						stroke-dasharray="25, 75"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						style="animation-duration: 1.5s;"
					/>
				{/if}
			</svg>
			{#if showLabel && !indeterminate}
				<div class="absolute inset-0 flex items-center justify-center">
					<span class="text-xs font-semibold text-gray-700 dark:text-gray-300">{percentage}%</span>
				</div>
			{/if}
		</div>
	{:else if variant === 'steps'}
		<div class="flex gap-2">
			{#each Array(steps) as _, i}
				<div
					class="flex-1 h-2 rounded-full transition-all duration-300 {
						i < currentStep 
							? colorClasses[color] 
							: i === currentStep 
								? `${colorClasses[color]} opacity-50` 
								: 'bg-gray-200 dark:bg-gray-700'
					}"
				></div>
			{/each}
		</div>
		{#if showLabel}
			<div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
				<span>Step {currentStep + 1} of {steps}</span>
				<span>{percentage}%</span>
			</div>
		{/if}
	{/if}
</div>

<style>
	.bg-stripes {
		background-image: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 4px,
			rgba(255, 255, 255, 0.2) 4px,
			rgba(255, 255, 255, 0.2) 8px
		);
	}
	
	@keyframes indeterminate {
		0% { left: -35%; right: 100%; }
		60% { left: 100%; right: -90%; }
		100% { left: 100%; right: -90%; }
	}
</style>
