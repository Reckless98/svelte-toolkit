<script lang="ts">
  import { Dropdown } from '$lib/components/Dropdown';
  import { Button } from '$lib/components/Button';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  let selectedItem = null;
  let selectedMultiple = [];
  let searchableSelected = null;
  let groupedSelected = null;

  const basicItems = [
    { id: '1', label: 'Option 1', value: 'option1' },
    { id: '2', label: 'Option 2', value: 'option2' },
    { id: '3', label: 'Option 3', value: 'option3' },
    { id: '4', label: 'Option 4', value: 'option4' }
  ];

  const itemsWithIcons = [
    { id: '1', label: 'Home', value: 'home', icon: '🏠' },
    { id: '2', label: 'Profile', value: 'profile', icon: '👤' },
    { id: '3', label: 'Settings', value: 'settings', icon: '⚙️' },
    { id: '4', label: 'Logout', value: 'logout', icon: '🚪' }
  ];

  const groupedItems = [
    {
      group: 'Fruits',
      items: [
        { id: 'apple', label: 'Apple', value: 'apple' },
        { id: 'banana', label: 'Banana', value: 'banana' },
        { id: 'orange', label: 'Orange', value: 'orange' }
      ]
    },
    {
      group: 'Vegetables',
      items: [
        { id: 'carrot', label: 'Carrot', value: 'carrot' },
        { id: 'broccoli', label: 'Broccoli', value: 'broccoli' },
        { id: 'spinach', label: 'Spinach', value: 'spinach' }
      ]
    }
  ];

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple dropdown with basic items',
      code: `<Dropdown 
  items={basicItems} 
  bind:selected={selectedItem}
  placeholder="Select an option"
/>`
    },
    {
      title: 'With Icons',
      description: 'Dropdown items with icons for better visual hierarchy',
      code: `<Dropdown 
  items={itemsWithIcons} 
  bind:selected={selectedItem}
  placeholder="Choose action"
/>`
    },
    {
      title: 'Searchable',
      description: 'Dropdown with search functionality to filter items',
      code: `<Dropdown 
  items={basicItems} 
  bind:selected={searchableSelected}
  searchable
  placeholder="Search options..."
/>`
    },
    {
      title: 'Multiple Selection',
      description: 'Allow selecting multiple items at once',
      code: `<Dropdown 
  items={basicItems} 
  bind:selected={selectedMultiple}
  multiple
  placeholder="Select multiple options"
/>`
    },
    {
      title: 'Grouped Items',
      description: 'Organize items into logical groups',
      code: `<Dropdown 
  items={groupedItems} 
  bind:selected={groupedSelected}
  placeholder="Select from groups"
/>`
    },
    {
      title: 'Disabled State',
      description: 'Dropdown in disabled state',
      code: `<Dropdown 
  items={basicItems} 
  disabled
  placeholder="Disabled dropdown"
/>`
    }
  ];

  const variants = ['default', 'outlined', 'filled', 'modern', 'minimal'];
  const sizes = ['sm', 'md', 'lg'];
  const positions = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dropdown Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A comprehensive dropdown component with search, multiple selection, grouping, and extensive customization options.
    </p>
  </div>

  <!-- Basic Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Examples</h2>
    
    {#each examples as example, index}
      <ComponentPreview
        title={example.title}
        description={example.description}
        codeSnippet={example.code}
      >
        <div slot="preview" class="p-8 flex justify-center">
          <div class="w-64">
            {#if index === 0}
              <Dropdown 
                items={basicItems} 
                bind:selected={selectedItem}
                placeholder="Select an option"
              />
            {:else if index === 1}
              <Dropdown 
                items={itemsWithIcons} 
                bind:selected={selectedItem}
                placeholder="Choose action"
              />
            {:else if index === 2}
              <Dropdown 
                items={basicItems} 
                bind:selected={searchableSelected}
                searchable
                placeholder="Search options..."
              />
            {:else if index === 3}
              <Dropdown 
                items={basicItems} 
                bind:selected={selectedMultiple}
                multiple
                placeholder="Select multiple options"
              />
            {:else if index === 4}
              <Dropdown 
                items={groupedItems} 
                bind:selected={groupedSelected}
                placeholder="Select from groups"
              />
            {:else if index === 5}
              <Dropdown 
                items={basicItems} 
                disabled
                placeholder="Disabled dropdown"
              />
            {/if}
          </div>
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Dropdown Variants"
      description="Different visual styles for various design contexts"
      codeSnippet={`<Dropdown variant="default" items={items} placeholder="Default" />
<Dropdown variant="outlined" items={items} placeholder="Outlined" />
<Dropdown variant="filled" items={items} placeholder="Filled" />
<Dropdown variant="modern" items={items} placeholder="Modern" />
<Dropdown variant="minimal" items={items} placeholder="Minimal" />`}
    >
      <div slot="preview" class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each variants as variant}
          <div class="w-full">
            <label class="block text-sm font-medium mb-2 capitalize">{variant}</label>
            <Dropdown 
              {variant}
              items={basicItems} 
              placeholder="{variant} style"
            />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Sizes</h2>
    
    <ComponentPreview
      title="Dropdown Sizes"
      description="Available size options: sm, md, lg"
      codeSnippet={`<Dropdown size="sm" items={items} placeholder="Small" />
<Dropdown size="md" items={items} placeholder="Medium" />
<Dropdown size="lg" items={items} placeholder="Large" />`}
    >
      <div slot="preview" class="p-8 space-y-4">
        {#each sizes as size}
          <div class="w-64">
            <label class="block text-sm font-medium mb-2 capitalize">{size}</label>
            <Dropdown 
              {size}
              items={basicItems} 
              placeholder="{size} dropdown"
            />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Positioning -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Positioning</h2>
    
    <ComponentPreview
      title="Dropdown Positioning"
      description="Control where the dropdown menu appears relative to the trigger"
      codeSnippet={`<Dropdown position="bottom-start" items={items} placeholder="Bottom Start" />
<Dropdown position="bottom-end" items={items} placeholder="Bottom End" />
<Dropdown position="top-start" items={items} placeholder="Top Start" />
<Dropdown position="top-end" items={items} placeholder="Top End" />`}
    >
      <div slot="preview" class="p-16 grid grid-cols-2 gap-8">
        {#each positions as position}
          <div class="w-48">
            <label class="block text-sm font-medium mb-2">{position}</label>
            <Dropdown 
              {position}
              items={basicItems} 
              placeholder={position}
            />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Advanced Features -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Advanced Features</h2>
    
    <ComponentPreview
      title="Loading State"
      description="Show loading indicator while fetching data"
      codeSnippet={`<Dropdown 
  items={[]}
  loading
  placeholder="Loading options..."
/>`}
    >
      <div slot="preview" class="p-8 flex justify-center">
        <div class="w-64">
          <Dropdown 
            items={[]}
            loading
            placeholder="Loading options..."
          />
        </div>
      </div>
    </ComponentPreview>
    
    <ComponentPreview
      title="Error State"
      description="Display error message when something goes wrong"
      codeSnippet={`<Dropdown 
  items={basicItems}
  error="Something went wrong"
  placeholder="Select option"
/>`}
    >
      <div slot="preview" class="p-8 flex justify-center">
        <div class="w-64">
          <Dropdown 
            items={basicItems}
            error="Something went wrong"
            placeholder="Select option"
          />
        </div>
      </div>
    </ComponentPreview>
    
    <ComponentPreview
      title="Custom Empty State"
      description="Customize the message when no items are available"
      codeSnippet={`<Dropdown 
  items={[]}
  emptyMessage="No options available"
  placeholder="Empty dropdown"
/>`}
    >
      <div slot="preview" class="p-8 flex justify-center">
        <div class="w-64">
          <Dropdown 
            items={[]}
            emptyMessage="No options available at this time"
            placeholder="Empty dropdown"
          />
        </div>
      </div>
    </ComponentPreview>
  </section>
</div>
