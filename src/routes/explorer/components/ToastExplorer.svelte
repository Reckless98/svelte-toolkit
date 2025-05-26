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
		fundamentals: true,
		contentStructure: true,
		interactive: true,
		positioningTiming: true
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
	const fundamentalsExample = `<!-- Basic Toast -->
<Toast message="This is a basic toast notification" />

<!-- Toast Types -->
<Toast type="success" message="Success message" />
<Toast type="error" message="Error message" />
<Toast type="warning" message="Warning message" />
<Toast type="info" message="Info message" />

<!-- Toast without Icon -->
<Toast message="Clean toast without icon" icon={false} />`;

	const contentStructureExample = `<!-- Toast with Title -->
<Toast 
  type="success" 
  title="Success!" 
  message="Your action was completed successfully." 
/>

<!-- Informational Toast with Title -->
<Toast 
  type="info" 
  title="New Feature Available" 
  message="Check out our latest dashboard improvements." 
/>`;

	const interactiveFeaturesExample = `<!-- Toast with Actions -->
<Toast 
  type="info" 
  title="File deleted"
  message="The file has been moved to trash."
  actions={[
    { label: "Undo", action: () => {}, variant: "primary" },
    { label: "View", action: () => {}, variant: "secondary" }
  ]}
/>

<!-- Complex Warning Toast -->
<Toast 
  type="warning"
  title="Unsaved Changes"
  message="You have unsaved changes that will be lost."
  duration={0}
  actions={[
    { label: "Save", action: () => {}, variant: "primary" },
    { label: "Discard", action: () => {}, variant: "secondary" }
  ]}
/>`;

	const positioningTimingExample = `<!-- Different Positions -->
<Toast message="Top right" position="top-right" />
<Toast message="Bottom left" position="bottom-left" />
<Toast message="Top center" position="top-center" />

<!-- Duration Control -->
<Toast message="Quick toast" duration={2000} />
<Toast message="Long toast" duration={10000} />

<!-- Persistent Toast -->
<Toast message="Persistent toast" duration={0} />`;
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Toast Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Show temporary notifications and messages with various types, positions, and actions.
			</p>
		</div>		<!-- Toast Fundamentals & Types -->
		<ComponentPreview
			title="Toast Fundamentals & Types"
			description="Basic toast functionality with different types and visual options for various message contexts."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["basic", "types", "visual-options", "messaging"]}
		>
			<div class="space-y-6">
				<!-- Basic Toast -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Basic Toast</h4>
					<Button on:click={() => showToast('fundamentals')}>Show Basic Toast</Button>
					
					{#if toastStates.fundamentals}
						<div class="relative">
							<Toast 
								message="This is a basic toast notification"
								on:close={() => hideToast('fundamentals')}
							/>
						</div>
					{/if}
				</div>

				<!-- Toast Types -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Toast Types</h4>
					<div class="flex flex-wrap gap-2">
						{#each types as type}
							<Button 
								variant="secondary" 
								size="sm"
								on:click={() => showToast('fundamentals')}
							>
								Show {type.name}
							</Button>
						{/each}
					</div>

					<div class="space-y-2 relative">
						<Toast 
							type="success"
							message="Operation completed successfully!"
							on:close={() => hideToast('fundamentals')}
						/>
						<Toast 
							type="error"
							message="An error occurred while processing."
							on:close={() => hideToast('fundamentals')}
						/>
						<Toast 
							type="warning"
							message="Please review your input before proceeding."
							on:close={() => hideToast('fundamentals')}
						/>
						<Toast 
							type="info"
							message="Here's some helpful information."
							on:close={() => hideToast('fundamentals')}
						/>
					</div>
				</div>

				<!-- Toast without Icon -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Clean Design Option</h4>
					<div class="relative">
						<Toast 
							message="This toast doesn't display an icon for a cleaner look"
							icon={false}
							type="info"
							duration={0}
							closable={true}
							on:close={() => {}}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<!-- Content & Structure -->
		<ComponentPreview
			title="Content & Structure"
			description="Organize toast content with titles and hierarchical message structure for better readability."
			codeSnippet={contentStructureExample}
			complexity="Intermediate"
			features={["titles", "content-hierarchy", "organization", "readability"]}
		>
			<div class="space-y-6">
				<!-- Toast with Title -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Toast with Title</h4>
					<Button on:click={() => showToast('contentStructure')}>Show Toast with Title</Button>
					
					{#if toastStates.contentStructure}
						<div class="relative">
							<Toast 
								type="success"
								title="Success!"
								message="Your changes have been saved successfully."
								on:close={() => hideToast('contentStructure')}
							/>
						</div>
					{/if}
				</div>

				<!-- Different Content Structures -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Content Examples</h4>
					<div class="space-y-2 relative">
						<Toast 
							type="info"
							title="New Feature Available"
							message="Check out our latest dashboard improvements and analytics tools."
							duration={0}
							on:close={() => {}}
						/>
						<Toast 
							type="warning"
							title="Storage Almost Full"
							message="You're using 95% of your storage space. Consider upgrading your plan."
							duration={0}
							on:close={() => {}}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<!-- Interactive Features -->
		<ComponentPreview
			title="Interactive Features"
			description="Enhance toasts with action buttons and complex interactions for user engagement and workflow integration."
			codeSnippet={interactiveFeaturesExample}
			complexity="Intermediate"
			features={["actions", "buttons", "workflow", "user-interaction"]}
		>
			<div class="space-y-6">
				<!-- Toast with Actions -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Action Buttons</h4>
					<Button on:click={() => showToast('interactive')}>Show Toast with Actions</Button>
					
					{#if toastStates.interactive}
						<div class="relative">
							<Toast 
								type="info"
								title="File deleted"
								message="The file has been moved to trash."
								actions={sampleActions}
								duration={0}
								on:close={() => hideToast('interactive')}
							/>
						</div>
					{/if}
				</div>

				<!-- Complex Interactive Example -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Complex Workflow Integration</h4>
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
										hideToast('interactive');
									},
									variant: 'primary'
								},
								{
									label: 'Discard',
									action: () => {
										console.log('Discard clicked');
										hideToast('interactive');
									},
									variant: 'secondary'
								}
							]}
							on:close={() => hideToast('interactive')}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<!-- Positioning & Timing -->
		<ComponentPreview
			title="Positioning & Timing"
			description="Advanced configuration options for toast positioning, duration control, and persistence settings."
			codeSnippet={positioningTimingExample}
			complexity="Advanced"
			features={["positioning", "timing", "persistence", "configuration"]}
		>
			<div class="space-y-6">
				<!-- Toast Positions -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Position Options</h4>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
						{#each positions as position}
							<Button 
								variant="secondary" 
								size="sm"
								on:click={() => showToast('positioningTiming')}
							>
								{position.name}
							</Button>
						{/each}
					</div>

					{#if toastStates.positioningTiming}
						<div class="relative">
							<Toast 
								type="info"
								message="This toast demonstrates positioning"
								position="bottom-left"
								on:close={() => hideToast('positioningTiming')}
							/>
						</div>
					{/if}
				</div>

				<!-- Duration Controls -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Auto-dismiss Duration</h4>
					<div class="flex gap-2">
						<Button 
							size="sm"
							on:click={() => {
								showToast('positioningTiming');
								setTimeout(() => hideToast('positioningTiming'), 2000);
							}}
						>
							2 seconds
						</Button>
						<Button 
							size="sm" 
							on:click={() => {
								showToast('positioningTiming');
								setTimeout(() => hideToast('positioningTiming'), 5000);
							}}
						>
							5 seconds
						</Button>
						<Button 
							size="sm" 
							on:click={() => {
								showToast('positioningTiming');
								setTimeout(() => hideToast('positioningTiming'), 10000);
							}}
						>
							10 seconds
						</Button>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Click a button to see different auto-dismiss durations.
					</p>
				</div>

				<!-- Persistent Toast -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Persistent Toast</h4>
					<Button on:click={() => showToast('positioningTiming')}>Show Persistent Toast</Button>
					<div class="relative">
						<Toast 
							type="warning"
							title="Important Notice"
							message="This toast won't auto-dismiss and requires manual closure."
							duration={0}
							on:close={() => hideToast('positioningTiming')}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
