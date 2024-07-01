<script lang="ts">
	import CheckboxRadio from './CheckboxRadio.svelte';
	import type OptionItem from '@/types/inputs/item';
	import { createEventDispatcher } from 'svelte';
	import Errors from './Errors.svelte';
	import { type ErrorType } from '@/types/responses/error_response';

	const dispatch = createEventDispatcher();

	$: dispatch('change', selectedItem ? selectedItem : null);

	let deleteError: () => void;

	let className: string = '';
	export let name: string = '';
	export let label: string = '';
	export let disabled: boolean = false;
	export let items: OptionItem[] = [];
	export let selectedItem: OptionItem | null = null;
	export let errors: ErrorType = {};
	export let color: 'green' | 'red' | 'cyan' | 'blue' | 'primary' | 'secondary' = 'primary';
	export let hideInput = false;
	export let type: 'cardStack' | 'cardRow' | 'simple' = 'cardStack';
	export let itemsContainer: string = '';
	export { className as class };

	$: colorClassName = disabled
		? 'data-[checked=true]:ring-gray-400 data-[checked=true]:bg-gray-200 dark:data-[checked=true]:bg-gray-700/50'
		: color === 'red'
			? 'data-[checked=true]:ring-red-500 data-[checked=true]:bg-red-50 dark:data-[checked=true]:bg-red-700/10'
			: color === 'green'
				? 'data-[checked=true]:ring-green-500 data-[checked=true]:bg-green-50 dark:data-[checked=true]:bg-green-700/10'
				: color === 'cyan'
					? 'data-[checked=true]:ring-cyan-500 data-[checked=true]:bg-cyan-50 dark:data-[checked=true]:bg-cyan-700/10'
					: color === 'blue'
						? 'data-[checked=true]:ring-blue-500 data-[checked=true]:bg-blue-50 dark:data-[checked=true]:bg-blue-700/10'
						: color === 'primary'
							? 'data-[checked=true]:ring-primary-500 data-[checked=true]:bg-primary-glass-10 dark:data-[checked=true]:bg-primary-glass-10'
							: color === 'secondary'
								? 'data-[checked=true]:ring-secondary-500 data-[checked=true]:bg-secondary-glass-10 dark:data-[checked=true]:bg-secondary-glass-10'
								: '';
</script>

<fieldset
	{name}
	id={name}
	data-hide-input={hideInput}
	data-color={color}
	class="group flex flex-col {className}"
>
	<div class="space-y-4 contents">
		<legend class="sr-only">{name}</legend>
		{#if label}
			<label for={name}>{label}</label>
		{/if}

		<div class="space-y-3 {itemsContainer}">
			{#if type !== 'simple'}
				{#each items as item (item.id)}
					<button
						data-checked={selectedItem === item}
						class="flex w-full !items-start !justify-start ltr:!text-left rtl:!text-right gap-4 rounded-2xl border p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 data-[checked=true]:ring-2 {colorClassName}"
						on:click={() => {
							selectedItem = item;
							deleteError();
						}}
					>
						<CheckboxRadio
							id={item.id.toString()}
							{name}
							{hideInput}
							class={`${type === 'cardStack' && 'mt-[2px]'}`}
							checked={selectedItem === item}
							on:change={() => {
								selectedItem = item;
								deleteError();
							}}
							type="radio"
						/>

						<div class={`w-full ${type === 'cardRow' ? 'flex justify-between' : 'space-y-1'}`}>
							<strong class="font-medium text-gray-900 dark:text-white">{item.title}</strong>

							{#if item.description}
								<p
									class={`text-pretty text-sm text-gray-700 dark:text-gray-200 ${type === 'cardRow' && 'ltr:text-right rtl:text-left'}`}
								>
									{item.description}
								</p>
							{/if}
						</div>
					</button>
				{/each}
			{:else}
				{#each items as item (item.id)}
					<CheckboxRadio
						id={item.id.toString()}
						{name}
						{hideInput}
						class="py-2"
						on:change={() => {
							selectedItem = item;
							deleteError();
						}}
						checked={selectedItem === item}
						type="radio"
						label={item.title}
					/>
				{/each}
			{/if}
		</div>
	</div>

	<Errors bind:deleteError bind:errors {name} />
</fieldset>
