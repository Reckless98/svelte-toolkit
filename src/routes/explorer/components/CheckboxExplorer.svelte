<script lang="ts">
  import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
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
      codeSnippet: `<Checkbox bind:checked label="Accept terms and conditions" />`
    },
    {
      title: 'With Description',
      description: 'Checkbox with additional description text',      codeSnippet: `<Checkbox 
  bind:checked
  label="Enable notifications"
  description="Receive email updates about your account"
/>`
    },
    {
      title: 'Indeterminate State',
      description: 'Checkbox in indeterminate state for "select all" functionality',
      codeSnippet: `<Checkbox bind:indeterminate label="Select all items" />`
    },
    {
      title: 'Disabled State',
      description: 'Disabled checkbox that cannot be interacted with',
      codeSnippet: `<Checkbox disabled label="Disabled option" />`
    },
    {
      title: 'Error State',
      description: 'Checkbox with error message',
      codeSnippet: `<Checkbox 
  bind:checked
  error="This field is required"
  label="Required field"
/>`
    },
    {
      title: 'Required Field',
      description: 'Checkbox marked as required with validation',
      codeSnippet: `<Checkbox 
  required
  bind:checked
  label="I agree to the terms"
/>`
    }
  ];

  // Comprehensive code examples for each section
  const basicsAndStatesExample = `<!-- Basic Checkbox Usage and States -->
<Checkbox bind:checked label="Accept terms and conditions" />
<Checkbox bind:checked label="Enable notifications" description="Receive email updates" />
<Checkbox bind:indeterminate label="Select all items" />
<Checkbox disabled label="Disabled option" />
<Checkbox error="This field is required" label="Required field" />
<Checkbox required bind:checked label="I agree to the terms" />`;

  const variantsAndSizesExample = `<!-- All Variants with Different Sizes -->
<Checkbox variant="standard" size="sm" label="Standard Small" />
<Checkbox variant="outlined" size="md" label="Outlined Medium" />
<Checkbox variant="filled" size="lg" label="Filled Large" />
<Checkbox variant="modern" size="xl" label="Modern Extra Large" />
<Checkbox variant="neon" label="Neon Effect" />
<Checkbox variant="glass" label="Glass Effect" />`;

  const colorsAndAnimationsExample = `<!-- Colors and Animations -->
<Checkbox color="primary" animation="scale" label="Primary with Scale" />
<Checkbox color="success" animation="bounce" label="Success with Bounce" />
<Checkbox color="error" animation="slide" label="Error with Slide" />
<Checkbox color="warning" animation="none" label="Warning No Animation" />`;  const advancedExample = `<!-- Advanced Checkbox Features -->
<!-- JavaScript logic would go here -->
let formData = {
  terms: false,
  newsletter: false,
  privacy: false
};

// Reactive validation  
$: allAccepted = formData.terms && formData.newsletter && formData.privacy;

<!-- Advanced checkbox with all features -->
<Checkbox 
  variant="modern"
  size="lg"
  color="success"
  animation="bounce"
  bind:checked={formData.terms}
  label="Premium Feature"
  description="Unlock advanced functionality"
/>

<!-- Checkbox Group with Validation -->
<div class="space-y-2">
  <Checkbox bind:checked={formData.terms} label="Accept Terms" required />
  <Checkbox bind:checked={formData.newsletter} label="Subscribe to Newsletter" />
  <Checkbox bind:checked={formData.privacy} label="Accept Privacy Policy" required />
</div>`;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkbox Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive checkbox component with multiple variants, sizes, animations, and accessibility features.
    </p>
  </div>
  <!-- Basic Examples -->
  <ComponentPreview 
    title="Checkbox Basics & States" 
    description="Essential checkbox functionality including basic usage, states, and validation features"
    complexity="Basic"
    features={["Basic Usage", "States", "Validation", "Accessibility"]}
    codeSnippet={basicsAndStatesExample}
  >
    <div class="space-y-8">
      <!-- Basic Usage -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Basic Usage</h3>
        <div class="space-y-4">
          <Checkbox bind:checked={basicChecked} label="Accept terms and conditions" />
          <Checkbox 
            bind:checked={basicChecked}
            label="Enable notifications"
            description="Receive email updates about your account"
          />
        </div>
      </div>

      <!-- Different States -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Checkbox States</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox bind:indeterminate={indeterminateState} label="Indeterminate state" />
          <Checkbox disabled label="Disabled checkbox" />
          <Checkbox 
            bind:checked={basicChecked}
            error="This field is required"
            label="Error state"
          />
          <Checkbox 
            required
            bind:checked={basicChecked}
            label="Required field"
          />
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Variants and Sizes -->
  <ComponentPreview 
    title="Variants & Sizes" 
    description="All visual variants and size options with combination examples"
    complexity="Basic"
    features={["Visual Variants", "Size Options", "Combinations"]}
    codeSnippet={variantsAndSizesExample}
  >
    <div class="space-y-8">
      <!-- Sizes -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Size Variations</h3>
        <div class="space-y-4">
          <Checkbox size="sm" bind:checked={sizeDemos.sm} label="Small checkbox" />
          <Checkbox size="md" bind:checked={sizeDemos.md} label="Medium checkbox (default)" />
          <Checkbox size="lg" bind:checked={sizeDemos.lg} label="Large checkbox" />
          <Checkbox size="xl" bind:checked={sizeDemos.xl} label="Extra large checkbox" />
        </div>
      </div>

      <!-- Variants -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Visual Variants</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox variant="standard" bind:checked={variantDemos.standard} label="Standard checkbox" />
          <Checkbox variant="outlined" bind:checked={variantDemos.outlined} label="Outlined checkbox" />
          <Checkbox variant="filled" bind:checked={variantDemos.filled} label="Filled checkbox" />
          <Checkbox variant="modern" bind:checked={variantDemos.modern} label="Modern checkbox" />
          <Checkbox variant="neon" bind:checked={variantDemos.neon} label="Neon checkbox" />
          <Checkbox variant="glass" bind:checked={variantDemos.glass} label="Glass checkbox" />
        </div>
      </div>

      <!-- Size + Variant Combinations -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Combinations</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox variant="modern" size="lg" bind:checked={basicChecked} label="Large Modern" />
          <Checkbox variant="outlined" size="sm" bind:checked={basicChecked} label="Small Outlined" />
          <Checkbox variant="filled" size="xl" bind:checked={basicChecked} label="XL Filled" />
          <Checkbox variant="neon" size="md" bind:checked={basicChecked} label="Medium Neon" />
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Colors and Animations -->
  <ComponentPreview 
    title="Colors & Animations" 
    description="Color themes and animation effects for enhanced user interaction"
    complexity="Intermediate"
    features={["Color Themes", "Animations", "Interactive Effects"]}
    codeSnippet={colorsAndAnimationsExample}
  >
    <div class="space-y-8">
      <!-- Colors -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Color Themes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Checkbox color="primary" bind:checked={colorDemos.primary} label="Primary theme" />
          <Checkbox color="secondary" bind:checked={colorDemos.secondary} label="Secondary theme" />
          <Checkbox color="success" bind:checked={colorDemos.success} label="Success theme" />
          <Checkbox color="warning" bind:checked={colorDemos.warning} label="Warning theme" />
          <Checkbox color="error" bind:checked={colorDemos.error} label="Error theme" />
          <Checkbox color="info" bind:checked={colorDemos.info} label="Info theme" />
        </div>
      </div>

      <!-- Animations -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Animation Effects</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox animation="none" bind:checked={animationDemos.none} label="No animation" />
          <Checkbox animation="scale" bind:checked={animationDemos.scale} label="Scale animation (default)" />
          <Checkbox animation="bounce" bind:checked={animationDemos.bounce} label="Bounce animation" />
          <Checkbox animation="slide" bind:checked={animationDemos.slide} label="Slide animation" />
        </div>
      </div>

      <!-- Color + Animation Combinations -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Enhanced Combinations</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox color="success" animation="bounce" size="lg" bind:checked={basicChecked} label="Success with Bounce" />
          <Checkbox color="error" animation="scale" variant="modern" bind:checked={basicChecked} label="Error Modern Scale" />
          <Checkbox color="info" animation="slide" variant="outlined" bind:checked={basicChecked} label="Info Outlined Slide" />
          <Checkbox color="warning" animation="none" variant="filled" bind:checked={basicChecked} label="Warning Filled Static" />
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Advanced Usage -->
  <ComponentPreview 
    title="Advanced Features & Implementation" 
    description="Complex checkbox implementations with forms, validation, and advanced patterns"
    complexity="Advanced"
    features={["Form Integration", "Advanced Validation", "Complex Patterns"]}
    codeSnippet={advancedExample}
  >
    <div class="space-y-8">
      <!-- Advanced Single Checkbox -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Premium Checkbox Example</h3>
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
      </div>

      <!-- Checkbox Groups -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Checkbox Groups</h3>
        <div class="space-y-6">
          <!-- Terms & Conditions Group -->
          <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-4 text-gray-700 dark:text-gray-300">Account Settings</h4>
            <div class="space-y-3">
              <Checkbox 
                color="primary" 
                bind:checked={basicChecked} 
                label="Accept Terms and Conditions" 
                required 
              />
              <Checkbox 
                color="info" 
                bind:checked={variantDemos.standard} 
                label="Subscribe to newsletter" 
                description="Get weekly updates about new features"
              />
              <Checkbox 
                color="success" 
                bind:checked={variantDemos.filled} 
                label="Enable two-factor authentication" 
                description="Enhanced security for your account"
              />
            </div>
          </div>

          <!-- Permission Group -->
          <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-4 text-gray-700 dark:text-gray-300">Permissions</h4>
            <div class="space-y-3">
              <Checkbox 
                variant="modern"
                color="warning" 
                bind:checked={colorDemos.warning} 
                label="Allow location access" 
                description="Used for location-based features"
              />
              <Checkbox 
                variant="modern"
                color="info" 
                bind:checked={colorDemos.info} 
                label="Enable push notifications" 
                description="Receive important updates"
              />
              <Checkbox 
                variant="modern"
                color="error" 
                bind:checked={colorDemos.error} 
                label="Share usage analytics" 
                description="Help us improve the product"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Implementation Examples -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Code Implementation</h3>
        <div class="space-y-4">
          <div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <h4 class="text-green-400 font-medium mb-3">Basic Implementation</h4>
            <pre><code>{`<Checkbox bind:checked label="Accept terms" />`}</code></pre>
          </div>

          <div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <h4 class="text-blue-400 font-medium mb-3">Advanced Checkbox</h4>
            <pre><code>{`<Checkbox 
  variant="modern"
  size="lg"
  color="success"
  animation="bounce"
  bind:checked={isEnabled}
  label="Premium Feature"
  description="Enhanced functionality"
  required
/>`}</code></pre>
          </div>

          <div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <h4 class="text-purple-400 font-medium mb-3">Form Integration</h4>            <pre><code>{`&lt;script&gt;
  let formData = {
    terms: false,
    newsletter: false,
    privacy: false
  };
  
  $: isValid = formData.terms && formData.privacy;
&lt;/script&gt;

<form class="space-y-4">
  <Checkbox 
    bind:checked={formData.terms}
    label="Accept Terms"
    required
    error={!formData.terms ? 'Required' : ''}
  />
  <Checkbox 
    bind:checked={formData.newsletter}
    label="Subscribe"
  />
  <Checkbox 
    bind:checked={formData.privacy}
    label="Privacy Policy"
    required
    error={!formData.privacy ? 'Required' : ''}
  />
</form>`}</code></pre>
          </div>
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
