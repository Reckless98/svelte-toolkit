<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { theme } from '$lib/stores/theme.js';
	
	let currentTheme = 'light';
	theme.subscribe((value) => (currentTheme = value));
	$: isDark = currentTheme === 'dark';
	
	let showDismissibleDemo = true;
	let showVariantDemo = true;
</script>

<svelte:head>
	<title>Alert Component - Svelte UI Toolkit</title>
	<meta name="description" content="Contextual alert messages for displaying important information to users" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Alert Component
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				Contextual alert messages with various severity levels for displaying important information, warnings, and feedback to users.
			</p>
		</div>

		<!-- Examples Grid -->
		<div class="grid grid-cols-1 gap-8">
			
			<!-- Basic Alerts -->
			<Card title="Alert Types" description="Different alert types for various message severities">
				<div class="space-y-4">
					<Alert type="info" title="Information">
						This is an informational alert. Use it to provide helpful context or additional details.
					</Alert>
					
					<Alert type="success" title="Success!">
						Great! Your action was completed successfully. Everything is working as expected.
					</Alert>
					
					<Alert type="warning" title="Warning">
						Please pay attention to this warning. There might be some issues that need your attention.
					</Alert>
					
					<Alert type="error" title="Error">
						Something went wrong. Please check your input and try again.
					</Alert>
				</div>
			</Card>

			<!-- Alert Variants -->
			<Card title="Alert Variants" description="Different styling variants for alerts">
				<div class="space-y-6">
					<!-- Filled variant -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Filled (Default)</h4>
						<div class="space-y-3">
							<Alert type="info" variant="filled">This is a filled info alert with bold styling.</Alert>
							<Alert type="success" variant="filled">This is a filled success alert.</Alert>
						</div>
					</div>

					<!-- Outlined variant -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Outlined</h4>
						<div class="space-y-3">
							<Alert type="warning" variant="outlined">This is an outlined warning alert.</Alert>
							<Alert type="error" variant="outlined">This is an outlined error alert.</Alert>
						</div>
					</div>

					<!-- Subtle variant -->
					<div>
						<h4 class="font-medium text-gray-900 dark:text-white mb-3">Subtle</h4>
						<div class="space-y-3">
							<Alert type="info" variant="subtle">This is a subtle info alert with minimal styling.</Alert>
							<Alert type="success" variant="subtle">This is a subtle success alert.</Alert>
						</div>
					</div>
				</div>
			</Card>

			<!-- Alert Sizes -->
			<Card title="Alert Sizes" description="Different sizes for various use cases">
				<div class="space-y-4">
					<Alert type="info" size="sm" title="Small Alert">
						This is a small alert, perfect for compact spaces.
					</Alert>
					
					<Alert type="success" size="md" title="Medium Alert">
						This is a medium alert, the default size for most use cases.
					</Alert>
					
					<Alert type="warning" size="lg" title="Large Alert">
						This is a large alert, great for important announcements and detailed messages.
					</Alert>
				</div>
			</Card>

			<!-- Interactive Features -->
			<Card title="Interactive Features" description="Dismissible alerts and user interactions">
				<div class="space-y-4">
					{#if showDismissibleDemo}
						<Alert 
							type="info" 
							title="Dismissible Alert" 
							dismissible 
							on:close={() => showDismissibleDemo = false}
						>
							This alert can be dismissed by clicking the X button. Try it!
						</Alert>
					{:else}
						<div class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
							<p class="text-gray-500 dark:text-gray-400 mb-2">Alert was dismissed!</p>
							<Button size="sm" on:click={() => showDismissibleDemo = true}>
								Show Again
							</Button>
						</div>
					{/if}

					<Alert type="success" title="Auto-dismiss" dismissible>
						This alert will auto-dismiss after a few seconds in a real implementation.
					</Alert>
				</div>
			</Card>

			<!-- Without Icons -->
			<Card title="Without Icons" description="Clean alerts without icons for minimal design">
				<div class="space-y-4">
					<Alert type="info" icon={false}>
						This alert doesn't have an icon for a cleaner, more minimal appearance.
					</Alert>
					
					<Alert type="success" icon={false} title="Clean Success">
						Success message without an icon, focusing purely on the content.
					</Alert>
				</div>
			</Card>

			<!-- Complex Content -->
			<Card title="Complex Content" description="Alerts with rich content and formatting">
				<div class="space-y-4">
					<Alert type="warning" title="System Maintenance">
						<div class="space-y-2">
							<p>Scheduled maintenance will occur on <strong>May 25, 2025</strong> from 2:00 AM to 4:00 AM EST.</p>
							<ul class="list-disc list-inside space-y-1 text-sm opacity-90">
								<li>Some features may be temporarily unavailable</li>
								<li>Data backup will be performed automatically</li>
								<li>No action required from users</li>
							</ul>
							<div class="flex gap-2 mt-3">
								<Button size="sm" variant="outline">Learn More</Button>
								<Button size="sm" variant="ghost">Subscribe to Updates</Button>
							</div>
						</div>
					</Alert>

					<Alert type="error" title="Security Alert" dismissible>
						<div class="space-y-2">
							<p>We detected unusual activity on your account. Please review the following:</p>
							<div class="bg-black/10 dark:bg-white/10 rounded p-3 text-sm">
								<strong>Last login:</strong> May 24, 2025 at 3:42 PM from New York, US
							</div>
							<div class="flex gap-2 mt-3">
								<Button size="sm">Secure Account</Button>
								<Button size="sm" variant="outline">Review Activity</Button>
							</div>
						</div>
					</Alert>
				</div>
			</Card>

		</div>

		<!-- Usage Guide -->
		<div class="mt-16">
			<Card title="Usage Guide" description="How to implement alerts in your application">
				<div class="prose dark:prose-invert max-w-none">
					<h3>Basic Usage</h3>
					<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>&lt;Alert type="info"&gt;
  This is an informational message.
&lt;/Alert&gt;

&lt;Alert type="success" title="Success!" dismissible&gt;
  Operation completed successfully!
&lt;/Alert&gt;</code></pre>

					<h3>Props</h3>
					<ul>
						<li><strong>type:</strong> 'success' | 'warning' | 'error' | 'info' - Alert severity level</li>
						<li><strong>title:</strong> string - Optional alert title</li>
						<li><strong>dismissible:</strong> boolean - Show dismiss button</li>
						<li><strong>icon:</strong> boolean - Show/hide icon (default: true)</li>
						<li><strong>variant:</strong> 'filled' | 'outlined' | 'subtle' - Visual style</li>
						<li><strong>size:</strong> 'sm' | 'md' | 'lg' - Alert size</li>
					</ul>

					<h3>Events</h3>
					<ul>
						<li><strong>close:</strong> Fired when alert is dismissed</li>
					</ul>

					<h3>Best Practices</h3>
					<ul>
						<li>Use appropriate severity levels for different message types</li>
						<li>Keep alert messages concise and actionable</li>
						<li>Provide clear next steps when possible</li>
						<li>Use dismissible alerts for non-critical information</li>
						<li>Consider auto-dismiss for temporary notifications</li>
					</ul>
				</div>
			</Card>
		</div>
	</div>
</div>
