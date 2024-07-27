<script lang="ts" context="module">
	const convertToOptionItem = <T extends { id: number }>(v: T) => {
		const item = v as any;
		item.title = v.toString();
		return item as OptionItem;
	};
	const convertToT = <T extends { id: number }>(v: OptionItem) => {
		return v as unknown as T;
	};
</script>

<script lang="ts" generics="T extends {id: number}">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { createEventDispatcher, onMount } from 'svelte';
	import { clickOutside } from '@utils/general';
	import Input from '@cp/Inputs/Input.svelte';
	import { slide } from 'svelte/transition';
	import MultiSelectOption from './MultiSelectOption.svelte';
	import Button from '@cp/Button.svelte';
	import Empty from '@icons/Empty.svelte';
	import LL from '@i18n/i18n-svelte';
	import { easeOut } from '@animations/easings';
	import { error } from '@utils/notifier';
	import type OptionItem from '@/types/inputs/item';
	import { type ErrorType } from '@/types/responses/error_response';
	import Errors from './Errors.svelte';

	const dispatch = createEventDispatcher();

	let deleteError: () => void;

	let className = '';
	export let id: string;
	export let name: string = '';
	export let label = '';
	export let options: T[] = [];
	export let selectedOptions: T[] = [];
	export let selectedOption: T | null = null;
	export let errors: ErrorType = {};
	export let placeholder = '';
	export let inputClass = '';
	export let labelClass = '';
	export let inputValue: string = '';
	export let open: boolean = false;
	export let single: boolean = false;
	export let hasAnimation: boolean = true;
	export let limit: number | null = null;
	export let top: boolean = false;
	export { className as class };

	let root: HTMLDivElement;
	let topDiv: HTMLDivElement;
	let bottomDiv: HTMLDivElement;
	let topVisible = true;
	let bottomVisible = true;

	const observerFunc = (entries: IntersectionObserverEntry[]) => {
		if (entries && entries.length > 0) {
			if (topDiv && entries[0].target.id === topDiv.id) topVisible = entries[0].isIntersecting;
			else if (bottomDiv && entries[0].target.id === bottomDiv.id)
				bottomVisible = entries[0].isIntersecting;
		}
	};

	$: dispatch('listChanged', options);
	$: internalOptions = options.map((v) => convertToOptionItem(v));
	$: inputValueLowercase = inputValue.toLowerCase();
	$: filteredOptions = internalOptions.filter((v) =>
		v.title.toLowerCase().includes(inputValueLowercase)
	);
	$: optionsSelectedStates = filteredOptions.map(
		(v) =>
			selectedOptions.findIndex((v2) => v2.id === v.id) !== -1 ||
			(selectedOption ? selectedOption.id === v.id : false)
	);

	// onMount(() => {
	// 	const parentObserver = new IntersectionObserver(observerFunc, {
	// 		root: root.parentElement
	// 	});
	// 	const observer = new IntersectionObserver(observerFunc);
	// 	parentObserver.observe(topDiv);
	// 	parentObserver.observe(bottomDiv);
	// 	observer.observe(topDiv);
	// 	observer.observe(bottomDiv);
	// });

	const optionClick = (item: OptionItem, index: number) => {
		deleteError();
		if (single) {
			if (optionsSelectedStates[index]) {
				selectedOption = null;
				dispatch('singleSelected', null);
			} else {
				selectedOption = convertToT<T>(item);
				dispatch('singleSelected', convertToT(item));
			}
			open = false;
			inputValue = '';
		} else {
			if (optionsSelectedStates[index]) {
				selectedOptions = selectedOptions.filter((v) => v.id !== item.id);
			} else {
				if (limit && limit > 0) {
					if (selectedOptions.length < limit)
						selectedOptions = [...selectedOptions, convertToT(item)];
					else error($LL.MultiSelect.Limit({ limit: limit }));
				} else selectedOptions = [...selectedOptions, convertToT(item)];
			}
		}
	};
</script>

<div
	use:clickOutside
	bind:this={root}
	on:click_outside={() => {
		open = false;
		inputValue = '';
	}}
	data-open={open}
	class={`group flex flex-col relative ${className}`}
