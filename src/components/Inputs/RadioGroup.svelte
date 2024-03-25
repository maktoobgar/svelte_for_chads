<script lang="ts">
	import Button from '@cp/Button.svelte';
	import CheckboxRadio from './CheckboxRadio.svelte';

	interface Item {
		id: string;
		title: string;
		description?: string;
		value: any;
	}

	let className: string = '';
	export let name: string = '';
	export let label: string = '';
	export let items: Item[] = [];
	export let selectedItem: Item | null = null;
	export let color: 'green' | 'red' | 'cyan' | 'blue' | 'primary' | 'secondary' = 'primary';
	export let hideInput = false;
	export let type: 'cardStack' | 'cardRow' | 'simple' = 'cardStack';
	export { className as class };
</script>

<fieldset
	{name}
	id={name}
	data-hide-input={hideInput}
	data-color={color}
	class={`group space-y-4 ${className}`}
>
	<legend class="sr-only">{name}</legend>
	{#if label}
		<label for={name} class="font-bold text-lg">{label}</label>
	{/if}

	{#if type !== 'simple'}
		{#each items as item (item.id)}
			<Button
				color="none"
				class="flex w-full !items-start !justify-start has-[:checked]:ring-2 ltr:!text-left rtl:!text-right gap-4 rounded-lg border p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 group-data-[color=red]:has-[:checked]:ring-red-500 group-data-[color=blue]:has-[:checked]:ring-blue-500 group-data-[color=cyan]:has-[:checked]:ring-cyan-500 group-data-[color=green]:has-[:checked]:ring-green-500 group-data-[color=primary]:has-[:checked]:ring-primary-500 group-data-[color=secondary]:has-[:checked]:ring-secondary-500 group-data-[color=blue]:has-[:checked]:bg-blue-50 group-data-[color=cyan]:has-[:checked]:bg-cyan-50 group-data-[color=red]:has-[:checked]:bg-red-50 group-data-[color=green]:has-[:checked]:bg-green-50 group-data-[color=primary]:has-[:checked]:bg-primary-50 group-data-[color=blue]:has-[:checked]:bg-secondary-50 dark:group-data-[color=blue]:has-[:checked]:bg-blue-700/10 dark:group-data-[color=red]:has-[:checked]:bg-red-700/10 dark:group-data-[color=green]:has-[:checked]:bg-green-700/10 dark:group-data-[color=cyan]:has-[:checked]:bg-cyan-700/10 dark:group-data-[color=primary]:has-[:checked]:bg-primary-glass-10 dark:group-data-[color=secondary]:has-[:checked]:bg-secondary-glass-10"
				on:click={() => {
					selectedItem = item;
				}}
			>
				<CheckboxRadio
					id={item.id}
					{name}
					{hideInput}
					class={`${type === 'cardStack' && 'mt-[2px]'}`}
					checked={selectedItem === item}
					type="radio"
				/>

				<div class={`w-full ${type === 'cardRow' ? 'flex justify-between' : 'space-y-1'}`}>
					<strong class="font-medium text-gray-900 dark:text-white">{item.title}</strong>

					<p
						class={`text-pretty text-sm text-gray-700 dark:text-gray-200 ${type === 'cardRow' && 'ltr:text-right rtl:text-left'}`}
					>
						{item.description}
					</p>
				</div>
			</Button>
		{/each}
	{:else}
		<div class="space-y-3">
			{#each items as item (item.id)}
				<CheckboxRadio
					id={item.id}
					{name}
					{hideInput}
					class="py-2"
					on:change={() => {
						selectedItem = item;
					}}
					checked={selectedItem === item}
					type="radio"
					label={item.title}
				/>
			{/each}
		</div>
	{/if}
</fieldset>
