// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	compilerOptions: {
		// I have to add this because I am calling functions or changing variables of components with bind:this
		// from their parents
		// 
		// I got rid of this error message:
		// Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'
		accessors: true
	},

	kit: {
		prerender: {
			entries: ['*']
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			// @sveltejs/adapter-static: all routes must be fully prerenderable, but found the following routes that are dynamic
			// I made it false to continue and it didn't compile the page at all
			strict: true
		}),

		alias: {
			'@animations': './src/animations',
			'@Layouts': './src/components/Layouts',
			'@stores': './src/stores',
			'@icons': './src/lib/icons',
			'@types': './src/types',
			'@utils': './src/utils',
			'@i18n': './src/i18n',
			'@cp': './src/components',
			'@': './src'
		}
	}
};

export default config;
