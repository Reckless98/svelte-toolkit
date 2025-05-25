<script lang="ts">
  import { Divider } from '$lib/components/Divider';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple horizontal divider to separate content',
      codeSnippet: `<Divider />`
    },
    {
      title: 'With Label',
      description: 'Divider with centered text label',
      codeSnippet: `<Divider label="Section Break" />`
    },
    {
      title: 'Vertical Divider',
      description: 'Vertical divider for inline content separation',
      codeSnippet: `<Divider orientation="vertical" />`
    },
    {
      title: 'Custom Colors',
      description: 'Divider with custom colors and gradients',
      codeSnippet: `<Divider variant="gradient" />`
    },
    {
      title: 'Dashed Style',
      description: 'Divider with dashed line style',
      codeSnippet: `<Divider variant="dashed" />`
    },
    {
      title: 'Different Sizes',
      description: 'Divider with different thickness sizes',
      codeSnippet: `<Divider size="lg" />`
    }
  ];

  const variants = ['solid', 'dashed', 'dotted', 'gradient', 'double', 'thick'] as const;
  const orientations = ['horizontal', 'vertical'];
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Divider Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A flexible divider component for creating visual separation between content sections with support for labels, icons, and multiple visual styles.
    </p>
  </div>

  <!-- Basic Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Examples</h2>
    
    {#each examples as example, index}
      <ComponentPreview
        title={example.title}
        description={example.description}
        codeSnippet={example.codeSnippet}
      >
        <div class="p-8">
          {#if index === 0}
            <div class="space-y-4">
              <p class="text-gray-600">Content above the divider</p>
              <Divider />
              <p class="text-gray-600">Content below the divider</p>
            </div>
          {:else if index === 1}
            <div class="space-y-4">
              <p class="text-gray-600">First section content</p>
              <Divider label="Section Break" />
              <p class="text-gray-600">Second section content</p>
            </div>
          {:else if index === 2}
            <div class="flex items-center gap-4 h-20">
              <span class="text-gray-600">Left content</span>
              <Divider orientation="vertical" />
              <span class="text-gray-600">Right content</span>
            </div>
          {:else if index === 3}
            <div class="space-y-4">
              <p class="text-gray-600">Content with gradient divider</p>
              <Divider variant="gradient" />
              <p class="text-gray-600">More content below</p>
            </div>
          {:else if index === 4}
            <div class="space-y-4">
              <p class="text-gray-600">Content with dashed divider</p>
              <Divider variant="dashed" />
              <p class="text-gray-600">More content below</p>
            </div>
          {:else if index === 5}
            <div class="space-y-4">
              <p class="text-gray-600">Content with larger divider</p>
              <Divider size="lg" />
              <p class="text-gray-600">More content below</p>
            </div>
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Divider Variants"
      description="Different visual styles for various design contexts"
      codeSnippet={`<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />
<Divider variant="gradient" />
<Divider variant="double" />
<Divider variant="thick" />`}
    >
      <div class="p-8 space-y-6">
        {#each variants as variant}
          <div class="space-y-2">
            <h4 class="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">{variant}</h4>
            <Divider {variant} />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Orientations -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Orientations</h2>
    
    <ComponentPreview
      title="Horizontal vs Vertical"
      description="Dividers can be oriented horizontally or vertically"
      codeSnippet={`<!-- Horizontal (default) -->
<Divider orientation="horizontal" />

<!-- Vertical -->
<Divider orientation="vertical" />`}
    >
      <div class="p-8">
        <div class="space-y-8">
          <div>
            <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Horizontal</h4>
            <div class="space-y-4">
              <p class="text-gray-600">Content above</p>
              <Divider orientation="horizontal" />
              <p class="text-gray-600">Content below</p>
            </div>
          </div>
          
          <div>
            <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Vertical</h4>
            <div class="flex items-center gap-4 h-16">
              <span class="text-gray-600">Left content</span>
              <Divider orientation="vertical" />
              <span class="text-gray-600">Center content</span>
              <Divider orientation="vertical" />
              <span class="text-gray-600">Right content</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  </section>

  <!-- Labels and Icons -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Labels and Icons</h2>
    
    <ComponentPreview
      title="Text Labels"
      description="Add text labels to dividers for better content organization"
      codeSnippet={`<Divider label="OR" />
<Divider label="Section 2" />
<Divider label="More Content Below" />`}
    >
      <div class="p-8 space-y-8">
        <div class="space-y-4">
          <p class="text-gray-600">Sign up with email</p>
          <Divider label="OR" />
          <p class="text-gray-600">Sign up with social media</p>
        </div>
        
        <div class="space-y-4">
          <p class="text-gray-600">Introduction content</p>
          <Divider label="Section 2" />
          <p class="text-gray-600">Main content</p>
        </div>
      </div>
    </ComponentPreview>
    
    <ComponentPreview
      title="Different Sizes"
      description="Control the thickness of the divider"
      codeSnippet={`<Divider size="sm" />
<Divider size="md" />
<Divider size="lg" />`}
    >
      <div class="p-8 space-y-8">
        <div class="space-y-4">
          <p class="text-gray-600">Small divider</p>
          <Divider size="sm" />
          <p class="text-gray-600">Medium divider (default)</p>
          <Divider size="md" />
          <p class="text-gray-600">Large divider</p>
          <Divider size="lg" />
          <p class="text-gray-600">End of content</p>
        </div>
      </div>
    </ComponentPreview>
  </section>

  <!-- Custom Styling -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Custom Styling</h2>
    
    <ComponentPreview
      title="Custom Colors and Spacing"
      description="Customize divider appearance with colors and spacing"
      codeSnippet={`<Divider color="blue" />
<Divider color="green" margin="2rem" />
<Divider variant="gradient" colors={['#ff6b6b', '#4ecdc4']} />`}
    >
      <div class="p-8 space-y-8">
        <div class="space-y-4">
          <p class="text-gray-600">Content with blue divider</p>
          <Divider color="blue" />
          <p class="text-gray-600">More content</p>
        </div>
        
        <div class="space-y-8">
          <p class="text-gray-600">Content with extra margin</p>
          <Divider color="green" margin="2rem" />
          <p class="text-gray-600">More content with larger spacing</p>
        </div>
      </div>
    </ComponentPreview>
  </section>

  <!-- Real-world Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Real-world Examples</h2>
    
    <ComponentPreview
      title="Form Separator"
      description="Using dividers in forms and authentication flows"
      codeSnippet={`<div class="space-y-4">
  <input type="email" placeholder="Email" class="w-full p-2 border rounded" />
  <input type="password" placeholder="Password" class="w-full p-2 border rounded" />
  <button class="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
  
  <Divider label="OR" />
  
  <button class="w-full bg-gray-100 text-gray-700 p-2 rounded">Continue with Google</button>
</div>`}
    >
      <div class="p-8 flex justify-center">
        <div class="w-80 space-y-4">
          <input type="email" placeholder="Email" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
          <input type="password" placeholder="Password" class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
          <button class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign In</button>
          
          <Divider label="OR" />
          
          <button class="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Continue with Google</button>
        </div>
      </div>
    </ComponentPreview>
    
    <ComponentPreview
      title="Content Sections"
      description="Organizing content into clear sections"
      codeSnippet={`<article class="space-y-6">
  <section>
    <h3>Introduction</h3>
    <p>Article introduction content...</p>
  </section>
  
  <Divider label="Main Content" />
  
  <section>
    <h3>Chapter 1</h3>
    <p>First chapter content...</p>
  </section>
  
  <Divider icon="📝" />
  
  <section>
  <Divider variant="dashed" />
    <p>Article conclusion...</p>
  </section>
</article>`}
    >
      <div class="p-8">
        <article class="space-y-6 max-w-2xl">
          <section>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Introduction</h3>
            <p class="text-gray-600 dark:text-gray-300">This is an example of how dividers can be used to organize content into clear, readable sections within articles or documentation.</p>
          </section>
          
          <Divider label="Main Content" />
          
          <section>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Chapter 1</h3>
            <p class="text-gray-600 dark:text-gray-300">The main content of your article goes here. Dividers help break up long content into digestible sections.</p>
          </section>
          
          <Divider icon="📝" />
          
          <section>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Conclusion</h3>
            <p class="text-gray-600 dark:text-gray-300">The conclusion wraps up the article content and provides final thoughts or calls to action.</p>
          </section>
        </article>
      </div>
    </ComponentPreview>
  </section>
</div>
