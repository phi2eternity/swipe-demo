import React from 'react';
import { Meta, Story } from '@storybook/react';
import SelectCreditCardDumb, { SelectCreditCardDumbProps } from './index.dumb';
import { CreditCardDetailsMockGenerator } from '@domain/types/__mock__/credit-card-details-generator';
import { CreditCardDetails } from '@domain/types/common/credit-card-details';
import { CreditCardRecordMockGenerator } from '@domain/types/__mock__/credit-card-record.generator';
import { CreditCardRecord } from '@domain/types/common/credit-card';

export default {
  title: 'Features/SelectCreditCardDumb',
  component: SelectCreditCardDumb,

} as Meta;

const creditCardGenerator = new CreditCardRecordMockGenerator();

const creditCards = creditCardGenerator.generateMany(5);

const Template: Story<SelectCreditCardDumbProps> = (args) =>{
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CreditCardRecord | null>(args.selected ?? null);

  return <SelectCreditCardDumb onSelect={setSelected} options={args.options} selected={selected} open={open} setOpen={setOpen}/>
} ;
export const Default = Template.bind({});
Default.args = {

}

export const WithOptions = Template.bind({});
WithOptions.args = {
  options: creditCards
}

export const WithSelected = Template.bind({});
WithSelected.args = {
  ...WithOptions.args,
  selected: creditCards[0]
}
