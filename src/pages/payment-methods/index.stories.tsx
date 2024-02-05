import { PaymentMethodsDumb, PaymentMethodsDumbProps } from '@pages/payment-methods/index.dumb';
import { Meta, Story } from '@storybook/react';

import { CreditCardRecordMockGenerator} from '@domain/types/__mock__/credit-card-record.generator';

export default {
  title: 'Pages/PaymentMethods',
  component: PaymentMethodsDumb,
}

const Template: Story<PaymentMethodsDumbProps> = (args) => <PaymentMethodsDumb {...args} />;
const generator = new CreditCardRecordMockGenerator();



export const Empty = Template.bind({});
Empty.args = {
  cards:[]
}

export const WithCards = Template.bind({});
WithCards.args = {
  cards: generator.generateMany(3)
}


