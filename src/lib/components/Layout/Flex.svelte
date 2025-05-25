<!-- Flex Component - Flexbox wrapper with common utilities -->
<script lang="ts">
	export let direction: 'row' | 'col' | 'row-reverse' | 'col-reverse' = 'row';
	export let align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'start';
	export let justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
	export let wrap: boolean = false;
	export let gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'none';
	export let className: string = '';
	
	const directionClasses = {
		row: 'flex-row',
		col: 'flex-col',
		'row-reverse': 'flex-row-reverse',
		'col-reverse': 'flex-col-reverse'
	};
	
	const alignClasses = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch',
		baseline: 'items-baseline'
	};
	
	const justifyClasses = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		between: 'justify-between',
		around: 'justify-around',
		evenly: 'justify-evenly'
	};
	
	const gapClasses = {
		none: '',
		xs: 'gap-1',
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6',
		xl: 'gap-8'
	};
	
	$: flexClasses = [
		'flex',
		directionClasses[direction],
		alignClasses[align],
		justifyClasses[justify],
		wrap ? 'flex-wrap' : '',
		gapClasses[gap],
		className
	].filter(Boolean).join(' ');
</script>

<div class={flexClasses}>
	<slot />
</div>
