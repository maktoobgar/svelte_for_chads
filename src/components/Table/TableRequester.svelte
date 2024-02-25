<script lang="ts" generics="T">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Table from '@cp/Table/Table.svelte';
	import get_list from '@/calls/get_list';
	import type ColumnItem from '@/types/table/column_item';
	import type Sort from '@/types/table/sort';
	import type Item from '@/types/table/item';
	import type FilterItem from '@/types/table/filter_item';

	export let url: string;
	export let name: string;
	export let addUrl: string;
	export let description: string;
	export let select = false;
	export let columns: ColumnItem[] = [];
	export let tConstructor: new (data: any) => T;
	export let tTableConstructor: new (data: T) => Item;
	export let sort: Sort | null = null;
	export let text: string = '';
	export let filterItems: FilterItem[] = [];
	export let activeFilterItem: FilterItem | null = null;
	export let onFilterItemSelect: null | ((v: FilterItem, select: boolean) => void) = (
		v: FilterItem,
		select: boolean
	) => {
		if (select) activeFilterItem = v;
		else activeFilterItem = null;
	};

	let firstGenerateUrl: boolean = true;

	const generateUrl = (
		_pageNumber: number,
		_perPage: number,
		_sort: Sort | null,
		_text: string,
		_activeFilterItem: FilterItem | null
	) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		if (firstGenerateUrl && query.has('page')) _pageNumber = parseInt(query.get('page') || '1');
		if (firstGenerateUrl && query.has('per_page'))
			_perPage = parseInt(query.get('per_page') || '5');
		if (firstGenerateUrl && query.has('search')) _text = query.get('search') || '';
		if (firstGenerateUrl) {
			const filterItem = filterItems.find((v) => v.key && v.value && query.get(v.key) === v.value);
			if (filterItem) _activeFilterItem = filterItem;
			else {
				const autoActive = filterItems.find((v) => v.autoActive);
				_activeFilterItem = autoActive ? autoActive : _activeFilterItem;
			}
		}
		if (firstGenerateUrl && query.has('sort')) {
			_sort = null;
			const colName = query.get('sort');
			const desc = colName?.startsWith('-');
			let sortColIndex = columns.findIndex((v) => v.colName === colName?.replace('-', ''));
			if (sortColIndex !== -1 && columns[sortColIndex].sort) {
				_sort = { id: columns[sortColIndex].id, sort: desc ? 'desc' : 'asc' };
			}
		}

		if (firstGenerateUrl) {
			pageNumber = _pageNumber;
			perPage = _perPage;
			if (_activeFilterItem) activeFilterItem = _activeFilterItem;
			if (_text) text = _text;
			if (_sort) sort = _sort;
		}

		query = new URLSearchParams('');
		query.set('_page', _pageNumber.toString());
		query.set('_per_page', _perPage.toString());
		if (_text) query.set('_search', _text.toString());
		if (_sort)
			query.set(
				'_sort',
				`${_sort?.sort === 'desc' ? '-' : ''}${columns.find((v) => v.id === _sort?.id)?.colName}`
			);
		if (_activeFilterItem && _activeFilterItem.key && _activeFilterItem.value)
			query.set(`${_activeFilterItem.key}`, _activeFilterItem.value);

		const queryForUrl = new URLSearchParams('');
		queryForUrl.set('page', _pageNumber.toString());
		queryForUrl.set('per_page', _perPage.toString());
		if (_text) queryForUrl.set('search', _text.toString());
		if (_sort)
			queryForUrl.set(
				'sort',
				`${_sort?.sort === 'desc' ? '-' : ''}${columns.find((v) => v.id === _sort?.id)?.colName}`
			);
		if (_activeFilterItem && _activeFilterItem.key && _activeFilterItem.value)
			queryForUrl.set(_activeFilterItem.key, _activeFilterItem.value);
		goto(`?${queryForUrl.toString()}`, { keepFocus: true });

		firstGenerateUrl = false;
		return `${url}?${query.toString()}`;
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
	$: res = get_list<T>(internalUrl, name, tConstructor);
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
	{filterItems}
	{activeFilterItem}
	{onFilterItemSelect}
	{allPages}
	{addUrl}
	{name}
	{description}
	{columns}
	{items}
	{select}
/>
