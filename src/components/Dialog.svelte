<script lang="ts">
	let className: string = '';
	let _open: boolean = false;
	let closing: boolean = false;
	export { className as class };

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
	on:click={modalClose}
	class={`group fixed inset-0 flex justify-center items-center z-[1000] backdrop-blur-sm outline-none backdrop:hidden data-[closing=true]:pointer-events-none data-[open=false]:hidden data-[open=true]:data-[closing=false]:animate-fade-in data-[closing=true]:animate-fade-out ${className}`}
>
	<div class="bg-background-light p-5 rounded-lg animate-slide-in">
		<slot />
	</div>
</div>
