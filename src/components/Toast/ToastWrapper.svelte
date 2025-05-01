<script lang="ts">
	import type ToastType from '@/types/toast/toast_type';
	import toast from '@stores/toast';
	import { onMount, onDestroy } from 'svelte';

	export let type: ToastType = 'success';
	export let duration = 3000;
	export let delete_me: () => void;

	let progress = 0;
	let interval: ReturnType<typeof setInterval>;
	let startTime: number;
	let remaining = duration;
	let active = true;
	let height = 0;
	let parentDiv: HTMLDivElement | null = null;

	const updateProgress = () => {
		interval = setInterval(() => {
			const elapsed = Date.now() - startTime;
			remaining = duration - elapsed;
			progress = Math.max(0, Math.min(elapsed / duration, 1));
			if (progress === 1) {
				clearInterval(interval);
				height = parentDiv ? parentDiv.getBoundingClientRect().height : 0;
				active = false;
			}
		}, 16);
	};

	const start = () => {
		startTime = Date.now();
		updateProgress();
	};

	const resume = () => {
		if (progress !== 1) {
			// Date.now() - elapsed
			startTime = Date.now() - (duration - remaining);
			updateProgress();
		}
	};

	const pause = () => {
		if (progress !== 1) clearInterval(interval);
	};

	onMount(() => start());
	onDestroy(() => clearInterval(interval));
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={parentDiv}
	class:animate-squash={!active}
	class:mt-2={active}
	class:mt-0={!active}
	style={`--max-height: ${height === 0 ? 'auto' : height.toString() + 'px'};`}
>
	<div
		on:mouseenter={() => {
			pause();
		}}
		on:mouseleave={() => {
			resume();
		}}
		on:animationend={() => {
			if (!active) delete_me();
		}}
		class={'rounded-lg bg-white dark:bg-gray-800 shadow-md overflow-hidden'}
		class:animate-fade-in-and-slide-from-top={active && $toast.startsWith('bottom')}
		class:animate-fade-in-and-slide-from-bottom={active && $toast.startsWith('top')}
		class:animate-fade-out-and-slide-from-bottom={!active && $toast.startsWith('bottom')}
		class:animate-fade-out-and-slide-from-top={!active && $toast.startsWith('top')}
	>
		<slot />
		<div
			class={`h-[1px]
                    ${type == 'success' ? 'bg-emerald-400' : ''}
                    ${type == 'info' ? 'bg-blue-400' : ''}
                    ${type == 'warning' ? 'bg-yellow-300' : ''}
                    ${type == 'error' ? 'bg-red-400' : ''}`}
		/>
		<div
			style={`width: ${progress * 100}%`}
			class={`h-1
                    ${type == 'success' ? 'bg-emerald-400' : ''}
                    ${type == 'info' ? 'bg-blue-400' : ''}
                    ${type == 'warning' ? 'bg-yellow-300' : ''}
                    ${type == 'error' ? 'bg-red-400' : ''}`}
		/>
	</div>
</div>
