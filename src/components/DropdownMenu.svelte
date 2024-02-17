<script lang="ts">
	import { clickOutside } from '@utils/general';
	import Button from './Button.svelte';
	import type { ComponentType } from 'svelte';
	import scaleFade from '@/animations/scale_fade';
	import { fade, fly } from 'svelte/transition';

	interface Item {
		id: number;
		text: string;
		href: string;
		icon?: ComponentType;
		lineBelow?: boolean;
		read?: boolean;
	}

	interface ProfileInterface {
		name: string;
		description: string;
		imgSrc?: string;
		href: string;
	}

	type Profile = ProfileInterface | null;

	let className = '';
	export let openReverse = false;
	export let open = false;
	export { className as class };
	export let items: Item[] = [];
	export let profile: Profile = null;
	export let distanceMenu: string = '8';
	export let transition: 'fly' | 'scale' = 'scale';

	let openClasses = openReverse ? 'rtl:left-0 ltr:right-0' : 'ltr:left-0 rtl:right-0';
	let width = 0;

	$: transitionFnc = width < 640 ? fly : transition === 'scale' ? scaleFade : fly;
	$: params =
		width < 640
			? { duration: 500, y: '100%' }
			: transition === 'scale'
				? { duration: 100 }
				: { duration: 100, y: -10 };
</script>

<svelte:window bind:outerWidth={width} />
<div class={className}>
	<div class="relative inline-block">
		<!-- Dropdown toggle button -->
		<slot />

		<!-- Dropdown menu -->
		{#if open}
			<div
				class="fixed inset-0 bg-glass-20 z-[1000] backdrop-blur-sm sm:hidden"
				transition:fade={{ duration: 100 }}
			></div>
			<div
				use:clickOutside
				data-open-reverse={openReverse}
				transition:transitionFnc={params}
				style={`margin-top: ${distanceMenu}px`}
				on:click_outside={() => (open = false)}
				class={`sm:absolute sm:py-2 sm:w-56 sm:rounded-md fixed smMax:bottom-0 inset-x-0 z-[1000] overflow-hidden bg-white dark:bg-gray-800 shadow-custom ltr:origin-top-left rtl:origin-top-right ltr:data-[open-reverse=true]:origin-top-right rtl:data-[open-reverse=true]:origin-top-left ${openClasses}`}
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
					<!-- TODO: add read status color change -->
					<Button
						as="a"
						color="none"
						href={item.href}
						data={{ 'data-read': item.read }}
						class="group bg-white dark:bg-gray-800 !shadow-none w-full !justify-start !rounded-none !p-3 capitalize text-sm data-[read=true]:hover:bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 data-[read=true]:dark:hover:bg-gray-900"
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
		{/if}
	</div>
</div>
