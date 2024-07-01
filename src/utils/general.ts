import type { Language } from '@stores/i18n';
import type customObject from '@/types/general/my_object';
import { writable } from 'svelte/store';

export const oneTime = (run: Function | null) => {
	let runAllowedWritable = writable(true);
	let runAllowed = true;
	runAllowedWritable.subscribe((v) => (runAllowed = v));

	const _run = () => {
		if (runAllowed) {
			runAllowedWritable.set(false);
			run && run();
		}
	};

	return { runAllowed: runAllowedWritable, run: _run };
};

// `every` unit is milisecond
export const rateClickLimiter = (every: number) => {
	let clickAllowedWritable = writable(true);
	let clickAllowed = true;
	clickAllowedWritable.subscribe((v) => (clickAllowed = v));

	const click = (runIfAllowed: Function) => {
		if (clickAllowed) {
			clickAllowedWritable.set(false);
			runIfAllowed();
			setTimeout(() => clickAllowedWritable.set(true), every);
			return true;
		}
		return false;
	};

	return { click, clickAllowed: clickAllowedWritable };
};

export function clickOutside(node: HTMLElement | null) {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			let n: HTMLElement | null = event.target as HTMLElement;
			let ignore = false;
			while (true) {
				if (n === null) break;
				if (
					n.hasAttribute('data-ignore-click-outside') &&
					n.getAttribute('data-ignore-click-outside') === node.id
				) {
					ignore = true;
					break;
				}
				n = n.parentElement;
			}
			if (ignore) return;
			node.dispatchEvent(new CustomEvent('click_outside', { detail: node }));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export function none(node: HTMLElement | null) {
	return { destroy() {} };
}

export function DateFormatter(date: any, language: Language) {
	let options: Intl.DateTimeFormatOptions;
	let locals: string;
	if (language === 'fa') {
		options = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			calendar: 'persian'
		};
		locals = 'fa-IR';
	} else {
		options = {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		};
		locals = 'en-GB';
	}
	return new Intl.DateTimeFormat(locals, options).format(date);
}

export function uidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

export function objToObjCopy(target: customObject, source: customObject) {
	Object.keys(target).forEach((key: string) => {
		if (key in source) target[key] = source[key];
	});
}

export const renderOnSecondRender = () => {
	let renderWritable = writable(false);
	setTimeout(() => renderWritable.set(true), 0);

	return { renderAllowed: renderWritable };
};

export function getTimeAgoString(previousDate: Date): string {
	const diff = Date.now() - previousDate.getTime();
	const seconds = Math.floor(diff / 1000);

	if (seconds < 60) {
		return `${seconds} ثانیه پیش`;
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return `${minutes} دقیقه پیش`;
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return `${hours} ساعت پیش`;
	} else if (seconds < 2592000) {
		const days = Math.floor(seconds / 86400);
		return `${days} روز پیش`;
	} else if (seconds < 31104000) {
		const months = Math.floor(seconds / 2592000);
		return `${months} ماه پیش`;
	} else {
		const years = Math.floor(seconds / 31104000);
		return `${years} سال پیش`;
	}
}

function removeLeadingZeros(input: string): string {
	let startIndex = 0;

	while (startIndex < input.length && input[startIndex] === '0') {
		startIndex++;
	}

	return input.substring(startIndex);
}

export function formatMoney(amount: number) {
	const suffixes = ['', 'هزار', 'میلیون', 'میلیارد', 'بیلیارد'];
	const parts = String(amount).split(/(?=(?:...)*$)/);

	const formattedAmount = `${parts
		.reverse()
		.map((part, i) => {
			if (part !== '000') {
				part = removeLeadingZeros(part);
				return `${part}${suffixes[i] ? ' ' + suffixes[i] : ''}`;
			}
			return '';
		})
		.filter(Boolean)
		.reverse()
		.join(' و ')}`;

	return formattedAmount ? formattedAmount + ' تومان' : '';
}

export const numFaToLatin = <T extends string | number>(persianNumeralString: T): T => {
	if (typeof persianNumeralString === 'number') return persianNumeralString;
	const persianNumerals = '۰۱۲۳۴۵۶۷۸۹';
	let englishNumeralString = ''; // initialize an empty string to hold the converted numerals

	if (persianNumeralString) {
		for (let i = 0; i < persianNumeralString.length; i++) {
			const currentChar = persianNumeralString.charAt(i); // get the current character from the input string

			if (persianNumerals.includes(currentChar)) {
				// check if the current character is a Persian numeral
				const englishNumeral = persianNumerals.indexOf(currentChar).toString(); // convert the Persian numeral to its corresponding English numeral
				englishNumeralString += englishNumeral; // add the converted numeral to the output string
			} else {
				englishNumeralString += currentChar; // if the current character is not a Persian numeral, add it to the output string as-is
			}
		}
	}

	return englishNumeralString as T;
};

export const numberWithCommas = (x: number): string => {
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
};

export const checkKeysExist = (obj: any, keys: string[]) => {
	return obj ? keys.some((key) => obj.hasOwnProperty(key)) : false;
};
