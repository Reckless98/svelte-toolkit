<!-- Alert Component Explorer -->
<script lang="ts">
	import { Alert } from '$lib/components/Alert';
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

	// Code examples
	const basicExample = '<Alert>This is a basic alert message.</Alert>';
	const typesExample =
		'<Alert type="success">Success: Your action was completed!</Alert>\n<Alert type="warning">Warning: Please check your input.</Alert>\n<Alert type="error">Error: Something went wrong.</Alert>\n<Alert type="info">Info: Here\'s some helpful information.</Alert>';
	const variantsExample =
		'<Alert variant="filled">Filled alert variant</Alert>\n<Alert variant="outlined">Outlined alert variant</Alert>\n<Alert variant="subtle">Subtle alert variant</Alert>';
	const sizesExample =
		'<Alert size="sm">Small alert</Alert>\n<Alert size="md">Medium alert</Alert>\n<Alert size="lg">Large alert</Alert>';
	const withTitleExample =
		'<Alert type="success" title="Success!">Your changes have been saved successfully.</Alert>';
	const dismissibleExample =
		'<Alert dismissible={true}>This alert can be dismissed by clicking the X button.</Alert>';
	const withoutIconExample =
		'<Alert icon={false}>This alert doesn\'t show an icon.</Alert>';
</script>

<section>
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Alert Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Display important messages and notifications with various styles and configurations.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Alert"
			description="The default alert component."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<Alert>This is a basic alert message.</Alert>
			</div>
		</ComponentPreview>

		<!-- Alert Types -->
		<ComponentPreview
			title="Alert Types"
			description="Different alert types for various message contexts."
			codeSnippet={typesExample}
		>
			<div class="space-y-4">
				{#each types as type}
					<Alert type={type.value}>
						{type.name}: This is a {type.name.toLowerCase()} alert message.
					</Alert>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Alert Variants -->
		<ComponentPreview
			title="Alert Variants"
			description="Different visual styles for alerts."
			codeSnippet={variantsExample}
		>
			<div class="space-y-4">
				{#each variants as variant}
					<Alert variant={variant.value} type="info">
						{variant.name} alert variant
					</Alert>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Alert Sizes -->
		<ComponentPreview
			title="Alert Sizes"
			description="Alerts in different sizes."
			codeSnippet={sizesExample}
		>
			<div class="space-y-4">
				{#each sizes as size}
					<Alert size={size.value} type="success">
						{size.name} alert size
					</Alert>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Alert with Title -->
		<ComponentPreview
			title="Alert with Title"
			description="Alerts can have a title for better organization."
			codeSnippet={withTitleExample}
		>
			<div class="space-y-4">
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
		</ComponentPreview>

		<!-- Dismissible Alert -->
		<ComponentPreview
			title="Dismissible Alert"
			description="Alerts that can be dismissed by the user."
			codeSnippet={dismissibleExample}
		>
			<div class="space-y-4">
				<Alert dismissible={true} type="info">
					This alert can be dismissed by clicking the X button.
				</Alert>
			</div>
		</ComponentPreview>

		<!-- Alert without Icon -->
		<ComponentPreview
			title="Alert without Icon"
			description="Alerts can be displayed without an icon."
			codeSnippet={withoutIconExample}
		>
			<div class="space-y-4">
				<Alert icon={false} type="warning">
					This alert doesn't show an icon.
				</Alert>
			</div>
		</ComponentPreview>

		<!-- Complex Example -->
		<ComponentPreview
			title="Complex Alert Example"
			description="A combination of different alert features."
			codeSnippet='<Alert type="error" title="Connection Error" dismissible={true} size="lg">
	Unable to connect to the server. Please check your internet connection and try again.
</Alert>'
		>
			<div class="space-y-4">
				<Alert type="error" title="Connection Error" dismissible={true} size="lg">
					Unable to connect to the server. Please check your internet connection and try again.
				</Alert>
			</div>
		</ComponentPreview>
	</div>
</section>
