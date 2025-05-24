<!-- Enhanced Footer Component -->
<script>
	import { theme, THEMES } from '$lib/stores/theme.js';
	
	// Props
	export let variant = 'standard'; // standard, minimal, expanded, floating, gradient
	export let showBranding = true;
	export let links = [
		{ text: 'Home', href: '/' },
		{ text: 'Explorer', href: '/explorer' },
		{ text: 'About', href: '/about' },
		{ text: 'Services', href: '/services' },
		{ text: 'Contact', href: '/contact' },
	];
	export let socialLinks = [
		{ name: 'GitHub', href: 'https://github.com/Reckless98', icon: 'github' },
		{ name: 'Twitter', href: '#', icon: 'twitter' },
		{ name: 'LinkedIn', href: '#', icon: 'linkedin' },
	];
	
	let currentTheme = THEMES.LIGHT;
	theme.subscribe((value) => {
		currentTheme = value;
	});
	
	$: isDark = currentTheme === THEMES.DARK;
</script>

<footer class="relative {variant === 'floating' ? 'mx-4 mb-4 rounded-xl' : ''} {variant === 'gradient' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'} transition-all duration-300">
	<div class="max-w-7xl mx-auto px-6 py-8">
		{#if variant === 'expanded'}
			<!-- Expanded Footer -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<!-- Brand Column -->
				<div class="col-span-1">
					<h3 class="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Svelte UI Toolkit
					</h3>
					<p class="text-sm opacity-75">
						A comprehensive collection of modern UI components built with Svelte and Tailwind CSS.
					</p>
				</div>
				
				<!-- Quick Links -->
				<div class="col-span-1">
					<h4 class="font-semibold mb-4">Quick Links</h4>
					<ul class="space-y-2">
						{#each links as link}
							<li>
								<a href={link.href} class="text-sm {isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors duration-200">
									{link.text}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				
				<!-- Resources -->
				<div class="col-span-1">
					<h4 class="font-semibold mb-4">Resources</h4>
					<ul class="space-y-2">
						<li><a href="/explorer" class="text-sm {isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors">Documentation</a></li>
						<li><a href="/explorer" class="text-sm {isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors">Component Explorer</a></li>
						<li><a href="https://github.com" class="text-sm {isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
					</ul>
				</div>
				
				<!-- Social Links -->
				<div class="col-span-1">
					<h4 class="font-semibold mb-4">Connect</h4>
					<div class="flex space-x-4">
						{#each socialLinks as social}
							<a href={social.href} target="_blank" rel="noopener noreferrer" 
								class="w-10 h-10 rounded-full {isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-all duration-200 hover:scale-110">
								<span class="sr-only">{social.name}</span>
								{#if social.icon === 'github'}
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
									</svg>
								{:else if social.icon === 'twitter'}
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
									</svg>
								{:else if social.icon === 'linkedin'}
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</div>
			
			<!-- Divider -->
			<div class="mt-8 pt-8 border-t {isDark ? 'border-gray-800' : 'border-gray-200'}">
				<div class="flex flex-col md:flex-row justify-between items-center">
					<p class="text-sm opacity-75">
						© 2024 Svelte UI Toolkit. All rights reserved.
					</p>
					{#if showBranding}
						<p class="text-sm opacity-75 mt-2 md:mt-0">
							Made with ❤️ by <a href="https://github.com/Reckless98" target="_blank" rel="noopener noreferrer" class="{isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors">Reckless98</a>
						</p>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Standard Footer -->
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="flex items-center space-x-6 mb-4 md:mb-0">
					{#each links as link}
						<a href={link.href} class="text-sm {isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors duration-200">
							{link.text}
						</a>
					{/each}
				</div>
				
				{#if showBranding}
					<p class="text-sm opacity-75">
						Made with ❤️ by <a href="https://github.com/Reckless98" target="_blank" rel="noopener noreferrer" class="{isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors">Reckless98</a>
					</p>
				{/if}
			</div>
		{/if}
	</div>
</footer>
