import { PaymentMethodsDumb } from '@pages/payment-methods/index.dumb';
import { act, render } from '@testing-library/react';
import { CreditCardRecord } from '@domain/types/common/credit-card';
import { CreditCardRecordMockGenerator } from '@domain/types/__mock__/credit-card-record.generator';

describe('PaymentMethodsDumb', () => {
  let goBack: () => void;
  let onAddCard: () => void;
  let onDeleteCard: (cardId: number) => void;
  let onSelectCard: (card: CreditCardRecord) => void;
  let cards : CreditCardRecord[];
  const generator = new CreditCardRecordMockGenerator();
  beforeEach(()=>{
    goBack = jest.fn();
    onAddCard = jest.fn();
    onDeleteCard = jest.fn();
    onSelectCard = jest.fn();
    cards = generator.generateMany(5);
    jest.clearAllMocks();

  });

  it('should render successfully', () => {
    const { baseElement } = render(<PaymentMethodsDumb goBack={goBack} cards={cards}/>);
    expect(baseElement).toBeTruthy();
  });
  it('should not render a checkable card if there are no credit cards', () => {
    const { queryByTestId } = render(<PaymentMethodsDumb goBack={goBack} cards={[]}/>);
    const checkableCard = queryByTestId('checkable-card');
    expect(checkableCard).toBeFalsy();
  });
  it('should render a checkable card for each credit card', () => {
    const { getAllByTestId } = render(<PaymentMethodsDumb goBack={goBack} cards={cards}/>);
    const checkableCards = getAllByTestId('checkable-card');
    expect(checkableCards.length).toBe(cards.length);
  });
  it('if no card is selected, onDeleteCard should not be fired', () => {
    const { getByText } = render(<PaymentMethodsDumb goBack={goBack} cards={cards} onDeleteCard={onDeleteCard}/>);
    const deleteButton = getByText('Delete card');
    deleteButton.click();
    expect(onDeleteCard).not.toBeCalled();
  });
  it('if a card is selected, onDeleteCard should be fired with corresponding card', () => {
    const { getByText,getAllByTestId } = render(<PaymentMethodsDumb goBack={goBack} cards={cards} onDeleteCard={onDeleteCard}/>);
    const checkableCards = getAllByTestId('checkable-card');
    const deleteButton = getByText('Delete card');
    act(()=>checkableCards[0].click());
    deleteButton.click();
    expect(onDeleteCard).toBeCalled();
    expect(onDeleteCard).toBeCalledWith(cards[0].id);
  });
  it('if add card button is clicked, onAddCard should be fired', () => {
    const { getByText } = render(<PaymentMethodsDumb goBack={goBack} cards={cards} onAddCard={onAddCard}/>);
    const addCardButton = getByText('Add Card');
    addCardButton.click();
    expect(onAddCard).toBeCalled();
  });
  it('if a card is selected, onSelectCard should be fired with corresponding card', () => {
    const { getByText,getAllByTestId } = render(<PaymentMethodsDumb goBack={goBack} cards={cards} onSelectCard={onSelectCard}/>);
    const checkableCards = getAllByTestId('checkable-card');
    act(()=>checkableCards[0].click());
    expect(onSelectCard).toBeCalled();
    expect(onSelectCard).toBeCalledWith(cards[0]);
  });

});
