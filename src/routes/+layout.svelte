<script lang="ts">
	import '@/app.css';
	import 'svelte-ripple-action/ripple.css';
	import I18N from '@cp/I18N.svelte';
	import Notifier from '@cp/Notifier.svelte';
	import Theme from '@cp/Theme.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false // default: true
			}
		}
	});
</script>

<Notifier />
<Theme />
<I18N />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
