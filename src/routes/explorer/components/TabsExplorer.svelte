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
	// Code examples for smart grouped sections
	const fundamentalsExample = `<!-- Basic tabs usage -->
<Tabs 
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' }
  ]}
  activeTab="tab1"
/>

<!-- Different visual variants -->
<Tabs variant="default" tabs={tabs} />
<Tabs variant="pills" tabs={tabs} />
<Tabs variant="underline" tabs={tabs} />
<Tabs variant="cards" tabs={tabs} />

<!-- Different sizes -->
<Tabs size="sm" tabs={tabs} />
<Tabs size="md" tabs={tabs} />
<Tabs size="lg" tabs={tabs} />`;

	const enhancedFeaturesExample = `<!-- Tabs with icons -->
<Tabs tabs={[
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'messages', label: 'Messages', icon: '💬', badge: '3' }
]} />

<!-- Tabs with badges and status indicators -->
<Tabs tabs={[
  { id: 'all', label: 'All Items', badge: '24' },
  { id: 'active', label: 'Active', badge: '12' },
  { id: 'pending', label: 'Pending', badge: '5' },
  { id: 'disabled', label: 'Disabled', disabled: true }
]} />

<!-- Complete feature combination -->
<Tabs 
  variant="pills"
  size="md"
  tabs={[
    { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: '2' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'users', label: 'Users', icon: '👥', badge: '15' }
  ]}
/>`;

	const layoutNavigationExample = `<!-- Full width tabs -->
<Tabs 
  tabs={basicTabs} 
  fullWidth={true} 
  variant="cards"
/>

<!-- Centered tabs -->
<Tabs 
  tabs={basicTabs} 
  centered={true} 
  variant="underline"
/>

<!-- Scrollable tabs for many items -->
<Tabs 
  tabs={manyTabs} 
  scrollable={true} 
  variant="pills"
/>

<!-- Navigation-style tabs -->
const navigationTabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'reports', label: 'Reports', icon: '📋' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];`;

	const advancedStatesExample = `<!-- Disabled tabs -->
<Tabs tabs={[
  { id: 'enabled1', label: 'Available' },
  { id: 'enabled2', label: 'Active' },
  { id: 'disabled1', label: 'Disabled', disabled: true },
  { id: 'enabled3', label: 'Settings' }
]} />

<!-- Real-world admin panel example -->
<Tabs 
  variant="underline"
  tabs={[
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥', badge: '142' },
    { id: 'orders', label: 'Orders', icon: '🛒', badge: '23' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'billing', label: 'Billing', icon: '💳', disabled: true }
  ]}
/>

<!-- Content management example -->
<Tabs 
  variant="cards" 
  size="lg"
  tabs={[
    { id: 'published', label: 'Published', badge: '45' },
    { id: 'draft', label: 'Drafts', badge: '12' },
    { id: 'scheduled', label: 'Scheduled', badge: '3' },
    { id: 'archived', label: 'Archived', badge: '128' }
  ]}
/>`;
</script>

