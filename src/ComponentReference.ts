import {CSSBaseSelector} from "./CSSBaseSelector";

const REF_DOM_PROPERTY_NAME = 'data-ref';

export class ComponentReference {

	readonly entry = [REF_DOM_PROPERTY_NAME, this.name] as const;
	readonly selector = new CSSBaseSelector(`[${REF_DOM_PROPERTY_NAME}="${this.name}"`);
	readonly object = Object.fromEntries([this.entry]);

	constructor(readonly name: string) {
	}
}
