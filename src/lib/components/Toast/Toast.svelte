<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
	export let title: string = '';
	export let message: string = '';
	export let duration: number = 5000; // ms, 0 = persistent
	export let closable: boolean = true;
	export let position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right';
	export let icon: boolean = true;
	export let actions: Array<{ label: string; action: () => void; variant?: 'primary' | 'secondary' }> = [];
	
	const dispatch = createEventDispatcher();
	
	let visible = true;
	let progressBarWidth = 100;
	let progressInterval: number;
	
	onMount(() => {
		if (duration > 0) {
			// Start progress bar animation
			const startTime = Date.now();
			progressInterval = setInterval(() => {
				const elapsed = Date.now() - startTime;
				progressBarWidth = Math.max(0, ((duration - elapsed) / duration) * 100);
				
				if (elapsed >= duration) {
					handleClose();
				}
			}, 50);
		}
		
		return () => {
			if (progressInterval) {
				clearInterval(progressInterval);
			}
		};
	});
	
	function handleClose() {
		visible = false;
		if (progressInterval) {
			clearInterval(progressInterval);
		}
		dispatch('close');
	}
	
	function handleAction(action: () => void) {
		action();
		handleClose();
	}
	
	$: typeConfig = {
		success: {
			icon: '✓',
			colors: 'bg-green-500 text-white',
			progressColor: 'bg-green-300'
		},
		error: {
			icon: '✕',
			colors: 'bg-red-500 text-white',
			progressColor: 'bg-red-300'
		},
		warning: {
			icon: '⚠',
			colors: 'bg-yellow-500 text-white',
			progressColor: 'bg-yellow-300'
		},
		info: {
			icon: 'ℹ',
			colors: 'bg-blue-500 text-white',
			progressColor: 'bg-blue-300'
		}
	};
	
	$: positionClasses = {
		'top-right': 'top-4 right-4',
		'top-left': 'top-4 left-4',
		'bottom-right': 'bottom-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
		'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
	};
	
	$: flyDirection = position.includes('top') 
		? { y: -100 } 
		: position.includes('bottom') 
			? { y: 100 } 
			: position.includes('left') 
				? { x: -100 } 
				: { x: 100 };
</script>

{#if visible}
	<div
		class="fixed z-50 max-w-sm w-full {positionClasses[position]}"
		transition:fly={{ ...flyDirection, duration: 300, easing: quintOut }}
	>
		<div class="rounded-lg shadow-lg overflow-hidden {typeConfig[type].colors}">
			<div class="p-4">
				<div class="flex items-start">
					{#if icon}
						<div class="flex-shrink-0 mr-3">
							<span class="text-xl font-bold">{typeConfig[type].icon}</span>
						</div>
					{/if}
					
					<div class="flex-1 min-w-0">
						{#if title}
							<h3 class="font-semibold text-sm mb-1">{title}</h3>
						{/if}
						{#if message}
							<p class="text-sm opacity-90">{message}</p>
						{/if}
						<slot />
						
						{#if actions.length > 0}
							<div class="mt-3 flex gap-2">
								{#each actions as action}
									<button
										type="button"
										class="px-3 py-1 text-xs font-medium rounded
											   {action.variant === 'primary' 
												? 'bg-white text-gray-900 hover:bg-gray-100' 
												: 'bg-black/20 hover:bg-black/30'} 
											   transition-colors"
										on:click={() => handleAction(action.action)}
									>
										{action.label}
									</button>
								{/each}
							</div>
						{/if}
					</div>
					
					{#if closable}
						<button
							type="button"
							class="flex-shrink-0 ml-3 p-1 rounded-md hover:bg-black/20 transition-colors"
							on:click={handleClose}
							aria-label="Close toast"
						>
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
							</svg>
						</button>
					{/if}
				</div>
			</div>
			
			{#if duration > 0}
				<div class="h-1 bg-black/20">
					<div
						class="h-full transition-all duration-75 ease-linear {typeConfig[type].progressColor}"
						style="width: {progressBarWidth}%"
					></div>
				</div>
			{/if}
		</div>
	</div>
{/if}
