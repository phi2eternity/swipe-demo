import styles from './struck-card.module.scss';
import Checkbox from '@components/buttons/checkbox/checkbox';


export interface StruckCardProps {
  content?: string;
  checked?: boolean;
  onClick?: (value: boolean) => void;
  struckPrice?: number;
  price: number;
}

const StruckCard: React.FC<StruckCardProps> = ({
                                                 content="", checked=false, onClick, struckPrice, price = 0,

                                               }: StruckCardProps) => {

  const handleClick = () => {
    onClick && onClick(!checked);
  };

  let mainClass = styles.struckCard;
  if (checked) {
    mainClass = styles.struckCard__checked;
  }


  return (<div data-testid={'struck-card'} className={mainClass} onClick={handleClick}>
    <div className={styles.struckCard__left}>

      <Checkbox checked={checked} />
      <div className='struck-card__content__text'>
        {content}
      </div>
    </div>
    <div className={styles.struckCard__right}>
      {struckPrice && <span className={styles.struckCard__struckPrice}>
            {'$' + struckPrice?.toFixed(2)}
          </span>}
      <span className={styles.struckCard__price}>
            {'$' + price?.toFixed(2)}
          </span>
    </div>

  </div>);
};

export default StruckCard;
