export class CSSVariable {
	readonly reference = `var(${this.name})`;

	constructor(readonly name: string) {
	}

	toString() {
		return this.name;
	}

	referenceWithFallback(fallback: string) {
		return `var(${this.name}, ${fallback})`;
	}
}
