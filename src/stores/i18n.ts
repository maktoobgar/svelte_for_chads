import { writable } from 'svelte/store';
import { setLocale } from '@i18n/i18n-svelte';
import { loadAllLocales } from '@/i18n/i18n-util.sync';
import { i18n } from '@/i18n/i18n-util';
import { languageKey } from '@/const/keys';

const langTypeList = ['fa', 'en'] as const;
export type Language = (typeof langTypeList)[number];
export const isLanguage = (x: any): x is Language => langTypeList.includes(x);

const langInit =
	typeof localStorage !== 'undefined' && isLanguage(localStorage.getItem(languageKey))
		? (localStorage.getItem(languageKey) as Language)
		: 'fa';
const dirInit = langInit === 'fa' ? 'rtl' : 'ltr';
const language = writable<Language>(langInit);
export const dir = writable<'ltr' | 'rtl'>(dirInit);

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
			dir.set('ltr');
			break;
		case 'fa':
			document.documentElement.classList.remove('font-vazir-latin');
			document.documentElement.classList.add('font-vazir');
			document.dir = 'rtl';
			dir.set('rtl');
			break;
	}
	setLocale(value);
	localStorage.setItem(languageKey, value);
	language.set(value);
};

export default language;
