<script lang="ts">
	import { fade } from 'svelte/transition';
	import { watchResize } from 'svelte-watch-resize';

	export let hover = false;
	export let xDirection: 'left' | 'right' | 'center' = 'center'; // left and right off the box has to be done by code
	export let yDirection: 'top' | 'bottom' | 'center' = 'top'; // ignore center, top and bottom works fine

	let contentWidth: number;
	let contentHeight: number;
	let tooltipWidth: number;
	let tooltipHeight: number;

	let left: number | null;
	let right: number | null;
	let top: number | null;
	let bottom: number | null;

	$: {
		if (xDirection === 'left' && yDirection === 'center') {
			left = -tooltipWidth - 30;
			right = null;
		} else if (xDirection === 'right' && yDirection === 'center') {
			left = null;
			right = -tooltipWidth - 30;
		} else if (xDirection === 'left') {
			left = -tooltipWidth + 30;
			right = null;
		} else if (xDirection === 'right') {
			left = null;
			right = -tooltipWidth + 30;
		} else if (xDirection === 'center') {
			left = contentWidth / 2 - tooltipWidth / 2;
			right = null;
		}
	}

	$: {
		if (yDirection === 'bottom') {
			bottom = -tooltipHeight - 20;
			top = null;
		} else if (yDirection === 'top') {
			bottom = null;
			top = -tooltipHeight - 20;
		} else if (yDirection === 'center') {
			top = contentHeight / 2 - tooltipHeight / 2;
			bottom = null;
		}
	}
</script>

<div
	class="relative inline-block cursor-pointer"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	use:watchResize={(node) => {
		contentWidth = node.clientWidth;
		contentHeight = node.clientHeight;
	}}
	role="tooltip"
>
	<slot />

	{#if hover}
		<p
			use:watchResize={(node) => {
				tooltipWidth = node.clientWidth;
				tooltipHeight = node.clientHeight;
			}}
			class="absolute z-[10] flex items-center justify-center w-48 p-3 text-gray-600 bg-pure-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
			style={`left: ${left !== null ? left + 'px' : 'auto'}; right: ${right !== null ? right + 'px' : 'auto'}; top: ${top !== null ? top + 'px' : 'auto'}; bottom: ${bottom !== null ? bottom + 'px' : 'auto'};`}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
		>
			<span class="truncate">This is a tooltip</span>

			<svg
				data-x-direction={xDirection}
				data-y-direction={yDirection}
				class="size-[28px] absolute -mb-3 transform text-white fill-pure-white drop-shadow-lg dark:text-gray-800 dark:fill-gray-800 data-[x-direction=center]:-translate-x-1/2 data-[x-direction=center]:left-1/2 data-[x-direction=left]:right-[6px] data-[x-direction=right]:left-[6px] data-[y-direction=top]:-bottom-0.5 data-[y-direction=bottom]:bottom-[101%] data-[y-direction=bottom]:rotate-180 data-[y-direction=bottom]:drop-shadow-none data-[y-direction=center]:top-1/2 data-[y-direction=center]:-translate-y-1/2 data-[y-direction=center]:data-[x-direction=left]:-rotate-90 data-[y-direction=center]:data-[x-direction=left]:-right-[16px] data-[y-direction=center]:data-[x-direction=right]:rotate-90 data-[y-direction=center]:data-[x-direction=right]:-left-[16px]"
				viewBox="0 0 320 512"
			>
				<path
					d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
				/>
			</svg>
		</p>
	{/if}
</div>
