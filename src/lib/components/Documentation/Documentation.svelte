<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	
	interface PropInfo {
		name: string;
		type: string;
		default?: string;
		required?: boolean;
		description: string;
	}
	
	interface SlotInfo {
		name: string;
		description: string;
		props?: Record<string, string>;
	}
	
	interface EventInfo {
		name: string;
		detail?: string;
		description: string;
	}
	
	export let componentName: string;
	export let description: string = '';
	export let props: PropInfo[] = [];
	export let slots: SlotInfo[] = [];
	export let events: EventInfo[] = [];
	export let examples: { title: string; code: string; description?: string }[] = [];
	export let importPath: string = '';
	export let version: string = '1.0.0';
	export let status: 'stable' | 'beta' | 'alpha' | 'deprecated' = 'stable';
	
	let activeTab = 'props';
	let expandedExample = -1;
	
	$: statusColors = {
		stable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
		beta: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
		alpha: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
		deprecated: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
	};
	
	function toggleExample(index: number) {
		expandedExample = expandedExample === index ? -1 : index;
	}
	
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
	<!-- Header -->
	<div class="border-b border-gray-200 dark:border-gray-700 p-6">
		<div class="flex items-center justify-between mb-4">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">{componentName}</h1>
			<div class="flex items-center space-x-3">
				<span class="px-2 py-1 rounded-full text-xs font-medium {statusColors[status]}">
					{status}
				</span>
				<span class="text-sm text-gray-500 dark:text-gray-400">v{version}</span>
			</div>
		</div>
		
		{#if description}
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{description}</p>
		{/if}
		
		{#if importPath}
			<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
				<div class="flex items-center justify-between">
					<code class="text-sm text-gray-800 dark:text-gray-200">
						import {componentName} from '{importPath}';
					</code>
					<button
						type="button"
						class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						on:click={() => copyToClipboard(`import ${componentName} from '${importPath}';`)}
					>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</button>
				</div>
			</div>
		{/if}
	</div>
	
	<!-- Navigation Tabs -->
	<div class="border-b border-gray-200 dark:border-gray-700">
		<nav class="flex space-x-8 px-6" aria-label="Tabs">
			{#each [
				{ id: 'props', label: 'Props', count: props.length },
				{ id: 'slots', label: 'Slots', count: slots.length },
				{ id: 'events', label: 'Events', count: events.length },
				{ id: 'examples', label: 'Examples', count: examples.length }
			] as tab}
				<button
					type="button"
					class="
						{activeTab === tab.id
							? 'border-blue-500 text-blue-600 dark:text-blue-400'
							: 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}
						whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
					"
					on:click={() => activeTab = tab.id}
				>
					{tab.label}
					{#if tab.count > 0}
						<span class="
							{activeTab === tab.id
								? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
								: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}
							ml-2 py-0.5 px-2 rounded-full text-xs
						">
							{tab.count}
						</span>
					{/if}
				</button>
			{/each}
		</nav>
	</div>
	
	<!-- Content -->
	<div class="p-6">
		{#if activeTab === 'props'}
			<div transition:fade={{ duration: 200 }}>
				{#if props.length > 0}
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-gray-50 dark:bg-gray-800">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Default</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
								</tr>
							</thead>
							<tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
								{#each props as prop}
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<code class="text-sm font-mono text-blue-600 dark:text-blue-400">{prop.name}</code>
												{#if prop.required}
													<span class="ml-2 text-red-500 text-xs">*</span>
												{/if}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<code class="text-sm font-mono text-gray-600 dark:text-gray-300">{prop.type}</code>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											{#if prop.default}
												<code class="text-sm font-mono text-gray-500 dark:text-gray-400">{prop.default}</code>
											{:else}
												<span class="text-gray-400 dark:text-gray-500 text-sm">—</span>
											{/if}
										</td>
										<td class="px-6 py-4">
											<p class="text-sm text-gray-700 dark:text-gray-300">{prop.description}</p>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else}
					<div class="text-center py-12 text-gray-500 dark:text-gray-400">
						<svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<p>No props documented for this component.</p>
					</div>
				{/if}
			</div>
		{:else if activeTab === 'slots'}
			<div transition:fade={{ duration: 200 }}>
				{#if slots.length > 0}
					<div class="space-y-6">
						{#each slots as slot}
							<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									<code class="text-blue-600 dark:text-blue-400">{slot.name}</code>
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">{slot.description}</p>
								{#if slot.props}
									<div>
										<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slot Props:</h4>
										<div class="bg-gray-50 dark:bg-gray-800 rounded p-3">
											{#each Object.entries(slot.props) as [propName, propType]}
												<div class="text-sm">
													<code class="text-blue-600 dark:text-blue-400">{propName}</code>:
													<code class="text-gray-600 dark:text-gray-300">{propType}</code>
												</div>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-12 text-gray-500 dark:text-gray-400">
						<svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l2 16H5l2-16z" />
						</svg>
						<p>No slots documented for this component.</p>
					</div>
				{/if}
			</div>
		{:else if activeTab === 'events'}
			<div transition:fade={{ duration: 200 }}>
				{#if events.length > 0}
					<div class="space-y-4">
						{#each events as event}
							<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									<code class="text-green-600 dark:text-green-400">on:{event.name}</code>
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-3">{event.description}</p>
								{#if event.detail}
									<div>
										<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Detail:</h4>
										<code class="block bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">{event.detail}</code>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-12 text-gray-500 dark:text-gray-400">
						<svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
						<p>No events documented for this component.</p>
					</div>
				{/if}
			</div>
		{:else if activeTab === 'examples'}
			<div transition:fade={{ duration: 200 }}>
				{#if examples.length > 0}
					<div class="space-y-6">
						{#each examples as example, index}
							<div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
								<button
									type="button"
									class="w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
									on:click={() => toggleExample(index)}
								>
									<div class="flex items-center justify-between">
										<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{example.title}</h3>
										<svg 
											class="h-5 w-5 text-gray-500 transform {expandedExample === index ? 'rotate-180' : ''} transition-transform"
											fill="none" viewBox="0 0 24 24" stroke="currentColor"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
									{#if example.description}
										<p class="text-gray-600 dark:text-gray-300 mt-2">{example.description}</p>
									{/if}
								</button>
								
								{#if expandedExample === index}
									<div transition:slide={{ duration: 300 }} class="border-t border-gray-200 dark:border-gray-700">
										<div class="relative">
											<pre class="bg-gray-900 text-gray-100 p-6 overflow-x-auto"><code>{example.code}</code></pre>
											<button
												type="button"
												class="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
												on:click={() => copyToClipboard(example.code)}
											>
												<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
												</svg>
											</button>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-12 text-gray-500 dark:text-gray-400">
						<svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
						<p>No examples available for this component.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	pre code {
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}
</style>
