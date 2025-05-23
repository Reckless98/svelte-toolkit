<script>
  import HeroLayout from '$lib/layouts/HeroLayout.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Card from '$lib/components/Card/Card.svelte';
  import ScrollReveal from '$lib/animations/ScrollReveal.svelte';
</script>

<HeroLayout
  backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  fullHeight={true}
  staggered={true}
>
  <div slot="default" let:animationDelay>
    <ScrollReveal animation="fade" delay={0} duration={800}>
      <h1 class="text-6xl font-extrabold mb-6">Svelte UI Toolkit</h1>
    </ScrollReveal>
    
    <ScrollReveal animation="fly" y={30} delay={200} duration={800}>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        A beautiful, flexible component library for building modern Svelte applications
      </p>
    </ScrollReveal>
    
    <ScrollReveal animation="scale" delay={400} duration={800}>
      <div class="flex justify-center gap-4 flex-wrap">
        <Button 
          variant="primary" 
          size="lg" 
          animation="ripple"
          href="/explorer"
        >
          Explore Components
        </Button>
        
        <Button 
          variant="ghost" 
          size="lg"
          href="https://github.com/username/svelte-ui-toolkit"
        >
          View on GitHub
        </Button>
      </div>
    </ScrollReveal>
  </div>
</HeroLayout>

<section class="py-20 px-4 bg-gray-50">
  <div class="container mx-auto max-w-6xl">
    <ScrollReveal animation="fade">
      <h2 class="text-4xl font-bold mb-12 text-center">Features</h2>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ScrollReveal animation="fly" y={30} delay={0} duration={800}>
        <Card variant="elevated" title="Beautifully Designed" subtitle="Modern & Elegant">
          <p>Carefully crafted components with attention to design details, animations, and user experience.</p>
        </Card>
      </ScrollReveal>
      
      <ScrollReveal animation="fly" y={30} delay={200} duration={800}>
        <Card variant="elevated" title="Highly Customizable" subtitle="Flexible & Adaptable">
          <p>Each component accepts various props and slots, allowing you to customize their appearance and behavior.</p>
        </Card>
      </ScrollReveal>
      
      <ScrollReveal animation="fly" y={30} delay={400} duration={800}>
        <Card variant="elevated" title="Interactive Effects" subtitle="Animations & Parallax">
          <p>Add life to your website with smooth animations, 3D effects, and parallax scrolling.</p>
        </Card>
      </ScrollReveal>
    </div>
  </div>
</section>

<section class="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
  <div class="container mx-auto max-w-6xl">
    <ScrollReveal animation="fade">
      <h2 class="text-4xl font-bold mb-6 text-center">Get Started Today</h2>
      <p class="text-xl mb-12 text-center max-w-2xl mx-auto">
        Explore our component library and build beautiful, interactive websites faster than ever.
      </p>
    </ScrollReveal>
    
    <div class="flex justify-center">
      <ScrollReveal animation="scale" delay={200} duration={800}>
        <Button 
          variant="glass" 
          size="lg" 
          animation="ripple"
          href="/explorer"
        >
          View Component Explorer
        </Button>
      </ScrollReveal>
    </div>
  </div>
</section>