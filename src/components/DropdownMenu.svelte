<script lang="ts">
	import { clickOutside } from '@utils/general';
	import Button from './Button.svelte';
	import type { ComponentType } from 'svelte';

	interface Item {
		id: number;
		text: string;
		href: string;
		icon?: ComponentType;
		lineBelow?: boolean;
	}

	interface ProfileInterface {
		name: string;
		description: string;
		imgSrc?: string;
		href: string;
	}

	type Profile = ProfileInterface | null;

	export let open = false;
	let className = '';
	export { className as class };
	export let items: Item[] = [];
	export let profile: Profile = null;
	export let buttonClass = '';
	export let buttomColor: 'green' | 'red' | 'cyan' | 'primary' | 'secondary' | 'none' | '' = 'none';
	export let distanceMenu: string = '8px';
</script>

<div class={className}>
	<div class="relative inline-block">
		<!-- Dropdown toggle button -->
		<Button
			data={{ 'data-ignore-click-outside': true }}
			on:click={() => (open = !open)}
			class={`group bg-white dark:bg-gray-800 ${buttonClass}`}
			color={buttomColor}
		>
			<slot />
		</Button>

		<!-- Dropdown menu -->
		<div
			use:clickOutside
			hidden={!open}
			on:click_outside={() => (open = false)}
			class="absolute ltr:left-0 rtl:right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-custom dark:bg-gray-800"
		>
			{#if profile}
				<Button
					as="a"
					color="none"
					href={profile.href}
					class="bg-white dark:bg-gray-800 !shadow-none w-full !justify-start !rounded-none !p-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					{#if profile.imgSrc}
						<img
							class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
							src={profile.imgSrc}
							alt="avatar"
						/>
					{/if}
					<div class="mx-1">
						<h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200 capitalize">
							{profile.name}
						</h1>
						<p class="text-sm text-gray-500 dark:text-gray-400">
							{profile.description}
						</p>
					</div>
				</Button>
				<hr class="border-gray-200 dark:border-gray-700" />
			{/if}

			{#each items as item (item.id)}
				<Button
					as="a"
					color="none"
					href={item.href}
					class="bg-white dark:bg-gray-800 !shadow-none w-full !justify-start !rounded-none !p-3 capitalize text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<div class="w-5 h-5 mx-1">
						<svelte:component this={item.icon} />
					</div>

					<span class="mx-1">{item.text}</span>
				</Button>

				{#if item.lineBelow}
					<hr class="border-gray-200 dark:border-gray-700" />
				{/if}
			{/each}
		</div>
	</div>
</div>
