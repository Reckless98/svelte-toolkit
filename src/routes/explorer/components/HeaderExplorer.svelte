<!-- Header Component Explorer -->
<script>
  import { Header } from '$lib/components/Header';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // Header variants
  const variants = [
    { name: 'Standard', value: 'standard' },
    { name: 'Minimal', value: 'minimal' },
    { name: 'With Search', value: 'withSearch' },
    { name: 'Animated', value: 'animated' },
    { name: 'Glass', value: 'glass' }
  ];
  
  // Demo links
  const demoLinks = [
    { text: 'Home', href: '#' },
    { text: 'Features', href: '#features' },
    { text: 'Pricing', href: '#pricing' },
    { text: 'About', href: '#about' },
    { text: 'Contact', href: '#contact' }
  ];
  
  // Demo CTA button
  const demoCtaButton = {
    text: 'Sign Up',
    href: '#signup',
    variant: 'primary'
  };
  
  // Code examples
  const basicExample = `<script>
  import { Header } from 'svelte-ui-toolkit';
</script>

<Header title="Company Name" />`;

  const withLinksExample = `<Header 
  title="Company Name"
  links={[
    { text: 'Home', href: '#' },
    { text: 'Features', href: '#features' },
    { text: 'Pricing', href: '#pricing' },
    { text: 'About', href: '#about' }
  ]}
/>`;

  const withSearchExample = `<Header 
  title="Company Name"
  withSearch={true}
  links={links}
/>`;

  const ctaExample = `<Header 
  title="Company Name"
  links={links}
  ctaButton={{ 
    text: 'Sign Up', 
    href: '#signup', 
    variant: 'primary' 
  }}
/>`;

  const glassExample = `<Header 
  title="Company Name"
  links={links}
  variant="glass"
  transparent={true}
/>`;

  const stickyExample = `<Header 
  title="Company Name"
  links={links}
  sticky={true}
  animated={true}
/>`;
</script>

<section>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Header Component</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Versatile header components with multiple variants and features.
      </p>
    </div>
    
    <!-- Basic Example -->
    <ComponentPreview
      title="Basic Header"
      description="The default header component."
      codeSnippet={basicExample}
    >
      <div class="w-full">
        <Header title="Company Name" />
      </div>
    </ComponentPreview>
    
    <!-- With Navigation Links -->
    <ComponentPreview
      title="Header with Navigation"
      description="Header with navigation links."
      codeSnippet={withLinksExample}
    >
      <div class="w-full">
        <Header 
          title="Company Name"
          links={demoLinks}
        />
      </div>
    </ComponentPreview>
    
    <!-- With Search -->
    <ComponentPreview
      title="Header with Search"
      description="Header with a search function."
      codeSnippet={withSearchExample}
    >
      <div class="w-full">
        <Header 
          title="Company Name"
          withSearch={true}
          links={demoLinks}
        />
      </div>
    </ComponentPreview>
    
    <!-- With CTA Button -->
    <ComponentPreview
      title="Header with CTA Button"
      description="Header with a call-to-action button."
      codeSnippet={ctaExample}
    >
      <div class="w-full">
        <Header 
          title="Company Name"
          links={demoLinks}
          ctaButton={demoCtaButton}
        />
      </div>
    </ComponentPreview>
    
    <!-- Glass Header -->
    <ComponentPreview
      title="Glass Header"
      description="Header with glassmorphism effect."
      codeSnippet={glassExample}
    >
      <div class="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <Header 
          title="Company Name"
          links={demoLinks}
          variant="glass"
          transparent={true}
        />
        <div class="absolute inset-0 flex items-center justify-center text-white text-opacity-30 text-5xl font-bold">
          Background Content
        </div>
      </div>
    </ComponentPreview>
    
    <!-- Animated Header -->
    <ComponentPreview
      title="Animated Header"
      description="Header with animated underline effect."
      codeSnippet={stickyExample}
    >
      <div class="w-full">
        <Header 
          title="Company Name"
          links={demoLinks}
          animated={true}
        />
      </div>
    </ComponentPreview>
    
    <!-- All Variants -->
    <ComponentPreview
      title="Header Variants"
      description="All available header variants."
      codeSnippet="<Header variant='standard' />\n<Header variant='minimal' />\n<Header variant='withSearch' />\n<Header variant='animated' />\n<Header variant='glass' />"
    >
      <div class="w-full space-y-6">
        {#each variants as variant}
          <div>
            <p class="text-sm text-gray-500 mb-2">{variant.name}</p>
            <Header 
              title="Company Name"
              links={demoLinks}
              variant={variant.value}
              withSearch={variant.value === 'withSearch'}
              animated={variant.value === 'animated'}
            />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>
</section>
