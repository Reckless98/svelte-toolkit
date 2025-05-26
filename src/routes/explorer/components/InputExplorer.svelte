<!-- Input Component Explorer -->
<script lang="ts">
	import Input from '$lib/components/Input/Input.svelte';
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

	// Comprehensive code examples for each section
	const allVariantsAndSizesExample = `<!-- All Input Variants with Different Sizes -->
<Input variant="standard" size="sm" label="Standard Small" placeholder="Standard small..." />
<Input variant="outlined" size="md" label="Outlined Medium" placeholder="Outlined medium..." />
<Input variant="filled" size="lg" label="Filled Large" placeholder="Filled large..." />
<Input variant="floating" label="Floating Label" placeholder="Floating..." />
<Input variant="glass" label="Glass Effect" placeholder="Glass effect..." />
<Input variant="underlined" label="Underlined" placeholder="Underlined..." />`;

	const typesAndStatesExample = `<!-- Input Types with Various States -->
<Input type="email" error="Invalid email" label="Email" placeholder="Email..." />
<Input type="password" success="Strong password" label="Password" placeholder="Password..." />
<Input type="number" icon="📊" label="Number" placeholder="Enter number..." />
<Input type="search" icon="🔍" label="Search" placeholder="Search..." />
<Input disabled value="Disabled" label="Disabled Input" />
<Input readonly value="Read only" label="Read Only Input" />`;

	const realWorldExample = `<!-- Real-World Form Examples -->
<!-- Login Form -->
<Input type="email" variant="outlined" label="Email" placeholder="email@example.com" />
<Input type="password" variant="outlined" label="Password" placeholder="Password" />

<!-- Contact Form -->
<Input variant="floating" label="Full Name" placeholder="John Doe" />
<Input type="tel" variant="floating" label="Phone" placeholder="+1 (555) 123-4567" />

<!-- Settings Form -->
<Input icon="👤" label="Display Name" placeholder="Your display name" />
<Input type="url" icon="🌐" label="Website" placeholder="https://yoursite.com" />`;

	const advancedExample = `<!-- Advanced Input Features -->
<!-- JavaScript logic would go here -->
let email = '';
let isValid = false;

// Reactive validation
$: isValid = email.includes('@') && email.includes('.');

<!-- Input with dynamic validation -->
<Input
  type="email"
  bind:value={email}
  variant="outlined"
  label="Email Address"
  placeholder="Enter your email"
  error={!isValid && email ? 'Please enter a valid email' : ''}
  success={isValid ? 'Email looks good!' : ''}
  helper="We'll never share your email"
  icon="📧"
/>`;
</script>

