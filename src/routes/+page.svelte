<script lang="ts">
	import Button from '@cp/Button.svelte';
	import LanguageChanger from '@cp/LanguageChanger.svelte';
	import Meta from '@cp/Meta.svelte';
	import ThemeSwitcher from '@cp/ThemeSwitcher.svelte';
	import TypeWriter from '@cp/TypeWriter.svelte';
	import LL from '@i18n/i18n-svelte';
	import Man from '@icons/Man.svelte';
	import SecondMan from '@icons/SecondMan.svelte';
	import ThirdMan from '@icons/ThirdMan.svelte';
	import { oneTime, rateClickLimiter } from '@utils/general';
	import { error, info, success } from '@utils/notifier';

	let { run, runAllowed } = oneTime(null);
	let { click } = rateClickLimiter(500);

	let where = 1;
	$: content = contents[where - 1];
	$: contents = [$LL.Chad1(), $LL.Chad2(), $LL.Chad3()];
	$: successFn = () => success($LL.Success());
	$: errorFn = () => error($LL.Error());
	$: infoFn = () => info($LL.Info());
</script>

<Meta title={$LL.NewProjectsNewTeam()} />
<div class="flex justify-center items-center relative min-h-screen overflow-hidden">
	<ThemeSwitcher class="absolute left-2 top-2" />
	<LanguageChanger class="absolute right-2 top-2" />
	<div class="absolute flex justify-between left-0 bottom-0 p-3 sm:w-[240px] w-[210px] ltr">
		<Button color="green" on:click={successFn}>{$LL.SuccessMsg()}</Button>
		<Button color="red" on:click={errorFn}>{$LL.ErrorMsg()}</Button>
		<Button color="cyan" on:click={infoFn}>{$LL.InfoMsg()}</Button>
	</div>
	<div class="relative lg:w-[512px] sm:w-[384px] w-[256px] lg:h-[512px] sm:h-[384px] h-[256px]">
		<TypeWriter
			text={content}
			duration={200}
			element="h1"
			class="absolute left-1/2 -top-20 -translate-x-1/2 w-[512px] text-center select-none ltr"
		/>
		<SecondMan
			position={where - 1}
			class={`absolute transition-all lg:w-[384px] sm:w-[256px] w-[128px] lg:h-[384px] sm:h-[256px] h-[128px] lg:data-[position=mid]:w-[512px] sm:data-[position=mid]:w-[384px] data-[position=mid]:w-[256px] lg:data-[position=mid]:h-[512px] sm:data-[position=mid]:h-[384px] data-[position=mid]:h-[256px] data-[position=left]:left-[5%] data-[position=right]:left-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 data-[position=mid]:opacity-100 fill-glass-80 data-[position=mid]:fill-primary-800 duration-500 z-0 data-[position=mid]:z-10 dark:fill-white-glass-80 dark:data-[position=mid]:fill-primary-300 data-[position=mid]:drop-shadow-3xl data-[position=mid]:animate-fade-in [&:not([data-position=mid])]:animate-fade-out${$runAllowed ? ' invisible' : ''}`}
		/>
		<Man
			position={where - 2}
			class="absolute transition-all lg:w-[384px] sm:w-[256px] w-[128px] lg:h-[384px] sm:h-[256px] h-[128px] lg:data-[position=mid]:w-[512px] sm:data-[position=mid]:w-[384px] data-[position=mid]:w-[256px] lg:data-[position=mid]:h-[512px] sm:data-[position=mid]:h-[384px] data-[position=mid]:h-[256px] data-[position=left]:left-[5%] data-[position=right]:left-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 data-[position=mid]:opacity-100 fill-glass-80 data-[position=mid]:fill-primary-800 duration-500 z-0 data-[position=mid]:z-10 dark:fill-white-glass-80 dark:data-[position=mid]:fill-primary-300 data-[position=mid]:drop-shadow-3xl data-[position=mid]:animate-fade-in [&:not([data-position=mid])]:animate-fade-out"
		/>
		<ThirdMan
			position={where - 3}
			class={`absolute transition-all lg:w-[384px] sm:w-[256px] w-[128px] lg:h-[384px] sm:h-[256px] h-[128px] lg:data-[position=mid]:w-[512px] sm:data-[position=mid]:w-[384px] data-[position=mid]:w-[256px] lg:data-[position=mid]:h-[512px] sm:data-[position=mid]:h-[384px] data-[position=mid]:h-[256px] data-[position=left]:left-[5%] data-[position=right]:left-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 data-[position=mid]:opacity-100 fill-glass-80 data-[position=mid]:fill-primary-800 duration-500 z-0 data-[position=mid]:z-10 dark:fill-white-glass-80 dark:data-[position=mid]:fill-primary-300 data-[position=mid]:drop-shadow-3xl data-[position=mid]:animate-fade-in [&:not([data-position=mid])]:animate-fade-out${$runAllowed ? ' invisible' : ''}`}
		/>
		<div
			class="lg:w-[512px] sm:w-[384px] w-[256px] absolute left-1/2 -bottom-14 -translate-x-1/2 flex justify-between ltr"
		>
			<Button
				color="green"
				class="flex justify-center items-center w-12 h-12 fill-glass-70 dark:fill-black-20"
				on:click={() =>
					click(() => {
						where = where <= 1 ? 3 : where - 1;
						run();
					})}
				><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512"
					><path
						d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"
					/></svg
				></Button
			>
			<Button
				color="green"
				class="flex justify-center items-center w-12 h-12 fill-glass-70 dark:fill-black-20"
				on:click={() =>
					click(() => {
						where = where >= 3 ? 1 : where + 1;
						run();
					})}
				><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512"
					><path
						d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
					/></svg
				></Button
			>
		</div>
	</div>
</div>
