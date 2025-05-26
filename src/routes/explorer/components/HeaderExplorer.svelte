<script>
	import Header from '$lib/components/Header/Header.svelte';
	import ComponentPreview from '../ComponentPreview.svelte';

	// Header variants
	const variants = [
		{ name: 'Standard', value: 'standard' },
		{ name: 'Minimal', value: 'minimal' },
		{ name: 'With Search', value: 'withSearch' },
		{ name: 'Animated', value: 'animated' },
		{ name: 'Glass', value: 'glass' },
	];

	// Demo links
	const demoLinks = [
		{ text: 'Home', href: '#' },
		{ text: 'Features', href: '#features' },
		{ text: 'Pricing', href: '#pricing' },
		{ text: 'About', href: '#about' },
		{ text: 'Contact', href: '#contact' },
	];
	
	// Demo CTA button
	const demoCtaButton = {
		text: 'Sign Up',
		href: '#signup',
		variant: 'primary',
	};

	// Code examples
	const fundamentalsExample = `<!-- Basic Header -->
<Header title="Company Name" />

<!-- Header with Navigation -->
<Header 
  title="Company Name"
  links={[
    { text: 'Home', href: '#' },
    { text: 'Features', href: '#features' },
    { text: 'Pricing', href: '#pricing' },
    { text: 'About', href: '#about' }
  ]}
/>

<!-- Logo Integration -->
<Header 
  title="Company Name"
  logo="🚀"
  showBranding={true}
/>`;

	const visualStylesExample = `<!-- Glass Effect Header -->
<Header 
  title="Company Name"
  links={links}
  variant="glass"
  transparent={true}
/>

<!-- Gradient Background -->
<Header 
  title="Company Name"
  links={links}
  variant="gradient"
  gradientDirection="to-r"
/>

<!-- Minimal Design -->
<Header 
  title="Company Name"
  links={links}
  variant="minimal"
  borderless={true}
/>`;

	const interactiveFeaturesExample = `<!-- Header with Search -->
<Header 
  title="Company Name"
  withSearch={true}
  links={links}
  searchPlaceholder="Search products..."
/>

<!-- Call-to-Action Button -->
<Header 
  title="Company Name"
  links={links}
  ctaButton={{ 
    text: 'Sign Up', 
    href: '#signup', 
    variant: 'primary' 
  }}
/>

<!-- Mobile-Responsive Navigation -->
<Header 
  title="Company Name"
  links={links}
  mobileMenuEnabled={true}
  responsive={true}
/>`;

	const advancedFeaturesExample = `<!-- Complete Production Header -->
<Header 
  title="UI Toolkit"
  logo="/logo.png"
  links={links}
  ctaButton={{ text: 'Get Started', href: '/start', variant: 'primary' }}
  sticky={true}
  animated={true}
  withSearch={true}
  showBranding={true}
  dropdownMenus={true}
/>

<!-- Sticky Animated Header -->
<Header 
  title="Company Name"
  links={links}
  sticky={true}
  animated={true}
  shrinkOnScroll={true}
/>

<!-- Multi-level Navigation -->
<Header 
  title="Company Name"
  links={links}
  hasSubmenus={true}
  megaMenu={true}
/>`;
</script>

