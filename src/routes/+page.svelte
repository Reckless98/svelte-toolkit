<script>
  import HeroLayout from '$lib/layouts/HeroLayout.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Card from '$lib/components/Card/Card.svelte';
  import ScrollReveal from '$lib/animations/ScrollReveal.svelte';
</script>

<HeroLayout  variant="gradient"
  primaryColor="blue"
  secondaryColor="purple"
  staggered={true}
  enableTypewriter={false}
  enableMouseTracker={true}
>
  <div slot="default">
    <ScrollReveal animation="fade" delay={0} duration={800}>
      <h1 class="text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        Svelte UI Toolkit
      </h1>
      <div class="text-sm text-blue-200 mb-6 animate-pulse-custom">
        Made with ❤️ by <a href="https://github.com/Reckless98" target="_blank" rel="noopener noreferrer" class="text-blue-300 hover:text-white transition-colors font-semibold">Reckless98</a>
      </div>
    </ScrollReveal>
    
    <ScrollReveal animation="fly" y={30} delay={200} duration={800}>
      <p class="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
        A beautiful, flexible component library for building modern Svelte applications with enhanced animations and creative effects
      </p>
    </ScrollReveal>
    
    <ScrollReveal animation="scale" delay={400} duration={800}>
      <div class="flex justify-center gap-4 flex-wrap">
        <Button 
          variant="neon" 
          size="lg" 
          animation="glow"
          href="/explorer"
        >
          🚀 Explore Components
        </Button>
        
        <Button 
          variant="glass" 
          size="lg"
          animation="float"
          href="https://github.com/Reckless98/svelte-toolkit"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⭐ View on GitHub
        </Button>
      </div>
    </ScrollReveal>
  </div>
</HeroLayout>

<section class="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
  <div class="container mx-auto max-w-6xl">
    <ScrollReveal animation="fade">
      <h2 class="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Enhanced Features
      </h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover the powerful features that make this UI toolkit perfect for modern web development
      </p>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ScrollReveal animation="fly" y={30} delay={0} duration={800}>
        <Card variant="neon" hoverEffect="glow" title="🎨 Beautifully Designed" subtitle="Modern & Elegant">
          <p>Carefully crafted components with attention to design details, animations, and user experience. Features glass morphism, neon effects, and modern gradients.</p>
        </Card>
      </ScrollReveal>
      
      <ScrollReveal animation="fly" y={30} delay={200} duration={800}>
        <Card variant="morphic" hoverEffect="lift" title="⚙️ Highly Customizable" subtitle="Flexible & Adaptable">
          <p>Each component accepts various props and slots, allowing you to customize their appearance and behavior with ease. Multiple variants, themes, and animation options.</p>
        </Card>
      </ScrollReveal>
      
      <ScrollReveal animation="fly" y={30} delay={400} duration={800}>
        <Card variant="gradient" hoverEffect="scale" title="✨ Interactive Effects" subtitle="Animations & Parallax">
          <p>Add life to your website with smooth animations, 3D effects, parallax scrolling, and creative hover interactions that engage your users.</p>
        </Card>
      </ScrollReveal>
    </div>
  </div>
</section>

<section class="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
  <!-- Animated background elements -->
  <div class="absolute inset-0">
    <div class="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
    <div class="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse-custom"></div>
  </div>
  
  <div class="container mx-auto max-w-6xl relative z-10">
    <ScrollReveal animation="fade">
      <h2 class="text-4xl font-bold mb-6 text-center">Ready to Get Started?</h2>
      <p class="text-xl mb-12 text-center max-w-2xl mx-auto opacity-90">
        Explore our enhanced component library and build beautiful, interactive websites with modern animations and creative effects.
      </p>
    </ScrollReveal>
    
    <div class="flex justify-center gap-6">
      <ScrollReveal animation="scale" delay={200} duration={800}>
        <Button 
          variant="glass" 
          size="lg" 
          animation="glow"
          href="/explorer"
        >
          🚀 Explore Components
        </Button>
      </ScrollReveal>
      
      <ScrollReveal animation="scale" delay={400} duration={800}>
        <Button 
          variant="morphic" 
          size="lg" 
          animation="pulse"
          href="https://github.com/Reckless98/svelte-toolkit"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⭐ Star on GitHub
        </Button>
      </ScrollReveal>
    </div>
      <!-- Branding -->
    <ScrollReveal animation="fade" delay={600} duration={800}>
      <div class="text-center mt-12 pt-8 border-t border-white/20">
        <p class="text-white/80 text-sm">
          Crafted with passion by 
          <a 
            href="https://github.com/Reckless98" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-white font-semibold hover:text-blue-200 transition-colors animate-pulse-custom"
          >
            Reckless98
          </a>
        </p>
      </div>
    </ScrollReveal>
  </div>
</section>