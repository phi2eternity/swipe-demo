import React, { useEffect } from 'react';
import { CreditCardDetails } from '@domain/types/common/credit-card-details';
import SelectCreditCardDumb from '@features/select-credit-card/index.dumb';
import { CreditCardDetailsMockGenerator } from '@domain/types/__mock__/credit-card-details-generator';
import { useCards } from '@hooks/payment/use-cards';
import { CreditCardRecord } from '@domain/types/common/credit-card';

export interface SelectCreditCardProps {
  onSelect?: (creditCard: CreditCardRecord) => void;

}




const SelectCreditCard: React.FC<SelectCreditCardProps> = ({
                                                             onSelect,
                                                           }: SelectCreditCardProps) => {



  const [open, setOpen] = React.useState(false);
  const { cards } = useCards()
  const [selected, setSelected] = React.useState<CreditCardRecord | null>(cards[0]);

  useEffect(() => {
    if ( !selected && cards.length > 0 ) {
      setSelected(cards[0])
    }
  }, [cards, selected])

  const handleSelect = (creditCard: CreditCardRecord) => {
    setSelected(creditCard);
    onSelect && onSelect(creditCard);
  };

  return <SelectCreditCardDumb onSelect={handleSelect} options={cards} selected={selected} open={open}
                               setOpen={setOpen} />;
};

export default SelectCreditCard;
