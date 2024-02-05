import { useCards } from '@hooks/payment/use-cards';
import { PaymentMethodsDumb } from '@pages/payment-methods/index.dumb';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@quicker/route-names';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';


export const PaymentMethodsPage = () => {
  const { cards, deleteCard } = useCards();
  const navigate = useNavigate();
  const [loading,setLoading] = useLoadingOverlay();

  const goToAddCard = () => {
    navigate(RouteNames.ADD_CARD);
  };
  const goToBack = () => {
    navigate(RouteNames.MY_ACCOUNT);
  };

  const handleDeleteCard = (cardId: number) => {
    setLoading(true);
    deleteCard(cardId).finally(() => {
      setLoading(false);
    });
  }


  return <PaymentMethodsDumb cards={cards} goBack={goToBack} onAddCard={goToAddCard}
                             onDeleteCard={handleDeleteCard} />;

};
