import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import PrimaryButton from "../components/reusableComponents/PrimaryButton";

import { getValue } from "../API/keyValueAPI";

export default function GetHelpContent(props) {
  const [contentHtml, setContentHtml] = useState("");

  const fetchHtml = async () => {
    const html = await getValue("getHelpMessage");
    setContentHtml(html);
    console.log("html was", html);
  };

  useEffect(() => {
    if (!contentHtml) {
      fetchHtml();
    }
  }, [contentHtml]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="max-width-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Get Help</DialogTitle>
      <Divider />
      <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </DialogContent>

      <DialogActions>
        <PrimaryButton onClick={props.handleClose}>Close</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
