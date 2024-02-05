import ClientCard from '@components/cards/client-card/index';
import { render } from '@testing-library/react';

describe('ClientCard', () => {
  it('should be defined.',()=>{
    expect(ClientCard).toBeDefined();
  });
  it('should render correctly.',()=>{
    const {container} = render(<ClientCard name="John Doe" email="johndoe@gmail.com"/>);
    expect(container).toMatchSnapshot();
  });
  it('should have a text with the name.',()=>{
    const {getByText} = render(<ClientCard name="John Doe" email="johndoe@gmail.com"/>);
    expect(getByText("John Doe")).toBeDefined();
  });
  it('should have a text with the email.',()=>{
    const {getByText} = render(<ClientCard name="John Doe" email="johndoe@gmail.com"/>);
    expect(getByText("johndoe@gmail.com")).toBeDefined();
  });

});
