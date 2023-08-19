import {BaseSelector} from "./BaseSelector";
import {VariantDescriptor} from "./VariantDescriptor";

export class PropertySelector<TValue extends VariantDescriptor.Value> extends BaseSelector {
	constructor(readonly propertyName: string) {
		super(`[${propertyName}]`);
	}

	withValue(value: TValue) {
		return new BaseSelector(`[${this.propertyName}="${value}"]`);
	}
}

