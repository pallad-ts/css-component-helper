export class BaseSelector {
	readonly self = this.toString();

	constructor(readonly raw: string) {
	}

	toString() {
		return '&' + this.raw;
	}
}
