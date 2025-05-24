export { default as Select } from './Select.svelte';

export type SelectVariant = 'standard' | 'outlined' | 'filled' | 'modern' | 'glass';
export type SelectSize = 'sm' | 'md' | 'lg' | 'xl';
export type SelectColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
};
