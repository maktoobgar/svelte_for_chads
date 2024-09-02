import Info from '@icons/Info.svelte';
import toast from 'svelte-french-toast';

export function success(text: string, duration: number = 6000) {
	toast.success(text, {
		duration: duration,
		style: 'background-color: var(--green-100); color: var(--gray-900);',
		iconTheme: { primary: 'var(--green-600)', secondary: 'var(--white)' }
	});
}

export function error(text: string, duration: number = 6000) {
	toast.error(text, {
		duration: duration,
		style: 'background-color: var(--red-100); color: var(--gray-900);'
	});
}

export function info(text: string, duration: number = 6000) {
	toast.success(text, {
		duration: duration,
		// bg-cyan-100
		style: 'background-color: var(--cyan-100); color: var(--gray-900);',
		icon: Info
	});
}
