import React, { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SurveyCard from "./surveyView/SurveyCard";
import clsx from "clsx";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Collapse,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from "react-router-dom";
import { getAllSurveys, AddNewSurvey } from "../../../../API/surveyAPI";
import SurveyOptionsButtons from "./surveyOptionsButtons";
import PrimaryButtonContrast from "../../../reusableComponents/primaryButtonContrast";
import BackupIcon from "@material-ui/icons/Backup";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

import { toast } from "react-toastify";
import Loading from "./../../../reusableComponents/loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    //	color: theme.palette.text.secondary,
  },
  button: {
    background: "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
    border: 0,
    borderRadius: 20,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: 170,
    [theme.breakpoints.only("xs")]: {
      width: 20,
    },
    height: 40,
    padding: "0 30px",
  },
}));

export const CountContext = createContext();
export const Editable = createContext();

export default function DashboardAllSurveysExpose() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  //creating a new survey dialog open?
  const [isOpenCreateSurveyDialog, setOpenCreateSurveyDialog] = React.useState(
    false
  );

  //uploading a new survey dialog open?
  const [isOpenUploadSurveyDialog, setOpenUploadSurveyDialog] = React.useState(
    false
  );

  const [uploadedSurveyFile, setUploadedSurveyFile] = useState("");

  //takes a STRINGIFIED json (ie need to verify its proper json already)
  //and pops toasts if there is an issue with upload.
  const uploadSurveyPopToasts = (surveyFileString) => {
    try {
      //don't need to parse / unparse, leave it as stringified json
      AddNewSurvey(surveyFileString)
        .then((result) => {
          if (result.data.flag) {
            toast("Uploaded successfully");
            fetchData();
          } else {
            toast("Error :" + result.data.message);
          }
        })
        .catch((err) => {
          console.error("error when uploading", err);
          toast("Failure to upload" + err);
        });

      setOpenUploadSurveyDialog(false);
    } catch (err) {
      toast("Failure to upload" + err);
      console.error("Error when uploading file", err);
    }
  };

  //transform a file to text then upload it
  const handleUploadedSurvey = (file) => {
    file.text().then((fileText) => {
      uploadSurveyPopToasts(fileText);
    });
  };

  const AddNewSurveys = async () => {
    var d = new Date();
    var n = d.getMilliseconds();
    var surveyFileString = JSON.stringify({
      surveyId: n.toString(),
      surveyIntroduction: "Write an introduction here",
      surveyTitle: "New Survey",
      surveySections: [],
    });

    uploadSurveyPopToasts(surveyFileString);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getAllSurveys();
    setData(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.paper}>
      {isLoading ? (
        <Loading />
      ) : (
          <Grid
            container
            spacing={5}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <PrimaryButtonContrast
                onClick={() => {
                  AddNewSurveys();
                }}
              >
                <NoteAddIcon style={{ paddingRight: "5px", color: "#8973E6" }} />{" "}
              Create New Survey
            </PrimaryButtonContrast>
              <PrimaryButtonContrast
                onClick={() => {
                  setOpenUploadSurveyDialog(true);
                }}
              >
                <BackupIcon style={{ paddingRight: "5px", color: "#8973E6" }} />{" "}
              Upload Survey File
            </PrimaryButtonContrast>
            </Grid>

            <Grid container spacing={2}>
              {data.map((item) => (
                <Grid item lg={4} md={6} xs={12} key={item.surveyId}>
                  <SurveyCard
                    style={{ height: 400 }}
                    key={item.surveyId}
                    surveyHeaders={item}
                    useStyles
                  />
                </Grid>
              ))}
            </Grid>

            <Dialog
              open={isOpenUploadSurveyDialog}
              onClose={() => {
                setOpenUploadSurveyDialog(false);
              }}
              aria-labelledby="max-width-dialog-title"
              //	fullWidth="md"
              maxWidth="md"
              style={{ zIndex: 999 }}
            >
              <DialogTitle id="form-dialog-title">Survey</DialogTitle>
              <DialogContent>
                <DialogContentText>Upload a survey file</DialogContentText>
                <input
                  type="file"
                  name="uploadedSurvey"
                  accept=".json"
                  onChange={(event) => {
                    setUploadedSurveyFile(event.target.files[0]);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleUploadedSurvey(uploadedSurveyFile);
                  }}
                  color="primary"
                >
                  Upload
              </Button>
                <Button
                  onClick={() => {
                    setOpenUploadSurveyDialog(false);
                  }}
                  color="primary"
                >
                  Close
              </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        )}
    </div>
  );
}
