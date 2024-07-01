<script lang="ts">
	import editor from '@stores/editor';
	import { easeOut } from '@animations/easings';
	import { fade } from 'svelte/transition';
	import Cropper from 'cropperjs';
	import Button from './Button.svelte';
	import LL from '@i18n/i18n-svelte';

	let img: HTMLImageElement;
	let cropper: Cropper;

	function initCropper() {
		cropper = new Cropper(img, {
			aspectRatio: 1 / 1,
			rotatable: true,
			viewMode: 2
		});
	}

	function getCroppedImage() {
		cropper.getCroppedCanvas({ width: 600, height: 600 }).toBlob((blob) => {
			const url = cropper.getCroppedCanvas({ width: 600, height: 600 }).toDataURL();
			$editor.onCrop && $editor.onCrop(blob, url);
			editor.set({ ...$editor, enable: false });
		});
	}

	function cancelCrop() {
		editor.set({ ...$editor, enable: false });
	}
</script>

<svelte:head>
	<link href="/styles/cropper.css" rel="stylesheet" />
	<script src="/scripts/cropper.min.js"></script>
</svelte:head>

{#if $editor.enable}
	<div
		in:fade={{ duration: 150, delay: 150, easing: easeOut }}
		out:fade={{ duration: 150, easing: easeOut }}
		class="fixed inset-0 z-[1000]"
	>
		<div
			class="z-10 fixed bottom-0 left-1/2 -translate-x-1/2 mb-6 flex space-x-10 rtl:space-x-reverse"
		>
			<Button
				color="none"
				class="!rounded-full !p-2 bg-red-600 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-700"
				on:click={cancelCrop}
			>
				<svg class="size-8 fill-white" viewBox="0 0 384 512">
					<path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
					/>
				</svg>
			</Button>
			<Button
				color="none"
				class="!rounded-full !px-3 !py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 space-x-2 rtl:space-x-reverse"
				on:click={getCroppedImage}
			>
				<svg class="size-8 fill-white" viewBox="0 0 448 512">
					<path
						d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
					/>
				</svg>
				<span class="text-white">{$LL.ImageEditor.Submit()}</span>
			</Button>
		</div>
		<img on:load={initCropper} bind:this={img} src={$editor.imgSrc} alt="" />
	</div>
{/if}
