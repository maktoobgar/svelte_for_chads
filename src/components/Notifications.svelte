<script lang="ts">
	import { clickOutside } from '@utils/general';
	import Button from './Button.svelte';
	import scaleFade from '@/animations/scale_fade';
	import { fly } from 'svelte/transition';
	import LL from '@i18n/i18n-svelte';

	interface Item {
		id: number;
		text?: string;
		href?: string;
		imgSrc?: string;
		lineBelow?: boolean;
		read?: boolean;
	}

	let className = '';
	export { className as class };
	export let openReverse = false;
	export let open = false;
	export let items: Item[] = [];
	export let distanceMenu: string = '8';
	export let transition: 'fly' | 'scale' = 'scale';
	export let notificationsHref: string = '';

	let width = 0;
	let openClasses = openReverse ? 'rtl:left-0 ltr:right-0' : 'ltr:left-0 rtl:right-0';

	$: transitionFnc = width < 640 ? fly : transition === 'scale' ? scaleFade : fly;
	$: params =
		width < 640
			? { duration: 400, x: '100%' }
			: transition === 'scale'
				? { duration: 100 }
				: { duration: 100, y: -20 };
</script>

<svelte:window bind:outerWidth={width} />
<div class={className}>
	<div class="relative flex items-center">
		<!-- Dropdown toggle button -->
		<slot />

		<!-- Dropdown menu -->
		{#if open}
			<div
				use:clickOutside
				transition:transitionFnc={params}
				on:click_outside={() => (open = false)}
				style={`margin-top: ${distanceMenu}px`}
				data-open={open}
				data-open-reverse={openReverse}
				class={`flex flex-col sm:absolute sm:top-0 sm:w-[300px] sm:rounded-md fixed smMax:bottom-0 smMax:inset-0 smMax:!mt-0 z-[1000] overflow-hidden bg-white dark:bg-gray-800 shadow-custom ltr:origin-top-left rtl:origin-top-right ltr:data-[open-reverse=true]:origin-top-right rtl:data-[open-reverse=true]:origin-top-left ${openClasses}`}
			>
				<div class="flex items-center justify-between my-5 mx-5 sm:hidden">
					<h3>{$LL.Notification.Notifications()}</h3>
					<button on:click={() => (open = false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<hr class="border-black-50 dark:border-black-700 border-[1px] mx-5 sm:hidden" />
				<div class="overflow-y-scroll sm:max-h-[250px]">
					{#each items as item (item.id)}
						<Button
							as="a"
							color="none"
							href={item.href}
							data={{ 'data-read': item.read }}
							class="group bg-white dark:bg-gray-800 !shadow-none w-full !justify-start !rounded-none !p-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 data-[read=true]:!bg-gray-200 data-[read=true]:hover:!bg-gray-100 data-[read=true]:dark:!bg-gray-900 data-[read=true]:dark:hover:!bg-gray-700"
						>
							<img
								class="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
								src={item.imgSrc}
								alt="avatar"
							/>
							<p class="mx-2 text-sm group-data-[read=true]:!text-gray-500">
								{@html item.text}
							</p>
						</Button>

						{#if item.lineBelow}
							<hr class="border-black-50 dark:border-black-700 mx-5" />
						{/if}
					{/each}
				</div>
				<div class="flex-grow"></div>
				<Button
					as="a"
					href={notificationsHref}
					class="py-2 mt-2 font-bold rounded-t-none w-full smMax:rounded-b-none"
					>See all notifications</Button
				>
			</div>
		{/if}
	</div>
</div>
