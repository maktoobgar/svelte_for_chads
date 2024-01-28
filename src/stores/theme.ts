import { writable } from 'svelte/store';

const themeTypeList = ['dark', 'light'] as const;
export type Theme = (typeof themeTypeList)[number];
export const isTheme = (x: any): x is Theme => themeTypeList.includes(x);

const themeInit =
	typeof localStorage !== 'undefined' && isTheme(localStorage.getItem('theme'))
		? (localStorage.getItem('theme') as Theme)
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
	localStorage.setItem('theme', value);
	theme.set(value);
};

export default theme;
