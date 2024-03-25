<script lang="ts">
	import { easeOut } from '@animations/easings';
	import type { ComponentType, ComponentProps } from 'svelte';
	import { fly } from 'svelte/transition';

	interface Item<T extends ComponentType, P extends ComponentProps<InstanceType<T>>> {
		id: string;
		component: T;
		props?: P;
	}

	export let open = false;
	export let items: Item<ComponentType, ComponentProps<InstanceType<ComponentType>>>[] = [];
	export function add<T extends ComponentType, P extends ComponentProps<InstanceType<T>>>(
		component: T,
		props: P
	) {
		const item: Item<T, P> = {
			id: (items.length + 1).toString(),
			component: component,
			props: props
		};
		items = [...items, item];
	}
</script>

{#if open}
	<div
		in:fly={{ x: '100%', duration: 200, easing: easeOut }}
		out:fly={{ x: '100%', duration: 200, easing: easeOut }}
		class="fixed w-screen xs:w-[350px] bg-green-50 right-0 top-0 bottom-0 z-[500]"
	>
		<slot />
	</div>
{/if}
