export type VariantsDescriptor = Record<string, VariantsDescriptor.Value>;

export namespace VariantsDescriptor {
	export type Value = string | number | boolean;
	export type Names<T extends VariantsDescriptor> = keyof T & (string & {});
}
