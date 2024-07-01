<script lang="ts">
	import Button from '@cp/Button.svelte';
	import LL from '@i18n/i18n-svelte';
	import { DateFormatter } from '@utils/general';
	import language from '@stores/i18n';
	import { easeOut } from '@animations/easings';
	import { fade, fly } from 'svelte/transition';
	import type ColumnItem from '@/types/table/column_item';
	import type Item from '@/types/table/item';
	import type Sort from '@/types/table/sort';
	import type FilterItem from '@/types/table/filter_item';
	import { onDestroy } from 'svelte';

	export let name: string = 'TITLE';
	export let description: string = 'DESCRIPTION';
	export let count: number = 240;
	export let columns: ColumnItem[] = [];
	export let items: Item[] = [];
	export let optionsButton: boolean = false;
	export let addButton: string | (() => void) = '';
	export let pageNumber: number = 1;
	export let allPages: number = 10;
	export let select: boolean = false;
	export let status: 'idle' | 'loading' | 'error' | 'success';
	export let sort: Sort | null = null;
	export let text: string = '';
	export let filterItems: FilterItem[] = [];
	export let activeFilterItem: FilterItem | null = null;
	export let onFilterItemSelect: null | ((v: FilterItem, select: boolean) => void) = null;

	let internalText: string = text;
	let timer: number | undefined;

	const handleInput = (e: any) => {
		clearTimeout(timer);

		timer = setTimeout(() => (text = internalText), 500);
	};

	onDestroy(() => {
		clearTimeout(timer);
	});
</script>

