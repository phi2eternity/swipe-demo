import BookCard from "@components/cards/book-card/book-card";
import {render} from "@testing-library/react";

describe("BookCard", () => {
  it("should be defined", () => {
    expect(BookCard).toBeDefined();
  });

  it("should render correctly", () => {
    const wrapper = render(<BookCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with text', () => {
    const wrapper = render(<BookCard text={"Book Now"}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with onClick', () => {
    const wrapper = render(<BookCard onClick={() => console.log("clicked")}/>);
    expect(wrapper).toMatchSnapshot();

  });

  it('should render correctly with text and onClick', () => {
    const wrapper = render(<BookCard text={"Book Now"} onClick={() => console.log("clicked")}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick should not be called when book cards is clicked.', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<BookCard onClick={onClick}/>);
    const bookCard = getByTestId("book-cards");
    bookCard.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('onClick should be called when book button clicked', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<BookCard onClick={onClick}/>);
    const bookButton = getByTestId("book-btn");
    bookButton.click();
    expect(onClick).toHaveBeenCalled();
  });


});
