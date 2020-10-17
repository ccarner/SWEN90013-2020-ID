import { useToasts } from "react-toast-notifications";
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
import Loading from "../../../util/loading";

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
  const { addToast } = useToasts();

  const classes = useStyles();
  const [editable, setEditable] = useState(false);
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

  const [newSurveyAttributes, setNewSurveyAttributes] = React.useState({
    title: "",
    descrpition: "",
  });
  const [uploadedSurveyFile, setUploadedSurveyFile] = useState("");

  const handleChange = (prop) => (event) => {
    setNewSurveyAttributes({
      ...newSurveyAttributes,
      [prop]: event.target.value,
    });
  };

  const handleEdit = () => {
    setEditable((pre) => !pre);
  };

  //takes a STRINGIFIED json (ie need to verify its proper json already)
  //and pops toasts if there is an issue with upload.
  const uploadSurveyPopToasts = (surveyFileString) => {
    try {
      //don't need to parse / unparse, leave it as stringified json
      AddNewSurvey(surveyFileString)
        .then((data) => {
          console.log("data received", data);
        })
        .catch((err) => {
          console.error("error when uploading", err);
          addToast("Failure to upload" + err, {
            appearance: "error",
          });
        });
      addToast("uploaded successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setOpenUploadSurveyDialog(false);
      setOpenCreateSurveyDialog(false);
    } catch (err) {
      addToast("Failure to upload" + err, {
        appearance: "error",
      });
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
    var surveyFileString = JSON.stringify({
      surveyId: Array.from(data).length + 1 + "",
      surveyTitle: newSurveyAttributes.title,
      surveyIntroduction: newSurveyAttributes.description,
      surveyVersion: "",
      surveySections: [],
    });

    uploadSurveyPopToasts(surveyFileString);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllSurveys();

      setData(result.data);
      setIsLoading(false);
      //		console.log(data);
      //		console.log(isLoading);
    };

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
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button onClick={handleEdit} className={clsx(classes.button)}>
              <EditIcon />
              Edit
            </Button>
          </Grid>
          <Grid container spacing={2}>
            <Editable.Provider value={editable}>
              {console.log(data) ||
                data.map((item) => (
                  <Grid item lg={4} md={6} xs={12} key={item.surveyId}>
                    <SurveyCard
                      style={{ height: 400 }}
                      key={item.surveyId}
                      product={item}
                      editable={editable}
                      useStyles
                      onClick={() => {
                        // window.location.replace('/dashboard/surveyId=' + item.surveyId);
                        window.location.href =
                          "/dashboard/surveyId=" + item.surveyId;
                      }}
                    />
                  </Grid>
                ))}
            </Editable.Provider>
            <Grid item xs={12}>
              <Collapse in={editable}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setOpenCreateSurveyDialog(true);
                  }}
                >
                  Create New Survey
                </Button>
              </Collapse>
              <Collapse in={editable}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setOpenUploadSurveyDialog(true);
                  }}
                >
                  Upload Survey File
                </Button>
              </Collapse>
            </Grid>
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

          <Dialog
            open={isOpenCreateSurveyDialog}
            onClose={() => {
              setOpenCreateSurveyDialog(false);
            }}
            aria-labelledby="max-width-dialog-title"
            maxWidth="md"
            style={{ zIndex: 999 }}
          >
            <DialogTitle id="form-dialog-title">Survey</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please input the title and description for the new Survey.
              </DialogContentText>
              <TextField
                id="outlined-multiline-flexible"
                required
                fullWidth
                value={newSurveyAttributes.title}
                onChange={handleChange("title")}
                label="Title"
                variant="outlined"
              />
              <DialogContentText>
                value={newSurveyAttributes.title}
              </DialogContentText>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                required
                value={newSurveyAttributes.description}
                onChange={handleChange("descrpition")}
                rows={4}
                label="Description"
                variant="outlined"
              />
            </DialogContent>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button onClick={AddNewSurveys} color="primary">
                Confirm
              </Button>
              <Button
                onClick={() => {
                  setOpenCreateSurveyDialog(false);
                }}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </div>
  );
}
