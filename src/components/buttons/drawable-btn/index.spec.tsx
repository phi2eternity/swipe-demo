import DrawableBtn from '@components/buttons/drawable-btn/index';
import { render } from '@testing-library/react';

describe("DrawableBtn", () => {
  it('should be defined.', () => {
    expect(DrawableBtn).toBeDefined();
  });

  it('should render correctly.', () => {
    const { container } = render(<DrawableBtn text={"test"}/>);
    expect(container).toMatchSnapshot();
  });
  it('should render text correctly.', () => {
    const { getByText } = render(<DrawableBtn text={"test"}/>);
    expect(getByText("test")).toBeInTheDocument();
  });
  it('should fire onClick correctly.', () => {
    const onClick = jest.fn();
    const { getByText } = render(<DrawableBtn onClick={onClick} text={"test"}/>);
    getByText("test").click();
    expect(onClick).toHaveBeenCalled();
  });

  it('should render icon correctly.', () => {
    const { container } = render(<DrawableBtn text={"test"}/>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
