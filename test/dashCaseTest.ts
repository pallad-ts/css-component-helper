import {dashCase} from "@src/dashCase";

describe('dashCase', () => {
	it.each([
		['foo', 'foo'],
		['isActive', 'is-active'],
		['IsDisabled', 'is-disabled'],
		['isCSSValid', 'is-cssvalid'],
		['isCssValid', 'is-css-valid'],
	])('% -> %', (input, expected) => {
		return expect(dashCase(input)).toBe(expected);
	})
})
