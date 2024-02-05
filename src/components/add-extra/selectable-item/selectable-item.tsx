import "./selectable-item.css";
import React from "react";

interface SelectableItemProps {
  content: string;
  checked: boolean;
  struckPrice?: number;
  price?: number;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectableItem: React.FC<SelectableItemProps> = ({
  content,
  checked,
  struckPrice,
  price,
  onChange,
}) => {
  return (
    <div
      className="selectable-item"
      onClick={() => {
        onChange((old) => {
          return !old;
        });
      }}
    ></div>
  );
};

export default SelectableItem;
