<!-- Sidebar Component - Reusable sidebar layout component -->
<script lang="ts">
	export let position: 'left' | 'right' = 'left';
	export let width: string = '256px';
	export let collapsible: boolean = false;
	export let collapsed: boolean = false;
	export let overlay: boolean = false;
	export let className: string = '';
	
	let isOpen = !collapsed;
	
	function toggle() {
		if (collapsible) {
			isOpen = !isOpen;
		}
	}
	
	$: sidebarClasses = [
		'fixed inset-y-0 z-50 transform transition-transform duration-300',
		position === 'left' ? 'left-0' : 'right-0',
		isOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full',
		'bg-white dark:bg-gray-900 border-r dark:border-gray-700',
		className
	].filter(Boolean).join(' ');
	
	$: overlayClasses = [
		'fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300',
		overlay && isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
	].join(' ');
</script>

{#if overlay}
	<!-- Overlay -->
	<div class={overlayClasses} on:click={toggle} role="button" tabindex="0" on:keydown></div>
{/if}

<!-- Sidebar -->
<aside 
	class={sidebarClasses}
	style="width: {width}"
>
	{#if collapsible}
		<div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
			<slot name="header" />
			<button 
				type="button"
				on:click={toggle}
				class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				aria-label="Toggle sidebar"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/if}
	
	<div class="h-full {collapsible ? 'pt-0' : 'pt-4'}">
		<slot />
	</div>
</aside>
