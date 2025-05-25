<script lang="ts">
	import Badge from '$lib/components/Badge/Badge.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { theme } from '$lib/stores/theme.js';
	
	let currentTheme = 'light';
	theme.subscribe((value) => (currentTheme = value));
	$: isDark = currentTheme === 'dark';

	// Demo state for removable badges
	let techTags = ['JavaScript', 'TypeScript', 'Svelte', 'React'];
	let projectTags = ['Responsive', 'Dark Mode', 'Accessible'];
	
	// Handle badge removal
	const removeTechTag = (tagToRemove: string) => {
		techTags = techTags.filter(tag => tag !== tagToRemove);
	};
	
	const removeProjectTag = (tagToRemove: string) => {
		projectTags = projectTags.filter(tag => tag !== tagToRemove);
	};

	// Handle badge clicks
	const handleBadgeClick = (event: CustomEvent) => {
		console.log('Badge clicked:', event);
	};
</script>

<svelte:head>
	<title>Badge Component - Svelte UI Toolkit</title>
	<meta name="description" content="Flexible badge component with multiple variants and customization options" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Badge Component
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				Small status indicators and labels for displaying information, notifications, and categorization.
			</p>
		</div>

		<!-- Examples Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			
			<!-- Basic Variants -->
			<Card title="Basic Variants" description="Different badge variants with semantic colors">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge>Default</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="error">Error</Badge>
						<Badge variant="info">Info</Badge>
					</div>
				</div>
			</Card>

			<!-- Sizes -->
			<Card title="Sizes" description="Different badge sizes for various use cases">
				<div class="space-y-4">
					<div class="flex flex-wrap items-center gap-2">
						<Badge size="sm">Small</Badge>
						<Badge size="md">Medium</Badge>
						<Badge size="lg">Large</Badge>
					</div>
				</div>
			</Card>

			<!-- Outlined Style -->
			<Card title="Outlined Style" description="Badges with outline styling">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge outline>Default</Badge>
						<Badge variant="success" outline>Success</Badge>
						<Badge variant="warning" outline>Warning</Badge>
						<Badge variant="error" outline>Error</Badge>
						<Badge variant="info" outline>Info</Badge>
					</div>
				</div>
			</Card>

			<!-- With Icons -->
			<Card title="With Icons" description="Badges enhanced with icons">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge icon="🎯" variant="info">Target</Badge>
						<Badge icon="✓" variant="success">Completed</Badge>
						<Badge icon="⚠" variant="warning">Warning</Badge>
						<Badge icon="🔥" variant="error">Hot</Badge>
					</div>
				</div>
			</Card>			<!-- Removable Badges -->
			<Card title="Removable Badges" description="Interactive badges with proper event handling">
				<div class="space-y-4">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Technology Stack</h4>
						<div class="flex flex-wrap gap-2">
							{#each techTags as tag}
								<Badge 
									removable 
									variant="info" 
									on:remove={() => removeTechTag(tag)}
									on:click={handleBadgeClick}
								>
									{tag}
								</Badge>
							{/each}
						</div>
						{#if techTags.length === 0}
							<p class="text-sm text-gray-500 mt-2">All tags removed! Refresh to reset.</p>
						{/if}
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Project Features</h4>
						<div class="flex flex-wrap gap-2">
							{#each projectTags as tag}
								<Badge 
									removable 
									outline 
									variant="success" 
									on:remove={() => removeProjectTag(tag)}
								>
									{tag}
								</Badge>
							{/each}
						</div>
						{#if projectTags.length === 0}
							<p class="text-sm text-gray-500 mt-2">All features removed! Refresh to reset.</p>
						{/if}
					</div>
				</div>
			</Card>

			<!-- Linked Badges -->
			<Card title="Linked Badges" description="Badges that work as navigation links">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge href="/components" variant="info">Components</Badge>
						<Badge href="/explorer" variant="success">Explorer</Badge>
						<Badge href="/about" variant="warning">About</Badge>
					</div>
				</div>
			</Card>

			<!-- Accessibility Features -->
			<Card title="Accessibility Features" description="Badges with enhanced accessibility support">
				<div class="space-y-4">
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Screen Reader Friendly</h4>
						<div class="flex flex-wrap gap-2">
							<Badge variant="error" ariaLabel="3 unread notifications">3</Badge>
							<Badge variant="success" ariaLabel="User is currently online" icon="🟢">Online</Badge>
							<Badge variant="warning" ariaLabel="Account pending verification" icon="⚠">Pending</Badge>
						</div>
					</div>
					
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Keyboard Navigation</h4>
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
							Removable badges and clickable badges support keyboard navigation (Tab, Enter, Space)
						</p>
						<div class="flex flex-wrap gap-2">
							<Badge removable variant="info" on:remove={() => console.log('Badge removed via keyboard')}>
								Keyboard Accessible
							</Badge>
							<Badge 
								variant="success" 
								on:click={() => console.log('Badge clicked via keyboard')}
								tabindex="0"
							>
								Clickable Badge
							</Badge>
						</div>
					</div>
				</div>
			</Card>

			<!-- Advanced Examples -->
			<Card title="Advanced Examples" description="Real-world badge usage examples">
				<div class="space-y-6">
					<!-- Status indicators -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">User Status</h4>
						<div class="flex flex-wrap gap-2">
							<Badge icon="🟢" variant="success" size="sm">Online</Badge>
							<Badge icon="🟡" variant="warning" size="sm">Away</Badge>
							<Badge icon="🔴" variant="error" size="sm">Busy</Badge>
							<Badge icon="⚫" variant="default" size="sm">Offline</Badge>
						</div>
					</div>

					<!-- Notification counts -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Notifications</h4>
						<div class="flex flex-wrap gap-4">
							<div class="relative">
								<span class="text-gray-700 dark:text-gray-300">Messages</span>
								<Badge variant="error" size="sm" class="absolute -top-2 -right-2">3</Badge>
							</div>
							<div class="relative">
								<span class="text-gray-700 dark:text-gray-300">Alerts</span>
								<Badge variant="warning" size="sm" class="absolute -top-2 -right-2">12</Badge>
							</div>
						</div>
					</div>

					<!-- Categories/Tags -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-2">Project Tags</h4>
						<div class="flex flex-wrap gap-2">
							<Badge removable outline>Frontend</Badge>
							<Badge removable outline>UI/UX</Badge>
							<Badge removable outline>TypeScript</Badge>
							<Badge removable outline>Responsive</Badge>
						</div>
					</div>
				</div>
			</Card>

		</div>

		<!-- Usage Guide -->
		<div class="mt-16">
			<Card title="Usage Guide" description="How to implement badges in your application">
				<div class="prose dark:prose-invert max-w-none">
					<h3>Basic Usage</h3>
					<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>&lt;Badge&gt;Default Badge&lt;/Badge&gt;
&lt;Badge variant="success"&gt;Success Badge&lt;/Badge&gt;
&lt;Badge variant="error" outline&gt;Error Outline&lt;/Badge&gt;</code></pre>

					<h3>Props</h3>
					<ul>
						<li><strong>variant:</strong> 'default' | 'success' | 'warning' | 'error' | 'info'</li>
						<li><strong>size:</strong> 'sm' | 'md' | 'lg'</li>
						<li><strong>outline:</strong> boolean - Use outline styling</li>
						<li><strong>removable:</strong> boolean - Show remove button</li>
						<li><strong>icon:</strong> string - Icon to display</li>
						<li><strong>href:</strong> string - Make badge a link</li>
					</ul>					<h3>Enhanced Features</h3>
					<ul>
						<li><strong>Improved Event Handling:</strong> Uses Svelte's event dispatcher for better component isolation</li>
						<li><strong>Better Accessibility:</strong> Enhanced ARIA labels, keyboard navigation, and focus management</li>
						<li><strong>TypeScript Support:</strong> Complete type definitions for better development experience</li>
						<li><strong>Proper Focus Management:</strong> Focus rings and keyboard navigation support</li>
					</ul>

					<h3>Events</h3>
					<ul>
						<li><strong>remove:</strong> Fired when removable badge is removed (using Svelte's event dispatcher)</li>
						<li><strong>click:</strong> Fired when badge is clicked (supports both mouse and keyboard events)</li>
					</ul>

					<h3>New Props</h3>
					<ul>
						<li><strong>ariaLabel:</strong> string - Custom ARIA label for accessibility</li>
					</ul>
				</div>
			</Card>
		</div>
	</div>
</div>
