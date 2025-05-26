<script lang="ts">
  import { Textarea } from '$lib/components/Textarea';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // State management for different example groups
  let basicValue = '';
  let labelValue = '';
  let longText = 'This is a longer text that demonstrates the auto-resize functionality. As you type more content, the textarea will automatically expand to fit the content without showing scrollbars.';
  let codeText = `function example() {
  console.log('Hello, world!');
  return 'This is a code example';
}`;
  let charCountValue = '';
  let requiredValue = '';
  
  // Visual style demos
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

  // Advanced feature demos
  let resizeDemos = {
    none: '',
    vertical: '',
    horizontal: '',
    both: ''
  };
  let advancedValue = '';
  
  // State demos
  let normalValue = '';
  let errorValue = '';

  // Comprehensive code examples for each smart group
  const fundamentalsExample = `<!-- Basic Textarea -->
<Textarea bind:value placeholder="Enter your message..." />

<!-- With Label and Description -->
<Textarea 
  bind:value
  label="Message"
  description="Please enter your message below"
  placeholder="Type your message here..."
/>

<!-- Basic Character Counting -->
<Textarea 
  bind:value
  maxlength={100}
  showCharCount
  placeholder="Max 100 characters..."
/>`;

  const visualStylesExample = `<!-- Variants -->
<Textarea variant="standard" bind:value placeholder="Standard textarea" />
<Textarea variant="outlined" bind:value placeholder="Outlined textarea" />
<Textarea variant="filled" bind:value placeholder="Filled textarea" />
<Textarea variant="modern" bind:value placeholder="Modern textarea" />

<!-- Sizes -->
<Textarea size="sm" bind:value placeholder="Small textarea" rows={2} />
<Textarea size="md" bind:value placeholder="Medium (default)" rows={3} />
<Textarea size="lg" bind:value placeholder="Large textarea" rows={4} />

<!-- Colors -->
<Textarea color="primary" bind:value placeholder="Primary theme" />
<Textarea color="success" bind:value placeholder="Success theme" />
<Textarea color="warning" bind:value placeholder="Warning theme" />`;

  const advancedFeaturesExample = `<!-- Auto-Resize Functionality -->
<Textarea 
  autoResize
  bind:value
  placeholder="This textarea will grow as you type..."
/>

<!-- Resize Controls -->
<Textarea resize="none" bind:value placeholder="No resize" />
<Textarea resize="vertical" bind:value placeholder="Vertical only" />
<Textarea resize="both" bind:value placeholder="Both directions" />

<!-- Code Editor Style -->
<Textarea 
  variant="filled"
  bind:value
  placeholder="Enter your code here..."
  rows={10}
  class="font-mono"
/>

<!-- Combined Advanced Features -->
<Textarea 
  variant="modern"
  size="lg"
  color="success"
  autoResize
  showCharCount
  maxlength={500}
  bind:value
  label="Advanced Textarea"
  description="Auto-resizing with character counting"
  placeholder="Type here and watch it grow..."
/>`;

  const statesValidationExample = `<!-- Normal State -->
<Textarea bind:value placeholder="Normal state" />

<!-- Disabled State -->
<Textarea disabled placeholder="Disabled state" />

<!-- Readonly State -->
<Textarea readonly value="This is readonly text" />

<!-- Error State -->
<Textarea 
  error="This field has an error" 
  bind:value 
  placeholder="Error state" 
/>

<!-- Required Field with Validation -->
<Textarea 
  required
  bind:value
  label="Required Message"
  error={!value ? "This field is required" : ""}
  placeholder="This field is required..."
/>`;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Textarea Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive textarea component with auto-resize, character counting, and advanced features.
    </p>
  </div>
