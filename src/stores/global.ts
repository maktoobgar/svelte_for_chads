import { writable } from 'svelte/store';

type GlobalInterface = Record<string, any>;

let global: GlobalInterface;
const globalWritable = writable<GlobalInterface>({});

globalWritable.subscribe((v) => (global = v));

export function setGlobal(key: string, value: any) {
	globalWritable.set({ ...global, [key]: value });
}

export function getGlobal(key: string, g: GlobalInterface = global) {
	return key in global ? global[key] : null;
}

export function removeGlobal(key: string) {
	globalWritable.set({ ...global, [key]: null });
}

export const keepUrl = (wannaExit: () => void) => {
	return (node: HTMLElement) => {
		globalWritable.set({
			...global,
			KeepUrl: !!global.KeepUrl ? [...global.KeepUrl, wannaExit] : [wannaExit]
		});

		return {
			destroy() {
				globalWritable.set({
					...global,
					KeepUrl: !!global.KeepUrl ? global.KeepUrl.slice(0, global.KeepUrl.length - 1) : []
				});
			}
		};
	};
};

export default globalWritable;
