<!-- Layout Component Explorer -->
<script>
  import { HeroLayout, ParallaxLayout } from '$lib/layouts';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // Sample background images
  const mountainImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80';  const cityImage = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
  
  // Code examples - simplified to avoid template literal conflicts
  const heroExample = `import { HeroLayout } from 'svelte-ui-toolkit';

<HeroLayout 
  backgroundImage="/path/to/image.jpg"
  fullHeight={true}
  textAlignment="text-center"
>
  <h1 class="text-5xl font-bold mb-4">Hero Title</h1>
  <p class="text-xl mb-8">Hero subtitle with more information</p>
  <div class="flex justify-center gap-4">
    <button class="px-6 py-2 bg-accent text-white rounded-lg">Primary Action</button>
    <button class="px-6 py-2 bg-transparent border border-white text-white rounded-lg">Secondary Action</button>
  </div>
</HeroLayout>`;

  const parallaxExample = `import { ParallaxLayout } from 'svelte-ui-toolkit';

<ParallaxLayout
  backgroundImage="/path/to/image.jpg"
  speed={0.5}
  fullHeight={true}
>
  <div class="text-center">
    <h1 class="text-5xl font-bold mb-4">Parallax Section</h1>
    <p class="text-xl">Content that moves at a different speed than the background</p>
  </div>
</ParallaxLayout>`;

  const splitHeroExample = `<HeroLayout
  variant="split"
  backgroundImage="/path/to/image.jpg"
>
  <div slot="left">
    <h1 class="text-4xl font-bold mb-4">Left Content</h1>
    <p class="mb-6">Description text goes here</p>
    <button class="px-6 py-2 bg-accent text-white rounded-lg">Call to Action</button>
  </div>
  
  <div slot="right" class="p-8 bg-white/20 backdrop-blur-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Right Content</h2>
    <p>Secondary content, form, or image can go here</p>
  </div>
</HeroLayout>`;
</script>

<section>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Layout Components</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Pre-built layout components for common UI patterns, including hero sections, parallax effects, and more.
      </p>
    </div>
    
    <!-- Standard Hero Layout -->
    <ComponentPreview
      title="Hero Layout"
      description="Full-screen hero section with background image and content."
      codeSnippet={heroExample}
    >
      <div class="w-full h-96 relative overflow-hidden">
        <HeroLayout 
          backgroundImage={mountainImage}
          fullHeight={false}
          textAlignment="text-center"
        >
          <h1 class="text-4xl font-bold mb-4">Hero Title</h1>
          <p class="text-xl mb-6">Hero subtitle with more information</p>
          <div class="flex justify-center gap-4">
            <button class="px-6 py-2 bg-accent text-white rounded-lg">Primary Action</button>
            <button class="px-6 py-2 bg-transparent border border-white text-white rounded-lg">Secondary Action</button>
          </div>
        </HeroLayout>
      </div>
    </ComponentPreview>
    
    <!-- Parallax Layout -->
    <ComponentPreview
      title="Parallax Layout"
      description="Section with parallax scrolling effect."
      codeSnippet={parallaxExample}
    >
      <div class="w-full h-96 relative overflow-hidden">
        <ParallaxLayout
          backgroundImage={cityImage}
          speed={0.5}
          fullHeight={false}
        >
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Parallax Section</h1>
            <p class="text-xl">Content that moves at a different speed than the background</p>
          </div>
        </ParallaxLayout>
      </div>
    </ComponentPreview>
    
    <!-- Split Hero Layout -->
    <ComponentPreview
      title="Split Hero Layout"
      description="Hero layout with content split into two columns."
      codeSnippet={splitHeroExample}
    >
      <div class="w-full h-96 relative overflow-hidden">
        <HeroLayout
          variant="split"
          backgroundImage={mountainImage}
          fullHeight={false}
        >
          <div slot="left">
            <h1 class="text-4xl font-bold mb-4">Left Content</h1>
            <p class="mb-6">Description text goes here</p>
            <button class="px-6 py-2 bg-accent text-white rounded-lg">Call to Action</button>
          </div>
          
          <div slot="right" class="p-8 bg-white/20 backdrop-blur-md rounded-lg">
            <h2 class="text-2xl font-bold mb-4">Right Content</h2>
            <p>Secondary content, form, or image can go here</p>
          </div>
        </HeroLayout>
      </div>
    </ComponentPreview>
  </div>
</section>
