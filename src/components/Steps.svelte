<script lang="ts" context="module">
	interface Step {
		id: string;
		title: string;
	}
</script>

<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { oneTime } from '@utils/general';
	import Close from '@icons/Close.svelte';

	export let steps: Step[] = [];
	export let redSteps: boolean[] = [];
	export let currentStep: number = 1;
	export let disableMoving: boolean = true;
	export let disableSearchQuery: boolean = false;

	const { run, runAllowed } = oneTime(null);

	const updateQuery = (currentStepInternal: number) => {
		// First run
		if ($runAllowed) {
			if (disableSearchQuery) return;
			const query = $page.url.searchParams;
			if (query.has('step')) currentStep = parseInt(query.get('step') || '1') || 1;
			run();
			// Other runs
		} else {
			const query = new URLSearchParams('');
			query.set('step', currentStepInternal.toString());
			if ($page.url.searchParams.toString() === query.toString()) return;
			goto(`?${query.toString()}`, { keepFocus: true });
		}
	};

	$: !disableSearchQuery && updateQuery(currentStep);
</script>

<div>
	<h2 class="sr-only">Steps</h2>

	<ol class="flex items-center text-xs font-medium text-gray-500">
		{#each steps as step, index (step.id)}
			<li
				data-state={index + 1 < currentStep
					? 'done'
					: index + 1 === currentStep
						? 'current'
						: 'undone'}
				class="group"
			>
				<Button
					class="!py-1 !px-1 !shadow-none !rounded-lg flex items-center"
					color="none"
					on:click={() => (currentStep = disableMoving ? currentStep : index + 1)}
					rippleOff
					noGlass
				>
					<span
						class="flex items-center justify-center size-6 rounded p-1.5 {redSteps.length > index &&
						redSteps[index]
							? 'bg-red-100 text-red-600'
							: 'group-data-[state=undone]:text-gray-600 group-data-[state=undone]:bg-gray-100 group-data-[state=current]:text-blue-600 group-data-[state=current]:bg-blue-100 group-data-[state=done]:text-green-600 group-data-[state=done]:bg-green-100'}"
					>
						{#if index + 1 < currentStep}
							{#if redSteps.length > index && redSteps[index]}
								<Close class="size-3 fill-red-600" />
							{:else}
								<svg class="size-3 fill-green-600" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						{:else}
							{index + 1}
						{/if}
					</span>

					{#if index + 1 >= currentStep}
						<span
							in:slide={{ duration: 300, axis: 'x' }}
							out:slide={{ duration: 300, axis: 'x' }}
							class="{redSteps.length > index && redSteps[index]
								? 'text-red-600'
								: 'group-data-[state=current]:text-blue-600 group-data-[state=done]:text-green-600'} px-2 smMax:text-xs"
						>
							{step.title}
						</span>
					{/if}
				</Button>
			</li>
		{/each}
	</ol>
</div>
