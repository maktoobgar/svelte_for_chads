import { type MapLocationColor } from '@/types/map/map_location';

function getColorCode(color: MapLocationColor = 'orange') {
	return color === 'orange'
		? 'FF9E44'
		: color === 'blue'
			? '0097B2'
			: color === 'red'
				? 'F56565'
				: color === 'green'
					? '73C541'
					: color === 'purple'
						? 'AA41C5'
						: color === 'gray'
							? '4b4b4b'
							: '';
}

function getSelectedColorCode(color: MapLocationColor = 'orange') {
	return color === 'orange'
		? 'B57030'
		: color === 'blue'
			? '006B7E'
			: color === 'red'
				? 'AE4848'
				: color === 'green'
					? '487D28'
					: color === 'purple'
						? '7E2E92'
						: color === 'gray'
							? '3d3d3d'
							: '';
}

export function getIcon(
	color: MapLocationColor = 'orange',
	size: number = 42,
	data: { top?: string; bottom?: string } = { top: '', bottom: '' }
) {
	return `${!!data.top ? `<div class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 -top-[35px] text-base font-semibold py-1 px-2 rounded-xl bg-glass-50 text-white font-vazir">${data.top}</div>` : ''}<svg width="${size}" height="${size}" viewBox="0 0 56 56" fill="none" class=""><ellipse cx="28" cy="19.5" rx="8" ry="7.5" fill="white"/><path d="M27.9992 0C17.2838 0 8.56628 8.71877 8.56628 19.4345C8.56628 29.7493 26.1981 53.8484 26.9489 54.8688L27.6495 55.8224C27.7315 55.9345 27.8619 56 27.9992 56C28.1386 56 28.2683 55.9345 28.351 55.8224L29.0513 54.8688C29.8024 53.8484 47.4339 29.7493 47.4339 19.4345C47.4339 8.71877 38.715 0 27.9992 0ZM27.9992 12.4731C31.8386 12.4731 34.9606 15.5953 34.9606 19.4345C34.9606 23.2717 31.8385 26.3959 27.9992 26.3959C24.1621 26.3959 21.0378 23.2717 21.0378 19.4345C21.0378 15.5953 24.162 12.4731 27.9992 12.4731Z" fill="#${getColorCode(color)}"/></svg>${!!data.bottom ? `<div class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 -bottom-[35px] text-base font-semibold py-1 px-2 rounded-xl bg-glass-50 text-white font-vazir">${data.bottom}</div>` : ''}`;
}

export function getSelectedIcon(
	color: MapLocationColor = 'orange',
	size: number = 42,
	data: { top?: string; bottom?: string } = { top: '', bottom: '' }
) {
	const colorCode = getColorCode(color);
	return `${!!data.top ? `<div class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 -top-[35px] text-base font-semibold py-1 px-2 rounded-xl bg-glass-50 text-white font-vazir">${data.top}</div>` : ''}<svg width="${size}" height="${Math.round(size * 1.047619048)}" viewBox="0 0 56 59" fill="none"><path d="M14 56.5C14 55.1193 20.268 54 28 54C35.732 54 42 55.1193 42 56.5C42 57.8807 35.732 59 28 59C20.268 59 14 57.8807 14 56.5Z" fill="#${colorCode}" fill-opacity="0.6"/><path d="M14.15 56.5C14.15 56.3886 14.2128 56.2578 14.3831 56.1092C14.5525 55.9613 14.8112 55.8117 15.1585 55.6651C15.8519 55.3723 16.8644 55.1053 18.1269 54.8799C20.6493 54.4295 24.1401 54.15 28 54.15C31.8599 54.15 35.3507 54.4295 37.8731 54.8799C39.1356 55.1053 40.1481 55.3723 40.8415 55.6651C41.1888 55.8117 41.4475 55.9613 41.6169 56.1092C41.7872 56.2578 41.85 56.3886 41.85 56.5C41.85 56.6114 41.7872 56.7422 41.6169 56.8908C41.4475 57.0387 41.1888 57.1883 40.8415 57.3349C40.1481 57.6277 39.1356 57.8947 37.8731 58.1201C35.3507 58.5705 31.8599 58.85 28 58.85C24.1401 58.85 20.6493 58.5705 18.1269 58.1201C16.8644 57.8947 15.8519 57.6277 15.1585 57.3349C14.8112 57.1883 14.5525 57.0387 14.3831 56.8908C14.2128 56.7422 14.15 56.6114 14.15 56.5Z" stroke="#${colorCode}" stroke-opacity="0.32" stroke-width="0.3"/><ellipse cx="28" cy="19.5" rx="8" ry="7.5" fill="white"/><path d="M27.9992 0C17.2838 0 8.56628 8.71877 8.56628 19.4345C8.56628 29.7493 26.1981 53.8484 26.9489 54.8688L27.6495 55.8224C27.7315 55.9345 27.8619 56 27.9992 56C28.1386 56 28.2683 55.9345 28.351 55.8224L29.0513 54.8688C29.8024 53.8484 47.4339 29.7493 47.4339 19.4345C47.4339 8.71877 38.715 0 27.9992 0ZM27.9992 12.4731C31.8386 12.4731 34.9606 15.5953 34.9606 19.4345C34.9606 23.2717 31.8385 26.3959 27.9992 26.3959C24.1621 26.3959 21.0378 23.2717 21.0378 19.4345C21.0378 15.5953 24.162 12.4731 27.9992 12.4731Z" fill="#${getSelectedColorCode(color)}"/></svg>${!!data.bottom ? `<div class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 -bottom-[35px] text-base font-semibold py-1 px-2 rounded-xl bg-glass-50 text-white font-vazir">${data.bottom}</div>` : ''}`;
}

export function getGpsIcon(size: number = 22) {
	return `<svg width="${size}" height="${size}" viewBox="0 0 22 22" fill="none"><g filter="url(#filter0_d_811_653)"><rect x="3.87564" y="3.6088" width="13.9266" height="14.223" rx="6.96332" fill="#0097B2"/></g><defs><filter id="filter0_d_811_653" x="0.393981" y="0.127136" width="20.89" height="21.1863" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feMorphology radius="3.48166" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_811_653"/><feOffset/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.590324 0 0 0 0 0.699409 0 0 0 0.22 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_811_653"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_811_653" result="shape"/></filter></defs></svg>`;
}

const widthRegex = /width="(\d+)"/;
const heightRegex = /height="(\d+)"/;
export function widthAndHeightFinder(text: string): [number, number] {
	const weidthMatch = text.match(widthRegex);
	const heightMatch = text.match(heightRegex);
	return [parseInt(weidthMatch![1]) / 2, parseInt(heightMatch![1]) / 2];
}
