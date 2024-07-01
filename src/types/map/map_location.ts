import { objToObjCopy } from '@utils/general';

export type MapLocationColor = 'orange' | 'blue' | 'red' | 'green' | 'purple' | 'gray';

export default class MapLocation<T> {
	color?: MapLocationColor;
	position!: L.LatLngTuple;
	data?: { top: string; bottom: string };
	value?: T;

	constructor(
		obj: any,
		value: T,
		color: MapLocationColor = 'orange',
		data: { top: string; bottom: string } = { top: '', bottom: '' }
	) {
		objToObjCopy(this, obj);
		if ('latitude' in obj && 'longitude' in obj) this.position = [obj.latitude, obj.longitude];
		this.color = color;
		this.value = value;
		this.data = data;
	}
}
