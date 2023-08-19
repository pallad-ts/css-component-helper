import {variantNameToDOMPropertyName} from "./variantNameToDOMPropertyName";
import {dashCase} from "./dashCase";
import {BaseSelector} from "./BaseSelector";
import {VariantsDescriptor} from "./VariantDescriptor";
import {PropertySelector} from "./PropertySelector";
import {CSSObject} from "./CSSObject";

export function cssComponent<T extends VariantsDescriptor>(name: string) {
	const dashCaseName = dashCase(name);
	const o = {
		name,
		dashCaseName,
		/**
		 * Returns variant selector with leading `&`
		 *
		 * @example
		 * component.selector('size') // '&[data-component-size]'
		 * component.selector('size', 'small') // '&[data-component-size="small"]'
		 */
		selector<TName extends keyof T>(variant: TName) {
			return new PropertySelector<T[TName]>(o.variantDOMPropertyName(variant));
		},
		cssObject(object: CSSObject<T>) {
			const root: any = {
				...object.base,
			};

			if (object.variants) {
				for (const [variant, definition] of Object.entries(object.variants)) {
					if (!definition) {
						continue;
					}

					const {base, ...variantValueDefinitions} = definition;
					if (base) {
						root[o.selector(variant).self] = base;
					}

					for (const [variantValue, definition] of Object.entries(variantValueDefinitions)) {
						root[o.selector(variant).withValue(variantValue as any).self] = definition;
					}
				}
			}

			return root;
		},
		variantDOMPropertyName<TName extends keyof T>(variant: TName) {
			return variantNameToDOMPropertyName(dashCaseName, variant as string);
		},
		variantEntry<TName extends keyof T>(variant: TName, value: T[TName]) {
			return [o.variantDOMPropertyName(variant), value] as const;
		},
		applyVariants(value: T) {
			return Object.fromEntries(
				Object.entries(value)
					.map(([variant, value]) => {
						return o.variantEntry(variant, value as any);
					})
			);
		},
		refName(name: string) {
			return `${dashCaseName}-${dashCase(name)}`
		},
		refEntry(name: string) {
			return [`data-ref`, o.refName(name)];
		},
		refSelector(name: string) {
			return new BaseSelector(`[data-ref="${o.refName(name)}"]`);
		},
	} as const;

	return o;
}
