<script lang="ts">
	import { onDestroy, type ComponentType } from 'svelte';
	import { tweened, type Tweened, type Unsubscriber } from 'svelte/motion';
	import * as easingFns from 'svelte/easing';

	let positionStore: Tweened<number>;
	let position: number = 0;
	let cleanup: Unsubscriber | null = null;

	let className: string = '';
	export { className as class };
	export let element = 'div';
	export let text: string;
	export let duration = 500;

	onDestroy(() => {
		if (cleanup) cleanup();
	});

	$: {
		if (cleanup) cleanup();

		positionStore = tweened(0, { easing: easingFns.linear, duration: duration });
		cleanup = positionStore.subscribe((val) => (position = val));

		positionStore.set(text.length);
	}
</script>

<svelte:element this={element} class={className}>
	{text.slice(0, position)}<span class="cursor"> </span>
</svelte:element>
