import PageCard from '@components/cards/page-card/page-card';
import logoSrc from "../../assets/logo.png";
import style from "./index.module.scss";
import ProfileBtn from '@components/buttons/profile-btn';

import Dogo from "@assets/dogo.svg";
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { ProductEntity } from '@domain/types/common/product';
import { BranchEntity } from '@domain/types/common/branch';
import React, { lazy } from 'react';
import { EmployeeEntity } from '@domain/types/common/employee';

export interface ThanksPageDumbProps {
  products?: ProductEntity[];
  date?: string;
  service?: string;
  employee?: EmployeeEntity;
  branch?: BranchEntity;
  onClick?: () => void;
}

const ThanksPageDumb : React.FC<ThanksPageDumbProps> = ({
  products,
  date,
  service,
  employee,
  branch,
  onClick
}:ThanksPageDumbProps ) => {

  // 03.03.2023 Thu - 09:00
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }) : undefined;

  return <PageCard>
    <div className={style.thanksPage}>
      <div className={style.thanksPageHeader}>
        <img alt="scrubbers logo" className={style.scrubbersLogo} src={logoSrc}></img>
        <ProfileBtn/>
      </div>
      <div className={style.thanksPageColumn}>
        <img src={Dogo}/>
        <h2>Thank you</h2>
        <h3>Reservation is confirmed!</h3>
        <CtaPrimary onClick={onClick} content={"Go to home"}/>

      </div>

    </div>
    <div  className={style.appointmentDetails}>
      <div className={style.appointmentDetailsColumn}>
        <div data-testid={"thanks-page-date-row"} className={style.appointmentDetailsColumn__Detail}>
          <p>Date - Time</p>
          <p>{formattedDate ?? " "}</p>
        </div>
        <div  data-testid={"thanks-page-service-row"} className={style.appointmentDetailsColumn__Detail}>
          <p>Service</p>
          <p>{service ?? ""}</p>
        </div>
        {employee &&
          <div data-testid={"thanks-page-employee-row"}  className={style.appointmentDetailsColumn__Detail}>
            <p>Groomer</p>
            <p>{employee.name}</p>
          </div>
        }
        <div data-testid={"thanks-page-branch-row"}  className={style.appointmentDetailsColumn__Detail}>
          <p>Location</p>
          <p>{branch?.name ?? ""}</p>
        </div>
      </div>
      <div className={style.appointmentDetailsDivider}/>
      <div className={style.appointmentDetailsThanks}>
        <p>Thanks for selecting Scrubbers for your
          pets grooming needs!</p>
        <p>
          Appointments need to be cancelled/changed at a minimum of 24 hours in advance from your appointment time to avoid being charged the full price of the service.
        </p>
      </div>


    <div className={style.appointmentDetailsDivider}/>
      <div className={style.appointmentDetailsExtra}>
      <p>Add-ons</p>
        {
          (products == undefined || products.length === 0) ? <p>No add-ons selected</p> : (products as ProductEntity[]).map((product) => {
            return<p key={product.id} data-testid={"thanks-page-product-item"} >{product.name}  <span>{product.category}</span></p>

          })
        }
      </div>

  </div>
  <div className={style.mountains} />

  </PageCard>
}

export default ThanksPageDumb;
