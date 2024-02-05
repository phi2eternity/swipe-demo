import styles from './book-btn.module.scss';

interface BookBtnProps {
  text?: string;
  onClick?: () => void;
}

const BookBtn = ({text, onClick}: BookBtnProps) => (
  <div data-testid={"book-btn"} className={styles.bookBtn} onClick={onClick}>
    {text}
  </div>
);
export default BookBtn;
