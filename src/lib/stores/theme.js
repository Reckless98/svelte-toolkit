import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Theme modes
export const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
	AUTO: 'auto',
};

// Home page animation modes
export const HOME_MODES = {
	PARTICLES: 'particles',
	PARALLAX: 'parallax',
	GRADIENT: 'gradient',
	MATRIX: 'matrix',
	COSMIC: 'cosmic',
	WAVES: 'waves',
	GEOMETRIC: 'geometric',
	NEURAL: 'neural',
	CRYSTALLINE: 'crystalline',
	AURORA: 'aurora',
};

// Create theme store with localStorage persistence
function createThemeStore() {
	const defaultTheme = 'light';
	const storedTheme = browser ? localStorage.getItem('theme') : defaultTheme;
	
	const { subscribe, set, update } = writable(storedTheme || defaultTheme);
	
	return {
		subscribe,
		toggle: () => {
			update(theme => {
				const newTheme = theme === 'light' ? 'dark' : 'light';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					document.documentElement.classList.remove(theme);
					document.documentElement.classList.add(newTheme);
				}
				return newTheme;
			});
		},
		set: (theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				document.documentElement.classList.remove('light', 'dark');
				document.documentElement.classList.add(theme);
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				const theme = localStorage.getItem('theme') || defaultTheme;
				document.documentElement.classList.add(theme);
				set(theme);
			}
		}
	};
}

// Create home mode store
function createHomeMode() {
	const getInitialMode = () => {
		if (!browser) return HOME_MODES.PARTICLES;
		return localStorage.getItem('homeMode') || HOME_MODES.PARTICLES;
	};

	const { subscribe, set } = writable(getInitialMode());

	return {
		subscribe,
		set: (mode) => {
			if (browser) {
				localStorage.setItem('homeMode', mode);
			}
			set(mode);
		},
	};
}

export const theme = createThemeStore();
export const homeMode = createHomeMode();

// Listen for system theme changes
if (browser) {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	mediaQuery.addEventListener('change', (e) => {
		theme.subscribe((currentTheme) => {
			if (currentTheme === THEMES.AUTO) {
				applyTheme(THEMES.AUTO);
			}
		});
	});
}
