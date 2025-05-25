<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	interface Tab {
		id: string;
		label: string;
		icon?: string;
		disabled?: boolean;
		badge?: string | number;
		href?: string;
	}
	
	export let tabs: Tab[] = [];
	export let activeTab: string = '';
	export let variant: 'default' | 'pills' | 'underline' | 'cards' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let fullWidth: boolean = false;
	export let scrollable: boolean = false;
	export let centered: boolean = false;
	export let vertical: boolean = false;
	
	const dispatch = createEventDispatcher();
	
	let tabsContainer: HTMLElement;
	let activeIndicator: HTMLElement;
	
	// Set initial active tab if not provided
	$: if (!activeTab && tabs.length > 0) {
		activeTab = tabs[0].id;
	}
	
	function handleTabClick(tab: Tab) {
		if (tab.disabled) return;
		
		activeTab = tab.id;
		dispatch('change', { tab, activeTab: tab.id });
		
		// Update active indicator position
		updateIndicator();
	}
	
	function updateIndicator() {
		if (!activeIndicator || variant !== 'underline') return;
		
		const activeButton = tabsContainer?.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement;
		if (activeButton) {
			const rect = activeButton.getBoundingClientRect();
			const containerRect = tabsContainer.getBoundingClientRect();
			
			if (vertical) {
				activeIndicator.style.top = `${activeButton.offsetTop}px`;
				activeIndicator.style.height = `${rect.height}px`;
			} else {
				activeIndicator.style.left = `${activeButton.offsetLeft}px`;
				activeIndicator.style.width = `${rect.width}px`;
			}
		}
	}
	
	$: if (activeTab && tabsContainer) {
		setTimeout(updateIndicator, 10);
	}
	
	$: sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};
	
	$: containerClasses = `
		${vertical ? 'flex-col' : 'flex'}
		${fullWidth && !vertical ? 'w-full' : ''}
		${centered && !vertical ? 'justify-center' : ''}
		${scrollable && !vertical ? 'overflow-x-auto' : ''}
		${variant === 'cards' ? 'gap-1' : variant === 'pills' ? 'gap-1' : ''}
	`.trim();
	
	function getTabClasses(tab: Tab): string {
		const isActive = tab.id === activeTab;
		const baseClasses = `
			relative transition-all duration-200 font-medium whitespace-nowrap
			${sizeClasses[size]}
			${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
			${fullWidth && !vertical ? 'flex-1 text-center' : ''}
		`;
		
		switch (variant) {
			case 'pills':
				return `${baseClasses} rounded-lg ${
					isActive 
						? 'bg-blue-500 text-white shadow-sm' 
						: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
				}`;
			
			case 'underline':
				return `${baseClasses} border-b-2 ${
					isActive 
						? 'border-blue-500 text-blue-600 dark:text-blue-400' 
						: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
				}`;
			
			case 'cards':
				return `${baseClasses} rounded-t-lg border-l border-r border-t ${
					isActive 
						? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100' 
						: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
				}`;
			
			default:
				return `${baseClasses} ${
					isActive 
						? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
						: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
				} rounded-lg`;
		}
	}
</script>

<div class="w-full">
	<div 
		class="relative flex {containerClasses}"
		bind:this={tabsContainer}
	>
		{#if variant === 'underline'}
			<div
				bind:this={activeIndicator}
				class="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-200 ease-out
					   {vertical ? 'left-0 w-0.5 h-8' : 'top-auto'}"
				style={vertical ? 'left: 0; width: 2px;' : 'bottom: 0; height: 2px;'}
			></div>
		{/if}
		
		{#each tabs as tab (tab.id)}
			{#if tab.href}
				<a
					href={tab.href}
					class={getTabClasses(tab)}
					data-tab={tab.id}
					aria-selected={tab.id === activeTab}
					role="tab"
				>
					<div class="flex items-center gap-2">
						{#if tab.icon}
							<span class="text-current">{tab.icon}</span>
						{/if}
						<span>{tab.label}</span>
						{#if tab.badge}
							<span class="
								ml-1 px-1.5 py-0.5 text-xs font-medium rounded-full
								{tab.id === activeTab 
									? 'bg-white/20 text-current' 
									: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
								}
							">
								{tab.badge}
							</span>
						{/if}
					</div>
				</a>
			{:else}
				<button
					type="button"
					class={getTabClasses(tab)}
					data-tab={tab.id}
					disabled={tab.disabled}
					aria-selected={tab.id === activeTab}
					role="tab"
					on:click={() => handleTabClick(tab)}
				>
					<div class="flex items-center gap-2">
						{#if tab.icon}
							<span class="text-current">{tab.icon}</span>
						{/if}
						<span>{tab.label}</span>
						{#if tab.badge}
							<span class="
								ml-1 px-1.5 py-0.5 text-xs font-medium rounded-full
								{tab.id === activeTab 
									? 'bg-white/20 text-current' 
									: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
								}
							">
								{tab.badge}
							</span>
						{/if}
					</div>
				</button>
			{/if}
		{/each}
	</div>
	
	{#if variant === 'cards'}
		<div class="border-t border-gray-200 dark:border-gray-600 -mt-px"></div>
	{/if}
	
	<div class="mt-4">
		<slot {activeTab} />
	</div>
</div>
