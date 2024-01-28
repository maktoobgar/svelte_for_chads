import Info from '@icons/Info.svelte';
import toast from 'svelte-french-toast';

export function success(text: string, duration: number = 6000) {
	toast.success(text, {
		duration: duration,
		style: 'background-color: var(--green-100)',
		iconTheme: { primary: 'var(--green-700)', secondary: 'var(--white)' }
	});
}

export function error(text: string, duration: number = 6000) {
	toast.error(text, {
		duration: duration,
		style: 'background-color: var(--red-100)'
	});
}

export function info(text: string, duration: number = 6000) {
	toast.success(text, {
		duration: duration,
		// bg-cyan-100
		style: 'background-color: rgb(207 250 254)',
		icon: Info
	});
}
