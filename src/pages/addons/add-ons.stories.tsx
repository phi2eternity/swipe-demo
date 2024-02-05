import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import "../../App.css";
import AddOnsDumb from '@pages/addons/add-ons.dumb';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';

export default {
  title: "Pages/Add-ons Page",
  component: AddOnsDumb,
} as ComponentMeta<typeof AddOnsDumb>;



const Template: ComponentStory<typeof AddOnsDumb> = (args) => {

  const [products, setProducts] = React.useState(args.products || []);
  const price = (args.price || 0) + products.reduce((acc, product) => acc + product.cost, 0);


  return  <AddOnsDumb
    products={products}
    allProducts={args.allProducts}
    setProducts={setProducts}
    price={price}

  />
};

Template.args = {};

const generator = new ProductMockGenerator();



export const Default = Template.bind({});

export const Price = Template.bind({
});
Price.args = {
  price:15.99
}

export const WithProducts = Template.bind({
  products: generator.generateMany(20),
});

WithProducts.args = {
  allProducts: generator.generateMany(20),
}

export const Filled = Template.bind({
});

Filled.args = {
  price:15.99,
  allProducts: generator.generateMany(20),


}
