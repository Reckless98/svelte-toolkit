# Card Component

A versatile card component with multiple variants, hover effects, and flexible content layouts.

## Features

- **Multiple Variants**: Default, Elevated, Outlined, Filled, Glass, Gradient
- **Hover Effects**: Transform, Shadow, Glow, and Scale animations
- **Flexible Layout**: Header, body, footer sections with optional elements
- **Image Support**: Hero images with various aspect ratios
- **Interactive States**: Clickable cards with proper accessibility
- **Responsive Design**: Mobile-optimized layouts
- **Shadow Levels**: Multiple elevation options

## Basic Usage

```svelte
<script>
  import { Card } from '$lib/components/Card';
</script>

<Card title="Card Title">
  <p>Card content goes here</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Card style variant |
| `title` | `string` | `''` | Card title |
| `subtitle` | `string` | `''` | Card subtitle |
| `image` | `string` | `''` | Header image URL |
| `imageAlt` | `string` | `''` | Image alt text |
| `imageAspect` | `string` | `'aspect-video'` | Image aspect ratio |
| `href` | `string` | `''` | Make card clickable |
| `target` | `string` | `'_self'` | Link target |
| `clickable` | `boolean` | `false` | Enable click interactions |
| `hover` | `string` | `'none'` | Hover effect type |
| `shadow` | `string` | `'md'` | Shadow level |
| `padding` | `string` | `'p-6'` | Card padding |
| `rounded` | `string` | `'rounded-lg'` | Border radius |
| `width` | `string` | `''` | Custom width class |
| `height` | `string` | `''` | Custom height class |

## Variants

### Default Card
```svelte
<Card variant="default" title="Default Card">
  <p>Basic card with minimal styling</p>
</Card>
```

### Elevated Card
```svelte
<Card variant="elevated" title="Elevated Card">
  <p>Card with prominent shadow</p>
</Card>
```

### Outlined Card
```svelte
<Card variant="outlined" title="Outlined Card">
  <p>Card with border and no shadow</p>
</Card>
```

### Filled Card
```svelte
<Card variant="filled" title="Filled Card">
  <p>Card with background color</p>
</Card>
```

### Glass Card
```svelte
<Card variant="glass" title="Glass Card">
  <p>Card with glassmorphism effect</p>
</Card>
```

### Gradient Card
```svelte
<Card variant="gradient" title="Gradient Card">
  <p>Card with gradient background</p>
</Card>
```

## With Images

```svelte
<Card 
  title="Image Card"
  image="/path/to/image.jpg"
  imageAlt="Card image"
  imageAspect="aspect-square"
>
  <p>Card with header image</p>
</Card>
```

## Hover Effects

```svelte
<Card hover="transform" title="Transform Effect">
  <p>Hovers with transform</p>
</Card>

<Card hover="shadow" title="Shadow Effect">
  <p>Hovers with shadow change</p>
</Card>

<Card hover="glow" title="Glow Effect">
  <p>Hovers with glow effect</p>
</Card>

<Card hover="scale" title="Scale Effect">
  <p>Hovers with scale animation</p>
</Card>
```

## Clickable Cards

```svelte
<Card 
  clickable={true}
  title="Clickable Card"
  on:click={handleCardClick}
>
  <p>This card is clickable</p>
</Card>

<!-- As a link -->
<Card 
  href="/article/123"
  title="Article Card"
>
  <p>This card links to an article</p>
</Card>
```

## Shadow Levels

```svelte
<Card shadow="none" title="No Shadow">Content</Card>
<Card shadow="sm" title="Small Shadow">Content</Card>
<Card shadow="md" title="Medium Shadow">Content</Card>
<Card shadow="lg" title="Large Shadow">Content</Card>
<Card shadow="xl" title="Extra Large Shadow">Content</Card>
```

## Events

The Card component dispatches:

- `click`: When the card is clicked (if clickable)
- `keydown`: When a key is pressed on the card
- `mouseenter`: When mouse enters the card
- `mouseleave`: When mouse leaves the card

```svelte
<Card
  clickable={true}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  Interactive card content
</Card>
```

## Slot Structure

The Card component supports multiple slots:

```svelte
<Card>
  <svelte:fragment slot="header">
    <!-- Custom header content -->
    <h2>Custom Header</h2>
  </svelte:fragment>
  
  <!-- Default slot - main content -->
  <p>Main card content</p>
  
  <svelte:fragment slot="footer">
    <!-- Footer content -->
    <div class="flex justify-between">
      <span>Footer content</span>
      <button>Action</button>
    </div>
  </svelte:fragment>
</Card>
```

## Practical Examples

### Product Card
```svelte
<Card 
  variant="elevated"
  hover="transform"
  image="/product-image.jpg"
  imageAlt="Product image"
  clickable={true}
  on:click={() => goto(`/product/${product.id}`)}
