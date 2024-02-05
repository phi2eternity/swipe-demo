import { CreditCardRecord } from '@domain/types/common/credit-card';
import { PageLayout } from '@components/layouts/page-layout';
import style from './index.module.scss';
import CheckableCard from '@components/cards/checkable-card/checkable-card';
import { useState } from 'react';
import CtaSecondary from '@components/buttons/cta-secondary';
import CtaCancel from '@components/buttons/cta-cancel';

export interface PaymentMethodsDumbProps {
  cards: CreditCardRecord[];
  goBack: () => void;
  onAddCard?: () => void;
  onDeleteCard?: (cardId: number) => void;
  onSelectCard?: (card: CreditCardRecord) => void;
}

const CardContainer = ({ card, onSelect,selected }: {
  card: CreditCardRecord; onSelect: (card: CreditCardRecord) => void;selected:boolean;
}) => {
  const { first6, last4, brand, exp_month, exp_year, id } = card;
  const content = `${first6}******${last4}`;
  const title = `${brand} ${exp_month}/${exp_year}`;
  return <CheckableCard checked={selected} title={title}
                                                                                            content={content}
                                                                                            onClicked={() => onSelect(card)} />
};

export const PaymentMethodsDumb = ({
                                     cards, onAddCard, onDeleteCard, onSelectCard, goBack,
                                   }: PaymentMethodsDumbProps) => {
  const [selectedCard, setSelectedCard] = useState<CreditCardRecord | null>(null);

  const handleSelectCard = (card: CreditCardRecord) => {
    setSelectedCard((selectedCard?.id === card.id) ? null : card);
    onSelectCard && onSelectCard(card);
  }

  const handleDeleteCard = () => {
    selectedCard && onDeleteCard && onDeleteCard(selectedCard.id);
  }

  const deleteButtonStyle = selectedCard ? style.invisibleButtonVisible: style.invisibleButton;

  return <PageLayout onClick={goBack} name={'Payment methods'}>
    <div className={style.paymentMethodsBody}>
      {(!cards || cards.length === 0) && <p>No credit cards available</p>}
      {cards.map(card => <CardContainer key={card.id} card={card} onSelect={handleSelectCard} selected={selectedCard?.id === card.id}/>)}

      <div className={style.paymentMethodsFooter}>
        <CtaSecondary text={"Add Card"} onClick={onAddCard}/>
        <div className={deleteButtonStyle}>
          <CtaCancel  content={"Delete card"} onClick={handleDeleteCard}/>
        </div>
      </div>
    </div>

  </PageLayout>;
};
