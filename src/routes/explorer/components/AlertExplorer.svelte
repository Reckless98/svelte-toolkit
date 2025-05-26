<!-- Alert Component Explorer -->
<script lang="ts">
	import Alert from '$lib/components/Alert';
	import ComponentPreview from '../ComponentPreview.svelte';

	type AlertType = 'success' | 'warning' | 'error' | 'info';
	type AlertVariant = 'filled' | 'outlined' | 'subtle';
	type AlertSize = 'sm' | 'md' | 'lg';

	// Alert types
	const types: { name: string; value: AlertType }[] = [
		{ name: 'Success', value: 'success' },
		{ name: 'Warning', value: 'warning' },
		{ name: 'Error', value: 'error' },
		{ name: 'Info', value: 'info' },
	];

	// Alert variants
	const variants: { name: string; value: AlertVariant }[] = [
		{ name: 'Filled', value: 'filled' },
		{ name: 'Outlined', value: 'outlined' },
		{ name: 'Subtle', value: 'subtle' },
	];

	// Alert sizes
	const sizes: { name: string; value: AlertSize }[] = [
		{ name: 'Small', value: 'sm' },
		{ name: 'Medium', value: 'md' },
		{ name: 'Large', value: 'lg' },
	];
	// Comprehensive code examples for smart grouping
	const basicsAndTypesExample = `<!-- Basic Alert Usage -->
<Alert>This is a basic alert message.</Alert>

<!-- Alert Types for Different Contexts -->
<Alert type="success">Success: Your action was completed!</Alert>
<Alert type="warning">Warning: Please check your input.</Alert>
<Alert type="error">Error: Something went wrong.</Alert>
<Alert type="info">Info: Here's some helpful information.</Alert>

<!-- Type usage in real scenarios -->
<Alert type="success">Data saved successfully!</Alert>
<Alert type="error">Invalid email format.</Alert>`;

	const variantsAndSizesExample = `<!-- All Visual Variants -->
<Alert variant="filled">Filled alert variant</Alert>
<Alert variant="outlined">Outlined alert variant</Alert>
<Alert variant="subtle">Subtle alert variant</Alert>

<!-- Different Sizes -->
<Alert size="sm">Small alert</Alert>
<Alert size="md">Medium alert</Alert>
<Alert size="lg">Large alert</Alert>

<!-- Combinations -->
<Alert variant="outlined" size="lg" type="warning">Large outlined warning</Alert>
<Alert variant="subtle" size="sm" type="info">Small subtle info</Alert>`;

	const enhancedFeaturesExample = `<!-- Alerts with Titles -->
<Alert type="success" title="Success!">Your changes have been saved successfully.</Alert>
<Alert type="warning" title="Warning">Please review your input before proceeding.</Alert>

<!-- Dismissible Alerts -->
<Alert dismissible={true} type="info">This alert can be dismissed by clicking the X button.</Alert>
<Alert dismissible={true} type="warning" title="Heads up!">Don't forget to save your changes.</Alert>

<!-- Custom Icon Settings -->
<Alert icon={false} type="warning">This alert doesn't show an icon.</Alert>

<!-- Feature Combinations -->
<Alert type="success" title="Upload Complete" dismissible={true} icon={true}>
  Your file has been uploaded and processed successfully.
</Alert>`;

	const realWorldExample = `<!-- Form Validation Alerts -->
<Alert type="error" title="Validation Error" dismissible={true}>
  Please correct the highlighted fields before submitting.
</Alert>

<!-- System Status Alerts -->
<Alert type="warning" title="Maintenance Notice" size="lg">
  Scheduled maintenance will occur tonight from 2-4 AM EST.
</Alert>

<!-- User Feedback Alerts -->
<Alert type="success" title="Welcome!" dismissible={true} size="md">
  Your account has been created successfully. Check your email for verification.
</Alert>

<!-- Complex Notification -->
<Alert type="error" title="Connection Error" dismissible={true} size="lg" variant="outlined">
  Unable to connect to the server. Please check your internet connection and try again.
</Alert>

<!-- Progress Notifications -->
<Alert type="info" title="Processing..." icon={true}>
  Your request is being processed. This may take a few moments.
</Alert>`;
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Alert Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Display important messages and notifications with various styles and configurations.
			</p>
		</div>
		<!-- Smart Grouped Previews -->		<ComponentPreview
			title="Alert Basics & Types"
			description="Essential alert usage with different types for various message contexts"
			complexity="Basic"
			features={['basic usage', 'success', 'warning', 'error', 'info', 'message types']}
			codeSnippet={basicsAndTypesExample}
		>
			<div class="space-y-6">
				<!-- Basic alert -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Basic Usage</h4>
					<Alert>This is a basic alert message.</Alert>
				</div>
				
				<!-- All alert types -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Alert Types</h4>
					<div class="space-y-3">
						{#each types as type}
							<Alert type={type.value}>
								{type.name}: This is a {type.name.toLowerCase()} alert message.
							</Alert>
						{/each}
					</div>
				</div>
				
				<!-- Real usage examples -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Practical Examples</h4>
					<div class="space-y-3">
						<Alert type="success">Data saved successfully!</Alert>
						<Alert type="error">Invalid email format.</Alert>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<ComponentPreview
			title="Variants & Sizes"
			description="Visual styles and sizing options for different design needs"
			complexity="Intermediate"
			features={['variants', 'sizes', 'filled', 'outlined', 'subtle', 'styling']}
			codeSnippet={variantsAndSizesExample}
		>
			<div class="space-y-6">
				<!-- Visual variants -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Visual Variants</h4>
					<div class="space-y-3">
						{#each variants as variant}
							<Alert variant={variant.value} type="info">
								{variant.name} alert variant
							</Alert>
						{/each}
					</div>
				</div>
				
				<!-- Size options -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Size Options</h4>
					<div class="space-y-3">
						{#each sizes as size}
							<Alert size={size.value} type="success">
								{size.name} alert size
							</Alert>
						{/each}
					</div>
				</div>
				
				<!-- Combinations -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Variant & Size Combinations</h4>
					<div class="space-y-3">
						<Alert variant="outlined" size="lg" type="warning">Large outlined warning</Alert>
						<Alert variant="subtle" size="sm" type="info">Small subtle info</Alert>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<ComponentPreview
			title="Enhanced Features"
			description="Advanced functionality: titles, dismissible alerts, and icon customization"
			complexity="Intermediate"
			features={['titles', 'dismissible', 'icons', 'interactive', 'customization']}
			codeSnippet={enhancedFeaturesExample}
		>
			<div class="space-y-6">
				<!-- Alerts with titles -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Alerts with Titles</h4>
					<div class="space-y-3">
						<Alert type="success" title="Success!">
							Your changes have been saved successfully.
						</Alert>
						<Alert type="warning" title="Warning">
							Please review your input before proceeding.
						</Alert>
						<Alert type="error" title="Error">
							Unable to complete the requested action.
						</Alert>
					</div>
				</div>
				
				<!-- Dismissible functionality -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Dismissible Alerts</h4>
					<div class="space-y-3">
						<Alert dismissible={true} type="info">
							This alert can be dismissed by clicking the X button.
						</Alert>
						<Alert dismissible={true} type="warning" title="Heads up!">
							Don't forget to save your changes.
						</Alert>
					</div>
				</div>
				
				<!-- Icon customization -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Icon Customization</h4>
					<div class="space-y-3">
						<Alert icon={false} type="warning">
							This alert doesn't show an icon.
						</Alert>
						<Alert type="success" title="Upload Complete" dismissible={true} icon={true}>
							Your file has been uploaded and processed successfully.
						</Alert>
					</div>
				</div>
			</div>
		</ComponentPreview>
		<ComponentPreview
			title="Real-World Applications"
			description="Practical examples and complex alert implementations for common use cases"
			complexity="Advanced"
			features={['forms', 'validation', 'notifications', 'system status', 'user feedback']}
			codeSnippet={realWorldExample}
		>
			<div class="space-y-6">
				<!-- Form validation -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Form Validation</h4>
					<Alert type="error" title="Validation Error" dismissible={true}>
						Please correct the highlighted fields before submitting.
					</Alert>
				</div>
				
				<!-- System notifications -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">System Status</h4>
					<div class="space-y-3">
						<Alert type="warning" title="Maintenance Notice" size="lg">
							Scheduled maintenance will occur tonight from 2-4 AM EST.
						</Alert>
						<Alert type="info" title="Processing..." icon={true}>
							Your request is being processed. This may take a few moments.
						</Alert>
					</div>
				</div>
				
				<!-- User feedback -->
				<div>
					<h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">User Feedback</h4>
					<div class="space-y-3">
						<Alert type="success" title="Welcome!" dismissible={true} size="md">
							Your account has been created successfully. Check your email for verification.
						</Alert>
						<Alert type="error" title="Connection Error" dismissible={true} size="lg" variant="outlined">
							Unable to connect to the server. Please check your internet connection and try again.
						</Alert>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
