<script>
	import { Navigation } from '$lib/components/Navigation';
	import ComponentPreview from '../ComponentPreview.svelte';
	import { theme } from '$lib/stores/theme.js';
	
	let currentTheme = 'light';
	theme.subscribe(value => currentTheme = value);
	$: isDark = currentTheme === 'dark';
	
	// Sample navigation items
	const sampleItems = [
		{ id: 'home', label: 'Home', href: '#' },
		{ id: 'about', label: 'About', href: '#' },
		{ 
			id: 'services', 
			label: 'Services', 
			children: [
				{ id: 'design', label: 'Design', href: '#' },
				{ id: 'development', label: 'Development', href: '#' },
				{ id: 'consulting', label: 'Consulting', href: '#' }
			]
		},
		{ id: 'portfolio', label: 'Portfolio', href: '#' },
		{ id: 'contact', label: 'Contact', href: '#' }
	];
	
	const breadcrumbItems = [
		{ id: 'home', label: 'Home', href: '#' },
		{ id: 'components', label: 'Components', href: '#' },
		{ id: 'navigation', label: 'Navigation', href: '#' }
	];
	
	let activeTab = 'overview';

	// Comprehensive code examples for each smart group
	const fundamentalsExample = `<!-- Horizontal Navigation -->
<Navigation
  variant="horizontal"
  items={navigationItems}
  activeItem="home"
  logo="🚀"
  sticky={true}
  theme="light"
  showBranding={true}
/>

<!-- Modern Glassmorphic Navigation -->
<Navigation
  variant="modern"
  items={navigationItems}
  activeItem="about"
  logo="🎨"
  theme="glass"
/>

<!-- Basic Configuration -->
<Navigation
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]}
  activeItem="home"
  logo="Logo"
/>`;

	const specializedTypesExample = `<!-- Floating Navigation -->
<Navigation
  variant="floating"
  items={navigationItems}
  activeItem="services"
  logo="✨"
  showBranding={true}
/>

<!-- Vertical Sidebar Navigation -->
<Navigation
  variant="vertical"
  items={navigationItems}
  activeItem="portfolio"
  theme="dark"
/>

<!-- Breadcrumb Navigation -->
<Navigation
  variant="breadcrumb"
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'components', label: 'Components', href: '/components' },
    { id: 'navigation', label: 'Navigation', href: '/components/navigation' }
  ]}
/>`;

	const interactiveFeaturesExample = `<!-- Tab Navigation with Content -->
<Navigation
  variant="tabs"
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'reviews', label: 'Reviews' }
  ]}
  activeItem="overview"
  on:itemClick={(e) => activeTab = e.detail.item.id}
/>

<!-- Navigation with Dropdowns -->
<Navigation
  variant="horizontal"
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { 
      id: 'services', 
      label: 'Services', 
      children: [
        { id: 'design', label: 'Design', href: '/design' },
        { id: 'development', label: 'Development', href: '/development' },
        { id: 'consulting', label: 'Consulting', href: '/consulting' }
      ]
    },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]}
  mobileToggle={true}
/>`;

	const themingCustomizationExample = `<!-- Light Theme -->
<Navigation variant="horizontal" theme="light" items={navigationItems} />

<!-- Dark Theme -->
<Navigation variant="horizontal" theme="dark" items={navigationItems} />

<!-- Accent Theme -->
<Navigation variant="horizontal" theme="accent" items={navigationItems} />

<!-- Glass Theme -->
<Navigation variant="horizontal" theme="glass" items={navigationItems} />

<!-- Gradient Theme -->
<Navigation variant="horizontal" theme="gradient" items={navigationItems} />

<!-- Custom Branding -->
<Navigation
  variant="horizontal"
  items={navigationItems}
  logo="/custom-logo.png"
  showBranding={true}
  brandingText="Your Brand"
  theme="light"
/>`;
</script>

