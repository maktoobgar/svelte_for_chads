import type Content from './content';

export default interface Item {
	id: number;
	data: { [key: string]: Content };
}
