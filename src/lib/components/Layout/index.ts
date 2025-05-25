// Layout Components Export
export { default as Container } from './Container.svelte';
export { default as Grid } from './Grid.svelte';
export { default as Flex } from './Flex.svelte';
export { default as Stack } from './Stack.svelte';
export { default as Section } from './Section.svelte';
export { default as MainLayout } from './MainLayout.svelte';
export { default as Sidebar } from './Sidebar.svelte';

// Layout Component Types
export interface ContainerProps {
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	padding?: 'none' | 'sm' | 'md' | 'lg';
	center?: boolean;
	fluid?: boolean;
	className?: string;
}

export interface GridProps {
	cols?: number | string;
	rows?: number | string;
	gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	responsive?: boolean;
	alignItems?: 'start' | 'center' | 'end' | 'stretch';
	justifyItems?: 'start' | 'center' | 'end' | 'stretch';
	className?: string;
}

export interface FlexProps {
	direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
	align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
	wrap?: boolean;
	gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}

export interface StackProps {
	direction?: 'vertical' | 'horizontal';
	spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	align?: 'start' | 'center' | 'end' | 'stretch';
	divider?: boolean;
	className?: string;
}

export interface SectionProps {
	variant?: 'default' | 'primary' | 'secondary' | 'accent';
	padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
	fullHeight?: boolean;
	center?: boolean;
	className?: string;
}

export interface MainLayoutProps {
	headerClass?: string;
	footerClass?: string;
	mainClass?: string;
	sidebarWidth?: string;
	hasSidebar?: boolean;
	stickyHeader?: boolean;
	stickyFooter?: boolean;
}

export interface SidebarLayoutProps {
	position?: 'left' | 'right';
	width?: string;
	collapsible?: boolean;
	collapsed?: boolean;
	overlay?: boolean;
	className?: string;
}
