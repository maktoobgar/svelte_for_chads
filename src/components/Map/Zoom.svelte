<script lang="ts">
	import Button from '@cp/Button.svelte';
	import { Map } from 'leaflet';

	let className: string = '';
	export let map: Map | null = null;
	export { className as class };
</script>

<div class="absolute bottom-3 left-3 drop-shadow-xl pointer-events-auto {className}">
	<Button
		class="group !rounded-b-none !shadow-none !p-2"
		color="white"
		on:click={() => map && map?.zoomOut()}
		noIcon
		noGlass
	>
		<svg class="size-[24px] fill-gray-500 group-hover:fill-white" viewBox="0 0 24 24">
			<path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
		</svg>
	</Button>
	<Button
		class="group !rounded-t-none !shadow-none !p-2 border-t-[1px]"
		color="white"
		on:click={() => map && map?.zoomIn()}
		noIcon
		noGlass
	>
		<svg class="size-[24px] fill-gray-500 group-hover:fill-white" viewBox="0 0 24 24">
			<path
				d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
			/>
		</svg>
	</Button>
</div>
