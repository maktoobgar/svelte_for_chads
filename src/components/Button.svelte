<script lang="ts">
	import { none } from '@utils/general';
	import { createEventDispatcher } from 'svelte';
	import { ripple } from 'svelte-ripple-action';

	const dispatch = createEventDispatcher();

	let className = '';
	export { className as class };
	export let data: Object = {};
	export let type: 'submit' | 'button' = 'button';
	export let color: 'green' | 'red' | 'cyan' | 'primary' | 'secondary' | 'none' | '' = '';
	export let as: 'button' | 'a' = 'button';
	export let href: string = '';
	export let disabled: boolean = false;
	export let rippleOff: boolean = false;

	const commonClasses =
		'shadow-custom dark:shadow-custom-dark rounded-[8px] px-5 py-3 flex items-center justify-center select-none capitalize';

	$: rippleOrNoRipple = rippleOff ? none : ripple;

	$: colorClasses =
		color === 'green'
			? 'text-white bg-green-600 hover:bg-green-700 dark:bg-green-900 dark:hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-700'
			: color === 'red'
				? 'text-white bg-red-600 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-700'
				: color === 'cyan'
					? 'text-white bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-900 dark:hover:bg-cyan-700 disabled:bg-gray-300 dark:disabled:bg-gray-700'
					: color === 'secondary'
						? 'text-white bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-900 dark:hover:bg-secondary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700'
						: color === 'primary'
							? 'text-white bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 disabled:bg-gray-300 dark:disabled:bg-gray-700'
							: color === 'none'
								? ''
								: 'text-black-600 dark:text-white bg-glass-5 hover:bg-glass-20 dark:bg-white-glass-10 dark:hover:bg-white-glass-30 disabled:bg-gray-300 dark:disabled:bg-gray-700';
</script>

{#if as === 'button'}
	<button
		{type}
		{...data}
		{disabled}
		class="{commonClasses} {colorClasses} {className}"
		on:click={() => dispatch('click')}
		use:rippleOrNoRipple
	>
		<slot />
	</button>
{:else}
	<a
		{href}
		{...data}
		class="{commonClasses} {colorClasses} {className}"
		on:click={() => dispatch('click')}
		use:rippleOrNoRipple
	>
		<slot />
	</a>
{/if}
