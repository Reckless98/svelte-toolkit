# 🎨 Svelte UI Toolkit

A comprehensive collection of modern, accessible, and customizable UI components built with SvelteKit and Tailwind CSS.

**Made with ❤️ by [Reckless98](https://github.com/Reckless98)**

![Svelte UI Toolkit](https://img.shields.io/badge/Svelte-UI%20Toolkit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

- **Modern Design**: Clean, contemporary components following current design trends
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design that works on all screen sizes
- **Customizable**: Highly configurable with extensive theming support
- **TypeScript Ready**: Full TypeScript support for better development experience
- **Performance Optimized**: Lightweight components with minimal bundle impact
- **Dark Mode**: Built-in dark mode support across all components
- **Enhanced Animations**: Beautiful, creative animations and micro-interactions
- **Particle Effects**: Interactive particle backgrounds and visual effects
- **Glass Morphism**: Modern frosted glass effects and transparency

## 📦 Components

### Form Components
- **[Button](src/lib/components/Button/README.md)** - Versatile button component with multiple variants, sizes, and animations
- **[Input](src/lib/components/Input/README.md)** - Feature-rich input component with validation, icons, and multiple variants

### Navigation Components
- **[Header](src/lib/components/Header/README.md)** - Responsive header with navigation, search, and sticky behavior
- **[Footer](src/lib/components/Footer/README.md)** - Comprehensive footer with links, social media, and newsletter signup
- **[Navigation](src/lib/components/Navigation/README.md)** - Flexible navigation component with horizontal, vertical, breadcrumb, and tab variants

### Display Components
- **[Card](src/lib/components/Card/README.md)** - Flexible card component with multiple variants and interactive features
- **[Modal](src/lib/components/Modal/README.md)** - Accessible modal dialogs with animations and custom content

### Layout Components
- **[HeroLayout & ParallaxLayout](src/lib/layouts/README.md)** - Pre-built layout components for hero sections and parallax effects

### Animation Components
- **ScrollReveal** - Animate elements when they enter the viewport
- **Parallax** - Create depth with parallax scrolling effects

## 🛠 Installation

```bash
npm install svelte-ui-toolkit
```

## 🎯 Quick Start

```svelte
<script>
  import { Button, Card, Input, Modal } from 'svelte-ui-toolkit';
  
  let showModal = false;
  let formData = { name: '', email: '' };
</script>

<Card title="Contact Form" variant="elevated">
  <form class="space-y-4">
    <Input 
      label="Name"
      bind:value={formData.name}
      placeholder="Enter your name"
      required
    />
    <Input 
      type="email"
      label="Email"
      bind:value={formData.email}
      placeholder="Enter your email"
      required
    />
    <Button 
      variant="primary"
      on:click={() => showModal = true}
    >
      Submit
    </Button>
  </form>
</Card>

<Modal bind:show={showModal} title="Thank You!">
  <p>Your form has been submitted successfully.</p>
</Modal>
```

## 🎨 Theming

### CSS Custom Properties

The toolkit uses CSS custom properties for easy theming:

```css
:root {
  /* Primary Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-accent: #10b981;
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-900: #111827;
  
  /* Component Specific */
  --button-border-radius: 0.5rem;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --modal-backdrop: rgba(0, 0, 0, 0.5);
}
```

### Dark Mode

All components automatically support dark mode through CSS classes:

```svelte
<div class="dark">
  <!-- All components will use dark theme -->
  <Button variant="primary">Dark Mode Button</Button>
</div>
```

## 🔧 Configuration

### Tailwind CSS Setup

Add the following to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/svelte-ui-toolkit/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      }
    }
  }
}
```

## 📱 Component Explorer

This project includes a comprehensive component explorer accessible at `/explorer`. The explorer provides:

- **Live Examples**: Interactive examples of all components
- **Code Snippets**: Copy-ready code for each component variant
- **Props Documentation**: Detailed prop descriptions and types
- **Accessibility Testing**: Screen reader and keyboard navigation testing
- **Theme Toggle**: Test components in light and dark modes

To access the explorer:

```bash
npm run dev
# Navigate to http://localhost:5173/explorer
```

## 🧪 Testing

The components are thoroughly tested with:

- **Unit Tests**: Component logic and prop handling
- **Integration Tests**: Component interactions and data flow
- **Accessibility Tests**: WCAG compliance and screen reader compatibility
- **Visual Regression Tests**: UI consistency across browsers

Run tests:

```bash
npm run test
npm run test:accessibility
npm run test:visual
```

## 🏗 Development

### Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.svelte
│   │   │   ├── index.js
│   │   │   └── README.md
│   │   └── [other components]/
│   ├── layouts/
│   │   ├── HeroLayout.svelte
│   │   └── ParallaxLayout.svelte
│   └── animations/
│       ├── ScrollReveal.svelte
│       └── Parallax.svelte
└── routes/
    └── explorer/
        ├── +page.svelte
        ├── Sidebar.svelte
        └── components/
            └── [component explorers]/
```

### Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-component`
3. **Follow conventions**: Use the existing component structure
4. **Add documentation**: Include README.md and JSDoc comments
5. **Add tests**: Write comprehensive tests for new features
6. **Submit a pull request**: Include a detailed description

### Component Creation Guidelines

When creating new components:

1. **Use TypeScript**: Provide proper type definitions
2. **Follow naming conventions**: PascalCase for components, kebab-case for files
3. **Include README**: Document props, examples, and accessibility features
4. **Add to explorer**: Create an explorer component for testing
5. **Implement accessibility**: Include ARIA labels, keyboard navigation, and focus management
6. **Support dark mode**: Use CSS custom properties and dark mode classes

## 📖 Documentation

- **[Component Guides](docs/components/)** - Detailed component documentation
- **[Design System](docs/design-system.md)** - Design principles and guidelines
- **[Accessibility](docs/accessibility.md)** - Accessibility best practices
- **[Theming Guide](docs/theming.md)** - Comprehensive theming documentation
- **[Migration Guide](docs/migration.md)** - Upgrading from previous versions

## 🤝 Community

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community questions and showcase
- **Discord**: Real-time community support
- **Twitter**: Follow [@svelte-ui-toolkit](https://twitter.com/svelte-ui-toolkit) for updates

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Svelte Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Community Contributors**: For feedback, bug reports, and contributions
- **Design Inspiration**: From leading design systems and UI libraries

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release with core components
- Component explorer interface
- Comprehensive documentation
- Accessibility compliance
- Dark mode support

### Roadmap
- [ ] Additional form components (Select, Checkbox, Radio)
- [ ] Data display components (Table, List, Badge)
- [ ] Feedback components (Toast, Alert, Progress)
- [ ] Advanced layout components (Grid, Flex utilities)
- [ ] Chart and visualization components
- [ ] Animation library expansion
