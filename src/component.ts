import {variantNameToDOMPropertyName} from "./variantNameToDOMPropertyName";
import {dashCase} from "./dashCase";
import {VariantsDescriptor} from "./VariantsDescriptor";
import {StyleObject} from "./StyleObject";
import {Variant} from "./Variant";
import {ComponentReference} from "./ComponentReference";
import {CSSVariable} from "./CSSVariable";
import type * as CSS from 'csstype';
import {CSSComponent} from "./CSSComponent";

function flyweightInitializer<T>(initializer: (name: string) => T) {
	const map = new Map<string, T>();
	return (key: string): T => {
		if (map.has(key)) {
			return map.get(key)!;
		}

		const value = initializer(key);
		map.set(key, value);
		return value;
	}
};

function ourStylesToCssProperties({vars, ...styles}: StyleObject.CSSTypeProperties): CSS.Properties {
	if (vars) {
		for (const [varName, value] of Object.entries(vars)) {
			// @ts-ignore
			styles[varName] = value;
		}
	}
	return styles as CSS.Properties;
}

export function component<TVariants extends VariantsDescriptor, TVariables extends string = string, TSubComponentName extends string = string>(name: string) {

	const variantInitializer = flyweightInitializer(name => {
		return new Variant(name, variantNameToDOMPropertyName(dashCaseName, name));
	});

	const componentReferenceInitializer = flyweightInitializer(name => {
		return new ComponentReference(`${dashCaseName}-${dashCase(name)}`);
	});

	const variableInitializer = flyweightInitializer(name => {
		return new CSSVariable(`--${dashCaseName}-${dashCase(name)}`);
	});

	const dashCaseName = dashCase(name);
	const o: CSSComponent<TVariants, TVariables, TSubComponentName> = {
		name,
		dashCaseName,
		styleObject(object) {
			const root: any = {
				...(object.base ? ourStylesToCssProperties(object.base) : undefined),
			};

			if (object.variants) {
				for (const [variant, definition] of Object.entries(object.variants)) {
					if (!definition) {
						continue;
					}

					const {base, ...variantValueDefinitions} = definition;
					if (base) {
						root[o.variant(variant).selector.self] = ourStylesToCssProperties(base);
					}

					for (const [variantValue, definition] of Object.entries(variantValueDefinitions)) {
						root[o.variant(variant).selector.withValue(variantValue as any).self] = ourStylesToCssProperties(definition as StyleObject.CSSTypeProperties);
					}
				}
			}
			return root;
		},
		variable(name) {
			return variableInitializer(name);
		},
		variant<T extends VariantsDescriptor.Names<TVariants>>(name: T) {
			return variantInitializer(name) as Variant<TVariants[T]>;
		},
		applyVariants(value: TVariants) {
			return Object.fromEntries(
				Object.entries(value)
					.map(([variant, value]) => {
						return o.variant(variant).entry(value as any);
					})
			);
		},
		subComponentRef(name) {
			return componentReferenceInitializer(name);
		}
	};

	return o;
}