<section class="space-y-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
				Navigation Components
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				Versatile navigation components with multiple variants, full accessibility support, and responsive design for modern web applications.
			</p>
		</div>
		
		<!-- Navigation Fundamentals & Basic Variants -->
		<ComponentPreview
			title="Navigation Fundamentals & Basic Variants"
			description="Essential navigation patterns including horizontal and modern variants. Perfect starting point for most navigation implementations with responsive design and accessibility."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={['horizontal', 'modern-design', 'responsive', 'branding', 'accessibility']}
		>
			<div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-8">
				<!-- Horizontal Navigation -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Horizontal Navigation</h4>
					<div class="w-full -mx-6">
						<Navigation
							variant="horizontal"
							items={sampleItems}
							activeItem="home"
							logo="🚀"
							sticky={false}
							theme={isDark ? 'dark' : 'light'}
							showBranding={true}
						/>
					</div>
				</div>

				<!-- Modern Navigation -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Modern Glassmorphic Navigation</h4>
					<div class="w-full -mx-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-lg">
						<Navigation
							variant="modern"
							items={sampleItems}
							activeItem="about"
							logo="🎨"
							theme="glass"
						/>
					</div>
				</div>

				<!-- Basic Configuration -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Basic Configuration</h4>
					<div class="w-full -mx-6">
						<Navigation
							items={sampleItems.slice(0, 3)}
							activeItem="home"
							logo="Logo"
							theme={isDark ? 'dark' : 'light'}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Specialized Navigation Types -->
		<ComponentPreview
			title="Specialized Navigation Types"
			description="Advanced navigation patterns including floating, vertical sidebar, and breadcrumb navigation for specific use cases and layouts."
			codeSnippet={specializedTypesExample}
			complexity="Intermediate"
			features={['floating', 'vertical-sidebar', 'breadcrumbs', 'compact-design']}
		>
			<div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-8">
				<!-- Floating Navigation -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Floating Navigation</h4>
					<div class="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden">
						<Navigation
							variant="floating"
							items={sampleItems.slice(0, 4)}
							activeItem="services"
							logo="✨"
							showBranding={true}
						/>
					</div>
				</div>

				<!-- Vertical Navigation -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Vertical Sidebar Navigation</h4>
					<div class="flex">
						<div class="w-64">
							<Navigation
								variant="vertical"
								items={sampleItems}
								activeItem="portfolio"
								theme={isDark ? 'dark' : 'light'}
							/>
						</div>
						<div class="flex-1 p-6 bg-gray-50 dark:bg-gray-600 ml-4 rounded-lg">
							<p class="text-gray-600 dark:text-gray-300">Main content area would go here...</p>
						</div>
					</div>
				</div>

				<!-- Breadcrumb Navigation -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Breadcrumb Navigation</h4>
					<Navigation
						variant="breadcrumb"
						items={breadcrumbItems}
					/>
				</div>
			</div>
		</ComponentPreview>

		<!-- Interactive Navigation & Advanced Features -->
		<ComponentPreview
			title="Interactive Navigation & Advanced Features"
			description="Advanced navigation functionality including tab navigation with content switching, dropdown menus, and interactive elements."
			codeSnippet={interactiveFeaturesExample}
			complexity="Advanced"
			features={['tabs', 'dropdowns', 'content-switching', 'mobile-menu', 'interactions']}
		>
			<div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-8">
				<!-- Tab Navigation -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Tab Navigation with Content</h4>
					<div class="w-full">
						<Navigation
							variant="tabs"
							items={[
								{ id: 'overview', label: 'Overview' },
								{ id: 'features', label: 'Features' },
								{ id: 'pricing', label: 'Pricing' },
								{ id: 'reviews', label: 'Reviews' }
							]}
							activeItem={activeTab}
							on:itemClick={(e) => activeTab = e.detail.item.id}
						/>
						
						<!-- Tab content -->
						<div class="p-6 {isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-b-lg">
							{#if activeTab === 'overview'}
								<div class="space-y-3">
									<h5 class="font-medium {isDark ? 'text-gray-200' : 'text-gray-800'}">Overview</h5>
									<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Comprehensive navigation components with modern design patterns and accessibility features.</p>
								</div>
							{:else if activeTab === 'features'}
								<div class="space-y-3">
									<h5 class="font-medium {isDark ? 'text-gray-200' : 'text-gray-800'}">Features</h5>
									<ul class="list-disc list-inside space-y-1 {isDark ? 'text-gray-300' : 'text-gray-700'}">
										<li>Responsive design</li>
										<li>Multiple variants</li>
										<li>Accessibility support</li>
										<li>Theme customization</li>
									</ul>
								</div>
							{:else if activeTab === 'pricing'}
								<div class="space-y-3">
									<h5 class="font-medium {isDark ? 'text-gray-200' : 'text-gray-800'}">Pricing</h5>
									<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Free and open source as part of our component library.</p>
								</div>
							{:else if activeTab === 'reviews'}
								<div class="space-y-3">
									<h5 class="font-medium {isDark ? 'text-gray-200' : 'text-gray-800'}">Reviews</h5>
									<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Highly rated by developers for ease of use and flexibility.</p>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Navigation with Dropdowns -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Navigation with Dropdown Menus</h4>
					<div class="w-full -mx-6">
						<Navigation
							variant="horizontal"
							items={sampleItems}
							activeItem="services"
							logo="🔥"
							theme={isDark ? 'dark' : 'light'}
							mobileToggle={true}
						/>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400">Hover over "Services" to see the dropdown menu</p>
				</div>
			</div>
		</ComponentPreview>

		<!-- Theming & Customization -->
		<ComponentPreview
			title="Theming & Customization"
			description="Complete theming system with multiple color schemes, branding options, and visual customization for perfect brand integration."
			codeSnippet={themingCustomizationExample}
			complexity="Advanced"
			features={['themes', 'branding', 'customization', 'color-schemes', 'styling']}
		>
			<div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg space-y-8">
				<!-- Theme Variants -->
				<div class="space-y-6">
					<h4 class="font-medium text-gray-900 dark:text-white">Theme Variants</h4>
					
					<div class="space-y-4">
						<div class="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
							<p class="text-sm font-medium mb-2 {isDark ? 'text-gray-400' : 'text-gray-600'}">Light Theme:</p>
							<Navigation
								variant="horizontal"
								items={sampleItems.slice(0, 3)}
								theme="light"
								mobileToggle={false}
							/>
						</div>
						
						<div class="p-4 bg-gray-900 rounded-lg">
							<p class="text-sm font-medium mb-2 text-gray-400">Dark Theme:</p>
							<Navigation
								variant="horizontal"
								items={sampleItems.slice(0, 3)}
								theme="dark"
								mobileToggle={false}
							/>
						</div>
						
						<div class="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
							<p class="text-sm font-medium mb-2 {isDark ? 'text-gray-400' : 'text-gray-600'}">Gradient Theme:</p>
							<Navigation
								variant="horizontal"
								items={sampleItems.slice(0, 3)}
								theme="gradient"
								mobileToggle={false}
							/>
						</div>

						<div class="p-4 bg-gradient-to-br from-indigo-100/50 to-blue-100/50 dark:from-gray-800 dark:to-gray-900 rounded-lg backdrop-blur-sm">
							<p class="text-sm font-medium mb-2 {isDark ? 'text-gray-400' : 'text-gray-600'}">Glass Theme:</p>
							<Navigation
								variant="horizontal"
								items={sampleItems.slice(0, 3)}
								theme="glass"
								mobileToggle={false}
							/>
						</div>
					</div>
				</div>

				<!-- Custom Branding -->
				<div class="space-y-4">
					<h4 class="font-medium text-gray-900 dark:text-white">Custom Branding</h4>
					<div class="w-full -mx-6">
						<Navigation
							variant="horizontal"
							items={sampleItems.slice(0, 4)}
							logo="🌟"
							showBranding={true}
							theme={isDark ? 'dark' : 'light'}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
