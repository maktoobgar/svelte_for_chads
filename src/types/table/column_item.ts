export default interface ColumnItem {
	id: number;
	name: string;
	colName: string;
	type: 'profile' | 'status' | 'twoPiece' | 'progressBar' | 'date' | '';
	sort: boolean;
}