>
  <svelte:fragment slot="header">
    <div class="flex justify-between items-start">
      <h3 class="font-semibold">{product.name}</h3>
      <span class="text-lg font-bold text-green-600">${product.price}</span>
    </div>
  </svelte:fragment>
  
  <p class="text-gray-600">{product.description}</p>
  
  <svelte:fragment slot="footer">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <span class="text-yellow-400">★★★★★</span>
        <span class="ml-1 text-sm text-gray-500">(123)</span>
      </div>
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </svelte:fragment>
</Card>
```

### Article Card
```svelte
<Card 
  variant="default"
  hover="shadow"
  image={article.featuredImage}
  imageAlt={article.title}
  href="/article/{article.slug}"
>
  <svelte:fragment slot="header">
    <div class="space-y-2">
      <span class="text-sm text-blue-600 font-medium">{article.category}</span>
      <h3 class="text-xl font-semibold">{article.title}</h3>
    </div>
  </svelte:fragment>
  
  <p class="text-gray-600">{article.excerpt}</p>
  
  <svelte:fragment slot="footer">
    <div class="flex items-center justify-between text-sm text-gray-500">
      <div class="flex items-center">
        <img src={article.author.avatar} alt="" class="w-6 h-6 rounded-full mr-2">
        <span>{article.author.name}</span>
      </div>
      <time>{formatDate(article.publishedAt)}</time>
    </div>
  </svelte:fragment>
</Card>
```

### Feature Card
```svelte
<Card 
  variant="glass"
  hover="glow"
  class="text-center"
>
  <svelte:fragment slot="header">
    <div class="text-4xl mb-4">{feature.icon}</div>
    <h3 class="text-xl font-semibold">{feature.title}</h3>
  </svelte:fragment>
  
  <p class="text-gray-600">{feature.description}</p>
  
  <svelte:fragment slot="footer">
    <a href={feature.learnMoreUrl} class="text-blue-600 hover:underline">
      Learn More →
    </a>
  </svelte:fragment>
</Card>
```

### Testimonial Card
```svelte
<Card variant="outlined" class="text-center">
  <svelte:fragment slot="header">
    <img 
      src={testimonial.avatar} 
      alt={testimonial.name}
      class="w-16 h-16 rounded-full mx-auto mb-4"
    >
    <div class="text-yellow-400 text-xl mb-4">
      ★★★★★
    </div>
  </svelte:fragment>
  
  <blockquote class="text-lg italic text-gray-700">
    "{testimonial.quote}"
  </blockquote>
  
  <svelte:fragment slot="footer">
    <div class="text-center">
      <div class="font-semibold">{testimonial.name}</div>
      <div class="text-sm text-gray-500">{testimonial.role}</div>
      <div class="text-sm text-gray-500">{testimonial.company}</div>
    </div>
  </svelte:fragment>
</Card>
```

### Stats Card
```svelte
<Card variant="gradient" class="text-white text-center">
  <svelte:fragment slot="header">
    <div class="text-3xl font-bold">{stat.value}</div>
    <div class="text-lg opacity-90">{stat.label}</div>
  </svelte:fragment>
  
  <div class="flex items-center justify-center">
    <span class="text-sm opacity-75">
      {stat.change > 0 ? '↗' : '↘'} {Math.abs(stat.change)}% from last month
    </span>
  </div>
</Card>
```

## Grid Layouts

```svelte
<!-- Card Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each items as item}
    <Card 
      title={item.title}
      image={item.image}
      hover="transform"
      clickable={true}
      on:click={() => handleItemClick(item)}
    >
      <p>{item.description}</p>
    </Card>
  {/each}
</div>

<!-- Masonry-style Layout -->
<div class="columns-1 md:columns-2 lg:columns-3 gap-6">
  {#each items as item}
    <Card 
      title={item.title}
      class="break-inside-avoid mb-6"
    >
      <p>{item.content}</p>
    </Card>
  {/each}
</div>
```

## Accessibility

The Card component includes:

- Proper semantic HTML structure
- Keyboard navigation support (when clickable)
- ARIA attributes for screen readers
- Focus management
- Color contrast compliance

## Customization

Override CSS custom properties:

```css
.card {
  --card-background: white;
  --card-border-color: #e5e7eb;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --card-radius: 0.5rem;
  --card-hover-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Responsive Design

```svelte
<!-- Responsive card sizing -->
<Card 
  class="w-full sm:w-80 md:w-96"
  title="Responsive Card"
>
  Content that adapts to screen size
</Card>

<!-- Different layouts on different screens -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {#each cards as card}
    <Card title={card.title}>
      {card.content}
    </Card>
  {/each}
</div>
```
