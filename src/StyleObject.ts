import type * as CSS from 'csstype';
import {VariantsDescriptor} from "./VariantsDescriptor";


export interface StyleObject<TVariants extends VariantsDescriptor, TVariables extends string = string> {
	base?: StyleObject.CSSTypeProperties<TVariables>;
	variants?: StyleObject.Variants<TVariants, TVariables>;
}

export namespace StyleObject {
	export type CSSTypeProperties<TVariables extends string> = CSS.Properties & { vars?: StyleObject.Vars<TVariables> };
	export type Variants<T extends VariantsDescriptor, TVariables extends string> = {
		[TProperty in VariantsDescriptor.Names<T>]?: Variant.Definition<T[TProperty], TVariables>;
	}

	export type Vars<TVariables extends string> = {
		[T in TVariables]?: string;
	} & Record<string, string>;

	export namespace Variant {
		export type Definition<TValues extends VariantsDescriptor.Value, TVariables extends string> = { base?: CSS.Properties; } & {
			[T in NormalizeValue<TValues>]?: CSSTypeProperties<TVariables>;
		}

		export type NormalizeValue<T extends VariantsDescriptor.Value> = T extends boolean ? NonNullable<Exclude<T, boolean> | 'true' | 'false'> : NonNullable<T>;
	}

}
