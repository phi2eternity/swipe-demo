import React, { useEffect } from 'react';
import '../../App.css';
import useAllProducts from '@hooks/use-all-products';
import AddOnsDumb from '@pages/addons/add-ons.dumb';
import { ProductEntity } from '@domain/types/common/product';
import ServiceHeader from '@features/service-header/service-header';
import PageCard from '@components/cards/page-card/page-card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BookingJourney from '@components/journeys/booking-journey';
import { OrderActions } from '@quicker/store/order-slice';


const AddOnsPage: React.FC = () => {
  const allProducts = useAllProducts();
  const [products, setProducts] = React.useState<ProductEntity[]>([]);


  const price = 250 + products.reduce((acc, product) => acc + product.cost, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNextBooking = () => {
    navigate('/payment');

  }
  const handleSelectProduct = (products: ProductEntity[]) => {
    setProducts(products);
    dispatch(OrderActions.setOrder({products}));

  }

  const {
    selectedProducts
  } = useSelector((state: any) => {
    return {
      selectedProducts: state.order.products
    };
  });

  useEffect(() => {
    setProducts(selectedProducts);
  },[]);


  return <BookingJourney selectable={false}>
   <AddOnsDumb onNextBooking={handleNextBooking} products={products} allProducts={allProducts} price={price} setProducts={handleSelectProduct} />
  </BookingJourney>
};

export default AddOnsPage;
