<script lang="ts">
  import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import ComponentPreview from '../ComponentPreview.svelte';
  import type { DropdownItem, DropdownVariant, DropdownSize, DropdownPosition } from '$lib/components/Dropdown';
  
  // Properly typed variables for dropdown selections
  let selectedItem: DropdownItem | null = null;
  let selectedMultiple: DropdownItem[] = [];
  let searchableSelected: DropdownItem | null = null;
  let groupedSelected: DropdownItem | null = null;
  const basicItems: DropdownItem[] = [
    { id: '1', label: 'Option 1', value: 'option1' },
    { id: '2', label: 'Option 2', value: 'option2' },
    { id: '3', label: 'Option 3', value: 'option3' },
    { id: '4', label: 'Option 4', value: 'option4' }
  ];

  const itemsWithIcons: DropdownItem[] = [
    { id: '1', label: 'Home', value: 'home', icon: '🏠' },
    { id: '2', label: 'Profile', value: 'profile', icon: '👤' },
    { id: '3', label: 'Settings', value: 'settings', icon: '⚙️' },
    { id: '4', label: 'Logout', value: 'logout', icon: '🚪' }
  ];

  // Flattened grouped items for dropdown usage
  const groupedItems: DropdownItem[] = [
    { id: 'apple', label: 'Apple', value: 'apple' },
    { id: 'banana', label: 'Banana', value: 'banana' },
    { id: 'orange', label: 'Orange', value: 'orange' },
    { id: 'carrot', label: 'Carrot', value: 'carrot' },
    { id: 'broccoli', label: 'Broccoli', value: 'broccoli' },
    { id: 'spinach', label: 'Spinach', value: 'spinach' }
  ];
  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple dropdown with basic items',
      codeSnippet: `<Dropdown 
  items={basicItems} 
  on:select={(e) => selectedItem = e.detail.item}
  placeholder="Select an option"
/>`
    },
    {
      title: 'With Icons',
      description: 'Dropdown items with icons',
      codeSnippet: `<Dropdown 
  items={itemsWithIcons}
  on:select={(e) => selectedItem = e.detail.item}
/>`
    },
    {
      title: 'Searchable',
      description: 'Dropdown with search functionality',
      codeSnippet: `<Dropdown 
  items={basicItems}
  searchable
  on:select={(e) => searchableSelected = e.detail.item}
  placeholder="Search items..."
/>`
    },
    {
      title: 'Multiple Positions',
      description: 'Different dropdown positions',
      codeSnippet: `<Dropdown 
  items={basicItems}
  position="top-end"
  on:select={(e) => selectedItem = e.detail.item}
/>`
    }
  ];

  // Event handlers
  function handleSelect(event: CustomEvent<{ item: DropdownItem }>) {
    selectedItem = event.detail.item;
  }

  function handleSearchableSelect(event: CustomEvent<{ item: DropdownItem }>) {
    searchableSelected = event.detail.item;
  }

  function handleGroupedSelect(event: CustomEvent<{ item: DropdownItem }>) {
    groupedSelected = event.detail.item;
  }
  // Typed arrays for iteration
  const variants: DropdownVariant[] = ['default', 'minimal', 'bordered', 'elevated', 'glass', 'dark'];
  const sizes: DropdownSize[] = ['sm', 'md', 'lg'];
  const positions: DropdownPosition[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
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
        codeSnippet={example.codeSnippet}
      >
        <div class="p-8 flex justify-center">
          <div class="w-64">
            {#if index === 0}
              <Dropdown 
                items={basicItems} 
                on:select={handleSelect}
                placeholder="Select an option"
              />
            {:else if index === 1}
              <Dropdown 
                items={itemsWithIcons} 
                on:select={handleSelect}
                placeholder="Choose action"
              />
            {:else if index === 2}
              <Dropdown 
                items={basicItems} 
                on:select={handleSearchableSelect}
                searchable
                placeholder="Search options..."
              />
            {:else if index === 3}
              <Dropdown 
                items={groupedItems} 
                on:select={handleGroupedSelect}
                placeholder="Select from groups"
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
<Dropdown variant="minimal" items={items} placeholder="Minimal" />
<Dropdown variant="bordered" items={items} placeholder="Bordered" />
<Dropdown variant="elevated" items={items} placeholder="Elevated" />
<Dropdown variant="glass" items={items} placeholder="Glass" />
<Dropdown variant="dark" items={items} placeholder="Dark" />`}
    >
      <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each variants as variant}
          <div class="w-full">
            <div class="text-sm font-medium mb-2 capitalize">{variant}</div>
            <Dropdown 
              variant={variant}
              items={basicItems} 
              placeholder="{variant} style"
              on:select={handleSelect}
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
    >      <div class="p-8 space-y-4">
        {#each sizes as size}
          <div class="w-64">
            <div class="text-sm font-medium mb-2 capitalize">{size}</div>
            <Dropdown 
              size={size}
              items={basicItems} 
              placeholder="{size} dropdown"
              on:select={handleSelect}
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
    >      <div class="p-16 grid grid-cols-2 gap-8">
        {#each positions as position}
          <div class="w-48">
            <div class="text-sm font-medium mb-2">{position}</div>
            <Dropdown 
              position={position}
              items={basicItems} 
              placeholder={position}
              on:select={handleSelect}
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
    >      <div class="p-8 flex justify-center">
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
      title="Disabled State"
      description="Dropdown in disabled state"
      codeSnippet={`<Dropdown 
  items={basicItems}
  disabled
  placeholder="Disabled dropdown"
/>`}
    >
      <div class="p-8 flex justify-center">
        <div class="w-64">
          <Dropdown 
            items={basicItems}
            disabled
            placeholder="Disabled dropdown"
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
    >      <div class="p-8 flex justify-center">
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
