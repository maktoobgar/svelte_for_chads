<script lang="ts">
	import Zoom from '@cp/Map/Zoom.svelte';
	import L, { Map } from 'leaflet';
	import Gps from './Gps.svelte';
	import MarkersDrawer from './MarkersDrawer.svelte';
	import MapLocation from '@/types/map/map_location';
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { easeOut } from '@animations/easings';

	const dispatch = createEventDispatcher();

	let className: string = '';
	export let map: Map | null = null;
	export let position: L.LatLngTuple | null = null;
	export let noGps: boolean = false;
	export let noZoom: boolean = false;
	export let markerLocations: MapLocation<null>[] = [];
	export let activeLocation: MapLocation<null> | null = null;
	export let useAsLocationInput: boolean = false;
	export let locationInput: L.LatLngTuple | null = null;
	export let initialView: L.LatLngTuple = [31.319173, 48.6690947];
	export let initialZoom: number = 15;
	export let disableSearchQuery: boolean = false;
	export { className as class };

	// In this url: https://{s}.google.com/vt/lyrs=h&x={x}&y={y}&z={z}
	// Instead of h in url (https://{s}.google.com/vt/lyrs=<THIS_ONE>)
	// You can change it to these for different results
	//
	// h = roads only
	// m = standard roadmap
	// p = terrain
	// r = somehow altered roadmap
	// s = satellite only
	// t = terrain only
	// y = hybrid
	//
	// Instead of hl in url: (https://{s}.google.com/vt/lyrs=y&hl=<THIS_ONE>)
	//
	// You can put a language code you want: en, fa or ...
	function createMap(container: HTMLElement) {
		let m = L.map(container!, { preferCanvas: true, zoom: initialZoom, center: initialView });
		// Previous tileLayer and remove the subdomains if used this one again
		// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
		L.tileLayer('https://{s}.google.com/vt/lyrs=y&hl=fa&x={x}&y={y}&z={z}', {
			maxZoom: 20,
			subdomains: ['mt1', 'mt2', 'mt3']
		}).addTo(m);

		return m;
	}

	// Map url search query updater
	function updateUrlSearchQuery(center: L.LatLngTuple, zoom: number) {
		const query = new URLSearchParams('');
		query.set('lat', center[0].toString());
		query.set('lng', center[1].toString());
		query.set('zoom', zoom.toString());
		if ($page.url.searchParams.toString() === query.toString()) return;
		goto(`?${query.toString()}`, { keepFocus: true });
	}

	// Get lat, lng and zoom and give it to updateUrlSearchQuery
	function latLngZoomChange() {
		const latLng = map
			? ([map.getCenter().lat, map.getCenter().lng] as L.LatLngTuple)
			: initialView;
		const zoom = map ? map.getZoom() : initialZoom;
		updateUrlSearchQuery(latLng, zoom);
	}

	// First render to get the initial zoom
	function getZoomFromSearchQuery() {
		const query = $page.url.searchParams;
		if (query.has('zoom')) {
			const zoom = parseInt(query.get('zoom')!);
			if (zoom === map?.getZoom()) return;
			map?.setZoom(zoom);
		}
	}

	// First render to get the initial lat lng
	function getCenterFromSearchQuery() {
		const query = $page.url.searchParams;
		if (query.has('lat') && query.has('lng')) {
			const latLng: L.LatLngTuple = [parseFloat(query.get('lat')!), parseFloat(query.get('lng')!)];
			if (latLng[0] === initialView[0] && latLng[1] === initialView[1]) return;
			map?.setView(latLng);
		}
	}

	// Create the map
	function mapAction(container: HTMLElement) {
		map = createMap(container);
		map.zoomControl.remove();

		return {
			destroy: () => {
				map!.remove();
				map = null;
			}
		};
	}

	onMount(() => {
		if (disableSearchQuery) return;
		getCenterFromSearchQuery();
		getZoomFromSearchQuery();
		latLngZoomChange();
		map?.addEventListener('zoomend', latLngZoomChange);
		map?.addEventListener('moveend', latLngZoomChange);
	});
</script>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""
/>

{#key 'map'}
	<div transition:fade={{ duration: 300, easing: easeOut }} class="absolute inset-0 {className}">
		<div class="w-full h-full text-center font-semibold" use:mapAction />
		{#if !noZoom}
			<Zoom class={noGps ? '' : '!bottom-[60px]'} {map} />
		{/if}
		{#if !noGps}
			<Gps bind:position bind:map />
		{/if}
		<MarkersDrawer
			bind:activeLocation
			bind:locationInput
			gpsPosition={position}
			on:locationInputChanged={(event) => dispatch('locationInputChanged', event.detail)}
			{markerLocations}
			{useAsLocationInput}
			{map}
		/>
		<slot />
	</div>
{/key}
