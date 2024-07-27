<script lang="ts">
	import { easeOut } from '@animations/easings';
	import Button from '@cp/Button.svelte';
	import Notifications from '@cp/Notifications.svelte';
	import type { ComponentType } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	interface Item {
		id: string;
		text?: string;
		href?: string;
		icon?: ComponentType;
		click?: () => void;
		lineBelow?: boolean;
	}

	interface NotifItem extends Item {
		id: string;
		imgSrc?: string;
		read?: boolean;
	}

	export let items: Item[] = [];
	export let notifItems: NotifItem[] = [];
	export let openNotifications = false;
	export let profileSrc: string = '';
	export let profile: string = '';
	export let open = false;
	export let container = false;
	export let hideNotifications: boolean = false;
	export let hideProfile: boolean = false;

	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

{#key 'header'}
	<header
		data-open={open}
		class="group sticky inset-x-0 top-0 bg-white dark:bg-gray-800 shadow-custom z-10"
		in:fly={{ y: -50, duration: 150, delay: 150, easing: easeOut }}
		out:fly={{ y: -50, duration: 150, easing: easeOut }}
	>
		<div class="px-6 py-[8px] mx-auto {container ? 'container' : ''}">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-center">
					<slot name="icon" />
				</div>

				<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
				<!-- If you want to make it go to the center, add this: lg:w-auto -->
				{#if open || width > 1024}
					<div
						in:fly={{ x: '-100%' }}
						out:fly={{ x: '-100%' }}
						class="lg:container absolute inset-x-0 top-full px-6 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lgMax:shadow"
					>
						<!-- Items -->
						<div
							class="flex flex-col justify-start -mx-6 lg:flex-row lg:items-center lg:mx-8 lg:space-x-2 lg:rtl:space-x-reverse"
						>
							{#each items as item (item.id)}
								<Button
									as={item.click ? 'button' : 'a'}
									href={item.href}
									on:click={() => {
										open = false;
										item.click && item.click();
									}}
									class="bg-white dark:bg-gray-800 !shadow-none justify-center lgMax:rounded-none lgMax:justify-start !p-3 capitalize text-sm hover:bg-gray-100 dark:hover:bg-gray-700 fill-black-700 dark:fill-white lg:!w-fit"
									color="none"
									noAnimation
									noGlass
								>
									<div class="min-w-5 min-h-5 mx-1 lg:hidden">
										<svelte:component this={item.icon} />
									</div>

									{#if item.text}
										<span class="mx-1">{item.text}</span>
									{/if}
								</Button>
								{#if item.lineBelow}
									<hr class="border-black-700 dark:border-black-200" />
								{/if}
							{/each}
						</div>
					</div>
				{/if}
				<div class="flex">
					<!-- Notifications -->
					{#if !hideNotifications}
						<Notifications
							id="notificiations"
							class="flex items-center"
							distanceMenu="50"
							bind:open={openNotifications}
							items={notifItems}
							openReverse
						>
							<Button
								class="mx-4 text-gray-600 transition-colors duration-300 transform !p-0 !size-8 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none !rounded-full !shadow-none"
								on:click={() => (openNotifications = !openNotifications)}
								color="none"
								noGlass
							>
								<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
									<path
										d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</Button>
						</Notifications>
					{/if}
					{#if !hideProfile}
						<Button
							as="a"
							type="button"
							href={profile}
							class="flex items-center focus:outline-none lgMax:hidden !rounded-full !p-0 !shadow-none"
							color="none"
							noGlass
						>
							<div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
								<img
									src={profileSrc || '/default.png'}
									class="object-cover w-full h-full"
									alt="avatar"
								/>
							</div>
						</Button>
					{/if}
					<!-- On and Off Buttons -->
					<button
						on:click={() => (open = !open)}
						type="button"
						class="lg:hidden text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
						aria-label="toggle menu"
					>
						{#if !open && items.length > 0}
							<svg
								transition:fade
								class="w-6 h-6 stroke-black-800 dark:stroke-white group-data-[open=true]:hidden"
								viewBox="0 0 24 24"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
							</svg>
						{/if}
						{#if open && items.length > 0}
							<svg
								transition:fade
								class="w-6 h-6 stroke-black-800 dark:stroke-white group-data-[open=false]:hidden"
								viewBox="0 0 24 24"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</header>
{/key}
