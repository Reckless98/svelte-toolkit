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
  const variants = ['solid', 'dashed', 'dotted', 'gradient', 'double'] as const;
  const orientations = ['horizontal', 'vertical'];

  // Comprehensive code examples for each section
  const basicsAndOrientationsExample = `<!-- Basic Divider Usage & Orientations -->
<Divider />
<Divider orientation="vertical" />
<Divider label="Section Break" />

<!-- Content separation examples -->
<div class="space-y-4">
  <p>Content above divider</p>
  <Divider />
  <p>Content below divider</p>
</div>

<!-- Vertical dividers for inline content -->
<div class="flex items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`;

  const variantsAndStylingExample = `<!-- All Variants with Sizes and Styling -->
<Divider variant="solid" size="sm" />
<Divider variant="dashed" size="md" />
<Divider variant="dotted" size="lg" />
<Divider variant="gradient" />
<Divider variant="double" />

<!-- Custom colors and spacing -->
<Divider color="blue" />
<Divider color="green" spacing="my-8" />
<Divider variant="gradient" color="purple" />`;

  const labelsAndFeaturesExample = `<!-- Labels and Enhanced Features -->
<Divider label="OR" />
<Divider label="Section 2" />
<Divider label="More Content Below" />

<!-- Combined with variants -->
<Divider variant="dashed" label="Chapter 1" />
<Divider variant="gradient" label="Premium Content" />`;

  const realWorldExample = `<!-- Real-World Applications -->
<!-- Form separator -->
<input type="email" placeholder="Email" />
<input type="password" placeholder="Password" />
<button>Sign In</button>

<Divider label="OR" />

<button>Continue with Google</button>

<!-- Content sections -->
<article>
  <section>
    <h3>Introduction</h3>
    <p>Content...</p>
  </section>
  
  <Divider label="Main Content" />
  
  <section>
    <h3>Chapter 1</h3>
    <p>Content...</p>
  </section>
</article>`;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Divider Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A flexible divider component for creating visual separation between content sections with support for labels, icons, and multiple visual styles.
    </p>
  </div>
  <!-- Smart Grouped Previews -->  <ComponentPreview
    title="Divider Basics & Orientations"
    description="Essential divider usage with horizontal and vertical orientations"
    complexity="Basic"
    codeSnippet={basicsAndOrientationsExample}
  >
    <div class="p-8 space-y-8">
      <!-- Basic horizontal divider -->
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-300">Content above the divider</p>
        <Divider />
        <p class="text-gray-600 dark:text-gray-300">Content below the divider</p>
      </div>
      
      <!-- Divider with label -->
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-300">First section content</p>
        <Divider label="Section Break" />
        <p class="text-gray-600 dark:text-gray-300">Second section content</p>
      </div>
      
      <!-- Vertical dividers -->
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Vertical Orientation</h4>
        <div class="flex items-center gap-4 h-16">
          <span class="text-gray-600 dark:text-gray-300">Left content</span>
          <Divider orientation="vertical" />
          <span class="text-gray-600 dark:text-gray-300">Center content</span>
          <Divider orientation="vertical" />
          <span class="text-gray-600 dark:text-gray-300">Right content</span>
        </div>
      </div>
    </div>
  </ComponentPreview>
  <ComponentPreview
    title="Variants, Sizes & Styling"
    description="Visual styles, thickness options, colors, and custom styling"
    complexity="Intermediate"
    codeSnippet={variantsAndStylingExample}
  >
    <div class="p-8 space-y-8">
      <!-- All variants showcase -->
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Visual Variants</h4>
        <div class="space-y-6">
          {#each variants as variant}
            <div class="space-y-2">
              <h5 class="text-xs font-medium capitalize text-gray-600 dark:text-gray-400">{variant}</h5>
              <Divider {variant} />
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Size variations -->
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Size Options</h4>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Small</p>
            <Divider size="sm" />
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Medium (default)</p>
            <Divider size="md" />
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Large</p>
            <Divider size="lg" />
          </div>
        </div>
      </div>
      
      <!-- Custom colors -->
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Custom Colors</h4>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Blue</p>
            <Divider color="blue" />
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Green with spacing</p>
            <Divider color="green" spacing="my-8" />
          </div>
        </div>
      </div>
    </div>
  </ComponentPreview>
  <ComponentPreview
    title="Labels & Text Features"
    description="Text labels, combined with variants, and enhanced labeling features"
    complexity="Intermediate"
    codeSnippet={labelsAndFeaturesExample}
  >
    <div class="p-8 space-y-8">
      <!-- Basic labels -->
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">Sign up with email</p>
          <Divider label="OR" />
          <p class="text-gray-600 dark:text-gray-300">Sign up with social media</p>
        </div>
        
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">Introduction content</p>
          <Divider label="Section 2" />
          <p class="text-gray-600 dark:text-gray-300">Main content</p>
        </div>
      </div>
      
      <!-- Labels with variants -->
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Combined with Variants</h4>
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-300">Chapter introduction</p>
            <Divider variant="dashed" label="Chapter 1" />
            <p class="text-gray-600 dark:text-gray-300">Chapter content</p>
          </div>
          
          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-300">Free content above</p>
            <Divider variant="gradient" label="Premium Content" />
            <p class="text-gray-600 dark:text-gray-300">Premium content below</p>
          </div>
        </div>
      </div>
    </div>
  </ComponentPreview>
  <ComponentPreview
    title="Real-World Applications"
    description="Practical examples: form separators, content sections, and UI patterns"
    complexity="Advanced"
    codeSnippet={realWorldExample}
  >
    <div class="p-8 space-y-12">
      <!-- Form separator example -->
      <div>
        <h4 class="text-sm font-medium mb-6 text-gray-700 dark:text-gray-300">Authentication Form</h4>
        <div class="max-w-sm mx-auto space-y-4">
          <input type="email" placeholder="Email" class="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
          <input type="password" placeholder="Password" class="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
          <button class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">Sign In</button>
          
          <Divider label="OR" />
          
          <button class="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Continue with Google</button>
        </div>
      </div>
      
      <!-- Content sections example -->
      <div>
        <h4 class="text-sm font-medium mb-6 text-gray-700 dark:text-gray-300">Article Content Organization</h4>
        <article class="space-y-6 max-w-2xl mx-auto">
          <section>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Introduction</h3>
            <p class="text-gray-600 dark:text-gray-300">This demonstrates how dividers organize content into clear, readable sections within articles or documentation.</p>
          </section>
          
          <Divider label="Main Content" />
          
          <section>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Chapter 1</h3>
            <p class="text-gray-600 dark:text-gray-300">The main content goes here. Dividers help break up long content into digestible sections for better readability.</p>
          </section>
          
          <Divider variant="dashed" />
          
          <section>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Conclusion</h3>
            <p class="text-gray-600 dark:text-gray-300">The conclusion wraps up the content and provides final thoughts or calls to action.</p>
          </section>
        </article>
      </div>
    </div>
  </ComponentPreview>
</div>
