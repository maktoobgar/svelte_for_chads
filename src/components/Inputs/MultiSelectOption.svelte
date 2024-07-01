<script lang="ts">
	import Button from '@cp/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import none from '@animations/none';
	import { scale } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	let className = '';
	export { className as class };
	export let content: string = '';
	export let hasAnimation: boolean = true;

	$: transition = hasAnimation ? scale : none;
</script>

<div
	transition:transition={{ duration: hasAnimation ? 200 : 0 }}
	class={`p-2 bg-gray-100 dark:bg-gray-700 rounded-[8px] relative ltr:pr-8 rtl:pl-8 shadow-custom dark:shadow-custom-dark capitalize ${className}`}
>
	{@html content}
	<Button
		class="size-[18px] !p-1 !rounded-md !shadow-none !bg-gray-200 hover:!bg-gray-300 dark:!bg-gray-600 !absolute ltr:right-[6px] rtl:left-[6px] top-1/2 -translate-y-1/2"
		on:click={() => dispatch('click')}
		noAnimation
		noIcon
	>
		<svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
			><path
				d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
			/></svg
		>
	</Button>
</div>
