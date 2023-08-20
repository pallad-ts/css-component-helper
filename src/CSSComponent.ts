import {VariantsDescriptor} from "./VariantsDescriptor";
import {StyleObject} from "./StyleObject";
import type * as CSS from 'csstype';
import {CSSVariable} from "./CSSVariable";
import {Variant} from "./Variant";
import {ComponentReference} from "./ComponentReference";

export interface CSSComponent<TVariants extends VariantsDescriptor, TVariables extends string = string, TSubComponentName extends string = string> {
	name: string;
	dashCaseName: string;

	styleObject(object: StyleObject<TVariants>): CSS.Properties;

	variable<T extends TVariables>(name: T): CSSVariable;

	variant<T extends VariantsDescriptor.Names<TVariants>>(name: T): Variant<TVariants[T]>

	applyVariants(value: TVariants): Record<string, string | number | boolean>;

	subComponentRef<TName extends TSubComponentName>(name: TName): ComponentReference;
}

export namespace CSSComponent {
	export type Variants<T extends CSSComponent<any>> = T extends CSSComponent<infer TInferred> ? TInferred : never;
	export type Variables<T extends CSSComponent<any>> = T extends CSSComponent<any, infer TInferred> ? TInferred : never;
	export type SubComponents<T extends CSSComponent<any>> = T extends CSSComponent<any, any, infer TInferred> ? TInferred : never;
}
