import React from 'react';
import { Story, Meta } from '@storybook/react';

import ThanksPageDumb,{ThanksPageDumbProps} from './index.dumb';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';

export default {
  title: 'Pages/ThanksPage',
  component: ThanksPageDumb,
}



const Template: Story = (args: ThanksPageDumbProps) => <ThanksPageDumb {...args} />;
export const Default = Template.bind({});
Default.args = {

};

const productGenerator = new ProductMockGenerator();
const branchGenerator = new BranchMockGenerator();
const employeeGenerator = new EmployeeMockGenerator();

const products = productGenerator.generateMany(10);
const branch = branchGenerator.generateOne();
const employee = employeeGenerator.generateOne();

export const Grooming = Template.bind({});
Grooming.args = {
  products,
  date: new Date().toString(),
  service: "Grooming",
  employee,
  branch

};

export const WeWash = Template.bind({});
WeWash.args = {
  ...Grooming.args,
  employee: undefined,
  service: "We Wash"
}

const tooManyProducts = productGenerator.generateMany(1000);

export const WeWashTooManyProducts = Template.bind({});

WeWashTooManyProducts.args = {
  ...WeWash.args,
  products: tooManyProducts
}

export const GroomingTooManyProducts = Template.bind({});
GroomingTooManyProducts.args = {
  ...Grooming.args,
  products: tooManyProducts
}

