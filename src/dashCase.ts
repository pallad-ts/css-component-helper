const REGEXP = /([a-z])([A-Z])/g;

function replace(match: any, p1: string, p2: string) {
	return `${p1}-${p2.toLowerCase()}`;
}

export function dashCase(name: string) {
	return name.replace(REGEXP, replace).toLowerCase();
}
