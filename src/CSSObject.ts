import type * as CSS from 'csstype';
import {VariantDescriptor, VariantsDescriptor} from "./VariantDescriptor";

export type CSSObject<T extends VariantsDescriptor> = {
	base?: CSS.Properties;
	variants?: CSSObject.Variants<T>;
}

export namespace CSSObject {
	export type Variants<T extends VariantsDescriptor> = {
		[TProperty in keyof T]?: Variant.Definition<T[TProperty]>;
	}

	export namespace Variant {
		export type Definition<TValues extends VariantDescriptor.Value> = { base?: CSS.Properties; } & {
			[T in NormalizeValue<TValues>]?: CSS.Properties;
		}

		export type NormalizeValue<T extends VariantDescriptor.Value> = T extends boolean ? NonNullable<Exclude<T, boolean> | 'true' | 'false'> : NonNullable<T>;
	}

}