<section>
	<div class="max-w-6xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Tabs Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Navigate between different views with tabbed interfaces in various styles and configurations.
			</p>
		</div>		<!-- Tabs Fundamentals & Styles -->
		<ComponentPreview
			title="Tabs Fundamentals & Styles"
			description="Essential tabs functionality with various visual styles and sizing options"
			codeSnippet={fundamentalsExample}
			complexity="Basic"
		>
			<div class="space-y-8">
				<!-- Basic Usage -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white">
						Basic Tabs Usage
					</h4>
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

				<!-- Visual Variants -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Visual Variants
					</h4>
					<div class="space-y-6">
						{#each variants as variant}
							<div>
								<h5 class="font-medium mb-3 text-gray-700 dark:text-gray-300">{variant.name} Variant</h5>
								<Tabs 
									variant={variant.value}
									tabs={basicTabs}
									activeTab="tab2"
								/>
							</div>
						{/each}
					</div>
				</div>

				<!-- Size Options -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Size Options
					</h4>
					<div class="space-y-6">
						{#each sizes as size}
							<div>
								<h5 class="font-medium mb-3 text-gray-700 dark:text-gray-300">{size.name} Size</h5>
								<Tabs 
									size={size.value}
									tabs={basicTabs}
									variant="pills"
									activeTab="tab1"
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Enhanced Features -->		<ComponentPreview
			title="Enhanced Features"
			description="Advanced tabs with icons, badges, and interactive elements for richer user experiences"
			codeSnippet={enhancedFeaturesExample}
			complexity="Intermediate"
		>
			<div class="space-y-8">
				<!-- Tabs with Icons -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white">
						Tabs with Icons
					</h4>
					<Tabs 
						tabs={iconTabs}
						bind:activeTab={activeTab2}
						variant="pills"
					/>
					
					<!-- Tab Content -->
					<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
						{#if activeTab2 === 'home'}
							<h3 class="font-medium mb-2">🏠 Home</h3>
							<p class="text-gray-600 dark:text-gray-400">Welcome to the home page with dashboard overview.</p>
						{:else if activeTab2 === 'profile'}
							<h3 class="font-medium mb-2">👤 Profile</h3>
							<p class="text-gray-600 dark:text-gray-400">Manage your profile settings and personal information.</p>
						{:else if activeTab2 === 'settings'}
							<h3 class="font-medium mb-2">⚙️ Settings</h3>
							<p class="text-gray-600 dark:text-gray-400">Configure application settings and preferences.</p>
						{:else if activeTab2 === 'messages'}
							<h3 class="font-medium mb-2">💬 Messages</h3>
							<p class="text-gray-600 dark:text-gray-400">View your messages and conversations. You have 3 unread messages.</p>
						{/if}
					</div>
				</div>

				<!-- Tabs with Badges -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Tabs with Badges & Status
					</h4>
					<Tabs 
						tabs={statusTabs}
						bind:activeTab={activeTab3}
						variant="underline"
					/>
					
					<!-- Tab Content -->
					<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
						{#if activeTab3 === 'all'}
							<h3 class="font-medium mb-2">All Items (24)</h3>
							<p class="text-gray-600 dark:text-gray-400">Displaying all 24 items in the system across all statuses.</p>
						{:else if activeTab3 === 'active'}
							<h3 class="font-medium mb-2">Active Items (12)</h3>
							<p class="text-gray-600 dark:text-gray-400">Showing 12 currently active items that are in use.</p>
						{:else if activeTab3 === 'pending'}
							<h3 class="font-medium mb-2">Pending Items (5)</h3>
							<p class="text-gray-600 dark:text-gray-400">5 items are pending approval or processing.</p>
						{/if}
					</div>
				</div>

				<!-- Complete Feature Combination -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Complete Feature Showcase
					</h4>
					<Tabs 
						variant="pills"
						size="md"
						tabs={[
							{ id: 'dashboard', label: 'Dashboard', icon: '📊', badge: '2' },
							{ id: 'analytics', label: 'Analytics', icon: '📈' },
							{ id: 'users', label: 'Users', icon: '👥', badge: '15' },
							{ id: 'reports', label: 'Reports', icon: '📋', badge: '7' },
							{ id: 'admin', label: 'Admin', icon: '🔒', disabled: true }
						]}
						activeTab="dashboard"
					/>
					<div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<p class="text-sm text-blue-800 dark:text-blue-200">
							<strong>✨ Enhanced tabs</strong> combining icons, badges, and disabled states for a complete navigation experience.
						</p>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Layout & Navigation -->		<ComponentPreview
			title="Layout & Navigation"
			description="Flexible layout options including full width, centered, and scrollable configurations"
			codeSnippet={layoutNavigationExample}
			complexity="Intermediate"
		>
			<div class="space-y-8">
				<!-- Full Width Tabs -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white">
						Full Width Layout
					</h4>
					<Tabs 
						tabs={basicTabs}
						fullWidth={true}
						variant="cards"
						activeTab="tab2"
					/>
					<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
						Tabs stretch to fill the entire container width, perfect for equal-width sections.
					</div>
				</div>

				<!-- Centered Tabs -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Centered Layout
					</h4>
					<Tabs 
						tabs={basicTabs}
						centered={true}
						variant="underline"
						activeTab="tab2"
					/>
					<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
						Center-aligned tabs create a balanced, symmetrical layout.
					</div>
				</div>

				<!-- Scrollable Navigation -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Scrollable Navigation
					</h4>
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
							<p class="text-gray-600 dark:text-gray-400">Overview of key metrics and data visualization.</p>
						{:else if activeTab4 === 'analytics'}
							<h3 class="font-medium mb-2">📈 Analytics</h3>
							<p class="text-gray-600 dark:text-gray-400">Detailed analytics and insights into user behavior.</p>
						{:else if activeTab4 === 'reports'}
							<h3 class="font-medium mb-2">📋 Reports</h3>
							<p class="text-gray-600 dark:text-gray-400">Generate and view comprehensive reports.</p>
						{:else if activeTab4 === 'users'}
							<h3 class="font-medium mb-2">👥 Users</h3>
							<p class="text-gray-600 dark:text-gray-400">Manage user accounts and permissions.</p>
						{:else if activeTab4 === 'settings'}
							<h3 class="font-medium mb-2">⚙️ Settings</h3>
							<p class="text-gray-600 dark:text-gray-400">Application configuration and preferences.</p>
						{/if}
					</div>
					<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
						Horizontal scrolling handles many tabs gracefully, perfect for navigation bars.
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced States & Real-World Usage -->		<ComponentPreview
			title="Advanced States & Real-World Usage"
			description="Professional implementations with disabled states, complex layouts, and real-world examples"
			codeSnippet={advancedStatesExample}
			complexity="Advanced"
		>
			<div class="space-y-8">
				<!-- Disabled States -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white">
						Disabled States & Access Control
					</h4>
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
					<div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded text-sm text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
						<strong>⚠️ Access Control:</strong> Some tabs can be disabled based on user permissions or system state.
					</div>
				</div>

				<!-- Admin Panel Example -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Admin Panel Navigation
					</h4>
					<Tabs 
						variant="underline"
						tabs={[
							{ id: 'overview', label: 'Overview', icon: '📊' },
							{ id: 'users', label: 'Users', icon: '👥', badge: '142' },
							{ id: 'orders', label: 'Orders', icon: '🛒', badge: '23' },
							{ id: 'analytics', label: 'Analytics', icon: '📈' },
							{ id: 'settings', label: 'Settings', icon: '⚙️' },
							{ id: 'billing', label: 'Billing', icon: '💳', disabled: true }
						]}
						activeTab="overview"
					/>
					<div class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
						<h3 class="font-medium mb-2">📊 System Overview</h3>
						<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
							<div class="p-3 bg-white dark:bg-gray-700 rounded border">
								<div class="text-gray-500 dark:text-gray-400">Total Users</div>
								<div class="text-xl font-bold text-blue-600 dark:text-blue-400">142</div>
							</div>
							<div class="p-3 bg-white dark:bg-gray-700 rounded border">
								<div class="text-gray-500 dark:text-gray-400">Active Orders</div>
								<div class="text-xl font-bold text-green-600 dark:text-green-400">23</div>
							</div>
							<div class="p-3 bg-white dark:bg-gray-700 rounded border">
								<div class="text-gray-500 dark:text-gray-400">Revenue</div>
								<div class="text-xl font-bold text-purple-600 dark:text-purple-400">$12.4k</div>
							</div>
							<div class="p-3 bg-white dark:bg-gray-700 rounded border">
								<div class="text-gray-500 dark:text-gray-400">Conversion</div>
								<div class="text-xl font-bold text-orange-600 dark:text-orange-400">3.2%</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Content Management Example -->
				<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
					<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Content Management System
					</h4>
					<Tabs 
						variant="cards" 
						size="lg"
						tabs={[
							{ id: 'published', label: 'Published', badge: '45' },
							{ id: 'draft', label: 'Drafts', badge: '12' },
							{ id: 'scheduled', label: 'Scheduled', badge: '3' },
							{ id: 'archived', label: 'Archived', badge: '128' }
						]}
						activeTab="published"
					/>
					<div class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
						<h3 class="font-medium mb-3">📄 Published Content (45 items)</h3>
						<div class="space-y-2">
							{#each ['How to Build Better UIs', 'Design System Best Practices', 'Component Architecture Guide'] as title, i}
								<div class="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
									<div class="flex items-center space-x-3">
										<div class="w-2 h-2 bg-green-500 rounded-full"></div>
										<span class="font-medium">{title}</span>
									</div>
									<div class="text-sm text-gray-500 dark:text-gray-400">
										{new Date(Date.now() - i * 86400000).toLocaleDateString()}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Best Practices -->
					<div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tabs Best Practices</h5>
						<ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
							<li>• Use clear, descriptive labels for each tab</li>
							<li>• Limit the number of tabs to avoid cognitive overload</li>
							<li>• Consider using badges to show counts or status</li>
							<li>• Disable tabs when content is not available or accessible</li>
							<li>• Use scrollable tabs for navigation with many options</li>
						</ul>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
