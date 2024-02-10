<script lang="ts">
	export let picture: string =
		'https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg';
	export let title: string = 'This is a title';
	export let author: string = 'By Author';
	export let exOne: string = 'Published';
	export let exOneTime: string = '12st June, 2020';
	export let exTwo: string = 'Reading time';
	export let exTwoTime: string = '3 minute';
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a
	href="#"
	class="bg-background-reverse max-w-[30rem] relative block overflow-hidden rounded-lg border border-black-40 dark:border-gray-800 transition-[box-shadow] hover:shadow-lg p-4 sm:p-6 lg:p-8"
>
	<span
		class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-secondary-500 via-primary-50 to-primary-500"
	></span>

	<div class="sm:flex sm:justify-between sm:gap-4">
		<div>
			<h3 class="text-lg font-bold !text-secondary-400 sm:text-xl">
				{title}
			</h3>

			<p class="mt-1 text-xs font-medium !text-primary-400">{author}</p>
		</div>

		<div class="hidden sm:block sm:shrink-0">
			<img alt="Paul Clapton" src={picture} class="h-16 w-16 rounded-lg object-cover shadow-sm" />
		</div>
	</div>

	<div class="mt-4">
		<p class="text-pretty text-sm">
			<slot />
		</p>
	</div>

	<dl class="mt-6 flex gap-4 sm:gap-6">
		<div class="flex flex-col-reverse">
			<dt class="text-sm font-medium">{exOne}</dt>
			<dd class="text-xs">{exOneTime}</dd>
		</div>

		<div class="flex flex-col-reverse">
			<dt class="text-sm font-medium">{exTwo}</dt>
			<dd class="text-xs">{exTwoTime}</dd>
		</div>
	</dl>
</a>
