<script lang="ts">
	import isPC from '@/const/is_pc';
	import { easeOut } from '@animations/easings';
	import Button from '@cp/Button.svelte';
	import { keepUrl } from '@stores/global';
	import { error } from '@utils/notifier';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let type: 'video' | 'image' = 'video';
	export let blob: Blob | null = null;
	export let url: string = '';
	export let recording = false;
	export let active = false;
	export let videoLimit: number = 0;

	let video: HTMLVideoElement | null = null;
	let canvas: HTMLCanvasElement | null = null;
	let stream: MediaStream | null = null;
	let mediaRecorder: MediaRecorder | null = null;
	let videoLimitInternal: number = videoLimit;
	let intervalKey: NodeJS.Timeout | null = null;

	$: if (videoLimitInternal === 0 && videoLimit > 0) {
		stop();
	}

	const destroyCamera = () => stream && stream!.getTracks().forEach((track) => track.stop());

	export const record = async () => {
		if (video && stream) {
			videoLimitInternal = videoLimit;
			intervalKey = setInterval(() => (videoLimitInternal -= 1), 1000);
			mediaRecorder = new MediaRecorder(stream, {
				mimeType: 'video/webm'
			});
			mediaRecorder.ondataavailable = (e) => {
				const routeUrl = URL.createObjectURL(e.data);
				blob = e.data;
				url = routeUrl;
				dispatch('recordFinished', { blob: e.data, url: routeUrl });
			};
			mediaRecorder.start();
			recording = true;
			return true;
		}
		error('تصویربرداری موفق نبود');
		dispatch('error');
		destroyCamera();
		return false;
	};

	export const stop = () => {
		// if (videoLimit > 0 && videoLimitInternal === 0) {
		if (intervalKey !== null) clearInterval(intervalKey);
		if (mediaRecorder && video && mediaRecorder.state !== 'inactive') {
			video.pause();
			mediaRecorder.stop();
			destroyCamera();
			recording = false;
			return true;
		}
		error('تصویربرداری موفق نبود');
		dispatch('error');
		destroyCamera();
		return false;
		// }
		return false;
	};

	export function captureScreenshot() {
		if (canvas && video && stream) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			var ctx = canvas.getContext('2d');
			ctx && ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			const routeUrl = canvas.toDataURL();
			canvas.toBlob((_blob) => {
				url = routeUrl;
				blob = _blob;
				dispatch('screenshot', { blob: _blob, url: routeUrl });
			});
			destroyCamera();
			return true;
		}
		error('تصویربرداری موفق نبود');
		dispatch('error');
		destroyCamera();
		return false;
	}

	$: color = (type === 'video' ? (recording ? 'red' : 'green') : 'red') as 'green' | 'red';
	$: active ? loadView() : removeView();

	function removeView() {
		if (stream) stream.getTracks().forEach((track) => track.stop());
	}

	function loadView() {
		if (active && video) {
			const videoConfig = isPC
				? true
				: {
						facingMode: {
							exact: 'environment'
						}
					};
			navigator.mediaDevices
				.getUserMedia({
					video: videoConfig
				})
				.then((v) => {
					stream = v;
					video!.srcObject = v;
					video!.play();
				})
				.catch((err) => {
					console.log(err);
					error('دوربین مشغول است یا وجود ندارد');
					dispatch('error');
					destroyCamera();
				});
		}
	}

	function load(node: HTMLVideoElement) {
		videoLimitInternal = videoLimit;
		video = node;
		loadView();
	}

	function closeWithBackButton() {
		active = false;
	}
	let keepUrlMain = keepUrl(closeWithBackButton);
</script>

{#if active}
	<div
		use:keepUrlMain
		transition:fly={{ y: 20, duration: 300, easing: easeOut }}
		class="fixed inset-0 z-10 bg-black-950 flex"
	>
		<div class="absolute inset-0 flex items-center">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video use:load class="w-full h-full" bind:this={video} />
			<canvas class="hidden w-full h-full" bind:this={canvas} />
			<div class="absolute bottom-8 inset-x-0 flex flex-col space-y-3 justify-center items-center">
				{#if videoLimit > 0 && type === 'video'}
					<div
						class="text-center border-dashed rounded-xl text-white font-bold border-gray-400 border-2 px-5 py-1 mb-1 w-[100px]"
					>
						{videoLimitInternal} ثانیه
					</div>
				{/if}
				<Button
					on:click={type === 'video' ? (recording ? stop : record) : captureScreenshot}
					class="!w-fit !p-7 size-8 !rounded-full outline outline-5 outline-offset-4 {color ===
					'red'
						? 'outline-red-500'
						: 'outline-green-500'}"
					rippleOff
					noGlass
					{color}
				/>
			</div>
		</div>
	</div>
{/if}
