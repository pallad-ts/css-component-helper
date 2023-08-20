import type * as CSS from 'csstype';
import {VariantsDescriptor} from "./VariantsDescriptor";


export interface StyleObject<T extends VariantsDescriptor> {
	base?: StyleObject.CSSTypeProperties;
	variants?: StyleObject.Variants<T>;
}

export namespace StyleObject {
	export type CSSTypeProperties = CSS.Properties & { vars?: StyleObject.Vars };
	export type Variants<T extends VariantsDescriptor> = {
		[TProperty in VariantsDescriptor.Names<T>]?: Variant.Definition<T[TProperty]>;
	}

	export type Vars = Record<string, string>;

	export namespace Variant {
		export type Definition<TValues extends VariantsDescriptor.Value> = { base?: CSS.Properties; } & {
			[T in NormalizeValue<TValues>]?: CSSTypeProperties;
		}

		export type NormalizeValue<T extends VariantsDescriptor.Value> = T extends boolean ? NonNullable<Exclude<T, boolean> | 'true' | 'false'> : NonNullable<T>;
	}

}
