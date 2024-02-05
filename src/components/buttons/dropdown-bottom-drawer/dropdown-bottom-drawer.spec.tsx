import {act, getByTestId, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DropdownBottomDrawer,{DropdownBottomDrawerItem} from "@components/buttons/dropdown-bottom-drawer/dropdown-bottom-drawer";
import {fireEvent} from "@storybook/testing-library";

describe('DropdownBottomDrawer', () => {

  const options : DropdownBottomDrawerItem<string>[] = [
    {
      id:1,
      title:"Store 1",
      description:"Store 1 description",
      value:"Store 1"
    },
    {
      id:2,
      title:"Store 2",
      description:"Store 2 description",
      value:"Store 2"
    },
    {
      id:3,
      title:"Store 3",
      description:"Store 3 description",
      value:"Store 3"
    }
  ];

  const label = "Select Store";


  it('should render', () => {

    const container = render(<DropdownBottomDrawer options={options} label={label}/>);
    expect(container).toBeTruthy();
  });

  it("should Select All options", () => {
    const onSelect = jest.fn();
    const { getByTestId, getAllByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    const optionElements = getAllByTestId("dropdown-bottom-drawer-option-item");
    expect(optionElements.length).toBe(options.length);
    optionElements.forEach((optionElement) => {
      act(() => {
        optionElement.click();
      });
    });
  });

  it('when clicked all options and clicked continue, onSelected should return all options.', () => {

      const onSelect = jest.fn();
      const { getByTestId,getAllByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

      act(() => {
        getByTestId("dropdown-bottom-drawer").click();
      });
      const optionElements = getAllByTestId("dropdown-bottom-drawer-option-item");
      expect(optionElements.length).toBe(options.length);
      optionElements.forEach((optionElement) => {
        act(() => {
          fireEvent.click(optionElement);
        });
      });
      act(()=>{
        const continueElement = screen.getByText("Continue");
        fireEvent.click(continueElement);

      })

      expect(onSelect).toBeCalledWith(options.map((item) => item.value));
  });

  it('when clicked all options and again clicked all options and clicked continue, onSelected should return empty array.', () => {

    const onSelect = jest.fn();
    const { getByTestId,getAllByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });
    const optionElements = getAllByTestId("dropdown-bottom-drawer-option-item");
    expect(optionElements.length).toBe(options.length);
    optionElements.forEach((optionElement) => {
      act(() => {
        optionElement.click();
      });
    });
    optionElements.forEach((optionElement) => {
      act(() => {
        optionElement.click();
      });
    });
    act(()=>{
      const continueElement = screen.getByText("Continue");
      continueElement.click();
    })

    expect(onSelect).toBeCalledWith([]);

  });

  it('when clicked all options and clicked clear all, onSelected should return empty array.', () => {
    const onSelect = jest.fn();
    const { getByTestId,getAllByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    const optionElements = getAllByTestId("dropdown-bottom-drawer-option-item");
    expect(optionElements.length).toBe(options.length);
    optionElements.forEach((optionElement) => {
      act(() => {
        optionElement.click();
      });
    });

    act(()=>{
      const continueElement = screen.getByText("Clear all selections");
      continueElement.click();
    })

    expect(onSelect).toBeCalledWith([]);
  });

  it('when some options are selected and clicked clear all, onSelected should return empty array.', () => {
    const onSelect = jest.fn();
    const { getByTestId,getAllByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    const optionElements = getAllByTestId("dropdown-bottom-drawer-option-item");
    expect(optionElements.length).toBe(options.length);
    optionElements.forEach((optionElement) => {
      act(() => {
        optionElement.click();
      });
    });
    act(()=>{
      const continueElement = screen.getByText("Clear all selections");
      continueElement.click();
    })

    expect(onSelect).toBeCalledWith([]);
  });

  it('when all options are selected and clicked Select All, onSelected should return all options.', () => {
    const onSelect = jest.fn();
    const { getByTestId, getAllByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    const optionElements = getAllByTestId("dropdown-bottom-drawer-option-item");
    expect(optionElements.length).toBe(options.length);
    optionElements.forEach((optionElement) => {
      act(() => {
        optionElement.click();
      });
    });
    act(()=>{
      const continueElement = screen.getByText("Select All");
      continueElement.click();
    })

    expect(onSelect).toBeCalledWith(options.map((option) => option.value));
  });



  it('when clicked Select All, onSelected should return all options.', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    act(()=>{
      const selectAllElement = screen.getByText("Select All");
      selectAllElement.click();
    })

    expect(onSelect).toBeCalledWith(options.map((option) => option.value));
  });

  it('when none is selected and clicked Clear All, onSelected should return empty array.', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    act(()=>{
      const selectAllElement = screen.getByText("Clear all selections");
      selectAllElement.click();
    })

    expect(onSelect).toBeCalledWith([]);
  });

  it('when selectAll is false, selectAll button should not be visible.', () => {
    const onSelect = jest.fn();
    const { getByTestId, queryByText } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} selectAll={false} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    expect(queryByText("Select All")).toBeNull();
  });
  it('when clearAll is false, clearAll button should not be visible.', () => {
    const onSelect = jest.fn();
    const { getByTestId, queryByText } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} clearAll={false} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    expect(queryByText("Clear all selections")).toBeNull();
  });

  it('when selectAll and clearAll are false, selectAll and clearAll button should not be visible.', () => {
    const onSelect = jest.fn();
    const { getByTestId, queryByText } = render(<DropdownBottomDrawer onSelect={onSelect} options={options} label={label} selectAll={false} clearAll={false} />);

    act(() => {
      getByTestId("dropdown-bottom-drawer").click();
    });

    expect(queryByText("Select All")).toBeNull();
    expect(queryByText("Clear all selections")).toBeNull();
  });


});
