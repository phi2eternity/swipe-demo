import React from 'react';
import ThanksPageDumb from '@pages/thanks/index.dumb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OrderActions } from '@quicker/store/order-slice';
import { RouteNames } from '@quicker/route-names';

const ThanksPage = () => {
  const { products, date, service, employee, branch } = useSelector(
    (state: any) => ({
      products: state.order.products,
      date: state.order.start,
      service: state.order.orderType,
      employee: state.order.groomer,
      branch: state.order.branch
    })
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(OrderActions.resetOrder());
    navigate(RouteNames.HOME);

  }

  return  <ThanksPageDumb products={products} service={service} onClick={handleClick} employee={employee} date={date} branch={branch}/>
}


export default ThanksPage;
