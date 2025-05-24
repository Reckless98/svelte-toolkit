# Header Component

A versatile and responsive header component with multiple variants, navigation support, and modern styling.

## Features

- **Multiple Variants**: Standard, minimal, with search, animated, and glass morphism styles
- **Responsive Design**: Mobile-friendly with collapsible navigation
- **Sticky Header**: Optional sticky positioning with scroll detection
- **Search Integration**: Built-in search functionality
- **Animation Support**: Smooth transitions and hover effects
- **Dark Mode**: Full dark mode support
- **CTA Support**: Optional call-to-action buttons
- **Glass Morphism**: Modern glass effect variant
- **Accessibility**: ARIA labels and keyboard navigation support

## Props

| Prop          | Type      | Default      | Description                                                                              |
| ------------- | --------- | ------------ | ---------------------------------------------------------------------------------------- |
| `variant`     | `string`  | `'standard'` | Header style variant: `'standard'`, `'minimal'`, `'withSearch'`, `'animated'`, `'glass'` |
| `logo`        | `string`  | `''`         | URL to logo image                                                                        |
| `title`       | `string`  | `'Brand'`    | Brand or site title                                                                      |
| `links`       | `array`   | `[...]`      | Navigation links array with `text` and `href` properties                                 |
| `sticky`      | `boolean` | `false`      | Enable sticky header behavior                                                            |
| `transparent` | `boolean` | `false`      | Start with transparent background                                                        |
| `dark`        | `boolean` | `false`      | Enable dark mode styling                                                                 |
| `animated`    | `boolean` | `false`      | Enable link animations and transitions                                                   |
| `withSearch`  | `boolean` | `false`      | Include search functionality                                                             |
| `ctaButton`   | `object`  | `null`       | Call-to-action button config: `{ text, href, variant }`                                  |

## Usage Examples

### Basic Header

```svelte
<script>
	import { Header } from '$lib/components';
</script>

<Header title="My Website" />
```

### Header with Navigation

```svelte
<script>
	import { Header } from '$lib/components';

	const navLinks = [
		{ text: 'Home', href: '/' },
		{ text: 'About', href: '/about' },
		{ text: 'Services', href: '/services' },
		{ text: 'Contact', href: '/contact' },
	];
</script>

<Header title="My Company" logo="/logo.png" links={navLinks} />
```

### Sticky Header with Search

```svelte
<Header variant="withSearch" title="My App" sticky={true} animated={true} links={navLinks} />
```

### Glass Morphism Header

```svelte
<Header variant="glass" title="Modern App" transparent={true} animated={true} links={navLinks} />
```

### Header with CTA Button

```svelte
<Header
	title="SaaS Platform"
	links={navLinks}
	ctaButton={{
		text: 'Sign Up',
		href: '/signup',
		variant: 'primary',
	}}
/>
```

### Dark Mode Header

```svelte
<Header title="Dark Theme" dark={true} animated={true} links={navLinks} />
```

## Variants

### Standard

The default header variant with full navigation and branding.

### Minimal

A simplified header with just the logo/title and minimal navigation.

### With Search

Includes a search input field in the navigation area.

### Animated

Adds smooth hover animations and underline effects to links.

### Glass

Modern glass morphism effect with backdrop blur and transparency.

## Events

The component dispatches search events when search functionality is used:

```svelte
<Header
	withSearch={true}
	on:search={(event) => {
		console.log('Search query:', event.detail.query);
	}}
/>
```

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Mobile Menu**: Accessible mobile navigation
- **Semantic HTML**: Proper use of `<header>`, `<nav>`, and `<ul>` elements

## Customization

### CSS Classes

The header uses Tailwind CSS classes that can be customized:

- `.header-link`: Navigation link styling
- `.header-brand`: Brand/logo area styling
- `.header-mobile-menu`: Mobile menu styling

### Custom Styling

```svelte
<Header title="Custom Styled" class="custom-header-class" links={navLinks} />

<style>
	:global(.custom-header-class) {
		/* Custom header styles */
	}
</style>
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- IE11+ (with appropriate polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- Svelte transitions (`fade`, `slide`, `fly`)
- Tailwind CSS for styling
- No external JavaScript dependencies
