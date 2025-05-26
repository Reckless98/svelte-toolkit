<script lang="ts">
  import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import ComponentPreview from '../ComponentPreview.svelte';
  import type { DropdownItem, DropdownVariant, DropdownSize, DropdownPosition } from '$lib/components/Dropdown';
  
  // Properly typed variables for dropdown selections
  let selectedItem: DropdownItem | null = null;
  let selectedMultiple: DropdownItem[] = [];
  let searchableSelected: DropdownItem | null = null;
  let groupedSelected: DropdownItem | null = null;
  const basicItems: DropdownItem[] = [
    { id: '1', label: 'Option 1', value: 'option1' },
    { id: '2', label: 'Option 2', value: 'option2' },
    { id: '3', label: 'Option 3', value: 'option3' },
    { id: '4', label: 'Option 4', value: 'option4' }
  ];

  const itemsWithIcons: DropdownItem[] = [
    { id: '1', label: 'Home', value: 'home', icon: '🏠' },
    { id: '2', label: 'Profile', value: 'profile', icon: '👤' },
    { id: '3', label: 'Settings', value: 'settings', icon: '⚙️' },
    { id: '4', label: 'Logout', value: 'logout', icon: '🚪' }
  ];

  // Flattened grouped items for dropdown usage
  const groupedItems: DropdownItem[] = [
    { id: 'apple', label: 'Apple', value: 'apple' },
    { id: 'banana', label: 'Banana', value: 'banana' },
    { id: 'orange', label: 'Orange', value: 'orange' },
    { id: 'carrot', label: 'Carrot', value: 'carrot' },
    { id: 'broccoli', label: 'Broccoli', value: 'broccoli' },
    { id: 'spinach', label: 'Spinach', value: 'spinach' }
  ];  const fundamentalsExample = `<!-- Basic Dropdown Usage -->
<Dropdown 
  items={basicItems} 
  on:select={(e) => selectedItem = e.detail.item}
  placeholder="Select an option"
/>

<!-- Dropdown with Icons -->
<Dropdown 
  items={itemsWithIcons}
  on:select={(e) => selectedItem = e.detail.item}
  placeholder="Choose action"
/>

<!-- Sample Data Structure -->
const basicItems = [
  { id: '1', label: 'Option 1', value: 'option1' },
  { id: '2', label: 'Option 2', value: 'option2' }
];`;

  const visualStylesExample = `<!-- All Dropdown Variants -->
<Dropdown variant="default" items={items} placeholder="Default" />
<Dropdown variant="minimal" items={items} placeholder="Minimal" />
<Dropdown variant="bordered" items={items} placeholder="Bordered" />
<Dropdown variant="elevated" items={items} placeholder="Elevated" />
<Dropdown variant="glass" items={items} placeholder="Glass" />
<Dropdown variant="dark" items={items} placeholder="Dark" />

<!-- Size Options -->
<Dropdown size="sm" items={items} placeholder="Small" />
<Dropdown size="md" items={items} placeholder="Medium" />
<Dropdown size="lg" items={items} placeholder="Large" />`;

  const advancedFeaturesExample = `<!-- Searchable Dropdown -->
<Dropdown 
  items={items}
  searchable
  on:select={(e) => searchableSelected = e.detail.item}
  placeholder="Search options..."
/>

<!-- Positioned Dropdowns -->
<Dropdown position="top-start" items={items} placeholder="Top Start" />
<Dropdown position="bottom-end" items={items} placeholder="Bottom End" />

<!-- Multiple Selection -->
<Dropdown 
  items={items}
  multiple
  on:select={(e) => selectedMultiple = e.detail.items}
  placeholder="Select multiple..."
/>`;

  const stateManagementExample = `<!-- Loading State -->
<Dropdown 
  items={[]}
  loading
  placeholder="Loading options..."
/>

<!-- Disabled State -->
<Dropdown 
  items={items}
  disabled
  placeholder="Disabled dropdown"
/>

<!-- Empty State -->
<Dropdown 
  items={[]}
  emptyMessage="No options available"
  placeholder="Empty dropdown"
/>

<!-- Error State -->
<Dropdown 
  items={items}
  error="Please select a valid option"
  placeholder="With error"
/>`;

  // Event handlers
  function handleSelect(event: CustomEvent<{ item: DropdownItem }>) {
    selectedItem = event.detail.item;
  }

  function handleSearchableSelect(event: CustomEvent<{ item: DropdownItem }>) {
    searchableSelected = event.detail.item;
  }

  function handleGroupedSelect(event: CustomEvent<{ item: DropdownItem }>) {
    groupedSelected = event.detail.item;
  }
  // Typed arrays for iteration
  const variants: DropdownVariant[] = ['default', 'minimal', 'bordered', 'elevated', 'glass', 'dark'];
  const sizes: DropdownSize[] = ['sm', 'md', 'lg'];
  const positions: DropdownPosition[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
</script>

<section>
	<div class="max-w-6xl mx-auto">
		<div class="mb-8">
			<h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
				Dropdown Component
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
				A comprehensive dropdown component with search, selection, positioning, and extensive customization options 
				for building intuitive user interfaces.
			</p>
		</div>

		<!-- Dropdown Fundamentals & Basic Usage -->
		<ComponentPreview
			title="Dropdown Fundamentals & Basic Usage"
			description="Essential dropdown functionality with basic items and icon support - the foundation for all dropdown interactions."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["Basic Selection", "Icon Support", "Event Handling", "Data Structure"]}
		>
			<div class="space-y-8">
				<!-- Basic Dropdown -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Basic Selection</h3>
					<div class="flex justify-center">
						<div class="w-64">
							<Dropdown 
								items={basicItems} 
								on:select={handleSelect}
								placeholder="Select an option"
							/>
						</div>
					</div>
					{#if selectedItem}
						<p class="text-center mt-2 text-sm text-gray-600">Selected: {selectedItem.label}</p>
					{/if}
				</div>

				<!-- Dropdown with Icons -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">With Icons</h3>
					<div class="flex justify-center">
						<div class="w-64">
							<Dropdown 
								items={itemsWithIcons} 
								on:select={handleSelect}
								placeholder="Choose action"
							/>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Visual Styles & Customization -->
		<ComponentPreview
			title="Visual Styles & Customization"
			description="Complete overview of all visual variants and sizes - choose the perfect style to match your design system and application needs."
			codeSnippet={visualStylesExample}
			complexity="Intermediate"
			features={["Visual Variants", "Size Options", "Design Systems", "Style Flexibility"]}
		>
			<div class="space-y-8">
				<!-- Variants Grid -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Visual Variants</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each variants as variant}
							<div class="space-y-2">
								<div class="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize text-center">{variant}</div>
								<Dropdown 
									variant={variant}
									items={basicItems} 
									placeholder="{variant} style"
									on:select={handleSelect}
								/>
							</div>
						{/each}
					</div>
				</div>

				<!-- Sizes -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Size Options</h3>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						{#each sizes as size}
							<div class="space-y-2">
								<div class="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize text-center">{size}</div>
								<Dropdown 
									size={size}
									items={basicItems} 
									placeholder="{size} dropdown"
									on:select={handleSelect}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced Features & Interactions -->
		<ComponentPreview
			title="Advanced Features & Interactions"
			description="Powerful features including search functionality, positioning control, and multiple selection modes for complex user interactions."
			codeSnippet={advancedFeaturesExample}
			complexity="Advanced"
			features={["Search & Filter", "Positioning Control", "Multi-selection", "Smart Interactions"]}
		>
			<div class="space-y-8">
				<!-- Searchable Dropdown -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Searchable Dropdown</h3>
					<div class="flex justify-center">
						<div class="w-64">
							<Dropdown 
								items={groupedItems} 
								on:select={handleSearchableSelect}
								searchable
								placeholder="Search fruits & vegetables..."
							/>
						</div>
					</div>
					{#if searchableSelected}
						<p class="text-center mt-2 text-sm text-gray-600">Found: {searchableSelected.label}</p>
					{/if}
				</div>

				<!-- Positioning Options -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Position Control</h3>
					<div class="grid grid-cols-2 gap-8 p-8">
						{#each positions as position}
							<div class="space-y-2 text-center">
								<div class="text-sm font-medium text-gray-600 dark:text-gray-400">{position}</div>
								<Dropdown 
									position={position}
									items={basicItems} 
									placeholder={position}
									on:select={handleSelect}
								/>
							</div>
						{/each}
					</div>
				</div>

				<!-- Grouped Items Example -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Complex Data Structure</h3>
					<div class="flex justify-center">
						<div class="w-64">
							<Dropdown 
								items={groupedItems} 
								on:select={handleGroupedSelect}
								placeholder="Select from categories"
							/>
						</div>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- State Management & Edge Cases -->
		<ComponentPreview
			title="State Management & Edge Cases"
			description="Handle all possible states including loading, empty, disabled, and error scenarios for robust user experience in production applications."
			codeSnippet={stateManagementExample}
			complexity="Advanced"
			features={["Loading States", "Empty States", "Error Handling", "Disabled States", "Edge Cases"]}
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Loading State -->
				<div class="space-y-4">
					<h3 class="font-semibold text-gray-700 dark:text-gray-300">Loading State</h3>
					<Dropdown 
						items={[]}
						loading
						placeholder="Loading options..."
					/>
				</div>

				<!-- Disabled State -->
				<div class="space-y-4">
					<h3 class="font-semibold text-gray-700 dark:text-gray-300">Disabled State</h3>
					<Dropdown 
						items={basicItems}
						disabled
						placeholder="Disabled dropdown"
					/>
				</div>

				<!-- Empty State -->
				<div class="space-y-4">
					<h3 class="font-semibold text-gray-700 dark:text-gray-300">Empty State</h3>
					<Dropdown 
						items={[]}
						emptyMessage="No options available at this time"
						placeholder="Empty dropdown"
					/>
				</div>				<!-- Error State Example -->
				<div class="space-y-4">
					<h3 class="font-semibold text-gray-700 dark:text-gray-300">Error Handling</h3>
					<div class="space-y-2">
						<div class="border border-red-300 rounded-md">
							<Dropdown 
								items={basicItems}
								placeholder="Select required option"
							/>
						</div>
						<p class="text-sm text-red-600">Please select a valid option</p>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
