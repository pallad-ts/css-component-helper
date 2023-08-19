export type VariantsDescriptor = Record<string, VariantDescriptor.Value>;

export namespace VariantDescriptor {
	export type Value = string | number | boolean;
}
