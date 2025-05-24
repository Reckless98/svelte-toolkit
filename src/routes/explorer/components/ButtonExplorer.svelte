<!-- Button Component Explorer -->
<script>
  import { Button } from '$lib/components/Button';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // Button variants
  const variants = [
    { name: 'Primary', value: 'primary' },
    { name: 'Secondary', value: 'secondary' },
    { name: 'Accent', value: 'accent' },
    { name: 'Ghost', value: 'ghost' },
    { name: '3D', value: '3d' },
    { name: 'Gradient', value: 'gradient' },
    { name: 'Glass', value: 'glass' }
  ];
  
  // Button sizes
  const sizes = [
    { name: 'Small', value: 'sm' },
    { name: 'Medium', value: 'md' },
    { name: 'Large', value: 'lg' },
    { name: 'Extra Large', value: 'xl' }
  ];
  
  // Button animations
  const animations = [
    { name: 'None', value: 'none' },
    { name: 'Ripple', value: 'ripple' },
    { name: 'Pulse', value: 'pulse' },
    { name: 'Bounce', value: 'bounce' }
  ];
  
  // Button states
  const states = [
    { name: 'Normal', loading: false, disabled: false },
    { name: 'Loading', loading: true, disabled: false },
    { name: 'Disabled', loading: false, disabled: true }  ];
    
  // Code examples
  const basicExample = '<Button>Click Me</Button>';
  const variantsExample = '<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="accent">Accent</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="3d">3D</Button>\n<Button variant="gradient">Gradient</Button>\n<Button variant="glass">Glass</Button>';
  const sizesExample = '<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n<Button size="xl">Extra Large</Button>';
  const animationsExample = '<Button animation="none">No Animation</Button>\n<Button animation="ripple">Ripple</Button>\n<Button animation="pulse">Pulse</Button>\n<Button animation="bounce">Bounce</Button>';
  const statesExample = '<Button>Normal</Button>\n<Button loading={true}>Loading</Button>\n<Button disabled={true}>Disabled</Button>';
</script>

<section>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Button Component</h1>
      <p class="text-gray-600 dark:text-gray-400">
        A versatile button component with multiple variants, sizes, and animations.
      </p>
    </div>
    
    <!-- Basic Example -->
    <ComponentPreview
      title="Basic Button"
      description="The default button component."
      codeSnippet={basicExample}
    >
      <div class="flex space-x-4">
        <Button>Click Me</Button>
      </div>
    </ComponentPreview>
    
    <!-- Variants -->
    <ComponentPreview
      title="Button Variants"
      description="Different visual styles for the button."
      codeSnippet={variantsExample}
    >
      <div class="flex flex-wrap gap-4">
        {#each variants as variant}
          <Button variant={variant.value}>{variant.name}</Button>
        {/each}
      </div>
    </ComponentPreview>
    
    <!-- Sizes -->
    <ComponentPreview
      title="Button Sizes"
      description="Buttons in different sizes."
      codeSnippet={sizesExample}
    >
      <div class="flex flex-wrap items-center gap-4">
        {#each sizes as size}
          <Button size={size.value} variant="primary">{size.name}</Button>
        {/each}
      </div>
    </ComponentPreview>
    
    <!-- Animations -->
    <ComponentPreview
      title="Button Animations"
      description="Various interactive animations for buttons."
      codeSnippet={animationsExample}
    >
      <div class="flex flex-wrap gap-4">
        {#each animations as animation}
          <Button animation={animation.value} variant="primary">{animation.name}</Button>
        {/each}
      </div>
    </ComponentPreview>
    
    <!-- States -->
    <ComponentPreview
      title="Button States"
      description="Different states a button can have."
      codeSnippet={statesExample}
    >
      <div class="flex flex-wrap gap-4">
        {#each states as state}
          <Button 
            loading={state.loading} 
            disabled={state.disabled} 
            variant="primary"
          >
            {state.name}
          </Button>
        {/each}
      </div>
    </ComponentPreview>
    
    <!-- With Icons -->    <ComponentPreview
      title="Buttons with Icons"
      description="Buttons that include icons."
      codeSnippet={'<Button icon="<svg>...</svg>">With Icon</Button>'}
    >
      <div class="flex flex-wrap gap-4">
        <Button 
          icon="<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z' clip-rule='evenodd' /></svg>"
          variant="primary"
        >
          Add Item
        </Button>
        
        <Button 
          icon="<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clip-rule='evenodd' /></svg>"
          variant="secondary"
          iconPosition="right"
        >
          Download
        </Button>
      </div>
    </ComponentPreview>
  </div>
</section>
