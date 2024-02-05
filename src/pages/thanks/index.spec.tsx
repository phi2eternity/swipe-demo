import ThanksPageDumb, { ThanksPageDumbProps } from '@pages/thanks/index.dumb';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { render } from '@testing-library/react';



describe('ThanksPageDumb', () => {
  const branchGenerator = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();
  const productGenerator = new ProductMockGenerator();

  it('should be defined', () => {
    expect(ThanksPageDumb).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const wrapper = render(<ThanksPageDumb {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('employee row should raise exception if employee is undefined.', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {getByTestId} = render(<ThanksPageDumb {...props}/>);

    try{
      getByTestId("thanks-page-employee-row");
      throw new Error("Employee row should not be visible if employee is undefined.");
    }catch(e){
      expect(e).toBeDefined();
    }

    const branchRow = getByTestId("thanks-page-branch-row");
    const serviceRow = getByTestId("thanks-page-service-row");
    const dateRow = getByTestId("thanks-page-date-row");
    expect(branchRow).toBeTruthy();
    expect(serviceRow).toBeTruthy();
    expect(dateRow).toBeTruthy();

  });
  it('employee row should be visible if employee is defined and should contain employee name.', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {getByTestId} = render(<ThanksPageDumb {...props}/>);
    const employeeRow = getByTestId("thanks-page-employee-row");
    const branchRow = getByTestId("thanks-page-branch-row");
    const serviceRow = getByTestId("thanks-page-service-row");
    const dateRow = getByTestId("thanks-page-date-row");
    expect(branchRow).toBeTruthy();
    expect(serviceRow).toBeTruthy();
    expect(dateRow).toBeTruthy();
    expect(employeeRow).toBeTruthy();

    expect(employeeRow.textContent).toContain(props.employee?.name);

  });

  it('should render correctly if products is undefined.', () => {
    const props = {
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const wrapper = render(<ThanksPageDumb {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should include add-ons if products is defined. Product length should be equal to product-item.', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {getAllByTestId} = render(<ThanksPageDumb {...props}/>);
    const productItems = getAllByTestId("thanks-page-product-item");
    expect(productItems.length).toEqual(props.products?.length);
  });

  it('should not include add-ons if products is empty.', () => {
    const props = {
      products: [],
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {queryAllByTestId} = render(<ThanksPageDumb {...props}/>);
    const productItems = queryAllByTestId("thanks-page-product-item");
    expect(productItems.length).toEqual(0);
  });

  it('should fire onClick if cta-primary is clicked.', () => {
    const props = {
      products: [],
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: jest.fn()
    } as ThanksPageDumbProps;
    const {getByTestId} = render(<ThanksPageDumb {...props}/>);
    const ctaPrimary = getByTestId("cta-primary");
    ctaPrimary.click();
    expect(props.onClick).toBeCalled();
  });

});
