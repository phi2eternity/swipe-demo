import style from '@components/layouts/page-layout/index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import React from 'react';
import PageCard from '@components/cards/page-card/page-card';
import "@quicker/App.css"
import "@quicker/index.css"

export interface PageLayoutProps {
  children?: React.ReactNode;
  name?: string;
  onClick?: () => void;
}

export const PageLayout = ({ children,name,onClick}: PageLayoutProps) => {
  return  <PageCard>
    <div className={style.pageLayoutTop}>
      <BiLeftArrow onClick={onClick} />
      <h1>{name}</h1>
    </div>
    <div className={style.pageLayoutBody}>
      {children}
    </div>
  </PageCard>
}
