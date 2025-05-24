<script>
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import { onMount } from 'svelte';

	// Basic tabs
	let basicTabs = [
		{ id: 'tab1', label: 'Overview', content: 'This is the overview tab content. Here you can see a summary of all important information.' },
		{ id: 'tab2', label: 'Analytics', content: 'Analytics tab shows detailed metrics and performance data for your application.' },
		{ id: 'tab3', label: 'Settings', content: 'Configure your application settings and preferences in this tab.' }
	];

	// Tabs with badges
	let badgeTabs = [
		{ id: 'inbox', label: 'Inbox', badge: 12, content: 'You have 12 new messages in your inbox.' },
		{ id: 'sent', label: 'Sent', badge: 5, content: 'You have sent 5 messages today.' },
		{ id: 'drafts', label: 'Drafts', badge: 3, content: '3 draft messages are waiting to be sent.' },
		{ id: 'archived', label: 'Archived', content: 'All your archived messages are stored here.' }
	];

	// Tabs with icons
	let iconTabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '📊', content: 'Welcome to your dashboard. View key metrics and insights here.' },
		{ id: 'users', label: 'Users', icon: '👥', content: 'Manage user accounts and permissions from this panel.' },
		{ id: 'reports', label: 'Reports', icon: '📈', content: 'Generate and download various reports for your business.' },
		{ id: 'settings', label: 'Settings', icon: '⚙️', content: 'Customize your application settings and preferences.' }
	];

	// Vertical tabs
	let verticalTabs = [
		{ id: 'profile', label: 'Profile Information', content: 'Update your personal profile information including name, email, and bio.' },
		{ id: 'security', label: 'Security Settings', content: 'Manage your password, two-factor authentication, and security preferences.' },
		{ id: 'notifications', label: 'Notifications', content: 'Control when and how you receive notifications from the application.' },
		{ id: 'billing', label: 'Billing & Plans', content: 'View your subscription details and manage billing information.' },
		{ id: 'integrations', label: 'Integrations', content: 'Connect third-party services and manage API integrations.' }
	];

	// Complex content tabs
	let complexTabs = [
		{
			id: 'products',
			label: 'Products',
			icon: '🛍️',
			badge: 24,
			content: `
				<div class="space-y-4">
					<h3 class="text-lg font-semibold">Product Catalog</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<h4 class="font-medium">Active Products</h4>
							<p class="text-2xl font-bold text-blue-600">24</p>
						</div>
						<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<h4 class="font-medium">Out of Stock</h4>
							<p class="text-2xl font-bold text-red-600">3</p>
						</div>
					</div>
				</div>
			`
		},
		{
			id: 'orders',
			label: 'Orders',
			icon: '📦',
			badge: 15,
			content: `
				<div class="space-y-4">
					<h3 class="text-lg font-semibold">Order Management</h3>
					<div class="space-y-2">
						<div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
							<span>Pending Orders</span>
							<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">8</span>
						</div>
						<div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
							<span>Processing</span>
							<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">5</span>
						</div>
						<div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
							<span>Shipped</span>
							<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">2</span>
						</div>
					</div>
				</div>
			`
		},
		{
			id: 'customers',
			label: 'Customers',
			icon: '👤',
			content: `
				<div class="space-y-4">
					<h3 class="text-lg font-semibold">Customer Overview</h3>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p class="text-2xl font-bold">1,247</p>
							<p class="text-sm text-gray-600 dark:text-gray-300">Total Customers</p>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p class="text-2xl font-bold">89</p>
							<p class="text-sm text-gray-600 dark:text-gray-300">New This Month</p>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p class="text-2xl font-bold">94%</p>
							<p class="text-sm text-gray-600 dark:text-gray-300">Satisfaction Rate</p>
						</div>
					</div>
				</div>
			`
		}
	];

	let activeTab = 'tab1';
	let badgeActiveTab = 'inbox';
	let iconActiveTab = 'dashboard';
	let verticalActiveTab = 'profile';
	let complexActiveTab = 'products';

	function handleTabChange(event, tabVar) {
		const newTab = event.detail;
		if (tabVar === 'basic') activeTab = newTab;
		else if (tabVar === 'badge') badgeActiveTab = newTab;
		else if (tabVar === 'icon') iconActiveTab = newTab;
		else if (tabVar === 'vertical') verticalActiveTab = newTab;
		else if (tabVar === 'complex') complexActiveTab = newTab;
		
		console.log(`Tab changed to: ${newTab}`);
	}
