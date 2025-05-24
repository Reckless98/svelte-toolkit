<!-- Table Component Explorer -->
<script lang="ts">
	import { Table } from '$lib/components/Table';
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

	// Code examples
	const basicExample = `<Table 
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ]}
  data={[
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ]}
/>`;

	const featuresExample = `<Table 
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

	const responsiveExample = `<Table 
  columns={columns}
  data={data}
  responsive={true}
  compact={false}
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

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Table"
			description="A simple table with sortable columns."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<Table 
					columns={compactColumns}
					data={compactData}
					sortable={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Full Featured Table -->
		<ComponentPreview
			title="Full Featured Table"
			description="Table with all features enabled: sorting, filtering, pagination, and selection."
			codeSnippet={featuresExample}
		>
			<div class="space-y-4">
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
		</ComponentPreview>

		<!-- Products Table -->
		<ComponentPreview
			title="Products Table"
			description="Table with different column types and alignments."
			codeSnippet='<Table columns={productsColumns} data={productsData} />'
		>
			<div class="space-y-4">
				<Table 
					columns={productsColumns}
					data={productsData}
					sortable={true}
					filterable={true}
					striped={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Compact Table -->
		<ComponentPreview
			title="Compact Table"
			description="Space-efficient table layout."
			codeSnippet='<Table columns={columns} data={data} compact={true} />'
		>
			<div class="space-y-4">
				<Table 
					columns={sampleColumns.slice(0, 4)}
					data={sampleData.slice(0, 4)}
					compact={true}
					striped={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Responsive Table -->
		<ComponentPreview
			title="Responsive Table"
			description="Table that adapts to different screen sizes."
			codeSnippet={responsiveExample}
		>
			<div class="space-y-4">
				<Table 
					columns={sampleColumns}
					data={sampleData}
					responsive={true}
					hoverable={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Selectable Table -->
		<ComponentPreview
			title="Selectable Table"
			description="Table with row selection capabilities."
			codeSnippet='<Table columns={columns} data={data} selectable={true} />'
		>
			<div class="space-y-4">
				<Table 
					columns={productsColumns.slice(0, 4)}
					data={productsData.slice(0, 4)}
					selectable={true}
					striped={true}
					hoverable={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Paginated Table -->
		<ComponentPreview
			title="Paginated Table"
			description="Table with pagination for large datasets."
			codeSnippet='<Table columns={columns} data={data} paginated={true} pageSize={3} />'
		>
			<div class="space-y-4">
				<Table 
					columns={sampleColumns}
					data={[...sampleData, ...sampleData, ...sampleData]} // More data for pagination
					paginated={true}
					pageSize={4}
					filterable={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Table States -->
		<ComponentPreview
			title="Table States"
			description="Different table states including loading and empty."
			codeSnippet='<Table loading={true} columns={columns} data={[]} />'
		>
			<div class="space-y-8">
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Loading State</h3>
					<Table 
						loading={true}
						columns={compactColumns}
						data={[]}
					/>
				</div>
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Empty State</h3>
					<Table 
						columns={compactColumns}
						data={[]}
						filterable={true}
					/>
				</div>
			</div>
		</ComponentPreview>

		<!-- Table Variants -->
		<ComponentPreview
			title="Table Styling Variants"
			description="Different visual styles for tables."
			codeSnippet='<Table striped={true} hoverable={true} columns={columns} data={data} />'
		>
			<div class="space-y-8">
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Default</h3>
					<Table 
						columns={compactColumns}
						data={compactData}
					/>
				</div>
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Striped</h3>
					<Table 
						columns={compactColumns}
						data={compactData}
						striped={true}
					/>
				</div>
				<div>
					<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Striped + Hoverable</h3>
					<Table 
						columns={compactColumns}
						data={compactData}
						striped={true}
						hoverable={true}
					/>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
