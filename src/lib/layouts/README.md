# Layout Components

A collection of pre-built layout components for common UI patterns, including hero sections and parallax effects.

## Components

### HeroLayout

A full-screen hero section component with background image support, text alignment options, and call-to-action areas.

### ParallaxLayout

A parallax scrolling container that creates depth and visual interest through differential scrolling speeds.

## HeroLayout

### Features

- **Background Images**: Support for full-screen background images with overlay options
- **Text Alignment**: Flexible content positioning (left, center, right)
- **Responsive Design**: Mobile-first responsive behavior
- **Height Control**: Full-height or custom height options
- **Overlay Effects**: Customizable background overlays for text readability
- **Slot Support**: Flexible content placement with named slots

### Props

| Prop              | Type      | Default         | Description                          |
| ----------------- | --------- | --------------- | ------------------------------------ |
| `backgroundImage` | `string`  | `''`            | URL for background image             |
| `fullHeight`      | `boolean` | `true`          | Use full viewport height             |
| `textAlignment`   | `string`  | `'text-center'` | Text alignment class                 |
| `overlay`         | `boolean` | `true`          | Show background overlay              |
| `overlayOpacity`  | `number`  | `0.5`           | Overlay opacity (0-1)                |
| `variant`         | `string`  | `'standard'`    | Layout variant (`standard`, `split`) |

### Usage Examples

#### Basic Hero

```svelte
<script>
	import { HeroLayout } from 'svelte-ui-toolkit';
</script>

<HeroLayout backgroundImage="/path/to/hero-image.jpg" textAlignment="text-center">
	<h1 class="text-5xl font-bold mb-4">Welcome to Our Site</h1>
	<p class="text-xl mb-8">Discover amazing features and services</p>
	<button class="px-8 py-3 bg-blue-600 text-white rounded-lg"> Get Started </button>
</HeroLayout>
```

#### Split Hero Layout

```svelte
<HeroLayout variant="split" backgroundImage="/path/to/hero-image.jpg">
	<div slot="left">
		<h1 class="text-4xl font-bold mb-4">Left Content</h1>
		<p class="mb-6">Your main message goes here</p>
		<button class="px-6 py-2 bg-accent text-white rounded-lg"> Call to Action </button>
	</div>

	<div slot="right" class="p-8 bg-white/20 backdrop-blur-md rounded-lg">
		<h2 class="text-2xl font-bold mb-4">Right Content</h2>
		<p>Secondary content, forms, or additional information</p>
	</div>
</HeroLayout>
```

## ParallaxLayout

### Features

- **Scroll-based Animation**: Elements move at different speeds during scroll
- **Direction Control**: Configurable parallax direction (up, down, left, right)
- **Speed Control**: Adjustable parallax intensity
- **Performance Optimized**: Efficient scroll event handling
- **Responsive**: Works across all device sizes

### Props

| Prop              | Type      | Default | Description                                          |
| ----------------- | --------- | ------- | ---------------------------------------------------- |
| `backgroundImage` | `string`  | `''`    | Background image URL                                 |
| `speed`           | `number`  | `0.5`   | Parallax speed (0-1, where 0.5 is half scroll speed) |
| `direction`       | `string`  | `'up'`  | Parallax direction (`up`, `down`, `left`, `right`)   |
| `fullHeight`      | `boolean` | `false` | Use full viewport height                             |

### Usage Examples

#### Basic Parallax

```svelte
<script>
	import { ParallaxLayout } from 'svelte-ui-toolkit';
</script>

<ParallaxLayout backgroundImage="/path/to/background.jpg" speed={0.5} direction="up">
	<div class="text-center py-20">
		<h2 class="text-4xl font-bold mb-4">Parallax Section</h2>
		<p class="text-xl">Content that moves at a different speed</p>
	</div>
</ParallaxLayout>
```

#### Multi-directional Parallax

```svelte
<div class="grid grid-cols-2 gap-8">
	<ParallaxLayout speed={0.2} direction="left">
		<div class="p-6 bg-white rounded-lg shadow-md">
			<h3 class="font-bold mb-2">Moves Left</h3>
			<p>This content moves left while scrolling</p>
		</div>
	</ParallaxLayout>

	<ParallaxLayout speed={0.2} direction="right">
		<div class="p-6 bg-white rounded-lg shadow-md">
			<h3 class="font-bold mb-2">Moves Right</h3>
			<p>This content moves right while scrolling</p>
		</div>
	</ParallaxLayout>
</div>
```

## Styling

Both components use Tailwind CSS classes and support:

- Custom background images with proper scaling
- Responsive typography and spacing
- Flexible color schemes through CSS custom properties
- Smooth animations and transitions

### CSS Custom Properties

```css
:root {
	--hero-overlay-color: rgba(0, 0, 0, 0.5);
	--parallax-transform-origin: center center;
}
```

## Accessibility

- **Semantic HTML**: Proper document structure
- **Alternative Text**: Support for background image descriptions
- **Reduced Motion**: Respects prefers-reduced-motion for animations
- **Keyboard Navigation**: Focusable elements maintain accessibility
- **Screen Reader Support**: Proper ARIA labels where needed

## Performance Considerations

- **Optimized Scroll Handling**: Throttled scroll events for smooth performance
- **GPU Acceleration**: CSS transforms utilize hardware acceleration
- **Efficient Re-renders**: Minimal DOM updates during scroll
- **Image Optimization**: Support for responsive images and modern formats

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with CSS transforms support

## Best Practices

1. **Image Optimization**: Use optimized images (WebP, AVIF) for better performance
2. **Content Hierarchy**: Maintain clear visual hierarchy in hero sections
3. **Mobile First**: Design hero content for mobile, then enhance for desktop
4. **Accessibility**: Always provide meaningful alt text and maintain contrast ratios
5. **Performance**: Use parallax sparingly to avoid overwhelming users

## Examples in Production

These layout components are perfect for:

- Landing pages with compelling hero sections
- Portfolio websites with visual impact
- Marketing sites with engaging scroll experiences
- Product showcases with layered content
- Corporate websites with professional layouts
