import style from "./index.module.scss";

export interface PickerCardProps {
  title?: string;
  onClick?: () => void;
  selected?: boolean;
}

const PickerCard = ({
  title = "",
  onClick,
  selected = false
                    }:PickerCardProps) => {

  let className = style.pickerCard;
  let dataTestId = "picker-card";
  if (selected) {
    className += " " + style.pickerCard__selected;
    dataTestId = "picker-card__selected";
  }


  return <div onClick={onClick} data-testid={dataTestId} className={className}>
    <h3>{title}</h3>
  </div>
}

export default PickerCard;
