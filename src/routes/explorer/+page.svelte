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
	import Textarea from '$lib/components/Textarea/Textarea.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';
	import ToggleSimple from '$lib/components/Toggle/ToggleSimple.svelte';
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
	const buttonVariants = ['primary', 'secondary', 'success', 'warning', 'error', 'ghost'];
	const buttonSizes = ['sm', 'md', 'lg'];	
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
	</ParallaxLayout>
		<!-- Main Content Area -->
	<div class="lg:ml-80 transition-all duration-300 relative">
		<!-- Dynamic background pattern -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
			<div class="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10"></div>
			<div class="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-radial from-blue-400/5 to-transparent rounded-full blur-3xl" style="animation: float 15s ease-in-out infinite;"></div>
			<div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-purple-400/5 to-transparent rounded-full blur-3xl" style="animation: float 20s ease-in-out infinite reverse;"></div>
		</div><div class="max-w-6xl mx-auto px-6 py-12">
			
			<!-- Foundation Components Section -->
			<section id="foundation" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						🎨 Foundation Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Essential building blocks for any user interface
					</p>
				</div>
				
				<!-- Buttons Showcase -->
				<div id="button" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Buttons</h3>
					
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
					<div>
						<h4 class="text-lg font-medium {isDark ? 'text-gray-200' : 'text-gray-800'} mb-4">States</h4>
						<div class="flex flex-wrap gap-3">
							<Button variant="primary" disabled>Disabled</Button>
							<Button variant="primary" loading>Loading</Button>
							<Button variant="primary" fullWidth>Full Width</Button>
						</div>
					</div>
				</div>
						<!-- Badges Showcase -->
				<div id="badge" class="mb-16 p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Badges</h3>
					<div class="flex flex-wrap gap-3">
						{#each badgeVariants as variant}
							<Badge {variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
						{/each}
					</div>
				</div>
				
				<!-- Form Controls -->
				<div class="grid md:grid-cols-2 gap-8 mb-16">					<!-- Input Component -->
					<div id="input" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Input</h3>
						<div class="space-y-4">
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
						</div>
					</div>
					
					<!-- Textarea Component -->
					<div id="textarea" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Textarea</h3>
						<div class="space-y-4">
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
						</div>
					</div>
				</div>
						<!-- Select and Toggles -->
				<div class="grid md:grid-cols-2 gap-8 mb-16">					<!-- Checkbox Component -->
					<div id="checkbox" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Checkbox</h3>
						<div class="space-y-4">
							<Checkbox 
								bind:checked={checkboxValue}
								label="Check me!"
							/>
							<Checkbox 
								checked={true}
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
			</section>
			
			<!-- Data Display Section -->
			<section id="data-display" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						📊 Data Display
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Components for presenting and organizing information
					</p>
				</div>
				
				<!-- Cards and Lists -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<!-- Card Component -->
					<div id="card" class="space-y-6">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'}">Cards</h3>						<Card title="Sample Card" subtitle="With subtitle">
							<p class="{isDark ? 'text-gray-300' : 'text-gray-600'}">
								This is a card component with a title, subtitle, and content area. 
								Cards are perfect for grouping related information.
							</p>
							<div slot="footer">
								<Button variant="primary" size="sm">Action</Button>
								<Button variant="ghost" size="sm">Cancel</Button>
							</div>
						</Card>
						
						<Card>
							<div class="p-4">
								<h4 class="font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-2">Simple Card</h4>
								<p class="{isDark ? 'text-gray-300' : 'text-gray-600'}">
									A card without predefined slots for maximum flexibility.
								</p>
							</div>
						</Card>
					</div>
					
					<!-- List Component -->
					<div id="list">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Lists</h3>
						<div class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
							<List items={listItems} />
						</div>
					</div>
				</div>
						<!-- Table Component -->
				<div id="table" class="mb-16">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Table</h3>
					<div class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden">
						<Table columns={tableColumns} data={tableData} />
					</div>
				</div>
						<!-- Stats Component -->
				<div id="stats" class="mb-16">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Statistics</h3>
					<Stats stats={statsData} />
				</div>
			</section>
			
			<!-- Interactive Components Section -->
			<section id="interactive" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						⚡ Interactive Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Dynamic components for user interaction and feedback
					</p>
				</div>
				
				<!-- Progress and Search -->
				<div class="grid lg:grid-cols-2 gap-8 mb-16">
					<!-- Progress Component -->
					<div id="progress" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Progress</h3>
						<div class="space-y-6">							<div>
								<div class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
									Dynamic Progress ({progressValue}%)
								</div>
								<Progress value={progressValue} max={100} />
							</div>							<div>
								<div class="block text-sm font-medium {isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
									Different Colors
								</div>
								<Progress value={25} max={100} color="red" />
								<div class="mt-2">
									<Progress value={50} max={100} color="yellow" />
								</div>
								<div class="mt-2">
									<Progress value={75} max={100} color="green" />
								</div>
							</div>
						</div>
					</div>
							<!-- Search Component -->
					<div id="search" class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg component-card transition-all duration-300 hover:shadow-2xl">
						<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Search</h3>
						<div class="space-y-4">
							<Search 
								bind:value={searchValue}
								placeholder="Search components..."
								on:search={(e) => showToastNotification(`Searching for: ${e.detail}`)}
							/>
							<p class="text-sm {isDark ? 'text-gray-400' : 'text-gray-600'}">
								Current search: {searchValue || 'None'}
							</p>
						</div>
					</div>
				</div>				<!-- Tabs Component -->
				<div id="tabs" class="mb-16">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Tabs</h3>
					<div class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
						<Tabs 
							bind:activeTab={activeTabId}
							tabs={tabsData}
						>
							{#each tabsData as tab, index}
								<div class="p-6">
									<p class="{isDark ? 'text-gray-300' : 'text-gray-600'}">{tab.content}</p>
								</div>
							{/each}
						</Tabs>
					</div>
				</div>
				
				<!-- Modal Component -->
				<div id="modal" class="mb-16">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Modal</h3>
					<div class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
						<Button variant="primary" on:click={() => showModal = true}>
							Open Modal
						</Button>						{#if showModal}
							<Modal 
								bind:open={showModal}
								title="Example Modal"
							>
								<p class="{isDark ? 'text-gray-300' : 'text-gray-600'} mb-4">
									This is an example modal dialog. It can contain any content you need, 
									including forms, images, or other components.
								</p>
								<div class="flex justify-end gap-3">
									<Button variant="ghost" on:click={() => showModal = false}>
										Cancel
									</Button>
									<Button variant="primary" on:click={() => {
										showModal = false;
										showToastNotification('Modal action confirmed!');
									}}>
										Confirm
									</Button>
								</div>
							</Modal>
						{/if}
					</div>
				</div>
			</section>
			
			<!-- Feedback Components Section -->
			<section id="feedback" class="mb-20 component-section">
				<div class="text-center mb-12" in:fade={{ duration: 600 }}>
					<h2 class="text-4xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">
						💬 Feedback Components
					</h2>
					<p class="text-lg {isDark ? 'text-gray-300' : 'text-gray-600'}">
						Components for user notifications and system feedback
					</p>
				</div>
				
				<!-- Alerts Showcase -->
				<div id="alert" class="mb-16">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Alerts</h3>
					<div class="space-y-4">
						{#each alertTypes as type}
							<Alert {type} title="{type.charAt(0).toUpperCase() + type.slice(1)} Alert">
								This is a {type} alert. Use it to provide {type} feedback to users.
							</Alert>
						{/each}
					</div>
				</div>
				
				<!-- Toast Component -->
				<div id="toast" class="mb-16">
					<h3 class="text-2xl font-semibold {isDark ? 'text-white' : 'text-gray-900'} mb-6">Toast Notifications</h3>
					<div class="p-8 {isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg">
						<div class="flex flex-wrap gap-3">
							<Button variant="primary" on:click={() => showToastNotification('Success! Action completed.')}>
								Show Success Toast
							</Button>
							<Button variant="warning" on:click={() => showToastNotification('Warning: Please check your input.')}>
								Show Warning Toast
							</Button>
							<Button variant="error" on:click={() => showToastNotification('Error: Something went wrong.')}>
								Show Error Toast
							</Button>
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