import { writable } from 'svelte/store';
import { themeKey } from '@/const/keys';

const themeTypeList = ['dark', 'light'] as const;
export type Theme = (typeof themeTypeList)[number];
export const isTheme = (x: any): x is Theme => themeTypeList.includes(x);

const themeInit =
	typeof localStorage !== 'undefined' && isTheme(localStorage.getItem(themeKey))
		? (localStorage.getItem(themeKey) as Theme)
		: 'dark';
const theme = writable<Theme>(themeInit);

if (typeof document !== 'undefined')
	themeInit === 'dark'
		? document.documentElement.classList.add('dark')
		: document.documentElement.classList.remove('dark');

export const setTheme = (value: Theme) => {
	value == 'dark'
		? document.documentElement.classList.add('dark')
		: document.documentElement.classList.remove('dark');
	localStorage.setItem(themeKey, value);
	theme.set(value);
};

export default theme;