<div class="space-y-8">
	<div>
		<h2 class="text-2xl font-bold mb-4">Input Components</h2>
		<p class="text-gray-600 dark:text-gray-400 mb-6">
			Versatile input components with multiple variants, states, and customization options.
		</p>
	</div>

	<!-- Variants Section -->
	<ComponentPreview 
		title="All Input Variants & Sizes" 
		description="Comprehensive showcase of all input variants with different sizes and styling options"
		complexity="Basic"
		features={["Variants", "Sizes", "Styling"]}
		codeSnippet={allVariantsAndSizesExample}
	>
		<div class="space-y-8">
			<!-- Variants Grid -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Style Variants</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
			</div>

			<!-- Sizes Demo -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Size Variations</h3>
				<div class="space-y-4">
					{#each sizes as size}
						<div class="flex items-center space-x-4">
							<span class="w-16 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
								{size.name}:
							</span>
							<div class="flex-1 max-w-md">
								<Input
									size={size.value}
									bind:value={formData[size.value]}
									placeholder="{size.name} input example..."
									label="{size.name} Input"
									variant="outlined"
								/>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Combined Variants & Sizes -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Variant + Size Combinations</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input variant="outlined" size="lg" label="Large Outlined" placeholder="Large outlined input..." />
					<Input variant="filled" size="sm" label="Small Filled" placeholder="Small filled input..." />
					<Input variant="floating" size="md" label="Medium Floating" placeholder="Medium floating..." />
					<Input variant="glass" size="lg" label="Large Glass" placeholder="Large glass effect..." />
				</div>
			</div>
		</div>
	</ComponentPreview>

	<!-- Input Types & States Section -->
	<ComponentPreview 
		title="Input Types & States" 
		description="All input types with various states including validation, icons, and interactive feedback"
		complexity="Intermediate"
		features={["Input Types", "Validation", "States", "Icons"]}
		codeSnippet={typesAndStatesExample}
	>
		<div class="space-y-8">
			<!-- Input Types -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Input Types</h3>
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
								variant="outlined"
							/>
						</div>
					{/each}
				</div>
			</div>

			<!-- Input States -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Input States & Features</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Error State -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-red-600 dark:text-red-400">Error State</h4>
						<Input bind:value={formData.withError} {...exampleProps.withError} />
					</div>

					<!-- Success State -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-green-600 dark:text-green-400">Success State</h4>
						<Input bind:value={formData.withSuccess} {...exampleProps.withSuccess} />
					</div>

					<!-- With Icon -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-blue-600 dark:text-blue-400">With Icon</h4>
						<Input bind:value={formData.withIcon} {...exampleProps.withIcon} />
					</div>

					<!-- With Helper Text -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-purple-600 dark:text-purple-400">With Helper</h4>
						<Input bind:value={formData.withHelper} {...exampleProps.withHelper} />
					</div>

					<!-- Disabled -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-gray-500 dark:text-gray-400">Disabled</h4>
						<Input disabled value="Disabled input" label="Disabled Input" />
					</div>

					<!-- Read Only -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-gray-500 dark:text-gray-400">Read Only</h4>
						<Input readonly value="Read only value" label="Read Only Input" />
					</div>
				</div>
			</div>
		</div>
	</ComponentPreview>

	<!-- Real-World Examples -->
	<ComponentPreview 
		title="Real-World Form Examples" 
		description="Practical input combinations for common form patterns and use cases"
		complexity="Intermediate"
		features={["Form Patterns", "UX Best Practices", "Real Use Cases"]}
		codeSnippet={realWorldExample}
	>
		<div class="space-y-8">
			<!-- Login Form Example -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Login Form</h3>
				<div class="max-w-md space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Contact Form</h3>
				<div class="max-w-md space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
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

			<!-- Settings Form Example -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">User Settings</h3>
				<div class="max-w-md space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<Input 
						label="Display Name" 
						placeholder="Your display name" 
						variant="outlined"
						icon="👤"
					/>
					<Input 
						type="url" 
						label="Website" 
						placeholder="https://yoursite.com" 
						variant="outlined"
						icon="🌐"
					/>
					<Input 
						label="Bio" 
						placeholder="Tell us about yourself" 
						variant="outlined"
						icon="📝"
					/>
				</div>
			</div>
		</div>
	</ComponentPreview>

	<!-- Advanced Features & Code Examples -->
	<ComponentPreview 
		title="Advanced Features & Implementation" 
		description="Advanced input features with validation, dynamic behavior, and comprehensive code examples"
		complexity="Advanced"
		features={["Dynamic Validation", "Complex Interactions", "Full Implementation"]}
		codeSnippet={advancedExample}
	>
		<div class="space-y-8">
			<!-- Advanced Features Demo -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Advanced Input Features</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Real-time validation -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Real-time Email Validation</h4>
						<Input
							type="email"
							label="Email with Validation"
							placeholder="Enter email for live validation"
							variant="outlined"
							icon="📧"
							helper="We'll validate this as you type"
						/>
					</div>

					<!-- Character counter -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">With Character Limit</h4>
						<Input
							label="Message (Max 100 chars)"
							placeholder="Type your message..."
							variant="filled"
							helper="0/100 characters used"
						/>
					</div>

					<!-- Password strength -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Password Strength</h4>
						<Input
							type="password"
							label="Create Password"
							placeholder="Enter a strong password"
							variant="outlined"
							icon="🔐"
							helper="Include letters, numbers, and symbols"
						/>
					</div>

					<!-- Search with suggestions -->
					<div class="space-y-2">
						<h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Search Input</h4>
						<Input
							type="search"
							label="Search Products"
							placeholder="Search for products..."
							variant="outlined"
							icon="🔍"
							helper="Start typing to see suggestions"
						/>
					</div>
				</div>
			</div>

			<!-- Code Implementation Guide -->
			<div>
				<h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Complete Implementation Examples</h3>
				<div class="space-y-6">
					<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
						<h4 class="text-green-400 font-medium mb-3">Basic Input Usage</h4>
						<pre><code>{`<!-- Basic Input -->
<Input
  label="Username"
  placeholder="Enter username"
  bind:value={username}
/>`}</code></pre>
					</div>

					<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
						<h4 class="text-blue-400 font-medium mb-3">Input with Validation</h4>
						<pre><code>{`<!-- Input with validation -->
<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  variant="outlined"
  bind:value={email}
  error={emailError}
  success={emailSuccess}
  icon="📧"
  helper="We'll never share your email"
/>`}</code></pre>
					</div>

					<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
						<h4 class="text-purple-400 font-medium mb-3">Advanced Dynamic Input</h4>
						<pre><code>{`<!-- Advanced dynamic input -->
&lt;script&gt;
  let value = '';
  let isValid = false;
  
  $: isValid = validateInput(value);
  $: errorMessage = getErrorMessage(value);
&lt;/script&gt;

<Input
  variant="floating"
  label="Dynamic Input"
  placeholder="Type to see validation"
  bind:value={value}
  error={!isValid && value ? errorMessage : ''}
  success={isValid && value ? 'Looks good!' : ''}
  helper="Real-time validation example"
/>`}</code></pre>
					</div>
				</div>
			</div>
		</div>
	</ComponentPreview>
</div>
