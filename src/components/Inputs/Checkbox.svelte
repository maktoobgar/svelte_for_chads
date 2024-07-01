<script lang="ts">
	import Button from '@cp/Button.svelte';
	import CheckboxRadio from './CheckboxRadio.svelte';
	import { type ErrorType } from '@/types/responses/error_response';
	import Errors from './Errors.svelte';

	let deleteError: () => void;

	let className: string = '';
	export let id: string;
	export let name: string = '';
	export let title: string = '';
	export let description: string = '';
	export let color: 'green' | 'red' | 'cyan' | 'blue' | 'primary' | 'secondary' = 'primary';
	export let type: 'cardStack' | 'cardRow' | 'simple' = 'cardStack';
	export let inputClass: string = '';
	export let errors: ErrorType = {};
	export let value: boolean = false;
	export let hideInput: boolean = false;
	export { className as class };
</script>

<div data-color={color} class="group flex flex-col {className}">
	{#if type !== 'simple'}
		<Button
			color="none"
			class="flex w-full !items-start !justify-start ltr:!text-left rtl:!text-right gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 group-data-[color=blue]:has-[:checked]:bg-blue-50 group-data-[color=cyan]:has-[:checked]:bg-cyan-50 group-data-[color=red]:has-[:checked]:bg-red-50 group-data-[color=green]:has-[:checked]:bg-green-50 group-data-[color=primary]:has-[:checked]:bg-primary-50 group-data-[color=blue]:has-[:checked]:bg-secondary-50 dark:group-data-[color=blue]:has-[:checked]:bg-blue-700/10 dark:group-data-[color=red]:has-[:checked]:bg-red-700/10 dark:group-data-[color=green]:has-[:checked]:bg-green-700/10 dark:group-data-[color=cyan]:has-[:checked]:bg-cyan-700/10 dark:group-data-[color=primary]:has-[:checked]:bg-primary-glass-10 dark:group-data-[color=secondary]:has-[:checked]:bg-secondary-glass-10 {inputClass}"
			on:click={() => {
				deleteError();
				value = !value;
			}}
		>
			<CheckboxRadio
				{id}
				class={`${type === 'cardStack' && 'mt-[2px]'}`}
				checked={value}
				on:change={() => {
					deleteError();
					value = !value;
				}}
				type="checkbox"
				{hideInput}
			/>

			<div class={`w-full ${type === 'cardRow' ? 'flex justify-between' : 'space-y-1'}`}>
				<strong class="font-medium text-gray-900 dark:text-white">{title}</strong>

				<p
					class={`text-pretty text-sm text-gray-700 dark:text-gray-200 ${type === 'cardRow' && 'ltr:text-right rtl:text-left'}`}
				>
					{description}
				</p>
			</div>
		</Button>
	{:else}
		<CheckboxRadio
			{id}
			class="py-2 {inputClass}"
			on:change={() => {
				deleteError();
				value = !value;
			}}
			checked={value}
			type="checkbox"
			label={title}
			{hideInput}
		/>
	{/if}

	<Errors bind:deleteError bind:errors {name} />
</div>
