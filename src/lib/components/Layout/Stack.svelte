<!-- Stack Component - Vertical/horizontal stacking with consistent spacing -->
<script lang="ts">
	export let direction: 'vertical' | 'horizontal' = 'vertical';
	export let spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'start';
	export let divider: boolean = false;
	export let className: string = '';
	
	const spacingClasses = {
		none: 'gap-0',
		xs: 'gap-1',
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6',
		xl: 'gap-8',
		'2xl': 'gap-12'
	};
	
	const alignClasses = {
		start: direction === 'vertical' ? 'items-start' : 'items-start',
		center: direction === 'vertical' ? 'items-center' : 'items-center',
		end: direction === 'vertical' ? 'items-end' : 'items-end',
		stretch: direction === 'vertical' ? 'items-stretch' : 'items-stretch'
	};
	
	$: stackClasses = [
		'flex',
		direction === 'vertical' ? 'flex-col' : 'flex-row',
		spacingClasses[spacing],
		alignClasses[align],
		className
	].filter(Boolean).join(' ');
</script>

<div class={stackClasses}>
	{#if divider}
		{#each Array.from({ length: $$slots.default ? 1 : 0 }) as _, i}
			<slot />
			{#if i < ($$slots.default ? 0 : -1)}
				<div class={direction === 'vertical' 
					? 'h-px bg-gray-200 dark:bg-gray-700' 
					: 'w-px bg-gray-200 dark:bg-gray-700'}
				></div>
			{/if}
		{/each}
	{:else}
		<slot />
	{/if}
</div>
