<script lang="ts">
	import Button from '@cp/Button.svelte';
	import Notifications from '@cp/Notifications.svelte';
	import type { ComponentType } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Item {
		id: number;
		text?: string;
		href: string;
		icon?: ComponentType;
		lineBelow?: boolean;
	}

	interface NotifItem extends Item {
		imgSrc?: string;
		read?: boolean;
	}

	let open = false;
	export let items: Item[] = [];
	export let notifItems: NotifItem[] = [];
	export let openNotifications = false;
</script>

<nav
	data-open={open}
	class="group absolute left-0 right-0 top-0 bg-white dark:bg-gray-800 shadow-custom z-10"
>
	<div class="container px-6 py-4 mx-auto">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-between">
				<a href="#">
					<img class="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" />
				</a>
			</div>

			<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
			<!-- If you want to make it go to the center, add this: lg:w-auto -->
			<div
				class="lg:container absolute inset-x-0 top-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lgMax:group-data-[open=false]:opacity-0 lgMax:ltr:group-data-[open=false]:-translate-x-full lgMax:group-data-[open=true]:translate-x-0 lgMax:group-data-[open=true]:opacity-100 lgMax:rtl:group-data-[open=false]:translate-x-full lgMax:shadow"
			>
				<!-- Items -->
				<div
					class="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 lg:space-x-2 lg:rtl:space-x-reverse"
				>
					{#each items as item (item.id)}
						<Button
							as="a"
							color="none"
							href={item.href}
							class="bg-white dark:bg-gray-800 !shadow-none justify-center lgMax:rounded-none lgMax:justify-start !p-3 capitalize text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<div class="min-w-5 min-h-5 mx-1 lg:hidden">
								<svelte:component this={item.icon} />
							</div>

							{#if item.text}
								<span class="mx-1">{item.text}</span>
							{/if}
						</Button>
						{#if item.lineBelow}
							<hr class="border-black-50 dark:border-black-700" />
						{/if}
					{/each}
				</div>
			</div>
			<div class="flex">
				<!-- Notifications -->
				<Notifications
					class="flex items-center"
					distanceMenu="42"
					bind:open={openNotifications}
					items={notifItems}
					openReverse
				>
					<button
						data-ignore-click-outside={true}
						class="mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
						on:click={() => (openNotifications = !openNotifications)}
					>
						<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</Notifications>
				<button type="button" class="flex items-center focus:outline-none lgMax:hidden">
					<div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
						<img
							src="https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg"
							class="object-cover w-full h-full"
							alt="avatar"
						/>
					</div>
				</button>
				<!-- On and Off Buttons -->
				<button
					on:click={() => (open = !open)}
					type="button"
					class="lg:hidden text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
					aria-label="toggle menu"
				>
					{#if !open}
						<svg
							transition:fade
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 h-6 group-data-[open=true]:hidden"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
						</svg>
					{/if}
					{#if open}
						<svg
							transition:fade
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 h-6 group-data-[open=false]:hidden"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
</nav>
