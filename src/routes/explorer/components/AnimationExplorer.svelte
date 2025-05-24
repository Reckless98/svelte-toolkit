<!-- Animation Component Explorer -->
<script>
  import { ScrollReveal, Parallax } from '$lib/animations';
  import ComponentPreview from '../ComponentPreview.svelte';    // Animation examples
  const scrollRevealExample = '<ScrollReveal animation="fade" delay={0} duration={800}>\n  <div class="p-6 bg-white rounded-lg shadow-md">\n    Content that fades in when scrolled into view\n  </div>\n</ScrollReveal>';
  
  const parallaxExample = '<Parallax speed={0.5} direction="up">\n  <div class="p-6 bg-white rounded-lg shadow-md">\n    Content that moves slower than the scroll\n  </div>\n</Parallax>';
</script>

<section>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Animation Components</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Components for adding engaging animations and effects to your UI.
      </p>
    </div>
    
    <!-- Scroll Reveal Animations -->
    <ComponentPreview
      title="Scroll Reveal"
      description="Elements that animate when they enter the viewport."
      codeSnippet={scrollRevealExample}
    >
      <div class="w-full space-y-8">
        <ScrollReveal animation="fade" delay={0} duration={800}>
          <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Fade Animation</h3>
            <p>This element fades in when it enters the viewport.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="fly" y={50} delay={200} duration={800}>
          <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Fly Animation</h3>
            <p>This element flies in from below when it enters the viewport.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="scale" start={0.8} delay={400} duration={800}>
          <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Scale Animation</h3>
            <p>This element scales up when it enters the viewport.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="slide" delay={600} duration={800}>
          <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Slide Animation</h3>
            <p>This element slides in when it enters the viewport.</p>
          </div>
        </ScrollReveal>
      </div>
    </ComponentPreview>
    
    <!-- Parallax Animations -->
    <ComponentPreview
      title="Parallax Effect"
      description="Elements that move at different speeds while scrolling."
      codeSnippet={parallaxExample}
    >
      <div class="w-full space-y-32 py-16">
        <Parallax speed={0.5} direction="up">
          <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Parallax Up</h3>
            <p>This element moves up slower than the scroll, creating a parallax effect.</p>
          </div>
        </Parallax>
        
        <Parallax speed={0.3} direction="down">
          <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Parallax Down</h3>
            <p>This element moves down while scrolling, creating an opposite parallax effect.</p>
          </div>
        </Parallax>
        
        <div class="grid grid-cols-2 gap-8">
          <Parallax speed={0.2} direction="left">
            <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 class="font-bold mb-2">Parallax Left</h3>
              <p>This element moves left while scrolling.</p>
            </div>
          </Parallax>
          
          <Parallax speed={0.2} direction="right">
            <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 class="font-bold mb-2">Parallax Right</h3>
              <p>This element moves right while scrolling.</p>
            </div>
          </Parallax>
        </div>
      </div>
    </ComponentPreview>
  </div>
</section>
