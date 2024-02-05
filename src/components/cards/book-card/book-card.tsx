import styles from './book-card.module.scss';
import BookBtn from "@components/buttons/book-btn/book-btn";
interface BookCardProps {
  text?: string;
  onClick?: () => void;

}

const BookCard = ({text, onClick}: BookCardProps) => {



  return <div data-testid={"book-cards"} className={styles.bookCard} >
    {text}
    <BookBtn onClick={onClick} text={"Book Now"}/>
  </div>
};

export default BookCard;