</script>

<svelte:head>
	<title>Tabs Component - Svelte UI Toolkit</title>
	<meta name="description" content="Flexible tabs component with variants, badges, icons, and vertical orientation support." />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-12">
	<!-- Header -->
	<div class="text-center space-y-4">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white">Tabs Component</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
			Flexible tabs component with multiple variants, badge support, icons, vertical orientation, and customizable styling.
		</p>
	</div>

	<!-- Basic Tabs -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Basic Tabs</h2>
			<p class="text-gray-600 dark:text-gray-300">Simple tab navigation with content switching.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={basicTabs}
				bind:activeTab={activeTab}
				on:change={(e) => handleTabChange(e, 'basic')}
			/>
		</div>
		<details class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
			<summary class="cursor-pointer font-medium text-gray-900 dark:text-white">View Code</summary>
			<pre class="mt-2 text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`<script>
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	
	let tabs = [
		{ id: 'tab1', label: 'Overview', content: 'Overview content here...' },
		{ id: 'tab2', label: 'Analytics', content: 'Analytics content here...' },
		{ id: 'tab3', label: 'Settings', content: 'Settings content here...' }
	];
	
	let activeTab = 'tab1';
</script>

<Tabs 
	tabs={tabs}
	bind:activeTab={activeTab}
	on:change={(e) => console.log('Tab changed:', e.detail)}
