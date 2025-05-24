<script>
	import Footer from '$lib/components/Footer/Footer.svelte';
	import ComponentPreview from '../ComponentPreview.svelte';

	// Footer variants
	const variants = [
		{ name: 'Standard', value: 'standard' },
		{ name: 'Simple', value: 'simple' },
		{ name: 'Expanded', value: 'expanded' },
		{ name: 'Centered', value: 'centered' },
		{ name: 'Minimal', value: 'minimal' },
	];

	// Demo links
	const demoLinks = [
		{ text: 'Home', href: '#' },
		{ text: 'About', href: '#about' },
		{ text: 'Services', href: '#services' },
		{ text: 'Contact', href: '#contact' },
	];

	// Social links
	const socialLinks = [
		{ name: 'GitHub', href: 'https://github.com/', icon: 'github' },
		{ name: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
		{ name: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
	];

	// Code examples
	const basicExample = '<Footer />';

	const standardExample = `<Footer 
  links={[
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Services', href: '/services' },
    { text: 'Contact', href: '/contact' }
  ]}
  showBranding={true}
/>`;

	const expandedExample = `<Footer 
  variant="expanded"
  links={links}
  socialLinks={[
    { name: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { name: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
    { name: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' }
  ]}
  showBranding={true}
/>`;

	const floatingExample = `<Footer 
  variant="floating"
  links={links}
  showBranding={true}
/>`;

	const gradientExample = `<Footer 
  variant="gradient"
  links={links}
  socialLinks={socialLinks}
  showBranding={true}
/>`;
</script>

<section>
	<div class="max-w-6xl mx-auto space-y-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
				Footer Component
			</h1>
			<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
				Flexible footer component with multiple layouts, social links, and responsive design.
			</p>
		</div>

		<!-- Basic Footer -->
		<ComponentPreview
			title="Basic Footer"
			description="Simple footer with minimal content"
			codeSnippet={basicExample}
		>
			<div class="w-full -m-8">
				<Footer />
			</div>
		</ComponentPreview>

		<!-- Standard Footer -->
		<ComponentPreview
			title="Standard Footer"
			description="Footer with navigation links and branding"
			codeSnippet={standardExample}
		>
			<div class="w-full -m-8">
				<Footer 
					links={demoLinks}
					showBranding={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Expanded Footer -->
		<ComponentPreview
			title="Expanded Footer"
			description="Full-featured footer with multiple columns and social links"
			codeSnippet={expandedExample}
		>
			<div class="w-full -m-8">
				<Footer 
					variant="expanded"
					links={demoLinks}
					socialLinks={socialLinks}
					showBranding={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Floating Footer -->
		<ComponentPreview
			title="Floating Footer"
			description="Footer with rounded corners and margin"
			codeSnippet={floatingExample}
		>
			<div class="w-full -m-8 p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
				<Footer 
					variant="floating"
					links={demoLinks}
					showBranding={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Gradient Footer -->
		<ComponentPreview
			title="Gradient Footer"
			description="Footer with gradient background"
			codeSnippet={gradientExample}
		>
			<div class="w-full -m-8">
				<Footer 
					variant="gradient"
					links={demoLinks}
					socialLinks={socialLinks}
					showBranding={true}
				/>
			</div>
		</ComponentPreview>
	</div>
</section>
