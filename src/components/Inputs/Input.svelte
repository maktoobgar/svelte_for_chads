<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let id: string;
	export let label = '';
	export let value = '';
	export let placeholder = '';
	export let type: HTMLInputTypeAttribute = 'text';
	export let inputClass = '';
	export let labelClass = '';
	let className = '';
	export { className as class };

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class={`py-2 ${className}`}>
	<label
		for={id}
		class={`block select-none text-xs font-medium !text-gray-700 dark:!text-gray-200 cursor-pointer pb-1 ${labelClass}`}
		>{label}</label
	>

	<input
		use:typeAction
		{id}
		{placeholder}
		bind:value
		class={`mt-1 w-full outline-none py-3 px-3 rounded-[8px] border-gray-200 shadow-custom dark:shadow-custom-dark dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm ${inputClass}`}
	/>
</div>
