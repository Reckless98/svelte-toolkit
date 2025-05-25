<!-- Toast Component Explorer -->
<script lang="ts">
	import Toast from '$lib/components/Toast';
	import { Button } from '$lib/components/Button';
	import ComponentPreview from '../ComponentPreview.svelte';

	type ToastType = 'success' | 'error' | 'warning' | 'info';
	type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

	// Toast types
	const types: { name: string; value: ToastType }[] = [
		{ name: 'Success', value: 'success' },
		{ name: 'Error', value: 'error' },
		{ name: 'Warning', value: 'warning' },
		{ name: 'Info', value: 'info' },
	];

	// Toast positions
	const positions: { name: string; value: ToastPosition }[] = [
		{ name: 'Top Right', value: 'top-right' },
		{ name: 'Top Left', value: 'top-left' },
		{ name: 'Top Center', value: 'top-center' },
		{ name: 'Bottom Right', value: 'bottom-right' },
		{ name: 'Bottom Left', value: 'bottom-left' },
		{ name: 'Bottom Center', value: 'bottom-center' },
	];

	// Toast visibility states
	let toastStates = {
		basic: true,
		success: true,
		error: true,
		warning: true,
		info: true,
		withTitle: true,
		withActions: true,
		persistent: true,
		positioned: true
	};

	// Sample actions
	const sampleActions = [
		{
			label: 'Undo',
			action: () => console.log('Undo clicked'),
			variant: 'primary' as const
		},
		{
			label: 'View',
			action: () => console.log('View clicked'),
			variant: 'secondary' as const
		}
	];

	function showToast(key: keyof typeof toastStates) {
		toastStates[key] = true;
	}

	function hideToast(key: keyof typeof toastStates) {
		toastStates[key] = false;
	}

	// Code examples
	const basicExample = '<Toast message="This is a basic toast notification" />';
	const typesExample = `<Toast type="success" message="Success message" />
<Toast type="error" message="Error message" />
<Toast type="warning" message="Warning message" />
<Toast type="info" message="Info message" />`;
	const titleExample = '<Toast type="success" title="Success!" message="Your action was completed successfully." />';
	const actionsExample = `<Toast 
  type="info" 
  title="File deleted"
  message="The file has been moved to trash."
  actions={[
    { label: "Undo", action: () => {}, variant: "primary" },
    { label: "View", action: () => {}, variant: "secondary" }
  ]}
/>`;
	const persistentExample = '<Toast message="This toast won\'t auto-dismiss" duration={0} />';
	const positionExample = '<Toast message="Positioned toast" position="bottom-left" />';
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Toast Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Show temporary notifications and messages with various types, positions, and actions.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Toast"
			description="A simple toast notification."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<Button on:click={() => showToast('basic')}>Show Basic Toast</Button>
				
				{#if toastStates.basic}
					<div class="relative">
						<Toast 
							message="This is a basic toast notification"
							on:close={() => hideToast('basic')}
						/>
					</div>
				{/if}
			</div>
		</ComponentPreview>

		<!-- Toast Types -->
		<ComponentPreview
			title="Toast Types"
			description="Different toast types for various message contexts."
			codeSnippet={typesExample}
		>
			<div class="space-y-4">
				<div class="flex flex-wrap gap-2">
					{#each types as type}
						<Button 
							variant="secondary" 
							size="sm"
							on:click={() => showToast(type.value)}
						>
							Show {type.name} Toast
						</Button>
					{/each}
				</div>

				<div class="space-y-2 relative">
					{#if toastStates.success}
						<Toast 
							type="success"
							message="Operation completed successfully!"
							on:close={() => hideToast('success')}
						/>
					{/if}
					{#if toastStates.error}
						<Toast 
							type="error"
							message="An error occurred while processing your request."
							on:close={() => hideToast('error')}
						/>
					{/if}
					{#if toastStates.warning}
						<Toast 
							type="warning"
							message="Please review your input before proceeding."
							on:close={() => hideToast('warning')}
						/>
					{/if}
					{#if toastStates.info}
						<Toast 
							type="info"
							message="Here's some helpful information for you."
							on:close={() => hideToast('info')}
						/>
					{/if}
				</div>
			</div>
		</ComponentPreview>

		<!-- Toast with Title -->
		<ComponentPreview
			title="Toast with Title"
			description="Toasts can have titles for better organization."
			codeSnippet={titleExample}
		>
			<div class="space-y-4">
				<Button on:click={() => showToast('withTitle')}>Show Toast with Title</Button>
				
				{#if toastStates.withTitle}
					<div class="relative">
						<Toast 
							type="success"
							title="Success!"
							message="Your changes have been saved successfully."
							on:close={() => hideToast('withTitle')}
						/>
					</div>
				{/if}
			</div>
		</ComponentPreview>

		<!-- Toast with Actions -->
		<ComponentPreview
			title="Toast with Actions"
			description="Toasts can include action buttons for quick operations."
			codeSnippet={actionsExample}
		>
			<div class="space-y-4">
				<Button on:click={() => showToast('withActions')}>Show Toast with Actions</Button>
				
				{#if toastStates.withActions}
					<div class="relative">
						<Toast 
							type="info"
							title="File deleted"
							message="The file has been moved to trash."
							actions={sampleActions}
							duration={0}
							on:close={() => hideToast('withActions')}
						/>
					</div>
				{/if}
			</div>
		</ComponentPreview>

		<!-- Persistent Toast -->
		<ComponentPreview
			title="Persistent Toast"
			description="Toasts that don't auto-dismiss and must be manually closed."
			codeSnippet={persistentExample}
		>
			<div class="space-y-4">
				<Button on:click={() => showToast('persistent')}>Show Persistent Toast</Button>
				
				{#if toastStates.persistent}
					<div class="relative">
						<Toast 
							type="warning"
							title="Important Notice"
							message="This toast won't auto-dismiss and requires manual closure."
							duration={0}
							on:close={() => hideToast('persistent')}
						/>
					</div>
				{/if}
			</div>
		</ComponentPreview>

		<!-- Toast Positions -->
		<ComponentPreview
			title="Toast Positions"
			description="Toasts can be positioned in different areas of the screen."
			codeSnippet={positionExample}
		>
			<div class="space-y-4">
				<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
					{#each positions as position}
						<Button 
							variant="secondary" 
							size="sm"
							on:click={() => {
								// Show a positioned toast (in real app, this would use a toast service)
								showToast('positioned');
							}}
						>
							{position.name}
						</Button>
					{/each}
				</div>

				{#if toastStates.positioned}
					<div class="relative">
						<Toast 
							type="info"
							message="This toast demonstrates positioning"
							position="bottom-left"
							on:close={() => hideToast('positioned')}
						/>
					</div>
				{/if}
			</div>
		</ComponentPreview>

		<!-- Toast without Icon -->
		<ComponentPreview
			title="Toast without Icon"
			description="Toasts can be displayed without icons for a cleaner look."
			codeSnippet='<Toast message="Toast without icon" icon={false} />'
		>
			<div class="space-y-4">
				<Button on:click={() => {
					toastStates.basic = true;
				}}>Show Toast without Icon</Button>
				
				<div class="relative">
					<Toast 
						message="This toast doesn't display an icon"
						icon={false}
						type="info"
						duration={0}
						closable={true}
						on:close={() => {}}
					/>
				</div>
			</div>
		</ComponentPreview>

		<!-- Auto-dismiss Duration -->
		<ComponentPreview
			title="Auto-dismiss Duration"
			description="Control how long toasts remain visible before auto-dismissing."
			codeSnippet='<Toast message="Quick toast" duration={2000} />'
		>
			<div class="space-y-4">
				<div class="flex gap-2">
					<Button 
						size="sm" 
						on:click={() => {
							toastStates.basic = true;
							setTimeout(() => hideToast('basic'), 2000);
						}}
					>
						2 seconds
					</Button>
					<Button 
						size="sm" 
						on:click={() => {
							toastStates.basic = true;
							setTimeout(() => hideToast('basic'), 5000);
						}}
					>
						5 seconds
					</Button>
					<Button 
						size="sm" 
						on:click={() => {
							toastStates.basic = true;
							setTimeout(() => hideToast('basic'), 10000);
						}}
					>
						10 seconds
					</Button>
				</div>
				
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Click a button to see a toast with different auto-dismiss durations.
				</p>
			</div>
		</ComponentPreview>

		<!-- Complex Toast Example -->
		<ComponentPreview
			title="Complex Toast Example"
			description="A comprehensive example with title, actions, and custom duration."
			codeSnippet='<Toast 
  type="warning"
  title="Unsaved Changes"
  message="You have unsaved changes that will be lost if you continue."
  duration={0}
  actions={[
    { label: "Save", action: () => {}, variant: "primary" },
    { label: "Discard", action: () => {}, variant: "secondary" }
  ]}
/>'
		>
			<div class="space-y-4">
				<Button on:click={() => showToast('withActions')}>Show Complex Toast</Button>
				
				<div class="relative">
					<Toast 
						type="warning"
						title="Unsaved Changes"
						message="You have unsaved changes that will be lost if you continue."
						duration={0}
						actions={[
							{
								label: 'Save',
								action: () => {
									console.log('Save clicked');
									hideToast('withActions');
								},
								variant: 'primary'
							},
							{
								label: 'Discard',
								action: () => {
									console.log('Discard clicked');
									hideToast('withActions');
								},
								variant: 'secondary'
							}
						]}
						on:close={() => hideToast('withActions')}
					/>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
