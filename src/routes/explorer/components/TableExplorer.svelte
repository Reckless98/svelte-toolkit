<!-- Table Component Explorer -->
<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import ComponentPreview from '../ComponentPreview.svelte';

	// Sample data
	const sampleColumns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', sortable: true },
		{ key: 'joinDate', label: 'Join Date', type: 'date' as const, sortable: true }
	];

	const sampleData = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			role: 'Administrator',
			status: 'Active',
			joinDate: '2023-01-15'
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'Editor',
			status: 'Active',
			joinDate: '2023-02-20'
		},
		{
			id: 3,
			name: 'Mike Johnson',
			email: 'mike@example.com',
			role: 'Viewer',
			status: 'Inactive',
			joinDate: '2023-03-10'
		},
		{
			id: 4,
			name: 'Sarah Wilson',
			email: 'sarah@example.com',
			role: 'Editor',
			status: 'Active',
			joinDate: '2023-01-05'
		},
		{
			id: 5,
			name: 'Tom Brown',
			email: 'tom@example.com',
			role: 'Viewer',
			status: 'Pending',
			joinDate: '2023-04-12'
		}
	];

	const productsColumns = [
		{ key: 'name', label: 'Product', sortable: true },
		{ key: 'category', label: 'Category', sortable: true },
		{ key: 'price', label: 'Price', type: 'number' as const, sortable: true, align: 'right' as const },
		{ key: 'stock', label: 'Stock', type: 'number' as const, sortable: true, align: 'center' as const },
		{ key: 'available', label: 'Available', type: 'boolean' as const, sortable: true, align: 'center' as const }
	];

	const productsData = [
		{
			id: 1,
			name: 'Laptop Pro',
			category: 'Electronics',
			price: 1299.99,
			stock: 15,
			available: true
		},
		{
			id: 2,
			name: 'Wireless Mouse',
			category: 'Accessories',
			price: 29.99,
			stock: 0,
			available: false
		},
		{
			id: 3,
			name: 'Mechanical Keyboard',
			category: 'Accessories',
			price: 159.99,
			stock: 8,
			available: true
		},
		{
			id: 4,
			name: 'External Monitor',
			category: 'Electronics',
			price: 399.99,
			stock: 12,
			available: true
		},
		{
			id: 5,
			name: 'USB Cable',
			category: 'Accessories',
			price: 12.99,
			stock: 50,
			available: true
		}
	];

	const compactColumns = [
		{ key: 'id', label: 'ID', width: '60px' },
		{ key: 'name', label: 'Name' },
		{ key: 'status', label: 'Status', width: '100px' }
	];

	const compactData = [
		{ id: 1, name: 'Item 1', status: 'Active' },
		{ id: 2, name: 'Item 2', status: 'Inactive' },
		{ id: 3, name: 'Item 3', status: 'Pending' }
	];
	// Comprehensive code examples for smart grouping
	const basicsAndDataTypesExample = `<!-- Basic Table Usage -->
<Table 
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ]}
  data={[
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ]}
/>

<!-- Different Column Types -->
<Table 
  columns={[
    { key: 'name', label: 'Product', sortable: true },
    { key: 'price', label: 'Price', type: 'number', align: 'right' },
    { key: 'stock', label: 'Stock', type: 'number', align: 'center' },
    { key: 'available', label: 'Available', type: 'boolean', align: 'center' }
  ]}
  data={productsData}
/>

<!-- Column Configuration -->
<Table 
  columns={[
    { key: 'id', label: 'ID', width: '60px', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'joinDate', label: 'Join Date', type: 'date', sortable: true }
  ]}
  data={sampleData}
/>`;

	const layoutAndStylingExample = `<!-- Compact Layout -->
<Table 
  columns={columns}
  data={data}
  compact={true}
  striped={true}
/>

<!-- Responsive Design -->
<Table 
  columns={columns}
  data={data}
  responsive={true}
  hoverable={true}
/>

<!-- Visual Styling Options -->
<Table 
  columns={columns}
  data={data}
  striped={true}
  hoverable={true}
/>

<!-- Combined Layout Features -->
<Table 
  columns={columns}
  data={data}
  compact={true}
  responsive={true}
  striped={true}
  hoverable={true}
/>`;

	const interactiveFeaturesExample = `<!-- Sorting & Filtering -->
<Table 
  columns={columns}
  data={data}
  sortable={true}
  filterable={true}
/>

<!-- Row Selection -->
<Table 
  columns={columns}
  data={data}
  selectable={true}
  hoverable={true}
/>

<!-- Pagination -->
<Table 
  columns={columns}
  data={largeDataSet}
  paginated={true}
  pageSize={5}
  filterable={true}
/>

<!-- All Interactive Features Combined -->
<Table 
  columns={columns}
  data={data}
  sortable={true}
  filterable={true}
  paginated={true}
  pageSize={5}
  selectable={true}
  striped={true}
  hoverable={true}
/>`;

	const advancedStatesExample = `<!-- Loading State -->
<Table 
  loading={true}
  columns={columns}
  data={[]}
/>

<!-- Empty State -->
<Table 
  columns={columns}
  data={[]}
  filterable={true}
/>

<!-- Error Handling -->
<Table 
  columns={columns}
  data={data}
  error="Failed to load data"
/>

<!-- Complex Real-World Usage -->
<Table 
  columns={enhancedColumns}
  data={complexData}
  sortable={true}
  filterable={true}
  paginated={true}
  pageSize={10}
  selectable={true}
  responsive={true}
  striped={true}
  hoverable={true}
/>`;
</script>

