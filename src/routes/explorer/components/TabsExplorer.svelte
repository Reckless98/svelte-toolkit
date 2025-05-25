<!-- Tabs Component Explorer -->
<script lang="ts">
	import Tabs from '$lib/components/Tabs';
	import ComponentPreview from '../ComponentPreview.svelte';

	type TabsVariant = 'default' | 'pills' | 'underline' | 'cards';
	type TabsSize = 'sm' | 'md' | 'lg';

	// Sample tabs data
	const basicTabs = [
		{ id: 'tab1', label: 'Tab 1' },
		{ id: 'tab2', label: 'Tab 2' },
		{ id: 'tab3', label: 'Tab 3' }
	];

	const iconTabs = [
		{ id: 'home', label: 'Home', icon: '🏠' },
		{ id: 'profile', label: 'Profile', icon: '👤' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' },
		{ id: 'messages', label: 'Messages', icon: '💬', badge: '3' }
	];

	const statusTabs = [
		{ id: 'all', label: 'All Items', badge: '24' },
		{ id: 'active', label: 'Active', badge: '12' },
		{ id: 'pending', label: 'Pending', badge: '5' },
		{ id: 'disabled', label: 'Disabled', disabled: true }
	];

	const navigationTabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '📊' },
		{ id: 'analytics', label: 'Analytics', icon: '📈' },
		{ id: 'reports', label: 'Reports', icon: '📋' },
		{ id: 'users', label: 'Users', icon: '👥' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' }
	];

	// Tabs variants
	const variants: { name: string; value: TabsVariant }[] = [
		{ name: 'Default', value: 'default' },
		{ name: 'Pills', value: 'pills' },
		{ name: 'Underline', value: 'underline' },
		{ name: 'Cards', value: 'cards' },
	];

	// Tabs sizes
	const sizes: { name: string; value: TabsSize }[] = [
		{ name: 'Small', value: 'sm' },
		{ name: 'Medium', value: 'md' },
		{ name: 'Large', value: 'lg' },
	];

	// Active tab states
	let activeTab1 = 'tab1';
	let activeTab2 = 'home';
	let activeTab3 = 'all';
	let activeTab4 = 'dashboard';

	// Code examples
	const basicExample = `<Tabs 
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' }
  ]}
  activeTab="tab1"
/>`;

	const variantsExample = `<Tabs variant="default" tabs={tabs} />
<Tabs variant="pills" tabs={tabs} />
<Tabs variant="underline" tabs={tabs} />
<Tabs variant="cards" tabs={tabs} />`;

	const sizesExample = `<Tabs size="sm" tabs={tabs} />
<Tabs size="md" tabs={tabs} />
<Tabs size="lg" tabs={tabs} />`;

	const iconsExample = `<Tabs tabs={[
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
]} />`;

	const badgesExample = `<Tabs tabs={[
  { id: 'all', label: 'All', badge: '24' },
  { id: 'active', label: 'Active', badge: '12' },
  { id: 'pending', label: 'Pending', badge: '5' }
]} />`;
</script>

