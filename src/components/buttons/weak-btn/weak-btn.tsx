import styles from "./weak-btn.module.scss";
interface CtaPrimaryProps {
  content: string;
  onClick?: () => void;
}

const WeakBtn : React.FC<CtaPrimaryProps> = ({
                                                  content,
  onClick
                                                }) => {

  return <button data-testid={"weak-btn"} onClick={onClick} className={styles.weakBtn}>
    <label className={styles.weakBtn__label}>{content}</label>
  </button>

}

export default WeakBtn
