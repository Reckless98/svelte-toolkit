<script lang="ts">
  import { Tooltip } from '$lib/components/Tooltip';
  import { Button } from '$lib/components/Button';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  type TooltipVariant = 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success' | 'info' | 'glass' | 'minimal';
    let showTooltip = false;

  // Comprehensive code examples for each group
  const fundamentalsExample = `<!-- Basic Tooltip Usage -->
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

<!-- Click Trigger -->
<Tooltip content="Click triggered tooltip" trigger="click">
  <Button>Click me</Button>
</Tooltip>

<!-- Manual Control -->
<Tooltip content="Manually controlled" trigger="manual" open={showTooltip}>
  <Button on:click={() => showTooltip = !showTooltip}>
    Toggle tooltip
  </Button>
</Tooltip>

<!-- Disabled Element -->
<Tooltip content="This button is disabled">
  <Button disabled>Disabled button</Button>
</Tooltip>`;

  const positioningExample = `<!-- Basic Positions -->
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Left tooltip" position="left">
  <Button>Left</Button>
</Tooltip>

<!-- Precise Positioning -->
<Tooltip content="Top start" position="top-start">
  <Button>Top Start</Button>
</Tooltip>
<Tooltip content="Right end" position="right-end">
  <Button>Right End</Button>
</Tooltip>`;

  const visualStylesExample = `<!-- Visual Variants -->
<Tooltip content="Default tooltip" variant="default">
  <Button>Default</Button>
</Tooltip>
<Tooltip content="Dark tooltip" variant="dark">
  <Button>Dark</Button>
</Tooltip>
<Tooltip content="Success tooltip" variant="success">
  <Button>Success</Button>
</Tooltip>
<Tooltip content="Error tooltip" variant="error">
  <Button>Error</Button>
</Tooltip>
<Tooltip content="Glass tooltip" variant="glass">
  <Button>Glass</Button>
</Tooltip>

<!-- Custom Delays -->
<Tooltip content="Fast tooltip" delay={100}>
  <Button>Fast</Button>
</Tooltip>
<Tooltip content="Slow tooltip" delay={800}>
  <Button>Slow</Button>
</Tooltip>`;

  const realWorldExample = `<!-- Navigation Help -->
<Tooltip content="Go to home page" position="bottom">
  <Button variant="ghost" size="sm">
    <HomeIcon />
  </Button>
</Tooltip>

<!-- Form Field Help -->
<Tooltip 
  content="Password must be at least 8 characters long"
  position="right"
  variant="info"
  trigger="click"
>
  <InfoIcon class="text-blue-500 cursor-help" />
</Tooltip>

<!-- Status Indicators -->
<Tooltip 
  content="Server is running normally"
  variant="success"
  position="top"
>
  <div class="w-3 h-3 bg-green-400 rounded-full"></div>
</Tooltip>

<!-- Interactive Dashboard Elements -->
<Tooltip 
  content="Click to view detailed analytics"
  position="top"
  variant="dark"
>
  <div class="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
    Analytics Widget
  </div>
</Tooltip>`;

  const examples = [    {
      title: 'Basic Usage',
      description: 'Simple tooltip on hover',
      code: `<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`
    }
  ];

  const positions = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ];  const variants: TooltipVariant[] = [
    'default', 'dark', 'light', 'error', 
    'warning', 'success', 'info', 'glass', 'minimal'
  ];
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tooltip Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A flexible tooltip component with multiple positioning options, variants, and trigger methods for enhanced user experience.
    </p>
  </div>
  <!-- Tooltip Fundamentals & Basic Usage -->
  <ComponentPreview
    title="Tooltip Fundamentals & Basic Usage"
    description="Master the core tooltip functionality including triggers, manual control, and basic interactions. Essential patterns for user interface enhancement."
    codeSnippet={fundamentalsExample}
    complexity="Basic"
    features={["Hover Trigger", "Click Trigger", "Manual Control", "Disabled Elements"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Trigger Methods</h4>
        <div class="flex flex-wrap gap-4 justify-center">
          <Tooltip content="This is a tooltip">
            <Button>Hover me</Button>
          </Tooltip>
          
          <Tooltip content="Click triggered tooltip" trigger="click">
            <Button>Click me</Button>
          </Tooltip>
          
          <Tooltip content="Manually controlled" trigger="manual" open={showTooltip}>
            <Button on:click={() => showTooltip = !showTooltip}>
              Toggle tooltip
            </Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Special Cases</h4>
        <div class="flex gap-4 justify-center">
          <Tooltip content="This button is disabled">
            <Button disabled>Disabled button</Button>
          </Tooltip>
          
          <Tooltip content="Rich tooltip with dark variant" position="top" variant="dark">
            <Button>Rich tooltip</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Positioning & Placement -->
  <ComponentPreview
    title="Positioning & Placement"
    description="Explore comprehensive positioning options to ensure tooltips display optimally in any layout. Control precise placement with 12 position variants."
    codeSnippet={positioningExample}
    complexity="Intermediate"
    features={["12 Positions", "Smart Placement", "Boundary Detection", "Responsive Positioning"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Position Grid</h4>
        <div class="grid grid-cols-3 gap-8 max-w-md mx-auto">
          <!-- Top row -->
          <Tooltip content="Top start" position="top-start">
            <Button size="sm">Top Start</Button>
          </Tooltip>
          <Tooltip content="Top center" position="top">
            <Button size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Top end" position="top-end">
            <Button size="sm">Top End</Button>
          </Tooltip>
          
          <!-- Middle row -->
          <Tooltip content="Left start" position="left-start">
            <Button size="sm">Left Start</Button>
          </Tooltip>
          <div class="flex justify-center items-center">
            <span class="text-sm text-gray-500">Center</span>
          </div>
          <Tooltip content="Right start" position="right-start">
            <Button size="sm">Right Start</Button>
          </Tooltip>
          
          <!-- Bottom row -->
          <Tooltip content="Left end" position="left-end">
            <Button size="sm">Left End</Button>
          </Tooltip>
          <Tooltip content="Bottom center" position="bottom">
            <Button size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Right end" position="right-end">
            <Button size="sm">Right End</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Basic Directions</h4>
        <div class="flex gap-4 justify-center">
          <Tooltip content="Left positioned tooltip" position="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content="Top positioned tooltip" position="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="Bottom positioned tooltip" position="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="Right positioned tooltip" position="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Visual Styles & Customization -->
  <ComponentPreview
    title="Visual Styles & Customization"
    description="Customize tooltip appearance with variants, delays, and animations. Create cohesive design systems with contextual styling."
    codeSnippet={visualStylesExample}
    complexity="Advanced"
    features={["9 Visual Variants", "Custom Delays", "Animation Control", "Contextual Styling"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Visual Variants</h4>
        <div class="flex flex-wrap gap-3 justify-center">
          {#each variants as variant}
            <Tooltip content="{variant} tooltip" variant={variant}>
              <Button size="sm" variant="secondary">{variant}</Button>
            </Tooltip>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Animation Timing</h4>
        <div class="flex gap-4 justify-center">
          <Tooltip content="Fast tooltip (100ms delay)" delay={100}>
            <Button>Fast (100ms)</Button>
          </Tooltip>
          <Tooltip content="Normal tooltip (default delay)">
            <Button>Normal</Button>
          </Tooltip>
          <Tooltip content="Slow tooltip (800ms delay)" delay={800}>
            <Button>Slow (800ms)</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Real-World Applications & Examples -->
  <ComponentPreview
    title="Real-World Applications & Examples"
    description="Professional implementations for navigation, forms, status indicators, and interactive elements. Production-ready patterns for enhanced user experience."
    codeSnippet={realWorldExample}
    complexity="Advanced"
    features={["Navigation Help", "Form Assistance", "Status Indicators", "Interactive Elements"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Navigation & UI Elements</h4>
        <div class="flex gap-4 justify-center items-center">
          <Tooltip content="Go to home page" position="bottom">
            <Button variant="ghost" size="sm">🏠 Home</Button>
          </Tooltip>
          
          <Tooltip content="Open user settings" position="bottom">
            <Button variant="ghost" size="sm">⚙️ Settings</Button>
          </Tooltip>
          
          <Tooltip content="View notifications" position="bottom" variant="info">
            <Button variant="ghost" size="sm">🔔 Alerts</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Status Indicators</h4>
        <div class="flex gap-6 justify-center items-center">
          <Tooltip content="Server is running normally" variant="success" position="top">
            <div class="w-4 h-4 bg-green-400 rounded-full cursor-help"></div>
          </Tooltip>
          
          <Tooltip content="Warning: High memory usage" variant="warning" position="top">
            <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-help"></div>
          </Tooltip>
          
          <Tooltip content="Error: Connection failed" variant="error" position="top">
            <div class="w-4 h-4 bg-red-400 rounded-full cursor-help"></div>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Interactive Dashboard Elements</h4>
        <div class="flex gap-4 justify-center">
          <Tooltip content="Click to view detailed analytics" position="top" variant="dark">
            <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              📊 Analytics Widget
            </div>
          </Tooltip>
          
          <Tooltip content="Password must be at least 8 characters long" position="right" variant="info" trigger="click">
            <div class="p-2 text-blue-500 cursor-help">ℹ️ Help</div>
          </Tooltip>
        </div>
      </div>
    </div>
  </ComponentPreview>
</div>
