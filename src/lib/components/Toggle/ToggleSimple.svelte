<script lang="ts">
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: string = 'blue';
	export let label: string = '';
	
	const sizes = {
		sm: 'w-8 h-4',
		md: 'w-10 h-5',
		lg: 'w-12 h-6'
	};
	
	const toggleSizes = {
		sm: 'w-3 h-3',
		md: 'w-4 h-4',
		lg: 'w-5 h-5'
	};
</script>

<label class="inline-flex items-center cursor-pointer {disabled ? 'opacity-50 cursor-not-allowed' : ''}">
	<div class="relative">
		<input
			type="checkbox"
			bind:checked
			{disabled}
			class="sr-only"
		/>
		<div
			class="toggle-bg {sizes[size]} rounded-full transition-colors duration-200 {checked 
				? `bg-${color}-500` 
				: 'bg-gray-300 dark:bg-gray-600'}"
		>
			<div
				class="toggle-dot {toggleSizes[size]} bg-white rounded-full shadow-md transform transition-transform duration-200 {checked 
					? 'translate-x-full' 
					: 'translate-x-0'}"
			></div>
		</div>
	</div>
	{#if label}
		<span class="ml-2 text-gray-700 dark:text-gray-300">{label}</span>
	{/if}
</label>

<style>
	.toggle-bg {
		position: relative;
		display: flex;
		align-items: center;
		padding: 1px;
	}
	
	.toggle-dot {
		margin-left: 1px;
	}
	
	.toggle-bg.translate-x-full .toggle-dot {
		margin-left: calc(100% - 1.25rem - 1px);
	}
</style>