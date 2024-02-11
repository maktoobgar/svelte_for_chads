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
				if (n.hasAttribute('data-ignore-click-outside')) {
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
