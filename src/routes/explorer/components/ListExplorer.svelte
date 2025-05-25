<!-- List Component Explorer -->
<script lang="ts">
	import List from '$lib/components/List';
	import ComponentPreview from '../ComponentPreview.svelte';

	type ListVariant = 'default' | 'cards' | 'compact' | 'detailed';

	// Sample data
	const sampleItems = [
		{
			id: 1,
			title: 'John Doe',
			subtitle: 'Software Engineer',
			description: 'Experienced full-stack developer with expertise in modern web technologies.',
			avatar: '👨‍💻',
			meta: '2 years ago',
			status: 'active' as const
		},
		{
			id: 2,
			title: 'Jane Smith',
			subtitle: 'UX Designer',
			description: 'Creative designer focused on user-centered design and accessibility.',
			avatar: '👩‍🎨',
			meta: '1 week ago',
			status: 'active' as const
		},
		{
			id: 3,
			title: 'Mike Johnson',
			subtitle: 'Product Manager',
			description: 'Strategic product leader with experience in agile development.',
			avatar: '👨‍💼',
			meta: '3 days ago',
			status: 'pending' as const
		},
		{
			id: 4,
			title: 'Sarah Wilson',
			subtitle: 'Data Scientist',
			description: 'Analytics expert specializing in machine learning and data visualization.',
			avatar: '👩‍💻',
			meta: '1 day ago',
			status: 'inactive' as const
		}
	];

	const compactItems = [
		{ id: 1, title: 'Home', icon: '🏠' },
		{ id: 2, title: 'Profile', icon: '👤' },
		{ id: 3, title: 'Settings', icon: '⚙️' },
		{ id: 4, title: 'Messages', icon: '💬', meta: '5' },
		{ id: 5, title: 'Notifications', icon: '🔔', meta: '12' }
	];

	const actionItems = [
		{
			id: 1,
			title: 'Document.pdf',
			subtitle: 'PDF Document',
			meta: '2.4 MB',
			icon: '📄',
			actions: [
				{ label: 'Download', action: () => console.log('Download'), variant: 'primary' as const },
				{ label: 'Share', action: () => console.log('Share'), variant: 'secondary' as const },
				{ label: 'Delete', action: () => console.log('Delete'), variant: 'danger' as const }
			]
		},
		{
			id: 2,
			title: 'Presentation.pptx',
			subtitle: 'PowerPoint Presentation',
			meta: '5.1 MB',
			icon: '📊',
			actions: [
				{ label: 'Download', action: () => console.log('Download'), variant: 'primary' as const },
				{ label: 'Share', action: () => console.log('Share'), variant: 'secondary' as const }
			]
		}
	];

	// List variants
	const variants: { name: string; value: ListVariant }[] = [
		{ name: 'Default', value: 'default' },
		{ name: 'Cards', value: 'cards' },
		{ name: 'Compact', value: 'compact' },
		{ name: 'Detailed', value: 'detailed' },
	];

	// Code examples
	const basicExample = `<List items={[
  { id: 1, title: 'Item 1', subtitle: 'Description' },
  { id: 2, title: 'Item 2', subtitle: 'Description' }
]} />`;

	const variantsExample = `<List variant="default" items={items} />
<List variant="cards" items={items} />
<List variant="compact" items={items} />
<List variant="detailed" items={items} />`;

	const featuresExample = `<List 
  items={items}
  searchable={true}
  selectable={true}
  sortable={true}
  dividers={true}
/>`;

	const actionsExample = `<List items={[
  {
    id: 1,
    title: 'Document.pdf',
    actions: [
      { label: 'Download', action: () => {}, variant: 'primary' },
      { label: 'Delete', action: () => {}, variant: 'danger' }
    ]
  }
]} />`;
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">List Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Display collections of items with various layouts, interactions, and features.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic List"
			description="A simple list with basic items."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<List items={compactItems} />
			</div>
		</ComponentPreview>

		<!-- List Variants -->
		<ComponentPreview
			title="List Variants"
			description="Different visual layouts for lists."
			codeSnippet={variantsExample}
		>
			<div class="space-y-8">
				{#each variants as variant}
					<div>
						<h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">{variant.name} Variant</h3>
						<List variant={variant.value} items={sampleItems.slice(0, 3)} />
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Interactive Features -->
		<ComponentPreview
			title="Interactive Features"
			description="Lists with search, selection, and sorting capabilities."
			codeSnippet={featuresExample}
		>
			<div class="space-y-4">
				<List 
					items={sampleItems}
					searchable={true}
					selectable={true}
					sortable={true}
					dividers={true}
					emptyMessage="No items match your search"
				/>
			</div>
		</ComponentPreview>

		<!-- Compact Layout -->		<ComponentPreview
			title="Compact Layout"
			description="Space-efficient layout for navigation or simple lists."
			codeSnippet={`<List variant="compact" items={compactItems} />

<!-- Sample data -->
const compactItems = [
  { id: 1, title: 'Home', icon: '🏠' },
  { id: 2, title: 'Profile', icon: '👤' },
  { id: 3, title: 'Settings', icon: '⚙️' }
];`}
		>
			<div class="space-y-4">
				<List variant="compact" items={compactItems} />
			</div>
		</ComponentPreview>

		<!-- List with Actions -->
		<ComponentPreview
			title="List with Actions"
			description="Items can have action buttons for quick operations."
			codeSnippet={actionsExample}
		>
			<div class="space-y-4">
				<List items={actionItems} variant="detailed" />
			</div>
		</ComponentPreview>

		<!-- Cards Variant -->		<ComponentPreview
			title="Cards Variant"
			description="Display items as cards for a more visual layout."
			codeSnippet={`<List variant="cards" items={sampleItems} />

<!-- Sample data -->
const sampleItems = [
  {
    id: 1,
    title: 'John Doe',
    subtitle: 'Software Engineer',
    description: 'Experienced developer...',
    avatar: '👨‍💻',
    meta: '2 years ago',
    status: 'active'
  }
];`}
		>
			<div class="space-y-4">
				<List variant="cards" items={sampleItems} />
			</div>
		</ComponentPreview>

		<!-- Selectable List -->		<ComponentPreview
			title="Selectable List"
			description="Enable selection of items with checkboxes."
			codeSnippet={`<List selectable={true} multiSelect={true} items={sampleItems} />

<!-- Sample data -->
const sampleItems = [
  { id: 1, title: 'Item 1', subtitle: 'Description 1' },
  { id: 2, title: 'Item 2', subtitle: 'Description 2' },
  { id: 3, title: 'Item 3', subtitle: 'Description 3' }
];`}
		>
			<div class="space-y-4">
				<List 
					selectable={true} 
					multiSelect={true} 
					items={sampleItems.slice(0, 4)}
					variant="default"
				/>
			</div>
		</ComponentPreview>

		<!-- Loading State -->
		<ComponentPreview
			title="Loading State"
			description="Show loading state while data is being fetched."
			codeSnippet='<List loading={true} items={[]} />'
		>
			<div class="space-y-4">
				<List loading={true} items={[]} />
			</div>
		</ComponentPreview>
	</div>
</section>