<section class="w-full px-4 mx-auto">
	<div class="sm:flex sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-x-3">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">{name}</h2>

				<span
					class="px-3 py-1 text-xs text-primary-700 bg-primary-200 rounded-full dark:bg-primary-400 dark:text-primary-100"
				>
					{`${count} ${name}`}
				</span>
			</div>

			<p class="mt-1 text-sm text-gray-500 dark:text-gray-300 ltr:first-letter:capitalize">
				{description}
			</p>
		</div>

		{#if addButton}
			<div class="flex items-center mt-4 gap-x-3">
				<Button
					as={typeof addButton === 'string' ? 'a' : 'button'}
					href={typeof addButton === 'string' ? addButton : ''}
					on:click={typeof addButton === 'string' ? () => {} : addButton}
					class="flex items-center justify-center w-1/2 px-5 py-2 text-md tracking-wide text-white transition-colors duration-200 rounded-lg shrink-0 sm:w-auto gap-x-2 stroke-white"
					color="green"
					noGlass
					noIcon
				>
					<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-5 h-5">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>

					<span class="text-white ltr:capitalize">
						{$LL.Table.Add()}
					</span>
				</Button>
			</div>
		{/if}
	</div>

	<div class="mt-6 md:flex md:items-center md:justify-between">
		<div
			class="inline-flex overflow-hidden bg-white border divide-x rtl:divide-x-reverse rounded-[15px] dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700 shadow-custom dark:shadow-custom-dark ltr"
		>
			{#each filterItems as item}
				<Button
					as="button"
					on:click={() =>
						onFilterItemSelect && onFilterItemSelect(item, activeFilterItem?.id !== item.id)}
					data={{ 'data-select': activeFilterItem?.id === item.id }}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 rounded-none capitalize !shadow-none border-gray-300 dark:data-[select=true]:bg-green-900 data-[select=true]:bg-green-300"
					color="none"
					noAnimation
					noGlass
					noIcon
				>
					{item.title}
				</Button>
			{/each}
		</div>

		<form
			class="relative flex items-center mt-4 md:mt-0 rounded-[16px] overflow-hidden border border-gray-400 dark:border-gray-700 shadow-custom dark:shadow-custom-dark"
			on:submit={(e) => {
				e.preventDefault();
				text = internalText;
			}}
		>
			<button type="submit" class="absolute">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</button>

			<input
				type="text"
				placeholder={$LL.Table.Search()}
				on:input={handleInput}
				bind:value={internalText}
				class="block w-full py-1.5 pr-5 text-gray-700 bg-white md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 active:bg-pure-white outline-none ltr:placeholder:capitalize"
			/>
		</form>
	</div>

	<div
		class="flex flex-col mt-6 overflow-x-scroll overflow-hidden rounded-[16px] shadow-custom dark:shadow-custom-dark"
	>
		<div class="inline-block min-w-full w-fit align-middle shadow-custom">
			<div class={`relative bg-white dark:bg-gray-900 ${status === 'loading' && 'min-h-[200px]'}`}>
				<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead class="bg-gray-50 dark:bg-gray-800">
						<tr>
							{#each columns as col (col.id)}
								<th
									scope="col"
									class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									<button
										disabled={!col.sort}
										on:click={() => {
											if (sort && sort.sort === 'desc') sort = null;
											else if (sort && sort.id === col.id && sort.sort === 'asc')
												sort = { id: col.id, sort: 'desc' };
											else sort = { id: col.id, sort: 'asc' };
										}}
										class="flex items-center gap-x-3 focus:outline-none"
									>
										<span class="ltr:first-letter:capitalize whitespace-nowrap">{col.name}</span>

										{#if col.id === sort?.id && sort.sort === 'asc' && col.sort}
											<svg
												class="h-4 fill-primary-800 dark:fill-primary-100"
												viewBox="0 0 576 512"
												in:fade={{ duration: 150, easing: easeOut }}
											>
												<path
													d="M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 352H352c-17.7 0-32-14.3-32-32zM416 32c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 224H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128C392.8 38.8 403.9 32 416 32zM395.8 176h40.4L416 135.6 395.8 176z"
												/>
											</svg>
										{/if}
										{#if col.id === sort?.id && sort.sort === 'desc' && col.sort}
											<svg
												class="h-4 fill-primary-800 dark:fill-primary-100"
												viewBox="0 0 576 512"
												in:fade={{ duration: 150, easing: easeOut }}
											>
												<path
													d="M183.6 42.4C177.5 35.8 169 32 160 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L128 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 64c0 17.7 14.3 32 32 32h50.7l-73.4 73.4c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H429.3l73.4-73.4c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H352c-17.7 0-32 14.3-32 32zm96 192c-12.1 0-23.2 6.8-28.6 17.7l-64 128-16 32c-7.9 15.8-1.5 35 14.3 42.9s35 1.5 42.9-14.3l7.2-14.3h88.4l7.2 14.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9l-16-32-64-128C439.2 262.8 428.1 256 416 256zM395.8 400L416 359.6 436.2 400H395.8z"
												/>
											</svg>
										{/if}
									</button>
								</th>
							{/each}
							{#if optionsButton}
								<th></th>
							{/if}
						</tr>
					</thead>
					{#if status === 'idle' || status === 'success'}
						<tbody
							class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
							in:fade={{ duration: 150, delay: 150, easing: easeOut }}
							out:fade={{ duration: 150, easing: easeOut }}
						>
							{#each items as item (item.id)}
								<tr>
									{#each columns as col, index (col.id)}
										<td
											class={`px-4 py-4 text-sm whitespace-nowrap ${index === 0 ? 'flex gap-4' : ''}`}
										>
											{#if index === 0 && select}
												<input
													type="checkbox"
													class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
												/>
											{/if}
											{#if col.type === 'profile'}
												<div class="flex items-center gap-x-2 w-[200px]">
													<img
														class="object-cover w-10 h-10 rounded-full"
														src={item.data[col.colName].extra?.src || '/default.png'}
														alt=""
													/>
													<div>
														<p class="font-medium text-gray-800 dark:text-white">
															{item.data[col.colName].content[0]
																? item.data[col.colName].content[0]
																: '-'}
														</p>
														<p
															class="text-sm font-normal text-gray-600 dark:text-gray-400 ltr rtl:text-right"
														>
															{item.data[col.colName].content[1]
																? item.data[col.colName].content[1]
																: '-'}
														</p>
													</div>
												</div>
											{:else if col.type === 'twoPiece'}
												<div>
													<p class="text-gray-700 dark:text-gray-200">
														{item.data[col.colName].content[0]
															? item.data[col.colName].content[0]
															: '-'}
													</p>
													<p class="text-gray-500 dark:text-gray-400">
														{item.data[col.colName].content[1]
															? item.data[col.colName].content[1]
															: '-'}
													</p>
												</div>
											{:else if col.type === 'status'}
												<div
													class={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800 capitalize select-none text-black-800 dark:text-white ${item.data[col.colName].extra?.color === 'green' ? 'bg-green-500 dark:bg-green-900' : item.data[col.colName].extra?.color === 'red' ? 'bg-red-400 dark:bg-red-900' : item.data[col.colName].extra?.color === 'primary' ? 'bg-primary-200 dark:bg-primary-500' : item.data[col.colName].extra?.color === 'secondary' ? 'bg-secondary-300 dark:bg-secondary-500' : item.data[col.colName].extra?.color === 'cyan' ? 'bg-cyan-300 hover:bg-cyan-500 dark:bg-cyan-900' : 'bg-glass-20 dark:bg-white-glass-10'}`}
												>
													{item.data[col.colName].content
														? item.data[col.colName].content.toString()
														: '-'}
												</div>
											{:else if col.type === 'progressBar'}
												<div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
													<div
														style={`width: ${item.data[col.colName].content || '0'}%;`}
														class="bg-blue-500 w-2/3 h-1.5"
													></div>
												</div>
											{:else if col.type === 'date'}
												{item.data[col.colName].content instanceof Date &&
												!isNaN(item.data[col.colName].content)
													? DateFormatter(item.data[col.colName].content, $language)
													: '-'}
											{:else if col.type === ''}
												{item.data[col.colName].content
													? item.data[col.colName].content.toString()
													: '-'}
											{/if}
										</td>
									{/each}
									{#if optionsButton}
										<td>
											<button
												class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-6 h-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
													/>
												</svg>
											</button>
										</td>
									{/if}
								</tr>
							{/each}
						</tbody>
					{/if}
				</table>
				{#if status === 'loading'}
					<h2
						class="flex justify-center items-center absolute left-0 right-0 bottom-0 top-[55px]"
						in:fly={{ y: 20, duration: 150, delay: 150, easing: easeOut }}
						out:fly={{ y: 20, duration: 150, easing: easeOut }}
					>
						Loading
					</h2>
				{/if}
			</div>
		</div>
	</div>

	<div class="mt-6 sm:flex sm:items-center sm:justify-between">
		<div class="text-sm text-gray-500 dark:text-gray-400 ltr:first-letter:capitalize">
			{$LL.Table.Page()}
			<span class="font-medium text-gray-700 dark:text-gray-100"
				>{`${pageNumber} ${$LL.Table.Of()} ${allPages}`}</span
			>
		</div>

		<div class="flex items-center mt-4 gap-x-4 sm:mt-0 ltr">
			<Button
				href="#"
				as="button"
				on:click={() => (pageNumber = pageNumber - 1 > 0 ? pageNumber - 1 : pageNumber)}
				class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
				color="none"
				noGlass
				noIcon
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
					/>
				</svg>

				<span> {$LL.Table.Previous()} </span>
			</Button>

			<Button
				href="#"
				as="button"
				on:click={() => (pageNumber = pageNumber + 1 <= allPages ? pageNumber + 1 : pageNumber)}
				class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
				color="none"
				noGlass
				noIcon
			>
				<span> {$LL.Table.Next()} </span>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
					/>
				</svg>
			</Button>
		</div>
	</div>
</section>
