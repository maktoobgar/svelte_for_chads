import Toaster from '@cp/Toast/Toaster.svelte';

type ToastType = 'success' | 'info' | 'warning' | 'error';

export function toast(title: string, text: string, type: ToastType) {
	const container = document.getElementById('toaster');
	if (!container) {
		console.warn('Toaster container not found. Did you forget to include <ToasterInit>?');
		return;
	}

	const toast = new Toaster({
		target: container,
		props: {
			title,
			text,
			type
		}
	});

	toast.$on('dismiss', () => {
		toast.$destroy();
	});
}

export function success(title: string, text: string) {
	toast(title, text, 'success');
}

export function info(title: string, text: string) {
	toast(title, text, 'info');
}

export function warning(title: string, text: string) {
	toast(title, text, 'warning');
}

export function error(title: string, text: string) {
	toast(title, text, 'error');
}