<section>
	<div class="max-w-6xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Tabs Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Navigate between different views with tabbed interfaces in various styles and configurations.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Tabs"
			description="Simple tabbed navigation."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<Tabs 
					tabs={basicTabs}
					bind:activeTab={activeTab1}
				/>
				
				<!-- Tab Content -->
				<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					{#if activeTab1 === 'tab1'}
						<h3 class="font-medium mb-2">Tab 1 Content</h3>
						<p class="text-gray-600 dark:text-gray-400">This is the content for the first tab.</p>
					{:else if activeTab1 === 'tab2'}
						<h3 class="font-medium mb-2">Tab 2 Content</h3>
						<p class="text-gray-600 dark:text-gray-400">This is the content for the second tab.</p>
					{:else if activeTab1 === 'tab3'}
						<h3 class="font-medium mb-2">Tab 3 Content</h3>
						<p class="text-gray-600 dark:text-gray-400">This is the content for the third tab.</p>
					{/if}
				</div>
			</div>
		</ComponentPreview>

		<!-- Tabs Variants -->
		<ComponentPreview
			title="Tabs Variants"
			description="Different visual styles for tabs."
			codeSnippet={variantsExample}
		>
			<div class="space-y-8">
				{#each variants as variant}
					<div>
						<h3 class="font-medium mb-4 text-gray-700 dark:text-gray-300">{variant.name} Variant</h3>
						<Tabs 
							variant={variant.value}
							tabs={basicTabs}
							activeTab="tab2"
						/>
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Tabs Sizes -->
		<ComponentPreview
			title="Tabs Sizes"
			description="Tabs in different sizes."
			codeSnippet={sizesExample}
		>
			<div class="space-y-8">
				{#each sizes as size}
					<div>
						<h3 class="font-medium mb-4 text-gray-700 dark:text-gray-300">{size.name} Size</h3>
						<Tabs 
							size={size.value}
							tabs={basicTabs}
							variant="pills"
							activeTab="tab1"
						/>
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Tabs with Icons -->
		<ComponentPreview
			title="Tabs with Icons"
			description="Enhance tabs with icons for better visual identification."
			codeSnippet={iconsExample}
		>
			<div class="space-y-4">
				<Tabs 
					tabs={iconTabs}
					bind:activeTab={activeTab2}
					variant="pills"
				/>
				
				<!-- Tab Content -->
				<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					{#if activeTab2 === 'home'}
						<h3 class="font-medium mb-2">🏠 Home</h3>
						<p class="text-gray-600 dark:text-gray-400">Welcome to the home page.</p>
					{:else if activeTab2 === 'profile'}
						<h3 class="font-medium mb-2">👤 Profile</h3>
						<p class="text-gray-600 dark:text-gray-400">Manage your profile settings.</p>
					{:else if activeTab2 === 'settings'}
						<h3 class="font-medium mb-2">⚙️ Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Configure application settings.</p>
					{:else if activeTab2 === 'messages'}
						<h3 class="font-medium mb-2">💬 Messages</h3>
						<p class="text-gray-600 dark:text-gray-400">View your messages and conversations.</p>
					{/if}
				</div>
			</div>
		</ComponentPreview>

		<!-- Tabs with Badges -->
		<ComponentPreview
			title="Tabs with Badges"
			description="Display notification counts or status indicators with badges."
			codeSnippet={badgesExample}
		>
			<div class="space-y-4">
				<Tabs 
					tabs={statusTabs}
					bind:activeTab={activeTab3}
					variant="underline"
				/>
				
				<!-- Tab Content -->
				<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					{#if activeTab3 === 'all'}
						<h3 class="font-medium mb-2">All Items (24)</h3>
						<p class="text-gray-600 dark:text-gray-400">Displaying all 24 items in the system.</p>
					{:else if activeTab3 === 'active'}
						<h3 class="font-medium mb-2">Active Items (12)</h3>
						<p class="text-gray-600 dark:text-gray-400">Showing 12 currently active items.</p>
					{:else if activeTab3 === 'pending'}
						<h3 class="font-medium mb-2">Pending Items (5)</h3>
						<p class="text-gray-600 dark:text-gray-400">5 items are pending approval.</p>
					{/if}
				</div>
			</div>
		</ComponentPreview>

		<!-- Full Width Tabs -->
		<ComponentPreview
			title="Full Width Tabs"
			description="Tabs that stretch to fill the available width."
			codeSnippet={`<Tabs tabs={basicTabs} fullWidth={true} />

<!-- Sample data -->
const basicTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' }
];`}
		>
			<div class="space-y-4">
				<Tabs 
					tabs={basicTabs}
					fullWidth={true}
					variant="cards"
					activeTab="tab2"
				/>
			</div>
		</ComponentPreview>

		<!-- Scrollable Tabs -->
		<ComponentPreview
			title="Scrollable Tabs"
			description="Tabs that scroll horizontally when there are many items."
			codeSnippet={`<Tabs tabs={manyTabs} scrollable={true} />

<!-- Sample data with many tabs -->
const manyTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'tab4', label: 'Tab 4' },
  { id: 'tab5', label: 'Tab 5' },
  { id: 'tab6', label: 'Tab 6' },
  { id: 'tab7', label: 'Tab 7' },
  { id: 'tab8', label: 'Tab 8' }
];`}
		>
			<div class="space-y-4">
				<Tabs 
					tabs={navigationTabs}
					bind:activeTab={activeTab4}
					scrollable={true}
					variant="pills"
				/>
				
				<!-- Tab Content -->
				<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					{#if activeTab4 === 'dashboard'}
						<h3 class="font-medium mb-2">📊 Dashboard</h3>
						<p class="text-gray-600 dark:text-gray-400">Overview of key metrics and data.</p>
					{:else if activeTab4 === 'analytics'}
						<h3 class="font-medium mb-2">📈 Analytics</h3>
						<p class="text-gray-600 dark:text-gray-400">Detailed analytics and insights.</p>
					{:else if activeTab4 === 'reports'}
						<h3 class="font-medium mb-2">📋 Reports</h3>
						<p class="text-gray-600 dark:text-gray-400">Generate and view reports.</p>
					{:else if activeTab4 === 'users'}
						<h3 class="font-medium mb-2">👥 Users</h3>
						<p class="text-gray-600 dark:text-gray-400">Manage user accounts and permissions.</p>
					{:else if activeTab4 === 'settings'}
						<h3 class="font-medium mb-2">⚙️ Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Application configuration and preferences.</p>
					{/if}
				</div>
			</div>
		</ComponentPreview>

				<!-- Centered Tabs -->
				<ComponentPreview
					title="Centered Tabs"
					description="Center-aligned tabs for a balanced layout."
					codeSnippet={`<Tabs tabs={basicTabs} centered={true} />
		
		<!-- Sample data -->
		const basicTabs = [
		  { id: 'tab1', label: 'Tab 1' },
		  { id: 'tab2', label: 'Tab 2' },
		  { id: 'tab3', label: 'Tab 3' }
		];`}
				>
			<div class="space-y-4">
				<Tabs 
					tabs={basicTabs}
					centered={true}
					variant="underline"
					activeTab="tab2"
				/>
			</div>
		</ComponentPreview>

		<!-- Disabled Tab -->
		<ComponentPreview
			title="Disabled Tab"
			description="Some tabs can be disabled to prevent interaction."
			codeSnippet='<Tabs tabs={[
  { id: "tab1", label: "Enabled" },
  { id: "tab2", label: "Disabled", disabled: true }
]} />'
		>
			<div class="space-y-4">
				<Tabs 
					tabs={[
						{ id: 'enabled1', label: 'Available' },
						{ id: 'enabled2', label: 'Active' },
						{ id: 'disabled1', label: 'Disabled', disabled: true },
						{ id: 'enabled3', label: 'Settings' }
					]}
					variant="pills"
					activeTab="enabled1"
				/>
			</div>
		</ComponentPreview>
	</div>
</section>