<section>
	<div class="max-w-6xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Table Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Display tabular data with sorting, filtering, pagination, and selection capabilities.
			</p>
		</div>
		<!-- Smart Grouped Previews -->		<ComponentPreview
			title="Table Basics & Data Types"
			description="Essential table usage with different column types and data handling"
			complexity="Basic"
			codeSnippet={basicsAndDataTypesExample}
		>
			<div class="space-y-8">
				<!-- Basic table -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Basic Table</h4>
					<Table 
						columns={compactColumns}
						data={compactData}
						sortable={true}
					/>
				</div>
				
				<!-- Different column types -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Column Types & Alignment</h4>
					<Table 
						columns={productsColumns}
						data={productsData}
						sortable={true}
						striped={true}
					/>
				</div>
				
				<!-- User data example -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">User Data with Dates</h4>
					<Table 
						columns={sampleColumns.slice(0, 4)}
						data={sampleData.slice(0, 3)}
						sortable={true}
						striped={true}
					/>
				</div>
			</div>
		</ComponentPreview>
		<ComponentPreview
			title="Layout & Responsive Features"
			description="Compact layouts, responsive design, and visual styling options"
			complexity="Intermediate"
			codeSnippet={layoutAndStylingExample}
		>
			<div class="space-y-8">
				<!-- Compact layout -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Compact Layout</h4>
					<Table 
						columns={sampleColumns.slice(0, 4)}
						data={sampleData.slice(0, 4)}
						compact={true}
						striped={true}
					/>
				</div>
				
				<!-- Responsive design -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Responsive Design</h4>
					<Table 
						columns={sampleColumns}
						data={sampleData.slice(0, 3)}
						responsive={true}
						hoverable={true}
						striped={true}
					/>
				</div>
				
				<!-- Visual styling variants -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Styling Variants</h4>
					<div class="space-y-4">
						<div>
							<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Default</p>
							<Table 
								columns={compactColumns}
								data={compactData.slice(0, 2)}
							/>
						</div>
						<div>
							<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Striped + Hoverable</p>
							<Table 
								columns={compactColumns}
								data={compactData.slice(0, 2)}
								striped={true}
								hoverable={true}
							/>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<ComponentPreview
			title="Interactive Features"
			description="Sorting, filtering, pagination, and row selection capabilities"
			complexity="Intermediate"
			codeSnippet={interactiveFeaturesExample}
		>
			<div class="space-y-8">
				<!-- Sorting and filtering -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Sorting & Filtering</h4>
					<Table 
						columns={productsColumns.slice(0, 4)}
						data={productsData}
						sortable={true}
						filterable={true}
						striped={true}
					/>
				</div>
				
				<!-- Row selection -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Row Selection</h4>
					<Table 
						columns={sampleColumns.slice(0, 4)}
						data={sampleData.slice(0, 4)}
						selectable={true}
						striped={true}
						hoverable={true}
					/>
				</div>
				
				<!-- Pagination -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Pagination</h4>
					<Table 
						columns={sampleColumns.slice(0, 4)}
						data={[...sampleData, ...sampleData]}
						paginated={true}
						pageSize={3}
						filterable={true}
						striped={true}
					/>
				</div>
				
				<!-- All features combined -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">All Interactive Features</h4>
					<Table 
						columns={sampleColumns}
						data={sampleData}
						sortable={true}
						filterable={true}
						paginated={true}
						pageSize={3}
						selectable={true}
						striped={true}
						hoverable={true}
					/>
				</div>
			</div>
		</ComponentPreview>
		<ComponentPreview
			title="Advanced States & Real-World Usage"
			description="Loading states, error handling, and complex table implementations"
			complexity="Advanced"
			codeSnippet={advancedStatesExample}
		>
			<div class="space-y-8">
				<!-- Table states -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Table States</h4>
					<div class="space-y-6">
						<div>
							<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Loading State</p>
							<Table 
								loading={true}
								columns={compactColumns}
								data={[]}
							/>
						</div>
						<div>
							<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Empty State</p>
							<Table 
								columns={compactColumns}
								data={[]}
								filterable={true}
							/>
						</div>
					</div>
				</div>
				
				<!-- Real-world complex usage -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Complex Real-World Example</h4>
					<p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Enterprise user management with all features enabled</p>
					<Table 
						columns={sampleColumns}
						data={[...sampleData, ...sampleData.map(user => ({
							...user,
							id: user.id + 10,
							name: user.name + ' (Copy)',
							email: 'copy.' + user.email
						}))]}
						sortable={true}
						filterable={true}
						paginated={true}
						pageSize={4}
						selectable={true}
						responsive={true}
						striped={true}
						hoverable={true}
						compact={false}
					/>
				</div>
				
				<!-- Products showcase -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">E-commerce Product Catalog</h4>
					<p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Product management with mixed data types</p>
					<Table 
						columns={productsColumns}
						data={productsData}
						sortable={true}
						filterable={true}
						selectable={true}
						striped={true}
						hoverable={true}
					/>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
