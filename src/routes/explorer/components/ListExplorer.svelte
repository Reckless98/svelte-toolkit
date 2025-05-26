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
	const fundamentalsExample = `<!-- Basic List Structure -->
<List items={[
  { id: 1, title: 'Home', icon: '🏠' },
  { id: 2, title: 'Profile', icon: '👤' },
  { id: 3, title: 'Settings', icon: '⚙️' },
  { id: 4, title: 'Messages', icon: '💬', meta: '5' }
]} />

<!-- Team Members List -->
<List items={[
  {
    id: 1,
    title: 'John Doe',
    subtitle: 'Software Engineer',
    description: 'Full-stack developer',
    avatar: '👨‍💻',
    meta: '2 years ago',
    status: 'active'
  }
]} />`;

	const layoutsVariantsExample = `<!-- All List Variants -->
<List variant="default" items={items} />
<List variant="cards" items={items} />
<List variant="compact" items={items} />
<List variant="detailed" items={items} />

<!-- Responsive Layout -->
<List 
  variant="cards"
  items={items}
  class="md:grid-cols-2 lg:grid-cols-3"
/>`;

	const interactiveFeaturesExample = `<!-- Full Interactive List -->
<List 
  items={items}
  searchable={true}
  selectable={true}
  multiSelect={true}
  sortable={true}
  dividers={true}
  loading={false}
  emptyMessage="No items found"
  on:select={handleSelection}
  on:search={handleSearch}
/>

<!-- Loading and Empty States -->
<List loading={true} items={[]} />
<List items={[]} emptyMessage="No data available" />`;

	const advancedFeaturesExample = `<!-- File Manager Example -->
<List items={[
  {
    id: 1,
    title: 'Document.pdf',
    subtitle: 'PDF Document',
    meta: '2.4 MB',
    icon: '📄',
    actions: [
      { label: 'Download', action: downloadFile, variant: 'primary' },
      { label: 'Share', action: shareFile, variant: 'secondary' },
      { label: 'Delete', action: deleteFile, variant: 'danger' }
    ]
  }
]} />

<!-- Real-time Status Updates -->
<List 
  items={teamMembers}
  variant="detailed"
  realTimeUpdates={true}
  statusIndicators={true}
/>`;
</script>

<section>	<div class="max-w-6xl mx-auto">
		<div class="mb-8">
			<h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
				List Component
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
				Flexible list component for displaying collections of data with various layouts, interactive features, 
				and advanced functionality like search, selection, and actions.
			</p>
		</div>

		<!-- List Fundamentals & Basic Usage -->
		<ComponentPreview
			title="List Fundamentals & Basic Usage"
			description="Essential list structures with different data types - from simple navigation items to complex user profiles."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["Data Structure", "Basic Rendering", "Simple Icons"]}
		>
			<div class="space-y-8">
				<!-- Simple Navigation List -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Simple Navigation Items</h3>
					<List items={compactItems} />
				</div>

				<!-- Team Members List -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Team Members Profile List</h3>
					<List items={sampleItems.slice(0, 3)} />
				</div>
			</div>
		</ComponentPreview>

		<!-- Visual Layouts & Variants -->
		<ComponentPreview
			title="Visual Layouts & Variants"
			description="Complete overview of all list layouts - compare default, cards, compact, and detailed variants to choose the best fit for your use case."
			codeSnippet={layoutsVariantsExample}
			complexity="Intermediate"
			features={["Layout Options", "Visual Variants", "Responsive Design", "Layout Comparison"]}
		>
			<div class="space-y-8">
				{#each variants as variant}
					<div>
						<div class="flex items-center justify-between mb-4">
							<h3 class="font-semibold text-gray-700 dark:text-gray-300">{variant.name} Variant</h3>
							<span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
								{variant.value}
							</span>
						</div>
						<List variant={variant.value} items={sampleItems.slice(0, 3)} />
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Interactive Features & State Management -->
		<ComponentPreview
			title="Interactive Features & State Management"
			description="Advanced list capabilities including search, selection, sorting, loading states, and empty state handling for dynamic applications."
			codeSnippet={interactiveFeaturesExample}
			complexity="Intermediate"
			features={["Search & Filter", "Multi-selection", "Sort Controls", "Loading States", "Empty States"]}
		>
			<div class="space-y-8">
				<!-- Full Interactive List -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Full Interactive Features</h3>
					<List 
						items={sampleItems}
						searchable={true}
						selectable={true}
						multiSelect={true}
						sortable={true}
						dividers={true}
						emptyMessage="No items match your search criteria"
					/>
				</div>

				<!-- State Examples -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Loading State</h3>
						<List loading={true} items={[]} />
					</div>
					<div>
						<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Empty State</h3>
						<List items={[]} emptyMessage="No data available" />
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced Features & Real-world Applications -->
		<ComponentPreview
			title="Advanced Features & Real-world Applications"
			description="Professional implementations with action buttons, file management systems, and complex business scenarios demonstrating real-world usage patterns."
			codeSnippet={advancedFeaturesExample}
			complexity="Advanced"
			features={["Action Buttons", "File Management", "Status Indicators", "Real-time Updates", "Professional UI"]}
		>
			<div class="space-y-8">
				<!-- File Manager Example -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">File Manager Interface</h3>
					<List items={actionItems} variant="detailed" />
				</div>				<!-- Team Management with Status -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Team Management Dashboard</h3>
					<List 
						items={sampleItems} 
						variant="cards"
						selectable={true}
					/>
				</div>

				<!-- Compact Navigation with Badges -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Navigation with Notification Badges</h3>
					<List variant="compact" items={compactItems} />
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
