<script lang="ts">
	import Badge from '$lib/components/Badge/Badge.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { theme } from '$lib/stores/theme.js';
	
	let currentTheme = 'light';
	theme.subscribe((value) => (currentTheme = value));
	$: isDark = currentTheme === 'dark';
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
			</Card>

			<!-- Removable Badges -->
			<Card title="Removable Badges" description="Interactive badges that can be removed">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge removable variant="info">JavaScript</Badge>
						<Badge removable variant="success">TypeScript</Badge>
						<Badge removable variant="warning">Svelte</Badge>
						<Badge removable variant="error">React</Badge>
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

			<!-- Complex Examples -->
			<Card title="Complex Usage" description="Real-world badge usage examples">
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
					</ul>

					<h3>Events</h3>
					<ul>
						<li><strong>remove:</strong> Fired when removable badge is removed</li>
					</ul>
				</div>
			</Card>
		</div>
	</div>
</div>
