<script lang="ts">
  import { Toggle } from '$lib/components/Toggle';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // State management for different example groups
  let basicToggle = false;
  let labelToggle = false;
  let descriptionToggle = false;
  let leftLabelToggle = false;
  let iconToggle = false;
  let notificationToggle = true;
  let darkModeToggle = false;
  let autoSaveToggle = true;
  let analyticsToggle = false;

  // Visual style demos
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

  // Advanced feature demos
  let magicToggle = false;
  let premiumToggle = false;

  // Comprehensive code examples for each smart group
  const fundamentalsExample = `<!-- Basic Toggle -->
<Toggle bind:checked />

<!-- Toggle with Label -->
<Toggle bind:checked label="Enable notifications" />

<!-- Toggle with Description -->
<Toggle 
  bind:checked
  label="Dark Mode"
  description="Switch to dark theme for better night viewing"
/>

<!-- Basic Configuration -->
<Toggle 
  bind:checked
  label="Auto-save documents"
  description="Automatically save your work"
/>`;

  const visualStylesExample = `<!-- Variants -->
<Toggle variant="standard" bind:checked label="Standard" />
<Toggle variant="modern" bind:checked label="Modern" />
<Toggle variant="ios" bind:checked label="iOS Style" />
<Toggle variant="material" bind:checked label="Material Design" />
<Toggle variant="neon" bind:checked label="Neon" />

<!-- Sizes -->
<Toggle size="sm" bind:checked label="Small" />
<Toggle size="md" bind:checked label="Medium (default)" />
<Toggle size="lg" bind:checked label="Large" />
<Toggle size="xl" bind:checked label="Extra Large" />

<!-- Colors -->
<Toggle color="primary" bind:checked label="Primary" />
<Toggle color="success" bind:checked label="Success" />
<Toggle color="warning" bind:checked label="Warning" />
<Toggle color="error" bind:checked label="Error" />`;

  const advancedFeaturesExample = `<!-- Label Positioning -->
<Toggle 
  bind:checked
  label="Auto-save"
  labelPosition="left"
/>

<!-- Toggle with Icons -->
<Toggle 
  bind:checked
  label="Sound"
  showIcons
  checkedIcon="🔊"
  uncheckedIcon="🔇"
/>

<!-- Disabled State -->
<Toggle disabled label="Premium Feature (Upgrade required)" />

<!-- Combined Advanced Features -->
<Toggle 
  variant="neon"
  size="lg"
  color="success"
  showIcons
  checkedIcon="✨"
  uncheckedIcon="💤"
  bind:checked
  label="Magic Mode"
  description="Enable magical features with sparkles"
/>`;

  const realWorldApplicationsExample = `<!-- Settings Panel -->
<div class="space-y-4">
  <Toggle 
    bind:checked 
    label="Push Notifications" 
    description="Receive instant notifications on your device"
  />
  <Toggle 
    bind:checked 
    label="Email Updates" 
    description="Get weekly updates via email"
  />
  <Toggle 
    bind:checked 
    label="Auto-save Documents" 
    description="Automatically save your work every few minutes"
  />
  <Toggle 
    bind:checked 
    label="Enable Analytics" 
    description="Help us improve by sharing anonymous usage data"
  />
</div>

<!-- Dashboard Controls -->
<div class="space-y-3">
  <Toggle variant="modern" color="primary" bind:checked label="Live Updates" />
  <Toggle variant="modern" color="success" bind:checked label="Real-time Sync" />
  <Toggle variant="modern" color="info" bind:checked label="Debug Mode" />
</div>`;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Toggle Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive toggle/switch component with multiple variants, sizes, and platform-specific styles.
    </p>
  </div>

  <!-- Smart Grouped Examples -->
  <ComponentPreview
    title="Toggle Fundamentals & Basic Usage"
    description="Essential toggle functionality including basic controls, labels, descriptions, and fundamental configurations for everyday use cases."
    codeSnippet={fundamentalsExample}
    complexity="Basic"
    features={["basic-toggle", "labels", "descriptions", "fundamentals"]}
  >
    <div class="p-6 space-y-6">
      <!-- Basic Toggle -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Basic Toggle</h3>
        <Toggle bind:checked={basicToggle} />
      </div>

      <!-- Toggle with Label -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">With Label</h3>
        <Toggle bind:checked={labelToggle} label="Enable notifications" />
      </div>

      <!-- Toggle with Description -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">With Description</h3>
        <Toggle 
          bind:checked={descriptionToggle}
          label="Dark Mode"
          description="Switch to dark theme for better night viewing"
        />
      </div>

      <!-- Basic Configuration -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-save Configuration</h3>
        <Toggle 
          bind:checked={autoSaveToggle}
          label="Auto-save documents"
          description="Automatically save your work every few minutes"
        />
      </div>
    </div>
  </ComponentPreview>

  <ComponentPreview
    title="Visual Styles & Customization"
    description="Platform-specific variants, multiple size options, and comprehensive color themes for diverse design requirements and brand consistency."
    codeSnippet={visualStylesExample}
    complexity="Intermediate"
    features={["variants", "sizes", "colors", "theming", "platform-styles"]}
  >
    <div class="p-6 space-y-8">
      <!-- Variants Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Style Variants</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Toggle variant="standard" bind:checked={variantDemos.standard} label="Standard" />
          <Toggle variant="modern" bind:checked={variantDemos.modern} label="Modern" />
          <Toggle variant="ios" bind:checked={variantDemos.ios} label="iOS Style" />
          <Toggle variant="material" bind:checked={variantDemos.material} label="Material Design" />
          <Toggle variant="neon" bind:checked={variantDemos.neon} label="Neon" />
        </div>
      </div>

      <!-- Sizes Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Size Options</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Toggle size="sm" bind:checked={sizeDemos.sm} label="Small" />
          <Toggle size="md" bind:checked={sizeDemos.md} label="Medium (default)" />
          <Toggle size="lg" bind:checked={sizeDemos.lg} label="Large" />
          <Toggle size="xl" bind:checked={sizeDemos.xl} label="Extra Large" />
        </div>
      </div>

      <!-- Colors Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Color Themes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Toggle color="primary" bind:checked={colorDemos.primary} label="Primary" />
          <Toggle color="secondary" bind:checked={colorDemos.secondary} label="Secondary" />
          <Toggle color="success" bind:checked={colorDemos.success} label="Success" />
          <Toggle color="warning" bind:checked={colorDemos.warning} label="Warning" />
          <Toggle color="error" bind:checked={colorDemos.error} label="Error" />
          <Toggle color="info" bind:checked={colorDemos.info} label="Info" />
        </div>
      </div>
    </div>
  </ComponentPreview>

  <ComponentPreview
    title="Advanced Features & Interactions"
    description="Advanced toggle capabilities including label positioning, custom icons, disabled states, and complex feature combinations for sophisticated interfaces."
    codeSnippet={advancedFeaturesExample}
    complexity="Advanced"
    features={["label-positioning", "icons", "disabled-states", "feature-combination", "advanced-ui"]}
  >
    <div class="p-6 space-y-8">
      <!-- Label Positioning -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Label Positioning</h3>
        <div class="space-y-3">
          <Toggle 
            bind:checked={leftLabelToggle}
            label="Left-positioned label"
            labelPosition="left"
          />
          <Toggle 
            bind:checked={autoSaveToggle}
            label="Right-positioned label (default)"
            labelPosition="right"
          />
        </div>
      </div>

      <!-- Icons -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Custom Icons</h3>
        <div class="space-y-3">
          <Toggle 
            bind:checked={iconToggle}
            label="Sound Toggle"
            showIcons
            checkedIcon="🔊"
            uncheckedIcon="🔇"
          />
          <Toggle 
            bind:checked={notificationToggle}
            label="Notifications"
            showIcons
            checkedIcon="🔔"
            uncheckedIcon="🔕"
          />
        </div>
      </div>

      <!-- Disabled State -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Disabled State</h3>
        <Toggle disabled label="Premium Feature (Upgrade required)" />
      </div>

      <!-- Complex Feature Combination -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Feature Showcase</h3>
        <Toggle 
          variant="neon"
          size="lg"
          color="success"
          showIcons
          checkedIcon="✨"
          uncheckedIcon="💤"
          bind:checked={magicToggle}
          label="Magic Mode"
          description="Enable magical features with sparkles and neon effects"
        />
      </div>
    </div>
  </ComponentPreview>

  <ComponentPreview
    title="Real-World Applications & Examples"
    description="Practical toggle implementations for common use cases including settings panels, dashboard controls, and user preference management."
    codeSnippet={realWorldApplicationsExample}
    complexity="Advanced"
    features={["settings-panel", "dashboard-controls", "user-preferences", "real-world-usage", "practical-examples"]}
  >
    <div class="p-6 space-y-8">
      <!-- Settings Panel -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Settings Panel</h3>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
          <Toggle 
            bind:checked={notificationToggle}
            label="Push Notifications" 
            description="Receive instant notifications on your device"
          />
          <Toggle 
            bind:checked={basicToggle}
            label="Email Updates" 
            description="Get weekly updates via email"
          />
          <Toggle 
            bind:checked={autoSaveToggle}
            label="Auto-save Documents" 
            description="Automatically save your work every few minutes"
          />
          <Toggle 
            bind:checked={analyticsToggle}
            label="Enable Analytics" 
            description="Help us improve by sharing anonymous usage data"
          />
        </div>
      </div>

      <!-- Dashboard Controls -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Dashboard Controls</h3>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 space-y-3">
          <Toggle 
            variant="modern" 
            color="primary" 
            bind:checked={notificationToggle}
            label="Live Updates"
            description="Real-time data refresh"
          />
          <Toggle 
            variant="modern" 
            color="success" 
            bind:checked={autoSaveToggle}
            label="Real-time Sync"
            description="Sync data across devices"
          />
          <Toggle 
            variant="modern" 
            color="info" 
            bind:checked={analyticsToggle}
            label="Debug Mode"
            description="Show development information"
          />
        </div>
      </div>

      <!-- User Preferences -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">User Preferences</h3>
        <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3">
          <Toggle 
            variant="ios"
            size="lg"
            bind:checked={darkModeToggle}
            label="Dark Mode"
            description="Switch to dark theme"
          />
          <Toggle 
            variant="ios"
            size="lg"
            bind:checked={premiumToggle}
            label="Premium Features"
            description="Enable advanced functionality"
          />
        </div>
      </div>
    </div>  </ComponentPreview>

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
