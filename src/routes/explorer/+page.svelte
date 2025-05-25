<!-- Component Explorer - Interactive showcase of all UI components -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme.js';
	
	// Layout components
	import ParallaxLayout from '$lib/layouts/ParallaxLayout.svelte';
	import Sidebar from './Sidebar.svelte';
		// All UI Components for showcase
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Badge from '$lib/components/Badge/Badge.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import List from '$lib/components/List/List.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import Progress from '$lib/components/Progress/Progress.svelte';	import Search from '$lib/components/Search/Search.svelte';
	import Stats from '$lib/components/Stats/Stats.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import Textarea from '$lib/components/Textarea/Textarea.svelte';	import Toast from '$lib/components/Toast/Toast.svelte';
	import ToggleSimple from '$lib/components/Toggle/ToggleSimple.svelte';
	
	// Layout Components
	import Container from '$lib/components/Layout/Container.svelte';
	import Grid from '$lib/components/Layout/Grid.svelte';
	import Flex from '$lib/components/Layout/Flex.svelte';
	import Stack from '$lib/components/Layout/Stack.svelte';
	import Section from '$lib/components/Layout/Section.svelte';
	import MainLayout from '$lib/components/Layout/MainLayout.svelte';
	import LayoutSidebar from '$lib/components/Layout/Sidebar.svelte';
		// Component state management
	let currentTheme = 'light';
	let showModal = false;
	let checkboxValue = false;
	let toggleValue = false;
	let inputValue = '';
	let textareaValue = '';
	let selectValue = '';
	let searchValue = '';
	let progressValue = 45;
	let activeTabId = 'overview';
	
	// Subscribe to theme changes
	theme.subscribe(value => currentTheme = value);
	$: isDark = currentTheme === 'dark';
	// Sample data for components
	const alertTypes: ('info' | 'success' | 'warning' | 'error')[] = ['info', 'success', 'warning', 'error'];
	const badgeVariants: ('default' | 'success' | 'warning' | 'error' | 'info')[] = ['default', 'success', 'warning', 'error', 'info'];
	const buttonVariants: ('primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost')[] = ['primary', 'secondary', 'success', 'warning', 'error', 'ghost'];
	const buttonSizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
	const containerSizes: ('sm' | 'md' | 'lg' | 'xl' | 'full')[] = ['sm', 'md', 'lg', 'xl', 'full'];
	const containerPaddings: ('none' | 'sm' | 'md' | 'lg')[] = ['none', 'sm', 'md', 'lg'];
	const flexDirections: ('row' | 'col' | 'row-reverse' | 'col-reverse')[] = ['row', 'col', 'row-reverse', 'col-reverse'];
	const flexJustify: ('start' | 'center' | 'end' | 'between' | 'around' | 'evenly')[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];
	const stackSpacing: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
	const sectionVariants: ('default' | 'primary' | 'secondary' | 'accent')[] = ['default', 'primary', 'secondary', 'accent'];
	const selectOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];
	
	const listItems = [
		{ id: 1, title: 'First Item', description: 'Description for first item' },
		{ id: 2, title: 'Second Item', description: 'Description for second item' },
		{ id: 3, title: 'Third Item', description: 'Description for third item' }
	];
	
	const tableColumns = [
		{ key: 'id', label: 'ID', sortable: true },
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true }
	];
	
	const tableData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' }
	];	const statsData = [
		{ 
			id: '1', 
			label: 'Total Users', 
			value: 12543, 
			trend: { direction: 'up' as const, value: 12 },
			color: 'blue' as const
		},
		{ 
			id: '2', 
			label: 'Revenue', 
			value: 45678, 
			prefix: '$',
			trend: { direction: 'up' as const, value: 8 },
			color: 'green' as const
		},
		{ 
			id: '3', 
			label: 'Orders', 
			value: 1234, 
			trend: { direction: 'down' as const, value: 3 },
			color: 'purple' as const
		},
		{ 
			id: '4', 
			label: 'Conversion', 
			value: 3.45, 
			suffix: '%',
			trend: { direction: 'up' as const, value: 15 },
			color: 'yellow' as const
		}
	];
	
	const tabsData = [
		{ id: 'overview', label: 'Overview', content: 'Overview content goes here' },
		{ id: 'details', label: 'Details', content: 'Detailed information goes here' },
		{ id: 'settings', label: 'Settings', content: 'Settings and preferences' }
	];
	
	// Smooth scrolling to sections
	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
	
	// Toast notification system
	let toastMessage = '';
	let showToast = false;
	
	function showToastNotification(message: string) {
		toastMessage = message;
		showToast = true;
		setTimeout(() => showToast = false, 3000);
	}
		onMount(() => {
		// Animate progress bar on load
		setTimeout(() => {
			progressValue = 75;
		}, 1000);
		
		// Intersection Observer for scroll animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
				}
			});
		}, observerOptions);
		
		// Observe all component cards
		document.querySelectorAll('.component-card').forEach((card) => {
			observer.observe(card);
		});
		
		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Component Explorer - Interactive UI Showcase</title>
	<meta name="description" content="Explore and interact with all available UI components in our design system" />
</svelte:head>

