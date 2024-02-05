import React from 'react';
import style from './page-card.module.scss';
interface PageCardProps {
  children?: React.ReactNode;
  className?: string;
}

const PageCard: React.FC<PageCardProps> = ({children = null,className = ""}:PageCardProps) => {
  return <div data-testid={"page-card"} className={style.page + " " + className}>
    {children}
  </div>;
}

export default PageCard;
