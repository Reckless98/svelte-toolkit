<!-- Navigation Component Explorer -->
<script>
  import { Navigation } from '$lib/components/Navigation';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  // Navigation variants
  const variants = [
    { name: 'Horizontal', value: 'horizontal' },
    { name: 'Vertical', value: 'vertical' },
    { name: 'Breadcrumb', value: 'breadcrumb' },
    { name: 'Tabs', value: 'tabs' }
  ];
  
  // Navigation themes
  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'Accent', value: 'accent' }
  ];
  
  // Sample navigation items
  const basicItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];
  
  const dropdownItems = [
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'products',
      label: 'Products',
      children: [
        { id: 'web-apps', label: 'Web Applications', href: '/products/web' },
        { id: 'mobile-apps', label: 'Mobile Apps', href: '/products/mobile' },
        { id: 'desktop-apps', label: 'Desktop Apps', href: '/products/desktop' }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      children: [
        { id: 'consulting', label: 'Consulting', href: '/services/consulting' },
        { id: 'development', label: 'Development', href: '/services/development' },
        { id: 'maintenance', label: 'Maintenance', href: '/services/maintenance' }
      ]
    },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];
  
  const breadcrumbItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'laptops', label: 'Laptops', href: '/products/laptops' },
    { id: 'gaming', label: 'Gaming Laptops', href: '/products/laptops/gaming' }
  ];
  
  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'support', label: 'Support' }
  ];
  
  // State
  let activeItems = {
    horizontal: 'home',
    vertical: 'home',
    tabs: 'overview'
  };
  
  // Handle navigation
  function handleNavigation(event, variant) {
    activeItems[variant] = event.detail.item.id;
    console.log('Navigated to:', event.detail.item);
  }
</script>

