# Badge Component

A versatile and customizable badge component for displaying status, notifications, categories, and metadata with multiple variants and interactive features.

## Features

- **Multiple Variants**: Default, Success, Warning, Error, Info with semantic colors
- **Size Options**: Small (sm), Medium (md), Large (lg) for different use cases
- **Outline Style**: Optional outline styling for subtle appearance
- **Interactive Features**: Removable badges with custom remove handling
- **Icon Support**: Display icons alongside text content
- **Link Support**: Transform badges into clickable links
- **Dark Mode**: Full dark mode support with theme-aware colors
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **TypeScript Support**: Complete type definitions and IntelliSense

## Basic Usage

```svelte
<script>
	import { Badge } from '$lib/components/Badge';
</script>

<!-- Basic badge -->
<Badge>Default</Badge>

<!-- With variant -->
<Badge variant="success">Success</Badge>

<!-- With size -->
<Badge size="lg" variant="info">Large Info</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Badge color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `outline` | `boolean` | `false` | Use outline styling instead of filled |
| `removable` | `boolean` | `false` | Show remove button |
| `icon` | `string` | `''` | Icon to display before text |
| `href` | `string` | `''` | Make badge a clickable link |
| `class` | `string` | `''` | Additional CSS classes |

## Variants

### Semantic Variants

```svelte
<!-- Status indicators -->
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Outline Style

```svelte
<!-- Subtle outline badges -->
<Badge outline>Default</Badge>
<Badge variant="success" outline>Success</Badge>
<Badge variant="warning" outline>Warning</Badge>
<Badge variant="error" outline>Error</Badge>
<Badge variant="info" outline>Info</Badge>
```

## Sizes

```svelte
<!-- Different sizes -->
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

## With Icons

```svelte
<!-- Badges with icons -->
<Badge icon="🎯" variant="info">Target</Badge>
<Badge icon="✓" variant="success">Completed</Badge>
<Badge icon="⚠" variant="warning">Warning</Badge>
<Badge icon="🔥" variant="error">Hot</Badge>
```

## Interactive Features

### Removable Badges

```svelte
<script>
	// Handle remove event
	const handleBadgeRemove = (event) => {
		console.log('Badge removed');
		// Custom removal logic here
	};
</script>