>
	{#if label.length !== 0}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<label
			for={id}
			on:click={() => (open = true)}
			class={`block select-none font-medium !text-gray-700 dark:!text-gray-200 cursor-pointer pb-1 ${labelClass}`}
		>
			{label}
		</label>
	{/if}
	<div
		class="flex flex-wrap relative items-center w-full outline-none rounded-2xl border-gray-200 shadow-md dark:border-gray-700 dark:text-white sm:text-sm space-x-3 rtl:space-x-reverse h-[58px] {open ||
		selectedOptions.length > 0 ||
		selectedOption
			? 'bg-pure-white dark:bg-gray-800'
			: 'bg-gray-100 dark:bg-gray-800'} {inputClass}"
	>
		<div class="relative w-full h-full flex items-center">
			{#if !single}
				{#each selectedOptions as item (item.id)}
					<MultiSelectOption
						on:click={() => {
							deleteError();
							selectedOptions = selectedOptions.filter((v) => v.id !== item.id);
						}}
						class="first:ltr:ml-3 first:rtl:mr-3 first:mt-2"
						content={convertToOptionItem(item).title}
						{hasAnimation}
					/>
				{/each}
			{:else if selectedOption}
				<button
					on:click={() => (open = !open)}
					class="relative h-full text-lg bg-pure-white dark:bg-gray-800 w-full ltr:text-left rtl:text-right rounded-2xl capitalize {selectedOption &&
						'ltr:pl-4 rtl:pr-4'}"
				>
					{selectedOption.toString()}
					<Button
						class="!size-[20px] !p-1 !rounded-2xl !shadow-none !bg-gray-200 hover:!bg-gray-300 dark:!bg-gray-600 !absolute ltr:right-5 rtl:left-5 top-1/2 -translate-y-1/2"
						color="none"
						noAnimation
						noGlass
						on:click={(e) => {
							if (single) dispatch('singleSelected', null);
							e.stopPropagation();
							open = false;
							deleteError();
							selectedOption = null;
							selectedOptions = [];
						}}
					>
						<svg class="dark:fill-white fill-gray-700" viewBox="0 0 384 512">
							<path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
							/>
						</svg>
					</Button>
				</button>
			{:else}
				<input
					{id}
					{placeholder}
					bind:value={inputValue}
					on:focus={() => (open = true)}
					class="flex-grow outline-none rounded-xl py-3 px-3 border-gray-200 dark:border-gray-700 dark:bg-gray-800 placeholder:text-gray-500 dark:text-white capitalize sm:text-sm {open ||
					selectedOptions.length > 0 ||
					selectedOption
						? ''
						: 'bg-gray-100'}"
				/>
			{/if}

			{#if open}
				<div
					transition:slide={{ duration: 150, easing: easeOut }}
					class="absolute inset-x-0 max-h-[200px] rounded-2xl overflow-y-scroll dark:bg-gray-800 bg-pure-white shadow-md z-[1] {top
						? topVisible
							? 'bottom-full mb-3'
							: 'top-full mt-3'
						: bottomVisible
							? 'top-full mt-3'
							: 'bottom-full mb-3'}"
				>
					{#if filteredOptions.length > 0}
						{#each filteredOptions as item, index (item.id)}
							<Button
								on:click={() => optionClick(item, index)}
								data={{ 'data-selected': optionsSelectedStates[index] }}
								class="!shadow-none w-full !justify-start rounded-none flex items-center capitalize data-[selected=true]:bg-secondary-100 dark:data-[selected=true]:bg-secondary-800"
								as="button"
								color="none"
								type="button"
								noAnimation
								noGlass
							>
								{#if !single}
									<Input
										id={item.id.toString()}
										type="checkbox"
										inputClass="!shadow-none"
										class="ltr:pr-2 rtl:pl-2 !py-0 smMax:hidden"
										value={optionsSelectedStates[index]}
									/>
								{/if}
								{item.title}</Button
							>
						{/each}
					{:else}
						<div class="flex items-center justify-center p-5 space-x-5 rtl:space-x-reverse">
							<h6 class="select-none whitespace-nowrap">{$LL.MultiSelect.NoItems()}...</h6>
							<Empty
								class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] fill-black-700 dark:fill-white"
							/>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<IntersectionObserver element={topDiv} bind:intersecting={topVisible}>
		<div
			class="absolute inset-x-0 flex flex-col justify-end items-end max-h-[200px] invisible rounded-2xl overflow-y-scroll z-[2] pointer-events-none bottom-full mb-3"
		>
			{#if filteredOptions.length > 0}
				{#each filteredOptions as item, index (item.id)}
					<Button
						on:click={() => optionClick(item, index)}
						data={{ 'data-selected': optionsSelectedStates[index] }}
						class="!shadow-none w-full !justify-start rounded-none flex items-center capitalize data-[selected=true]:bg-secondary-100 dark:data-[selected=true]:bg-secondary-800"
						as="button"
						color="none"
						type="button"
						noAnimation
						noGlass
					>
						{#if !single}
							<Input
								id={item.id.toString()}
								type="checkbox"
								inputClass="!shadow-none"
								class="ltr:pr-2 rtl:pl-2 !py-0 smMax:hidden"
								value={optionsSelectedStates[index]}
							/>
						{/if}
						{item.title}</Button
					>
				{/each}
			{:else}
				<div class="flex items-center justify-center p-5 space-x-5 rtl:space-x-reverse">
					<h6 class="select-none whitespace-nowrap">{$LL.MultiSelect.NoItems()}...</h6>
					<Empty class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] fill-black-700 dark:fill-white" />
				</div>
			{/if}
			<div bind:this={topDiv} id="topDiv" />
		</div>
	</IntersectionObserver>

	<IntersectionObserver element={bottomDiv} bind:intersecting={bottomVisible}>
		<div
			class="absolute inset-x-0 flex flex-col justify-end items-end max-h-[200px] invisible rounded-2xl overflow-y-scroll z-[2] pointer-events-none top-full mt-3"
		>
			{#if filteredOptions.length > 0}
				{#each filteredOptions as item, index (item.id)}
					<Button
						on:click={() => optionClick(item, index)}
						data={{ 'data-selected': optionsSelectedStates[index] }}
						class="!shadow-none w-full !justify-start rounded-none flex items-center capitalize data-[selected=true]:bg-secondary-100 dark:data-[selected=true]:bg-secondary-800"
						as="button"
						color="none"
						type="button"
						noAnimation
						noGlass
					>
						{#if !single}
							<Input
								id={item.id.toString()}
								type="checkbox"
								inputClass="!shadow-none"
								class="ltr:pr-2 rtl:pl-2 !py-0 smMax:hidden"
								value={optionsSelectedStates[index]}
							/>
						{/if}
						{item.title}
					</Button>
				{/each}
			{:else}
				<div class="flex items-center justify-center p-5 space-x-5 rtl:space-x-reverse">
					<h6 class="select-none whitespace-nowrap">{$LL.MultiSelect.NoItems()}...</h6>
					<Empty class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] fill-black-700 dark:fill-white" />
				</div>
			{/if}
			<div id="bottomDiv" bind:this={bottomDiv} />
		</div>
	</IntersectionObserver>

	<Errors bind:deleteError bind:errors {name} />
</div>
