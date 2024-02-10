<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	let className: string = '';
	let _open: boolean = false;
	let closing: boolean = false;
	export { className as class };
	export let contentClass = '';
	export let closeWhenClickBackground: boolean = true;
	export let isForm: boolean = false;
	export let submit: EventHandler<SubmitEvent, HTMLFormElement> | null = null;

	let dialog: HTMLDivElement;

	function modalClose(e: MouseEvent) {
		if (e.target == dialog) {
			close();
		}
	}

	export function close() {
		closing = true;
		dialog.addEventListener(
			'animationend',
			() => {
				_open = false;
				closing = false;
			},
			{ once: true }
		);
	}

	export function open() {
		_open = true;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={dialog}
	data-closing={closing}
	data-open={_open}
	on:click={closeWhenClickBackground ? modalClose : null}
	class={`group fixed inset-0 flex justify-center items-center z-[1000] backdrop-blur-lg outline-none bg-glass-40 data-[closing=true]:pointer-events-none data-[open=false]:hidden data-[open=true]:data-[closing=false]:animate-fade-in data-[closing=true]:animate-fade-out ${className}`}
>
	<svelte:element
		this={isForm ? 'form' : 'div'}
		on:submit={isForm ? submit : null}
		class={`bg-background-reverse shadow-custom dark:shadow-custom-dark p-5 rounded-[8px] animate-slide-in ${contentClass}`}
	>
		<slot />
	</svelte:element>
</div>
