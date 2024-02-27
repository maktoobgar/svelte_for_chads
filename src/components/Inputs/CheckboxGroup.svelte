<script lang="ts">
	import Button from '@cp/Button.svelte';

	interface Item {
		id: string;
		name?: string;
		title: string;
		description?: string;
		value: any;
	}

	let className: string = '';
	export let name: string = '';
	export let label: string = '';
	export let items: Item[] = [];
	export let selectedItems: Item[] = [];
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

	<div class="space-y-2">
		{#each items as item (item.id)}
			<Button
				color="none"
				class="flex w-full !items-start !justify-start ltr:!text-left rtl:!text-right gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 group-data-[color=blue]:has-[:checked]:bg-blue-50 group-data-[color=cyan]:has-[:checked]:bg-cyan-50 group-data-[color=red]:has-[:checked]:bg-red-50 group-data-[color=green]:has-[:checked]:bg-green-50 group-data-[color=primary]:has-[:checked]:bg-primary-50 group-data-[color=blue]:has-[:checked]:bg-secondary-50 dark:group-data-[color=blue]:has-[:checked]:bg-blue-700/10 dark:group-data-[color=red]:has-[:checked]:bg-red-700/10 dark:group-data-[color=green]:has-[:checked]:bg-green-700/10 dark:group-data-[color=cyan]:has-[:checked]:bg-cyan-700/10 dark:group-data-[color=primary]:has-[:checked]:bg-primary-glass-10 dark:group-data-[color=secondary]:has-[:checked]:bg-secondary-glass-10"
				on:click={() => {
					const index = selectedItems.findIndex((v) => v.id === item.id);
					if (index !== -1)
						selectedItems = [
							...selectedItems.slice(0, index),
							...selectedItems.slice(index + 1, selectedItems.length)
						];
					else selectedItems = [...selectedItems, item];
				}}
			>
				{#if !hideInput}
					<div
						class="flex items-center mt-[6px] size-5 min-w-5 cursor-pointer rounded-[6px] shadow-sm has-[:checked]:ring-offset-2 has-[:checked]:ring-2 group-data-[color=red]:bg-red-500 group-data-[color=red]:has-[:checked]:ring-red-500 group-data-[color=blue]:bg-blue-500 group-data-[color=blue]:has-[:checked]:ring-blue-500 group-data-[color=cyan]:bg-cyan-500 group-data-[color=cyan]:has-[:checked]:ring-cyan-500 group-data-[color=green]:bg-green-500 group-data-[color=green]:has-[:checked]:ring-green-500 group-data-[color=primary]:bg-primary-500 group-data-[color=primary]:has-[:checked]:ring-primary-500 group-data-[color=secondary]:bg-secondary-500 group-data-[color=secondary]:has-[:checked]:ring-secondary-500"
					>
						{#if selectedItems.findIndex((v) => v.id === item.id) !== -1}
							<svg class="p-1 fill-white" viewBox="0 0 448 512">
								<path
									d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
								/>
							</svg>
						{/if}
						<input
							name={item.name}
							type="checkbox"
							id={item.id}
							class="sr-only"
							checked={selectedItems.findIndex((v) => v.id === item.id) !== -1}
						/>
					</div>
				{:else}
					<input
						name={item.name}
						type="checkbox"
						id={item.id}
						class="sr-only"
						checked={selectedItems.findIndex((v) => v.id === item.id) !== -1}
					/>
				{/if}

				<div>
					<strong class="font-medium text-gray-900 dark:text-white">{item.title}</strong>

					<p class="mt-1 text-pretty text-sm text-gray-700 dark:text-gray-200">
						{item.description}
					</p>
				</div>
			</Button>
		{/each}
	</div>
</fieldset>
