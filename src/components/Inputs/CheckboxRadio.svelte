<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	let className: string = '';
	export let id: string;
	export let name: string | undefined = undefined;
	export let label: string = '';
	export let hideInput = false;
	export let checked = false;
	export let type: 'checkbox' | 'radio' = 'checkbox';
	export { className as class };
</script>

<label
	class={`flex items-center space-x-3 rtl:space-x-reverse cursor-pointer ${className}`}
	for={id}
>
	{#if !hideInput}
		<div
			data-checked={checked}
			class={`flex items-center size-5 max-h-5 min-w-5 cursor-pointer shadow-sm data-[checked=true]:ring-offset-2 data-[checked=true]:ring-2 group-data-[color=red]:bg-red-500 group-data-[color=red]:data-[checked=true]:ring-red-500 group-data-[color=blue]:bg-blue-500 group-data-[color=blue]:data-[checked=true]:ring-blue-500 group-data-[color=cyan]:bg-cyan-500 group-data-[color=cyan]:data-[checked=true]:ring-cyan-500 group-data-[color=green]:bg-green-500 group-data-[color=green]:data-[checked=true]:ring-green-500 group-data-[color=primary]:bg-primary-500 group-data-[color=primary]:data-[checked=true]:ring-primary-500 group-data-[color=secondary]:bg-secondary-500 group-data-[color=secondary]:data-[checked=true]:ring-secondary-500 ${type === 'checkbox' ? 'rounded-[6px]' : 'rounded-full'}`}
		>
			{#if checked}
				<svg transition:fade={{ duration: 200 }} class="p-1 fill-white" viewBox="0 0 448 512">
					<path
						d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
					/>
				</svg>
			{/if}
			<input
				{id}
				{name}
				type="checkbox"
				class="sr-only"
				{checked}
				on:change={() => dispatch('change')}
			/>
		</div>
	{:else}
		<input
			{id}
			{name}
			type="checkbox"
			class="sr-only"
			{checked}
			on:change={() => dispatch('change')}
		/>
	{/if}
	{#if label}
		<strong class="font-medium text-gray-900 dark:text-white">{label}</strong>
	{/if}
</label>
