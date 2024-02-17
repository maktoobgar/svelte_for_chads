<script lang="ts">
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

	$: colorClasses =
		color === 'green'
			? 'bg-green-300 hover:bg-green-500 dark:bg-green-900 dark:hover:bg-green-700'
			: color === 'red'
				? 'bg-red-300 hover:bg-red-500 dark:bg-red-900 dark:hover:bg-red-700'
				: color === 'cyan'
					? 'bg-cyan-300 hover:bg-cyan-500 dark:bg-cyan-900 dark:hover:bg-cyan-700'
					: color === 'secondary'
						? 'bg-secondary-300 hover:bg-secondary-500 dark:bg-secondary-900 dark:hover:bg-secondary-700'
						: color === 'primary'
							? 'bg-primary-300 hover:bg-primary-500 dark:bg-primary-900 dark:hover:bg-primary-700'
							: color === 'none'
								? ''
								: 'bg-glass-5 hover:bg-glass-20 dark:bg-white-glass-10 dark:hover:bg-white-glass-30';
</script>

{#if as === 'button'}
	<button
		{type}
		{...data}
		{disabled}
		class={`shadow-custom dark:shadow-custom-dark rounded-[8px] px-5 py-3 flex items-center justify-center ${colorClasses} ${className}`}
		on:click={() => dispatch('click')}
		use:ripple><slot /></button
	>
{:else}
	<a
		{href}
		{...data}
		class={`shadow-custom dark:shadow-custom-dark rounded-[8px] px-5 py-3 flex items-center justify-center cursor-pointer select-none ${colorClasses} ${className}`}
		on:click={() => dispatch('click')}
		use:ripple><slot /></a
	>
{/if}
