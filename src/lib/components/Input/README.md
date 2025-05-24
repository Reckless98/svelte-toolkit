# Input Component

A comprehensive input component with multiple variants, validation states, and accessibility features.

## Features

- **Multiple Variants**: Standard, Outlined, Filled, Floating, Glass, Underlined
- **Input Types**: Text, Password, Email, Number, Search, Tel, URL, and more
- **Validation States**: Error and Success states with custom messages
- **Icon Support**: Icons on left or right side
- **Helper Text**: Additional guidance for users
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive Design**: Adapts to different screen sizes

## Basic Usage

```svelte
<script>
	import { Input } from '$lib/components/Input';

	let value = '';
</script>

<Input bind:value label="Username" placeholder="Enter your username" />
```

## Props

| Prop           | Type      | Default          | Description           |
| -------------- | --------- | ---------------- | --------------------- |
| `type`         | `string`  | `'text'`         | HTML input type       |
| `variant`      | `string`  | `'standard'`     | Input style variant   |
| `value`        | `string`  | `''`             | Input value           |
| `placeholder`  | `string`  | `''`             | Placeholder text      |
| `label`        | `string`  | `''`             | Input label           |
| `name`         | `string`  | `''`             | Input name attribute  |
| `id`           | `string`  | `auto-generated` | Input id attribute    |
| `disabled`     | `boolean` | `false`          | Disable the input     |
| `readonly`     | `boolean` | `false`          | Make input read-only  |
| `required`     | `boolean` | `false`          | Mark as required      |
| `error`        | `string`  | `''`             | Error message         |
| `success`      | `string`  | `''`             | Success message       |
| `helper`       | `string`  | `''`             | Helper text           |
| `icon`         | `string`  | `''`             | Icon to display       |
| `iconPosition` | `string`  | `'left'`         | Icon position         |
| `size`         | `string`  | `'md'`           | Input size (sm/md/lg) |
| `width`        | `string`  | `'w-full'`       | CSS width class       |
| `loading`      | `boolean` | `false`          | Show loading state    |

## Variants

### Standard

```svelte
<Input variant="standard" label="Standard Input" />
```

### Outlined

```svelte
<Input variant="outlined" label="Outlined Input" />
```

### Filled

```svelte
<Input variant="filled" label="Filled Input" />
```

### Floating Label

```svelte
<Input variant="floating" label="Floating Label" />
```

### Glass Effect

```svelte
<Input variant="glass" label="Glass Input" />
```

### Underlined

```svelte
<Input variant="underlined" label="Underlined Input" />
```

## Input Types

```svelte
<Input type="email" label="Email Address" />
<Input type="password" label="Password" />
<Input type="number" label="Age" />
<Input type="tel" label="Phone Number" />
<Input type="url" label="Website" />
<Input type="search" label="Search" />
```

## Validation States

### Error State

```svelte
<Input label="Email" error="Please enter a valid email address" bind:value={email} />
```

### Success State

```svelte
<Input label="Username" success="Username is available!" bind:value={username} />
```

## With Icons

```svelte
<Input icon="📧" label="Email" />
<Input icon="🔍" iconPosition="right" label="Search" />
```

## Helper Text

```svelte
<Input label="Password" type="password" helper="Password must be at least 8 characters long" />
```

## Sizes

```svelte
<Input size="sm" label="Small Input" />
<Input size="md" label="Medium Input" />
<Input size="lg" label="Large Input" />
```

## Events

The Input component dispatches the following events:

- `input`: Fired when the input value changes
- `change`: Fired when the input loses focus with a changed value
- `focus`: Fired when the input receives focus
- `blur`: Fired when the input loses focus
- `keydown`: Fired when a key is pressed
- `keyup`: Fired when a key is released

```svelte
<Input
	on:input={handleInput}
	on:change={handleChange}
	on:focus={handleFocus}
	on:blur={handleBlur}
	bind:value={inputValue}
/>
```

## Form Integration

```svelte
<script>
	let formData = {
		name: '',
		email: '',
		password: '',
	};

	function handleSubmit() {
		// Handle form submission
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input bind:value={formData.name} label="Full Name" required />

	<Input bind:value={formData.email} type="email" label="Email Address" required />

	<Input bind:value={formData.password} type="password" label="Password" required />
</form>
```

## Accessibility

The Input component includes:

- Proper ARIA labels and descriptions
- Error announcements for screen readers
- Keyboard navigation support
- Focus management
- Required field indicators

## Customization

Override CSS custom properties:

```css
.input {
	--input-border-color: #your-color;
	--input-focus-color: #your-focus-color;
	--input-error-color: #your-error-color;
	--input-success-color: #your-success-color;
}
```

## Examples

### Login Form

```svelte
<Input
	type="email"
	variant="outlined"
	label="Email Address"
	icon="📧"
	bind:value={email}
	required
/>

<Input
	type="password"
	variant="outlined"
	label="Password"
	icon="🔒"
	bind:value={password}
	required
/>
```

### Search Input

```svelte
<Input
	type="search"
	variant="filled"
	placeholder="Search products..."
	icon="🔍"
	bind:value={searchQuery}
/>
```

### Contact Form

```svelte
<Input variant="floating" label="Your Name" bind:value={name} required />

<Input type="email" variant="floating" label="Email Address" bind:value={email} required />

<Input
	type="tel"
	variant="floating"
	label="Phone Number"
	helper="Include country code"
	bind:value={phone}
/>
```
