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
	const basicExample = '<Header title="Company Name" />';

	const withLinksExample = `<Header 
  title="Company Name"
  links={[
    { text: 'Home', href: '#' },
    { text: 'Features', href: '#features' },
    { text: 'Pricing', href: '#pricing' },
    { text: 'About', href: '#about' }
  ]}
/>`;

	const withSearchExample = `<Header 
  title="Company Name"
  withSearch={true}
  links={links}
/>`;

	const ctaExample = `<Header 
  title="Company Name"
  links={links}
  ctaButton={{ 
    text: 'Sign Up', 
    href: '#signup', 
    variant: 'primary' 
  }}
/>`;

	const glassExample = `<Header 
  title="Company Name"
  links={links}
  variant="glass"
  transparent={true}
/>`;

	const stickyExample = `<Header 
  title="Company Name"
  links={links}
  sticky={true}
  animated={true}
/>`;
</script>

<section>
	<div class="max-w-6xl mx-auto space-y-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
				Header Component
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				Versatile header component with multiple variants, responsive design, and full accessibility support.
			</p>
		</div>

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Header"
			description="Simple header with title only"
			codeSnippet={basicExample}
		>
			<div class="w-full -m-8">
				<Header title="Company Name" />
			</div>
		</ComponentPreview>

		<!-- With Navigation -->
		<ComponentPreview
			title="Header with Navigation"
			description="Header with navigation links"
			codeSnippet={withLinksExample}
		>
			<div class="w-full -m-8">
				<Header 
					title="Company Name"
					links={demoLinks}
				/>
			</div>
		</ComponentPreview>

		<!-- With Search -->
		<ComponentPreview
			title="Header with Search"
			description="Header including a search bar"
			codeSnippet={withSearchExample}
		>
			<div class="w-full -m-8">
				<Header 
					title="Company Name"
					withSearch={true}
					links={demoLinks}
				/>
			</div>
		</ComponentPreview>

		<!-- With CTA Button -->
		<ComponentPreview
			title="Header with CTA"
			description="Header with call-to-action button"
			codeSnippet={ctaExample}
		>
			<div class="w-full -m-8">
				<Header 
					title="Company Name"
					links={demoLinks}
					ctaButton={demoCtaButton}
				/>
			</div>
		</ComponentPreview>

		<!-- Glass Variant -->
		<ComponentPreview
			title="Glass Header"
			description="Glassmorphic header with transparency effect"
			codeSnippet={glassExample}
		>
			<div class="w-full -m-8 bg-gradient-to-br from-blue-500 to-purple-600 p-8">
				<Header 
					title="Company Name"
					links={demoLinks}
					variant="glass"
					transparent={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Gradient Variant -->
		<ComponentPreview
			title="Gradient Header"
			description="Header with gradient background"
			codeSnippet={`<Header 
  title="Company Name"
  links={links}
  variant="gradient"
  gradientDirection="to-r"
/>`}
		>
			<div class="w-full -m-8">
				<Header 
					title="Company Name"
					links={demoLinks}
					variant="gradient"
					gradientDirection="to-r"
					ctaButton={demoCtaButton}
				/>
			</div>
		</ComponentPreview>

		<!-- Complete Example -->
		<ComponentPreview
			title="Complete Header"
			description="Header with all features enabled"
			codeSnippet={`<Header 
  title="UI Toolkit"
  logo="/logo.png"
  links={links}
  ctaButton={{ text: 'Get Started', href: '/start', variant: 'primary' }}
  sticky={true}
  animated={true}
  withSearch={true}
  showBranding={true}
/>`}
		>
			<div class="w-full -m-8">
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
		</ComponentPreview>
	</div>
</section>
