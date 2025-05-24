# Navigation Component

A comprehensive navigation component supporting multiple layouts, themes, and interaction patterns.

## Features

- **Multiple Variants**: Horizontal, Vertical, Breadcrumb, Tabs
- **Responsive Design**: Mobile-friendly with hamburger menu
- **Dropdown Support**: Multi-level navigation menus
- **Theme Options**: Light, Dark, Accent themes
- **Logo Integration**: Support for logos and branding
- **Accessibility**: Full keyboard navigation and ARIA support
- **Sticky Navigation**: Optional sticky positioning

## Basic Usage

```svelte
<script>
	import { Navigation } from '$lib/components/Navigation';

	const items = [
		{ id: 'home', label: 'Home', href: '/' },
		{ id: 'about', label: 'About', href: '/about' },
		{ id: 'contact', label: 'Contact', href: '/contact' },
	];

	let activeItem = 'home';
</script>

<Navigation {items} {activeItem} on:itemClick={handleNavigation} />
```

## Props

| Prop           | Type           | Default        | Description              |
| -------------- | -------------- | -------------- | ------------------------ |
| `variant`      | `string`       | `'horizontal'` | Navigation layout        |
| `items`        | `array`        | `[]`           | Navigation items         |
| `activeItem`   | `string`       | `''`           | Currently active item ID |
| `logo`         | `string\|html` | `''`           | Logo image or HTML       |
| `logoAlt`      | `string`       | `'Logo'`       | Logo alt text            |
| `mobileToggle` | `boolean`      | `true`         | Enable mobile menu       |
| `sticky`       | `boolean`      | `false`        | Make navigation sticky   |
| `transparent`  | `boolean`      | `false`        | Transparent background   |
| `theme`        | `string`       | `'light'`      | Color theme              |
| `size`         | `string`       | `'md'`         | Navigation size          |
| `alignment`    | `string`       | `'center'`     | Content alignment        |

## Navigation Items Structure

```javascript
const items = [
	{
		id: 'unique-id',
		label: 'Display Text',
		href: '/path', // Optional: for links
		action: () => {}, // Optional: custom function
		children: [
			// Optional: for dropdowns
			{
				id: 'child-id',
				label: 'Child Item',
				href: '/child-path',
			},
		],
	},
];
```

## Variants

### Horizontal Navigation

```svelte
<Navigation variant="horizontal" items={navigationItems} logo="🚀" theme="light" />
```

### Vertical Sidebar

```svelte
<Navigation variant="vertical" items={sidebarItems} theme="dark" />
```

### Breadcrumb Navigation

```svelte
<Navigation variant="breadcrumb" items={breadcrumbPath} />
```

### Tab Navigation

```svelte
<Navigation variant="tabs" items={tabItems} activeItem={currentTab} />
```

## Themes

```svelte
<!-- Light Theme -->
<Navigation theme="light" {items} />

<!-- Dark Theme -->
<Navigation theme="dark" {items} />

<!-- Accent Theme -->
<Navigation theme="accent" {items} />
```

## With Logo

```svelte
<!-- Text/Emoji Logo -->
<Navigation logo="🌟" logoAlt="My Company" />

<!-- Image Logo -->
<Navigation logo="/path/to/logo.png" logoAlt="Company Logo" />

<!-- HTML Logo -->
<Navigation logo="<strong>MyBrand</strong>" />
```

## Dropdown Menus

```svelte
<script>
	const items = [
		{ id: 'home', label: 'Home', href: '/' },
		{
			id: 'products',
			label: 'Products',
			children: [
				{ id: 'web-apps', label: 'Web Applications', href: '/products/web' },
				{ id: 'mobile-apps', label: 'Mobile Apps', href: '/products/mobile' },
				{ id: 'desktop-apps', label: 'Desktop Apps', href: '/products/desktop' },
			],
		},
		{
			id: 'services',
			label: 'Services',
			children: [
				{ id: 'consulting', label: 'Consulting', href: '/services/consulting' },
				{ id: 'development', label: 'Development', href: '/services/development' },
			],
		},
	];
</script>

<Navigation {items} />
```

## Responsive Navigation

```svelte
<Navigation variant="horizontal" {items} mobileToggle={true} sticky={true} logo="📱" />
```

## Events

The Navigation component dispatches:

- `itemClick`: When any navigation item is clicked
- `navigate`: When a navigation link is activated

```svelte
<script>
	function handleItemClick(event) {
		const { item } = event.detail;
		console.log('Clicked item:', item);
	}

	function handleNavigate(event) {
		const { item } = event.detail;
		// Custom navigation logic
		if (item.href) {
			goto(item.href);
		}
	}
</script>

<Navigation {items} on:itemClick={handleItemClick} on:navigate={handleNavigate} />
```

