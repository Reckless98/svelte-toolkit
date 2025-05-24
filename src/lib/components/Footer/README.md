# Footer Component

A comprehensive footer component with multiple layout variants, newsletter subscription, social links, and responsive design.

## Features

- **Multiple Variants**: Standard, simple, expanded, centered, and minimal layouts
- **Newsletter Integration**: Built-in email subscription functionality
- **Social Media Links**: Configurable social media icons and links
- **Responsive Design**: Mobile-first responsive layouts
- **Link Organization**: Grouped navigation links with categories
- **Dark Mode Support**: Full dark mode styling
- **Newsletter Management**: Email subscription with feedback
- **Flexible Branding**: Logo or text-based branding options
- **Accessibility**: Semantic HTML and ARIA compliance

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'standard'` | Footer layout variant: `'standard'`, `'simple'`, `'expanded'`, `'centered'`, `'minimal'` |
| `logo` | `string` | `''` | URL to logo image |
| `title` | `string` | `'Brand'` | Brand or company name |
| `description` | `string` | `'A brief description...'` | Company or site description |
| `links` | `array` | `[...]` | Grouped navigation links with categories |
| `socialLinks` | `array` | `[...]` | Social media links with icons |
| `newsletter` | `boolean` | `true` | Enable newsletter subscription |
| `copyright` | `string` | `'© 2025 Your Company...'` | Copyright text |
| `dark` | `boolean` | `false` | Enable dark mode styling |
| `bgColor` | `string` | `'bg-gray-100 text-gray-800'` | Custom background color classes |

## Usage Examples

### Basic Footer
```svelte
<script>
  import { Footer } from '$lib/components';
</script>

<Footer title="My Company" />
```

### Footer with Custom Links
```svelte
<script>
  import { Footer } from '$lib/components';
  
  const footerLinks = [
    {
      title: 'Company',
      items: [
        { text: 'About Us', href: '/about' },
        { text: 'Careers', href: '/careers' },
        { text: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Products',
      items: [
        { text: 'Features', href: '/features' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'API', href: '/api' }
      ]
    }
  ];
</script>

<Footer 
  title="My Company"
  description="Building amazing products for the web"
  links={footerLinks}
/>
```

### Simple Footer
```svelte
<Footer 
  variant="simple"
  title="Simple Site"
  newsletter={false}
/>
```

### Expanded Footer
```svelte
<Footer 
  variant="expanded"
  title="Enterprise Corp"
  description="Leading the industry with innovative solutions"
  links={footerLinks}
  newsletter={true}
/>
```

### Centered Footer
```svelte
<Footer 
  variant="centered"
  title="Creative Agency"
  description="We create beautiful digital experiences"
  links={footerLinks}
/>
```

### Minimal Footer
```svelte
<Footer 
  variant="minimal"
  copyright="© 2025 Minimal Site. All rights reserved."
/>
```

### Dark Mode Footer
```svelte
<Footer 
  title="Dark Theme App"
  dark={true}
  links={footerLinks}
/>
```

### Custom Social Links
```svelte
<script>
  const customSocial = [
    { 
      icon: '<svg>...</svg>', // Custom SVG
      href: 'https://custom-platform.com' 
    }
  ];
</script>

<Footer 
  title="Custom Social"
  socialLinks={customSocial}
/>
```

## Variants

### Standard
Comprehensive footer with brand section, organized links, newsletter, and social media.

### Simple
Streamlined single-row footer with essential links and social media.

### Expanded
Full-featured footer with prominent branding, newsletter, and extensive link organization.

### Centered
Center-aligned layout ideal for landing pages and marketing sites.

### Minimal
Clean, minimal footer with just copyright and social links.

## Link Structure

The `links` prop expects an array of link groups:

```javascript
const links = [
  {
    title: 'Category Name',
    items: [
      { text: 'Link Text', href: '/path' },
      { text: 'Another Link', href: '/another-path' }
    ]
  }
];
```

## Social Links Structure

The `socialLinks` prop expects an array of social media links:

```javascript
const socialLinks = [
  {
    icon: '<svg>...</svg>', // SVG icon as string
    href: 'https://social-platform.com'
  }
];
```

### Included Social Icons
- Twitter
- GitHub  
- LinkedIn
- Facebook
- Instagram
- YouTube

## Newsletter Functionality

The newsletter subscription includes:
- Email validation
- Visual feedback on submission
- Auto-reset after successful subscription
- Accessible form labels

```svelte
<Footer 
  newsletter={true}
  on:newsletter-subscribe={(event) => {
    console.log('Newsletter subscription:', event.detail.email);
    // Handle subscription logic
  }}
/>
```

## Events

The component dispatches events for newsletter interactions:

```svelte
<Footer 
  on:newsletter-subscribe={handleSubscribe}
  on:newsletter-error={handleError}
/>
```

## Accessibility Features

- **Semantic HTML**: Proper use of `<footer>`, `<nav>`, and heading hierarchy
- **ARIA Labels**: Screen reader friendly navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Alt Text**: Logo images include proper alt text
- **Link Purpose**: Clear link descriptions

## Customization

### CSS Custom Properties
```css
:root {
  --footer-bg: #f8f9fa;
  --footer-text: #333;
  --footer-link-hover: #007bff;
}
```

### Custom Styling
```svelte
<Footer 
  title="Custom Styled"
  class="custom-footer"
/>

<style>
  :global(.custom-footer) {
    /* Custom footer styles */
  }
</style>
```

### Theme Integration
```svelte
<Footer 
  bgColor="bg-primary-900 text-white"
  title="Themed Footer"
/>
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- IE11+ (with appropriate polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- Svelte for reactivity
- Tailwind CSS for styling  
- No external JavaScript dependencies

## Best Practices

1. **Content Organization**: Group related links logically
2. **Social Media**: Include only actively maintained accounts
3. **Newsletter**: Provide clear privacy information
4. **Copyright**: Keep copyright year current
5. **Links**: Ensure all links are functional and up-to-date
6. **Mobile**: Test on various screen sizes
7. **Accessibility**: Use semantic HTML and proper ARIA labels
