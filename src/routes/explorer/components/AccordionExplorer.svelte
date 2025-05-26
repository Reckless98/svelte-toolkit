<script lang="ts">
  import { Accordion } from '$lib/components/Accordion';
  import ComponentPreview from '../ComponentPreview.svelte';
  import type { AccordionVariant, AccordionSize, AccordionAnimation } from '$lib/components/Accordion';
  
  let openItems = ['item1'];
  let multipleOpen = ['item1', 'item3'];
  let fundamentalsOpen = ['basics'];
  let visualStylesOpen = ['default'];
  let advancedFeaturesOpen = ['icons'];
  let realWorldOpen = ['faq'];

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

  const itemsWithDisabled = [
    ...basicItems.slice(0, 2),
    {
      ...basicItems[2],
      disabled: true
    }
  ];

  const variants: AccordionVariant[] = ['default', 'bordered', 'elevated', 'minimal', 'modern', 'glass'];
  const sizes: AccordionSize[] = ['sm', 'md', 'lg'];
  const animations: AccordionAnimation[] = ['slide', 'fade', 'none'];

  // Comprehensive code examples for each group
  const fundamentalsExample = `<!-- Basic Accordion Usage -->
<Accordion 
  items={basicItems} 
  defaultOpen={['item1']}
/>

<!-- Multiple Items Open -->
<Accordion 
  items={basicItems} 
  defaultOpen={['item1', 'item3']}
  multiple
/>

<!-- With Disabled Items -->
<Accordion 
  items={itemsWithDisabled} 
  defaultOpen={['item1']}
/>`;

  const visualStylesExample = `<!-- Different Variants -->
<Accordion variant="default" items={items} />
<Accordion variant="bordered" items={items} />
<Accordion variant="elevated" items={items} />
<Accordion variant="minimal" items={items} />
<Accordion variant="modern" items={items} />
<Accordion variant="glass" items={items} />

<!-- Different Sizes -->
<Accordion size="sm" items={items} />
<Accordion size="md" items={items} />
<Accordion size="lg" items={items} />

<!-- Different Animations -->
<Accordion animation="slide" items={items} />
<Accordion animation="fade" items={items} />
<Accordion animation="none" items={items} />`;

  const advancedFeaturesExample = `<!-- With Icons -->
<Accordion 
  items={[
    {
      id: 'home',
      title: 'Home Dashboard',
      content: 'Access your main dashboard with overview statistics.',
      icon: '🏠'
    },
    {
      id: 'profile',
      title: 'User Profile',
      content: 'Manage your personal information and preferences.',
      icon: '👤'
    }
  ]} 
  defaultOpen={['home']}
/>

<!-- With Badges -->
<Accordion 
  items={[
    {
      id: 'inbox',
      title: 'Inbox',
      content: 'Your latest messages and notifications.',
      badge: '12'
    },
    {
      id: 'tasks',
      title: 'Active Tasks',
      content: 'View and manage your current tasks.',
      badge: '5'
    }
  ]} 
  defaultOpen={['inbox']}
/>

<!-- Rich HTML Content -->
<Accordion 
  items={[
    {
      id: 'rich',
      title: 'Rich Content',
      content: \`<div class="space-y-3">
        <p>Supports rich HTML content:</p>
        <ul class="list-disc list-inside">
          <li>Formatted text and lists</li>
          <li>Images and media</li>
          <li>Interactive elements</li>
        </ul>
      </div>\`
    }
  ]}
/>`;

  const realWorldExample = `<!-- FAQ Section -->
<Accordion 
  variant="bordered"
  items={[
    {
      id: 'shipping',
      title: 'What are your shipping options?',
      content: 'We offer standard (3-5 days), express (1-2 days), and overnight shipping.',
      icon: '📦'
    },
    {
      id: 'returns',
      title: 'What is your return policy?',
      content: '30-day returns on all items in original condition.',
      icon: '↩️'
    },
    {
      id: 'warranty',
      title: 'Do you offer warranties?',
      content: 'All products come with a 1-year manufacturer warranty.',
      icon: '🛡️'
    }
  ]}
  defaultOpen={['shipping']}
/>

<!-- Settings Panel -->
<Accordion 
  variant="minimal"
  size="lg"
  items={[
    {
      id: 'account',
      title: 'Account Settings',
      content: 'Manage your account information, password, and security.',
      icon: '👤',
      badge: '3'
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      content: 'Configure email, push, and SMS notification settings.',
      icon: '🔔',
      badge: 'New'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      content: 'Control your privacy settings and data sharing preferences.',
      icon: '🔒'
    }
  ]}
  multiple
  defaultOpen={['account', 'notifications']}
/>`;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Accordion Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A versatile accordion component for creating collapsible content sections with smooth animations, icons, badges, and multiple visual styles.
    </p>
  </div>

  <!-- Accordion Fundamentals & Basic Usage -->
  <ComponentPreview
    title="Accordion Fundamentals & Basic Usage"
    description="Learn the core accordion functionality including single/multiple open modes, disabled states, and basic interaction patterns. Perfect for getting started with collapsible content sections."
    codeSnippet={fundamentalsExample}
    complexity="Basic"
    features={["Single/Multiple Open", "Disabled States", "Basic Interaction", "Content Sections"]}
  >    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Basic Accordion</h4>
        <Accordion 
          items={basicItems} 
          defaultOpen={fundamentalsOpen}
        />
      </div>
      
      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Multiple Open</h4>
        <Accordion 
          items={basicItems} 
          defaultOpen={['item1', 'item3']}
          multiple
        />
      </div>

      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">With Disabled Items</h4>
        <Accordion 
          items={itemsWithDisabled} 
          defaultOpen={['item1']}
        />
      </div>
    </div>
  </ComponentPreview>

  <!-- Visual Styles & Customization -->
  <ComponentPreview
    title="Visual Styles & Customization"
    description="Explore different visual variants, sizes, and animation options to match your design requirements. Customize the accordion appearance for various contexts and user interfaces."
    codeSnippet={visualStylesExample}
    complexity="Intermediate"
    features={["Visual Variants", "Size Options", "Animation Types", "Theme Compatibility"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Variants</h4>        <div class="grid gap-6">
          {#each variants.slice(0, 3) as variant}
            <div>
              <h5 class="text-xs font-medium mb-2 capitalize text-gray-600 dark:text-gray-400">{variant}</h5>
              <Accordion 
                variant={variant}
                items={basicItems.slice(0, 2)} 
                defaultOpen={visualStylesOpen}
              />
            </div>
          {/each}
        </div>
      </div>
      
      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Sizes</h4>
        <div class="space-y-4">
          {#each sizes as size}
            <div>
              <h5 class="text-xs font-medium mb-2 capitalize text-gray-600 dark:text-gray-400">{size}</h5>
              <Accordion 
                size={size}
                items={basicItems.slice(0, 1)} 
                defaultOpen={['item1']}
              />
            </div>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Animations</h4>
        <div class="space-y-4">
          {#each animations as animation}
            <div>
              <h5 class="text-xs font-medium mb-2 capitalize text-gray-600 dark:text-gray-400">{animation}</h5>
              <Accordion 
                animation={animation}
                items={basicItems.slice(0, 1)} 
                defaultOpen={['item1']}
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Advanced Features & Content -->
  <ComponentPreview
    title="Advanced Features & Content"
    description="Discover powerful features including icons, badges, rich HTML content, and complex data structures. Build sophisticated accordion interfaces with enhanced visual elements."
    codeSnippet={advancedFeaturesExample}
    complexity="Advanced"
    features={["Icon Integration", "Badge Display", "Rich HTML Content", "Complex Data Structures"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">With Icons</h4>        <Accordion 
          items={itemsWithIcons} 
          defaultOpen={advancedFeaturesOpen}
        />
      </div>

      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">With Badges</h4>
        <Accordion 
          items={itemsWithBadges} 
          defaultOpen={['inbox']}
        />
      </div>

      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Rich HTML Content</h4>
        <Accordion 
          items={[
            {
              id: 'rich1',
              title: 'Rich Content Example',
              content: `<div class="space-y-3">
                <p class="text-gray-600 dark:text-gray-300">This accordion supports rich HTML content including:</p>
                <ul class="list-disc list-inside space-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <li>Formatted text and lists</li>
                  <li>Images and media</li>
                  <li>Interactive elements</li>
                  <li>Custom styling</li>
                </ul>
                <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p class="text-sm text-blue-800 dark:text-blue-200">💡 Tip: You can include any HTML content here!</p>
                </div>
              </div>`
            }
          ]}
          defaultOpen={['rich1']}
        />
      </div>
    </div>
  </ComponentPreview>

  <!-- Real-World Applications & Examples -->
  <ComponentPreview
    title="Real-World Applications & Examples"
    description="See accordion components in action with practical examples including FAQ sections, settings panels, and dashboard interfaces. Professional implementations ready for production use."
    codeSnippet={realWorldExample}
    complexity="Advanced"
    features={["FAQ Sections", "Settings Panels", "Dashboard Interfaces", "Production Ready"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">FAQ Section</h4>        <Accordion 
          variant="bordered"
          items={[
            {
              id: 'shipping',
              title: 'What are your shipping options?',
              content: 'We offer standard (3-5 business days), express (1-2 business days), and overnight shipping. All orders over $50 qualify for free standard shipping.',
              icon: '📦'
            },
            {
              id: 'returns',
              title: 'What is your return policy?',
              content: 'We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Return shipping is free for defective items.',
              icon: '↩️'
            },
            {
              id: 'warranty',
              title: 'Do you offer warranties?',
              content: 'All products come with a 1-year manufacturer warranty covering defects in materials and workmanship. Extended warranties are available for purchase.',
              icon: '🛡️'
            }
          ]}
          defaultOpen={realWorldOpen}
        />
      </div>

      <div>
        <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Settings Panel</h4>
        <Accordion 
          variant="minimal"
          size="lg"
          items={[
            {
              id: 'account',
              title: 'Account Settings',
              content: 'Manage your account information, password, and security preferences. Update your profile details and contact information.',
              icon: '👤',
              badge: '3'
            },
            {
              id: 'notifications',
              title: 'Notification Preferences',
              content: 'Configure email, push, and SMS notification settings. Choose what updates you want to receive and how often.',
              icon: '🔔',
              badge: 'New'
            },
            {
              id: 'privacy',
              title: 'Privacy & Security',
              content: 'Control your privacy settings and data sharing preferences. Manage who can see your information and activity.',
              icon: '🔒'
            }
          ]}
          multiple
          defaultOpen={['account', 'notifications']}
        />
      </div>
    </div>
  </ComponentPreview>
</div>