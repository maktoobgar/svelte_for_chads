<script lang="ts">
	import { clickOutside } from '@utils/general';
	import Input from '@cp/Inputs/Input.svelte';
	import { fade } from 'svelte/transition';
	import MultiSelectOption from './MultiSelectOption.svelte';
	import Button from '@cp/Button.svelte';

	interface Item {
		id: number;
		value: any;
		content: string;
	}

	let className = '';
	export let id: string;
	export let label = '';
	export let options: Item[] = [];
	export let selectedOptions: Item[] = [];
	export let placeholder = '';
	export let inputClass = '';
	export let labelClass = '';
	export let inputValue: string = '';
	export let open: boolean = false;
	export { className as class };

	$: inputValueLowercase = inputValue.toLowerCase();
	$: filteredOptions = options.filter((v) => v.content.toLowerCase().includes(inputValueLowercase));
	$: optionsSelectedStates = filteredOptions.map(
		(v) => selectedOptions.findIndex((v2) => v2.id === v.id) !== -1
	);
</script>

<div
	use:clickOutside
	on:click_outside={() => {
		open = false;
		inputValue = '';
	}}
	data-open={open}
	class={`group my-2 relative ${className}`}
>
	<label
		for={id}
		class={`block select-none text-xs font-medium !text-gray-700 dark:!text-gray-200 cursor-pointer pb-1 ${labelClass}`}
		>{label}</label
	>

	<div
		class={`flex flex-wrap space-y-2 items-center bg-pure-white mt-1 w-full outline-none rounded-[8px] group-data-[open=true]:rounded-b-none overflow-hidden border-gray-200 shadow-custom dark:shadow-custom-dark dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm space-x-3 rtl:space-x-reverse py-2 ${inputClass}`}
	>
		{#each selectedOptions as item (item.id)}
			<MultiSelectOption
				on:click={() => (selectedOptions = selectedOptions.filter((v) => v.id !== item.id))}
				class="first:ltr:ml-3 first:rtl:mr-3 first:mt-2"
				content={item.content}
			/>
		{/each}
		<!-- Options that are chosen -->
		<input
			{id}
			{placeholder}
			bind:value={inputValue}
			on:focus={() => (open = true)}
			class="flex-grow outline-none py-3 px-3 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white capitalize sm:text-sm !mt-0"
		/>
	</div>

	{#if open}
		<div
			transition:fade={{ duration: 100 }}
			class="absolute top-full left-0 right-0 overflow-y-scroll max-h-[200px] rounded-b-[8px] dark:bg-gray-800 bg-pure-white shadow-custom dark:shadow-custom-dark"
		>
			{#each filteredOptions as item, index (item.id)}
				<Button
					on:click={() => {
						if (optionsSelectedStates[index]) {
							selectedOptions = selectedOptions.filter((v) => v.id !== item.id);
						} else {
							selectedOptions = [...selectedOptions, item];
						}
					}}
					class="!shadow-none w-full !justify-start rounded-none flex items-center capitalize"
					as="button"
					color="none"
					type="button"
					><Input
						id={item.id.toString()}
						type="checkbox"
						inputClass="!shadow-none"
						class="ltr:pr-2 rtl:pl-2 py-0"
						value={optionsSelectedStates[index]}
					/>{item.content}</Button
				>
			{/each}
		</div>
	{/if}
</div>
