<!-- Input Component Explorer -->
<script lang="ts">
	import { Input } from '$lib/components/Input';
	import ComponentPreview from '../ComponentPreview.svelte';

	type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';
	type InputVariant = 'standard' | 'outlined' | 'filled' | 'floating' | 'glass' | 'underlined' | 'modern' | 'neon';
	type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	// Input variants
	const variants: { name: string; value: InputVariant }[] = [
		{ name: 'Standard', value: 'standard' },
		{ name: 'Outlined', value: 'outlined' },
		{ name: 'Filled', value: 'filled' },
		{ name: 'Floating', value: 'floating' },
		{ name: 'Glass', value: 'glass' },
		{ name: 'Underlined', value: 'underlined' },
	];

	// Input sizes
	const sizes: { name: string; value: InputSize }[] = [
		{ name: 'Small', value: 'sm' },
		{ name: 'Medium', value: 'md' },
		{ name: 'Large', value: 'lg' },
	];

	// Input types
	const types: { name: string; value: InputType }[] = [
		{ name: 'Text', value: 'text' },
		{ name: 'Password', value: 'password' },
		{ name: 'Email', value: 'email' },
		{ name: 'Number', value: 'number' },
		{ name: 'Search', value: 'search' },
		{ name: 'Tel', value: 'tel' },
		{ name: 'URL', value: 'url' },
	];

	// State for form values
	let formData: Record<string, string> = {
		standard: '',
		outlined: '',
		filled: '',
		floating: '',
		glass: '',
		underlined: '',
		small: '',
		medium: '',
		large: '',
		withError: '',
		withSuccess: '',
		withIcon: '',
		disabled: '',
		readonly: '',
		withHelper: '',
	};

	// Example props for different scenarios
	const exampleProps = {
		basic: {
			placeholder: 'Enter text...',
			label: 'Basic Input',
		},
		withError: {
			placeholder: 'Enter email...',
			label: 'Email Address',
			type: 'email' as InputType,
			error: 'Please enter a valid email address',
		},
		withSuccess: {
			placeholder: 'Username taken',
			label: 'Username',
			success: 'Username is available!',
		},
		withIcon: {
			placeholder: 'Search...',
			label: 'Search',
			type: 'search' as InputType,
			icon: '🔍',
		},
		withHelper: {
			placeholder: 'Create password',
			label: 'Password',
			type: 'password' as InputType,
			helper: 'Password must be at least 8 characters long',
		},
	};
</script>

<div class="space-y-8">
	<div>
		<h2 class="text-2xl font-bold mb-4">Input Components</h2>
		<p class="text-gray-600 dark:text-gray-400 mb-6">
			Versatile input components with multiple variants, states, and customization options.
		</p>
	</div>

	<!-- Variants Section -->
	<ComponentPreview title="Input Variants">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each variants as variant}
				<div class="space-y-2">
					<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 capitalize">
						{variant.name}
					</h4>
					<Input
						variant={variant.value}
						bind:value={formData[variant.value]}
						placeholder="Enter {variant.name.toLowerCase()} text..."
						label="{variant.name} Input"
					/>
				</div>
			{/each}
		</div>
	</ComponentPreview>

	<!-- Sizes Section -->
	<ComponentPreview title="Input Sizes">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each sizes as size}
				<div class="space-y-2">
					<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 capitalize">
						{size.name}
					</h4>
					<Input
						size={size.value}
						bind:value={formData[size.value]}
						placeholder="{size.name} input..."
						label="{size.name} Input"
					/>
				</div>
			{/each}
		</div>
	</ComponentPreview>

	<!-- Input Types Section -->
	<ComponentPreview title="Input Types">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each types as type}
				<div class="space-y-2">
					<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 capitalize">
						{type.name}
					</h4>
					<Input
						type={type.value}
						placeholder="Enter {type.name.toLowerCase()}..."
						label="{type.name} Input"
					/>
				</div>
			{/each}
		</div>
	</ComponentPreview>

	<!-- States Section -->
	<ComponentPreview title="Input States">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Error State -->
			<div class="space-y-2">
				<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Error State</h4>
				<Input bind:value={formData.withError} {...exampleProps.withError} />
			</div>

			<!-- Success State -->
			<div class="space-y-2">
				<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Success State</h4>
				<Input bind:value={formData.withSuccess} {...exampleProps.withSuccess} />
			</div>

			<!-- With Icon -->
			<div class="space-y-2">
				<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">With Icon</h4>
				<Input bind:value={formData.withIcon} {...exampleProps.withIcon} />
			</div>

			<!-- With Helper Text -->
			<div class="space-y-2">
				<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">With Helper</h4>
				<Input bind:value={formData.withHelper} {...exampleProps.withHelper} />
			</div>

			<!-- Disabled -->
			<div class="space-y-2">
				<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Disabled</h4>
				<Input disabled value="Disabled input" label="Disabled Input" />
			</div>

			<!-- Read Only -->
			<div class="space-y-2">
				<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Read Only</h4>
				<Input readonly value="Read only value" label="Read Only Input" />
			</div>
		</div>
	</ComponentPreview>

	<!-- Usage Examples -->
	<ComponentPreview title="Usage Examples">
		<div class="space-y-6">
			<!-- Login Form Example -->
			<div class="space-y-4">
				<h4 class="font-medium text-gray-700 dark:text-gray-300">Login Form</h4>
				<div class="max-w-md space-y-4">
					<Input
						type="email"
						label="Email Address"
						placeholder="Enter your email"
						variant="outlined"
						icon="📧"
					/>
					<Input
						type="password"
						label="Password"
						placeholder="Enter your password"
						variant="outlined"
						icon="🔒"
					/>
				</div>
			</div>

			<!-- Contact Form Example -->
			<div class="space-y-4">
				<h4 class="font-medium text-gray-700 dark:text-gray-300">Contact Form</h4>
				<div class="max-w-md space-y-4">
					<Input label="Full Name" placeholder="Your full name" variant="floating" />
					<Input type="email" label="Email" placeholder="your@email.com" variant="floating" />
					<Input
						type="tel"
						label="Phone Number"
						placeholder="+1 (555) 123-4567"
						variant="floating"
					/>
				</div>
			</div>
		</div>
	</ComponentPreview>

	<!-- Code Examples Section -->
	<ComponentPreview title="Code Examples">
		<div class="space-y-4">
			<div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
				<pre><code
						>{`<!-- Basic Input -->
<Input
  label="Username"
  placeholder="Enter username"
  bind:value={username}
/>

<!-- Input with validation -->
<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  variant="outlined"
  bind:value={email}
  error={emailError}
  icon="📧"
/>

<!-- Floating label input -->
<Input
  variant="floating"
  label="Message"
  placeholder="Type your message"
  bind:value={message}
  helper="Maximum 500 characters"
/>`}</code
					></pre>
			</div>
		</div>
	</ComponentPreview>
</div>
