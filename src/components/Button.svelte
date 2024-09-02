<script lang="ts">
	import { none } from '@utils/general';
	import { createEventDispatcher, onMount } from 'svelte';
	import { ripple } from 'svelte-ripple-action';

	const dispatch = createEventDispatcher();

	let className = '';
	export { className as class };
	export let data: Object = {};
	export let type: 'submit' | 'button' = 'button';
	export let color: 'green' | 'red' | 'cyan' | 'primary' | 'secondary' | 'white' | 'none' | '' = '';
	export let as: 'button' | 'a' = 'button';
	export let href: string = '';
	export let rightGlass: boolean = false;
	export let disabled: boolean = false;
	export let rippleOff: boolean = false;
	export let noGlass: boolean = false;
	export let noAnimation: boolean = false;
	export let contentAlign: 'center' | 'left' | 'right' = 'center';
	export let noShadow: boolean = false;
	export let noPadding: boolean = false;

	let mousedown: boolean | null = null;

	$: rippleOrNoRipple = rippleOff || disabled ? none : ripple;

	onMount(() => {
		document.addEventListener('mouseup', () => (mousedown = mousedown ? false : null), true);
	});

	$: defaultClassName = `whitespace-nowrap group font-semibold text-sm ${noShadow ? '' : 'shadow-custom dark:shadow-custom-dark'} rounded-lg ${noPadding ? '' : 'px-5 py-3'} flex items-center ${contentAlign === 'center' ? 'justify-center' : contentAlign === 'left' ? 'justify-start' : 'justify-end'} select-none capitalize overflow-hidden relative transition-[background-color] duration-300 ${noAnimation ? '' : 'data-[mousedown=true]:animate-button-down data-[mousedown=false]:animate-click'}`;

	$: colorClasses =
		color === 'green'
			? 'text-black-800 hover:text-gray-200 disabled:text-gray-100 bg-green-400 hover:bg-green-500 dark:hover:bg-green-300 disabled:bg-gray-300'
			: color === 'red'
				? 'text-black-800 hover:text-gray-200 disabled:text-gray-100 bg-red-400 hover:bg-red-500 dark:hover:bg-red-300 disabled:bg-gray-300'
				: color === 'cyan'
					? 'text-black-800 hover:text-gray-200 disabled:text-gray-100 bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-300 disabled:bg-gray-300'
					: color === 'secondary'
						? 'text-black-800 hover:text-gray-200 disabled:text-gray-100 bg-secondary-400 hover:bg-secondary-500 dark:hover:bg-secondary-300 disabled:bg-gray-300'
						: color === 'primary'
							? 'text-black-800 hover:text-gray-200 disabled:text-gray-100 bg-primary-400 hover:bg-primary-500 dark:hover:bg-primary-300 disabled:bg-gray-300'
							: color === 'white'
								? 'text-black-800 hover:text-gray-200 disabled:text-gray-100 bg-black-20 hover:bg-primary-500 dark:hover:bg-primary-300 disabled:bg-gray-300'
								: color === 'none'
									? ''
									: 'text-gray-600 hover:text-gray-100 disabled:text-gray-100 bg-white-glass-10 dark:bg-white-glass-90 hover:bg-glass-20 disabled:bg-gray-300';
</script>

{#if as === 'button'}
	<button
		{type}
		{...data}
		{disabled}
		class="{defaultClassName} {colorClasses} {className}"
		data-mousedown={mousedown}
		on:mousedown={() => (mousedown = true)}
		on:mouseup={() => (mousedown = false)}
		on:click|stopPropagation={() => dispatch('click')}
		use:rippleOrNoRipple
	>
		{#if !noGlass}
			<div
				class="absolute -inset-y-[60px] bg-white-glass-20 dark:bg-white-glass-80 rotate-12 {rightGlass
					? '-right-[10px] left-3/4'
					: '-left-[10px] right-3/4'}"
			/>
		{/if}
		<slot />
	</button>
{:else}
	<a
		{href}
		{...data}
		class="{defaultClassName} {colorClasses} {className}"
		data-mousedown={mousedown}
		on:mousedown={() => (mousedown = true)}
		on:mouseup={() => (mousedown = false)}
		on:click={() => dispatch('click')}
		use:rippleOrNoRipple
	>
		{#if !noGlass}
			<div
				class="absolute -inset-y-[60px] bg-white-glass-20 dark:bg-white-glass-80 rotate-12 {rightGlass
					? '-right-[10px] left-3/4'
					: '-left-[10px] right-3/4'}"
			/>
		{/if}
		<slot />
	</a>
{/if}
