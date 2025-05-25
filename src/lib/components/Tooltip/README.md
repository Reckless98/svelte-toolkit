# Tooltip Component

A flexible tooltip component with multiple positioning options, variants, and accessibility features.

## Features

- **Multiple Positions**: 12 positioning options including corners and edges
- **Variant Styles**: 9 different visual styles including glass morphism
- **Size Options**: Small, medium, and large sizes
- **Trigger Methods**: Hover, click, or manual control
- **Accessibility**: Full ARIA support and keyboard navigation
- **Interactive Mode**: Tooltips that can contain interactive content
- **Smart Positioning**: Automatic viewport boundary detection
- **TypeScript**: Complete type definitions
- **Dark Mode**: Automatic dark mode support

## Basic Usage

```svelte
<script>
	import { Tooltip } from '$lib/components/Tooltip';
</script>

<Tooltip content="This is a helpful tooltip">
	<button>Hover me</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Tooltip text content |
| `position` | `TooltipPosition` | `'top'` | Position relative to trigger |
| `variant` | `TooltipVariant` | `'default'` | Visual style variant |
| `size` | `TooltipSize` | `'md'` | Size of the tooltip |
| `animation` | `TooltipAnimation` | `'fade'` | Animation type |
| `delay` | `number` | `200` | Show delay in milliseconds |
| `duration` | `number` | `200` | Animation duration |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `arrow` | `boolean` | `true` | Show arrow pointer |
| `offset` | `number` | `8` | Distance from trigger |
| `maxWidth` | `string` | `'max-w-xs'` | Maximum width class |
| `multiline` | `boolean` | `false` | Allow text wrapping |
| `interactive` | `boolean` | `false` | Allow hover over tooltip |
| `trigger` | `'hover' \| 'click' \| 'manual'` | `'hover'` | Trigger method |
| `open` | `boolean` | `false` | Manual control (when trigger='manual') |

## Positioning

The tooltip supports 12 different positions:

```svelte
<!-- Basic positions -->
<Tooltip position="top" content="Top tooltip">
	<button>Top</button>
</Tooltip>

<Tooltip position="bottom" content="Bottom tooltip">
	<button>Bottom</button>
</Tooltip>

<Tooltip position="left" content="Left tooltip">
	<button>Left</button>
</Tooltip>

<Tooltip position="right" content="Right tooltip">
	<button>Right</button>
</Tooltip>

<!-- Corner positions -->
<Tooltip position="top-start" content="Top start tooltip">
	<button>Top Start</button>
</Tooltip>

<Tooltip position="bottom-end" content="Bottom end tooltip">
	<button>Bottom End</button>
</Tooltip>
```

## Variants

```svelte
<!-- Default dark tooltip -->
<Tooltip variant="default" content="Default tooltip">
	<button>Default</button>
</Tooltip>

<!-- Light tooltip -->
<Tooltip variant="light" content="Light tooltip">
	<button>Light</button>
</Tooltip>

<!-- Status variants -->
<Tooltip variant="error" content="Error message">
	<button>Error</button>
</Tooltip>

<Tooltip variant="warning" content="Warning message">
	<button>Warning</button>
</Tooltip>

<Tooltip variant="success" content="Success message">
	<button>Success</button>
</Tooltip>

<!-- Glass morphism -->
<Tooltip variant="glass" content="Glass tooltip">
	<button>Glass</button>
</Tooltip>
```

## Trigger Methods

```svelte
<!-- Hover trigger (default) -->
<Tooltip content="Hover to show">
	<button>Hover me</button>
</Tooltip>

<!-- Click trigger -->
<Tooltip trigger="click" content="Click to show">
	<button>Click me</button>
</Tooltip>

<!-- Manual control -->
<script>
	let showTooltip = false;
</script>

<Tooltip trigger="manual" bind:open={showTooltip} content="Manually controlled">
	<button on:click={() => showTooltip = !showTooltip}>
		Toggle tooltip
	</button>
</Tooltip>
```

## Interactive Tooltips

```svelte
<Tooltip 
	interactive={true} 
	content="You can hover over this tooltip and click links!"
	maxWidth="max-w-sm"
	multiline={true}
>
	<button>Interactive tooltip</button>
</Tooltip>
```

## Size Options

```svelte
<Tooltip size="sm" content="Small tooltip">
	<button>Small</button>
</Tooltip>

<Tooltip size="md" content="Medium tooltip">
	<button>Medium</button>
</Tooltip>

<Tooltip size="lg" content="Large tooltip">
	<button>Large</button>
</Tooltip>
```

## Events

```svelte
<Tooltip 
	content="Event tooltip"
	on:show={() => console.log('Tooltip shown')}
	on:hide={() => console.log('Tooltip hidden')}
>
	<button>Events</button>
</Tooltip>
```

## Accessibility

The Tooltip component includes:

- Proper ARIA attributes (`role="tooltip"`, `aria-describedby`)
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## Advanced Examples

### Form Field with Validation

```svelte
<Tooltip 
	variant="error" 
	content="This field is required" 
	position="right"
	trigger="manual"
	bind:open={showError}
>
	<input
		type="email"
		placeholder="Enter email"
		class:border-red-500={showError}
		on:blur={validateField}
	/>
</Tooltip>
```

### Help Icon with Rich Content

```svelte
<Tooltip 
	interactive={true}
	maxWidth="max-w-md"
	multiline={true}
	content="This feature helps you manage your account settings more efficiently. Click the settings icon to access advanced options."
>
	<button class="text-blue-500 hover:text-blue-700">
		<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
		</svg>
	</button>
</Tooltip>
```

## Customization

You can customize the tooltip appearance using CSS classes:

```css
/* Custom tooltip styles */
.custom-tooltip {
	--tooltip-bg: theme('colors.purple.600');
	--tooltip-text: theme('colors.white');
	--tooltip-border: theme('colors.purple.500');
}
```

## Best Practices

1. **Keep content concise** - Tooltips should provide helpful but brief information
2. **Use appropriate triggers** - Hover for supplementary info, click for important details
3. **Consider mobile users** - Click triggers work better on touch devices
4. **Maintain consistency** - Use the same variant and positioning throughout your app
5. **Test accessibility** - Ensure tooltips work with keyboard navigation and screen readers
