<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	interface ListItem {
		id: string | number;
		title: string;
		subtitle?: string;
		description?: string;
		avatar?: string;
		icon?: string;
		meta?: string;
		status?: 'active' | 'inactive' | 'pending' | 'completed';
		href?: string;
		actions?: Array<{ label: string; action: (item: ListItem) => void; variant?: 'primary' | 'secondary' | 'danger' }>;
	}
	
	export let items: ListItem[] = [];
	export let variant: 'default' | 'cards' | 'compact' | 'detailed' = 'default';
	export let selectable: boolean = false;
	export let multiSelect: boolean = false;
	export let searchable: boolean = false;
	export let sortable: boolean = false;
	export let dividers: boolean = true;
	export let loading: boolean = false;
	export let emptyMessage: string = 'No items found';
	export let itemsPerPage: number = 0; // 0 = no pagination
	
	const dispatch = createEventDispatcher();
	
	let selectedItems = new Set();
	let searchQuery = '';
	let sortKey: keyof ListItem = 'title';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let currentPage = 1;
	
	$: filteredItems = searchQuery
		? items.filter(item => 
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description?.toLowerCase().includes(searchQuery.toLowerCase())
			)
		: items;
	
	$: sortedItems = sortable
		? [...filteredItems].sort((a, b) => {
				const aVal = a[sortKey];
				const bVal = b[sortKey];
				const comparison = String(aVal).localeCompare(String(bVal));
				return sortDirection === 'asc' ? comparison : -comparison;
			})
		: filteredItems;
	
	$: paginatedItems = itemsPerPage > 0
		? sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
		: sortedItems;
	
	$: totalPages = itemsPerPage > 0 ? Math.ceil(sortedItems.length / itemsPerPage) : 1;
	
	function handleSelect(item: ListItem) {
		if (!selectable) return;
		
		if (multiSelect) {
			if (selectedItems.has(item.id)) {
				selectedItems.delete(item.id);
			} else {
				selectedItems.add(item.id);
			}
		} else {
			selectedItems.clear();
			selectedItems.add(item.id);
		}
		selectedItems = selectedItems;
		dispatch('select', { item, selected: Array.from(selectedItems) });
	}
	
	function handleAction(action: (item: ListItem) => void, item: ListItem) {
		action(item);
	}
	
	function getStatusColor(status?: string) {
		const colors = {
			active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
			inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
			pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
			completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
		};
		return colors[status as keyof typeof colors] || colors.inactive;
	}
</script>

<div class="w-full">
	{#if searchable}
		<div class="mb-4">
			<input
				type="text"
				placeholder="Search items..."
				bind:value={searchQuery}
				class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
					   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
					   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
		</div>
	{/if}

	{#if sortable}
		<div class="mb-4 flex gap-2">
			<select
				bind:value={sortKey}
				class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
					   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
			>
				<option value="title">Sort by Title</option>
				<option value="subtitle">Sort by Subtitle</option>
				<option value="meta">Sort by Meta</option>
			</select>
			<button
				type="button"
				on:click={() => sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'}
				class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
					   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
					   hover:bg-gray-50 dark:hover:bg-gray-700"
			>
				{sortDirection === 'asc' ? '↑' : '↓'}
			</button>
		</div>
	{/if}

	{#if loading}
		<div class="flex items-center justify-center py-12">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
			<span class="ml-3 text-gray-500 dark:text-gray-400">Loading...</span>
		</div>
	{:else if paginatedItems.length === 0}
		<div class="text-center py-12 text-gray-500 dark:text-gray-400">
			{emptyMessage}
		</div>
	{:else}
		<ul class="space-y-0 {variant === 'cards' ? 'space-y-4' : ''}" role="list">
			{#each paginatedItems as item, i (item.id)}
				<li role="listitem">
					<button
						type="button"
						tabindex="0"
						class="group transition-all duration-200 {variant === 'cards' 
							? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md' 
							: variant === 'compact'
								? 'py-2 px-3'
								: 'py-3 px-4'
						} {selectable ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
						{selectedItems.has(item.id) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}
						{dividers && variant !== 'cards' && i < paginatedItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}"
						on:click={() => handleSelect(item)}
						on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleSelect(item); e.preventDefault(); } }}
						transition:fade={{ duration: 150 }}
					>
						<div class="flex items-center gap-3">
							{#if selectable}
								<input
									type="checkbox"
									checked={selectedItems.has(item.id)}
									class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									on:click|stopPropagation
								/>
							{/if}

							{#if item.avatar}
								<img
									src={item.avatar}
									alt={item.title}
									class="w-10 h-10 rounded-full object-cover flex-shrink-0"
								/>
							{:else if item.icon}
								<div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
									<span class="text-lg">{item.icon}</span>
								</div>
							{/if}

							<div class="flex-1 min-w-0">
								<div class="flex items-start justify-between">
									<div class="min-w-0 flex-1">
										{#if item.href}
											<a
												href={item.href}
												class="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
												on:click|stopPropagation
											>
												{item.title}
											</a>
										{:else}
											<h3 class="font-medium text-gray-900 dark:text-gray-100 truncate">
												{item.title}
											</h3>
										{/if}
										
										{#if item.subtitle}
											<p class="text-sm text-gray-600 dark:text-gray-400 truncate">
												{item.subtitle}
											</p>
										{/if}
										
										{#if item.description && variant !== 'compact'}
											<p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
												{item.description}
											</p>
										{/if}
									</div>

									<div class="flex items-center gap-2 ml-4">
										{#if item.status}
											<span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(item.status)}">
												{item.status}
											</span>
										{/if}

										{#if item.meta}
											<span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
												{item.meta}
											</span>
										{/if}

										{#if item.actions && item.actions.length > 0}
											<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
												{#each item.actions as action}
													<button
														type="button"
														class="px-2 py-1 text-xs font-medium rounded 
															   {action.variant === 'primary' 
																? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
																: action.variant === 'danger'
																	? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300'
																	: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
															   } transition-colors"
														on:click|stopPropagation={() => handleAction(action.action, item)}
													>
														{action.label}
													</button>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</button>
				</li>
			{/each}
		</ul>

		{#if itemsPerPage > 0 && totalPages > 1}
			<div class="mt-6 flex items-center justify-between">
				<div class="text-sm text-gray-700 dark:text-gray-300">
					Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedItems.length)} of {sortedItems.length} items
				</div>
				
				<div class="flex items-center gap-2">
					<button
						type="button"
						disabled={currentPage === 1}
						on:click={() => currentPage--}
						class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded
							   disabled:opacity-50 disabled:cursor-not-allowed
							   hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						Previous
					</button>
					
					{#each Array(Math.min(5, totalPages)) as _, i}
						{@const page = i + Math.max(1, currentPage - 2)}
						{#if page <= totalPages}
							<button
								type="button"
								on:click={() => currentPage = page}
								class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded
									   {currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}"
							>
								{page}
							</button>
						{/if}
					{/each}
					
					<button
						type="button"
						disabled={currentPage === totalPages}
						on:click={() => currentPage++}
						class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded
							   disabled:opacity-50 disabled:cursor-not-allowed
							   hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						Next
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>
