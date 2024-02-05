import styles from "./index.module.scss";
export interface CtaPrimaryProps {
  content: string;
  loading?: boolean;
  onClick?: () => void;
}

const CtaCancel : React.FC<CtaPrimaryProps> = ({
  content,
  onClick,
  loading = false
                    }) => {

  return <button type={"submit"} data-testid={"cta-cancel"} onClick={onClick} className={ loading ? styles.ctaPrimary__loading : styles.ctaPrimary   }>
    <label className={styles.ctaPrimary__label}>{content}</label>
  </button>

}

export default CtaCancel
