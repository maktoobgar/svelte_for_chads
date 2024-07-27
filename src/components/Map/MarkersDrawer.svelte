<script lang="ts" generics="T">
	import type MapLocation from '@/types/map/map_location';
	import { getGpsIcon, getIcon, getSelectedIcon, widthAndHeightFinder } from '@utils/map';
	import L, { Map } from 'leaflet';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let activeMarker: L.Marker<any> | null = null;

	export let map: Map | null = null;
	export let gpsPosition: L.LatLngTuple | null = null;
	export let activeLocation: MapLocation<T> | null = null;
	export let markerLocations: Array<MapLocation<T>> = [];
	export let useAsLocationInput: boolean = false;
	export let locationInput: L.LatLngTuple | null = null;
	export const setMarkersNormal = () => {
		if (activeMarker && activeLocation)
			activeMarker?.setIcon(
				markerIcon(getIcon(activeLocation.color, 42, activeLocation.data), true)
			);
	};

	$: dispatch('markersLocationsChanged', markerLocations);

	function clearMarkers() {
		markersLayerGroup &&
			markersLayerGroup.eachLayer((v) => {
				const marker = v as L.Marker<any>;
				const div = marker.getElement();
				div?.classList.remove('animate-fade-in');
				div?.classList.add('animate-fade-out');
				div?.addEventListener('animationend', () => {
					markersLayerGroup?.removeLayer(v);
					marker.remove();
				});
			});
	}

	function markerIcon(icon: string, noFadeIn: boolean = false) {
		let html = `<div style="width: fit-content; z-index: 1;" class="map-marker relative ${noFadeIn ? '' : 'animate-fade-in'}">${icon}<div/>`;
		let iconSize = widthAndHeightFinder(html);
		return L.divIcon({
			html,
			className: 'map-marker',
			iconSize: iconSize,
			iconAnchor: [0, 2 * iconSize[1]]
		});
	}

	function createMarker(mapLocation: MapLocation<T>, noSetInput: boolean = false) {
		let icon = markerIcon(getIcon(mapLocation.color, 42, mapLocation.data));
		let marker = L.marker(mapLocation.position, { icon, zIndexOffset: 10 });
		if (!noSetInput)
			marker.addEventListener('click', () => {
				if (activeMarker && activeLocation) {
					activeMarker?.setIcon(
						markerIcon(getIcon(activeLocation.color, 42, activeLocation.data), true)
					);
				}
				marker.setIcon(markerIcon(getSelectedIcon(mapLocation.color, 42, mapLocation.data), true));
				activeMarker = marker;
				activeLocation = mapLocation;
			});
		marker.addEventListener('click', () => dispatch('clickOnMarker', mapLocation.value));

		return marker;
	}

	function createGpsMarker(latLng: L.LatLngTuple) {
		let icon = markerIcon(getGpsIcon(), true);
		let marker = L.marker(latLng, { icon });

		return marker;
	}

	let markersLayerGroup: L.LayerGroup<any> = L.layerGroup().setZIndex(10);
	let gpsLayerGroup: L.LayerGroup<any> = L.layerGroup().setZIndex(10);
	let markerInputLayerGroup: L.LayerGroup<any> = L.layerGroup().setZIndex(10);

	$: map && markerInputLayerGroup.addTo(map);
	$: map && markersLayerGroup.addTo(map);
	$: map && gpsLayerGroup.addTo(map);

	// If locations updated, update locations on map
	$: {
		if (map) {
			clearMarkers();

			for (let location of markerLocations) {
				let m = createMarker(location);
				markersLayerGroup.addLayer(m);
			}
		}
	}

	// If clicked on map, create a marker on the map
	// Temporary maybe
	$: {
		if (map && useAsLocationInput)
			map.addEventListener('click', (event) => {
				markerInputLayerGroup.clearLayers();
				markerInputLayerGroup.addLayer(
					createMarker({ position: [event.latlng.lat, event.latlng.lng], color: 'purple' }, true)
				);
				dispatch('locationInputChanged', locationInput);
				locationInput = [event.latlng.lat, event.latlng.lng];
			});
	}

	$: {
		if (map && gpsPosition) {
			gpsLayerGroup.clearLayers();
			let m = createGpsMarker(gpsPosition);
			gpsLayerGroup.addLayer(m);
		}
	}

	onMount(() => {
		if (locationInput && useAsLocationInput) {
			markerInputLayerGroup.clearLayers();
			markerInputLayerGroup.addLayer(
				createMarker({ position: [locationInput[0], locationInput[1]], color: 'purple' }, true)
			);
		}
	});
</script>

<!-- <div class="absolute bottom-3 right-3 z-10">
	<Button class="" color="primary" on:click={clearMarkers}>Clear</Button>
</div> -->
