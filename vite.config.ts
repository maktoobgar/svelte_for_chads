import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	// Proxy pass everything that comes to /api route to localhost:3000
	server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace('/api', '')
            }
        }
    },
	plugins: [sveltekit(), mkcert()]
});
