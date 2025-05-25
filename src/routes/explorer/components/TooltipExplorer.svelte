<script lang="ts">
  import { Tooltip } from '$lib/components/Tooltip';
  import { Button } from '$lib/components/Button';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  type TooltipVariant = 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success' | 'info' | 'glass' | 'minimal';
  
  let basicText = 'This is a basic tooltip';
  let dynamicContent = 'Dynamic tooltip content that can change';
  let showTooltip = false;

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple tooltip on hover',
      code: `<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`
    },
    {
      title: 'Click Trigger',
      description: 'Tooltip triggered by click instead of hover',
      code: `<Tooltip content="Click triggered tooltip" trigger="click">
  <Button>Click me</Button>
</Tooltip>`
    },
    {
      title: 'Custom Position',
      description: 'Tooltip positioned on the left side',
      code: `<Tooltip content="Left positioned tooltip" position="left">
  <Button>Left tooltip</Button>
</Tooltip>`
    },    {
      title: 'Rich Content',
      description: 'Tooltip with HTML content and custom styling',
      code: `<Tooltip content="Rich tooltip with dark variant" position="top" variant="dark">
  <Button>Rich tooltip</Button>
</Tooltip>`
    },
    {
      title: 'Disabled State',
      description: 'Tooltip on a disabled element',
      code: `<Tooltip content="This button is disabled">
  <Button disabled>Disabled button</Button>
</Tooltip>`
    },    {
      title: 'Manual Control',
      description: 'Programmatically control tooltip visibility',
      code: `<Tooltip content="Manually controlled" trigger="manual" open={showTooltip}>
  <Button on:click={() => showTooltip = !showTooltip}>
    Toggle tooltip
  </Button>
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

  <!-- Basic Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Examples</h2>
    
    {#each examples as example, index}      <ComponentPreview
        title={example.title}
        description={example.description}
        codeSnippet={example.code}
      >
        <div class="p-8 flex justify-center">
          {#if index === 0}
            <Tooltip content="This is a tooltip">
              <Button>Hover me</Button>
            </Tooltip>
          {:else if index === 1}
            <Tooltip content="Click triggered tooltip" trigger="click">
              <Button>Click me</Button>
            </Tooltip>
          {:else if index === 2}
            <Tooltip content="Left positioned tooltip" position="left">
              <Button>Left tooltip</Button>
            </Tooltip>          {:else if index === 3}
            <Tooltip content="Rich tooltip with dark variant" position="top" variant="dark">
              <Button>Rich tooltip</Button>
            </Tooltip>
          {:else if index === 4}
            <Tooltip content="This button is disabled">
              <Button disabled>Disabled button</Button>
            </Tooltip>          {:else if index === 5}
            <Tooltip content="Manually controlled" trigger="manual" open={showTooltip}>
              <Button on:click={() => showTooltip = !showTooltip}>
                Toggle tooltip
              </Button>
            </Tooltip>
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Positions -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Positions</h2>
      <ComponentPreview
      title="Tooltip Positions"
      description="All available positioning options for tooltips"
      codeSnippet={`<Tooltip content="Top tooltip" position="top">
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
</Tooltip>`}
    >
      <div class="p-8">
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
    </ComponentPreview>
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
      <ComponentPreview
      title="Tooltip Variants"
      description="Different visual styles for various contexts"
      codeSnippet={`<Tooltip content="Default tooltip" variant="default">
  <Button>Default</Button>
</Tooltip>
<Tooltip content="Dark tooltip" variant="dark">
  <Button>Dark</Button>
</Tooltip>
<Tooltip content="Success tooltip" variant="success">
  <Button>Success</Button>
</Tooltip>`}
    >
      <div class="p-8 flex flex-wrap gap-4 justify-center">        {#each variants as variant}
          <Tooltip content="{variant} tooltip" variant={variant}>
            <Button size="sm" variant="secondary">{variant}</Button>
          </Tooltip>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Interactive Features -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Interactive Features</h2>
      <ComponentPreview
      title="Trigger Methods"
      description="Different ways to trigger tooltip display"
      codeSnippet={`<Tooltip content="Hover tooltip" trigger="hover">
  <Button>Hover</Button>
</Tooltip>
<Tooltip content="Click tooltip" trigger="click">
  <Button>Click</Button>
</Tooltip>`}
    >
      <div class="p-8 flex gap-4 justify-center">
        <Tooltip content="Appears on hover (default)" trigger="hover">
          <Button>Hover trigger</Button>
        </Tooltip>        <Tooltip content="Appears on click, disappears on outside click" trigger="click">
          <Button>Click trigger</Button>
        </Tooltip>
      </div>
    </ComponentPreview>
      <ComponentPreview
      title="Delays and Animation"
      description="Custom delays and animation options"
      codeSnippet={`<Tooltip 
  content="Fast tooltip" 
  delay={100}
>
  <Button>Fast</Button>
</Tooltip>
<Tooltip 
  content="Slow tooltip" 
  delay={800}
>
  <Button>Slow</Button>
</Tooltip>`}
    >
      <div class="p-8 flex gap-4 justify-center">
        <Tooltip content="Fast tooltip (100ms delay)" delay={100}>
          <Button>Fast tooltip</Button>
        </Tooltip>
        <Tooltip content="Normal tooltip (default delay)">
          <Button>Normal tooltip</Button>
        </Tooltip>
        <Tooltip content="Slow tooltip (800ms delay)" delay={800}>
          <Button>Slow tooltip</Button>
        </Tooltip>
      </div>
    </ComponentPreview>
  </section>
</div>
