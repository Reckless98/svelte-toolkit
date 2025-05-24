<script>
	import Table from '$lib/components/Table/Table.svelte';
	import { onMount } from 'svelte';

	// Sample data for demonstrations
	let basicData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
		{ id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Pending' }
	];

	let basicColumns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', sortable: true }
	];

	// Large dataset for pagination demo
	let largeData = Array.from({ length: 100 }, (_, i) => ({
		id: i + 1,
		name: `User ${i + 1}`,
		email: `user${i + 1}@example.com`,
		department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
		salary: Math.floor(Math.random() * 100000) + 40000,
		joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
	}));

	let paginationColumns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'department', label: 'Department', sortable: true },
		{ key: 'salary', label: 'Salary', sortable: true, formatter: (value) => `$${value.toLocaleString()}` },
		{ key: 'joinDate', label: 'Join Date', sortable: true }
	];

	let selectedRows = [];
	let loading = false;

	function handleRowSelect(event) {
		selectedRows = event.detail;
		console.log('Selected rows:', selectedRows);
	}

	function handleSort(event) {
		console.log('Sort changed:', event.detail);
	}

	function handleFilter(event) {
		console.log('Filter applied:', event.detail);
	}

	function simulateLoading() {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	}
</script>

<svelte:head>
	<title>Table Component - Svelte UI Toolkit</title>
	<meta name="description" content="Advanced table component with sorting, filtering, pagination, and selection capabilities." />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-12">
	<!-- Header -->
	<div class="text-center space-y-4">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white">Table Component</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
			Advanced data table component with sorting, filtering, pagination, selection, and customizable formatting.
		</p>
	</div>

	<!-- Basic Table -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Basic Table</h2>
			<p class="text-gray-600 dark:text-gray-300">Simple table with sortable columns and hover effects.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Table 
				data={basicData} 
				columns={basicColumns}
				hoverable={true}
				on:sort={handleSort}
			/>
		</div>
		<details class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
			<summary class="cursor-pointer font-medium text-gray-900 dark:text-white">View Code</summary>
			<pre class="mt-2 text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`<script>
	import Table from '$lib/components/Table/Table.svelte';
	
	let data = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
		// ... more data
	];
	
	let columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', sortable: true }
	];
</script>

<Table 
	data={data} 
	columns={columns}
	hoverable={true}
	on:sort={(e) => console.log('Sort:', e.detail)}
/>`}</code></pre>
		</details>
	</section>

	<!-- Selectable Table -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Selectable Table</h2>
			<p class="text-gray-600 dark:text-gray-300">Table with row selection and batch operations.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="mb-4">
				<p class="text-sm text-gray-600 dark:text-gray-300">
					Selected rows: {selectedRows.length}
				</p>
			</div>
			<Table 
				data={basicData} 
				columns={basicColumns}
				selectable={true}
				hoverable={true}
				on:select={handleRowSelect}
			/>
		</div>
	</section>

	<!-- Striped and Bordered Table -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Styled Table</h2>
			<p class="text-gray-600 dark:text-gray-300">Table with striped rows and borders for better readability.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Table 
				data={basicData} 
				columns={basicColumns}
				striped={true}
				bordered={true}
				hoverable={true}
			/>
		</div>
	</section>

	<!-- Paginated Table -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Paginated Table</h2>
			<p class="text-gray-600 dark:text-gray-300">Large dataset with pagination and custom formatters.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Table 
				data={largeData} 
				columns={paginationColumns}
				pagination={true}
				pageSize={10}
				searchable={true}
				hoverable={true}
				striped={true}
				on:sort={handleSort}
				on:filter={handleFilter}
			/>
		</div>
	</section>

	<!-- Loading State -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Loading State</h2>
			<p class="text-gray-600 dark:text-gray-300">Table with loading spinner and disabled state.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="mb-4">
				<button 
					class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					on:click={simulateLoading}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Simulate Loading'}
				</button>
			</div>
			<Table 
				data={basicData} 
				columns={basicColumns}
				{loading}
				hoverable={true}
			/>
		</div>
	</section>

	<!-- Empty State -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Empty State</h2>
			<p class="text-gray-600 dark:text-gray-300">Table with no data and custom empty message.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Table 
				data={[]} 
				columns={basicColumns}
				emptyMessage="No users found. Add some users to get started."
				hoverable={true}
			/>
		</div>
	</section>

	<!-- Props Documentation -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Props</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Prop</th>
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Type</th>
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Default</th>
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Description</th>
					</tr>
				</thead>
				<tbody class="text-gray-600 dark:text-gray-300">
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">data</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Array of objects to display in the table</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">columns</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Column definitions with key, label, sortable, formatter</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">selectable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable row selection with checkboxes</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">hoverable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable hover effects on rows</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">striped</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Alternate row background colors</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">bordered</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Add borders around cells</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">pagination</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable pagination</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">pageSize</td>
						<td class="py-2">number</td>
						<td class="py-2">10</td>
						<td class="py-2">Number of rows per page</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">searchable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable search functionality</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">loading</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Show loading state</td>
					</tr>
					<tr>
						<td class="py-2 font-mono">emptyMessage</td>
						<td class="py-2">string</td>
						<td class="py-2">'No data available'</td>
						<td class="py-2">Message to show when table is empty</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Events Documentation -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Events</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:select</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when row selection changes. Detail contains array of selected rows.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:sort</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when column sorting changes. Detail contains { column, direction }.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:filter</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when search filter is applied. Detail contains search term.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:pageChange</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when pagination page changes. Detail contains page number.</p>
				</div>
			</div>
		</div>
	</section>
</div>
