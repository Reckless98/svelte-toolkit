<!-- Section Component - Semantic section wrapper with consistent styling -->
<script lang="ts">
	export let variant: 'default' | 'primary' | 'secondary' | 'accent' = 'default';
	export let padding: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	export let fullHeight: boolean = false;
	export let center: boolean = false;
	export let className: string = '';
	
	const variantClasses = {
		default: 'bg-transparent',
		primary: 'bg-blue-50 dark:bg-blue-900/20',
		secondary: 'bg-gray-50 dark:bg-gray-800/50',
		accent: 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
	};
	
	const paddingClasses = {
		none: '',
		sm: 'py-8',
		md: 'py-12',
		lg: 'py-16',
		xl: 'py-24'
	};
	
	$: sectionClasses = [
		variantClasses[variant],
		paddingClasses[padding],
		fullHeight ? 'min-h-screen' : '',
		center ? 'flex items-center justify-center' : '',
		className
	].filter(Boolean).join(' ');
</script>

<section class={sectionClasses}>
	<slot />
</section>
