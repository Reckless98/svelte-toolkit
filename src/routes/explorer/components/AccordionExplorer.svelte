<script lang="ts">
  import { Accordion } from '$lib/components/Accordion';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  let openItems = ['item1'];
  let multipleOpen = ['item1', 'item3'];

  const basicItems = [
    {
      id: 'item1',
      title: 'What is this component?',
      content: 'This is a flexible accordion component that allows you to create collapsible content sections. It supports single or multiple open items, various visual styles, and smooth animations.'
    },
    {
      id: 'item2',
      title: 'How do I use it?',
      content: 'Simply pass an array of items with id, title, and content properties. You can customize the appearance with variants, add icons, badges, and control which items are open.'
    },
    {
      id: 'item3',
      title: 'What features are included?',
      content: 'The accordion includes animations, accessibility support, keyboard navigation, custom icons, badges, multiple variants, and both single and multiple selection modes.'
    }
  ];

  const itemsWithIcons = [
    {
      id: 'home',
      title: 'Home Dashboard',
      content: 'Access your main dashboard with overview statistics, recent activities, and quick actions.',
      icon: '🏠'
    },
    {
      id: 'profile',
      title: 'User Profile',
      content: 'Manage your personal information, avatar, contact details, and account preferences.',
      icon: '👤'
    },
    {
      id: 'settings',
      title: 'System Settings',
      content: 'Configure application settings, notifications, privacy options, and integrations.',
      icon: '⚙️'
    }
  ];

  const itemsWithBadges = [
    {
      id: 'inbox',
      title: 'Inbox',
      content: 'Your latest messages and notifications from team members and system updates.',
      badge: '12'
    },
    {
      id: 'tasks',
      title: 'Active Tasks',
      content: 'View and manage your current tasks, deadlines, and project assignments.',
      badge: '5'
    },
    {
      id: 'completed',
      title: 'Completed Items',
      content: 'Archive of finished tasks and completed projects for reference.',
      badge: '24'
    }
  ];

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple accordion with collapsible content sections',
      code: `<Accordion 
  items={basicItems} 
  bind:openItems
/>`
    },
    {
      title: 'Multiple Open',
      description: 'Allow multiple sections to be open simultaneously',
      code: `<Accordion 
  items={basicItems} 
  bind:openItems={multipleOpen}
  allowMultiple
/>`
    },
    {
      title: 'With Icons',
      description: 'Add icons to accordion headers for better visual hierarchy',
      code: `<Accordion 
  items={itemsWithIcons} 
  bind:openItems
/>`
    },
    {
      title: 'With Badges',
      description: 'Display badges with counts or status indicators',
      code: `<Accordion 
  items={itemsWithBadges} 
  bind:openItems
/>`
    },
    {
      title: 'Disabled Items',
      description: 'Some items can be disabled to prevent interaction',
      code: `<Accordion 
  items={itemsWithDisabled} 
  bind:openItems
/>`
    }
  ];

  const variants = ['default', 'bordered', 'elevated', 'minimal', 'modern', 'glass'];
  const sizes = ['sm', 'md', 'lg'];
  const animations = ['slide', 'fade', 'none'];

  // Items with one disabled
  const itemsWithDisabled = [
    ...basicItems.slice(0, 2),
    {
      ...basicItems[2],
      disabled: true
    }
  ];
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Accordion Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A versatile accordion component for creating collapsible content sections with smooth animations, icons, badges, and multiple visual styles.
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
        <div class="p-6">
          {#if index === 0}
            <Accordion 
              items={basicItems} 
              bind:openItems
            />
          {:else if index === 1}
            <Accordion 
              items={basicItems} 
              bind:openItems={multipleOpen}
              allowMultiple
            />
          {:else if index === 2}
            <Accordion 
              items={itemsWithIcons} 
              bind:openItems
            />
          {:else if index === 3}
            <Accordion 
              items={itemsWithBadges} 
              bind:openItems
            />
          {:else if index === 4}
            <Accordion 
              items={itemsWithDisabled} 
              bind:openItems
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
      title="Accordion Variants"
      description="Different visual styles for various design contexts"
      codeSnippet={`<Accordion variant="default" items={items} />
<Accordion variant="bordered" items={items} />
<Accordion variant="elevated" items={items} />
<Accordion variant="minimal" items={items} />
<Accordion variant="modern" items={items} />`}
    >
          <div class="p-6 space-y-8">
            {#each variants as variant}
              <div>
                <h4 class="text-sm font-medium mb-3 capitalize text-gray-700 dark:text-gray-300">{variant}</h4>
                <Accordion 
                  {variant}
                  items={basicItems.slice(0, 2)} 
                  bind:openItems
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
      title="Accordion Sizes"
      description="Available size options: sm, md, lg"
    >
      <div class="p-6 space-y-8">
        {#each sizes as size}
          <div>
            <h4 class="text-sm font-medium mb-3 capitalize text-gray-700 dark:text-gray-300">{size}</h4>
            <Accordion 
              {size}
              items={basicItems.slice(0, 2)} 
              bind:openItems
            />
          </div>
        {/each}      </div>
    </ComponentPreview>
  </section>

  <!-- Animations -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Animations</h2>
    
    <ComponentPreview
      title="Accordion Animations"
      description="Different animation options: slide, fade, none"
    >
      <div class="p-6 space-y-8">
        {#each animations as animation}
          <div>
            <h4 class="text-sm font-medium mb-3 capitalize text-gray-700 dark:text-gray-300">{animation}</h4>
            <Accordion 
              animation={animation}
              items={basicItems.slice(0, 2)} 
              bind:openItems
            />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Custom Icons & Rich Content -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Custom Icons & Rich Content</h2>
    
    <ComponentPreview
      title="Custom Icons & Rich Content"
      description="Accordion with custom expand/collapse icons and rich HTML content"
      codeSnippet={`<Accordion 
  items={basicItems.slice(0, 2)}
  expandIcon="▼"
  collapseIcon="▲"
  bind:openItems
/>
<Accordion 
  items={[
    {
      id: 'rich1',
      title: 'Rich Content Example',
      content: \`<div class="space-y-3">
        <p class="text-gray-600">This accordion supports rich HTML content including:</p>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Formatted text and lists</li>
          <li>Images and media</li>
          <li>Interactive elements</li>
          <li>Custom styling</li>
        </ul>
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p class="text-sm text-blue-800 dark:text-blue-200">💡 Tip: You can include any HTML content here!</p>
        </div>
      </div>\`
    }
  ]}
  bind:openItems
/>`}
    >
      <svelte:fragment slot="preview">
<div class="p-6 space-y-8">
  <Accordion 
    items={basicItems.slice(0, 2)}
    expandIcon="▼"
    collapseIcon="▲"
    bind:openItems
  />
  
  <Accordion 
    items={[
      {
        id: 'rich1',
        title: 'Rich Content Example',
        content: `<div class="space-y-3">
          <p class="text-gray-600">This accordion supports rich HTML content including:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Formatted text and lists</li>
            <li>Images and media</li>
            <li>Interactive elements</li>
            <li>Custom styling</li>
          </ul>
          <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p class="text-sm text-blue-800 dark:text-blue-200">💡 Tip: You can include any HTML content here!</p>
          </div>
        </div>`
      }
    ]}
    bind:openItems
  />
</div>