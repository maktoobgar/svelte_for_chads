<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let className = '';
	export { className as class };
	export let type: 'submit' | 'button' = 'button';
</script>

<button
	{type}
	class={`transition duration-150 ease-in-out rounded-lg px-3 py-2 ${className}`}
	on:click={() => dispatch('click')}><slot /></button
>
