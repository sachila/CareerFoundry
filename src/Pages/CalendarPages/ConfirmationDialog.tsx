import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { ButtononContainer } from "./elements";

interface props {
  open: boolean;
  onConfirmDialogClose: (ev: any) => void;
  onYesClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  customRenderBody: () => JSX.Element;
  title: string;
}

export const ConfirmationDialog: React.FC<props> = ({
  open,
  onConfirmDialogClose,
  onYesClick,
  customRenderBody,
  title,
}) => {
  const fullWidth = true;
  const maxWidth = "sm";

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <DialogTitle style={{ backgroundColor: "#1976d2", color: "white" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        {customRenderBody()}
        <ButtononContainer>
          <Button
            color="error"
            variant="contained"
            onClick={onConfirmDialogClose}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={onYesClick}>
            Yes
          </Button>
        </ButtononContainer>
      </DialogContent>
    </Dialog>
  );
};
