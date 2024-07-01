<script lang="ts">
	import { writable } from 'svelte/store';

	export const timer = writable(0);

	let className: string = '';
	export const startCount = () => {
		if (interval) stopCount();
		interval = setInterval(() => {
			$timer -= 1;
		}, 1000);
	};
	export const stopCount = () => {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	};
	export { className as class };

	let interval: number | null = null;

	$: {
		if ($timer === 0 && interval) {
			stopCount();
		}
	}
</script>

<div class="bg-black-50 {className}">
	<p class="text-black-400">{$timer} ثانیه</p>
</div>