<!-- Listen for the custom remove event -->
<Badge removable variant="info" on:remove={handleBadgeRemove}>JavaScript</Badge>
<Badge removable variant="success">TypeScript</Badge>
<Badge removable variant="warning">Svelte</Badge>
```

### Linked Badges

```svelte
<!-- Badges as navigation links -->
<Badge href="/components" variant="info">Components</Badge>
<Badge href="/explorer" variant="success">Explorer</Badge>
<Badge href="/about" variant="warning">About</Badge>
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `remove` | `void` | Fired when removable badge is clicked (using Svelte's event dispatcher) |
| `click` | `MouseEvent \| KeyboardEvent` | Fired when badge is clicked or activated via keyboard |

## Example Event Handling

```svelte
<script>
	const handleRemove = () => {
		console.log('Badge was removed');
		// Your removal logic here
	};
	
	const handleClick = (event) => {
		console.log('Badge was clicked', event.detail);
		// Your click logic here
	};
</script>

<Badge 
	removable 
	variant="info" 
	on:remove={handleRemove}
	on:click={handleClick}
>
	Interactive Badge
</Badge>
```

## Practical Examples

### Status Indicators

```svelte
<!-- User status -->
<Badge icon="🟢" variant="success" size="sm">Online</Badge>
<Badge icon="🟡" variant="warning" size="sm">Away</Badge>
<Badge icon="🔴" variant="error" size="sm">Busy</Badge>
<Badge icon="⚫" variant="default" size="sm">Offline</Badge>
```

### Notification Counts

```svelte
<!-- Notification badges -->
<Badge variant="error" size="sm">3</Badge>
<Badge variant="info" size="sm">12</Badge>
<Badge variant="warning" size="sm">99+</Badge>
```

### Technology Tags

```svelte
<!-- Removable technology tags -->
<div class="flex flex-wrap gap-2">
	<Badge removable variant="info">JavaScript</Badge>
	<Badge removable variant="success">TypeScript</Badge>
	<Badge removable variant="warning">Svelte</Badge>
	<Badge removable outline>Responsive</Badge>
	<Badge removable outline>Dark Mode</Badge>
</div>
```

### Category Navigation

```svelte
<!-- Category badges as links -->
<div class="flex flex-wrap gap-2">
	<Badge href="/blog/javascript" variant="info">JavaScript</Badge>
	<Badge href="/blog/svelte" variant="success">Svelte</Badge>
	<Badge href="/blog/css" variant="warning">CSS</Badge>
	<Badge href="/blog/design" variant="error">Design</Badge>
</div>
```

## Accessibility

The Badge component includes:

- Proper semantic HTML structure
- ARIA labels for remove buttons (`aria-label="Remove badge"`)
- Keyboard navigation support for interactive elements
- Focus management for removable badges
- Color contrast compliance for all variants
- Screen reader friendly content structure

### Accessibility Best Practices

```svelte
<!-- Provide meaningful labels for screen readers -->
<Badge variant="error" aria-label="3 unread notifications">3</Badge>

<!-- Use proper context for status badges -->
<span aria-label="User status">
	<Badge icon="🟢" variant="success" size="sm">Online</Badge>
</span>
```

## Customization

### CSS Custom Properties

The component uses CSS classes that can be customized through Tailwind CSS or custom CSS:

```css
/* Custom badge styling */
.custom-badge {
	@apply px-4 py-2 text-lg font-bold rounded-lg;
	background: linear-gradient(45deg, #667eea, #764ba2);
	color: white;
}
```

### Custom Variants

```svelte
<!-- Using custom classes -->
<Badge class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
	Custom Gradient
</Badge>
```

## Advanced Usage

### Animated Badges

```svelte
<!-- Badges with CSS animations -->
<Badge 
	class="animate-pulse" 
	variant="error"
	icon="🔴"
>
	Live
</Badge>

<Badge 
	class="hover:animate-bounce" 
	variant="success"
>
	Interactive
</Badge>
```

### Conditional Rendering

```svelte
<script>
	let notifications = 5;
	let isOnline = true;
</script>

<!-- Show badge only when there are notifications -->
{#if notifications > 0}
	<Badge variant="error" size="sm">{notifications}</Badge>
{/if}

<!-- Dynamic status badge -->
<Badge 
	variant={isOnline ? 'success' : 'default'} 
	icon={isOnline ? '🟢' : '⚫'}
>
	{isOnline ? 'Online' : 'Offline'}
</Badge>
```

### Form Integration

```svelte
<script>
	let selectedTags = ['JavaScript', 'Svelte'];
	
	const removeTag = (tag) => {
		selectedTags = selectedTags.filter(t => t !== tag);
	};
</script>

<!-- Tag selector with removable badges -->
<div class="space-y-2">
	<label class="block text-sm font-medium">Selected Technologies:</label>
	<div class="flex flex-wrap gap-2">
		{#each selectedTags as tag}
			<Badge 
				removable 
				variant="info" 
				on:remove={() => removeTag(tag)}
			>
				{tag}
			</Badge>
		{/each}
	</div>
</div>
```

## Styling Guide

### Color Variants

- **Default**: Neutral gray colors for general use
- **Success**: Green colors for positive states, completions, online status
- **Warning**: Yellow/orange colors for cautions, pending states
- **Error**: Red colors for errors, critical states, notifications
- **Info**: Blue colors for information, links, categories

### Size Guidelines

- **Small (sm)**: For subtle indicators, notification counts, compact layouts
- **Medium (md)**: Default size for most use cases, good balance of visibility and space
- **Large (lg)**: For prominent features, main navigation, hero sections

### Outline vs Filled

- **Filled**: High contrast, attention-grabbing, better for primary actions
- **Outline**: Subtle, secondary information, better for supporting content

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with CSS Grid and Flexbox support

## Dependencies

- Tailwind CSS for styling
- Svelte for component logic
- TypeScript for type definitions

## Best Practices

1. **Semantic Usage**: Use appropriate variants that match the content meaning
2. **Consistency**: Maintain consistent sizing and styling across your application
3. **Accessibility**: Always provide meaningful text content, avoid icon-only badges
4. **Performance**: Use removable badges sparingly to avoid excessive event handlers
5. **Color Contrast**: Ensure sufficient contrast for readability in all themes
6. **Responsive Design**: Consider how badges appear on different screen sizes

## Examples in Production

Perfect for:

- Status indicators (online/offline, active/inactive)
- Notification counters (unread messages, alerts)
- Category tags (blog posts, products, filters)
- Technology stacks (skills, tools, frameworks)
- User roles and permissions
- Feature flags and labels
- Navigation aids and breadcrumbs

## Integration with Other Components

### With Navigation

```svelte
<Navigation>
	<a href="/messages">
		Messages
		<Badge variant="error" size="sm">3</Badge>
	</a>
</Navigation>
```

### With Cards

```svelte
<Card>
	<div slot="header" class="flex items-center justify-between">
		<h3>Article Title</h3>
		<Badge variant="success">Published</Badge>
	</div>
	<p>Article content...</p>
</Card>
```

### With Buttons

```svelte
<Button>
	Notifications
	<Badge variant="error" size="sm" class="ml-2">5</Badge>
</Button>
```
