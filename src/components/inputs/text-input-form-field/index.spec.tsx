import TextInputFormField from '@components/inputs/text-input-form-field/index';
import { act, fireEvent, render } from '@testing-library/react';

describe('TextInputFormField', () => {
  it('should be defined.', () => {
    expect(TextInputFormField).toBeDefined();
  });

  it('should render.', () => {
    const { container } = render(<TextInputFormField />);
    expect(container).toBeDefined();
  });

  it('should render with label.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    expect(container).toBeDefined();
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('should render with initial value.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
  });

  it('should render with initial value and label.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('should render with initial value and label and disabled.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('should render with initial value and label and disabled', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('when disabled should not change value', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    inputItem.focus();
    fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    expect(inputItem.value).toEqual('Test');

  });

  it('when not disabled should change value', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });
    expect(inputItem.value).toEqual('Updated test value');
    act(() => {
      fireEvent.blur(inputItem);
    });
    expect(inputItem.value).toEqual('Updated test value');
    act(() => {
      fireEvent.change(inputItem, { target: { value: 'Updated test value 2' } });
    });
    expect(inputItem.value).toEqual('Updated test value 2');
  });

  it('when disabled should not call onChanged', () => {
    const onChanged = jest.fn();
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true}
                                                     onChanged={onChanged} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });


    expect(onChanged).not.toHaveBeenCalled();
  });

  it('when not disabled should call onChanged', () => {
    const onChanged = jest.fn();
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' onChanged={onChanged} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });

    expect(onChanged).toHaveBeenCalled();
  });

  it('when not disabled should call onChanged with correct value', () => {
    const onChanged = jest.fn();
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' onChanged={onChanged} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });

    expect(onChanged).toHaveBeenCalledWith('Updated test value');
  });

  it('when disabled label and initialValue are available, label should have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).toContain('floating');
  });

  it('when not disabled label and initialValue are available, ' + 'label should have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).toContain('floating');
  });

  it('when not disabled label and initialValue are not available, ' + 'label should not have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).not.toContain('floating');
  });
  it('when not disabled label avilable, but initialValue is not available, ' + 'label should not have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).not.toContain('floating');
  });
  it('when not disabled label available and initialValue is not available, ' + 'on focus, label should gain class name that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    act(() => {
      inputItem.focus();
    });
    expect(labelItem.className).toContain('floating');
  });

  it('when not disabled label available and initialValue is not available, ' + 'after typing, label should gain class name that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });
    expect(labelItem.className).toContain('floating');

  });
  it('when errorMessage is available, TextInputFormField should include error string as text.', () => {
    const error = 'It iss an Error';
    const { container, getByText } = render(<TextInputFormField label='Test' errorMessage={error} />);
    expect(getByText(error)).toBeDefined();

  });
  it('when errorMessage is not available, TextInputFormField should not include error string as text.', () => {
    const { container, getByText } = render(<TextInputFormField label='Test' />);
    expect(() => {
      getByText('It iss an Error');

    }).toThrow();

  });
  it('when type="password" is available, TextInputFormField should render input type as password.', () => {
    const { container } = render(<TextInputFormField label='Test' type='password' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    expect(inputItem.type).toEqual('password');
  });
  it('when type="password" is available, TextInputFormField should have a hide-button. When hide-button is clicked, text should be visible.', () => {
    const { container, getByTestId } = render(<TextInputFormField initialValue={'Test'} label='Test'
                                                                  type='password' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const hideButton = getByTestId('text-input-form-field-show-button') as HTMLButtonElement;
    expect(inputItem.type).toEqual('password');
    act(() => {
      hideButton.click();
    });
    expect(inputItem.type).toEqual('text');
    const showButton = getByTestId('text-input-form-field-hide-button') as HTMLButtonElement;
    act(() => {
      showButton.click();
    });
    expect(inputItem.type).toEqual('password');

  });
  it('when type is not available, TextInputFormField should render input type as text and hide, show buttons should not be visible.', () => {
    const { container, queryByTestId } = render(<TextInputFormField label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    expect(inputItem.type).toEqual('text');
    expect(queryByTestId('text-input-form-field-show-button')).toBeNull();
    expect(queryByTestId('text-input-form-field-hide-button')).toBeNull();
  });
  it('when validator is not available, every typed character should be visible.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });
    expect(inputItem.value).toEqual('Updated test value');
  });
  it('when validator is available, it should filter text correctly.[NUMERIC]', () => {

    // Check if string only has numbers
    const validator = (value: string) => {
      const regex = new RegExp('^[0-9]+$');
      return regex.test(value);
    };

    const { container } = render(<TextInputFormField label='Test' validator={validator} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const invalidText = 'Updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: invalidText } });
    });
    expect(inputItem.value).toEqual('');
    const validText = '1234567890';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: validText } });
    });
    expect(inputItem.value).toEqual(validText);
  });
  it('when validator is available, it should filter text correctly. [ALPHANUMERIC]', () => {

    // Check if string only has numbers
    const validator = (value: string) => {
      const regex = new RegExp('^[a-zA-Z0-9]+$');
      return regex.test(value);
    };

    const { container } = render(<TextInputFormField label='Test' validator={validator} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const invalidText = 'Updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: invalidText } });
    });
    expect(inputItem.value).toEqual('');
    const validText = 'ASDFASDF1234567890';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: validText } });
    });
    expect(inputItem.value).toEqual(validText);
  });
  it('when validator is available, it should filter text correctly. [ALPHABET]', () => {

    // Check if string only has numbers
    const validator = (value: string) => {
      const regex = new RegExp('^[a-zA-Z]+$');
      return regex.test(value);
    };

    const { container } = render(<TextInputFormField label='Test' validator={validator} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const invalidText = 'Updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: invalidText } });
    });
    expect(inputItem.value).toEqual('');
    const validText = 'abcdefg';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: validText } });
    });
    expect(inputItem.value).toEqual(validText);
  });
  it('when validator is available, it should filter text correctly. [ALPHABET + WHITESPACES]', () => {

    // Check if string only has numbers
    const validator = (value: string) => {
      const regex = new RegExp('^[a-zA-Z ]+$');
      return regex.test(value);
    };

    const { container } = render(<TextInputFormField label='Test' validator={validator} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const invalidText = 'Updated test value13241234';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: invalidText } });
    });
    expect(inputItem.value).toEqual('');
    const validText = 'abcdefg';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: validText } });
    });
    expect(inputItem.value).toEqual(validText);
  });
  it('when validator is available, if invalid initial value is provided, it should be filtered.', () => {
    const validator = (value: string) => {
      const regex = new RegExp('^[a-zA-Z]+$');
      return regex.test(value);
    };
    const { container } = render(<TextInputFormField label='Test' validator={validator} initialValue='1234' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    expect(inputItem.value).toEqual('');
  });

  it('when capitalized is true, every first letter of text should be capitalized.', () => {
    const { container } = render(<TextInputFormField label='Test' capitalized={true} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const text = 'updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: text } });
    });
    expect(inputItem.value).toEqual('Updated Test Value');

  });
  it('when capitalized is false, every first letter of text should not be capitalized.', () => {
    const { container } = render(<TextInputFormField label='Test' capitalized={false} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const text = 'updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: text } });

    });
    expect(inputItem.value).toEqual(text);
  });
  it('throws exception, if two of lower, upper or capitalized are true.', () => {
    expect(() => {
      render(<TextInputFormField label='Test' capitalized={true} lower={true} />);
    }).toThrow();
    expect(() => {
      render(<TextInputFormField label='Test' capitalized={true} upper={true} />);
    });
    expect(() => {
      render(<TextInputFormField label='Test' lower={true} upper={true} />);
    });
    expect(() => {
      render(<TextInputFormField label='Test' capitalized={true} lower={true} upper={true} />);
    }).toThrow();
  });
  it('when lower is true, every letter of text should be lower case.', () => {
    const { container } = render(<TextInputFormField label='Test' lower={true} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const text = 'UPDATED TEST VALUE';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: text } });
    });
    expect(inputItem.value).toEqual('updated test value');
  });

  it('when lower is false, every letter of text should not be lower case.', () => {
    const { container } = render(<TextInputFormField label='Test' lower={false} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const text = 'UPDATED TEST VALUE';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: text } });
    });
    expect(inputItem.value).toEqual(text);

  });
  it('when upper is true, every letter of text should be upper case.', () => {
    const { container } = render(<TextInputFormField label='Test' upper={true} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const text = 'updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: text } });

    });
    expect(inputItem.value).toEqual('UPDATED TEST VALUE');
  });
  it('when upper is false, every letter of text should not be upper case.', () => {
    const { container } = render(<TextInputFormField label='Test' upper={false} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const text = 'updated test value';
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: text } });
    });
    expect(inputItem.value).toEqual(text);
  });

});

