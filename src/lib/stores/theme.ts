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

// Create theme store
function createTheme() {
	// Get initial theme from localStorage or default to light
	const getInitialTheme = () => {
		if (!browser) return THEMES.LIGHT;

		const stored = localStorage.getItem('theme');
		if (stored && Object.values(THEMES).includes(stored)) {
			return stored;
		}

		// Check system preference
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
	};

	const { subscribe, set, update } = writable(getInitialTheme());

	return {
		subscribe,
		set: (theme: string) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				applyTheme(theme);
			}
			set(theme);
		},
		toggle: () =>
			update((current) => {
				const newTheme = current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
				if (browser) {
					localStorage.setItem('theme', newTheme);
					applyTheme(newTheme);
				}
				return newTheme;
			}),
		init: () => {
			if (browser) {
				const theme = getInitialTheme();
				applyTheme(theme);
				set(theme);
			}
		},
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
		set: (mode: string) => {
			if (browser) {
				localStorage.setItem('homeMode', mode);
			}
			set(mode);
		},
	};
}

// Apply theme to document
function applyTheme(theme: string): void {
	if (!browser) return;

	const root = document.documentElement;

	if (theme === THEMES.AUTO) {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = prefersDark ? THEMES.DARK : THEMES.LIGHT;
	}

	root.classList.remove(THEMES.LIGHT, THEMES.DARK);
	root.classList.add(theme);

	// Update meta theme-color for mobile browsers
	const metaThemeColor = document.querySelector('meta[name="theme-color"]');
	if (metaThemeColor) {
		metaThemeColor.setAttribute('content', theme === THEMES.DARK ? '#1a1a1a' : '#ffffff');
	}
}

export const theme = createTheme();
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
