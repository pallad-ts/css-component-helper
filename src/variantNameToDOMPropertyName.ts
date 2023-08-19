import {dashCase} from "./dashCase";

export function variantNameToDOMPropertyName(dashCasedBaseName: string, variantName: string) {
	const domVariantName = dashCase(variantName);
	return `data-${dashCasedBaseName}-${domVariantName}`;
}