## Practical Examples

### Main Website Navigation

```svelte
<script>
	const mainNav = [
		{ id: 'home', label: 'Home', href: '/' },
		{ id: 'about', label: 'About', href: '/about' },
		{
			id: 'services',
			label: 'Services',
			children: [
				{ id: 'web-dev', label: 'Web Development', href: '/services/web' },
				{ id: 'mobile-dev', label: 'Mobile Development', href: '/services/mobile' },
				{ id: 'consulting', label: 'Consulting', href: '/services/consulting' },
			],
		},
		{ id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
		{ id: 'contact', label: 'Contact', href: '/contact' },
	];
</script>

<Navigation
	variant="horizontal"
	items={mainNav}
	logo="/logo.png"
	sticky={true}
	theme="light"
	on:navigate={handleNavigation}
/>
```

### Admin Dashboard Sidebar

```svelte
<script>
	const adminNav = [
		{ id: 'dashboard', label: 'Dashboard', href: '/admin' },
		{ id: 'users', label: 'Users', href: '/admin/users' },
		{
			id: 'content',
			label: 'Content',
			children: [
				{ id: 'posts', label: 'Posts', href: '/admin/posts' },
				{ id: 'pages', label: 'Pages', href: '/admin/pages' },
				{ id: 'media', label: 'Media', href: '/admin/media' },
			],
		},
		{ id: 'settings', label: 'Settings', href: '/admin/settings' },
	];
</script>

<aside class="w-64">
	<Navigation variant="vertical" items={adminNav} theme="dark" activeItem={currentPage} />
</aside>
```

### Breadcrumb Trail

```svelte
<script>
	const breadcrumbs = [
		{ id: 'home', label: 'Home', href: '/' },
		{ id: 'products', label: 'Products', href: '/products' },
		{ id: 'category', label: 'Electronics', href: '/products/electronics' },
		{ id: 'item', label: 'Laptop', href: '/products/electronics/laptop' },
	];
</script>

<Navigation variant="breadcrumb" items={breadcrumbs} on:itemClick={handleBreadcrumbClick} />
```

### Tab Interface

```svelte
<script>
	const tabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'features', label: 'Features' },
		{ id: 'pricing', label: 'Pricing' },
		{ id: 'support', label: 'Support' },
	];

	let activeTab = 'overview';
</script>

<Navigation
	variant="tabs"
	items={tabs}
	activeItem={activeTab}
	on:itemClick={(e) => (activeTab = e.detail.item.id)}
/>

<!-- Tab Content -->
<div class="tab-content">
	{#if activeTab === 'overview'}
		<h2>Overview Content</h2>
	{:else if activeTab === 'features'}
		<h2>Features Content</h2>
	{:else if activeTab === 'pricing'}
		<h2>Pricing Content</h2>
	{:else if activeTab === 'support'}
		<h2>Support Content</h2>
	{/if}
</div>
```

## Accessibility

The Navigation component includes:

- Proper ARIA attributes (`role="navigation"`, `aria-label`)
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Focus management
- Screen reader support
- Mobile accessibility features

## Advanced Usage

### Custom Actions

```svelte
<script>
	const items = [
		{ id: 'home', label: 'Home', href: '/' },
		{
			id: 'search',
			label: 'Search',
			action: () => openSearchModal(),
		},
		{
			id: 'logout',
			label: 'Logout',
			action: () => handleLogout(),
		},
	];
</script>
```

### Dynamic Menu Items

```svelte
<script>
	import { userRole } from '$lib/stores/auth';

	$: menuItems = [
		{ id: 'home', label: 'Home', href: '/' },
		...($userRole === 'admin' ? [{ id: 'admin', label: 'Admin Panel', href: '/admin' }] : []),
		{ id: 'profile', label: 'Profile', href: '/profile' },
	];
</script>

<Navigation items={menuItems} />
```

## Customization

Override CSS custom properties:

```css
.navigation {
	--nav-background: #ffffff;
	--nav-text-color: #374151;
	--nav-hover-bg: #f3f4f6;
	--nav-active-color: #3b82f6;
	--nav-border-color: #e5e7eb;
	--nav-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

## Size Options

```svelte
<Navigation size="sm" {items} />
<!-- Small -->
<Navigation size="md" {items} />
<!-- Medium -->
<Navigation size="lg" {items} />
<!-- Large -->
```

## Alignment Options

```svelte
<Navigation alignment="left" {items} />
<Navigation alignment="center" {items} />
<Navigation alignment="right" {items} />
<Navigation alignment="space-between" {items} />
```
