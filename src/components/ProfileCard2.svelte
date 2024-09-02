<script lang="ts">
	export let picture: string = '/gigachads/gigachad.jpg';
	export let titleOne: string = 'Developer';
	export let titleTwo: string = 'Name';
	export let href: string = '#';
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a
	{href}
	class="w-[300px] h-[500px] md:w-[400px] lg:w-[500px] rounded-lg group relative block bg-primary-900 dark:bg-primary-100 overflow-hidden"
>
	<img
		alt=""
		src={picture}
		class="absolute inset-0 h-full w-full rounded-lg object-cover opacity-85 transition-opacity group-hover:opacity-60"
	/>

	<div class="relative flex flex-col p-4 sm:p-6 lg:p-8 h-full w-full">
		<p class="text-sm font-medium uppercase tracking-widest text-secondary-600">{titleOne}</p>

		<p class="text-xl font-bold text-gray-100 sm:text-2xl">{titleTwo}</p>
		<div class="flex-grow"></div>
		<div class="mb-2">
			<div
				class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
			>
				<p class="text-sm text-white line-clamp-5">
					<slot />
				</p>
			</div>
		</div>
	</div>
</a>
