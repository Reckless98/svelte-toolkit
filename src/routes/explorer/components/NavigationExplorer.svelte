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
</script>

<section class="space-y-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
				Navigation Components
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				Versatile navigation components with multiple variants, full accessibility support, and responsive design.
			</p>
		</div>
		
		<!-- Horizontal Navigation -->
		<ComponentPreview
			title="Horizontal Navigation"
			description="Standard horizontal navigation bar with dropdowns and mobile menu"
			codeSnippet={`<Navigation
  variant="horizontal"
  items={navigationItems}
  activeItem="home"
  logo="/logo.png"
  sticky={true}
  theme="light"
  showBranding={true}
/>`}
		>
			<div class="w-full -m-8">
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
		</ComponentPreview>
		
		<!-- Modern Navigation -->
		<ComponentPreview
			title="Modern Navigation"
			description="Glassmorphic navigation with smooth animations"
			codeSnippet={`<Navigation
  variant="modern"
  items={navigationItems}
  activeItem="about"
  logo="🎨"
  theme="glass"
/>`}
		>
			<div class="w-full -m-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8">
				<Navigation
					variant="modern"
					items={sampleItems}
					activeItem="about"
					logo="🎨"
					theme="glass"
				/>
			</div>
		</ComponentPreview>
		
		<!-- Floating Navigation -->
		<ComponentPreview
			title="Floating Navigation"
			description="Compact floating navigation bar"
			codeSnippet={`<Navigation
  variant="floating"
  items={navigationItems}
  activeItem="services"
  logo="✨"
  showBranding={true}
/>`}
		>
			<div class="relative h-32">
				<Navigation
					variant="floating"
					items={sampleItems.slice(0, 4)}
					activeItem="services"
					logo="✨"
					showBranding={true}
				/>
			</div>
		</ComponentPreview>
		
		<!-- Vertical Navigation -->
		<ComponentPreview
			title="Vertical Navigation"
			description="Sidebar-style vertical navigation with nested items"
			codeSnippet={`<Navigation
  variant="vertical"
  items={navigationItems}
  activeItem="portfolio"
  theme="dark"
/>`}
		>
			<div class="w-64">
				<Navigation
					variant="vertical"
					items={sampleItems}
					activeItem="portfolio"
					theme={isDark ? 'dark' : 'light'}
				/>
			</div>
		</ComponentPreview>
		
		<!-- Breadcrumb Navigation -->
		<ComponentPreview
			title="Breadcrumb Navigation"
			description="Hierarchical breadcrumb navigation"
			codeSnippet={`<Navigation
  variant="breadcrumb"
  items={breadcrumbItems}
/>`}
		>
			<Navigation
				variant="breadcrumb"
				items={breadcrumbItems}
			/>
		</ComponentPreview>
		
		<!-- Tab Navigation -->
		<ComponentPreview
			title="Tab Navigation"
			description="Tab-style navigation for content sections"
			codeSnippet={`<Navigation
  variant="tabs"
  items={tabItems}
  activeItem="overview"
/>`}
		>
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
						<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Overview content goes here...</p>
					{:else if activeTab === 'features'}
						<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Features content goes here...</p>
					{:else if activeTab === 'pricing'}
						<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Pricing content goes here...</p>
					{:else if activeTab === 'reviews'}
						<p class="{isDark ? 'text-gray-300' : 'text-gray-700'}">Reviews content goes here...</p>
					{/if}
				</div>
			</div>
		</ComponentPreview>
		
		<!-- Navigation with Different Themes -->
		<ComponentPreview
			title="Theme Variants"
			description="Navigation components with different theme options"
			codeSnippet={`<!-- Light theme -->
<Navigation variant="horizontal" theme="light" />

<!-- Dark theme -->
<Navigation variant="horizontal" theme="dark" />

<!-- Accent theme -->
<Navigation variant="horizontal" theme="accent" />

<!-- Glass theme -->
<Navigation variant="horizontal" theme="glass" />

<!-- Gradient theme -->
<Navigation variant="horizontal" theme="gradient" />`}
		>
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
			</div>
		</ComponentPreview>
	</div>
</section>
