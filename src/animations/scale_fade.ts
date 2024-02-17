import { easeOut } from './easings';

interface ScaleFadeTransitionOptions {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	start?: number;
	opacity?: number;
}

export default function scaleFade(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = easeOut, opacity = 0 }: ScaleFadeTransitionOptions = {}
) {
	const style = getComputedStyle(node);
	const initialOpacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const scaleStart = 1;
	const scaleEnd = 0.9;
	const od = initialOpacity * (1 - opacity);

	return {
		delay,
		duration,
		easing,
		css: (
			t: number,
			u: number
		) => `transform: ${transform} scale(${scaleStart - (scaleStart - scaleEnd) * u});
            opacity: ${initialOpacity - od * u}`
	};
}
