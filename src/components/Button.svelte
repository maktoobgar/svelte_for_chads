<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ripple } from 'svelte-ripple-action';

	const dispatch = createEventDispatcher();

	let className = '';
	export { className as class };
	export let type: 'submit' | 'button' = 'button';
	export let color: 'green' | 'red' | 'cyan' | 'primary' | 'secondary' = 'primary';

	$: colorClasses =
		color === 'green'
			? 'bg-green-300 dark:bg-green-900 '
			: color === 'red'
				? 'bg-red-300 dark:bg-red-900'
				: color === 'cyan'
					? 'bg-cyan-300 dark:bg-cyan-900'
					: color === 'secondary'
						? 'bg-secondary-300 dark:bg-secondary-900'
						: 'bg-primary-300 dark:bg-primary-900';
</script>

<button
	{type}
	class={`rounded-lg px-3 py-2 ${colorClasses}${className ? ' ' + className : ''}`}
	on:click={() => dispatch('click')}
	use:ripple><slot /></button
>
