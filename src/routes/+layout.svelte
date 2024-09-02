<script lang="ts">
	import '@/app.css';
	import 'svelte-ripple-action/ripple.css';
	import I18N from '@cp/I18N.svelte';
	import Notifier from '@cp/Notifier.svelte';
	import Theme from '@cp/Theme.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import ImageEditor from '@cp/ImageEditor.svelte';
	import Editor from '@cp/Editor.svelte';
	import Layout from '@cp/Layout.svelte';
	import Global from '@cp/Global.svelte';
	import ThemeSwitcher from '@cp/ThemeSwitcher.svelte';
	import LanguageChanger from '@cp/LanguageChanger.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false // default: true
			}
		}
	});
</script>

<div class="fixed left-1/2 bottom-0 -translate-x-1/2 z-10 flex ltr">
	<ThemeSwitcher class="w-7 h-7 !p-0 m-5 drop-shadow-3xl" />
	<LanguageChanger class="w-7 h-7 !p-0 m-5 drop-shadow-3xl" />
</div>

<ImageEditor />
<Notifier />
<Layout />
<Global />
<Theme />
<I18N />
<Editor />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
