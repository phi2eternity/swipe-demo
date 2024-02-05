import { AddCreditCardDumb} from '@pages/add-credit-card/index.dumb';
import { useCards } from '@hooks/payment/use-cards';
import { CreditCardInformation } from '@domain/types/common/credit-card';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@quicker/route-names';

export const AddCreditCardPage = () => {
  const { addCard } = useCards();
  const [loading, setLoading] = useLoadingOverlay();
  const navigate = useNavigate();

  const onSubmit = (card:CreditCardInformation) => {
    setLoading(true);
    addCard(card).then(()=>{
      setLoading(false);
      toast.success('Card added');
      window.history.back();
    })
      .catch(()=>{
        toast.error('Error adding card');
      })
      .finally(()=>setLoading(false));
  }

  const goBack = () => {
    window.history.back();
  }

  return <><AddCreditCardDumb onClick={goBack} onSubmit={onSubmit}/><ToastContainer/></>;
}
