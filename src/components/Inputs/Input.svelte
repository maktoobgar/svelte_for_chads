<script lang="ts">
	import type { ErrorType } from '@/types/responses/error_response';
	import { uidGenerator } from '@utils/general';
	import { tick } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import Errors from './Errors.svelte';

	let deleteError: () => void;

	let _this: HTMLInputElement | HTMLTextAreaElement | undefined = undefined;
	let className = '';
	export let id: string = uidGenerator();
	export let name: string = '';
	export let label = '';
	export let value: any = '';
	export let placeholder = '';
	export let type: HTMLInputTypeAttribute | 'textarea' = 'text';
	export let inputClass = '';
	export let labelClass = '';
	export let groupId = '';
	export let autoFocus = false;
	export let errors: ErrorType = {};
	export let disabled: boolean = false;
	export let hint: string = '';
	export { className as class };
	export { _this as this };

	const autoFocusFunc = async () => {
		await tick();
		if (autoFocus) _this!.focus();
	};

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	const commonClassName = `w-full outline-none px-4 rounded-2xl bg-black-20 focus:bg-pure-white disabled:bg-gray-200 dark:bg-primary-700 dark:focus:bg-primary-600 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 dark:text-white sm:text-base transition-none font-normal shadow-md`;
</script>

<svelte:window on:load={autoFocusFunc} />

<div class={`${className}`}>
	{#if label}
		<label for={id} class={`block cursor-pointer text-base font-medium pb-1 ${labelClass}`}
			>{@html label}</label
		>
	{/if}

	{#if !!hint && type === 'textarea'}
		<p class="text-sm text-gray-400 pb-1">{hint}</p>
	{/if}

	{#if type === 'textarea'}
		<textarea
			{id}
			{name}
			{placeholder}
			bind:value
			bind:this={_this}
			on:input={deleteError}
			{disabled}
			class={`py-4 ${commonClassName} ${inputClass}`}
		/>
	{:else if type !== 'checkbox' && type !== 'radio'}
		<input
			use:typeAction
			{id}
			{name}
			{placeholder}
			bind:value
			bind:this={_this}
			on:input={deleteError}
			{disabled}
			class={`h-[58px] ${commonClassName} ${inputClass}`}
		/>
	{:else if type === 'checkbox'}
		<input
			type="checkbox"
			{id}
			{name}
			{placeholder}
			bind:checked={value}
			bind:this={_this}
			on:input={deleteError}
			{disabled}
			class={`${commonClassName} ${inputClass}`}
		/>
	{:else if type === 'radio'}
		<input
			type="radio"
			{id}
			{placeholder}
			name={groupId}
			bind:value
			bind:this={_this}
			on:input={deleteError}
			{disabled}
			class={`${commonClassName} ${inputClass}`}
		/>
	{/if}

	{#if !!hint && type !== 'textarea'}
		<p class="text-sm text-gray-400 pt-1">{hint}</p>
	{/if}

	<Errors bind:deleteError bind:errors {name} />
</div>
