<script lang="ts">
	import Button from '@cp/Button.svelte';
	import Dialog from '@cp/Dialog.svelte';
	import DropdownMenu from '@cp/DropdownMenu.svelte';
	import Input from '@cp/Inputs/Input.svelte';
	import LanguageChanger from '@cp/LanguageChanger.svelte';
	import Meta from '@cp/Meta.svelte';
	import ProfileCard from '@cp/ProfileCard.svelte';
	import ProfileCard2 from '@cp/ProfileCard2.svelte';
	import ShopCard from '@cp/ShopCard.svelte';
	import ThemeSwitcher from '@cp/ThemeSwitcher.svelte';
	import TypeWriter from '@cp/TypeWriter.svelte';
	import LL from '@i18n/i18n-svelte';
	import Man from '@icons/Man.svelte';
	import SecondMan from '@icons/SecondMan.svelte';
	import ThirdMan from '@icons/ThirdMan.svelte';
	import ViewProfile from '@icons/ViewProfile.svelte';
	import Settings from '@icons/Settings.svelte';
	import Team from '@icons/Team.svelte';
	import InviteColleagues from '@icons/InviteColleagues.svelte';
	import Help from '@icons/Help.svelte';
	import SignOut from '@icons/SignOut.svelte';
	import { oneTime, rateClickLimiter } from '@utils/general';
	import { error, info, success } from '@utils/notifier';
	import Header from '@Layouts/Header.svelte';
	import MultiSelect from '@cp/Inputs/MultiSelect.svelte';
	import TableRequester from '@cp/Table/TableRequester.svelte';
	import User from '@/types/user';
	import UserTable from '@/types/user_table';
	import RadioGroup from '@cp/Inputs/RadioGroup.svelte';
	import Tooltip from '@cp/Tooltip.svelte';

	let dialog: Dialog;

	let { run, runAllowed } = oneTime(null);
	let { click } = rateClickLimiter(500);

	let where = 1;
	$: content = contents[where - 1];
	$: contents = [$LL.Chad1(), $LL.Chad2(), $LL.Chad3()];
	$: successFn = () => success($LL.Success());
	$: errorFn = () => error($LL.Error());
	$: infoFn = () => info($LL.Info());

	let username = '';
	let password = '';

	let open = false;
	let new_open = false;

	let openNotifications = false;
</script>

