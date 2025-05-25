export { default as Accordion } from './Accordion.svelte';

export interface AccordionItem {
	id: string;
	title: string;
	content?: string;
	disabled?: boolean;
	icon?: string;
	badge?: string | number;
}

export type AccordionVariant = 'default' | 'bordered' | 'elevated' | 'minimal' | 'modern' | 'glass';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionAnimation = 'slide' | 'fade' | 'none';
