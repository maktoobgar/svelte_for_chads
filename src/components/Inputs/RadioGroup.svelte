<script lang="ts">
	import Button from '@cp/Button.svelte';

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

	{#each items as item (item.id)}
		<Button
			class="block !w-full !p-0 border border-gray-100 bg-white hover:bg-black-20 hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:bg-gray-800 group-data-[color=blue]:has-[:checked]:border-blue-500 group-data-[color=red]:has-[:checked]:border-red-500 group-data-[color=green]:has-[:checked]:border-green-500 group-data-[color=cyan]:has-[:checked]:border-cyan-500 group-data-[color=primary]:has-[:checked]:border-primary-500 group-data-[color=secondary]:has-[:checked]:border-secondary-500"
			on:click={() => (selectedItem = item)}
			color="none"
		>
			<div class="flex !w-full justify-between gap-4 p-4 text-sm font-medium">
				<div
					class="flex space-y-2 flex-col ltr:text-left rtl:text-right group-data-[hide-input=true]:flex-row group-data-[hide-input=true]:justify-between group-data-[hide-input=true]:space-y-0 group-data-[hide-input=true]:space-x-5 group-data-[hide-input=true]:rtl:space-x-reverse w-full"
				>
					<p class="text-gray-700 dark:text-gray-200 ltr:first-letter:capitalize">
						{item.title}
					</p>

					{#if item.description}
						<p
							class="text-gray-900 dark:text-white group-data-[hide-input=true]:text-right ltr:first-letter:capitalize group-data-[hide-input=true]:ltr:text-right group-data-[hide-input=true]:rtl:text-left"
						>
							{item.description}
						</p>
					{/if}
				</div>

				{#if !hideInput}
					<div
						class="block size-5 min-w-5 cursor-pointer rounded-full shadow-sm has-[:checked]:ring-offset-2 has-[:checked]:ring-2 group-data-[color=red]:bg-red-500 group-data-[color=red]:has-[:checked]:ring-red-500 group-data-[color=blue]:bg-blue-500 group-data-[color=blue]:has-[:checked]:ring-blue-500 group-data-[color=cyan]:bg-cyan-500 group-data-[color=cyan]:has-[:checked]:ring-cyan-500 group-data-[color=green]:bg-green-500 group-data-[color=green]:has-[:checked]:ring-green-500 group-data-[color=primary]:bg-primary-500 group-data-[color=primary]:has-[:checked]:ring-primary-500 group-data-[color=secondary]:bg-secondary-500 group-data-[color=secondary]:has-[:checked]:ring-secondary-500"
					>
						<input
							{name}
							type="radio"
							id={item.id}
							on:change={() => (selectedItem = item)}
							class="sr-only border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
							checked={item === selectedItem}
						/>
					</div>
				{:else}
					<input
						{name}
						type="radio"
						id={item.id}
						on:change={() => (selectedItem = item)}
						class="sr-only border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
						checked={item === selectedItem}
					/>
				{/if}
			</div>
		</Button>
	{/each}
</fieldset>
