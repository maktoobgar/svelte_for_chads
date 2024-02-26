<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	let className = '';

	export let id: string;
	export let label = '';
	export let value: any = '';
	export let placeholder = '';
	export let type: HTMLInputTypeAttribute = 'text';
	export let inputClass = '';
	export let labelClass = '';
	export { className as class };

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class={`py-2 ${className}`}>
	{#if label}
		<label
			for={id}
			class={`block select-none font-medium !text-gray-700 dark:!text-gray-200 cursor-pointer pb-1 ${labelClass}`}
			>{label}</label
		>
	{/if}

	{#if type === 'checkbox'}
		<input
			type="checkbox"
			{id}
			{placeholder}
			bind:checked={value}
			class={`mt-1 w-full outline-none py-3 px-3 rounded-[8px] border-gray-200 shadow-custom dark:shadow-custom-dark dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm ${inputClass}`}
		/>
	{:else}
		<input
			use:typeAction
			{id}
			{placeholder}
			bind:value
			class={`mt-1 w-full outline-none py-3 px-3 rounded-[8px] border-gray-200 shadow-custom dark:shadow-custom-dark dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm ${inputClass}`}
		/>
	{/if}
</div>
