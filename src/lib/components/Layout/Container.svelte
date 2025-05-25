<!-- Container Component - Responsive container with flexible sizing and padding -->
<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg';
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
	export let center: boolean = true;
	export let fluid: boolean = false;
	export let className: string = '';
	
	const sizeClasses = {
		sm: 'max-w-3xl',
		md: 'max-w-5xl', 
		lg: 'max-w-7xl',
		xl: 'max-w-[1400px]',
		full: 'max-w-none'
	};
	
	const paddingClasses = {
		none: '',
		sm: 'px-4 py-2',
		md: 'px-6 py-4',
		lg: 'px-8 py-6'
	};
	
	$: containerClasses = [
		fluid ? 'w-full' : sizeClasses[size],
		center ? 'mx-auto' : '',
		paddingClasses[padding],
		className
	].filter(Boolean).join(' ');
</script>

<div class={containerClasses}>
	<slot />
</div>
