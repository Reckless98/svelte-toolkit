<script lang="ts">
  import { Checkbox } from '$lib/components/Checkbox';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  let basicChecked = false;
  let indeterminateState = false;
  let sizeDemos = {
    sm: false,
    md: false,
    lg: false,
    xl: false
  };
  let variantDemos = {
    standard: false,
    outlined: false,
    filled: false,
    modern: false,
    neon: false,
    glass: false
  };
  let colorDemos = {
    primary: false,
    secondary: false,
    success: false,
    warning: false,
    error: false,
    info: false
  };
  let animationDemos = {
    none: false,
    scale: false,
    bounce: false,
    slide: false
  };

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple checkbox with label',
      code: `<Checkbox bind:checked label="Accept terms and conditions" />`
    },
    {
      title: 'With Description',
      description: 'Checkbox with additional description text',
      code: `<Checkbox 
  bind:checked
  label="Enable notifications"
  description="Receive email updates about your account"
/>`
    },
    {
      title: 'Indeterminate State',
      description: 'Checkbox in indeterminate state for "select all" functionality',
      code: `<Checkbox bind:indeterminate label="Select all items" />`
    },
    {
      title: 'Disabled State',
      description: 'Disabled checkbox that cannot be interacted with',
      code: `<Checkbox disabled label="Disabled option" />`
    },
    {
      title: 'Error State',
      description: 'Checkbox with error message',
      code: `<Checkbox 
  bind:checked
  error="This field is required"
  label="Required field"
/>`
    },
    {
      title: 'Required Field',
      description: 'Checkbox marked as required with validation',
      code: `<Checkbox 
  required
  bind:checked
  label="I agree to the terms"
/>`
    }
  ];
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkbox Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive checkbox component with multiple variants, sizes, animations, and accessibility features.
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
            <Checkbox bind:checked={basicChecked} label="Accept terms and conditions" />
          {:else if index === 1}
            <Checkbox 
              bind:checked={basicChecked}
              label="Enable notifications"
              description="Receive email updates about your account"
            />
          {:else if index === 2}
            <Checkbox bind:indeterminate={indeterminateState} label="Select all items" />
          {:else if index === 3}
            <Checkbox disabled label="Disabled option" />
          {:else if index === 4}
            <Checkbox 
              bind:checked={basicChecked}
              error="This field is required"
              label="Required field"
            />
          {:else if index === 5}
            <Checkbox 
              required
              bind:checked={basicChecked}
              label="I agree to the terms"
            />
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Sizes</h2>
    
    <ComponentPreview
      title="Checkbox Sizes"
      description="Available size options: sm, md, lg, xl"
      code={`<Checkbox size="sm" bind:checked label="Small" />
<Checkbox size="md" bind:checked label="Medium (default)" />
<Checkbox size="lg" bind:checked label="Large" />
<Checkbox size="xl" bind:checked label="Extra Large" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Checkbox size="sm" bind:checked={sizeDemos.sm} label="Small checkbox" />
        <Checkbox size="md" bind:checked={sizeDemos.md} label="Medium checkbox (default)" />
        <Checkbox size="lg" bind:checked={sizeDemos.lg} label="Large checkbox" />
        <Checkbox size="xl" bind:checked={sizeDemos.xl} label="Extra large checkbox" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Checkbox Variants"
      description="Different visual styles for various use cases"
      code={`<Checkbox variant="standard" bind:checked label="Standard" />
<Checkbox variant="outlined" bind:checked label="Outlined" />
<Checkbox variant="filled" bind:checked label="Filled" />
<Checkbox variant="modern" bind:checked label="Modern" />
<Checkbox variant="neon" bind:checked label="Neon" />
<Checkbox variant="glass" bind:checked label="Glass" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Checkbox variant="standard" bind:checked={variantDemos.standard} label="Standard checkbox" />
        <Checkbox variant="outlined" bind:checked={variantDemos.outlined} label="Outlined checkbox" />
        <Checkbox variant="filled" bind:checked={variantDemos.filled} label="Filled checkbox" />
        <Checkbox variant="modern" bind:checked={variantDemos.modern} label="Modern checkbox" />
        <Checkbox variant="neon" bind:checked={variantDemos.neon} label="Neon checkbox" />
        <Checkbox variant="glass" bind:checked={variantDemos.glass} label="Glass checkbox" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Colors -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Colors</h2>
    
    <ComponentPreview
      title="Color Themes"
      description="Different color themes for various contexts"
      code={`<Checkbox color="primary" bind:checked label="Primary" />
<Checkbox color="secondary" bind:checked label="Secondary" />
<Checkbox color="success" bind:checked label="Success" />
<Checkbox color="warning" bind:checked label="Warning" />
<Checkbox color="error" bind:checked label="Error" />
<Checkbox color="info" bind:checked label="Info" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Checkbox color="primary" bind:checked={colorDemos.primary} label="Primary theme" />
        <Checkbox color="secondary" bind:checked={colorDemos.secondary} label="Secondary theme" />
        <Checkbox color="success" bind:checked={colorDemos.success} label="Success theme" />
        <Checkbox color="warning" bind:checked={colorDemos.warning} label="Warning theme" />
        <Checkbox color="error" bind:checked={colorDemos.error} label="Error theme" />
        <Checkbox color="info" bind:checked={colorDemos.info} label="Info theme" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Animations -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Animations</h2>
    
    <ComponentPreview
      title="Animation Effects"
      description="Different animation effects when checking/unchecking"
      code={`<Checkbox animation="none" bind:checked label="No animation" />
<Checkbox animation="scale" bind:checked label="Scale animation" />
<Checkbox animation="bounce" bind:checked label="Bounce animation" />
<Checkbox animation="slide" bind:checked label="Slide animation" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Checkbox animation="none" bind:checked={animationDemos.none} label="No animation" />
        <Checkbox animation="scale" bind:checked={animationDemos.scale} label="Scale animation (default)" />
        <Checkbox animation="bounce" bind:checked={animationDemos.bounce} label="Bounce animation" />
        <Checkbox animation="slide" bind:checked={animationDemos.slide} label="Slide animation" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Advanced Usage -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Advanced Usage</h2>
    
    <ComponentPreview
      title="Combined Features"
      description="Combining multiple features for complex use cases"
      code={`<Checkbox 
  variant="modern"
  size="lg"
  color="success"
  animation="bounce"
  bind:checked
  label="Premium Feature"
  description="Unlock advanced functionality with this option"
/>`}
    >
      <div slot="preview" class="p-4">
        <Checkbox 
          variant="modern"
          size="lg"
          color="success"
          animation="bounce"
          bind:checked={basicChecked}
          label="Premium Feature"
          description="Unlock advanced functionality with this option"
        />
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
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">checked</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether the checkbox is checked</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">indeterminate</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether the checkbox is in indeterminate state</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">label</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">''</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Label text for the checkbox</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">variant</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">CheckboxVariant</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'standard'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Visual variant of the checkbox</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">size</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">CheckboxSize</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'md'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Size of the checkbox</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">color</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">CheckboxColor</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'primary'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Color theme of the checkbox</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
