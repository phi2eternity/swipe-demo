import React, { useState } from 'react';
import ShakingModal from "./index";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Layouts/ShakingModal",
  component: ShakingModal,
}

const Template: Story = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <ShakingModal show={showModal}>
        <button onClick={() =>setShowModal(false)}>Close modal</button>
      </ShakingModal>
    </div>
  );
}
export const Default = Template.bind({});
Default.args = {

}
