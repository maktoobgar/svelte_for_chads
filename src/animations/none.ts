import { easeOut } from './easings';

interface NoneOptions {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	start?: number;
	opacity?: number;
}

export default function none(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = easeOut, opacity = 0 }: NoneOptions = {}
) {
	return {
		delay,
		duration,
		easing,
		css: (t: number, u: number) => ''
	};
}
