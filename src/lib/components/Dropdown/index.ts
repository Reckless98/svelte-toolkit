export { default as Dropdown } from './Dropdown.svelte';

export interface DropdownItem {
	id: string;
	label: string;
	value?: any;
	icon?: string;
	disabled?: boolean;
	divider?: boolean;
	href?: string;
	action?: () => void;
	children?: DropdownItem[];
}

export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
export type DropdownVariant = 'default' | 'minimal' | 'bordered' | 'elevated' | 'glass' | 'dark';
export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownAnimation = 'fade' | 'fly' | 'scale' | 'slide';
export type DropdownTrigger = 'click' | 'hover' | 'manual';
