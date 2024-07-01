<script lang="ts">
	import { easeOut } from '@animations/easings';
	import Close from '@icons/Close.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	let className: string = '';
	export { className as class };
	export let contentClass = '';
	export let closeWhenClickBackground: boolean = true;
	export let open: boolean = false;
	export let fullscreenWhenSmall: boolean = false;
	export let hideButtonWhenFullscreen: boolean = false;
	export let as: string = 'form';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if open}
	<div
		transition:fade={{ duration: 300, easing: easeOut }}
		on:click|stopPropagation={closeWhenClickBackground ? () => (open = false) : null}
		class={`group fixed inset-0 flex justify-center items-center z-20 backdrop-blur-lg outline-none bg-glass-40 overflow-y-auto ${className}`}
	>
		<svelte:element
			this={as}
			transition:fly={{ duration: 300, y: 30, easing: easeOut }}
			on:submit|stopPropagation|preventDefault={() => dispatch('submit')}
			on:click|stopPropagation={() => {}}
			class={`bg-background-reverse shadow-custom dark:shadow-custom-dark p-5 rounded-2xl ${fullscreenWhenSmall ? 'smMax:size-full smMax:rounded-none' : ''} ${contentClass}`}
		>
			<slot />
			{#if fullscreenWhenSmall && !hideButtonWhenFullscreen}
				<Button
					class="!absolute left-3 top-3 !w-fit !p-1 sm:hidden"
					on:click={() => (open = false)}
					as="button"
					color="none"
					noIcon
					noGlass
					noAnimation
				>
					<Close class="fill-red-800 size-9" />
				</Button>
			{/if}
		</svelte:element>
	</div>
{/if}
