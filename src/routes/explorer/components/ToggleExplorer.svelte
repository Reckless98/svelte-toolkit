<script lang="ts">
  import { Toggle } from '$lib/components/Toggle';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  let basicToggle = false;
  let notificationToggle = true;
  let darkModeToggle = false;

  const examples = [
    {
      title: 'Basic Toggle',
      description: 'Simple toggle switch',
      code: `<Toggle bind:checked />`
    },
    {
      title: 'With Label',
      description: 'Toggle with descriptive label',
      code: `<Toggle bind:checked label="Enable notifications" />`
    },
    {
      title: 'With Description',
      description: 'Toggle with additional context',
      code: `<Toggle 
  bind:checked
  label="Dark Mode"
  description="Switch to dark theme for better night viewing"
/>`
    },
    {
      title: 'Label Position',
      description: 'Toggle with label on the left side',
      code: `<Toggle 
  bind:checked
  label="Auto-save"
  labelPosition="left"
/>`
    },
    {
      title: 'With Icons',
      description: 'Toggle with custom icons',
      code: `<Toggle 
  bind:checked
  label="Sound"
  showIcons
  checkedIcon="🔊"
  uncheckedIcon="🔇"
/>`
    },
    {
      title: 'Disabled State',
      description: 'Toggle in disabled state',
      code: `<Toggle disabled label="Premium Feature (Upgrade required)" />`
    }
  ];

  let variantDemos = {
    standard: false,
    modern: false,
    ios: false,
    material: false,
    neon: false
  };

  let sizeDemos = {
    sm: false,
    md: false,
    lg: false,
    xl: false
  };

  let colorDemos = {
    primary: false,
    secondary: false,
    success: false,
    warning: false,
    error: false,
    info: false
  };
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Toggle Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive toggle/switch component with multiple variants, sizes, and platform-specific styles.
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
            <Toggle bind:checked={basicToggle} />
          {:else if index === 1}
            <Toggle bind:checked={notificationToggle} label="Enable notifications" />
          {:else if index === 2}
            <Toggle 
              bind:checked={darkModeToggle}
              label="Dark Mode"
              description="Switch to dark theme for better night viewing"
            />
          {:else if index === 3}
            <Toggle 
              bind:checked={basicToggle}
              label="Auto-save"
              labelPosition="left"
            />
          {:else if index === 4}
            <Toggle 
              bind:checked={basicToggle}
              label="Sound"
              showIcons
              checkedIcon="🔊"
              uncheckedIcon="🔇"
            />
          {:else if index === 5}
            <Toggle disabled label="Premium Feature (Upgrade required)" />
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Toggle Variants"
      description="Different platform and design styles"
      code={`<Toggle variant="standard" bind:checked label="Standard" />
<Toggle variant="modern" bind:checked label="Modern" />
<Toggle variant="ios" bind:checked label="iOS Style" />
<Toggle variant="material" bind:checked label="Material Design" />
<Toggle variant="neon" bind:checked label="Neon" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Toggle variant="standard" bind:checked={variantDemos.standard} label="Standard toggle" />
        <Toggle variant="modern" bind:checked={variantDemos.modern} label="Modern toggle" />
        <Toggle variant="ios" bind:checked={variantDemos.ios} label="iOS style toggle" />
        <Toggle variant="material" bind:checked={variantDemos.material} label="Material Design toggle" />
        <Toggle variant="neon" bind:checked={variantDemos.neon} label="Neon toggle" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Sizes</h2>
    
    <ComponentPreview
      title="Toggle Sizes"
      description="Available size options: sm, md, lg, xl"
      code={`<Toggle size="sm" bind:checked label="Small" />
<Toggle size="md" bind:checked label="Medium (default)" />
<Toggle size="lg" bind:checked label="Large" />
<Toggle size="xl" bind:checked label="Extra Large" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Toggle size="sm" bind:checked={sizeDemos.sm} label="Small toggle" />
        <Toggle size="md" bind:checked={sizeDemos.md} label="Medium toggle (default)" />
        <Toggle size="lg" bind:checked={sizeDemos.lg} label="Large toggle" />
        <Toggle size="xl" bind:checked={sizeDemos.xl} label="Extra large toggle" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Colors -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Colors</h2>
    
    <ComponentPreview
      title="Color Themes"
      description="Different color themes for various contexts"
      code={`<Toggle color="primary" bind:checked label="Primary" />
<Toggle color="secondary" bind:checked label="Secondary" />
<Toggle color="success" bind:checked label="Success" />
<Toggle color="warning" bind:checked label="Warning" />
<Toggle color="error" bind:checked label="Error" />
<Toggle color="info" bind:checked label="Info" />`}
    >
      <div slot="preview" class="p-4 space-y-4">
        <Toggle color="primary" bind:checked={colorDemos.primary} label="Primary theme" />
        <Toggle color="secondary" bind:checked={colorDemos.secondary} label="Secondary theme" />
        <Toggle color="success" bind:checked={colorDemos.success} label="Success theme" />
        <Toggle color="warning" bind:checked={colorDemos.warning} label="Warning theme" />
        <Toggle color="error" bind:checked={colorDemos.error} label="Error theme" />
        <Toggle color="info" bind:checked={colorDemos.info} label="Info theme" />
      </div>
    </ComponentPreview>
  </section>

  <!-- Advanced Features -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Advanced Features</h2>
    
    <ComponentPreview
      title="Feature Showcase"
      description="Combining multiple features"
      code={`<Toggle 
  variant="neon"
  size="lg"
  color="success"
  showIcons
  checkedIcon="✨"
  uncheckedIcon="💤"
  bind:checked
  label="Magic Mode"
  description="Enable magical features with sparkles"
/>`}
    >
      <div slot="preview" class="p-4">
        <Toggle 
          variant="neon"
          size="lg"
          color="success"
          showIcons
          checkedIcon="✨"
          uncheckedIcon="💤"
          bind:checked={basicToggle}
          label="Magic Mode"
          description="Enable magical features with sparkles"
        />
      </div>
    </ComponentPreview>
  </section>

  <!-- Real-world Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Real-world Examples</h2>
    
    <ComponentPreview
      title="Settings Panel"
      description="Toggle switches in a typical settings interface"
      code={`<div class="space-y-4">
  <Toggle bind:checked label="Push Notifications" />
  <Toggle bind:checked label="Email Updates" />
  <Toggle bind:checked label="Auto-save Documents" />
  <Toggle bind:checked label="Enable Analytics" />
</div>`}
    >
      <div slot="preview" class="p-4">
        <div class="space-y-4">
          <Toggle bind:checked={notificationToggle} label="Push Notifications" description="Receive instant notifications on your device" />
          <Toggle bind:checked={basicToggle} label="Email Updates" description="Get weekly updates via email" />
          <Toggle bind:checked={darkModeToggle} label="Auto-save Documents" description="Automatically save your work every few minutes" />
          <Toggle bind:checked={basicToggle} label="Enable Analytics" description="Help us improve by sharing anonymous usage data" />
        </div>
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
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether the toggle is on/off</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">label</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">''</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Label text for the toggle</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">variant</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">ToggleVariant</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'standard'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Visual style variant</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">labelPosition</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">ToggleLabelPosition</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'right'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Position of the label</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">showIcons</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Show icons on the toggle</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">checkedIcon</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'✓'</td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Icon when checked</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
