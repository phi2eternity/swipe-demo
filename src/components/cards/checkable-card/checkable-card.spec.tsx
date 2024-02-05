import CheckableCard from "@components/cards/checkable-card/checkable-card";
import {render,screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("DropdownBottomDrawer", () => {
  it("should render", () => {
    const { container } = render(<CheckableCard />);
    expect(container).toMatchSnapshot();
  });

  it('should render with title', () => {
    const title = "Title Includes Random Characters";
    // Check if title variable is visible in the snapshot

    const { container } = render(<CheckableCard title={title} />);

    expect(container).toMatchSnapshot();
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render with content', () => {
    const content = "Content Includes Random Characters";
    // Check if content variable is visible in the snapshot

    const { container } = render(<CheckableCard content={content} />);

    expect(container).toMatchSnapshot();
    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });

  it('should render with title and content', () => {
    const title = "Title Includes Random Characters";
    const content = "Content Includes Random Characters";
    // Check if title and content variables are visible in the snapshot

    const { container } = render(<CheckableCard title={title} content={content} />);

    expect(container).toMatchSnapshot();
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });

  it('should render with checked', () => {
    const checked = true;
    // Check if checked variable is visible in the snapshot

    const { container } = render(<CheckableCard checked={checked} />);

    expect(container).toMatchSnapshot();
  });


  it('should render with onClicked', () => {
    const onClicked = jest.fn();
    // Check if onClicked variable is visible in the snapshot

    const { container } = render(<CheckableCard onClicked={onClicked} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with title, content, checked and onClicked', () => {
    const title = "Title Includes Random Characters";
    const content = "Content Includes Random Characters";
    const checked = true;
    const onClicked = jest.fn();
    // Check if title, content, checked and onClicked variables are visible in the snapshot

    const { container } = render(<CheckableCard title={title} content={content} checked={checked} onClicked={onClicked} />);

    expect(container).toMatchSnapshot();
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });

  it('onClick should be fired when clicked.', () => {
    const onClicked = jest.fn();
    // Check if onClicked function is called when clicked

    const { container } = render(<CheckableCard onClicked={onClicked} />);
    const checkableCard = screen.getByTestId("checkable-card");

    checkableCard.click();
    expect(onClicked).toBeCalled();
  });



});
