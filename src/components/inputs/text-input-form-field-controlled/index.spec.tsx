import TextInputFormFieldControlled from '@components/inputs/text-input-form-field-controlled';
import { act, fireEvent, render } from '@testing-library/react';

describe('TextInputFormFieldControlled', () => {
  it('should be defined.', () => {
    expect(TextInputFormFieldControlled).toBeDefined();
  });
  it('should render and match snapshot.', () => {
    const wrapper = render(<TextInputFormFieldControlled />);
    expect(wrapper).toMatchSnapshot();
  });
  // TODO: Add tests
});
