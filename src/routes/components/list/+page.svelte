<script>
	import List from '$lib/components/List/List.svelte';
	import { onMount } from 'svelte';

	// Basic list data
	let basicItems = [
		{ id: 1, title: 'First item', description: 'This is the first item in the list' },
		{ id: 2, title: 'Second item', description: 'This is the second item in the list' },
		{ id: 3, title: 'Third item', description: 'This is the third item in the list' },
		{ id: 4, title: 'Fourth item', description: 'This is the fourth item in the list' }
	];

	// Rich list data with more properties
	let richItems = [
		{
			id: 1,
			title: 'John Doe',
			subtitle: 'Software Engineer',
			description: 'Full-stack developer with 5 years of experience',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
			status: 'online',
			metadata: { department: 'Engineering', location: 'San Francisco' }
		},
		{
			id: 2,
			title: 'Jane Smith',
			subtitle: 'Product Manager',
			description: 'Leading product development for mobile applications',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
			status: 'away',
			metadata: { department: 'Product', location: 'New York' }
		},
		{
			id: 3,
			title: 'Bob Johnson',
			subtitle: 'UX Designer',
			description: 'Creating beautiful and intuitive user experiences',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
			status: 'offline',
			metadata: { department: 'Design', location: 'Los Angeles' }
		},
		{
			id: 4,
			title: 'Alice Brown',
			subtitle: 'Data Scientist',
			description: 'Analyzing complex datasets to drive business insights',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
			status: 'online',
			metadata: { department: 'Analytics', location: 'Seattle' }
		}
	];

	// Large dataset for pagination
	let largeItems = Array.from({ length: 50 }, (_, i) => ({
		id: i + 1,
		title: `Item ${i + 1}`,
		subtitle: `Subtitle ${i + 1}`,
		description: `This is item number ${i + 1} in a large dataset`,
		category: ['Technology', 'Design', 'Marketing', 'Sales', 'Support'][i % 5],
		priority: ['Low', 'Medium', 'High'][i % 3],
		date: new Date(2024, 0, 1 + i).toISOString().split('T')[0]
	}));

	let selectedItems = [];
	let sortBy = '';
	let sortDirection = 'asc';

	function handleSelect(event) {
		selectedItems = event.detail;
		console.log('Selected items:', selectedItems);
	}

	function handleSort(event) {
		const { field, direction } = event.detail;
		sortBy = field;
		sortDirection = direction;
		console.log('Sort changed:', { field, direction });
	}

	function handleFilter(event) {
		console.log('Filter applied:', event.detail);
	}

	function handleAction(event) {
		const { action, item } = event.detail;
		console.log('Action triggered:', action, 'for item:', item);
		
		if (action === 'edit') {
			alert(`Editing: ${item.title}`);
		} else if (action === 'delete') {
			if (confirm(`Delete ${item.title}?`)) {
				richItems = richItems.filter(i => i.id !== item.id);
			}
		}
	}

	// Custom item actions
	let itemActions = [
		{ id: 'edit', label: 'Edit', icon: '✏️' },
		{ id: 'delete', label: 'Delete', icon: '🗑️' },
		{ id: 'share', label: 'Share', icon: '📤' }
	];
</script>

<svelte:head>
	<title>List Component - Svelte UI Toolkit</title>
	<meta name="description" content="Flexible list component with search, sorting, selection, pagination, and custom actions." />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-12">
	<!-- Header -->
	<div class="text-center space-y-4">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white">List Component</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
			Flexible list component with search, sorting, selection, pagination, and customizable item rendering.
		</p>
	</div>

	<!-- Basic List -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Basic List</h2>
			<p class="text-gray-600 dark:text-gray-300">Simple list with hover effects and basic item structure.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<List 
				items={basicItems}
				hoverable={true}
			/>
		</div>
		<details class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
			<summary class="cursor-pointer font-medium text-gray-900 dark:text-white">View Code</summary>
			<pre class="mt-2 text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`<script>
	import List from '$lib/components/List/List.svelte';
	
	let items = [
		{ id: 1, title: 'First item', description: 'This is the first item' },
		{ id: 2, title: 'Second item', description: 'This is the second item' },
		// ... more items
	];
</script>

<List 
	items={items}
	hoverable={true}
