# Checkbox Component

A comprehensive and customizable checkbox component with multiple variants, sizes, animations, and accessibility features.

## Features

- **Multiple Variants**: standard, outlined, filled, modern, neon, glass
- **Size Options**: sm, md, lg, xl
- **Animation Effects**: none, scale, bounce, slide
- **Color Themes**: primary, secondary, success, warning, error, info
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **TypeScript**: Complete type definitions and IntelliSense support
- **Dark Mode**: Automatic dark mode support
- **Indeterminate State**: Support for tri-state checkboxes
- **Error Handling**: Built-in error state and validation
- **Custom Styling**: Easy to customize with CSS classes

## Usage

```svelte
<script>
  import { Checkbox } from '$lib/components/Checkbox';
  
  let checked = false;
  let indeterminate = false;
</script>

<!-- Basic usage -->
<Checkbox bind:checked label="Accept terms and conditions" />

<!-- With description -->
<Checkbox 
  bind:checked
  label="Enable notifications"
  description="Receive email updates about your account"
/>

<!-- Different variants -->
<Checkbox variant="modern" bind:checked label="Modern style" />
<Checkbox variant="neon" bind:checked label="Neon style" />
<Checkbox variant="glass" bind:checked label="Glass style" />

<!-- Different sizes -->
<Checkbox size="sm" bind:checked label="Small" />
<Checkbox size="lg" bind:checked label="Large" />
<Checkbox size="xl" bind:checked label="Extra Large" />

<!-- With animation -->
<Checkbox animation="bounce" bind:checked label="Bouncy checkbox" />
<Checkbox animation="scale" bind:checked label="Scale animation" />

<!-- Color themes -->
<Checkbox color="success" bind:checked label="Success theme" />
<Checkbox color="warning" bind:checked label="Warning theme" />
<Checkbox color="error" bind:checked label="Error theme" />

<!-- Indeterminate state -->
<Checkbox bind:indeterminate label="Select all" />

<!-- Disabled state -->
<Checkbox disabled label="Disabled checkbox" />

<!-- Error state -->
<Checkbox 
  bind:checked
  error="This field is required"
  label="Required field"
/>

<!-- Custom styling -->
<Checkbox 
  class="custom-checkbox"
  bind:checked
  label="Custom styled"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `required` | `boolean` | `false` | Whether the checkbox is required |
| `label` | `string` | `''` | Label text for the checkbox |
| `description` | `string` | `''` | Description text below the label |
| `variant` | `CheckboxVariant` | `'standard'` | Visual variant of the checkbox |
| `size` | `CheckboxSize` | `'md'` | Size of the checkbox |
| `animation` | `CheckboxAnimation` | `'scale'` | Animation effect when checking |
| `color` | `CheckboxColor` | `'primary'` | Color theme of the checkbox |
| `error` | `string` | `''` | Error message to display |
| `value` | `string` | `''` | Value of the checkbox for forms |
| `name` | `string` | `''` | Name attribute for forms |
| `id` | `string` | `''` | ID attribute (auto-generated if not provided) |
| `class` | `string` | `''` | Additional CSS classes |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean, indeterminate: boolean, value: string }` | Fired when checkbox state changes |
| `focus` | `FocusEvent` | Fired when checkbox receives focus |
| `blur` | `FocusEvent` | Fired when checkbox loses focus |

## Slots

| Slot | Description |
|------|-------------|
| `label` | Custom label content (alternative to `label` prop) |
| `description` | Custom description content (alternative to `description` prop) |

## Styling

The component uses CSS custom properties for easy theming:

```css
.checkbox {
  --checkbox-size: 1.25rem;
  --checkbox-border-width: 2px;
  --checkbox-border-radius: 0.375rem;
  --checkbox-transition: all 0.2s ease;
}
```

## Accessibility

- Full keyboard navigation support (Space to toggle)
- Proper ARIA attributes (`aria-checked`, `aria-describedby`, `aria-invalid`)
- Screen reader friendly labels and descriptions
- Focus management and visual indicators
- Semantic HTML structure

## Variants

### Standard
Clean, minimal design with subtle borders and modern styling.

### Outlined
Prominent borders with transparent background, perfect for forms.

### Filled
Solid background colors that change based on state.

### Modern
Contemporary design with subtle shadows and gradients.

### Neon
Bright, glowing effects perfect for dark themes.

### Glass
Translucent design with backdrop blur effects.

## Examples

Check out the component explorer for interactive examples and live code demos.
