import { writable } from 'svelte/store';
import { setLocale } from '@i18n/i18n-svelte';
import { loadAllLocales } from '@/i18n/i18n-util.sync';
import { i18n } from '@/i18n/i18n-util';

const langTypeList = ['fa', 'en'] as const;
export type Language = (typeof langTypeList)[number];
export const isLanguage = (x: any): x is Language => langTypeList.includes(x);

const langInit =
	typeof localStorage !== 'undefined' && isLanguage(localStorage.getItem('language'))
		? (localStorage.getItem('language') as Language)
		: 'fa';
const language = writable<Language>(langInit);

// Load all locals
loadAllLocales();
i18n();
setLocale(langInit);

if (typeof document !== 'undefined')
	if (typeof document !== 'undefined') {
		switch (langInit) {
			case 'en':
				document.documentElement.classList.add('font-vazir-latin');
				document.documentElement.classList.remove('font-vazir');
				document.dir = 'ltr';
				break;
			case 'fa':
				document.documentElement.classList.remove('font-vazir-latin');
				document.documentElement.classList.add('font-vazir');
				document.dir = 'rtl';
				break;
		}
	}

export const setLanguage = (value: Language) => {
	switch (value) {
		case 'en':
			document.documentElement.classList.add('font-vazir-latin');
			document.documentElement.classList.remove('font-vazir');
			document.dir = 'ltr';
			break;
		case 'fa':
			document.documentElement.classList.remove('font-vazir-latin');
			document.documentElement.classList.add('font-vazir');
			document.dir = 'rtl';
			break;
	}
	setLocale(value);
	localStorage.setItem('language', value);
	language.set(value);
};

export default language;
