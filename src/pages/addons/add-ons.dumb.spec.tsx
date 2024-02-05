import AddOnsDumb from '@pages/addons/add-ons.dumb';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { fireEvent, render } from '@testing-library/react';
import { ProductEntity } from '@domain/types/common/product';

describe('AddOnsDumb', () => {

  const generator = new ProductMockGenerator();

  it('should be defined.', () => {
    expect(AddOnsDumb).toBeDefined();
  });

  it('should render with all parameters.', () => {
    const allProducts = generator.generateMany(20);
    const products = allProducts.slice(0,5);
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const wrapper = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts} onNextBooking={onNextBooking} price={price} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when no products are selected, should render with all parameters.', () => {
    const allProducts = generator.generateMany(20);
    const products = [] as ProductEntity[];
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const wrapper = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts} onNextBooking={onNextBooking} price={price} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when no products are selected, clicked on a struck-card setProducts should be called with the product.', () => {
    const allProducts = generator.generateMany(20);
    const products = [] as ProductEntity[];
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const { getAllByTestId } = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts} onNextBooking={onNextBooking} price={price} />);
    const struckCard = getAllByTestId('struck-card');
    struckCard[0].click();
    expect(setProducts).toBeCalledWith([allProducts[0]]);
  });

  it('when a product selected, clicked on a struck-card setProducts is called empty list.', () => {
    const allProducts = generator.generateMany(20);
    const products = [allProducts[0]];
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const { getAllByTestId } = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts} onNextBooking={onNextBooking} price={price} />);
    const struckCards = getAllByTestId('struck-card');
    const selectedItem = struckCards[0];
    fireEvent.click(selectedItem);
    expect(setProducts).toBeCalledWith([]);
  });

  it('when a product selected, clicked on a new element setProducts should called with 2 elements.', () => {
    const allProducts = generator.generateMany(20);
    const products = [allProducts[0]];
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const { getAllByTestId } = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts} onNextBooking={onNextBooking} price={price} />);
    const struckCards = getAllByTestId('struck-card');
    const selectedItem = struckCards[1];
    fireEvent.click(selectedItem);
    const calledWith = setProducts.mock.calls[0][0];
    expect(calledWith).toHaveLength(2);
  });

  it('when multiple products are selected, clicked on a weak-btn setProducts should be called with empty array and onNext booking should be called..', () => {
    const allProducts = generator.generateMany(20);
    const products = allProducts.slice(0, 5);
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const { getByTestId } = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts}
                                               onNextBooking={onNextBooking} price={price} />);
    const weakBtn = getByTestId('no-thanks');
    fireEvent.click(weakBtn);
    expect(setProducts).toBeCalledWith([]);
    expect(onNextBooking).toBeCalled();

  });

  it('when multiple products are selected, clicked on a cta-primary onNextBooking should be called.', () => {
    const allProducts = generator.generateMany(20);
    const products = allProducts.slice(0, 5);
    const setProducts = jest.fn();
    const onNextBooking = jest.fn();
    const price = 1;
    const { getByTestId } = render(<AddOnsDumb products={products} allProducts={allProducts} setProducts={setProducts}
                                               onNextBooking={onNextBooking} price={price} />);
    const ctaPrimary = getByTestId('cta-primary');
    fireEvent.click(ctaPrimary);
    expect(onNextBooking).toBeCalled();
  });

});
