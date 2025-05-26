<script lang="ts">
  import { Select } from '$lib/components/Select';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // State management for different demo groups
  let basicValue = '';
  let multipleValue: string[] = [];
  let searchableValue = '';
  let groupedValue = '';
  let clearableValue = '';
  let labeledValue = '';
  let advancedValue: string[] = [];

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

  // State demos
  let normalValue = '';
  let errorValue = '';

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

  // Comprehensive code examples for each smart group
  const fundamentalsExample = `<!-- Basic Select -->
<Select bind:value options={basicOptions} placeholder="Choose an option..." />

<!-- Multiple Selection -->
<Select multiple bind:value options={basicOptions} placeholder="Choose multiple..." />

<!-- Searchable Select -->
<Select searchable bind:value options={basicOptions} placeholder="Search and select..." />

<!-- With Label and Description -->
<Select 
  bind:value
  options={basicOptions}
  label="Preferred Option"
  description="Choose your preferred option from the list"
/>`;

  const visualStylesExample = `<!-- Variants -->
<Select variant="standard" bind:value options={basicOptions} placeholder="Standard" />
<Select variant="outlined" bind:value options={basicOptions} placeholder="Outlined" />
<Select variant="filled" bind:value options={basicOptions} placeholder="Filled" />
<Select variant="modern" bind:value options={basicOptions} placeholder="Modern" />
<Select variant="glass" bind:value options={basicOptions} placeholder="Glass" />

<!-- Sizes -->
<Select size="sm" bind:value options={basicOptions} placeholder="Small" />
<Select size="md" bind:value options={basicOptions} placeholder="Medium" />
<Select size="lg" bind:value options={basicOptions} placeholder="Large" />
<Select size="xl" bind:value options={basicOptions} placeholder="Extra Large" />

<!-- Colors -->
<Select color="primary" bind:value options={basicOptions} placeholder="Primary" />
<Select color="success" bind:value options={basicOptions} placeholder="Success" />
<Select color="warning" bind:value options={basicOptions} placeholder="Warning" />
<Select color="error" bind:value options={basicOptions} placeholder="Error" />`;

  const advancedFeaturesExample = `<!-- Grouped Options -->
<Select bind:value options={groupedOptions} placeholder="Select from groups..." />

<!-- Clearable Select -->
<Select clearable bind:value options={basicOptions} placeholder="Clearable select..." />

<!-- Combined Advanced Features -->
<Select 
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
  placeholder="Try searching, selecting multiple items..."
/>`;

  const statesValidationExample = `<!-- Normal State -->
<Select bind:value options={basicOptions} placeholder="Normal state" />

<!-- Disabled State -->
<Select disabled options={basicOptions} placeholder="Disabled state" />

<!-- Error State -->
<Select 
  error="This field is required" 
  bind:value 
  options={basicOptions} 
  placeholder="Error state" 
/>

<!-- Required Field with Validation -->
<Select 
  bind:value 
  options={basicOptions} 
  label="Required Field" 
  description="This field must be selected"
  required
  placeholder="Please select an option"
/>`;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Select Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive select component with search, multiple selection, grouping, and accessibility features.
    </p>
  </div>

  <!-- Smart Grouped Examples -->
  <ComponentPreview
    title="Select Fundamentals & Basic Usage"
    description="Essential select functionality including basic dropdowns, multiple selections, search capabilities, and fundamental configurations for common use cases."
    codeSnippet={fundamentalsExample}
    complexity="Basic"
    features={["basic-select", "multiple-selection", "searchable", "labels", "fundamentals"]}
  >
    <div class="p-6 space-y-6">
      <!-- Basic Select -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Basic Select</h3>
        <Select bind:value={basicValue} options={basicOptions} placeholder="Choose an option..." />
      </div>

      <!-- Multiple Selection -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Multiple Selection</h3>
        <Select multiple bind:value={multipleValue} options={basicOptions} placeholder="Choose multiple..." />
      </div>

      <!-- Searchable Select -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Searchable Select</h3>
        <Select searchable bind:value={searchableValue} options={basicOptions} placeholder="Search and select..." />
      </div>

      <!-- With Label and Description -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">With Label & Description</h3>
        <Select 
          bind:value={labeledValue}
          options={basicOptions}
          label="Preferred Option"
          description="Choose your preferred option from the list"
        />
      </div>
    </div>
  </ComponentPreview>

  <ComponentPreview
    title="Visual Styles & Customization"
    description="Comprehensive visual styling options including platform-specific variants, multiple sizes, and color themes for diverse design requirements and brand consistency."
    codeSnippet={visualStylesExample}
    complexity="Intermediate"
    features={["variants", "sizes", "colors", "theming", "visual-styles"]}
  >
    <div class="p-6 space-y-8">
      <!-- Variants Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Visual Variants</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select variant="standard" bind:value={variantDemos.standard} options={basicOptions} placeholder="Standard" />
          <Select variant="outlined" bind:value={variantDemos.outlined} options={basicOptions} placeholder="Outlined" />
          <Select variant="filled" bind:value={variantDemos.filled} options={basicOptions} placeholder="Filled" />
          <Select variant="modern" bind:value={variantDemos.modern} options={basicOptions} placeholder="Modern" />
          <Select variant="glass" bind:value={variantDemos.glass} options={basicOptions} placeholder="Glass" />
        </div>
      </div>

      <!-- Sizes Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Size Options</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select size="sm" bind:value={sizeDemos.sm} options={basicOptions} placeholder="Small" />
          <Select size="md" bind:value={sizeDemos.md} options={basicOptions} placeholder="Medium (default)" />
          <Select size="lg" bind:value={sizeDemos.lg} options={basicOptions} placeholder="Large" />
          <Select size="xl" bind:value={sizeDemos.xl} options={basicOptions} placeholder="Extra Large" />
        </div>
      </div>

      <!-- Colors Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Color Themes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select color="primary" bind:value={colorDemos.primary} options={basicOptions} placeholder="Primary" />
          <Select color="secondary" bind:value={colorDemos.secondary} options={basicOptions} placeholder="Secondary" />
          <Select color="success" bind:value={colorDemos.success} options={basicOptions} placeholder="Success" />
          <Select color="warning" bind:value={colorDemos.warning} options={basicOptions} placeholder="Warning" />
          <Select color="error" bind:value={colorDemos.error} options={basicOptions} placeholder="Error" />
          <Select color="info" bind:value={colorDemos.info} options={basicOptions} placeholder="Info" />
        </div>
      </div>
    </div>
  </ComponentPreview>

  <ComponentPreview
    title="Advanced Features & Functionality"
    description="Advanced select capabilities including grouped options, clearable functionality, and complex feature combinations for sophisticated user interfaces."
    codeSnippet={advancedFeaturesExample}
    complexity="Advanced"
    features={["grouped-options", "clearable", "feature-combination", "advanced-functionality"]}
  >
    <div class="p-6 space-y-8">
      <!-- Grouped Options -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Grouped Options</h3>
        <Select bind:value={groupedValue} options={groupedOptions} placeholder="Select from categorized groups..." />
      </div>

      <!-- Clearable Select -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Clearable Functionality</h3>
        <Select clearable bind:value={clearableValue} options={basicOptions} placeholder="Clearable select with X button..." />
      </div>

      <!-- Combined Advanced Features -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Feature Showcase</h3>
        <Select 
          variant="modern"
          size="lg"
          color="success"
          searchable
          clearable
          multiple
          bind:value={advancedValue}
          options={groupedOptions}
          label="Advanced Select"
          description="A select demonstrating all features: search, multiple selection, grouping, and clearable functionality"
          placeholder="Try searching, selecting multiple items..."
        />
      </div>
    </div>
  </ComponentPreview>

  <ComponentPreview
    title="States & Validation"
    description="Comprehensive state management including normal, disabled, error states, and validation patterns for form integration and user feedback."
    codeSnippet={statesValidationExample}
    complexity="Advanced"
    features={["states", "validation", "error-handling", "form-integration", "accessibility"]}
  >
    <div class="p-6 space-y-8">
      <!-- Basic States -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Component States</h3>        <div class="space-y-3">
          <div class="space-y-1">
            <div class="text-sm text-gray-600 dark:text-gray-400">Normal State</div>
            <Select bind:value={normalValue} options={basicOptions} placeholder="Normal state" />
          </div>
          
          <div class="space-y-1">
            <div class="text-sm text-gray-600 dark:text-gray-400">Disabled State</div>
            <Select disabled options={basicOptions} placeholder="Disabled state" />
          </div>
          
          <div class="space-y-1">
            <div class="text-sm text-gray-600 dark:text-gray-400">Error State</div>
            <Select error="This field is required" bind:value={errorValue} options={basicOptions} placeholder="Error state" />
          </div>
        </div>
      </div>

      <!-- Form Integration -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Form Integration</h3>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
          <Select 
            bind:value={basicValue}
            options={basicOptions}
            label="Required Field" 
            description="This field must be selected to continue"
            placeholder="Please select an option"
            required
          />
          <Select 
            multiple
            bind:value={multipleValue}
            options={groupedOptions}
            label="Multi-select Field" 
            description="You can select multiple items from different categories"
            placeholder="Select one or more options"
          />
        </div>
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
