const device = navigator.userAgent.toLowerCase();
const isPC =
	(device.includes('windows') || device.includes('macintosh') || device.includes('linux')) &&
	!device.includes('android');

export default isPC;