/>`}</code></pre>
		</details>
	</section>

	<!-- Rich List with Avatars -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Rich List</h2>
			<p class="text-gray-600 dark:text-gray-300">List with avatars, subtitles, and custom actions.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="mb-4">
				<p class="text-sm text-gray-600 dark:text-gray-300">
					Selected items: {selectedItems.length}
				</p>
			</div>
			<List 
				items={richItems}
				selectable={true}
				hoverable={true}
				actions={itemActions}
				on:select={handleSelect}
				on:action={handleAction}
			/>
		</div>
	</section>

	<!-- Searchable and Sortable List -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Searchable & Sortable</h2>
			<p class="text-gray-600 dark:text-gray-300">List with search functionality and sorting capabilities.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<List 
				items={richItems}
				searchable={true}
				searchFields={['title', 'subtitle', 'description']}
				sortable={true}
				sortFields={[
					{ key: 'title', label: 'Name' },
					{ key: 'subtitle', label: 'Role' },
					{ key: 'status', label: 'Status' }
				]}
				hoverable={true}
				on:sort={handleSort}
				on:filter={handleFilter}
			/>
		</div>
	</section>

	<!-- Paginated List -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Paginated List</h2>
			<p class="text-gray-600 dark:text-gray-300">Large dataset with pagination and search.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<List 
				items={largeItems}
				pagination={true}
				pageSize={8}
				searchable={true}
				searchFields={['title', 'description', 'category']}
				hoverable={true}
			/>
		</div>
	</section>

	<!-- Divided List -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Divided List</h2>
			<p class="text-gray-600 dark:text-gray-300">List with dividers between items for better separation.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<List 
				items={basicItems}
				divided={true}
				hoverable={true}
			/>
		</div>
	</section>

	<!-- Empty State -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Empty State</h2>
			<p class="text-gray-600 dark:text-gray-300">List with no items and custom empty message.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<List 
				items={[]}
				emptyMessage="No items found. Add some items to get started."
				hoverable={true}
			/>
		</div>
	</section>

	<!-- Custom Item Template -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Custom Item Template</h2>
			<p class="text-gray-600 dark:text-gray-300">Example of how to customize item rendering with slots.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<List items={richItems} hoverable={true}>
				<svelte:fragment slot="item" let:item>
					<div class="flex items-center space-x-4 p-4">
						<img 
							src={item.avatar} 
							alt={item.title}
							class="w-12 h-12 rounded-full"
						/>
						<div class="flex-1">
							<div class="flex items-center space-x-2">
								<h3 class="font-medium text-gray-900 dark:text-white">{item.title}</h3>
								<span class="px-2 py-1 text-xs rounded-full {
									item.status === 'online' ? 'bg-green-100 text-green-800' :
									item.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
									'bg-gray-100 text-gray-800'
								}">
									{item.status}
								</span>
							</div>
							<p class="text-gray-600 dark:text-gray-300">{item.subtitle}</p>
							<p class="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
						</div>
						<div class="text-right text-sm text-gray-500 dark:text-gray-400">
							<div>{item.metadata.department}</div>
							<div>{item.metadata.location}</div>
						</div>
					</div>
				</svelte:fragment>
			</List>
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
						<td class="py-2 font-mono">items</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Array of items to display</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">selectable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable item selection</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">hoverable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable hover effects</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">divided</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Add dividers between items</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">searchable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable search functionality</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">searchFields</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Fields to search in</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">sortable</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable sorting</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">sortFields</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Available sort options</td>
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
						<td class="py-2">Items per page</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">actions</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Action buttons for items</td>
					</tr>
					<tr>
						<td class="py-2 font-mono">emptyMessage</td>
						<td class="py-2">string</td>
						<td class="py-2">'No items found'</td>
						<td class="py-2">Message when list is empty</td>
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
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when item selection changes. Detail contains array of selected items.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:sort</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when sorting changes. Detail contains { field, direction }.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:filter</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when search filter is applied. Detail contains search term.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:action</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when action button is clicked. Detail contains { action, item }.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Slots Documentation -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Slots</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">item</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">
						Custom item template. Receives <code>item</code> as slot prop.
					</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">empty</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">
						Custom empty state template when no items are available.
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
