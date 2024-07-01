<script lang="ts">
	import Button from '@cp/Button.svelte';
	import { onDestroy } from 'svelte';
	import { Map } from 'leaflet';

	export let position: L.LatLngTuple | null = null;
	export let map: Map | null = null;

	let geoId: number = -1;
	let requestDone: boolean = true;

	onDestroy(() => destroyWatcher());

	function destroyWatcher() {
		geoId && navigator.geolocation.clearWatch(geoId);
	}

	function requestWatchLocation(container: HTMLElement | null) {
		if (container === null) {
			requestDone = false;
			destroyWatcher();

			geoId = navigator.geolocation.watchPosition(
				(newPosition) => (position = [newPosition.coords.latitude, newPosition.coords.longitude]),
				null,
				{
					timeout: 10
				}
			);
		}

		return {
			destroy: destroyWatcher
		};
	}

	$: {
		if (position && !requestDone) {
			requestDone = true;
			map && map.setView(position);
		}
	}
</script>

<div use:requestWatchLocation class="absolute bottom-3 left-3 drop-shadow-xl">
	<Button
		class="!shadow-none !p-2 pointer-events-auto"
		color="primary"
		on:click={() => requestWatchLocation(null)}
		noIcon
		noGlass
	>
		<svg class="size-[24px] fill-black-20" viewBox="0 0 24 24">
			<path
				d="M11.8597 19.7163C7.59042 19.7163 4.11865 16.2446 4.11865 11.9752C4.11865 7.70589 7.59042 4.23413 11.8597 4.23413C16.1291 4.23413 19.6008 7.70589 19.6008 11.9752C19.6008 16.2446 16.1291 19.7163 11.8597 19.7163ZM11.8597 5.6416C8.36922 5.6416 5.52612 8.48469 5.52612 11.9752C5.52612 15.4658 8.36922 18.3088 11.8597 18.3088C15.3503 18.3088 18.1934 15.4658 18.1934 11.9752C18.1934 8.48469 15.3503 5.6416 11.8597 5.6416Z"
			/>
			<path
				d="M11.8597 15.4939C9.91743 15.4939 8.34106 13.9175 8.34106 11.9752C8.34106 10.0329 9.91743 8.45654 11.8597 8.45654C13.8021 8.45654 15.3784 10.0329 15.3784 11.9752C15.3784 13.9175 13.8021 15.4939 11.8597 15.4939ZM11.8597 9.86401C10.6962 9.86401 9.74854 10.8117 9.74854 11.9752C9.74854 13.1387 10.6962 14.0864 11.8597 14.0864C13.0233 14.0864 13.971 13.1387 13.971 11.9752C13.971 10.8117 13.0233 9.86401 11.8597 9.86401Z"
			/>
			<path
				d="M11.8597 5.17247C11.475 5.17247 11.156 4.85344 11.156 4.46873V2.5921C11.156 2.20739 11.475 1.88837 11.8597 1.88837C12.2445 1.88837 12.5635 2.20739 12.5635 2.5921V4.46873C12.5635 4.85344 12.2445 5.17247 11.8597 5.17247Z"
			/>
			<path
				d="M4.35331 12.679H2.47668C2.09198 12.679 1.77295 12.3599 1.77295 11.9752C1.77295 11.5905 2.09198 11.2715 2.47668 11.2715H4.35331C4.73802 11.2715 5.05705 11.5905 5.05705 11.9752C5.05705 12.3599 4.73802 12.679 4.35331 12.679Z"
			/>
			<path
				d="M11.8597 22.0621C11.475 22.0621 11.156 21.7431 11.156 21.3584V19.4818C11.156 19.097 11.475 18.778 11.8597 18.778C12.2445 18.778 12.5635 19.097 12.5635 19.4818V21.3584C12.5635 21.7431 12.2445 22.0621 11.8597 22.0621Z"
			/>
			<path
				d="M21.243 12.679H19.3663C18.9816 12.679 18.6626 12.3599 18.6626 11.9752C18.6626 11.5905 18.9816 11.2715 19.3663 11.2715H21.243C21.6277 11.2715 21.9467 11.5905 21.9467 11.9752C21.9467 12.3599 21.6277 12.679 21.243 12.679Z"
			/>
		</svg>
	</Button>
</div>
