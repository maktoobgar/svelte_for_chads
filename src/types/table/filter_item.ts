import type Sort from './sort';

export default interface FilterItem {
	id: number;
	title: string;
	key?: string;
	value?: string;
	autoActive?: boolean;
}
