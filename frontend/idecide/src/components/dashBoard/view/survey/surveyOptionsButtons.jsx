import React, { useState, useEffect, createContext } from "react";
import SecondaryButton from "../../../reusableComponents/SecondaryButton";
import PrimaryButton from "../../../reusableComponents/PrimaryButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import GetAppIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

export default function SurveyOptionsButtons(props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteConfirmationDialog = () => {
    return (
      <Dialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
        aria-labelledby="max-width-dialog-title"
        //	fullWidth="md"
        maxWidth="md"
        style={{ zIndex: 999 }}
      >
        <DialogTitle>Delete Survey</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this survey?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SecondaryButton
            onClick={props.handleDelete}
            style={{ color: "red", borderColor: "red" }}
          >
            Confirm Delete
          </SecondaryButton>
          <SecondaryButton
            onClick={() => {
              setShowDeleteDialog(false);
            }}
            color="primary"
          >
            Cancel
          </SecondaryButton>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      {showDeleteDialog ? deleteConfirmationDialog() : ""}
      <PrimaryButton
        size="small"
        onClick={() => {
          // window.location.replace('/dashboard/surveyId=' + item.surveyId);
          window.location.href = "/dashboard/surveyId=" + props.surveyId;
        }}
      >
        <EditIcon />
        Edit...
      </PrimaryButton>
      <SecondaryButton size="small" onClick={props.handleExportSurvey}>
        <Tooltip title="Download a copy">
          <GetAppIcon />
        </Tooltip>
      </SecondaryButton>
      <SecondaryButton
        size="small"
        style={{ color: "red", borderColor: "red" }}
        onClick={() => {
          setShowDeleteDialog(true);
        }}
      >
        <Tooltip title="Delete Forever">
          <DeleteForeverIcon />
        </Tooltip>
      </SecondaryButton>
    </React.Fragment>
  );
}