<div class="space-y-8">
  <div>
    <h2 class="text-2xl font-bold mb-4">Navigation Components</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Flexible navigation components supporting multiple layouts, themes, and interaction patterns.
    </p>
  </div>

  <!-- Horizontal Navigation -->
  <ComponentPreview title="Horizontal Navigation">
    <div class="space-y-6">
      <!-- Basic Horizontal -->
      <div>
        <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Basic</h4>
        <Navigation
          variant="horizontal"
          items={basicItems}
          activeItem={activeItems.horizontal}
          on:itemClick={(e) => handleNavigation(e, 'horizontal')}
        />
      </div>
      
      <!-- With Logo -->
      <div>
        <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">With Logo</h4>
        <Navigation
          variant="horizontal"
          items={basicItems}
          logo="🚀"
          logoAlt="Company Logo"
          activeItem={activeItems.horizontal}
          on:itemClick={(e) => handleNavigation(e, 'horizontal')}
        />
      </div>
      
      <!-- With Dropdowns -->
      <div>
        <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">With Dropdowns</h4>
        <Navigation
          variant="horizontal"
          items={dropdownItems}
          logo="🌟"
          activeItem={activeItems.horizontal}
          on:itemClick={(e) => handleNavigation(e, 'horizontal')}
        />
      </div>
    </div>
  </ComponentPreview>

  <!-- Navigation Themes -->
  <ComponentPreview title="Navigation Themes">
    <div class="space-y-4">
      {#each themes as theme}
        <div>
          <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2 capitalize">
            {theme.name} Theme
          </h4>
          <Navigation
            variant="horizontal"
            theme={theme.value}
            items={basicItems}
            logo="🎨"
            activeItem={activeItems.horizontal}
            on:itemClick={(e) => handleNavigation(e, 'horizontal')}
          />
        </div>
      {/each}
    </div>
  </ComponentPreview>

  <!-- Vertical Navigation -->
  <ComponentPreview title="Vertical Navigation">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Vertical -->
      <div>
        <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Basic Vertical</h4>
        <div class="w-64 border rounded-lg">
          <Navigation
            variant="vertical"
            items={basicItems}
            theme="light"
            activeItem={activeItems.vertical}
            on:itemClick={(e) => handleNavigation(e, 'vertical')}
          />
        </div>
      </div>
      
      <!-- Vertical with Dropdowns -->
      <div>
        <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">With Dropdowns</h4>
        <div class="w-64 border rounded-lg">
          <Navigation
            variant="vertical"
            items={dropdownItems}
            theme="dark"
            activeItem={activeItems.vertical}
            on:itemClick={(e) => handleNavigation(e, 'vertical')}
          />
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Breadcrumb Navigation -->
  <ComponentPreview title="Breadcrumb Navigation">
    <div class="space-y-4">
      <Navigation
        variant="breadcrumb"
        items={breadcrumbItems}
        on:itemClick={(e) => console.log('Breadcrumb clicked:', e.detail.item)}
      />
      
      <Navigation
        variant="breadcrumb"
        items={[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'users', label: 'Users' },
          { id: 'profile', label: 'User Profile' }
        ]}
        on:itemClick={(e) => console.log('Breadcrumb clicked:', e.detail.item)}
      />
    </div>
  </ComponentPreview>

  <!-- Tab Navigation -->
  <ComponentPreview title="Tab Navigation">
    <div class="space-y-4">
      <Navigation
        variant="tabs"
        items={tabItems}
        activeItem={activeItems.tabs}
        on:itemClick={(e) => handleNavigation(e, 'tabs')}
      />
      
      <!-- Tab Content -->
      <div class="p-6 border border-gray-200 rounded-lg bg-gray-50">
        {#if activeItems.tabs === 'overview'}
          <h3 class="text-lg font-medium mb-2">Overview</h3>
          <p class="text-gray-600">This is the overview content. It provides a general introduction to the product or service.</p>
        {:else if activeItems.tabs === 'features'}
          <h3 class="text-lg font-medium mb-2">Features</h3>
          <ul class="text-gray-600 space-y-1">
            <li>• Advanced component library</li>
            <li>• Responsive design</li>
            <li>• Dark mode support</li>
            <li>• Accessibility features</li>
          </ul>
        {:else if activeItems.tabs === 'pricing'}
          <h3 class="text-lg font-medium mb-2">Pricing</h3>
          <p class="text-gray-600">Flexible pricing plans to suit your needs. Contact us for custom enterprise solutions.</p>
        {:else if activeItems.tabs === 'support'}
          <h3 class="text-lg font-medium mb-2">Support</h3>
          <p class="text-gray-600">24/7 customer support with comprehensive documentation and community forums.</p>
        {/if}
      </div>
    </div>
  </ComponentPreview>
  <!-- Responsive Navigation -->
  <ComponentPreview title="Responsive Navigation">
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Try resizing your browser window to see the mobile menu in action.
      </p>
      <Navigation
        variant="horizontal"
        items={dropdownItems}
        logo="📱"
        mobileToggle={true}
        sticky={true}
        activeItem={activeItems.horizontal}
        on:itemClick={(e) => handleNavigation(e, 'horizontal')}
      />
    </div>
  </ComponentPreview>

  <!-- Modern Navigation -->
  <ComponentPreview title="Modern Navigation" description="Glass morphism navigation with enhanced styling and branding.">
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Modern navigation with glass morphism design and integrated branding.
      </p>
      <Navigation
        variant="modern"
        items={basicItems}
        logo="✨"
        showBranding={true}
        activeItem={activeItems.horizontal}
        on:itemClick={(e) => handleNavigation(e, 'horizontal')}
      />
    </div>
  </ComponentPreview>

  <!-- Floating Navigation -->
  <ComponentPreview title="Floating Navigation" description="Floating navigation bar with smooth animations.">
    <div class="space-y-4 relative" style="height: 150px;">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Floating navigation that stays at the top with elegant styling.
      </p>
      <Navigation
        variant="floating"
        items={basicItems}
        logo="🚀"
        showBranding={true}
        activeItem={activeItems.horizontal}
        on:itemClick={(e) => handleNavigation(e, 'horizontal')}
      />
    </div>
  </ComponentPreview>

  <!-- Code Examples -->
  <ComponentPreview title="Code Examples">
    <div class="space-y-4">
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre><code>{`<!-- Basic Navigation -->
<Navigation
  variant="horizontal"
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]}
  activeItem="home"
  on:itemClick={handleNavigation}
/>

<!-- Navigation with Dropdowns -->
<Navigation
  variant="horizontal"
  logo="🚀"
  theme="dark"
  sticky={true}
  items={[
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'products',
      label: 'Products',
      children: [
        { id: 'web', label: 'Web Apps', href: '/web' },
        { id: 'mobile', label: 'Mobile Apps', href: '/mobile' }
      ]
    }
  ]}
  on:itemClick={handleNavigation}
/>

<!-- Vertical Sidebar Navigation -->
<Navigation
  variant="vertical"
  theme="dark"
  items={sidebarItems}
  activeItem={currentPage}
  on:itemClick={handleSidebarClick}
/>

<!-- Breadcrumb Navigation -->
<Navigation
  variant="breadcrumb"
  items={breadcrumbPath}
  on:itemClick={handleBreadcrumbClick}
/>

<!-- Tab Navigation -->
<Navigation
  variant="tabs"
  items={tabItems}
  activeItem={activeTab}
  on:itemClick={handleTabChange}
/>`}</code></pre>
      </div>
    </div>
  </ComponentPreview>
</div>
