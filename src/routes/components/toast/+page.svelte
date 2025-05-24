<script>
	import Toast from '$lib/components/Toast/Toast.svelte';
	import { onMount } from 'svelte';

	let toasts = [];
	let nextId = 1;

	function addToast(type, title, message, options = {}) {
		const toast = {
			id: nextId++,
			type,
			title,
			message,
			...options
		};
		toasts = [...toasts, toast];
		return toast.id;
	}

	function removeToast(id) {
		toasts = toasts.filter(toast => toast.id !== id);
	}

	function showSuccess() {
		addToast('success', 'Success!', 'Your action was completed successfully.');
	}

	function showError() {
		addToast('error', 'Error!', 'Something went wrong. Please try again.');
	}

	function showWarning() {
		addToast('warning', 'Warning!', 'Please review your changes before continuing.');
	}

	function showInfo() {
		addToast('info', 'Information', 'Here\'s some helpful information for you.');
	}

	function showWithAction() {
		addToast('info', 'New Message', 'You have a new message waiting.', {
			actionLabel: 'View',
			action: () => alert('Action clicked!')
		});
	}

	function showPersistent() {
		addToast('warning', 'Important!', 'This message will stay until you dismiss it.', {
			autoDismiss: false
		});
	}

	function showCustomDuration() {
		addToast('success', 'Quick Message', 'This will disappear in 2 seconds.', {
			duration: 2000
		});
	}

	function showWithIcon() {
		addToast('info', 'With Icon', 'This toast includes a custom icon.', {
			showIcon: true
		});
	}

	function showMultiple() {
		setTimeout(() => showSuccess(), 0);
		setTimeout(() => showWarning(), 200);
		setTimeout(() => showError(), 400);
		setTimeout(() => showInfo(), 600);
	}

	function clearAll() {
		toasts = [];
	}
</script>

