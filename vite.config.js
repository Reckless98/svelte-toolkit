import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['gsap', 'prismjs', 'clsx']
	},
	server: {
		port: 5173,
		strictPort: false,
		host: true
	}
});
