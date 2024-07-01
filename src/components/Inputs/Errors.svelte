<script lang="ts">
	import { slide } from 'svelte/transition';
	import { easeOut } from '@animations/easings';
	import { type ErrorType } from '@/types/responses/error_response';

	export let errors: ErrorType;
	export let name: string;

	export const deleteError = () => {
		if (errors && typeof errors !== 'string' && name in errors) {
			delete errors[name];
			errors = { ...errors };
		}
	};
</script>

{#if errors && typeof errors !== 'string' && name in errors}
	<div class="flex flex-col pt-1">
		{#each errors[name] as error, index (index)}
			<p
				transition:slide|global={{ easing: easeOut, duration: 200, delay: index * 100 }}
				class="!text-red-500 dark:!text-red-300 pt-1"
			>
				{error}
			</p>
		{/each}
	</div>
{/if}
