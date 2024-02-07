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
