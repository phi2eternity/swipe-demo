import styles from "./checkable-card.module.scss";
import Checkbox from "@components/buttons/checkbox/checkbox";

export interface CheckableCardProps {
  title?: string;
  content?: string;
  checked?: boolean;
  onClicked?: (state: boolean) => void;
}

const CheckableCard : React.FC<CheckableCardProps> = ({
  title,
  content,
  checked = false,
  onClicked

}) => {

  const handleCheck = () => {
    onClicked && onClicked(!checked);
  }
  return <div  data-testid={"checkable-card"} onClick={handleCheck} className={(checked) ? styles.checkableCard__checked : styles.checkableCard}>
    <div className={  styles.checkableCard__left} >
      {title && <div className={(checked) ? styles.checkableCard__title__checked : styles.checkableCard__title}>{title}</div>}
      {content && <div className={styles.checkableCard__content}>{content}</div>}
    </div>
    <div className={styles.checkableCard__right}>
      <Checkbox checked={checked} onChecked={onClicked} />
    </div>

  </div>
}

export default CheckableCard
