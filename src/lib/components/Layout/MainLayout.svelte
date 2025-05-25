<!-- MainLayout Component - Complete page layout with header, content, and footer -->
<script lang="ts">
	export let headerClass: string = '';
	export let footerClass: string = '';
	export let mainClass: string = '';
	export let sidebarWidth: string = '256px';
	export let hasSidebar: boolean = false;
	export let stickyHeader: boolean = true;
	export let stickyFooter: boolean = false;
	
	$: layoutClasses = [
		'min-h-screen flex flex-col',
		hasSidebar ? 'lg:pl-64' : ''
	].filter(Boolean).join(' ');
	
	$: headerClasses = [
		'w-full',
		stickyHeader ? 'sticky top-0 z-40' : '',
		headerClass
	].filter(Boolean).join(' ');
	
	$: mainClasses = [
		'flex-1',
		mainClass
	].filter(Boolean).join(' ');
	
	$: footerClasses = [
		'w-full',
		stickyFooter ? 'sticky bottom-0' : '',
		footerClass
	].filter(Boolean).join(' ');
</script>

<div class={layoutClasses}>
	{#if $$slots.sidebar && hasSidebar}
		<aside 
			class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300"
			style="width: {sidebarWidth}"
		>
			<slot name="sidebar" />
		</aside>
	{/if}
	
	{#if $$slots.header}
		<header class={headerClasses}>
			<slot name="header" />
		</header>
	{/if}
	
	<main class={mainClasses}>
		<slot />
	</main>
	
	{#if $$slots.footer}
		<footer class={footerClasses}>
			<slot name="footer" />
		</footer>
	{/if}
</div>
