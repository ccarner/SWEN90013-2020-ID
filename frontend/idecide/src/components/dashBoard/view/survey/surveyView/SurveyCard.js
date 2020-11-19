//this class IS being used
import React, { useRef } from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import Editable from "../dashboardAllSurveysExpose";
import { DropzoneDialogBase } from "material-ui-dropzone";
import { saveAs } from "file-saver";
import {
  Box,
  Collapse,
  Card,
  CardContent,
  Divider,
  Grid,
  CardActions,
  CardMedia,
  Typography,
  makeStyles,
  CardHeader,
  Button,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CloseIcon from "@material-ui/icons/Close";
import ModelBoard from "../util/ModelBoard";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import IconLogo from "../../../../../images/idecide-logo.png";
import IconLogo1 from "../../../../../images/iconPrioritiesSurvey.png";
import {
  getStaticImageUrlFromName,
  editSurvey,
  DeleteSurvey,
  addImageForSurvey,
} from "../../../../../API/surveyAPI";
import SurveyOptionsButtons from "../surveyOptionsButtons";
import { getSurveyById } from "../../../../../API/surveyAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  large: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  media: {
    height: "100%",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SurveyCard = ({ surveyHeaders, editable, ...rest }) => {
  const exportSurvey = async () => {
    const fullSurvey = await getSurveyById(surveyHeaders.surveyId);
    var blob = new Blob([JSON.stringify(fullSurvey)], {
      type: "json;charset=utf-8",
    });
    saveAs(blob, surveyHeaders.surveyTitle + ".json");
  };

  const classes = useStyles();
  const [openAlert, setOpen] = React.useState(false);
  const [openGreen, setOpenGreen] = React.useState(false);
  const [error, setError] = React.useState();
  const [open, setDMOpen] = React.useState(false); //control of adding new survey
  const [values, setValues] = React.useState({
    title: surveyHeaders.surveyTitle,
    description: surveyHeaders.surveyIntroduction,
    surveyIntroductionHtmlB64: surveyHeaders.surveyIntroductionHtmlB64,
    surveyResultAlgorithm: surveyHeaders.surveyResultAlgorithm,
  });
  const [files, setFiles] = React.useState([]);
  const form = useRef(null);

  const handleOpen = () => {
    setDMOpen(true);
  };

  const handleClose = () => {
    setDMOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    fetch("https://www.idecide.icu:9012/survey/uploadImg", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const handleUploadImg = async () => {
    console.log(files);
    let formData = new FormData();
    formData.set("img", files);
    formData.set("surveyId", surveyHeaders.surveyId + "");
    console.log(formData);
    await addImageForSurvey(formData);
  };

  const ImgChange = (event) => {
    setFiles(event.target.files[0]);
  };

  const handleDelete = async () => {
    const feedBack = await DeleteSurvey(surveyHeaders.surveyId)
      .then(() => {
        window.location.href = "./dashboard/surveys";
      })
      .catch((error) => {
        setOpen(true);
        setError(error + "");
      });
    return feedBack;
  };

  const UpdateSurvey = async () => {
    if (openGreen) {
    }
    //
    var readyData = JSON.stringify({
      surveyId: surveyHeaders.surveyId,
      surveyTitle: values.title,
      surveyIntroduction: values.description,
      surveyVersion: surveyHeaders.surveyVersion,
      surveyIntroductionHtmlB64: values.surveyIntroductionHtmlB64,
      surveyResultAlgorithm: values.surveyResultAlgorithm,
    });
    handleUploadImg();
    const feedBack = await editSurvey(readyData)
      .then((data) => {
        console.log(data);
        setOpenGreen(true);
      })
      .catch((error) => {
        setOpen(true);
        setError(error + "");
        //			alert('Error from processDataAsycn() with async( When promise gets rejected ): ' + error);
      });
    return feedBack;
  };

  return (
    <div>
      <Collapse in={editable}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            style={{ width: 50 }}
            onClick={handleDelete}
          >
            <DeleteForeverOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            style={{ width: 50 }}
            onClick={handleOpen}
          >
            <EditIcon color="primary" fontSize="small" />
          </IconButton>
        </Grid>
      </Collapse>
      <Card {...rest} className={useStyles.root} align="center">
        <CardHeader title={surveyHeaders.surveyTitle} />
        <Divider />
        <Box p={1} />

        <CardMedia
          className={classes.media}
          image={
            surveyHeaders.surveyImageName
              ? getStaticImageUrlFromName(surveyHeaders.surveyImageName)
              : getStaticImageUrlFromName(surveyHeaders.surveyId + ".png")
          }
          title="Survey Image"
          style={{
            width: "30%",
            height: "30%",
          }}
        />
        <CardContent
          style={{
            height: "40%",
          }}
        >
          <Typography align="center" color="textPrimary" variant="body2">
            {surveyHeaders.surveyIntroduction.substring(0, 120) + "..."}
          </Typography>
          <SurveyOptionsButtons
            handleExportSurvey={exportSurvey}
            handleDelete={handleDelete}
            surveyId={surveyHeaders.surveyId}
          />
        </CardContent>
        {/* <Divider />
        <Box p={1}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item>
              <AccessTimeIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                {surveyHeaders.surveyVersion}
              </Typography>
            </Grid>
            <Grid item>
              <GetAppIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                {" "}
                TakenNum
              </Typography>
            </Grid>
          </Grid>
        </Box> */}
      </Card>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Survey</DialogTitle>
        <form enctype="multipart/form-data" ref={form} onSubmit={submit}>
          <DialogContent>
            <Collapse in={!openGreen}>
              <DialogContentText>
                Please input the title and description for the new Survey.
              </DialogContentText>
              <TextField
                id="outlined-multiline-flexible"
                required
                fullWidth
                value={values.title}
                onChange={handleChange("title")}
                label="Title"
                variant="outlined"
              />
              <DialogContentText>
                <Box p={1} />
                Please upload an image for this survey:
                <br />
                <input
                  type="file"
                  name="img"
                  multiple="multiple"
                  onChange={ImgChange}
                />
                <Collapse in={false}>
                  <input
                    name="surveyId"
                    multiple="multiple"
                    value={surveyHeaders.surveyId}
                  />
                </Collapse>
              </DialogContentText>
              <CardActions>
                <div />
              </CardActions>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                required
                value={values.description}
                onChange={handleChange("description")}
                rows={4}
                label="Description"
                variant="outlined"
              />
              <DialogContentText>
                Please input the html description for this survey.
              </DialogContentText>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                required
                value={values.surveyIntroductionHtmlB64}
                onChange={handleChange("surveyIntroductionHtmlB64")}
                rows={4}
                label="HTML"
                variant="outlined"
              />
              <DialogContentText>
                Please input the result algorithm for this survey.
              </DialogContentText>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                required
                value={values.surveyResultAlgorithm}
                onChange={handleChange("surveyResultAlgorithm")}
                rows={2}
                label="Algorithm"
                variant="outlined"
              />
            </Collapse>
          </DialogContent>
          <DialogContent>
            <Collapse in={openAlert}>
              <Alert severity="error">{error}</Alert>
            </Collapse>
            <Collapse in={openGreen}>
              <Alert severity="success">Update Survey Successfully!</Alert>
            </Collapse>
          </DialogContent>
          <DialogActions>
            <Collapse in={!openGreen}>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </Collapse>
            <Button onClick={UpdateSurvey} color="primary" type="submit">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog> */}
    </div>
  );
};

SurveyCard.propTypes = {
  className: PropTypes.string,
  surveyHeaders: PropTypes.object.isRequired,
};

export default SurveyCard;
