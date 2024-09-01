import { redirect } from '@sveltejs/kit';
import { writable } from 'svelte/store';

interface LayoutInterface {
	redirect: boolean;
	redirectFrom: string;

	center_layout: boolean;
	fullscreen_layout: boolean;
}

let layout: LayoutInterface;
const layoutWritable = writable<LayoutInterface>({
	redirect: false,
	redirectFrom: '',

	fullscreen_layout: true,
	center_layout: false
});
layoutWritable.subscribe((v) => (layout = v));

export function fullscreen_layout() {
	layoutWritable.set({
		...layout,
		fullscreen_layout: true,
		center_layout: false
	});
}

export function center_layout() {
	layoutWritable.set({
		...layout,
		fullscreen_layout: false,
		center_layout: true
	});
}

export function redirect_to(to: string) {
	layoutWritable.set({
		...layout,
		redirect: true,
		redirectFrom: ''
	});
	redirect(302, to);
}

export function reset_redirect() {
	layoutWritable.set({
		...layout,
		redirect: false,
		redirectFrom: ''
	});
}

export default layoutWritable;