<div class="min-h-screen {isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300">
	<!-- Sidebar Navigation -->
	<Sidebar />
		<!-- Hero Section with Enhanced Parallax -->
	<ParallaxLayout 
		backgroundImage="" 
		overlayColor={isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'}
		speed={0.8}
		fullHeight={false}
		animationType="float"
		intensity={1.5}
	>
		<div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
			<!-- Floating Background Elements -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				<!-- Animated geometric shapes -->
				<div class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
				<div class="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-15 animate-bounce" style="animation-delay: 0.5s;"></div>
				<div class="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-20" style="animation: float 6s ease-in-out infinite;"></div>
				<div class="absolute bottom-1/4 left-1/2 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-12" style="animation: float 8s ease-in-out infinite reverse;"></div>
				
				<!-- Grid pattern overlay -->
				<div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
			</div>
		<div class="relative z-10 text-center py-32">
			<h1 class="text-6xl font-bold mb-6 {isDark ? 'text-white' : 'text-gray-900'}" 
				in:fly={{ y: 50, duration: 800, delay: 200 }}>
				Component Explorer
			</h1>
			<p class="text-xl {isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8"
				in:fly={{ y: 30, duration: 800, delay: 400 }}>
				Discover and interact with our comprehensive collection of UI components. 
				Each component is designed with accessibility, performance, and beautiful aesthetics in mind.
			</p>
			<div class="flex gap-4 justify-center"
				in:fly={{ y: 20, duration: 800, delay: 600 }}>
				<Button variant="primary" size="lg" on:click={() => scrollToSection('foundation')}>
					Explore Components
				</Button>
				<Button variant="ghost" size="lg" on:click={() => scrollToSection('examples')}>
					View Examples
				</Button>
			</div>
		</div>
				<!-- Floating particles for visual enhancement -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			{#each Array(12) as _, i}
				<div 
					class="absolute w-2 h-2 {isDark ? 'bg-blue-400' : 'bg-blue-500'} rounded-full opacity-20 animate-pulse"
					style="
						left: {Math.random() * 100}%; 
						top: {Math.random() * 100}%;
						animation-delay: {i * 0.5}s;
						animation-duration: {2 + Math.random() * 3}s;
					"
				></div>
			{/each}
		</div>
		
		<!-- Interactive gradient orbs -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl" style="animation: float 10s ease-in-out infinite;"></div>
			<div class="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-radial from-purple-400/25 to-transparent rounded-full blur-2xl" style="animation: float 8s ease-in-out infinite reverse;"></div>
			<div class="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-radial from-green-400/30 to-transparent rounded-full blur-xl" style="animation: float 12s ease-in-out infinite;"></div>
		</div>
	</ParallaxLayout>		<!-- Main Content Area -->
	<div class="lg:ml-80 transition-all duration-300 relative">
		<!-- Dynamic background pattern -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
			<div class="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10"></div>
			<div class="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-radial from-blue-400/5 to-transparent rounded-full blur-3xl" style="animation: float 15s ease-in-out infinite;"></div>
			<div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-purple-400/5 to-transparent rounded-full blur-3xl" style="animation: float 20s ease-in-out infinite reverse;"></div>
		</div>		<div class="max-w-7xl mx-auto px-6 py-12">
			
			<!-- Foundation Components Section -->
			<section id="foundation" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
							🎨 Foundation Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Essential building blocks for any modern user interface
					</p>
				</div>
				
				<!-- Buttons Showcase -->
				<div id="button" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔘 Buttons</h3>
					
					<!-- Button Variants -->
					<div class="mb-8">
						<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Variants</h4>
						<div class="flex flex-wrap gap-3">
							{#each buttonVariants as variant}
								<Button {variant} on:click={() => showToastNotification(`${variant} button clicked!`)}>
									{variant.charAt(0).toUpperCase() + variant.slice(1)}
								</Button>
							{/each}
						</div>
					</div>
					
					<!-- Button Sizes -->
					<div class="mb-8">
						<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Sizes</h4>
						<div class="flex flex-wrap gap-3 items-center">
							{#each buttonSizes as size}
								<Button variant="primary" {size}>
									Size {size.toUpperCase()}
								</Button>
							{/each}
						</div>
					</div>
					
					<!-- Special States -->
					<div class="mb-8">
						<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">States</h4>
						<div class="flex flex-wrap gap-3">
							<Button variant="primary" disabled>Disabled</Button>
							<Button variant="primary" loading>Loading</Button>
							<Button variant="primary" fullWidth>Full Width</Button>
						</div>
					</div>

					<!-- Icon Buttons -->
					<div class="mb-8">
						<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Icon Buttons</h4>
						<div class="flex flex-wrap gap-3">
							<Button variant="primary" size="sm">
								<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
								Add Item
							</Button>
							<Button variant="secondary" size="sm">
								<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
								Edit
							</Button>
							<Button variant="error" size="sm">
								<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								Delete
							</Button>
						</div>
					</div>				<!-- Button Groups -->
				<div id="button-groups">
					<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Button Groups</h4>
					<div class="space-y-6">
						<!-- Horizontal Button Group -->
						<div>
							<h5 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Horizontal Group</h5>
							<div class="inline-flex rounded-lg shadow-sm" role="group">
								<Button variant="secondary" class="rounded-r-none border-r-0 focus:z-10">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
									</svg>
									Previous
								</Button>
								<Button variant="secondary" class="rounded-none border-x-0 focus:z-10">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
									</svg>
									Current
								</Button>
								<Button variant="secondary" class="rounded-l-none border-l-0 focus:z-10">
									Next
									<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</Button>
							</div>
						</div>

						<!-- Action Button Group -->
						<div>
							<h5 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Action Group</h5>
							<div class="inline-flex rounded-lg shadow-sm" role="group">
								<Button variant="primary" class="rounded-r-none border-r-0 focus:z-10">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
									Approve
								</Button>
								<Button variant="warning" class="rounded-none border-x-0 focus:z-10">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									Review
								</Button>
								<Button variant="error" class="rounded-l-none border-l-0 focus:z-10">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
									Reject
								</Button>
							</div>
						</div>

						<!-- Toggle Button Group -->
						<div>
							<h5 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Toggle Group</h5>
							<div class="inline-flex rounded-lg shadow-sm" role="group">
								<Button variant="ghost" class="rounded-r-none border-r-0 focus:z-10" animation="scale">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
									</svg>
								</Button>
								<Button variant="ghost" class="rounded-none border-x-0 focus:z-10" animation="scale">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
									</svg>
								</Button>
								<Button variant="ghost" class="rounded-l-none border-l-0 focus:z-10" animation="scale">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
									</svg>
								</Button>
							</div>
						</div>
					</div>
				</div>
				</div>

				<!-- Enhanced Badges & Status -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="badge" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🏷️ Badges</h3>
						<div class="space-y-6">
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Basic Variants</h4>
								<div class="flex flex-wrap gap-3">
									{#each badgeVariants as variant}
										<Badge {variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
									{/each}
								</div>
							</div>
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Status Badges</h4>
								<div class="flex flex-wrap gap-3">
									<Badge variant="success">
										<div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
										Online
									</Badge>
									<Badge variant="warning">
										<div class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
										Away
									</Badge>
									<Badge variant="error">
										<div class="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
										Offline
									</Badge>
								</div>
							</div>
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Count Badges</h4>
								<div class="flex flex-wrap gap-4">
									<div class="relative">
										<Button variant="secondary">Messages</Button>
										<Badge variant="error" class="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs">3</Badge>
									</div>
									<div class="relative">
										<Button variant="secondary">Notifications</Button>
										<Badge variant="warning" class="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs">12</Badge>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="avatar" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">👤 Avatars</h3>
						<div class="space-y-6">
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Sizes</h4>
								<div class="flex items-end gap-4">
									<div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
										XS
									</div>
									<div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
										SM
									</div>
									<div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
										MD
									</div>
									<div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
										LG
									</div>
								</div>
							</div>
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">With Status</h4>
								<div class="flex gap-4">
									<div class="relative">
										<div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
										<div class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'}"></div>
									</div>
									<div class="relative">
										<div class="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
										<div class="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'}"></div>
									</div>
									<div class="relative">
										<div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
										<div class="absolute bottom-0 right-0 w-4 h-4 bg-red-400 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'}"></div>
									</div>
								</div>
							</div>
							<div id="avatar-group">
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Avatar Group</h4>
								<div class="flex -space-x-2">
									<div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'}"></div>
									<div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'}"></div>
									<div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'}"></div>
									<div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full border-2 {isDark ? 'border-gray-800' : 'border-white'} flex items-center justify-center text-white text-sm font-medium">
										+5
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Loading & Status Indicators -->
				<div class="grid lg:grid-cols-3 gap-8 mb-16">
					<div id="spinner" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔄 Spinners</h3>
						<div class="space-y-6">
							<div class="flex gap-4 items-center">
								<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
								<div class="animate-pulse h-8 w-8 bg-blue-600 rounded-full"></div>
								<div class="flex space-x-1">
									<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
									<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
									<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
								</div>
							</div>
						</div>
					</div>

					<div id="skeleton" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">💀 Skeleton</h3>
						<div class="space-y-4">
							<div class="animate-pulse">
								<div class="h-4 {isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded w-3/4"></div>
								<div class="space-y-2 mt-3">
									<div class="h-4 {isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded"></div>
									<div class="h-4 {isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded w-5/6"></div>
								</div>
							</div>
						</div>
					</div>

					<div id="divider" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">➖ Dividers</h3>
						<div class="space-y-6">
							<div>
								<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Content above</p>
								<hr class="my-4 {isDark ? 'border-gray-600' : 'border-gray-300'}">
								<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Content below</p>
							</div>
							<div class="flex items-center">
								<div class="flex-grow {isDark ? 'border-gray-600' : 'border-gray-300'} border-t"></div>
								<span class="px-3 text-sm {isDark ? 'text-gray-400' : 'text-gray-500'}">OR</span>
								<div class="flex-grow {isDark ? 'border-gray-600' : 'border-gray-300'} border-t"></div>
							</div>
						</div>
					</div>
				</div>			</section>
			
			<!-- Layout Components Section -->
			<section id="layout" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🏗️ Layout Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Flexible layout primitives for building responsive interfaces
					</p>
				</div>
				
				<!-- Container Component -->
				<div id="container" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📦 Container</h3>
						<div class="space-y-4">
							<div>
								<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Container Sizes</h4>
								<div class="space-y-4">
									{#each containerSizes as size}
										<Container {size} className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 border-2 border-dashed border-blue-300 dark:border-blue-600">
											<p class="text-center text-sm font-medium {isDark ? 'text-blue-200' : 'text-blue-800'}">
												Container Size: {size}
											</p>
										</Container>
									{/each}
								</div>
							</div>
							
							<div>
								<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Container Padding</h4>
								<div class="space-y-4">
									{#each containerPaddings as padding}
										<Container {padding} size="md" className="bg-purple-100 dark:bg-purple-900/30 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-600">
											<p class="text-center text-sm font-medium {isDark ? 'text-purple-200' : 'text-purple-800'}">
												Padding: {padding}
											</p>
										</Container>
									{/each}
								</div>
							</div>
						</div>
				</div>

				<!-- Grid Component -->
				<div id="grid" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔲 Grid</h3>
					
					<div class="space-y-8">
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Basic Grid Layouts</h4>
							<div class="space-y-6">
								{#each [2, 3, 4] as cols}
									<div>
										<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">{cols} Columns</p>
										<Grid cols={cols} gap="md" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
											{#each Array(cols * 2) as _, i}
												<div class="bg-green-200 dark:bg-green-800 p-4 rounded text-center text-sm font-medium">
													Item {i + 1}
												</div>
											{/each}
										</Grid>
									</div>
								{/each}
							</div>
						</div>
						
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Responsive Grid</h4>
							<Grid cols="2" responsive={true} gap="lg" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
								{#each Array(6) as _, i}
									<div class="bg-orange-200 dark:bg-orange-800 p-6 rounded text-center font-medium">
										Responsive Item {i + 1}
									</div>
								{/each}
							</Grid>
						</div>
					</div>
				</div>

				<!-- Flex Component -->
				<div id="flex" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">↔️ Flex</h3>
					
					<div class="space-y-8">						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Flex Direction</h4>
							<div class="space-y-4">
								{#each flexDirections as direction}
									<div>
										<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Direction: {direction}</p>
										<Flex {direction} gap="md" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[100px]">
											{#each Array(3) as _, i}
												<div class="bg-pink-200 dark:bg-pink-800 p-3 rounded text-center text-sm font-medium">
													{i + 1}
												</div>
											{/each}
										</Flex>
									</div>
								{/each}
							</div>
						</div>
						
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Justify Content</h4>
							<div class="space-y-4">
								{#each flexJustify as justify}
									<div>
										<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Justify: {justify}</p>
										<Flex {justify} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
											{#each Array(3) as _, i}
												<div class="bg-indigo-200 dark:bg-indigo-800 p-3 rounded text-center text-sm font-medium">
													{i + 1}
												</div>
											{/each}
										</Flex>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Stack Component -->
				<div id="stack" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📚 Stack</h3>
					
					<div class="grid lg:grid-cols-2 gap-8">						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Vertical Stack</h4>
							<div class="space-y-4">
								{#each stackSpacing as spacing}
									<div>
										<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Spacing: {spacing}</p>
										<Stack direction="vertical" {spacing} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
											{#each Array(3) as _, i}
												<div class="bg-teal-200 dark:bg-teal-800 p-3 rounded text-center text-sm font-medium">
													Item {i + 1}
												</div>
											{/each}
										</Stack>
									</div>
								{/each}
							</div>
						</div>
						
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Horizontal Stack</h4>
							<div class="space-y-4">
								{#each stackSpacing as spacing}
									<div>
										<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Spacing: {spacing}</p>
										<Stack direction="horizontal" {spacing} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
											{#each Array(3) as _, i}
												<div class="bg-cyan-200 dark:bg-cyan-800 p-3 rounded text-center text-sm font-medium">
													{i + 1}
												</div>
											{/each}
										</Stack>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Section Component -->
				<div id="section-component" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📄 Section</h3>
							<div class="space-y-6">
						{#each sectionVariants as variant}
							<div>
								<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Variant: {variant}</p>
								<Section {variant} padding="md" className="rounded-lg">
									<Container size="md" padding="sm">
										<h4 class="text-lg font-semibold mb-2">Section with {variant} variant</h4>
										<p class="text-sm opacity-75">This is an example of a section component with different styling variants.</p>
									</Container>
								</Section>
							</div>
						{/each}
					</div>
				</div>			</section>
			
			<!-- Enhanced Components Section -->
			<section id="enhanced" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						✨ Enhanced Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Advanced component variations with sophisticated styling and interactions
					</p>
				</div>
				
				<!-- Enhanced Cards -->
				<div id="enhanced-cards" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🃏 Enhanced Cards</h3>
					
					<div class="grid lg:grid-cols-3 gap-6">
						<!-- Gradient Card -->
						<Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none">
							<div class="p-6">
								<h4 class="text-xl font-bold mb-2">Gradient Card</h4>
								<p class="text-purple-100 mb-4">Beautiful gradient backgrounds make your content stand out.</p>
								<Button variant="secondary" size="sm">Learn More</Button>
							</div>
						</Card>
						
						<!-- Glass Card -->
						<Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
							<div class="p-6">
								<h4 class="text-xl font-bold mb-2">Glass Card</h4>
								<p class="text-gray-200 mb-4">Modern glassmorphism effect with backdrop blur.</p>
								<Button variant="ghost" size="sm" className="text-white border-white">Explore</Button>
							</div>
						</Card>
						
						<!-- Interactive Card -->
						<Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
							<div class="p-6">
								<div class="w-12 h-12 bg-blue-500 rounded-lg mb-4 group-hover:bg-blue-600 transition-colors"></div>
								<h4 class="text-xl font-bold mb-2 {isDark ? 'text-white' : 'text-gray-900'}">Interactive Card</h4>
								<p class="{isDark ? 'text-gray-300' : 'text-gray-600'} mb-4">Hover effects and animations create engaging experiences.</p>
								<div class="flex items-center text-blue-500 font-medium">
									View Details
									<svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Card>
					</div>
					
					<!-- Card with Stats -->
					<div class="mt-8">
						<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Stats Cards</h4>
						<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
							{#each [
								{ label: 'Total Users', value: '2,543', change: '+12%', color: 'blue' },
								{ label: 'Revenue', value: '$45,678', change: '+8%', color: 'green' },
								{ label: 'Orders', value: '1,234', change: '-3%', color: 'red' },
								{ label: 'Conversion', value: '3.45%', change: '+15%', color: 'purple' }
							] as stat}
								<Card className="p-6 hover:shadow-lg transition-shadow">
									<div class="flex items-center justify-between mb-2">
										<span class="text-sm font-medium {isDark ? 'text-gray-400' : 'text-gray-500'}">{stat.label}</span>
										<span class="text-xs px-2 py-1 rounded-full {stat.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : stat.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : stat.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}">
											{stat.change}
										</span>
									</div>
									<div class="text-2xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">{stat.value}</div>
								</Card>
							{/each}
						</div>
					</div>
				</div>

				<!-- Enhanced Buttons -->
				<div id="enhanced-buttons" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎨 Enhanced Buttons</h3>
					
					<div class="space-y-8">
						<!-- Gradient Buttons -->
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Gradient Buttons</h4>
							<div class="flex flex-wrap gap-4">
								<button class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
									Purple Pink
								</button>
								<button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105">
									Blue Cyan
								</button>
								<button class="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105">
									Green Teal
								</button>
								<button class="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105">
									Orange Red
								</button>
							</div>
						</div>

						<!-- Animated Buttons -->
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Animated Buttons</h4>
							<div class="flex flex-wrap gap-4">
								<button class="group relative px-6 py-3 bg-blue-500 text-white rounded-lg font-medium overflow-hidden transition-colors hover:bg-blue-600">
									<span class="relative z-10">Slide Effect</span>
									<div class="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
								</button>
								<button class="group px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200">
									<span class="group-hover:scale-110 inline-block transition-transform">Scale Text</span>
								</button>
								<button class="group px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200">
									<span class="flex items-center">
										Bounce Icon
										<svg class="w-4 h-4 ml-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</span>
								</button>
							</div>
						</div>

						<!-- 3D Buttons -->
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">3D & Shadow Effects</h4>
							<div class="flex flex-wrap gap-4">
								<button class="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/75 transition-all duration-200 transform hover:-translate-y-1">
									Shadow Glow
								</button>
								<button class="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.24)] transition-all duration-200 transform hover:-translate-y-2">
									Deep Shadow
								</button>
								<button class="px-6 py-3 bg-gradient-to-b from-green-400 to-green-600 text-white rounded-lg font-medium shadow-inner hover:from-green-500 hover:to-green-700 transition-all duration-200 active:scale-95">
									Inset Shadow
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Enhanced Form Elements -->
				<div id="enhanced-forms" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📝 Enhanced Form Elements</h3>
					
					<div class="grid lg:grid-cols-2 gap-8">
						<!-- Floating Label Inputs -->
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Floating Label Inputs</h4>
							<div class="space-y-4">
								<div class="relative">
									<input 
										type="text" 
										id="floating1"
										class="peer w-full px-3 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg {isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-transparent"
										placeholder="Full Name"
									/>
									<label 
										for="floating1"
										class="absolute left-3 top-2 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
									>
										Full Name
									</label>
								</div>
								<div class="relative">
									<input 
										type="email" 
										id="floating2"
										class="peer w-full px-3 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg {isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-transparent"
										placeholder="Email Address"
									/>
									<label 
										for="floating2"
										class="absolute left-3 top-2 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
									>
										Email Address
									</label>
								</div>
							</div>
						</div>

						<!-- Enhanced Checkboxes & Toggles -->
						<div>
							<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">Custom Controls</h4>
							<div class="space-y-4">
								<!-- Custom Checkbox -->
								<label class="flex items-center cursor-pointer group">
									<div class="relative">
										<input type="checkbox" class="sr-only">
										<div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded border-2 border-gray-300 dark:border-gray-500 group-hover:border-blue-400 transition-colors"></div>
										<div class="absolute inset-0 w-6 h-6 bg-blue-500 rounded opacity-0 group-hover:opacity-20 transition-opacity"></div>
										<svg class="absolute inset-1 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
										</svg>
									</div>
									<span class="ml-3 text-sm font-medium {isDark ? 'text-gray-200' : 'text-gray-700'}">Enhanced checkbox with hover effects</span>
								</label>

								<!-- Custom Toggle -->
								<label class="flex items-center cursor-pointer group">
									<div class="relative">
										<input type="checkbox" class="sr-only">
										<div class="w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded-full shadow-inner transition-colors group-hover:bg-gray-300 dark:group-hover:bg-gray-500"></div>
										<div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform"></div>
									</div>
									<span class="ml-3 text-sm font-medium {isDark ? 'text-gray-200' : 'text-gray-700'}">Smooth toggle animation</span>
								</label>

								<!-- Radio Button Group -->
								<div class="space-y-2">
									<p class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'}">Enhanced Radio Buttons</p>
									{#each ['Option 1', 'Option 2', 'Option 3'] as option, i}
										<label class="flex items-center cursor-pointer group">
											<div class="relative">
												<input type="radio" name="enhanced-radio" class="sr-only">
												<div class="w-5 h-5 border-2 border-gray-300 dark:border-gray-500 rounded-full group-hover:border-blue-400 transition-colors"></div>
												<div class="absolute inset-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 scale-0 transition-all"></div>
											</div>
											<span class="ml-3 text-sm {isDark ? 'text-gray-200' : 'text-gray-700'}">{option}</span>
										</label>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<!-- Form Controls Section -->
			<section id="form-controls" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						📝 Form Controls
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Interactive form elements for data collection and user input
					</p>
				</div>

				<!-- Input Components -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="input" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📝 Input Fields</h3>
						<div class="space-y-6">
							<Input 
								bind:value={inputValue}
								placeholder="Enter some text..."
								label="Text Input"
							/>
							<Input 
								type="email"
								placeholder="email@example.com"
								label="Email Input"
							/>
							<Input 
								type="password"
								placeholder="Password"
								label="Password Input"
							/>
							<Input 
								disabled
								value="Disabled input"
								label="Disabled State"
							/>
							<div id="input-groups">
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Input Groups</h4>
								<div class="flex">
									<span class="inline-flex items-center px-3 text-sm {isDark ? 'text-gray-300 bg-gray-700 border-gray-600' : 'text-gray-900 bg-gray-50 border-gray-300'} border border-r-0 rounded-l-md">
										@
									</span>
									<Input 
										placeholder="username"
										class="rounded-l-none"
									/>
								</div>
							</div>
						</div>
					</div>
					
					<div id="textarea" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📄 Textarea</h3>
						<div class="space-y-6">
							<Textarea 
								bind:value={textareaValue}
								placeholder="Enter multiple lines of text..."
								label="Message"
								rows={4}
							/>
							<Textarea 
								disabled
								value="This textarea is disabled"
								label="Disabled State"
								rows={3}
							/>
							<Textarea 
								placeholder="Auto-resize textarea"
								label="Auto Resize"
								autoResize={true}
								rows={2}
							/>
						</div>
					</div>
				</div>

				<!-- Selection Controls -->
				<div class="grid lg:grid-cols-3 gap-8 mb-16">
					<div id="checkbox" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">☑️ Checkbox</h3>
						<div class="space-y-4">
							<Checkbox 
								bind:checked={checkboxValue}
								label="Check me!"
							/>
							<Checkbox 
								checked={true}
								disabled
								label="Checked & Disabled"
							/>
							<Checkbox 
								indeterminate={true}
								label="Indeterminate"
							/>
								disabled
								label="Disabled (checked)"
							/>
							<Checkbox 
								checked={false}
								disabled
								label="Disabled (unchecked)"
							/>
						</div>
					</div>
					
					<!-- Toggle Component -->
					<div id="toggle" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Toggle</h3>
						<div class="space-y-4">
							<ToggleSimple 
								bind:checked={toggleValue}
								label="Toggle me!"
							/>
							<ToggleSimple 
								checked={true}
								disabled
								label="Disabled (on)"
							/>
							<ToggleSimple 
								checked={false}
								disabled
								label="Disabled (off)"
							/>
						</div>
					</div>
				</div>

				<!-- Advanced Form Controls -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="select" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibent {isDark ? 'text-white' : 'text-gray-900'} mb-6">📋 Select</h3>
						<div class="space-y-6">
							<div>
								<label for="basic-select" class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
									Basic Select
								</label>
								<select id="basic-select" class="w-full px-3 py-2 border {isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option>Select an option</option>
									<option>Option 1</option>
									<option>Option 2</option>
									<option>Option 3</option>
								</select>
							</div>
							<div id="multi-select">
								<label for="multi-select-input" class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
									Multi Select
								</label>
								<select id="multi-select-input" multiple class="w-full px-3 py-2 border {isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" size="4">
									<option>Option 1</option>
									<option>Option 2</option>
									<option>Option 3</option>
									<option>Option 4</option>
								</select>
							</div>
						</div>
					</div>

					<div id="range" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎚️ Range Slider</h3>
						<div class="space-y-6">
							<div>
								<label for="range-slider" class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
									Value: {progressValue}%
								</label>
								<input 
									id="range-slider"
									type="range" 
									min="0" 
									max="100" 
									bind:value={progressValue}
									class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
								>
							</div>
							<div id="rating">
								<div class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
									Rating
								</div>
								<div class="flex gap-1">
									{#each Array(5) as _, i}
										<button 
											class="text-2xl {i < 3 ? 'text-yellow-400' : isDark ? 'text-gray-600' : 'text-gray-300'} hover:text-yellow-400 transition-colors"
											on:click={() => {}}
										>
											★
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- File Upload & Pickers -->
				<div class="grid lg:grid-cols-3 gap-8 mb-16">
					<div id="file-upload" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📎 File Upload</h3>
						<div class="space-y-4">
							<div class="border-2 border-dashed {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-6 text-center">
								<svg class="mx-auto h-12 w-12 {isDark ? 'text-gray-400' : 'text-gray-400'}" stroke="currentColor" fill="none" viewBox="0 0 48 48">
									<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<div class="mt-4">
									<label for="file-upload" class="cursor-pointer">
										<span class="mt-2 block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-900'}">
											Drop files here or click to upload
										</span>
									</label>
									<input id="file-upload" name="file-upload" type="file" class="sr-only" multiple>
								</div>
							</div>
						</div>
					</div>

					<div id="date-picker" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📅 Date Picker</h3>
						<div class="space-y-4">
							<input 
								type="date" 
								class="w-full px-3 py-2 border {isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
							<input 
								type="datetime-local" 
								class="w-full px-3 py-2 border {isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
						</div>
					</div>

					<div id="color-picker" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎨 Color Picker</h3>
						<div class="space-y-4">
							<input 
								type="color" 
								value="#3B82F6"
								class="w-full h-12 border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md cursor-pointer"
							>
							<div class="grid grid-cols-6 gap-2">
								{#each ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6'] as color}
									<button 
										class="w-8 h-8 rounded-md border-2 border-white shadow-md"
										style="background-color: {color}"
										on:click={() => {}}
									></button>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Navigation Components Section -->
			<section id="navigation" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🧭 Navigation Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Navigation patterns for seamless user journeys
					</p>
				</div>

				<!-- Header Variants -->
				<div id="header-variants" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎯 Header Variants</h3>
					<div class="space-y-8">
						<!-- Classic Header -->
						<div class="border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
							<div class="flex items-center justify-between p-4 {isDark ? 'bg-gray-700' : 'bg-white'} border-b {isDark ? 'border-gray-600' : 'border-gray-200'}">
								<div class="flex items-center gap-2">
									<div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
									<span class="font-bold {isDark ? 'text-white' : 'text-gray-900'}">Brand</span>
								</div>								<nav class="hidden md:flex items-center gap-6">
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Home</button>
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">About</button>
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Services</button>
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Contact</button>
								</nav>
								<Button variant="primary" size="sm">Get Started</Button>
							</div>
						</div>

						<!-- Centered Header -->
						<div class="border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
							<div class="text-center p-4 {isDark ? 'bg-gray-700' : 'bg-white'} border-b {isDark ? 'border-gray-600' : 'border-gray-200'}">
								<div class="flex items-center justify-center gap-2 mb-4">
									<div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
									<span class="text-2xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">CenteredBrand</span>
								</div>								<nav class="flex justify-center gap-8">
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Products</button>
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Solutions</button>
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Resources</button>
									<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Company</button>
								</nav>
							</div>
						</div>

						<!-- Sidebar Navigation Header -->
						<div class="border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
							<div class="flex items-center justify-between p-4 {isDark ? 'bg-gray-700' : 'bg-white'}">
								<button class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								</button>
								<div class="flex items-center gap-2">
									<div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
									<span class="font-bold {isDark ? 'text-white' : 'text-gray-900'}">Dashboard</span>
								</div>
								<div class="flex items-center gap-2">
									<button class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 01-7.5-7.5H2" />
										</svg>
									</button>
									<div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full"></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Navigation Patterns -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="tabs" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📑 Tabs</h3>
						<div class="space-y-6">
							<Tabs bind:activeTab={activeTabId} tabs={tabsData} />
							
							<!-- Pill Style Tabs -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Pill Style</h4>
								<div class="flex gap-1 p-1 {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg">
									<button class="px-4 py-2 text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm">Active</button>
									<button class="px-4 py-2 text-sm font-medium rounded-md {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Inactive</button>
									<button class="px-4 py-2 text-sm font-medium rounded-md {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Another</button>
								</div>
							</div>
						</div>
					</div>

					<div id="breadcrumbs" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🍞 Breadcrumbs</h3>
						<div class="space-y-6">
							<nav class="flex" aria-label="Breadcrumb">								<ol class="flex items-center space-x-1 md:space-x-3">
									<li class="flex items-center">
										<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Home</button>
									</li>
									<li class="flex items-center">
										<svg class="w-4 h-4 {isDark ? 'text-gray-400' : 'text-gray-400'} mx-1" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
										</svg>
										<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Components</button>
									</li>
									<li class="flex items-center">
										<svg class="w-4 h-4 {isDark ? 'text-gray-400' : 'text-gray-400'} mx-1" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
										</svg>
										<span class="{isDark ? 'text-gray-400' : 'text-gray-500'}">Navigation</span>
									</li>
								</ol>
							</nav>

							<!-- Icon Breadcrumbs -->
							<nav class="flex" aria-label="Breadcrumb">
								<ol class="flex items-center space-x-2">									<li>
										<button type="button" class="{isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
											</svg>
										</button>
									</li>
									<li class="flex items-center">
										<span class="{isDark ? 'text-gray-400' : 'text-gray-400'}">/</span>
										<button type="button" class="ml-2 {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">Library</button>
									</li>
									<li class="flex items-center">
										<span class="{isDark ? 'text-gray-400' : 'text-gray-400'}">/</span>
										<span class="ml-2 {isDark ? 'text-gray-400' : 'text-gray-500'}">Data</span>
									</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>

				<!-- Pagination -->
				<div id="pagination" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📄 Pagination</h3>
					<div class="space-y-8">
						<!-- Standard Pagination -->
						<div>
							<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-4">Standard</h4>
							<nav class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<span class="text-sm {isDark ? 'text-gray-300' : 'text-gray-700'}">
										Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">97</span> results
									</span>
								</div>
								<div class="flex items-center gap-1">
									<button class="px-3 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">
										Previous
									</button>
									<button class="px-3 py-2 text-sm font-medium bg-blue-600 text-white border border-blue-600 rounded-md">1</button>
									<button class="px-3 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">2</button>
									<button class="px-3 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">3</button>
									<span class="px-3 py-2 text-sm {isDark ? 'text-gray-400' : 'text-gray-500'}">...</span>
									<button class="px-3 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">10</button>
									<button class="px-3 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">
										Next
									</button>
								</div>
							</nav>
						</div>

						<!-- Simple Pagination -->
						<div>
							<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-4">Simple</h4>
							<nav class="flex items-center justify-between">
								<button class="flex items-center px-4 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
									</svg>
									Previous
								</button>
								<span class="text-sm {isDark ? 'text-gray-300' : 'text-gray-700'}">Page 1 of 10</span>
								<button class="flex items-center px-4 py-2 text-sm font-medium {isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'} border {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md transition-colors">
									Next
									<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</button>
							</nav>
						</div>
					</div>				</div>
			</section>

			<!-- Advanced Navigation Section -->
			<section id="advanced-navigation" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🧭 Advanced Navigation
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Sophisticated navigation patterns for complex applications
					</p>
				</div>

				<!-- Complex Navigation Patterns -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="mega-menu" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🍔 Mega Menu</h3>
						<div class="space-y-6">
							<!-- Mega Menu Preview -->
							<div class="border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
								<div class="flex {isDark ? 'bg-gray-700' : 'bg-gray-50'} border-b {isDark ? 'border-gray-600' : 'border-gray-200'}">
									<button class="px-4 py-3 text-sm font-medium {isDark ? 'text-white hover:bg-gray-600' : 'text-gray-900 hover:bg-gray-100'} transition-colors">Products</button>
									<button class="px-4 py-3 text-sm font-medium {isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-100'} transition-colors">Solutions</button>
									<button class="px-4 py-3 text-sm font-medium {isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-100'} transition-colors">Resources</button>
								</div>
								<div class="p-6 grid grid-cols-3 gap-6">									<div>
										<h4 class="text-sm font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-3">Web Development</h4>
										<ul class="space-y-2">
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">Frontend</button></li>
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">Backend</button></li>
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">Full Stack</button></li>
										</ul>
									</div>
									<div>
										<h4 class="text-sm font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-3">Mobile</h4>
										<ul class="space-y-2">
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">iOS</button></li>
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">Android</button></li>
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">Cross-platform</button></li>
										</ul>
									</div>
									<div>
										<h4 class="text-sm font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-3">Cloud</h4>
										<ul class="space-y-2">
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">AWS</button></li>
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">Azure</button></li>
											<li><button class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left">GCP</button></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="command-palette" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">⌘ Command Palette</h3>
						<div class="space-y-6">
							<!-- Command Palette Trigger -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Quick Actions</h4>
								<div class="flex items-center space-x-2 p-3 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg">
									<svg class="w-4 h-4 {isDark ? 'text-gray-400' : 'text-gray-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
									<span class="text-sm {isDark ? 'text-gray-400' : 'text-gray-500'}">Type a command or search...</span>
									<div class="ml-auto">
										<kbd class="px-2 py-1 text-xs font-semibold {isDark ? 'text-gray-300 bg-gray-600 border-gray-500' : 'text-gray-500 bg-white border-gray-300'} border rounded">⌘K</kbd>
									</div>
								</div>
							</div>

							<!-- Command Results -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Recent Commands</h4>
								<div class="space-y-1">
									{#each [
										{ icon: '🎨', label: 'Change Theme', shortcut: '⌘T' },
										{ icon: '📄', label: 'New File', shortcut: '⌘N' },
										{ icon: '🔍', label: 'Search Files', shortcut: '⌘P' },
										{ icon: '⚙️', label: 'Open Settings', shortcut: '⌘,' }
									] as command}
										<div class="flex items-center justify-between p-2 {isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded cursor-pointer transition-colors">
											<div class="flex items-center space-x-3">
												<span class="text-lg">{command.icon}</span>
												<span class="text-sm {isDark ? 'text-white' : 'text-gray-900'}">{command.label}</span>
											</div>
											<kbd class="px-2 py-1 text-xs font-semibold {isDark ? 'text-gray-300 bg-gray-600 border-gray-500' : 'text-gray-500 bg-white border-gray-300'} border rounded">{command.shortcut}</kbd>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Navigation Hierarchies -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="tree-navigation" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🌳 Tree Navigation</h3>
						<div class="space-y-2">
							<!-- Tree structure -->
							<div class="space-y-1">
								<div class="flex items-center space-x-2 p-2 {isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded cursor-pointer">
									<svg class="w-4 h-4 {isDark ? 'text-gray-400' : 'text-gray-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
									<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
									</svg>
									<span class="text-sm {isDark ? 'text-white' : 'text-gray-900'}">src</span>
								</div>
								<div class="ml-6 space-y-1">
									<div class="flex items-center space-x-2 p-2 {isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded cursor-pointer">
										<svg class="w-4 h-4 {isDark ? 'text-gray-400' : 'text-gray-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
										<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
										</svg>
										<span class="text-sm {isDark ? 'text-white' : 'text-gray-900'}">components</span>
									</div>
									<div class="flex items-center space-x-2 p-2 {isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded cursor-pointer">
										<div class="w-4"></div>
										<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										<span class="text-sm {isDark ? 'text-white' : 'text-gray-900'}">App.svelte</span>
									</div>
									<div class="flex items-center space-x-2 p-2 {isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded cursor-pointer">
										<div class="w-4"></div>
										<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
										</svg>
										<span class="text-sm {isDark ? 'text-white' : 'text-gray-900'}">routes</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="contextual-navigation" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📍 Contextual Navigation</h3>
						<div class="space-y-6">
							<!-- Context Menu -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Context Menu</h4>
								<div class="relative inline-block">
									<button class="px-4 py-2 {isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} rounded transition-colors">
										Right-click me
									</button>
									<div class="absolute top-full left-0 mt-1 w-48 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-1 hidden">
										{#each [
											{ icon: '✏️', label: 'Edit', shortcut: '⌘E' },
											{ icon: '📋', label: 'Copy', shortcut: '⌘C' },
											{ icon: '📁', label: 'Move to folder', shortcut: '' },
											{ divider: true },
											{ icon: '🗑️', label: 'Delete', shortcut: '⌫', danger: true }
										] as item}
											{#if item.divider}
												<div class="my-1 border-t {isDark ? 'border-gray-600' : 'border-gray-200'}"></div>
											{:else}
												<button class="w-full flex items-center justify-between px-4 py-2 text-sm {item.danger ? 'text-red-600 hover:bg-red-50' : isDark ? 'text-white hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-50'} transition-colors">
													<div class="flex items-center space-x-3">
														<span>{item.icon}</span>
														<span>{item.label}</span>
													</div>
													{#if item.shortcut}
														<kbd class="text-xs {isDark ? 'text-gray-400' : 'text-gray-500'}">{item.shortcut}</kbd>
													{/if}
												</button>
											{/if}
										{/each}
									</div>
								</div>
							</div>

							<!-- Floating Action Button -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Floating Actions</h4>
								<div class="relative">
									<button class="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
										<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
										</svg>
									</button>
									<div class="absolute bottom-16 left-0 space-y-2 hidden">
										<button class="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
											</svg>
										</button>
										<button class="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Multi-level Navigation -->
				<div class="grid lg:grid-cols-1 gap-8">
					<div id="multi-level-nav" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔄 Multi-level Navigation</h3>
						<div class="grid lg:grid-cols-3 gap-8">
							<!-- Step Navigation -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-4">Step Navigation</h4>
								<div class="space-y-4">
									{#each [
										{ step: 1, title: 'Basic Info', completed: true, active: false },
										{ step: 2, title: 'Details', completed: true, active: false },
										{ step: 3, title: 'Review', completed: false, active: true },
										{ step: 4, title: 'Complete', completed: false, active: false }
									] as step}
										<div class="flex items-center space-x-3">
											<div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
												{step.completed ? 'bg-green-600 text-white' : step.active ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}
											">
												{#if step.completed}
													<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
													</svg>
												{:else}
													{step.step}
												{/if}
											</div>
											<span class="text-sm {step.active ? isDark ? 'text-white' : 'text-gray-900' : isDark ? 'text-gray-300' : 'text-gray-600'} font-medium">
												{step.title}
											</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Tab-based Navigation -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-4">Tab Navigation</h4>
								<div class="border-b {isDark ? 'border-gray-600' : 'border-gray-200'}">
									<nav class="-mb-px flex space-x-8">
										{#each [
											{ label: 'Overview', active: true },
											{ label: 'Analytics', active: false },
											{ label: 'Settings', active: false }
										] as tab}
											<button class="py-2 px-1 border-b-2 font-medium text-sm transition-colors
												{tab.active 
													? 'border-blue-500 text-blue-600' 
													: isDark 
														? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
														: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
												}
											">
												{tab.label}
											</button>
										{/each}
									</nav>
								</div>
							</div>

							<!-- Sidebar Navigation -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-4">Sidebar Navigation</h4>
								<nav class="space-y-1">
									{#each [
										{ icon: '🏠', label: 'Dashboard', active: true, badge: '' },
										{ icon: '👥', label: 'Team', active: false, badge: '5' },
										{ icon: '📊', label: 'Analytics', active: false, badge: '' },
										{ icon: '⚙️', label: 'Settings', active: false, badge: '' }
									] as item}
										<button class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors
											{item.active 
												? 'bg-blue-100 text-blue-700' 
												: isDark 
													? 'text-gray-300 hover:bg-gray-700 hover:text-white'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
											}
										">
											<div class="flex items-center space-x-3">
												<span>{item.icon}</span>
												<span>{item.label}</span>
											</div>
											{#if item.badge}
												<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
													{item.badge}
												</span>
											{/if}
										</button>
									{/each}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Data Display Section -->
			<section id="data-display" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						📊 Data Display
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Present and organize information with clarity and style
					</p>
				</div>

				<!-- Data Tables & Lists -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="table" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📋 Data Table</h3>
						<Table columns={tableColumns} data={tableData} />
					</div>

					<div id="stats" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibent {isDark ? 'text-white' : 'text-gray-900'} mb-6">📈 Statistics</h3>
						<Stats stats={statsData} />
					</div>				</div>

				<!-- Code Display & JSON -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="code" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">💻 Code Block</h3>
						<div class="space-y-4">
							<div class="relative">
								<pre class="p-4 {isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} rounded-lg overflow-x-auto text-sm"><code>{`function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}</code></pre>
								<button class="absolute top-2 right-2 p-2 {isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300'} rounded transition-colors">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div id="json" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📄 JSON Viewer</h3>
						<div class="relative">
							<pre class="p-4 {isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} rounded-lg overflow-x-auto text-sm max-h-64"><code>{JSON.stringify({
								"name": "Component Explorer",
								"version": "1.0.0",
								"features": [
									"Interactive UI",
									"Dark Mode",
									"Responsive Design"
								],
								"metadata": {
									"author": "Reckless98",
									"created": "2025-05-24",
									"components": 127
								}
							}, null, 2)}</code></pre>
							<button class="absolute top-2 right-2 p-2 {isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300'} rounded transition-colors">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
							</button>
						</div>
					</div>
				</div>

				<!-- KPI Cards & Metrics -->
				<div id="kpi" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📊 KPI Cards</h3>
					<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{#each [
							{ title: 'Total Revenue', value: '$124,563', change: '+12.5%', positive: true, icon: '💰' },
							{ title: 'Active Users', value: '8,549', change: '+3.2%', positive: true, icon: '👥' },
							{ title: 'Conversion Rate', value: '3.24%', change: '-0.8%', positive: false, icon: '📈' },
							{ title: 'Avg. Order Value', value: '$89.32', change: '+5.1%', positive: true, icon: '🛒' }
						] as kpi}
							<div class="p-6 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-xl">
								<div class="flex items-center justify-between mb-2">
									<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-600'}">{kpi.title}</h4>
									<span class="text-2xl">{kpi.icon}</span>
								</div>
								<div class="text-2xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-1">{kpi.value}</div>
								<div class="flex items-center gap-1">
									<span class="text-sm font-medium {kpi.positive ? 'text-green-600' : 'text-red-600'}">
										{kpi.change}
									</span>									<svg class="w-4 h-4 {kpi.positive ? 'text-green-600' : 'text-red-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={kpi.positive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
									</svg>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- Feedback & Status Section -->
			<section id="feedback" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						💬 Feedback & Status
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Provide clear feedback and status indicators to guide users
					</p>
				</div>

				<!-- Alerts & Notifications -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="alert" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🚨 Alerts</h3>
						<div class="space-y-4">
							{#each alertTypes as type}
								<Alert {type} title={`${type.charAt(0).toUpperCase() + type.slice(1)} Alert`}>
									This is a sample alert message for the {type} type.
								</Alert>
							{/each}
						</div>
					</div>

					<div id="toast" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔔 Toast Notifications</h3>
						<div class="space-y-4">
							<Button variant="primary" on:click={() => showToastNotification('Success! Operation completed.')}>
								Show Success Toast
							</Button>
							<Button variant="warning" on:click={() => showToastNotification('Warning! Please check your input.')}>
								Show Warning Toast
							</Button>
							<Button variant="error" on:click={() => showToastNotification('Error! Something went wrong.')}>
								Show Error Toast
							</Button>
							
							<!-- Preview Toast Styles -->
							<div class="space-y-3 pt-4 border-t {isDark ? 'border-gray-600' : 'border-gray-200'}">
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'}">Preview Styles</h4>
								<div class="p-3 bg-green-50 border border-green-200 rounded-lg">
									<div class="flex items-center">
										<svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
										</svg>
										<span class="text-green-800 text-sm">Success notification</span>
									</div>
								</div>
								<div class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
									<div class="flex items-center">
										<svg class="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
										<span class="text-yellow-800 text-sm">Warning notification</span>
									</div>
								</div>
								<div class="p-3 bg-red-50 border border-red-200 rounded-lg">
									<div class="flex items-center">
										<svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
										</svg>
										<span class="text-red-800 text-sm">Error notification</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Progress & Loading States -->
				<div class="grid lg:grid-cols-3 gap-8 mb-16">
					<div id="progress" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📊 Progress</h3>
						<div class="space-y-6">
							<Progress value={progressValue} />
							<Progress value={25} color="green" />
							<Progress value={60} color="yellow" showLabel={true} />
							<Progress value={85} color="red" animated={true} />
						</div>
					</div>

					<div id="loading-states" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">⏳ Loading States</h3>
						<div class="space-y-6">
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Button Loading</h4>
								<Button variant="primary" loading>Processing...</Button>
							</div>
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Card Loading</h4>
								<div class="p-4 {isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg">
									<div class="animate-pulse">
										<div class="h-4 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded w-3/4 mb-2"></div>
										<div class="h-4 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded w-1/2"></div>
									</div>
								</div>
							</div>
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">List Loading</h4>
								<div class="space-y-2">
									{#each Array(3) as _}
										<div class="flex items-center space-x-3 animate-pulse">
											<div class="w-8 h-8 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded-full"></div>
											<div class="flex-1 space-y-1">
												<div class="h-3 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded w-3/4"></div>
												<div class="h-3 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded w-1/2"></div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>

					<div id="empty-states" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📭 Empty States</h3>
						<div class="space-y-6">
							<div class="text-center py-8">
								<svg class="mx-auto h-12 w-12 {isDark ? 'text-gray-400' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 48 48">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4m0 0h6m-9 9v8a2 2 0 002 2h2a2 2 0 002-2v-8m-6 4h4" />
								</svg>
								<h3 class="mt-2 text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-900'}">No items</h3>
								<p class="mt-1 text-sm {isDark ? 'text-gray-400' : 'text-gray-500'}">Get started by creating a new item.</p>
								<div class="mt-6">
									<Button variant="primary" size="sm">Add Item</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Interactive Components Section -->
			<section id="interactive" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🎮 Interactive Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Engage users with interactive and dynamic elements
					</p>
				</div>

				<!-- Modal & Search -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="modal" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🪟 Modal</h3>
						<div class="space-y-4">
							<Button variant="primary" on:click={() => showModal = true}>
								Open Modal
							</Button>
							<Button variant="secondary" on:click={() => showModal = true}>
								Open with Custom Content
							</Button>
							
							<!-- Modal Preview -->
							<div class="border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4 bg-opacity-50">
								<div class="text-center">
									<h4 class="font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-2">Modal Preview</h4>
									<p class="text-sm {isDark ? 'text-gray-400' : 'text-gray-600'}">This is how a modal would appear</p>
									<div class="mt-4 flex gap-2 justify-center">
										<Button size="sm" variant="primary">Confirm</Button>
										<Button size="sm" variant="ghost">Cancel</Button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="search" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔍 Search</h3>
						<div class="space-y-6">
							<Search 
								bind:value={searchValue}
								placeholder="Search components..."
							/>
							
							<!-- Advanced Search -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Advanced Search</h4>
								<div class="space-y-3">
									<div class="flex gap-2">
										<Input placeholder="Keywords" class="flex-1" />
										<Button variant="secondary" size="sm">Filter</Button>
									</div>
									<div class="flex gap-2">
										<select class="flex-1 px-3 py-2 border {isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
											<option>All Categories</option>
											<option>Components</option>
											<option>Layouts</option>
											<option>Utilities</option>
										</select>
										<select class="px-3 py-2 border {isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
											<option>Latest</option>
											<option>Oldest</option>
											<option>Popular</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Drag & Drop and Advanced Interactions -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="drag-drop" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🖱️ Drag & Drop</h3>
						<div class="space-y-6">
							<div class="grid grid-cols-2 gap-4">
								<div class="border-2 border-dashed {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-4 min-h-[120px]">
									<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Drag from here</h4>
									<div class="space-y-2">
										<div class="p-2 {isDark ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'} rounded cursor-move">Item 1</div>
										<div class="p-2 {isDark ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'} rounded cursor-move">Item 2</div>
										<div class="p-2 {isDark ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-800'} rounded cursor-move">Item 3</div>
									</div>
								</div>
								<div class="border-2 border-dashed {isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-4 min-h-[120px] {isDark ? 'bg-gray-700' : 'bg-gray-50'}">
									<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Drop here</h4>
									<p class="text-xs {isDark ? 'text-gray-400' : 'text-gray-500'}">Drag items from the left panel</p>
								</div>
							</div>
						</div>
					</div>

					<div id="tooltips" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">💬 Tooltips & Popovers</h3>
						<div class="space-y-6">
							<div class="flex flex-wrap gap-4">
								<button class="relative group px-4 py-2 {isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} rounded transition-colors">
									Hover me
									<div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
										This is a tooltip
									</div>
								</button>
								<button class="relative group px-4 py-2 {isDark ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-900'} rounded transition-colors">
									Top tooltip
									<div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
										Tooltip on top
									</div>
								</button>
								<button class="relative group px-4 py-2 {isDark ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-100 hover:bg-green-200 text-green-900'} rounded transition-colors">
									Right tooltip
									<div class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
										Side tooltip
									</div>
								</button>
							</div>
							
							<!-- Popover Example -->
							<div class="border-t {isDark ? 'border-gray-600' : 'border-gray-200'} pt-4">
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Popover</h4>
								<div class="relative inline-block">
									<Button variant="secondary" size="sm">Click for popover</Button>
									<div class="absolute top-full left-0 mt-2 w-64 p-4 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-10 hidden">
										<h5 class="font-medium {isDark ? 'text-white' : 'text-gray-900'} mb-2">Popover Title</h5>
										<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'} mb-3">This is the content of the popover. It can contain more detailed information.</p>
										<Button size="sm" variant="primary">Action</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>			</section>

			<!-- Overlays & Dialogs Section -->
			<section id="overlays" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🪟 Overlays & Dialogs
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Modal dialogs, popovers, and overlay components for enhanced user interaction
					</p>
				</div>

				<!-- Modals & Dialogs -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="modal-variants" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🪟 Modal Variants</h3>
						<div class="space-y-6">
							<!-- Standard Modal -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Standard Modal</h4>
								<Button variant="primary" size="sm" on:click={() => showModal = true}>
									Open Standard Modal
								</Button>
							</div>

							<!-- Confirmation Dialog -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Confirmation Dialog</h4>
								<div class="p-4 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg">
									<h5 class="font-medium {isDark ? 'text-white' : 'text-gray-900'} mb-2">Delete Item?</h5>
									<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'} mb-4">This action cannot be undone.</p>
									<div class="flex gap-2">
										<Button size="sm" variant="error">Delete</Button>
										<Button size="sm" variant="ghost">Cancel</Button>
									</div>
								</div>
							</div>

							<!-- Alert Dialog -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Alert Dialog</h4>
								<div class="p-4 {isDark ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg">
									<div class="flex items-start">
										<svg class="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
										<div>
											<h5 class="font-medium {isDark ? 'text-yellow-200' : 'text-yellow-800'} mb-1">Warning</h5>
											<p class="text-sm {isDark ? 'text-yellow-300' : 'text-yellow-700'}">This action requires your attention.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="drawer-sidebar" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📄 Drawer & Sheets</h3>
						<div class="space-y-6">
							<!-- Drawer Preview -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Side Drawer</h4>
								<div class="relative h-32 {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden">
									<div class="absolute inset-y-0 right-0 w-24 {isDark ? 'bg-gray-600' : 'bg-white'} shadow-lg">
										<div class="p-3">
											<div class="h-2 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded mb-2"></div>
											<div class="h-2 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded w-3/4 mb-2"></div>
											<div class="h-2 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded w-1/2"></div>
										</div>
									</div>
								</div>
								<Button size="sm" variant="secondary" class="mt-2">Open Drawer</Button>
							</div>

							<!-- Bottom Sheet Preview -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Bottom Sheet</h4>
								<div class="relative h-32 {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden">
									<div class="absolute inset-x-0 bottom-0 h-16 {isDark ? 'bg-gray-600' : 'bg-white'} shadow-lg rounded-t-lg">
										<div class="p-3">
											<div class="w-8 h-1 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded mx-auto mb-2"></div>
											<div class="h-2 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded w-3/4 mb-1"></div>
											<div class="h-2 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded w-1/2"></div>
										</div>
									</div>
								</div>
								<Button size="sm" variant="secondary" class="mt-2">Open Sheet</Button>
							</div>

							<!-- Backdrop -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Backdrop</h4>
								<div class="relative h-20 {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden">
									<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
										<div class="w-16 h-12 {isDark ? 'bg-gray-600' : 'bg-white'} rounded shadow-lg"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Popovers & Tooltips -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="popover-variants" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">💭 Popover Variants</h3>
						<div class="space-y-6">
							<!-- Rich Content Popover -->
							<div class="relative">
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Rich Content Popover</h4>
								<Button variant="secondary" size="sm">Show Rich Popover</Button>
								<div class="mt-4 p-4 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg">
									<div class="flex items-start space-x-3">
										<div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
											JD
										</div>
										<div>
											<h5 class="font-semibold {isDark ? 'text-white' : 'text-gray-900'}">John Doe</h5>
											<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'} mb-2">Senior Developer</p>
											<div class="flex space-x-2">
												<Button size="sm" variant="primary">Follow</Button>
												<Button size="sm" variant="ghost">Message</Button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- Form Popover -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Form Popover</h4>
								<Button variant="secondary" size="sm">Quick Action</Button>
								<div class="mt-4 p-4 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg">
									<h5 class="font-medium {isDark ? 'text-white' : 'text-gray-900'} mb-3">Quick Note</h5>
									<textarea 
										class="w-full px-3 py-2 {isDark ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-md text-sm"
										placeholder="Enter your note..."
										rows="3"
									></textarea>
									<div class="flex justify-end space-x-2 mt-3">
										<Button size="sm" variant="ghost">Cancel</Button>
										<Button size="sm" variant="primary">Save</Button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="tooltip-variants" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">💡 Advanced Tooltips</h3>
						<div class="space-y-6">
							<!-- Tooltip Positions -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Tooltip Positions</h4>
								<div class="grid grid-cols-2 gap-4">
									<div class="text-center">
										<button class="relative group px-4 py-2 {isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-900'} rounded transition-colors">
											Top
											<div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
												Tooltip on top
											</div>
										</button>
									</div>
									<div class="text-center">
										<button class="relative group px-4 py-2 {isDark ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-100 hover:bg-green-200 text-green-900'} rounded transition-colors">
											Right
											<div class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
												Right tooltip
											</div>
										</button>
									</div>
									<div class="text-center">
										<button class="relative group px-4 py-2 {isDark ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-900'} rounded transition-colors">
											Bottom
											<div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
												Bottom tooltip
											</div>
										</button>
									</div>
									<div class="text-center">
										<button class="relative group px-4 py-2 {isDark ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-100 hover:bg-purple-200 text-purple-900'} rounded transition-colors">
											Left
											<div class="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
												Left tooltip
											</div>
										</button>
									</div>
								</div>
							</div>

							<!-- Rich Tooltips -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Rich Content Tooltips</h4>
								<div class="space-y-3">
									<button class="relative group px-4 py-2 {isDark ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} rounded transition-colors">
										Hover for info
										<div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48">
											<div class="font-semibold mb-1">Feature Info</div>
											<div class="text-gray-300">This tooltip contains rich content including multiple lines and formatting.</div>
										</div>
									</button>

									<button class="relative group px-4 py-2 {isDark ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-100 hover:bg-red-200 text-red-900'} rounded transition-colors">
										Error state
										<div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-red-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-40">
											<div class="flex items-center">
												<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
												</svg>
												Error occurred
											</div>
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Notification & Toast Variants -->
				<div class="grid lg:grid-cols-2 gap-8">
					<div id="notification-center" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔔 Notification Center</h3>
						<div class="space-y-4">
							{#each [
								{ type: 'success', title: 'Success!', message: 'Your changes have been saved.', time: '2m ago' },
								{ type: 'warning', title: 'Warning', message: 'Your session will expire soon.', time: '5m ago' },
								{ type: 'info', title: 'Update Available', message: 'A new version is ready to install.', time: '1h ago' },
								{ type: 'error', title: 'Error', message: 'Failed to connect to server.', time: '2h ago' }
							] as notification}
								<div class="flex items-start space-x-3 p-3 {isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg">
									<div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
										{notification.type === 'success' ? 'bg-green-100 text-green-600' : ''}
										{notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
										{notification.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
										{notification.type === 'error' ? 'bg-red-100 text-red-600' : ''}
									">
										{#if notification.type === 'success'}
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
											</svg>
										{:else if notification.type === 'warning'}
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
											</svg>
										{:else if notification.type === 'info'}
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
											</svg>
										{:else}
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
											</svg>
										{/if}
									</div>
									<div class="flex-1 min-w-0">
										<p class="text-sm font-medium {isDark ? 'text-white' : 'text-gray-900'}">{notification.title}</p>
										<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">{notification.message}</p>
										<p class="text-xs {isDark ? 'text-gray-400' : 'text-gray-500'} mt-1">{notification.time}</p>
									</div>
									<button class="flex-shrink-0 {isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>

					<div id="toast-variants" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🍞 Toast Variants</h3>
						<div class="space-y-6">
							<!-- Toast Triggers -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Toast Types</h4>
								<div class="grid grid-cols-2 gap-2">
									<Button size="sm" variant="success" on:click={() => showToastNotification('Success! Operation completed.')}>Success Toast</Button>
									<Button size="sm" variant="error" on:click={() => showToastNotification('Error! Something went wrong.')}>Error Toast</Button>
									<Button size="sm" variant="warning" on:click={() => showToastNotification('Warning! Please check your input.')}>Warning Toast</Button>
									<Button size="sm" variant="primary" on:click={() => showToastNotification('Info: New update available.')}>Info Toast</Button>
								</div>
							</div>

							<!-- Toast Preview -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Toast Preview</h4>
								<div class="space-y-3">
									<!-- Success Toast -->
									<div class="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
										<svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
										</svg>
										<div class="flex-1">
											<p class="text-sm font-medium text-green-800">Successfully saved!</p>
										</div>
										<button class="text-green-500 hover:text-green-700">
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
											</svg>
										</button>
									</div>

									<!-- Error Toast -->
									<div class="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
										<svg class="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
										<div class="flex-1">
											<p class="text-sm font-medium text-red-800">Error occurred!</p>
											<p class="text-xs text-red-600">Please try again later.</p>
										</div>
										<button class="text-red-500 hover:text-red-700">
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
											</svg>
										</button>
									</div>

									<!-- Action Toast -->
									<div class="flex items-center p-3 {isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow">
										<div class="flex-1">
											<p class="text-sm font-medium {isDark ? 'text-white' : 'text-gray-900'}">File uploaded</p>
											<p class="text-xs {isDark ? 'text-gray-300' : 'text-gray-600'}">document.pdf</p>
										</div>
										<div class="flex space-x-2">
											<Button size="sm" variant="primary">View</Button>
											<button class="{isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors">
												<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Data Visualization Section -->
			<section id="visualization" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						📈 Data Visualization
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Transform data into beautiful, insightful visualizations
					</p>
				</div>

				<!-- Charts & Graphs -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<div id="charts" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📊 Charts</h3>
						<div class="space-y-6">
							<!-- Simulated Bar Chart -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Bar Chart</h4>
								<div class="flex items-end space-x-2 h-32">
									{#each [60, 80, 45, 90, 70, 55, 85] as value, i}
										<div class="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer" 
											 style="height: {value}%"
											 title="Value: {value}%">
										</div>
									{/each}
								</div>
								<div class="flex justify-between text-xs {isDark ? 'text-gray-400' : 'text-gray-500'} mt-2">
									<span>Mon</span>
									<span>Tue</span>
									<span>Wed</span>
									<span>Thu</span>
									<span>Fri</span>
									<span>Sat</span>
									<span>Sun</span>
								</div>
							</div>

							<!-- Simulated Line Chart -->
							<div>
								<h4 class="text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-3">Line Chart</h4>
								<div class="relative h-24 {isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded">
									<svg class="w-full h-full" viewBox="0 0 300 100">
										<polyline 
											fill="none" 
											stroke="#3B82F6" 
											stroke-width="2" 
											points="20,80 60,20 100,40 140,15 180,30 220,10 260,25"
										/>
										<circle cx="20" cy="80" r="3" fill="#3B82F6" />
										<circle cx="60" cy="20" r="3" fill="#3B82F6" />
										<circle cx="100" cy="40" r="3" fill="#3B82F6" />
										<circle cx="140" cy="15" r="3" fill="#3B82F6" />
										<circle cx="180" cy="30" r="3" fill="#3B82F6" />
										<circle cx="220" cy="10" r="3" fill="#3B82F6" />
										<circle cx="260" cy="25" r="3" fill="#3B82F6" />
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div id="pie-chart" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🥧 Pie Chart</h3>
						<div class="space-y-6">
							<!-- Simulated Donut Chart -->
							<div class="flex items-center justify-center">
								<div class="relative w-32 h-32">
									<svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
										<!-- Background circle -->
										<circle cx="60" cy="60" r="50" fill="transparent" stroke={isDark ? '#374151' : '#E5E7EB'} stroke-width="20"/>
										<!-- Progress segments -->
										<circle cx="60" cy="60" r="50" fill="transparent" stroke="#3B82F6" stroke-width="20" 
												stroke-dasharray="94.2 314" stroke-dashoffset="0"/>
										<circle cx="60" cy="60" r="50" fill="transparent" stroke="#10B981" stroke-width="20" 
												stroke-dasharray="62.8 314" stroke-dashoffset="-94.2"/>
										<circle cx="60" cy="60" r="50" fill="transparent" stroke="#F59E0B" stroke-width="20" 
												stroke-dasharray="47.1 314" stroke-dashoffset="-157"/>
										<circle cx="60" cy="60" r="50" fill="transparent" stroke="#EF4444" stroke-width="20" 
												stroke-dasharray="31.4 314" stroke-dashoffset="-204.1"/>
									</svg>
									<div class="absolute inset-0 flex items-center justify-center">
										<div class="text-center">
											<div class="text-2xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">100%</div>
											<div class="text-xs {isDark ? 'text-gray-400' : 'text-gray-500'}">Total</div>
										</div>
									</div>
								</div>
							</div>
							
							<!-- Legend -->
							<div class="space-y-2">
								{#each [
									{ color: '#3B82F6', label: 'Desktop', value: '30%' },
									{ color: '#10B981', label: 'Mobile', value: '20%' },
									{ color: '#F59E0B', label: 'Tablet', value: '15%' },
									{ color: '#EF4444', label: 'Other', value: '10%' }
								] as item}
									<div class="flex items-center justify-between">
										<div class="flex items-center">
											<div class="w-3 h-3 rounded-full mr-2" style="background-color: {item.color}"></div>
											<span class="text-sm {isDark ? 'text-gray-300' : 'text-gray-700'}">{item.label}</span>
										</div>
										<span class="text-sm font-medium {isDark ? 'text-white' : 'text-gray-900'}">{item.value}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Advanced Visualizations -->
				<div class="grid lg:grid-cols-3 gap-8 mb-16">
					<div id="heatmap" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔥 Heatmap</h3>
						<div class="space-y-4">
							<div class="grid grid-cols-7 gap-1">
								{#each Array(35) as _, i}
									<div class="w-4 h-4 rounded-sm" 
										 style="background-color: {['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB'][Math.floor(Math.random() * 7)]}">
									</div>
								{/each}
							</div>
							<div class="flex items-center justify-between text-xs {isDark ? 'text-gray-400' : 'text-gray-500'}">
								<span>Less</span>
								<div class="flex gap-1">
									{#each ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB'] as color}
										<div class="w-3 h-3 rounded-sm" style="background-color: {color}"></div>
									{/each}
								</div>
								<span>More</span>
							</div>
						</div>
					</div>

					<div id="gauge" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎯 Gauge</h3>
						<div class="flex items-center justify-center">
							<div class="relative w-32 h-16 overflow-hidden">
								<svg class="w-32 h-32" viewBox="0 0 120 120">
									<!-- Background arc -->
									<path d="M 20 60 A 40 40 0 0 1 100 60" fill="none" stroke={isDark ? '#374151' : '#E5E7EB'} stroke-width="8"/>
									<!-- Progress arc (75%) -->
									<path d="M 20 60 A 40 40 0 0 1 90 30" fill="none" stroke="#3B82F6" stroke-width="8" stroke-linecap="round"/>
								</svg>
								<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
									<div class="text-center">
										<div class="text-xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">75%</div>
										<div class="text-xs {isDark ? 'text-gray-400' : 'text-gray-500'}">Performance</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="sparklines" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">⚡ Sparklines</h3>
						<div class="space-y-4">
							{#each [
								{ label: 'Sales', trend: 'up', color: '#10B981' },
								{ label: 'Users', trend: 'up', color: '#3B82F6' },
								{ label: 'Bounce Rate', trend: 'down', color: '#EF4444' }
							] as metric}
								<div class="flex items-center justify-between">
									<span class="text-sm {isDark ? 'text-gray-300' : 'text-gray-700'}">{metric.label}</span>
									<div class="flex items-center gap-2">
										<svg class="w-16 h-6" viewBox="0 0 60 20">
											<polyline 
												fill="none" 
												stroke={metric.color} 
												stroke-width="1.5" 
												points={metric.trend === 'up' ? "5,15 15,10 25,12 35,8 45,5 55,3" : "5,5 15,8 25,6 35,10 45,12 55,15"}
											/>
										</svg>
										<span class="text-xs font-medium" style="color: {metric.color}">
											{metric.trend === 'up' ? '↗' : '↘'} {Math.floor(Math.random() * 20) + 5}%
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</section>

			<!-- Footer Variants Section -->
			<section id="footer-variants" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						📋 Footer Variants
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Comprehensive footer designs for every use case
					</p>
				</div>

				<!-- Simple Footer -->
				<div class="mb-8 border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
					<div class="p-6 {isDark ? 'bg-gray-700' : 'bg-gray-50'} text-center border-b {isDark ? 'border-gray-600' : 'border-gray-200'}">
						<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">
							© 2025 Company Name. All rights reserved.
						</p>
					</div>
				</div>

				<!-- Comprehensive Footer -->
				<div class="mb-8 border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
					<div class="p-8 {isDark ? 'bg-gray-700' : 'bg-gray-50'}">
						<div class="grid md:grid-cols-4 gap-8">
							<div class="col-span-2">
								<div class="flex items-center gap-2 mb-4">
									<div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
									<span class="text-xl font-bold {isDark ? 'text-white' : 'text-gray-900'}">Brand</span>
								</div>
								<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'} mb-4">
									Building amazing experiences with cutting-edge technology and thoughtful design.
								</p>								<div class="flex gap-4">
									{#each ['facebook', 'twitter', 'instagram', 'linkedin'] as social}
										<button type="button" class="{isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors" aria-label="{social} social link">
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z"/>
											</svg>
										</button>
									{/each}
								</div>
							</div>
							<div>
								<h4 class="font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-4">Product</h4>								<ul class="space-y-2">
									{#each ['Features', 'Pricing', 'Documentation', 'API'] as link}
										<li>
											<button type="button" class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">
												{link}
											</button>
										</li>
									{/each}
								</ul>
							</div>
							<div>
								<h4 class="font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-4">Company</h4>								<ul class="space-y-2">
									{#each ['About', 'Blog', 'Careers', 'Contact'] as link}
										<li>
											<button type="button" class="text-sm {isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">
												{link}
											</button>
										</li>
									{/each}
								</ul>
							</div>
						</div>
						<div class="border-t {isDark ? 'border-gray-600' : 'border-gray-200'} mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
							<p class="text-sm {isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 md:mb-0">
								© 2025 Company. All rights reserved.
							</p>							<div class="flex gap-6">
								{#each ['Privacy', 'Terms', 'Cookies'] as link}
									<button type="button" class="text-sm {isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors">
										{link}
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Newsletter Footer -->
				<div class="mb-8 border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
					<div class="p-8 {isDark ? 'bg-gray-700' : 'bg-gray-50'} text-center">
						<h3 class="text-lg font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-2">Stay Updated</h3>
						<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'} mb-4">
							Get the latest updates and news delivered to your inbox.
						</p>
						<div class="flex max-w-md mx-auto gap-2">
							<Input placeholder="Enter your email" class="flex-1" />
							<Button variant="primary">Subscribe</Button>
						</div>						<p class="text-xs {isDark ? 'text-gray-400' : 'text-gray-500'} mt-4">
							© 2025 Company. All rights reserved. | <button type="button" class="underline">Privacy Policy</button>
						</p>
					</div>
				</div>
			</section>

			<!-- Media & Assets Section -->
			<section id="media" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🎬 Media & Assets
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Rich media components for modern applications
					</p>
				</div>

				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<!-- Video Player -->
					<div id="video-player" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📹 Video Player</h3>
						<div class="space-y-4">
							<div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg relative overflow-hidden">
								<div class="absolute inset-0 flex items-center justify-center">
									<button class="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
										<svg class="w-6 h-6 ml-1 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
											<path d="M8 5v10l8-5-8-5z"/>
										</svg>
									</button>
								</div>
								<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
									<div class="flex items-center gap-4 text-white">
										<span class="text-sm">0:00</span>
										<div class="flex-1 h-1 bg-gray-600 rounded">
											<div class="w-1/3 h-full bg-red-500 rounded"></div>
										</div>
										<span class="text-sm">2:30</span>
									</div>
								</div>
							</div>
							
							<!-- Video Controls -->
							<div class="flex items-center justify-between p-3 {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg">
								<div class="flex items-center gap-2">
									<button class="p-2 hover:bg-gray-600 rounded transition-colors">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path d="M8 5v10l8-5-8-5z"/>
										</svg>
									</button>
									<button class="p-2 hover:bg-gray-600 rounded transition-colors">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"/>
										</svg>
									</button>
								</div>
								<div class="flex items-center gap-2">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
									</svg>
									<div class="w-16 h-1 bg-gray-600 rounded">
										<div class="w-3/4 h-full bg-white rounded"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Audio Player -->
					<div id="audio-player" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎵 Audio Player</h3>
						<div class="space-y-6">
							<!-- Album Art & Info -->
							<div class="flex items-center gap-4">
								<div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
									<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
									</svg>
								</div>
								<div>
									<h4 class="font-medium {isDark ? 'text-white' : 'text-gray-900'}">Song Title</h4>
									<p class="text-sm {isDark ? 'text-gray-400' : 'text-gray-600'}">Artist Name</p>
								</div>
							</div>
							
							<!-- Waveform Visualization -->
							<div class="flex items-center justify-center h-16 gap-1">
								{#each Array(40) as _, i}
									<div 
										class="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
										style="height: {Math.random() * 100 + 20}%"
									></div>
								{/each}
							</div>
							
							<!-- Audio Controls -->
							<div class="flex items-center justify-between">
								<span class="text-sm {isDark ? 'text-gray-400' : 'text-gray-600'}">1:23</span>
								<div class="flex items-center gap-4">
									<button class="p-2 hover:bg-gray-600 rounded-full transition-colors">
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
											<path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
										</svg>
									</button>
									<button class="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
										<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path d="M8 5v10l8-5-8-5z"/>
										</svg>
									</button>
									<button class="p-2 hover:bg-gray-600 rounded-full transition-colors">
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
											<path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z"/>
										</svg>
									</button>
								</div>
								<span class="text-sm {isDark ? 'text-gray-400' : 'text-gray-600'}">3:45</span>
							</div>
						</div>
					</div>

					<!-- QR Code Generator -->
					<div id="qr-code" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📱 QR Code</h3>
						<div class="space-y-4">
							<Input placeholder="Enter text or URL" value="https://example.com" />
							<div class="flex justify-center">
								<div class="w-32 h-32 bg-white p-2 rounded-lg border">
									<!-- QR Code Pattern -->
									<svg viewBox="0 0 100 100" class="w-full h-full">
										<rect width="100" height="100" fill="white"/>
										<!-- QR Code pattern simulation -->
										{#each Array(10) as _, row}
											{#each Array(10) as _, col}
												{#if Math.random() > 0.5}
													<rect x={col * 10} y={row * 10} width="10" height="10" fill="black"/>
												{/if}
											{/each}
										{/each}
									</svg>
								</div>
							</div>
							<div class="flex gap-2 justify-center">
								<Button size="sm" variant="secondary">Download PNG</Button>
								<Button size="sm" variant="secondary">Download SVG</Button>
							</div>
						</div>
					</div>

					<!-- PDF Viewer -->
					<div id="pdf-viewer" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">📄 PDF Viewer</h3>
						<div class="space-y-4">
							<div class="aspect-[3/4] {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4 overflow-hidden">
								<div class="w-full h-full {isDark ? 'bg-gray-600' : 'bg-white'} rounded border-2 border-dashed {isDark ? 'border-gray-500' : 'border-gray-300'} flex flex-col">
									<div class="p-4 {isDark ? 'bg-gray-500' : 'bg-gray-200'} text-xs font-mono">
										Document.pdf
									</div>
									<div class="flex-1 p-4 space-y-2">
										{#each Array(8) as _}
											<div class="h-2 {isDark ? 'bg-gray-500' : 'bg-gray-300'} rounded"></div>
										{/each}
									</div>
								</div>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<Button size="sm" variant="ghost">←</Button>
									<span class="text-sm">Page 1 of 5</span>
									<Button size="sm" variant="ghost">→</Button>
								</div>
								<div class="flex items-center gap-2">
									<Button size="sm" variant="ghost">🔍−</Button>
									<span class="text-sm">100%</span>
									<Button size="sm" variant="ghost">🔍+</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Advanced Layouts Section -->
			<section id="advanced-layouts" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🏗️ Advanced Layouts
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Complex layout components for sophisticated applications
					</p>
				</div>

				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<!-- Split Pane -->
					<div id="split-pane" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">↔️ Split Pane</h3>
						<div class="h-64 border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden">
							<div class="flex h-full">
								<div class="w-1/2 {isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 border-r {isDark ? 'border-gray-600' : 'border-gray-200'}">
									<h4 class="font-medium {isDark ? 'text-white' : 'text-gray-900'} mb-2">Left Panel</h4>
									<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Resizable content area</p>
								</div>
								<div class="w-1 {isDark ? 'bg-gray-600' : 'bg-gray-300'} cursor-col-resize hover:bg-blue-500 transition-colors"></div>
								<div class="flex-1 {isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4">
									<h4 class="font-medium {isDark ? 'text-white' : 'text-gray-900'} mb-2">Right Panel</h4>
									<p class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Drag the divider to resize</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Masonry Layout -->
					<div id="masonry" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🧱 Masonry</h3>
						<div class="h-64 overflow-hidden">
							<div class="columns-3 gap-2 space-y-2">
								{#each [60, 80, 40, 100, 70, 50, 90, 45, 85] as height, i}
									<div 
										class="w-full {isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded break-inside-avoid p-3 hover:shadow-lg transition-shadow"
										style="height: {height}px"
									>
										<div class="text-xs {isDark ? 'text-gray-300' : 'text-gray-600'}">Item {i + 1}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Window Manager -->
					<div id="window-manager" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🪟 Window Manager</h3>
						<div class="h-64 {isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg relative overflow-hidden">
							<!-- Window 1 -->
							<div class="absolute top-4 left-4 w-40 h-32 {isDark ? 'bg-gray-700' : 'bg-white'} border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded shadow-lg">
								<div class="flex items-center justify-between p-2 {isDark ? 'bg-gray-600' : 'bg-gray-100'} border-b {isDark ? 'border-gray-500' : 'border-gray-200'}">
									<span class="text-xs font-medium">Window 1</span>
									<div class="flex gap-1">
										<div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
										<div class="w-2 h-2 bg-green-500 rounded-full"></div>
										<div class="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
								</div>
								<div class="p-2">
									<div class="text-xs {isDark ? 'text-gray-300' : 'text-gray-600'}">Content here</div>
								</div>
							</div>
							
							<!-- Window 2 -->
							<div class="absolute top-8 left-24 w-40 h-32 {isDark ? 'bg-gray-700' : 'bg-white'} border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded shadow-lg">
								<div class="flex items-center justify-between p-2 {isDark ? 'bg-gray-600' : 'bg-gray-100'} border-b {isDark ? 'border-gray-500' : 'border-gray-200'}">
									<span class="text-xs font-medium">Window 2</span>
									<div class="flex gap-1">
										<div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
										<div class="w-2 h-2 bg-green-500 rounded-full"></div>
										<div class="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
								</div>
								<div class="p-2">
									<div class="text-xs {isDark ? 'text-gray-300' : 'text-gray-600'}">Draggable windows</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Virtual Viewport -->
					<div id="virtual-viewport" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔍 Virtual Viewport</h3>
						<div class="h-64 border {isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden relative">
							<div class="absolute inset-2 {isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded border-2 border-dashed {isDark ? 'border-gray-600' : 'border-gray-300'}">
								<div class="p-4">
									<div class="text-sm {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Viewport (visible area)</div>
									<div class="grid grid-cols-8 gap-1">
										{#each Array(32) as _, i}
											<div class="w-4 h-4 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded text-xs flex items-center justify-center">
												{i + 1}
											</div>
										{/each}
									</div>
								</div>
							</div>
							<!-- Scroll indicators -->
							<div class="absolute right-1 top-1 bottom-1 w-2 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded">
								<div class="w-full h-8 {isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded"></div>
							</div>
							<div class="absolute bottom-1 left-1 right-3 h-2 {isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded">
								<div class="h-full w-16 {isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Animation & Effects Section -->
			<section id="animations" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						✨ Animation & Effects
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Engaging animations and visual effects for modern interfaces
					</p>
				</div>

				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<!-- Parallax Effect -->
					<div id="parallax" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🌊 Parallax</h3>
						<div class="h-40 rounded-lg overflow-hidden relative bg-gradient-to-b from-blue-400 to-blue-600">
							<div class="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20"></div>
							<div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-500 to-transparent"></div>
							<div class="absolute top-4 right-4 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
							<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
								<div class="text-white text-center">
									<div class="text-lg font-bold">Parallax Scene</div>
									<div class="text-sm opacity-80">Layers move at different speeds</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Particle System -->
					<div id="particles" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">⭐ Particle System</h3>
						<div class="h-40 {isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg relative overflow-hidden">
							{#each Array(15) as _, i}
								<div 
									class="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
									style="
										top: {Math.random() * 80 + 10}%; 
										left: {Math.random() * 80 + 10}%; 
										animation-delay: {Math.random() * 2}s;
										animation-duration: {Math.random() * 2 + 1}s;
									"
								></div>
							{/each}
							<div class="absolute inset-0 flex items-center justify-center">
								<div class="text-center">
									<div class="text-lg font-bold {isDark ? 'text-white' : 'text-gray-900'}">Particle Effects</div>
									<div class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Dynamic particle animation</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Morphing Shapes -->
					<div id="morphing" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🔄 Morphing</h3>
						<div class="h-40 flex items-center justify-center">
							<div class="relative">
								<svg width="120" height="120" viewBox="0 0 120 120" class="animate-spin" style="animation-duration: 8s;">
									<defs>
										<linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
											<stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
											<stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
										</linearGradient>
									</defs>
									<path d="M60,20 Q100,60 60,100 Q20,60 60,20" fill="url(#morphGradient)" class="animate-pulse">
										<animateTransform
											attributeName="transform"
											type="scale"
											values="1;1.2;1"
											dur="3s"
											repeatCount="indefinite"
										/>
									</path>
								</svg>
							</div>
						</div>
					</div>

					<!-- Spring Physics -->
					<div id="spring-physics" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🌸 Spring Physics</h3>
						<div class="h-40 flex items-center justify-center relative">
							<div class="absolute top-4 left-1/2 w-1 h-20 bg-gray-400 transform -translate-x-1/2"></div>
							<div class="w-8 h-8 bg-red-500 rounded-full animate-bounce relative">
								<div class="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
							</div>
							<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
								<div class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Spring animation</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Interactive Animation Controls -->
				<div class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">🎛️ Animation Controls</h3>
					<div class="grid md:grid-cols-3 gap-6">
						<div class="text-center">
							<Button variant="primary" class="mb-4">Trigger Animation</Button>
							<div class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Click to see custom animations</div>
						</div>
						<div class="text-center">
							<div class="mb-4">
								<label for="speed-range" class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Speed</label>
								<input id="speed-range" type="range" min="0.5" max="3" step="0.1" value="1" class="w-full">
							</div>
							<div class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Control animation speed</div>
						</div>
						<div class="text-center">
							<div class="mb-4">
								<label for="easing-select" class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">Easing</label>
								<select id="easing-select" class="w-full p-2 border {isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded">
									<option>ease-in-out</option>
									<option>ease-in</option>
									<option>ease-out</option>
									<option>linear</option>
								</select>
							</div>
							<div class="text-sm {isDark ? 'text-gray-300' : 'text-gray-600'}">Animation timing function</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

<!-- Toast Notification System -->
{#if showToast}
	<div 
		class="fixed bottom-6 right-6 z-50"
		in:fly={{ x: 300, duration: 300 }}
		out:fly={{ x: 300, duration: 300 }}
	>
		<Toast message={toastMessage} type="success" />
	</div>
{/if}

<!-- Floating Navigation Button -->
<div class="fixed bottom-6 left-6 z-40 lg:hidden">
	<Button 
		variant="primary" 
		class="rounded-full w-12 h-12 shadow-lg"
		on:click={() => scrollToSection('foundation')}
		title="Navigate to Components"
	>
		↑
	</Button>
</div>

<style>
	/* Custom animations for enhanced visual appeal */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		33% { transform: translateY(-10px) rotate(1deg); }
		66% { transform: translateY(5px) rotate(-1deg); }
	}
	
	/* Smooth scroll behavior */
	:global(html) {
	scroll-behavior: smooth;
	}
	
	/* Custom floating animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(5deg); }
	}
	
	@keyframes pulse-glow {
		0%, 100% { opacity: 0.1; transform: scale(1); }
		50% { opacity: 0.3; transform: scale(1.1); }
	}
		/* Grid pattern for background */
	.bg-grid-pattern {
		background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}
	
	/* Gradient utilities */
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}
	
	/* Parallax container enhancements */
	:global(.parallax-container) {
		position: relative;
		overflow: hidden;
	}
	
	:global(.parallax-element) {
		will-change: transform;
		transform-style: preserve-3d;
	}
	/* Enhanced hover effects for cards */
	.component-card {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform-style: preserve-3d;
		opacity: 0;
		transform: translateY(30px) scale(0.95);
	}
	
	.component-card:hover {
		transform: translateY(-4px) rotateX(2deg) scale(1.02);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}
	
	/* This class is dynamically applied by Intersection Observer - not unused */
	:global(.component-card.animate-in) {
		opacity: 1;
		transform: translateY(0) scale(1);
		animation: cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	
	@keyframes cardSlideIn {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	
	/* Staggered animation for component sections */
	.component-section {
		animation: slideInUp 0.6s ease-out forwards;
		opacity: 0;
		transform: translateY(30px);
	}
	
	.component-section:nth-child(1) { animation-delay: 0.1s; }
	.component-section:nth-child(2) { animation-delay: 0.2s; }
	.component-section:nth-child(3) { animation-delay: 0.3s; }
	.component-section:nth-child(4) { animation-delay: 0.4s; }
	.component-section:nth-child(5) { animation-delay: 0.5s; }
	.component-section:nth-child(6) { animation-delay: 0.6s; }
	
	@keyframes slideInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	/* Enhanced focus styles for accessibility */
	:global(.focus\:ring-2:focus) {
		outline: none;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
	}
	
	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.lg\:ml-80 {
			margin-left: 0;
		}
	}
</style>