<Meta title={$LL.NewProjectsNewTeam()} />
<div class="snap-y snap-mandatory h-screen overflow-scroll scroll-none">
	<div class="relative flex justify-center items-center min-h-screen overflow-hidden snap-start">
		<ThemeSwitcher class="absolute left-2 top-2" />
		<LanguageChanger class="absolute right-2 top-2" />
		<div
			class="absolute flex flex-col justify-between left-0 bottom-0 p-3 sm:h-[200px] h-[160px] ltr"
		>
			<Button color="green" on:click={successFn}>{$LL.SuccessMsg()}</Button>
			<Button color="red" on:click={errorFn}>{$LL.ErrorMsg()}</Button>
			<Button color="cyan" on:click={infoFn}>{$LL.InfoMsg()}</Button>
		</div>
		<Dialog
			isForm={true}
			contentClass="w-[300px] sm:w-[350px] h-[400px] sm:h-[450px] flex flex-col justify-between"
			submit={() => {
				dialog.close();
				username && success($LL.LoggedIn({ username }));
			}}
			bind:this={dialog}
		>
			<div class="flex flex-col space-y-3">
				<h2 class="py-2">{$LL.LogIn()}</h2>
				<Input
					id="username"
					bind:value={username}
					placeholder={$LL.UsernameExample()}
					label={$LL.Username()}
				/>
				<Input
					id="password"
					bind:value={password}
					type="password"
					placeholder="****"
					label={$LL.Password()}
				/>
			</div>
			<div class="flex gap-4">
				<Button
					color="primary"
					class="flex-grow"
					on:click={() => {
						dialog.close();
					}}>{$LL.Cancel()}</Button
				>
				<Button color="green" class="flex-grow" type="submit">{$LL.Submit()}</Button>
			</div>
		</Dialog>
		<div class="absolute right-0 bottom-0 p-3">
			<Button on:click={() => dialog.open()}>{$LL.ShowPopup()}</Button>
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
				class={`absolute transition-all lg:w-[384px] sm:w-[256px] w-[128px] lg:h-[384px] sm:h-[256px] h-[128px] lg:data-[position=mid]:w-[512px] sm:data-[position=mid]:w-[384px] data-[position=mid]:w-[256px] lg:data-[position=mid]:h-[512px] sm:data-[position=mid]:h-[384px] data-[position=mid]:h-[256px] data-[position=left]:left-[5%] data-[position=right]:left-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 data-[position=mid]:opacity-100 fill-glass-80 data-[position=mid]:fill-primary-800 duration-500 z-0 data-[position=mid]:z-[1] dark:fill-white-glass-80 dark:data-[position=mid]:fill-primary-300 data-[position=mid]:drop-shadow-3xl data-[position=mid]:animate-fade-in [&:not([data-position=mid])]:animate-fade-out${$runAllowed ? ' invisible' : ''}`}
			/>
			<Man
				position={where - 2}
				class="absolute transition-all lg:w-[384px] sm:w-[256px] w-[128px] lg:h-[384px] sm:h-[256px] h-[128px] lg:data-[position=mid]:w-[512px] sm:data-[position=mid]:w-[384px] data-[position=mid]:w-[256px] lg:data-[position=mid]:h-[512px] sm:data-[position=mid]:h-[384px] data-[position=mid]:h-[256px] data-[position=left]:left-[5%] data-[position=right]:left-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 data-[position=mid]:opacity-100 fill-glass-80 data-[position=mid]:fill-primary-800 duration-500 z-0 data-[position=mid]:z-[1] dark:fill-white-glass-80 dark:data-[position=mid]:fill-primary-300 data-[position=mid]:drop-shadow-3xl data-[position=mid]:animate-fade-in [&:not([data-position=mid])]:animate-fade-out"
			/>
			<ThirdMan
				position={where - 3}
				class={`absolute transition-all lg:w-[384px] sm:w-[256px] w-[128px] lg:h-[384px] sm:h-[256px] h-[128px] lg:data-[position=mid]:w-[512px] sm:data-[position=mid]:w-[384px] data-[position=mid]:w-[256px] lg:data-[position=mid]:h-[512px] sm:data-[position=mid]:h-[384px] data-[position=mid]:h-[256px] data-[position=left]:left-[5%] data-[position=right]:left-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 data-[position=mid]:opacity-100 fill-glass-80 data-[position=mid]:fill-primary-800 duration-500 z-0 data-[position=mid]:z-[1] dark:fill-white-glass-80 dark:data-[position=mid]:fill-primary-300 data-[position=mid]:drop-shadow-3xl data-[position=mid]:animate-fade-in [&:not([data-position=mid])]:animate-fade-out${$runAllowed ? ' invisible' : ''}`}
			/>
			<div
				class="lg:w-[512px] sm:w-[384px] w-[256px] absolute left-1/2 -bottom-14 -translate-x-1/2 flex justify-between ltr"
			>
				<Button
					class="flex justify-center items-center w-[60px] h-[50px] fill-glass-70 dark:fill-black-20"
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
					class="flex justify-center items-center w-[60px] h-[50px] fill-glass-70 dark:fill-black-20"
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

	<div class="flex h-screen justify-around items-center bg-background-reverse snap-start">
		<ProfileCard2 titleOne={$LL.Card2TitleOne()} titleTwo={$LL.Card2TitleTwo()}>
			{$LL.Card2Description()}
		</ProfileCard2>
	</div>

	<div class="flex flex-col lg:flex-row h-screen justify-around items-center snap-start">
		<ProfileCard
			title={$LL.Card1Title()}
			author={$LL.Card1Author()}
			exOne={$LL.Card1ExOne()}
			exOneTime={$LL.Card1ExOneTime()}
			exTwo={$LL.Card1ExTwo()}
			exTwoTime={$LL.Card1ExTwoTime()}>{$LL.Card1Description()}</ProfileCard
		>

		<ShopCard
			priceOne={$LL.ShopCardPriceOne()}
			priceTwo={$LL.ShopCardPriceTwo()}
			itemName={$LL.ShopCardItemName()}
			itemOneTitle={$LL.ShopCardItemOneTitle()}
			itemOneText={$LL.ShopCardItemOneText()}
			itemTwoTitle={$LL.ShopCardItemTwoTitle()}
			itemTwoText={$LL.ShopCardItemTwoText()}
			itemThreeTitle={$LL.ShopCardItemThreeTitle()}
			itemThreeText={$LL.ShopCardItemThreeText()}>{$LL.ShopCardDescription()}</ShopCard
		>
	</div>

	<div
		class="flex flex-col lg:flex-row h-screen justify-around items-center bg-background-reverse snap-start relative"
	>
		<Header
			bind:openNotifications
			items={[
				{ id: 0, text: $LL.DropDown.ViewProfile(), href: '#', icon: ViewProfile },
				{ id: 1, text: $LL.DropDown.Settings(), href: '#', icon: Settings, lineBelow: true },
				{ id: 2, text: $LL.DropDown.Team(), href: '#', icon: Team },
				{ id: 3, text: $LL.DropDown.InviteColleagues(), href: '#', icon: InviteColleagues },
				{ id: 4, text: $LL.DropDown.Help(), href: '#', icon: Help, lineBelow: true },
				{ id: 5, text: $LL.DropDown.SignOut(), href: '#', icon: SignOut }
			]}
			notifItems={[
				{
					id: 0,
					text: $LL.Notification.RepliedOn({
						someone: 'James Charles',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourImage()}</span>`,
						ago: '5' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
					read: true
				},
				{
					id: 1,
					text: $LL.Notification.LikedOn({
						someone: 'John Jason',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourPost()}</span>`,
						ago: '2' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc: 'https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg',
					read: true
				},
				{
					id: 2,
					text: $LL.Notification.Followed({
						someone: 'Kevin Stacy',
						ago: '3' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
				},
				{
					id: 3,
					text: $LL.Notification.Followed({
						someone: 'Jasmin Just',
						ago: '12' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80'
				},
				{
					id: 4,
					text: $LL.Notification.RepliedOn({
						someone: 'James Charles',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourImage()}</span>`,
						ago: '5' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
					read: true
				},
				{
					id: 5,
					text: $LL.Notification.LikedOn({
						someone: 'John Jason',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourPost()}</span>`,
						ago: '2' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc: 'https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg',
					read: true
				},
				{
					id: 6,
					text: $LL.Notification.Followed({
						someone: 'Kevin Stacy',
						ago: '3' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
				},
				{
					id: 7,
					text: $LL.Notification.Followed({
						someone: 'Jasmin Just',
						ago: '12' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80'
				},
				{
					id: 8,
					text: $LL.Notification.RepliedOn({
						someone: 'James Charles',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourImage()}</span>`,
						ago: '5' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
					read: true
				},
				{
					id: 9,
					text: $LL.Notification.LikedOn({
						someone: 'John Jason',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourPost()}</span>`,
						ago: '2' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc: 'https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg',
					read: true
				},
				{
					id: 10,
					text: $LL.Notification.Followed({
						someone: 'Kevin Stacy',
						ago: '3' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
				},
				{
					id: 11,
					text: $LL.Notification.Followed({
						someone: 'Jasmin Just',
						ago: '12' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80'
				},
				{
					id: 12,
					text: $LL.Notification.RepliedOn({
						someone: 'James Charles',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourImage()}</span>`,
						ago: '5' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
					read: true
				},
				{
					id: 13,
					text: $LL.Notification.LikedOn({
						someone: 'John Jason',
						what: `<span class="!text-blue-500 group-data-[read=true]:!text-blue-400 hover:underline" href=${'#'}>${$LL.Notification.YourPost()}</span>`,
						ago: '2' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc: 'https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg',
					read: true
				},
				{
					id: 14,
					text: $LL.Notification.Followed({
						someone: 'Kevin Stacy',
						ago: '3' + $LL.Notification.Hour()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
				},
				{
					id: 15,
					text: $LL.Notification.Followed({
						someone: 'Jasmin Just',
						ago: '12' + $LL.Notification.Min()
					}),
					href: '#',
					imgSrc:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80'
				}
			]}
			><svelte:fragment slot="icon">
				<h3 class="font-vibur">
					<a href="/" class="dark:!text-primary-100 !text-primary-500">SvelteChad</a>
				</h3>
			</svelte:fragment></Header
		>
		<div class="h-full w-full container lg:pt-[76px] sm:pt-[60px] pt-[53px]">
			<div class="h-full relative px-5 pt-5">
				<DropdownMenu
					id="0"
					bind:open
					transition="scale"
					class="pb-3"
					profile={{
						name: $LL.DropDown.Name(),
						description: $LL.DropDown.Description(),
						href: '#',
						imgSrc: 'https://i.pinimg.com/originals/25/bd/8b/25bd8b7f6e57cdfd17747b25d753b2ce.jpg'
					}}
					items={[
						{ id: 0, text: $LL.DropDown.ViewProfile(), href: '#', icon: ViewProfile },
						{ id: 1, text: $LL.DropDown.Settings(), href: '#', icon: Settings, lineBelow: true },
						{ id: 2, text: $LL.DropDown.Team(), href: '#', icon: Team },
						{ id: 3, text: $LL.DropDown.InviteColleagues(), href: '#', icon: InviteColleagues },
						{ id: 4, text: $LL.DropDown.Help(), href: '#', icon: Help, lineBelow: true },
						{ id: 5, text: $LL.DropDown.SignOut(), href: '#', icon: SignOut }
					]}
				>
					<Button
						on:click={() => (open = !open)}
						data={{ 'data-ignore-click-outside': 0 }}
						class="group bg-white dark:bg-gray-800 !shadow-lg"
						color="none"
						><span class="mx-1">{$LL.DropDown.Name()}</span>
						<svg
							data-open={open}
							class="w-5 h-5 mx-1 data-[open=true]:rotate-180"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
								fill="currentColor"
							></path>
						</svg></Button
					>
				</DropdownMenu>
				<MultiSelect
					id="1"
					label={$LL.MultiSelect.Label()}
					placeholder={$LL.MultiSelect.AddItem()}
					options={[
						{ id: 0, content: $LL.MultiSelect.FirstItem(), value: 'Whatever' },
						{ id: 1, content: $LL.MultiSelect.SecondItem(), value: 'Whatever' },
						{ id: 2, content: $LL.MultiSelect.ThirdItem(), value: 'Whatever' },
						{ id: 3, content: $LL.MultiSelect.ForthItem(), value: 'Whatever' },
						{ id: 4, content: $LL.MultiSelect.FifthItem(), value: 'Whatever' },
						{ id: 5, content: $LL.MultiSelect.SixthItem(), value: 'Whatever' }
					]}
					limit={2}
				/>
			</div>
		</div>
	</div>

	<div class="flex h-screen justify-around items-center bg-background snap-start p-3">
		<TableRequester
			url="/users"
			addButton={'#'}
			name={$LL.Table.Users()}
			description={$LL.Table.Description()}
			tConstructor={User}
			tTableConstructor={UserTable}
			columns={[
				{
					id: 0,
					name: $LL.Table.Columns.Name(),
					colName: 'profile',
					type: 'profile',
					sort: false
				},
				{
					id: 1,
					name: $LL.Table.Columns.Description(),
					colName: 'description',
					type: '',
					sort: true
				},
				{
					id: 2,
					name: $LL.Table.Columns.CreatedAt(),
					colName: 'created_at',
					type: 'date',
					sort: true
				},
				{
					id: 3,
					name: $LL.Table.Columns.UpdatedAt(),
					colName: 'updated_at',
					type: 'date',
					sort: true
				}
			]}
			filterItems={[
				{ id: 0, title: $LL.Table.ViewAll(), autoActive: true },
				{ id: 1, title: $LL.Table.Approved(), key: 'approved', value: 'true' }
			]}
		/>
	</div>

	<div
		class="flex flex-col h-screen justify-center items-center bg-background-reverse snap-start relative"
	>
		<div>
			<Tooltip text={$LL.Tooltip()}>
				<div
					class="mx-[12px] text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
						/>
					</svg>
				</div>
			</Tooltip>
			<RadioGroup
				items={[
					{
						id: '0',
						title: $LL.RadioButton.Demo[0].Title(),
						description: $LL.RadioButton.Demo[0].Description(),
						value: null
					},
					{
						id: '1',
						title: $LL.RadioButton.Demo[1].Title(),
						description: $LL.RadioButton.Demo[1].Description(),
						value: null
					},
					{
						id: '2',
						title: $LL.RadioButton.Demo[2].Title(),
						description: $LL.RadioButton.Demo[2].Description(),
						value: null
					},
					{
						id: '3',
						title: $LL.RadioButton.Demo[3].Title(),
						description: $LL.RadioButton.Demo[3].Description(),
						value: null
					}
				]}
				class="max-w-[500px] w-full px-3"
				label={$LL.RadioButton.Question()}
				name="survey"
				color="blue"
			/>
		</div>
	</div>
</div>
