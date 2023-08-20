import {component as cssComponent} from "@src/component";

describe('component', () => {
	const component = cssComponent<{
		size?: 'small' | 'medium' | 'large',
		isLoading?: boolean,
		index: number;
	}, 'padding' | 'isDisabled', 'end' | 'start'>('button');

	describe('style object', () => {
		it('general', () => {
			expect(component.styleObject({
				base: {
					vars: {
						isDisabled: '1'
					},
					border: '1px solid red',
				},
				variants: {
					size: {
						base: {
							content: '"size"',
						},
						small: {
							vars: {
								padding: '10',
							},
							content: '"size-small"',
						},
						medium: {
							content: '"size-medium"',
						},
						large: {
							content: '"size-large"'
						}
					}
				}
			}))
				.toMatchSnapshot();
		});
	})

	describe('applying variants', () => {
		it('general', () => {
			expect(component.applyVariants({
				index: 10,
				size: 'small',
				isLoading: true
			}))
				.toMatchSnapshot()
		});
	});

	describe('component reference', () => {
		it('getting ref returns always the same object', () => {
			const ref1 = component.subComponentRef('end');
			const ref2 = component.subComponentRef('end');

			expect(ref1)
				.toBe(ref2);
		});

		it('general', () => {
			expect(component.subComponentRef('end'))
				.toMatchSnapshot();
		});
	});

	describe('variable', () => {
		it('general', () => {
			expect(component.variable('padding'))
				.toMatchSnapshot();
		});
	});
});
