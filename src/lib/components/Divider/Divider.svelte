<!-- Reusable Divider Component -->
<script context="module" lang="ts">
	export type DividerOrientation = 'horizontal' | 'vertical';
	export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient';
	export type DividerSize = 'sm' | 'md' | 'lg';
	export type DividerColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo';
</script>

<script lang="ts">
	// Props
	export let orientation: DividerOrientation = 'horizontal';
	export let variant: DividerVariant = 'solid';
	export let size: DividerSize = 'md';
	export let color: DividerColor = 'gray';
	export let label: string = '';
	export let spacing: string = '';
	export let opacity: number = 100;
	export let length: string = '';
	export let rounded: boolean = false;

	// Size classes for thickness
	const sizeClasses = {
		sm: 'border-t border-l',
		md: 'border-t-2 border-l-2',
		lg: 'border-t-4 border-l-4'
	};

	// Color classes
	const colorClasses = {
		gray: 'border-gray-300 dark:border-gray-600',
		blue: 'border-blue-300 dark:border-blue-600',
		green: 'border-green-300 dark:border-green-600',
		red: 'border-red-300 dark:border-red-600',
		yellow: 'border-yellow-300 dark:border-yellow-600',
		purple: 'border-purple-300 dark:border-purple-600',
		pink: 'border-pink-300 dark:border-pink-600',
		indigo: 'border-indigo-300 dark:border-indigo-600'
	};

	// Variant styles
	const variantClasses = {
		solid: '',
		dashed: 'border-dashed',
		dotted: 'border-dotted',
		double: 'border-double',
		gradient: ''
	};

	// Spacing classes
	const spacingClasses = {
		horizontal: spacing || 'my-4',
		vertical: spacing || 'mx-4'
	};

	// Length classes
	const lengthClass = length || (orientation === 'horizontal' ? 'w-full' : 'h-full');

	// Gradient background for gradient variant
	const gradientBg = {
		gray: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600',
		blue: 'bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-600',
		green: 'bg-gradient-to-r from-transparent via-green-300 to-transparent dark:via-green-600',
		red: 'bg-gradient-to-r from-transparent via-red-300 to-transparent dark:via-red-600',
		yellow: 'bg-gradient-to-r from-transparent via-yellow-300 to-transparent dark:via-yellow-600',
		purple: 'bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-600',
		pink: 'bg-gradient-to-r from-transparent via-pink-300 to-transparent dark:via-pink-600',
		indigo: 'bg-gradient-to-r from-transparent via-indigo-300 to-transparent dark:via-indigo-600'
	};

	// Label text color
	const labelColors = {
		gray: 'text-gray-500 dark:text-gray-400',
		blue: 'text-blue-500 dark:text-blue-400',
		green: 'text-green-500 dark:text-green-400',
		red: 'text-red-500 dark:text-red-400',
		yellow: 'text-yellow-500 dark:text-yellow-400',
		purple: 'text-purple-500 dark:text-purple-400',
		pink: 'text-pink-500 dark:text-pink-400',
		indigo: 'text-indigo-500 dark:text-indigo-400'
	};
</script>

{#if orientation === 'horizontal'}
	{#if label}
		<!-- Horizontal divider with label -->
		<div class="relative flex items-center {spacingClasses.horizontal}">
			<div class="flex-grow {variant === 'gradient' ? gradientBg[color] + ' h-px' : sizeClasses[size] + ' ' + colorClasses[color] + ' ' + variantClasses[variant]}" style="opacity: {opacity}%"></div>
			<span class="flex-shrink-0 px-4 text-sm font-medium {labelColors[color]}">
				{label}
			</span>
			<div class="flex-grow {variant === 'gradient' ? gradientBg[color] + ' h-px' : sizeClasses[size] + ' ' + colorClasses[color] + ' ' + variantClasses[variant]}" style="opacity: {opacity}%"></div>
		</div>
	{:else}
		<!-- Simple horizontal divider -->
		<hr 
			class="{lengthClass} {variant === 'gradient' ? gradientBg[color] + ' h-px border-0' : sizeClasses[size] + ' ' + colorClasses[color] + ' ' + variantClasses[variant]} {spacingClasses.horizontal} {rounded ? 'rounded-full' : ''}"
			style="opacity: {opacity}%"
		/>
	{/if}
{:else}
	{#if label}
		<!-- Vertical divider with label -->
		<div class="relative flex flex-col items-center {spacingClasses.vertical}">
			<div class="flex-grow {variant === 'gradient' ? gradientBg[color].replace('to-r', 'to-b') + ' w-px' : sizeClasses[size] + ' ' + colorClasses[color] + ' ' + variantClasses[variant]}" style="opacity: {opacity}%"></div>
			<span class="flex-shrink-0 py-2 text-sm font-medium {labelColors[color]} transform -rotate-90 whitespace-nowrap">
				{label}
			</span>
			<div class="flex-grow {variant === 'gradient' ? gradientBg[color].replace('to-r', 'to-b') + ' w-px' : sizeClasses[size] + ' ' + colorClasses[color] + ' ' + variantClasses[variant]}" style="opacity: {opacity}%"></div>
		</div>
	{:else}
		<!-- Simple vertical divider -->
		<div 
			class="{lengthClass} {variant === 'gradient' ? gradientBg[color].replace('to-r', 'to-b') + ' w-px' : sizeClasses[size] + ' ' + colorClasses[color] + ' ' + variantClasses[variant]} {spacingClasses.vertical} {rounded ? 'rounded-full' : ''}"
			style="opacity: {opacity}%"
			role="separator"
			aria-orientation="vertical"
		></div>
	{/if}
{/if}