<section>
	<div class="max-w-6xl mx-auto space-y-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
				Header Component
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
				Versatile header component with multiple variants, responsive design, sticky behavior, 
				and complete navigation functionality for modern web applications.
			</p>
		</div>

		<!-- Header Fundamentals & Basic Structure -->
		<ComponentPreview
			title="Header Fundamentals & Basic Structure"
			description="Essential header components with title, logo, and basic navigation - the foundation for all header implementations."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["Title Display", "Navigation Links", "Logo Integration", "Basic Layout"]}
		>
			<div class="space-y-8">
				<!-- Basic Header -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Simple Header</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header title="Company Name" />
					</div>
				</div>

				<!-- Header with Navigation -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Navigation Header</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header 
							title="Company Name"
							links={demoLinks}
						/>
					</div>
				</div>

				<!-- Header with Branding -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">With Logo & Branding</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header 
							title="UI Toolkit"
							logo="🚀"
							showBranding={true}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Visual Styles & Variants -->
		<ComponentPreview
			title="Visual Styles & Variants"
			description="Comprehensive overview of all visual styles including glass effects, gradients, and design variants to match any brand aesthetic."
			codeSnippet={visualStylesExample}
			complexity="Intermediate"
			features={["Glass Effects", "Gradient Backgrounds", "Visual Variants", "Brand Customization"]}
		>
			<div class="space-y-8">
				<!-- Glass Effect -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Glass Effect Header</h3>
					<div class="w-full -mx-4 bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-lg">
						<Header 
							title="Company Name"
							links={demoLinks}
							variant="glass"
							transparent={true}
						/>
					</div>
				</div>

				<!-- Gradient Background -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Gradient Background</h3>
					<div class="w-full -mx-4 rounded-lg overflow-hidden">
						<Header 
							title="Company Name"
							links={demoLinks}
							variant="gradient"
							gradientDirection="to-r"
						/>
					</div>
				</div>

				<!-- Variant Comparison -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Style Variants</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each variants.slice(0, 4) as variant}
							<div class="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
								<div class="text-xs text-gray-500 p-2 text-center">{variant.name}</div>
								<Header 
									title="Sample"
									variant={variant.value}
									links={demoLinks.slice(0, 3)}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Interactive Features & Components -->
		<ComponentPreview
			title="Interactive Features & Components"
			description="Advanced functionality including search capabilities, call-to-action buttons, and responsive mobile navigation for enhanced user experience."
			codeSnippet={interactiveFeaturesExample}
			complexity="Intermediate"
			features={["Search Integration", "CTA Buttons", "Mobile Navigation", "Responsive Design"]}
		>
			<div class="space-y-8">
				<!-- With Search -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Search Integration</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header 
							title="Company Name"
							withSearch={true}
							links={demoLinks}
						/>
					</div>
				</div>

				<!-- With CTA Button -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Call-to-Action Button</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header 
							title="Company Name"
							links={demoLinks}
							ctaButton={demoCtaButton}
						/>
					</div>
				</div>

				<!-- Complete Interactive Header -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Full Interactive Experience</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header 
							title="Company Name"
							links={demoLinks}
							ctaButton={demoCtaButton}
							withSearch={true}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced Features & Production Examples -->
		<ComponentPreview
			title="Advanced Features & Production Examples"
			description="Professional implementations with sticky behavior, animations, and complex navigation patterns suitable for enterprise applications."
			codeSnippet={advancedFeaturesExample}
			complexity="Advanced"
			features={["Sticky Behavior", "Animations", "Complex Navigation", "Enterprise Features"]}
		>
			<div class="space-y-8">
				<!-- Complete Production Header -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Complete Production Header</h3>
					<div class="w-full -mx-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
						<Header 
							title="UI Toolkit"
							logo="🚀"
							links={demoLinks}
							ctaButton={demoCtaButton}
							sticky={false}
							animated={true}
							withSearch={true}
							showBranding={true}
						/>
					</div>
				</div>

				<!-- Minimal Professional Header -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Enterprise Style</h3>
					<div class="w-full -mx-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
						<Header 
							title="Enterprise Dashboard"
							links={[
								{ text: 'Dashboard', href: '#' },
								{ text: 'Analytics', href: '#' },
								{ text: 'Reports', href: '#' },
								{ text: 'Settings', href: '#' }
							]}
							variant="minimal"
							ctaButton={{ text: 'Export', href: '#', variant: 'secondary' }}
						/>
					</div>
				</div>

				<!-- App-style Header -->
				<div>
					<h3 class="font-semibold mb-4 text-gray-700 dark:text-gray-300">Application Header</h3>
					<div class="w-full -mx-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg overflow-hidden">
						<Header 
							title="My App"
							logo="⚡"
							links={[
								{ text: 'Home', href: '#' },
								{ text: 'Projects', href: '#' },
								{ text: 'Team', href: '#' }
							]}
							variant="glass"
							transparent={true}
							ctaButton={{ text: 'Upgrade', href: '#', variant: 'primary' }}
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
