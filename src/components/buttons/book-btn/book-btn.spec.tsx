import BookButton from "@components/buttons/book-btn/book-btn";
import {fireEvent, render} from "@testing-library/react";

describe("BookButton", () => {
  it("should be defined", () => {
    expect(BookButton).toBeDefined();
  });

  it("should render correctly", () => {
    const wrapper = render(<BookButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with text', () => {
    const wrapper = render(<BookButton text={"Book Now"}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with onClick', () => {
    const wrapper = render(<BookButton onClick={() => console.log("clicked")}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with text and onClick', () => {
    const wrapper = render(<BookButton text={"Book Now"} onClick={() => console.log("clicked")}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick should not be called when book button is clicked.', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<BookButton onClick={onClick}/>);
    const bookButton = getByTestId("book-btn");
    bookButton.click();
    expect(onClick).toHaveBeenCalled();
  });


});
