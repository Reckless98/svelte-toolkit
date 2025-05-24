<script lang="ts">
  import { Select } from '$lib/components/Select';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  let basicValue = '';
  let multipleValue: string[] = [];
  let searchableValue = '';
  let groupedValue = '';

  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  ];

  const groupedOptions = [
    { value: 'fruits-apple', label: 'Apple', group: 'Fruits' },
    { value: 'fruits-banana', label: 'Banana', group: 'Fruits' },
    { value: 'fruits-orange', label: 'Orange', group: 'Fruits' },
    { value: 'vegetables-carrot', label: 'Carrot', group: 'Vegetables' },
    { value: 'vegetables-lettuce', label: 'Lettuce', group: 'Vegetables' },
    { value: 'vegetables-tomato', label: 'Tomato', group: 'Vegetables' },
  ];

  const examples = [
    {
      title: 'Basic Select',
      description: 'Simple dropdown select with options',
      code: `<Select bind:value options={basicOptions} placeholder="Choose an option..." />`
    },
    {
      title: 'Multiple Selection',
      description: 'Select multiple options with tags',
      code: `<Select multiple bind:value options={basicOptions} placeholder="Choose multiple..." />`
    },
    {
      title: 'Searchable Select',
      description: 'Select with search functionality',
      code: `<Select searchable bind:value options={basicOptions} placeholder="Search and select..." />`
    },
    {
      title: 'Grouped Options',
      description: 'Options organized in groups',
      code: `<Select bind:value options={groupedOptions} placeholder="Select from groups..." />`
    },
    {
      title: 'With Label and Description',
      description: 'Select with additional context',
      code: `<Select 
  bind:value
  options={basicOptions}
  label="Preferred Option"
  description="Choose your preferred option from the list"
/>`
    },
    {
      title: 'Clearable Select',
      description: 'Select with clear functionality',
      code: `<Select clearable bind:value options={basicOptions} placeholder="Clearable select..." />`
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
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Select Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive select component with search, multiple selection, grouping, and accessibility features.
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
            <Select bind:value={basicValue} options={basicOptions} placeholder="Choose an option..." />
          {:else if index === 1}
            <Select multiple bind:value={multipleValue} options={basicOptions} placeholder="Choose multiple..." />
          {:else if index === 2}
            <Select searchable bind:value={searchableValue} options={basicOptions} placeholder="Search and select..." />
          {:else if index === 3}
            <Select bind:value={groupedValue} options={groupedOptions} placeholder="Select from groups..." />
          {:else if index === 4}
            <Select 
              bind:value={basicValue}
              options={basicOptions}
              label="Preferred Option"
              description="Choose your preferred option from the list"
            />
          {:else if index === 5}
            <Select clearable bind:value={basicValue} options={basicOptions} placeholder="Clearable select..." />
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Select Variants"
      description="Different visual styles for various use cases"
      code={`<Select variant="standard" bind:value options={basicOptions} />
<Select variant="outlined" bind:value options={basicOptions} />
<Select variant="filled" bind:value options={basicOptions} />
<Select variant="modern" bind:value options={basicOptions} />
<Select variant="glass" bind:value options={basicOptions} />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Select variant="standard" bind:value={variantDemos.standard} options={basicOptions} placeholder="Standard select" />
        <Select variant="outlined" bind:value={variantDemos.outlined} options={basicOptions} placeholder="Outlined select" />
        <Select variant="filled" bind:value={variantDemos.filled} options={basicOptions} placeholder="Filled select" />
        <Select variant="modern" bind:value={variantDemos.modern} options={basicOptions} placeholder="Modern select" />
        <Select variant="glass" bind:value={variantDemos.glass} options={basicOptions} placeholder="Glass select" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Sizes</h2>
    
    <ComponentPreview
      title="Select Sizes"
      description="Available size options: sm, md, lg, xl"
      code={`<Select size="sm" bind:value options={basicOptions} />
<Select size="md" bind:value options={basicOptions} />
<Select size="lg" bind:value options={basicOptions} />
<Select size="xl" bind:value options={basicOptions} />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Select size="sm" bind:value={sizeDemos.sm} options={basicOptions} placeholder="Small select" />
        <Select size="md" bind:value={sizeDemos.md} options={basicOptions} placeholder="Medium select (default)" />
        <Select size="lg" bind:value={sizeDemos.lg} options={basicOptions} placeholder="Large select" />
        <Select size="xl" bind:value={sizeDemos.xl} options={basicOptions} placeholder="Extra large select" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Colors -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Colors</h2>
    
    <ComponentPreview
      title="Color Themes"
      description="Different color themes for various contexts"
      code={`<Select color="primary" bind:value options={basicOptions} />
<Select color="secondary" bind:value options={basicOptions} />
<Select color="success" bind:value options={basicOptions} />
<Select color="warning" bind:value options={basicOptions} />
<Select color="error" bind:value options={basicOptions} />
<Select color="info" bind:value options={basicOptions} />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Select color="primary" bind:value={colorDemos.primary} options={basicOptions} placeholder="Primary theme" />
        <Select color="secondary" bind:value={colorDemos.secondary} options={basicOptions} placeholder="Secondary theme" />
        <Select color="success" bind:value={colorDemos.success} options={basicOptions} placeholder="Success theme" />
        <Select color="warning" bind:value={colorDemos.warning} options={basicOptions} placeholder="Warning theme" />
        <Select color="error" bind:value={colorDemos.error} options={basicOptions} placeholder="Error theme" />
        <Select color="info" bind:value={colorDemos.info} options={basicOptions} placeholder="Info theme" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Advanced Features -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Advanced Features</h2>
    
    <ComponentPreview
      title="Combined Features"
      description="Multiple features working together"
      code={`<Select 
  variant="modern"
  size="lg"
  color="success"
  searchable
  clearable
  multiple
  bind:value
  options={groupedOptions}
  label="Advanced Select"
  description="A select with all features enabled"
/>`}
    >
      <div slot="preview" class="p-4">
        <Select 
          variant="modern"
          size="lg"
          color="success"
          searchable
          clearable
          multiple
          bind:value={multipleValue}
          options={groupedOptions}
          label="Advanced Select"
          description="A select with all features enabled"
          placeholder="Try searching, selecting multiple items..."
        />
      </div>
    </ComponentPreview>
  </section>

  <!-- States -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">States</h2>
    
    <ComponentPreview
      title="Select States"
      description="Different states: normal, disabled, error"
      code={`<Select bind:value options={basicOptions} placeholder="Normal state" />
<Select disabled options={basicOptions} placeholder="Disabled state" />
<Select error="This field is required" bind:value options={basicOptions} placeholder="Error state" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Select bind:value={basicValue} options={basicOptions} placeholder="Normal state" />
        <Select disabled options={basicOptions} placeholder="Disabled state" />
        <Select error="This field is required" bind:value={basicValue} options={basicOptions} placeholder="Error state" />
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string | string[]</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">''</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Selected value(s)</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">options</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">SelectOption[]</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">[]</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Array of options to display</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">multiple</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Allow multiple selections</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">searchable</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Enable search functionality</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">clearable</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Show clear button</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">variant</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">SelectVariant</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'standard'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Visual variant</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
