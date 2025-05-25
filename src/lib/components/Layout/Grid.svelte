<!-- Grid Component - CSS Grid layout with responsive capabilities -->
<script lang="ts">
	export let cols: number | string = 'auto';
	export let rows: number | string = 'auto';
	export let gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let responsive: boolean = true;
	export let alignItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
	export let justifyItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
	export let className: string = '';
	
	const gapClasses = {
		none: 'gap-0',
		xs: 'gap-1',
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6',
		xl: 'gap-8'
	};
	
	const alignClasses = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch'
	};
	
	const justifyClasses = {
		start: 'justify-items-start',
		center: 'justify-items-center',
		end: 'justify-items-end',
		stretch: 'justify-items-stretch'
	};
	
	$: colsClass = typeof cols === 'number' 
		? `grid-cols-${cols}` 
		: responsive 
			? `grid-cols-1 md:grid-cols-${cols}` 
			: `grid-cols-${cols}`;
	
	$: rowsClass = typeof rows === 'number' 
		? `grid-rows-${rows}` 
		: rows !== 'auto' 
			? `grid-rows-${rows}` 
			: '';
	
	$: gridClasses = [
		'grid',
		colsClass,
		rowsClass,
		gapClasses[gap],
		alignClasses[alignItems],
		justifyClasses[justifyItems],
		className
	].filter(Boolean).join(' ');
</script>

<div class={gridClasses}>
	<slot />
</div>
