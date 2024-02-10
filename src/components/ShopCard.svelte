<script lang="ts">
	import language from '@stores/i18n';
	export let picture: string =
		'https://www.thespruceeats.com/thmb/GqFnT-HurnFcC3DWQKK6fTlTcZQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/murg-malai-kabab-1957372-Hero_01-bb66c49fd80e4b95b26a6fdd68bd7a7d.jpg';
	export let priceOne: string = 'Price';
	export let priceTwo: string = '400,000';
	export let itemName: string = 'Food Name';
	export let itemOneTitle: string = 'Reserved';
	export let itemOneText: string = '2 tables';
	export let itemTwoTitle: string = 'Dessert';
	export let itemTwoText: string = '4 foods';
	export let itemThreeTitle: string = 'Drink';
	export let itemThreeText: string = '4 sodas';
</script>

<div class="flex justify-center items-center m-10">
	<a href="#" class="w-[400px] block rounded-lg p-4 shadow-sm shadow-indigo-100">
		<img alt="Home" src={picture} class="h-56 w-full rounded-md object-cover" />

		<div class="mt-2">
			<dl>
				<div>
					<dt class="sr-only">{priceOne}</dt>

					<dd class="text-sm">{$language === 'fa' ? priceTwo + ' ﷼' : priceTwo + ' $'}</dd>
				</div>

				<div>
					<dt class="sr-only">{itemName}</dt>

					<dd class="font-medium">
						<slot />
					</dd>
				</div>
			</dl>

			<div class="mt-6 flex items-center gap-8 text-xs">
				<div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
					<svg
						class="h-4 w-4 stroke-primary-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
						/>
					</svg>

					<div class="mt-1.5 sm:mt-0">
						<p class="!text-secondary-400">{itemOneTitle}</p>

						<p class="font-medium">{itemOneText}</p>
					</div>
				</div>

				<div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
					<svg
						class="h-4 w-4 stroke-primary-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>

					<div class="mt-1.5 sm:mt-0">
						<p class="!text-secondary-400">{itemTwoTitle}</p>

						<p class="font-medium">{itemTwoText}</p>
					</div>
				</div>

				<div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
					<svg
						class="h-4 w-4 stroke-primary-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>

					<div class="mt-1.5 sm:mt-0">
						<p class="!text-secondary-400">{itemThreeTitle}</p>

						<p class="font-medium">{itemThreeText}</p>
					</div>
				</div>
			</div>
		</div>
	</a>
</div>
