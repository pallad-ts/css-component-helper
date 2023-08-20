import {VariantsDescriptor} from "./VariantsDescriptor";
import {PropertySelector} from "./PropertySelector";

export class Variant<TValue extends VariantsDescriptor.Value> {
	readonly selector = new PropertySelector(this.domPropertyName);

	constructor(readonly name: string, readonly domPropertyName: string) {

	}

	entry(value: TValue) {
		return [this.domPropertyName, value];
	}
}
