# Button Component

A versatile and customizable button component with multiple variants, sizes, animations, and states.

## Features

- **Multiple Variants**: Primary, Secondary, Accent, Ghost, 3D, Gradient, Glass
- **Different Sizes**: Small (sm), Medium (md), Large (lg), Extra Large (xl)
- **Animation Effects**: Ripple, Pulse, Bounce
- **Loading States**: Built-in loading spinner
- **Icon Support**: Icons on left or right side
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript Support**: Complete type definitions

## Basic Usage

```svelte
<script>
  import { Button } from '$lib/components/Button';
</script>

<Button>Click me</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'primary'` | Button style variant |
| `size` | `string` | `'md'` | Button size |
| `type` | `string` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading state |
| `icon` | `string` | `''` | Icon to display |
| `iconPosition` | `string` | `'left'` | Icon position (left/right) |
| `animation` | `string` | `'none'` | Animation effect |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `href` | `string` | `''` | Render as link if provided |
| `target` | `string` | `'_self'` | Link target |

## Variants

### Primary
```svelte
<Button variant="primary">Primary Button</Button>
```

### Secondary
```svelte
<Button variant="secondary">Secondary Button</Button>
```

### Accent
```svelte
<Button variant="accent">Accent Button</Button>
```

### Ghost
```svelte
<Button variant="ghost">Ghost Button</Button>
```

### 3D
```svelte
<Button variant="3d">3D Button</Button>
```

### Gradient
```svelte
<Button variant="gradient">Gradient Button</Button>
```

### Glass
```svelte
<Button variant="glass">Glass Button</Button>
```

## Sizes

```svelte
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## With Icons

```svelte
<Button icon="🚀">Launch</Button>
<Button icon="💾" iconPosition="right">Save</Button>
```

## Loading State

```svelte
<Button loading>Loading...</Button>
```

## Animations

```svelte
<Button animation="ripple">Ripple Effect</Button>
<Button animation="pulse">Pulse Effect</Button>
<Button animation="bounce">Bounce Effect</Button>
```

## Events

The Button component dispatches the following events:

- `click`: Fired when the button is clicked
- `focus`: Fired when the button receives focus
- `blur`: Fired when the button loses focus

```svelte
<Button
  on:click={handleClick}
  on:focus={handleFocus}
  on:blur={handleBlur}
>
  Click me
</Button>
```

## Accessibility

The Button component includes:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Disabled state handling

## Customization

The component uses CSS custom properties that can be overridden:

```css
.button {
  --button-primary-bg: #your-color;
  --button-primary-hover: #your-hover-color;
  --button-border-radius: 8px;
}
```

## Examples

### Form Submit Button
```svelte
<Button type="submit" variant="primary" loading={isSubmitting}>
  Submit Form
</Button>
```

### Icon Button
```svelte
<Button variant="ghost" icon="⚙️" size="sm">
  Settings
</Button>
```

### Full Width Button
```svelte
<Button variant="accent" fullWidth>
  Sign Up Now
</Button>
```

### Link Button
```svelte
<Button href="/about" target="_blank">
  Learn More
</Button>
```
