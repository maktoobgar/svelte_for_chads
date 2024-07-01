import { easeOut } from './easings';
import { split_css_unit } from './utils';

interface MoveTransitionOptions {
	x?: number | string;
	y?: number | string;
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
}

export function move(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = easeOut, x = 0, y = 0 }: MoveTransitionOptions = {}
) {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const [xValue, xUnit] = split_css_unit(x);
	const [yValue, yUnit] = split_css_unit(y);
	return {
		delay,
		duration,
		easing,
		css: (t: number, u: number) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});`
	};
}
