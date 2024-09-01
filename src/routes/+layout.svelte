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

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false // default: true
			}
		}
	});
</script>

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
