import style from './index.module.scss';

export interface ListItemCardProps {
  label?: string;
  value?: string;
}


export const ListItemCard = ({label,value}:ListItemCardProps) => {
  return <div data-testid={"list-item-card"} className={style.listItemCard}>
    <p>{label}</p>
    <p>{value}</p>
  </div>;
}

