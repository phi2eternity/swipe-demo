import CtaPrimary from "@components/buttons/cta-primary/cta-primary";
import {render,screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('CtaPrimary', () => {
  it('should render', () => {
    const { container } = render(<CtaPrimary content="Button" />);
    expect(container).toMatchSnapshot();
  });
  it('should render with content', () => {
    const content = "Button";
    // Check if content variable is visible in the snapshot

    const { container } = render(<CtaPrimary content={content} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with onClick', () => {
    const onClick = jest.fn();
    // Check if onClick variable is visible in the snapshot

    const { container } = render(<CtaPrimary content="Button" onClick={onClick} />);

    expect(container).toMatchSnapshot();
  });

  it('onClick should be fired when clicked.', () => {
    const onClick = jest.fn();
    // Check if onClick function is called when clicked

    const { container } = render(<CtaPrimary content="Button" onClick={onClick} />);
    const button = screen.getByTestId("cta-primary");

    button.click();
    expect(onClick).toBeCalled();
  });

  it('content should be visible', () => {
    const content = "Button";
    // Check if content variable is visible in the snapshot

    const { container } = render(<CtaPrimary content={content} />);

    expect(container).toMatchSnapshot();
    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });


});
