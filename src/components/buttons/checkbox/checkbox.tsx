import styles from "./checkbox.module.scss";
interface CheckboxProps {
  checked: boolean;
  onChecked?: (state: boolean) => void;
}
import DoneIcon from '@mui/icons-material/Done';

const Checkbox : React.FC<CheckboxProps> = ({
  checked,
  onChecked,
}) => {
  const handleCheck = () => {
    onChecked && onChecked(!checked);
  };

  return <div data-testid={"checkbox"} onClick={handleCheck} className={checked ? styles.checkbox__checked : styles.checkbox}>
    <input type="checkbox"  onChange={handleCheck} checked={checked}/>
    {checked && <DoneIcon />  }
  </div>
}

export default Checkbox
