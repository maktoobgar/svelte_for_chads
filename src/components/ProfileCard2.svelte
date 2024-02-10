<script lang="ts">
	export let picture: string =
		'https://s0.smartresize.com/wallpaper/233/587/HD-wallpaper-giga-chad-hair-memes.jpg';
	export let titleOne: string = 'Developer';
	export let titleTwo: string = 'Name';
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" class="w-[600px] rounded-lg group relative block bg-primary-900 overflow-hidden">
	<img
		alt="Title One"
		src={picture}
		class="absolute inset-0 h-full w-full rounded-lg object-cover opacity-75 transition-opacity group-hover:opacity-50"
	/>

	<div class="relative p-4 sm:p-6 lg:p-8">
		<p class="text-sm font-medium uppercase tracking-widest !text-secondary-400">{titleOne}</p>

		<p class="text-xl font-bold text-white sm:text-2xl">{titleTwo}</p>

		<div class="mt-32 sm:mt-48 lg:mt-64">
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