<svelte:head>
	<title>Toast Component - Svelte UI Toolkit</title>
	<meta name="description" content="Notification toast component with multiple types, positions, and customization options." />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-12">
	<!-- Header -->
	<div class="text-center space-y-4">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white">Toast Component</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
			Notification toast component with multiple types, positioning options, actions, and auto-dismiss functionality.
		</p>
	</div>

	<!-- Toast Container -->
	<div class="toast-container fixed top-4 right-4 z-50 space-y-2">
		{#each toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				title={toast.title}
				message={toast.message}
				showIcon={toast.showIcon}
				autoDismiss={toast.autoDismiss}
				duration={toast.duration}
				actionLabel={toast.actionLabel}
				action={toast.action}
				on:dismiss={() => removeToast(toast.id)}
			/>
		{/each}
	</div>

	<!-- Basic Types -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Toast Types</h2>
			<p class="text-gray-600 dark:text-gray-300">Different toast types for various notification contexts.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<button 
					class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
					on:click={showSuccess}
				>
					Success Toast
				</button>
				<button 
					class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					on:click={showError}
				>
					Error Toast
				</button>
				<button 
					class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
					on:click={showWarning}
				>
					Warning Toast
				</button>
				<button 
					class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					on:click={showInfo}
				>
					Info Toast
				</button>
			</div>
		</div>
		<details class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
			<summary class="cursor-pointer font-medium text-gray-900 dark:text-white">View Code</summary>
			<pre class="mt-2 text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`<script>
	import Toast from '$lib/components/Toast/Toast.svelte';
	
	let toasts = [];
	
	function addToast(type, title, message) {
		const toast = { id: Date.now(), type, title, message };
		toasts = [...toasts, toast];
	}
	
	function removeToast(id) {
		toasts = toasts.filter(toast => toast.id !== id);
	}
</script>

<!-- Toast Container -->
<div class="toast-container fixed top-4 right-4 z-50 space-y-2">
	{#each toasts as toast (toast.id)}
		<Toast
			type={toast.type}
			title={toast.title}
			message={toast.message}
			on:dismiss={() => removeToast(toast.id)}
		/>
	{/each}
</div>

<button on:click={() => addToast('success', 'Success!', 'Action completed.')}>
	Show Success
</button>`}</code></pre>
		</details>
	</section>

	<!-- Advanced Features -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Advanced Features</h2>
			<p class="text-gray-600 dark:text-gray-300">Toasts with actions, custom durations, and persistent notifications.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<button 
					class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
					on:click={showWithAction}
				>
					With Action
				</button>
				<button 
					class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
					on:click={showPersistent}
				>
					Persistent
				</button>
				<button 
					class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
					on:click={showCustomDuration}
				>
					Quick (2s)
				</button>
				<button 
					class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
					on:click={showWithIcon}
				>
					With Icon
				</button>
			</div>
		</div>
	</section>

	<!-- Multiple Toasts -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Multiple Toasts</h2>
			<p class="text-gray-600 dark:text-gray-300">Test stacking behavior and mass operations.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="flex gap-4">
				<button 
					class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
					on:click={showMultiple}
				>
					Show Multiple
				</button>
				<button 
					class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					on:click={clearAll}
				>
					Clear All
				</button>
			</div>
		</div>
	</section>

	<!-- Position Examples -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Positioning</h2>
			<p class="text-gray-600 dark:text-gray-300">Common positioning patterns for toast notifications.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Top Right (Default)</h3>
					<pre class="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded"><code>position: fixed; top: 1rem; right: 1rem;</code></pre>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Top Left</h3>
					<pre class="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded"><code>position: fixed; top: 1rem; left: 1rem;</code></pre>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Bottom Right</h3>
					<pre class="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded"><code>position: fixed; bottom: 1rem; right: 1rem;</code></pre>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Bottom Center</h3>
					<pre class="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded"><code>position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%);</code></pre>
				</div>
			</div>
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
						<td class="py-2 font-mono">type</td>
						<td class="py-2">'success' | 'error' | 'warning' | 'info'</td>
						<td class="py-2">'info'</td>
						<td class="py-2">Type of toast notification</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">title</td>
						<td class="py-2">string</td>
						<td class="py-2">''</td>
						<td class="py-2">Toast title text</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">message</td>
						<td class="py-2">string</td>
						<td class="py-2">''</td>
						<td class="py-2">Toast message content</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">showIcon</td>
						<td class="py-2">boolean</td>
						<td class="py-2">true</td>
						<td class="py-2">Show type-specific icon</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">autoDismiss</td>
						<td class="py-2">boolean</td>
						<td class="py-2">true</td>
						<td class="py-2">Auto-dismiss after duration</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">duration</td>
						<td class="py-2">number</td>
						<td class="py-2">5000</td>
						<td class="py-2">Auto-dismiss duration in ms</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">actionLabel</td>
						<td class="py-2">string</td>
						<td class="py-2">null</td>
						<td class="py-2">Action button label</td>
					</tr>
					<tr>
						<td class="py-2 font-mono">action</td>
						<td class="py-2">function</td>
						<td class="py-2">null</td>
						<td class="py-2">Action button click handler</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Events Documentation -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Events</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:dismiss</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when toast is dismissed (manually or auto). No detail provided.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">on:action</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Fired when action button is clicked. No detail provided.</p>
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
					<h3 class="font-medium text-gray-900 dark:text-white">Positioning</h3>
					<p class="text-sm">Place toast containers in a fixed position with high z-index to ensure visibility above other content.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Timing</h3>
					<p class="text-sm">Use appropriate durations: errors and warnings should stay longer, success messages can be shorter.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Content</h3>
					<p class="text-sm">Keep messages concise and actionable. Use clear, user-friendly language.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Accessibility</h3>
					<p class="text-sm">Ensure toasts are announced by screen readers and provide keyboard navigation for actions.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Stacking</h3>
					<p class="text-sm">Limit the number of visible toasts to prevent overwhelming users. Consider a maximum of 3-5 toasts.</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.toast-container {
		max-width: 420px;
		width: 100%;
	}
</style>
