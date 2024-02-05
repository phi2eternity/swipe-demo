import React, { useState } from "react";
import {Box,  Drawer} from "@mui/material";

interface SelectBottomDrawerProps {
  open: boolean;
  children: React.ReactNode;
}

const SelectBottomDrawer : React.FC<SelectBottomDrawerProps> = ({
  open,
children
                      }) => {

  const list = () => (
    <Box
      sx={{
        height: "50%",
        padding: "16px",
        backgroundColor: "background.paper",
      }}
    >
      {
        children
      }
    </Box>
  );

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };


  return (
    <div data-testid={"select-bottom-drawer"} onClick={stopPropagation}>
      <Drawer
        PaperProps={{
          sx: {
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          },
        }}
        anchor="bottom"
        open={open}
        ModalProps={{
          BackdropProps: {
            invisible: true,
          },
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default SelectBottomDrawer;
