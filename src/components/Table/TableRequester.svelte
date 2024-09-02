<!-- NOTE -->

<!-- This is hard to read -->
<!-- You can redo this for sure later on but it works absolutely fine for now -->

<script lang="ts" generics="T">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Table from '@cp/Table/Table.svelte';
	import get_list_pagination from '@/calls/get_list_pagination';
	import type ColumnItem from '@/types/table/column_item';
	import type Sort from '@/types/table/sort';
	import type Item from '@/types/table/item';
	import type FilterItem from '@/types/table/filter_item';

	const reserved_keys = ['sort', 'search'];
	const pageDefaultValue = '1';
	const perPageDefaultValue = '5';

	let prevActiveFilterItem: FilterItem | null = null;
	let generateByUrl: boolean = true;
	let firstTimeUrlGeneration: boolean = true;

	export let url: string;
	export let name: string;
	export let addButton: string | (() => void) = '';
	export let description: string;
	export let select = false;
	export let columns: ColumnItem[] = [];
	export let tConstructor: new (data: any) => T;
	export let tTableConstructor: new (data: T) => Item;
	export let sort: Sort | null = null;
	export let text: string = '';
	export let filterItems: FilterItem[] = [];
	export let activeFilterItem: FilterItem | null = null;
	export let onFilterItemSelect: (v: FilterItem, select: boolean) => void = (
		v: FilterItem,
		select: boolean
	) => {
		prevActiveFilterItem = activeFilterItem;

		if (select) {
			activeFilterItem = v;
		} else {
			activeFilterItem = null;
		}

		if (v.key === 'sort') {
			if (select) {
				const sortColIndex = columns.findIndex(
					(item) => item.colName === v.value?.replace('-', '')
				);
				const desc = v.value?.startsWith('-');
				sort = { id: columns[sortColIndex].id, sort: desc ? 'desc' : 'asc' };
			} else sort = null;
		} else if (v.key === 'search') text = select ? v.value || '' : '';
	};

	const generateUrl = (
		_pageNumber: number,
		_perPage: number,
		_sort: Sort | null,
		_text: string,
		_activeFilterItem: FilterItem | null
	) => {
		let existingUrlQuery = new URLSearchParams($page.url.searchParams.toString());

		// ** Remove previous filter of the FilterItem and check if current and previous have the same filter and if so, replace the new with old instead of removing both
		if (prevActiveFilterItem !== null && prevActiveFilterItem.key) {
			existingUrlQuery.delete(prevActiveFilterItem.key);
			if (prevActiveFilterItem.key === 'search') {
				text = '';
				_text = '';
				if (
					_activeFilterItem &&
					prevActiveFilterItem !== _activeFilterItem &&
					prevActiveFilterItem.key === _activeFilterItem.key
				) {
					if (_activeFilterItem.key === 'search') _text = _activeFilterItem.value;
				}
			} else if (prevActiveFilterItem.key === 'sort') {
				sort = null;
				_sort = null;
				if (
					_activeFilterItem &&
					prevActiveFilterItem !== _activeFilterItem &&
					prevActiveFilterItem.key === _activeFilterItem.key
				) {
					if (_activeFilterItem.key === 'sort') {
						const desc = _activeFilterItem!.value?.startsWith('-');
						let sortColIndex = columns.findIndex(
							(v) => v.colName === _activeFilterItem!.value?.replace('-', '')
						);
						if (sortColIndex !== -1 && columns[sortColIndex].sort) {
							_sort = { id: columns[sortColIndex].id, sort: desc ? 'desc' : 'asc' };
						}
					}
				}
			}
			prevActiveFilterItem = null;
		}

		// ** Try to get page, per_page, search and sort parameters from url if `generateByUrl` is true
		if (generateByUrl && existingUrlQuery.has('page'))
			_pageNumber = parseInt(existingUrlQuery.get('page') || pageDefaultValue);
		if (generateByUrl && existingUrlQuery.has('per_page'))
			_perPage = parseInt(existingUrlQuery.get('per_page') || perPageDefaultValue);
		if (generateByUrl && existingUrlQuery.has('search'))
			_text = existingUrlQuery.get('search') || '';
		if (generateByUrl && existingUrlQuery.has('sort')) {
			_sort = null;
			const colName = existingUrlQuery.get('sort');
			const desc = colName?.startsWith('-');
			let sortColIndex = columns.findIndex((v) => v.colName === colName?.replace('-', ''));
			if (sortColIndex !== -1 && columns[sortColIndex].sort) {
				_sort = { id: columns[sortColIndex].id, sort: desc ? 'desc' : 'asc' };
			}
		}

		// ** If it is the first time generating the page (firstTimeUrlGeneration is true), take into account the autoActive filter Element in url too
		if (firstTimeUrlGeneration) {
			const filterItem = filterItems.find((v) => v.key && v.value && v.autoActive);
			if (filterItem) {
				// If filterItem is special(sort and search keys), fill _sort and _text variables too
				if (filterItem.key === 'sort' && _sort === null) {
					const sortColIndex = columns.findIndex(
						(item) => item.colName === filterItem.value?.replace('-', '')
					);
					const desc = filterItem.value?.startsWith('-');
					_sort = { id: columns[sortColIndex].id, sort: desc ? 'desc' : 'asc' };
					_activeFilterItem = filterItem;
				} else if (filterItem.key === 'search' && _text === '') {
					_text = filterItem.value || '';
					_activeFilterItem = filterItem;
				} else if (filterItem.key !== 'search' && filterItem.key !== 'sort') {
					_activeFilterItem = filterItem;
				}
			}
		}

		// ** Apply them to actual state variables of the page
		pageNumber = _pageNumber;
		perPage = _perPage;
		if (_activeFilterItem) activeFilterItem = _activeFilterItem;
		if (_text) text = _text;
		if (_sort) sort = _sort;
		prevActiveFilterItem = null;

		// ** Generate the api url
		let apiQuery = new URLSearchParams('');
		apiQuery.set('_page', _pageNumber.toString());
		apiQuery.set('_per_page', _perPage.toString());
		if (_text) apiQuery.set('_search', _text.toString());
		if (_sort)
			apiQuery.set(
				'_sort',
				`${_sort?.sort === 'desc' ? '-' : ''}${columns.find((v) => v.id === _sort?.id)?.colName}`
			);
		if (_activeFilterItem && !((_activeFilterItem.key || '') in reserved_keys))
			apiQuery.set(`${_activeFilterItem.key || ''}`, _activeFilterItem.value || '');

		// ** Generate the new browser url and update it
		const browserQuery = new URLSearchParams('');
		browserQuery.set('page', _pageNumber.toString());
		browserQuery.set('per_page', _perPage.toString());
		if (_text) browserQuery.set('search', _text.toString());
		if (_sort)
			browserQuery.set(
				'sort',
				`${_sort?.sort === 'desc' ? '-' : ''}${columns.find((v) => v.id === _sort?.id)?.colName}`
			);
		if (_activeFilterItem && !((_activeFilterItem.key || '') in reserved_keys))
			browserQuery.set(_activeFilterItem.key || '', _activeFilterItem.value || '');
		goto(`?${browserQuery.toString()}`, { keepFocus: true });

		generateByUrl = false;
		firstTimeUrlGeneration = false;
		return `${url}?${apiQuery.toString()}`;
	};

	$: {
		if ($res && $res.status === 'success') {
			if (allPages < pageNumber) pageNumber = allPages;
			if (pageNumber < 1) pageNumber = 1;
		}
	}

	let pageNumber: number = 1;
	let perPage: number = 5;

	$: internalUrl = generateUrl(pageNumber, perPage, sort, text, activeFilterItem);
	$: res = get_list_pagination<T>(internalUrl, name, tConstructor);
	$: allPages = $res && $res.status === 'success' ? $res.data?.pages || 1 : 1;
	$: items =
		$res && $res.status === 'success' && $res.data?.data
			? $res.data.data.map((v) => new tTableConstructor(v))
			: [];
</script>

<Table
	bind:pageNumber
	bind:sort
	bind:text
	status={$res ? ($res.isFetching ? 'loading' : $res.status) : 'loading'}
	count={$res && $res.data ? $res.data.items : 0}
	bind:activeFilterItem
	{filterItems}
	{onFilterItemSelect}
	{allPages}
	{addButton}
	{name}
	{description}
	{columns}
	{items}
	{select}
/>
