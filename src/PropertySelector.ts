import {CSSBaseSelector} from "./CSSBaseSelector";
import {VariantsDescriptor} from "./VariantsDescriptor";

export class PropertySelector<TValue extends VariantsDescriptor.Value> extends CSSBaseSelector {
	constructor(readonly propertyName: string) {
		super(`[${propertyName}]`);
	}

	withValue(value: TValue) {
		return new CSSBaseSelector(`[${this.propertyName}="${value}"]`);
	}
}

