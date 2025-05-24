<script lang="ts">
  import { Textarea } from '$lib/components/Textarea';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  let basicValue = '';
  let longText = 'This is a longer text that demonstrates the auto-resize functionality. As you type more content, the textarea will automatically expand to fit the content without showing scrollbars.';
  let codeText = `function example() {
  console.log('Hello, world!');
  return 'This is a code example';
}`;

  const examples = [
    {
      title: 'Basic Textarea',
      description: 'Simple textarea with placeholder',
      code: `<Textarea bind:value placeholder="Enter your message..." />`
    },
    {
      title: 'With Label and Description',
      description: 'Textarea with additional context',
      code: `<Textarea 
  bind:value
  label="Message"
  description="Please enter your message below"
  placeholder="Type your message here..."
/>`
    },
    {
      title: 'Auto-Resize',
      description: 'Textarea that grows with content',
      code: `<Textarea 
  autoResize
  bind:value
  placeholder="This textarea will grow as you type..."
/>`
    },
    {
      title: 'Character Counter',
      description: 'Textarea with character limit and counter',
      code: `<Textarea 
  bind:value
  maxlength={100}
  showCharCount
  placeholder="Max 100 characters..."
/>`
    },
    {
      title: 'Code Editor Style',
      description: 'Textarea styled for code input',
      code: `<Textarea 
  bind:value
  variant="filled"
  placeholder="Enter your code here..."
  rows={10}
  class="font-mono"
/>`
    },
    {
      title: 'Required Field',
      description: 'Textarea with validation',
      code: `<Textarea 
  required
  bind:value
  label="Required Message"
  error={!value ? "This field is required" : ""}
/>`
    }
  ];

  let variantDemos = {
    standard: '',
    outlined: '',
    filled: '',
    modern: '',
    glass: ''
  };

  let sizeDemos = {
    sm: '',
    md: '',
    lg: '',
    xl: ''
  };

  let colorDemos = {
    primary: '',
    secondary: '',
    success: '',
    warning: '',
    error: '',
    info: ''
  };

  let resizeDemos = {
    none: '',
    vertical: '',
    horizontal: '',
    both: ''
  };
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Textarea Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive textarea component with auto-resize, character counting, and advanced features.
    </p>
  </div>

  <!-- Basic Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Examples</h2>
    
    {#each examples as example, index}
      <ComponentPreview
        title={example.title}
        description={example.description}
        code={example.code}
      >
        <div slot="preview" class="p-4">
          {#if index === 0}
            <Textarea bind:value={basicValue} placeholder="Enter your message..." />
          {:else if index === 1}
            <Textarea 
              bind:value={basicValue}
              label="Message"
              description="Please enter your message below"
              placeholder="Type your message here..."
            />
          {:else if index === 2}
            <Textarea 
              autoResize
              bind:value={longText}
              placeholder="This textarea will grow as you type..."
            />
          {:else if index === 3}
            <Textarea 
              bind:value={basicValue}
              maxlength={100}
              showCharCount
              placeholder="Max 100 characters..."
            />
          {:else if index === 4}
            <Textarea 
              bind:value={codeText}
              variant="filled"
              placeholder="Enter your code here..."
              rows={10}
              class="font-mono"
            />
          {:else if index === 5}
            <Textarea 
              required
              bind:value={basicValue}
              label="Required Message"
              error={!basicValue ? "This field is required" : ""}
            />
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Textarea Variants"
      description="Different visual styles for various use cases"
      code={`<Textarea variant="standard" bind:value placeholder="Standard textarea" />
<Textarea variant="outlined" bind:value placeholder="Outlined textarea" />
<Textarea variant="filled" bind:value placeholder="Filled textarea" />
<Textarea variant="modern" bind:value placeholder="Modern textarea" />
<Textarea variant="glass" bind:value placeholder="Glass textarea" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Textarea variant="standard" bind:value={variantDemos.standard} placeholder="Standard textarea" />
        <Textarea variant="outlined" bind:value={variantDemos.outlined} placeholder="Outlined textarea" />
        <Textarea variant="filled" bind:value={variantDemos.filled} placeholder="Filled textarea" />
        <Textarea variant="modern" bind:value={variantDemos.modern} placeholder="Modern textarea" />
        <Textarea variant="glass" bind:value={variantDemos.glass} placeholder="Glass textarea" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Sizes</h2>
    
    <ComponentPreview
      title="Textarea Sizes"
      description="Available size options: sm, md, lg, xl"
      code={`<Textarea size="sm" bind:value placeholder="Small textarea" />
<Textarea size="md" bind:value placeholder="Medium textarea (default)" />
<Textarea size="lg" bind:value placeholder="Large textarea" />
<Textarea size="xl" bind:value placeholder="Extra large textarea" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Textarea size="sm" bind:value={sizeDemos.sm} placeholder="Small textarea" rows={2} />
        <Textarea size="md" bind:value={sizeDemos.md} placeholder="Medium textarea (default)" rows={3} />
        <Textarea size="lg" bind:value={sizeDemos.lg} placeholder="Large textarea" rows={4} />
        <Textarea size="xl" bind:value={sizeDemos.xl} placeholder="Extra large textarea" rows={5} />
      </div>
    </ComponentPreview>
  </section>

  <!-- Colors -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Colors</h2>
    
    <ComponentPreview
      title="Color Themes"
      description="Different color themes for various contexts"
      code={`<Textarea color="primary" bind:value placeholder="Primary theme" />
<Textarea color="secondary" bind:value placeholder="Secondary theme" />
<Textarea color="success" bind:value placeholder="Success theme" />
<Textarea color="warning" bind:value placeholder="Warning theme" />
<Textarea color="error" bind:value placeholder="Error theme" />
<Textarea color="info" bind:value placeholder="Info theme" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Textarea color="primary" bind:value={colorDemos.primary} placeholder="Primary theme" />
        <Textarea color="secondary" bind:value={colorDemos.secondary} placeholder="Secondary theme" />
        <Textarea color="success" bind:value={colorDemos.success} placeholder="Success theme" />
        <Textarea color="warning" bind:value={colorDemos.warning} placeholder="Warning theme" />
        <Textarea color="error" bind:value={colorDemos.error} placeholder="Error theme" />
        <Textarea color="info" bind:value={colorDemos.info} placeholder="Info theme" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Resize Options -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Resize Options</h2>
    
    <ComponentPreview
      title="Resize Behavior"
      description="Different resize options for user control"
      code={`<Textarea resize="none" bind:value placeholder="No resize" />
<Textarea resize="vertical" bind:value placeholder="Vertical resize only" />
<Textarea resize="horizontal" bind:value placeholder="Horizontal resize only" />
<Textarea resize="both" bind:value placeholder="Both directions" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Textarea resize="none" bind:value={resizeDemos.none} placeholder="No resize" />
        <Textarea resize="vertical" bind:value={resizeDemos.vertical} placeholder="Vertical resize only (default)" />
        <Textarea resize="horizontal" bind:value={resizeDemos.horizontal} placeholder="Horizontal resize only" />
        <Textarea resize="both" bind:value={resizeDemos.both} placeholder="Both directions" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Advanced Features -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Advanced Features</h2>
    
    <ComponentPreview
      title="Combined Features"
      description="Multiple features working together"
      code={`<Textarea 
  variant="modern"
  size="lg"
  color="success"
  autoResize
  showCharCount
  maxlength={500}
  bind:value
  label="Advanced Textarea"
  description="Auto-resizing textarea with character counting"
  placeholder="Type here and watch it grow..."
/>`}
    >
      <div slot="preview" class="p-4">
        <Textarea 
          variant="modern"
          size="lg"
          color="success"
          autoResize
          showCharCount
          maxlength={500}
          bind:value={longText}
          label="Advanced Textarea"
          description="Auto-resizing textarea with character counting"
          placeholder="Type here and watch it grow..."
        />
      </div>
    </ComponentPreview>
  </section>

  <!-- States -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">States</h2>
    
    <ComponentPreview
      title="Textarea States"
      description="Different states: normal, disabled, readonly, error"
      code={`<Textarea bind:value placeholder="Normal state" />
<Textarea disabled placeholder="Disabled state" />
<Textarea readonly value="This is readonly text" />
<Textarea error="This field has an error" bind:value placeholder="Error state" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Textarea bind:value={basicValue} placeholder="Normal state" />
        <Textarea disabled placeholder="Disabled state" />
        <Textarea readonly value="This is readonly text that cannot be edited" />
        <Textarea error="This field has an error" bind:value={basicValue} placeholder="Error state" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Props Documentation -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Props</h2>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prop</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">value</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">''</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Text content of the textarea</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">autoResize</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Automatically resize to fit content</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">showCharCount</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Show character counter</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">maxlength</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">undefined</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Maximum character limit</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">resize</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">TextareaResize</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'vertical'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Resize behavior</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rows</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">4</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Number of visible rows</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
