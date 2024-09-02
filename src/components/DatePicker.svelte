<!-- * Credits to https://github.com/nargeszmn/persian-date-picker-svelte * -->

<script lang="ts">
	import {
		getMonthLength,
		getCalendarDays,
		type CalendarDay,
		type CalendarType
	} from '@/utils/date-utils';
	import { createEventDispatcher } from 'svelte';
	import { newDate, getYear, getMonth, getDate } from 'date-fns-jalali';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher<{
		/** Fires when the user selects a new value by clicking on a date or by pressing enter */
		select: Date;
	}>();

	function cloneDate(d: Date) {
		return new Date(d.getTime());
	}

	/** Date value. It's `null` if no date is selected */
	export let value: Date | null = null;
	export let calendarType: 'Jalali' | 'Gregorian' = 'Jalali';

	$: calendarConfig =
		calendarType === 'Jalali'
			? {
					weekdays: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
					months: [
						'فروردین',
						'اردیبهشت',
						'خرداد',
						'تیر',
						'مرداد',
						'شهریور',
						'مهر',
						'آبان',
						'آذر',
						'دی',
						'بهمن',
						'اسفند'
					],
					shortMonths: [
						'فرو',
						'ارد',
						'خرد',
						'تیر',
						'مرد',
						'شهر',
						'مهر',
						'آبا',
						'آذر',
						'دی',
						'بهم',
						'اسف'
					],
					weekStartsOn: 6
				}
			: {
					weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
					months: [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					],
					shortMonths: [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
					weekStartsOn: 1
				};

	function setValue(d: Date) {
		if (d.getTime() !== value?.getTime()) {
			browseDate = clamp(d, min, max);
			value = cloneDate(browseDate);
		}
	}

	function setValueDate(d: Date) {
		if (d.getTime() !== value?.getTime()) {
			browseDate = clampDate(d, min, max);
			value = cloneDate(browseDate);
		}
	}

	/** Set the browseDate */
	function browse(d: Date) {
		browseDate = clampDate(d, min, max);
		if (!browseWithoutSelecting && value) {
			setValue(browseDate);
		}
	}

	function setTime(d: Date) {
		browseDate = clamp(d, min, max);
		if (value) {
			setValue(browseDate);
		}
		return browseDate;
	}

	const todayDate = new Date();

	/** Default Date to use */
	const defaultDate = new Date();

	/** The earliest year the user can select */
	export let min =
		calendarType == 'Gregorian'
			? new Date(defaultDate.getFullYear() - 20, 0, 1)
			: newDate(getYear(defaultDate) - 20, 0, 1);
	/** The latest year the user can select */
	export let max =
		calendarType == 'Gregorian'
			? new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999)
			: newDate(
					getYear(defaultDate) + 1,
					11,
					getMonthLength(getYear(defaultDate) + 1, 11, calendarType),
					23,
					59,
					59,
					999
				);

	$: if (value && value > max) {
		setValue(max);
	} else if (value && value < min) {
		setValue(min);
	}
	function clamp(d: Date, min: Date, max: Date) {
		if (d > max) {
			return cloneDate(max);
		} else if (d < min) {
			return cloneDate(min);
		} else {
			return cloneDate(d);
		}
	}
	function clampDate(d: Date, min: Date, max: Date) {
		const limit = clamp(d, min, max);
		if (limit.getTime() !== d.getTime()) {
			d = new Date(
				limit.getFullYear(),
				limit.getMonth(),
				limit.getDate(),
				d.getHours(),
				d.getMinutes(),
				d.getSeconds(),
				d.getMilliseconds()
			);
			d = clamp(d, min, max);
		}
		return d;
	}

	/** The date shown in the popup when none is selected */
	let browseDate = value ? cloneDate(value) : cloneDate(clampDate(defaultDate, min, max));
	$: setBrowseDate(value);
	function setBrowseDate(value: Date | null) {
		if (browseDate.getTime() !== value?.getTime()) {
			browseDate = value ? cloneDate(value) : browseDate;
		}
	}

	let years = getYears(min, max, calendarType);
	$: years = getYears(min, max, calendarType);
	function getYears(min: Date, max: Date, calendarType: CalendarType) {
		let years = [];
		if (calendarType == 'Gregorian') {
			for (let i = min.getFullYear(); i <= max.getFullYear(); i++) {
				years.push(i);
			}
		} else {
			for (let i = getYear(min); i <= getYear(max); i++) {
				years.push(i);
			}
		}
		return years;
	}

	/** Wait with updating the date until a date is selected */
	export let browseWithoutSelecting = false;

	$: browseYear = calendarType == 'Gregorian' ? browseDate.getFullYear() : getYear(browseDate);
	function setYear(newYear: number) {
		const month = calendarType == 'Gregorian' ? browseDate.getMonth() : getMonth(browseDate);
		const monthMaxDate = getMonthLength(newYear, month, calendarType);
		const currentSelectedDay =
			calendarType == 'Gregorian' ? browseDate.getDate() : getDate(browseDate);
		const newDay = Math.min(currentSelectedDay, monthMaxDate);

		if (calendarType == 'Gregorian') {
			browse(
				new Date(
					newYear,
					browseDate.getMonth(),
					newDay,
					browseDate.getHours(),
					browseDate.getMinutes(),
					browseDate.getSeconds(),
					browseDate.getMilliseconds()
				)
			);
		} else {
			//newYear is in Jalali format
			//Must update the browseDate with the corresponding Gregorian Date
			browse(
				newDate(
					newYear,
					getMonth(browseDate),
					newDay,
					browseDate.getHours(),
					browseDate.getMinutes(),
					browseDate.getSeconds(),
					browseDate.getMilliseconds()
				)
			);
		}
	}

	$: browseMonth = calendarType == 'Gregorian' ? browseDate.getMonth() : getMonth(browseDate); //browseMonth must be in Jalali format
	function setMonth(newMonth: number) {
		let newYear = calendarType == 'Gregorian' ? browseDate.getFullYear() : getYear(browseDate);
		if (newMonth === 12) {
			newMonth = 0;
			newYear++;
		} else if (newMonth === -1) {
			newMonth = 11;
			newYear--;
		}

		const maxDate = getMonthLength(newYear, newMonth, calendarType);
		const currentSelectedDay =
			calendarType == 'Gregorian' ? browseDate.getDate() : getDate(browseDate);
		const newDay = Math.min(currentSelectedDay, maxDate);

		if (calendarType == 'Gregorian') {
			browse(
				new Date(
					newYear,
					newMonth,
					newDay,
					browseDate.getHours(),
					browseDate.getMinutes(),
					browseDate.getSeconds(),
					browseDate.getMilliseconds()
				)
			);
		} else {
			browse(
				newDate(
					newYear,
					newMonth,
					newDay,
					browseDate.getHours(),
					browseDate.getMinutes(),
					browseDate.getSeconds(),
					browseDate.getMilliseconds()
				)
			);
		}
	}
	function monthIsInRange(month: number) {
		if (calendarType == 'Gregorian') {
			return (
				new Date(
					browseYear,
					month,
					getMonthLength(browseYear, month, calendarType),
					23,
					59,
					59,
					999
				) < min || new Date(browseYear, month) > max
			);
		} else {
			return (
				newDate(
					browseYear,
					month,
					getMonthLength(browseYear, month, calendarType),
					23,
					59,
					59,
					999
				) < min || newDate(browseYear, month, 1) > max
			);
		}
	}

	$: calendarDays = getCalendarDays(browseDate, calendarConfig.weekStartsOn, calendarType);

	function selectDay(calendarDay: CalendarDay) {
		if (dayIsInRange(calendarDay, min, max)) {
			if (calendarType == 'Gregorian') {
				// browseDate.setFullYear(0)
				// browseDate.setMonth(0)
				// browseDate.setDate(1)
				browseDate.setFullYear(calendarDay.year);
				browseDate.setMonth(calendarDay.month);
				browseDate.setDate(calendarDay.number);
			} else {
				//calendarDay is in Jalali format
				const gregorianDate = newDate(calendarDay.year, calendarDay.month, calendarDay.number);
				// browseDate.setFullYear(0)
				// browseDate.setMonth(0)
				// browseDate.setDate(1)
				browseDate.setFullYear(gregorianDate.getFullYear());
				browseDate.setMonth(gregorianDate.getMonth());
				browseDate.setDate(gregorianDate.getDate());
			}
			setValueDate(browseDate);
			dispatch('select', cloneDate(browseDate));
		}
	}
	function dayIsInRange(calendarDay: CalendarDay, min: Date, max: Date) {
		const date =
			calendarType == 'Gregorian'
				? new Date(calendarDay.year, calendarDay.month, calendarDay.number)
				: newDate(calendarDay.year, calendarDay.month, calendarDay.number);

		const minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate());
		const maxDate = new Date(max.getFullYear(), max.getMonth(), max.getDate());
		return date >= minDate && date <= maxDate;
	}

	function isToday(calendarDay: CalendarDay) {
		if (calendarType == 'Gregorian') {
			return (
				calendarDay.year === todayDate.getFullYear() &&
				calendarDay.month === todayDate.getMonth() &&
				calendarDay.number === todayDate.getDate()
			);
		} else {
			return (
				calendarDay.year === getYear(todayDate) &&
				calendarDay.month === getMonth(todayDate) &&
				calendarDay.number === getDate(todayDate)
			);
		}
	}
	function isDaySelected(calendarDay: CalendarDay) {
		if (calendarType == 'Gregorian') {
			return (
				value &&
				calendarDay.year === value.getFullYear() &&
				calendarDay.month === value.getMonth() &&
				calendarDay.number === value.getDate()
			);
		} else {
			return (
				value &&
				calendarDay.year === getYear(value) &&
				calendarDay.month === getMonth(value) &&
				calendarDay.number === getDate(value)
			);
		}
	}
	function shiftKeydown(e: KeyboardEvent) {
		if (e.shiftKey && e.key === 'ArrowUp') {
			calendarType == 'Gregorian'
				? setYear(browseDate.getFullYear() - 1)
				: setYear(getYear(browseDate) - 1);
		} else if (e.shiftKey && e.key === 'ArrowDown') {
			calendarType == 'Gregorian'
				? setYear(browseDate.getFullYear() + 1)
				: setYear(getYear(browseDate) + 1);
		} else if (e.shiftKey && e.key === 'ArrowLeft') {
			calendarType == 'Gregorian'
				? setMonth(browseDate.getMonth() - 1)
				: setMonth(getMonth(browseDate) - 1);
		} else if (e.shiftKey && e.key === 'ArrowRight') {
			calendarType == 'Gregorian'
				? setMonth(browseDate.getMonth() + 1)
				: setMonth(getMonth(browseDate) + 1);
		} else {
			return false;
		}
		e.preventDefault();
		return true;
	}
	function yearKeydown(e: KeyboardEvent) {
		let shift = e.shiftKey || e.altKey;
		if (shift) {
			shiftKeydown(e);
			return;
		} else if (e.key === 'ArrowUp') {
			calendarType == 'Gregorian'
				? setYear(browseDate.getFullYear() - 1)
				: setYear(getYear(browseDate) - 1);
		} else if (e.key === 'ArrowDown') {
			calendarType == 'Gregorian'
				? setYear(browseDate.getFullYear() + 1)
				: setYear(getYear(browseDate) + 1);
		} else if (e.key === 'ArrowLeft') {
			calendarType == 'Gregorian'
				? setMonth(browseDate.getMonth() - 1)
				: setMonth(getMonth(browseDate) - 1);
		} else if (e.key === 'ArrowRight') {
			calendarType == 'Gregorian'
				? setMonth(browseDate.getMonth() + 1)
				: setMonth(getMonth(browseDate) + 1);
		} else {
			shiftKeydown(e);
			return;
		}
		e.preventDefault();
	}
	function monthKeydown(e: KeyboardEvent) {
		let shift = e.shiftKey || e.altKey;
		if (shift) {
			shiftKeydown(e);
			return;
		} else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			calendarType == 'Gregorian'
				? setMonth(browseDate.getMonth() - 1)
				: setMonth(getMonth(browseDate) - 1);
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			calendarType == 'Gregorian'
				? setMonth(browseDate.getMonth() + 1)
				: setMonth(getMonth(browseDate) + 1);
		} else {
			shiftKeydown(e);
			return;
		}
		e.preventDefault();
	}
	function keydown(e: KeyboardEvent) {
		let shift = e.shiftKey || e.altKey;
		if (
			(e.target as HTMLElement)?.tagName === 'SELECT' ||
			(e.target as HTMLElement)?.tagName === 'SPAN'
		) {
			// Ignore date/month <select> & TimePicker <input>
			return;
		}
		if (shift) {
			shiftKeydown(e);
			return;
		} else if (e.key === 'ArrowUp') {
			calendarType == 'Gregorian'
				? browseDate.setDate(browseDate.getDate() - 7)
				: browseDate.setDate(getDate(browseDate) - 7);
			setValueDate(browseDate);
		} else if (e.key === 'ArrowDown') {
			calendarType == 'Gregorian'
				? browseDate.setDate(browseDate.getDate() + 7)
				: browseDate.setDate(getDate(browseDate) + 7);
			setValueDate(browseDate);
		} else if (e.key === 'ArrowLeft') {
			calendarType == 'Gregorian'
				? browseDate.setDate(browseDate.getDate() - 1)
				: browseDate.setDate(getDate(browseDate) - 1);
			setValueDate(browseDate);
		} else if (e.key === 'ArrowRight') {
			calendarType == 'Gregorian'
				? browseDate.setDate(browseDate.getDate() + 1)
				: browseDate.setDate(getDate(browseDate) + 1);
			setValueDate(browseDate);
		} else if (e.key === 'Enter') {
			setValue(browseDate);
			dispatch('select', cloneDate(browseDate));
		} else {
			return;
		}
		e.preventDefault();
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="inline-block p-2 text-sm text-black border rounded shadow-sm cursor-default border-gray-300 bg-gray-200 transition-all"
	on:focusout
	tabindex="0"
	on:keydown={keydown}
>
	<div class="outline-none" tabindex="-1">
		<div class="flex items-center justify-between pb-2 ltr">
			<!-- * Go Previous Month * -->
			<Button
				type="button"
				color="none"
				class="flex items-center justify-center size-10 border border-transparent hover:bg-gray-300 hover:border-gray-300 transition-all !rounded-full bg-gray-100"
				on:click={() =>
					calendarType == 'Gregorian'
						? setMonth(browseDate.getMonth() - 1)
						: setMonth(getMonth(browseDate) + 1)}
				noAnimation
				noPadding
				noShadow
				noGlass
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="block size-4 fill-current text-gray-800 opacity-75"
				>
					<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" transform="rotate(180, 12, 12)" />
				</svg>
			</Button>
			<div class="flex space-x-2">
				<div class="relative flex">
					<select
						value={browseMonth}
						on:keydown={monthKeydown}
						on:input={(e) => setMonth(parseInt(e.currentTarget.value))}
						class="flex-grow px-2 py-2 appearance-none border-none outline-none transition-all bg-gray-100 rounded text-center"
					>
						{#each calendarConfig.months as monthName, i}
							<option disabled={monthIsInRange(i)} value={i}>{monthName} </option>
						{/each}
					</select>
				</div>
				<div class="relative flex">
					<select
						value={browseYear}
						on:input={(e) => setYear(parseInt(e.currentTarget.value))}
						on:keydown={yearKeydown}
						class="flex-grow px-2 py-2 appearance-none border-none outline-none transition-all bg-gray-100 rounded text-center"
					>
						{#each years as v}
							<option value={v}>{v}</option>
						{/each}
					</select>
				</div>
			</div>
			<!-- * Go Next Month * -->
			<Button
				type="button"
				color="none"
				class="flex items-center justify-center size-10 border border-transparent hover:bg-gray-300 hover:border-gray-300 transition-all !rounded-full bg-gray-100"
				on:click={() =>
					calendarType == 'Gregorian'
						? setMonth(browseDate.getMonth() + 1)
						: setMonth(getMonth(browseDate) - 1)}
				noAnimation
				noPadding
				noShadow
				noGlass
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="block size-4 fill-current text-gray-800 opacity-75"
				>
					<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
				</svg>
			</Button>
		</div>
		<div class="flex py-2">
			{#each Array(7) as _, i}
				{#if i + calendarConfig.weekStartsOn < 7}
					<div class="flex-grow text-center w-[1.875rem]">
						{calendarConfig.weekdays[calendarConfig.weekStartsOn + i]}
					</div>
				{:else}
					<div class="flex-grow text-center w-[1.875rem]">
						{calendarConfig.weekdays[calendarConfig.weekStartsOn + i - 7]}
					</div>
				{/if}
			{/each}
		</div>
		{#each Array(6) as _, weekIndex}
			<div class="flex space-x-2 space-y-2 rtl:space-x-reverse">
				{#each calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7) as calendarDay}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<Button
						color="none"
						disabled={!dayIsInRange(calendarDay, min, max)}
						class="first-of-type:mt-2 flex items-center justify-center size-10 flex-grow border rounded border-transparent cursor-pointer transition-all disabled:opacity-20 disabled:bg-transparent disabled:line-through
						{calendarDay.month !== browseMonth ? 'opacity-40' : ''} {isDaySelected(calendarDay)
							? 'font-semibold bg-primary-200 hover:bg-primary-300 border-2 border-primary-500 text-black'
							: isToday(calendarDay)
								? 'font-semibold bg-secondary-100 hover:bg-secondary-300'
								: '!font-normal bg-gray-100 hover:bg-gray-300'}"
						on:click={() => selectDay(calendarDay)}
						noAnimation
						noPadding
						noShadow
						noGlass
					>
						<span>
							{calendarDay.number}
						</span>
					</Button>
				{/each}
			</div>
		{/each}

		<slot />
	</div>
</div>