/>`}</code></pre>
		</details>
	</section>

	<!-- Tabs with Badges -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Tabs with Badges</h2>
			<p class="text-gray-600 dark:text-gray-300">Tabs with notification badges to show counts or status.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={badgeTabs}
				bind:activeTab={badgeActiveTab}
				showBadges={true}
				on:change={(e) => handleTabChange(e, 'badge')}
			/>
		</div>
	</section>

	<!-- Tabs with Icons -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Tabs with Icons</h2>
			<p class="text-gray-600 dark:text-gray-300">Enhanced tabs with icons for better visual identification.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={iconTabs}
				bind:activeTab={iconActiveTab}
				showIcons={true}
				on:change={(e) => handleTabChange(e, 'icon')}
			/>
		</div>
	</section>

	<!-- Vertical Tabs -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Vertical Tabs</h2>
			<p class="text-gray-600 dark:text-gray-300">Vertical orientation for sidebar-style navigation.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={verticalTabs}
				bind:activeTab={verticalActiveTab}
				orientation="vertical"
				on:change={(e) => handleTabChange(e, 'vertical')}
			/>
		</div>
	</section>

	<!-- Tab Variants -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Tab Variants</h2>
			<p class="text-gray-600 dark:text-gray-300">Different visual styles for various design needs.</p>
		</div>
		<div class="space-y-6">
			<!-- Default Variant -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
				<h3 class="mb-4 font-medium text-gray-900 dark:text-white">Default</h3>
				<Tabs 
					tabs={basicTabs.slice(0, 3)}
					variant="default"
				/>
			</div>
			
			<!-- Pills Variant -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
				<h3 class="mb-4 font-medium text-gray-900 dark:text-white">Pills</h3>
				<Tabs 
					tabs={basicTabs.slice(0, 3)}
					variant="pills"
				/>
			</div>
			
			<!-- Underline Variant -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
				<h3 class="mb-4 font-medium text-gray-900 dark:text-white">Underline</h3>
				<Tabs 
					tabs={basicTabs.slice(0, 3)}
					variant="underline"
				/>
			</div>
		</div>
	</section>

	<!-- Complex Content -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Complex Content</h2>
			<p class="text-gray-600 dark:text-gray-300">Tabs with rich HTML content, icons, and badges combined.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={complexTabs}
				bind:activeTab={complexActiveTab}
				showIcons={true}
				showBadges={true}
				allowHtml={true}
				on:change={(e) => handleTabChange(e, 'complex')}
			/>
		</div>
	</section>

	<!-- Disabled Tabs -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Disabled Tabs</h2>
			<p class="text-gray-600 dark:text-gray-300">Some tabs can be disabled to prevent interaction.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={[
					{ id: 'enabled1', label: 'Enabled Tab 1', content: 'This tab is enabled and clickable.' },
					{ id: 'disabled1', label: 'Disabled Tab', content: 'This content is not accessible.', disabled: true },
					{ id: 'enabled2', label: 'Enabled Tab 2', content: 'This tab is also enabled.' },
					{ id: 'disabled2', label: 'Also Disabled', content: 'This content is also not accessible.', disabled: true }
				]}
			/>
		</div>
	</section>

	<!-- Responsive Behavior -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Responsive Design</h2>
			<p class="text-gray-600 dark:text-gray-300">Tabs automatically adapt to smaller screens with scrollable navigation.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Tabs 
				tabs={[
					{ id: 'r1', label: 'Very Long Tab Name 1', content: 'Content for first responsive tab.' },
					{ id: 'r2', label: 'Another Long Tab Name 2', content: 'Content for second responsive tab.' },
					{ id: 'r3', label: 'Yet Another Long Tab Name 3', content: 'Content for third responsive tab.' },
					{ id: 'r4', label: 'Even More Long Tab Name 4', content: 'Content for fourth responsive tab.' },
					{ id: 'r5', label: 'The Longest Tab Name Ever 5', content: 'Content for fifth responsive tab.' }
				]}
				responsive={true}
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
						<td class="py-2 font-mono">tabs</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Array of tab objects</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">activeTab</td>
						<td class="py-2">string</td>
						<td class="py-2">''</td>
						<td class="py-2">ID of currently active tab</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">variant</td>
						<td class="py-2">'default' | 'pills' | 'underline'</td>
						<td class="py-2">'default'</td>
						<td class="py-2">Visual style variant</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">orientation</td>
						<td class="py-2">'horizontal' | 'vertical'</td>
						<td class="py-2">'horizontal'</td>
						<td class="py-2">Tab layout orientation</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">showIcons</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Display tab icons</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">showBadges</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Display tab badges</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">allowHtml</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Allow HTML in tab content</td>
					</tr>
					<tr>
						<td class="py-2 font-mono">responsive</td>
						<td class="py-2">boolean</td>
						<td class="py-2">true</td>
						<td class="py-2">Enable responsive behavior</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Tab Object Structure -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Tab Object Structure</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<pre class="text-sm bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto"><code>{`interface Tab {
  id: string;           // Unique identifier
  label: string;        // Display label
  content: string;      // Tab content (HTML if allowHtml is true)
  icon?: string;        // Icon (emoji or icon class)
  badge?: number;       // Badge count
  disabled?: boolean;   // Whether tab is disabled
}`}</code></pre>
		</div>
	</section>

	<!-- Events Documentation -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Events</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:change</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when the active tab changes. Detail contains the new tab ID.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Best Practices -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Best Practices</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4 text-gray-600 dark:text-gray-300">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Tab Labels</h3>
					<p class="text-sm">Keep tab labels short and descriptive. Use 1-2 words when possible.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Number of Tabs</h3>
					<p class="text-sm">Limit tabs to 5-7 for horizontal layouts. Consider vertical tabs or dropdown menus for more options.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Content Loading</h3>
					<p class="text-sm">Consider lazy loading content for tabs that contain heavy resources or data.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Keyboard Navigation</h3>
					<p class="text-sm">Ensure tabs can be navigated using arrow keys and activated with Enter/Space for accessibility.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Badge Usage</h3>
					<p class="text-sm">Use badges sparingly for important notifications. Consider updating badges in real-time for dynamic content.</p>
				</div>
			</div>
		</div>
	</section>
</div>
