<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	
	interface TableColumn {
		key: string;
		label: string;
		sortable?: boolean;
		type?: 'text' | 'number' | 'date' | 'boolean';
		width?: string;
		align?: 'left' | 'center' | 'right';
		render?: (value: any, row: any) => string;
	}
	
	interface TableRow {
		[key: string]: any;
		id?: string | number;
	}
	
	export let columns: TableColumn[] = [];
	export let data: TableRow[] = [];
	export let sortable: boolean = true;
	export let filterable: boolean = false;
	export let paginated: boolean = false;
	export let pageSize: number = 10;
	export let striped: boolean = false;
	export let hoverable: boolean = true;
	export let compact: boolean = false;
	export let loading: boolean = false;
	export let selectable: boolean = false;
	export let responsive: boolean = true;
	
	const dispatch = createEventDispatcher();
	
	let currentPage = 1;
	let sortKey = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let filterQuery = '';
	let selectedRows = new Set();
	
	$: filteredData = filterQuery
		? data.filter(row =>
				Object.values(row).some(value =>
					String(value).toLowerCase().includes(filterQuery.toLowerCase())
				)
			)
		: data;
	
	$: sortedData = sortKey
		? [...filteredData].sort((a, b) => {
				let aVal = a[sortKey];
				let bVal = b[sortKey];
				
				// Handle different data types
				const column = columns.find(col => col.key === sortKey);
				if (column?.type === 'number') {
					aVal = Number(aVal) || 0;
					bVal = Number(bVal) || 0;
				} else if (column?.type === 'date') {
					aVal = new Date(aVal).getTime();
					bVal = new Date(bVal).getTime();
				} else {
					aVal = String(aVal).toLowerCase();
					bVal = String(bVal).toLowerCase();
				}
				
				if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
				if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
				return 0;
			})
		: filteredData;
	
	$: paginatedData = paginated
		? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
		: sortedData;
	
	$: totalPages = Math.ceil(sortedData.length / pageSize);
	$: allSelected = selectedRows.size === paginatedData.length && paginatedData.length > 0;
	$: someSelected = selectedRows.size > 0 && selectedRows.size < paginatedData.length;
	
	function handleSort(key: string) {
		if (!sortable) return;
		
		if (sortKey === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDirection = 'asc';
		}
		
		dispatch('sort', { key, direction: sortDirection });
	}
	
	function handleSelectAll() {
		if (allSelected) {
			selectedRows.clear();
		} else {
			paginatedData.forEach(row => {
				selectedRows.add(row.id || row);
			});
		}
		selectedRows = selectedRows;
		dispatch('selection', Array.from(selectedRows));
	}
	
	function handleSelectRow(row: TableRow) {
		const id = row.id || row;
		if (selectedRows.has(id)) {
			selectedRows.delete(id);
		} else {
			selectedRows.add(id);
		}
		selectedRows = selectedRows;
		dispatch('selection', Array.from(selectedRows));
	}
	
	function renderCell(column: TableColumn, value: any, row: TableRow): string {
		if (column.render) {
			return column.render(value, row);
		}
		
		if (column.type === 'boolean') {
			return value ? '✓' : '✗';
		}
		
		if (column.type === 'date' && value) {
			return new Date(value).toLocaleDateString();
		}
		
		return String(value || '');
	}
</script>

<div class="w-full">
	{#if filterable}
		<div class="mb-4">
			<input
				type="text"
				placeholder="Search table..."
				bind:value={filterQuery}
				class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
					   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
					   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
		</div>	{/if}

	<div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
		<div class="{responsive ? 'overflow-x-auto' : ''}">
			<table class="w-full table-auto">
			<thead class="bg-gray-50 dark:bg-gray-800">
				<tr>
					{#if selectable}
						<th class="px-4 py-3 text-left">
							<input
								type="checkbox"
								checked={allSelected}
								indeterminate={someSelected}
								on:change={handleSelectAll}
								class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
						</th>
					{/if}
					
					{#each columns as column}
						<th
							class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
								   {column.sortable !== false && sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
								   {column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}"
							style={column.width ? `width: ${column.width}` : ''}
							on:click={() => column.sortable !== false && handleSort(column.key)}
						>
							<div class="flex items-center gap-1">
								{column.label}
								{#if sortable && column.sortable !== false}
									<span class="text-gray-400">
										{#if sortKey === column.key}
											{sortDirection === 'asc' ? '↑' : '↓'}
										{:else}
											↕
										{/if}
									</span>
								{/if}
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			
			<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
				{#if loading}
					<tr>
						<td colspan={columns.length + (selectable ? 1 : 0)} class="px-4 py-8 text-center">
							<div class="flex items-center justify-center">
								<div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
								<span class="ml-2 text-gray-500 dark:text-gray-400">Loading...</span>
							</div>
						</td>
					</tr>
				{:else if paginatedData.length === 0}
					<tr>
						<td colspan={columns.length + (selectable ? 1 : 0)} class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
							No data available
						</td>
					</tr>
				{:else}
					{#each paginatedData as row, i}
						<tr
							class="bg-white dark:bg-gray-900
								   {striped && i % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800' : ''}
								   {hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
								   {compact ? 'text-sm' : ''}"
							transition:fade={{ duration: 150 }}
						>
							{#if selectable}
								<td class="px-4 py-3">
									<input
										type="checkbox"
										checked={selectedRows.has(row.id || row)}
										on:change={() => handleSelectRow(row)}
										class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
								</td>
							{/if}
							
							{#each columns as column}
								<td
									class="px-4 py-3 text-gray-900 dark:text-gray-100
										   {column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}
										   {compact ? 'py-2' : ''}"
								>
									{@html renderCell(column, row[column.key], row)}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}			</tbody>
			</table>
		</div>
	</div>

	{#if paginated && totalPages > 1}
		<div class="mt-4 flex items-center justify-between">
			<div class="text-sm text-gray-700 dark:text-gray-300">
				Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
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
</div>
