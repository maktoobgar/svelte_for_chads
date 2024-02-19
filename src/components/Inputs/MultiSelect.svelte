<script lang="ts">
	import { clickOutside } from '@utils/general';
	import Input from '@cp/Inputs/Input.svelte';
	import { fade, slide } from 'svelte/transition';
	import MultiSelectOption from './MultiSelectOption.svelte';
	import Button from '@cp/Button.svelte';
	import Empty from '@icons/empty.svelte';
	import LL from '@i18n/i18n-svelte';
	import scaleFade from '@animations/scale_fade';
	import { easeOut } from '@animations/easings';

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
	export let single: boolean = false;
	export let hasAnimation: boolean = true;
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
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<label
		for={id}
		on:click={() => (open = true)}
		class={`block select-none font-medium !text-gray-700 dark:!text-gray-200 cursor-pointer pb-1 ${labelClass}`}
		>{label}</label
	>

	<div
		class={`flex flex-wrap relative space-y-2 items-center bg-pure-white mt-1 w-full outline-none rounded-[8px] group-data-[open=true]:rounded-b-none overflow-hidden border-gray-200 shadow-custom dark:shadow-custom-dark dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm space-x-3 rtl:space-x-reverse pb-2 ${inputClass}`}
	>
		{#if !single}
			{#each selectedOptions as item (item.id)}
				<MultiSelectOption
					on:click={() => (selectedOptions = selectedOptions.filter((v) => v.id !== item.id))}
					class="first:ltr:ml-3 first:rtl:mr-3 first:mt-2"
					content={item.content}
					{hasAnimation}
				/>
			{/each}
		{:else if selectedOptions.length > 0}
			<button
				on:click={() => (open = !open)}
				class="relative p-3 mt-2 text-lg bg-pure-white dark:bg-gray-700 w-full ltr:text-left rtl:text-right capitalize"
			>
				{selectedOptions[0].content}
				{#if single && selectedOptions.length > 0}
					<Button
						class="size-[20px] !p-1 !rounded-md !shadow-none !bg-gray-200 hover:!bg-gray-300 dark:!bg-gray-600 !absolute ltr:right-5 rtl:left-5 top-1/2 -translate-y-1/2"
						color="none"
						on:click={(e) => {
							e.stopPropagation();
							open = false;
							selectedOptions = [];
						}}
					>
						<svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
							><path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
							/></svg
						>
					</Button>
				{/if}
			</button>
		{/if}

		{#if !single || selectedOptions.length === 0}
			<input
				{id}
				{placeholder}
				bind:value={inputValue}
				on:focus={() => (open = true)}
				class="flex-grow outline-none py-3 px-3 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white capitalize sm:text-sm !mt-2"
			/>
		{/if}
	</div>

	{#if open}
		<div
			transition:slide={{ duration: 130, easing: easeOut }}
			class="absolute top-full left-0 right-0 max-h-[200px] rounded-b-[8px] overflow-y-scroll dark:bg-gray-800 bg-pure-white shadow-custom dark:shadow-custom-dark"
		>
			{#if filteredOptions.length > 0}
				{#each filteredOptions as item, index (item.id)}
					<Button
						on:click={() => {
							if (single) {
								if (optionsSelectedStates[index]) {
									selectedOptions = [];
								} else {
									selectedOptions = [item];
								}
								open = false;
								inputValue = '';
							} else {
								if (optionsSelectedStates[index]) {
									selectedOptions = selectedOptions.filter((v) => v.id !== item.id);
								} else {
									selectedOptions = [...selectedOptions, item];
								}
							}
						}}
						data={{ 'data-selected': optionsSelectedStates[index] }}
						class="!shadow-none w-full !justify-start rounded-none flex items-center capitalize data-[selected=true]:bg-primary-200"
						as="button"
						color="none"
						type="button"
					>
						{#if !single}
							<Input
								id={item.id.toString()}
								type="checkbox"
								inputClass="!shadow-none"
								class="ltr:pr-2 rtl:pl-2 !py-0"
								value={optionsSelectedStates[index]}
							/>
						{/if}
						{item.content}</Button
					>
				{/each}
			{:else}
				<div class="flex items-center justify-center p-5 space-x-5 rtl:space-x-reverse">
					<h3 class="select-none">{$LL.MultiSelect.NoItems()}...</h3>
					<Empty class="w-[50px] h-[50px] md:w-[80px] md:h-[80px] fill-black-700 dark:fill-white" />
				</div>
			{/if}
		</div>
	{/if}
</div>
