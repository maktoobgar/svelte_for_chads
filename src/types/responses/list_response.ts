export default class ListResponse<T> {
	// page!: number;
	// pages_count!: number;
	// per_page!: number;
	// count!: number;
	pages!: number;
	items!: number;
	data!: T[];

	constructor(obj: any) {
		Object.assign(this, obj);
	}
}
