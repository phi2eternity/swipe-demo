import { act, fireEvent, render } from '@testing-library/react';
import { ExpiryDate } from '@components/inputs/expiry-date/index';


describe('ExpiryDate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpiryDate />);
    expect(baseElement).toBeTruthy();
  });
  it('should write 2 digits and add /', () => {
    const { getByTestId } = render(<ExpiryDate />);
    const input = getByTestId('expiry-date').querySelector('input') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: '12' } });
    });
    expect(input.value).toBe('12/');
   act(() => {
      fireEvent.change(input, { target: { value: '12/22' } });
    });
     expect(input.value).toBe('12/22');
  });
  it('should not allow characters', () => {
    const { getByTestId } = render(<ExpiryDate />);
    const input = getByTestId('expiry-date').querySelector('input') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });
    expect(input.value).toBe('');

  });
  it('should not allow more than 5 digits', () => {
    const { getByTestId } = render(<ExpiryDate />);
    const input = getByTestId('expiry-date').querySelector('input') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: '12' } });

    });
    act(() => {
      fireEvent.change(input, { target: { value: '12/3456' } });
    });
    expect(input.value).toBe('12/34');
  });
  it('should omit the last digit if it is not a number', () => {
    const { getByTestId } = render(<ExpiryDate />);
    const input = getByTestId('expiry-date').querySelector('input') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: '12' } });

    });
    act(() => {
      fireEvent.change(input, { target: { value: '12/34' } });
    });
    expect(input.value).toBe('12/34');
    act(() => {
      fireEvent.change(input, { target: { value: '12/341234' } });
    });
    expect(input.value).toBe('12/34');
  });

});