<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Textarea Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive textarea component with auto-resize, character counting, and advanced features for modern web applications.
    </p>
  </div>
  <!-- Textarea Fundamentals & Basic Usage -->
  <ComponentPreview
    title="Textarea Fundamentals & Basic Usage"
    description="Essential textarea patterns including basic input, labels, descriptions, and character counting. Perfect starting point for most textarea implementations."
    codeSnippet={fundamentalsExample}
    complexity="Basic"
    features={['basic-usage', 'labels', 'placeholders', 'character-limits']}
  >
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-6">
      <!-- Basic Textarea -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Basic Textarea</h4>
        <Textarea bind:value={basicValue} placeholder="Enter your message..." />
      </div>

      <!-- With Label and Description -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">With Label & Description</h4>
        <Textarea 
          bind:value={labelValue}
          label="Message"
          description="Please enter your message below"
          placeholder="Type your message here..."
        />
      </div>

      <!-- Character Counter -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Character Counter</h4>
        <Textarea 
          bind:value={charCountValue}
          maxlength={100}
          showCharCount
          placeholder="Max 100 characters..."
        />
      </div>
    </div>
  </ComponentPreview>
  <!-- Visual Styles & Customization -->
  <ComponentPreview
    title="Visual Styles & Customization"
    description="Complete visual customization options including variants, sizes, and color themes. Create textareas that match your design system perfectly."
    codeSnippet={visualStylesExample}
    complexity="Intermediate"
    features={['variants', 'sizes', 'colors', 'styling', 'themes']}
  >
    <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-8">
      <!-- Variants -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-white">Style Variants</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea variant="standard" bind:value={variantDemos.standard} placeholder="Standard textarea" />
          <Textarea variant="outlined" bind:value={variantDemos.outlined} placeholder="Outlined textarea" />
          <Textarea variant="filled" bind:value={variantDemos.filled} placeholder="Filled textarea" />
          <Textarea variant="modern" bind:value={variantDemos.modern} placeholder="Modern textarea" />
        </div>
      </div>

      <!-- Sizes -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-white">Size Options</h4>
        <div class="space-y-3">
          <Textarea size="sm" bind:value={sizeDemos.sm} placeholder="Small textarea" rows={2} />
          <Textarea size="md" bind:value={sizeDemos.md} placeholder="Medium textarea (default)" rows={3} />
          <Textarea size="lg" bind:value={sizeDemos.lg} placeholder="Large textarea" rows={4} />
        </div>
      </div>

      <!-- Colors -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-white">Color Themes</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea color="primary" bind:value={colorDemos.primary} placeholder="Primary theme" />
          <Textarea color="success" bind:value={colorDemos.success} placeholder="Success theme" />
          <Textarea color="warning" bind:value={colorDemos.warning} placeholder="Warning theme" />
          <Textarea color="info" bind:value={colorDemos.info} placeholder="Info theme" />
        </div>
      </div>
    </div>
  </ComponentPreview>
  <!-- Advanced Features & Functionality -->
  <ComponentPreview
    title="Advanced Features & Functionality"
    description="Sophisticated textarea capabilities including auto-resize, resize controls, code editor styling, and feature combinations for complex use cases."
    codeSnippet={advancedFeaturesExample}
    complexity="Advanced"
    features={['auto-resize', 'resize-controls', 'code-editor', 'advanced-features']}
  >
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-8">
      <!-- Auto-Resize -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Auto-Resize Functionality</h4>
        <Textarea 
          autoResize
          bind:value={longText}
          placeholder="This textarea will grow as you type..."
        />
      </div>

      <!-- Resize Controls -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-white">Resize Controls</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea resize="none" bind:value={resizeDemos.none} placeholder="No resize" />
          <Textarea resize="vertical" bind:value={resizeDemos.vertical} placeholder="Vertical only" />
          <Textarea resize="horizontal" bind:value={resizeDemos.horizontal} placeholder="Horizontal only" />
          <Textarea resize="both" bind:value={resizeDemos.both} placeholder="Both directions" />
        </div>
      </div>      <!-- Code Editor Style -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Code Editor Style</h4>
        <div class="font-mono">
          <Textarea 
            variant="filled"
            bind:value={codeText}
            placeholder="Enter your code here..."
            rows={10}
          />
        </div>
      </div>

      <!-- Combined Advanced Features -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Combined Advanced Features</h4>
        <Textarea 
          variant="modern"
          size="lg"
          color="success"
          autoResize
          showCharCount
          maxlength={500}
          bind:value={advancedValue}
          label="Advanced Textarea"
          description="Auto-resizing textarea with character counting"
          placeholder="Type here and watch it grow..."
        />
      </div>
    </div>
  </ComponentPreview>  <!-- States & Validation -->
  <ComponentPreview
    title="States & Validation"
    description="Comprehensive state management including normal, disabled, readonly, error states, and validation patterns for robust form handling."
    codeSnippet={statesValidationExample}
    complexity="Advanced"
    features={['states', 'validation', 'error-handling', 'form-controls']}
  >
    <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-6">
      <!-- Normal State -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Normal State</h4>
        <Textarea bind:value={normalValue} placeholder="Normal state" />
      </div>

      <!-- Disabled State -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Disabled State</h4>
        <Textarea disabled placeholder="Disabled state" />
      </div>

      <!-- Readonly State -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Readonly State</h4>
        <Textarea readonly value="This is readonly text that cannot be edited" />
      </div>

      <!-- Error State -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Error State</h4>
        <Textarea error="This field has an error" bind:value={errorValue} placeholder="Error state" />
      </div>

      <!-- Required Field with Validation -->
      <div class="space-y-2">
        <h4 class="font-medium text-gray-900 dark:text-white">Required Field with Validation</h4>
        <Textarea 
          required
          bind:value={requiredValue}
          label="Required Message"
          error={!requiredValue ? "This field is required" : ""}
          placeholder="This field is required..."
        />
      </div>
    </div>
  </ComponentPreview>

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
