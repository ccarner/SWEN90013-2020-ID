import React, { Component } from "react";
import { Typography, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SurveyEditingViewQuestion from "./surveyEditingViewQuestion";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class SurveyEditingViewSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDialogShowing: "none", // one option per dialog type, eg "delete"
    };
    //filter out and grab the section we're actually working on.
    this.handleDeleteSection = this.handleDeleteSection.bind(this);
    this.renderDialogs = this.renderDialogs.bind(this);
  }

  handleChange(eventType, event) {
    var value = event.target.value;
    this.props.updateSurvey((prevState) => {
      let updatedSurvey = prevState.survey;
      updatedSurvey.surveySections[this.props.sectionIndex][eventType] = value;
      return { survey: updatedSurvey };
    });
  }

  //need to do shallow copies of state components so that it has no side effects on prevState, eg can't use splicing etc
  //else react will be upset with us.
  handleDeleteSection() {
    this.props.updateSurvey((prevState) => {
      var newSurveySections = [...prevState.survey.surveySections];
      newSurveySections.splice(this.props.sectionIndex, 1);
      var newSurvey = { ...prevState.survey };
      newSurvey.surveySections = newSurveySections;
      return { survey: newSurvey };
    });
  }

  addNewQuestion(indexNumInsertBefore) {
    //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
    var d = new Date();
    var n = d.getMilliseconds();

    const blankQuestion = {
      questionId: n,
      questionText: "",
      questionType: "yesOrNo",
      questionImage: "",
    };

    //insert blank section into array (delete 0 items== insert)
    //need to duplicate array, since splice mutates array, and react doesn't like that
    this.setState((prevState) => {
      var newSurvey = { ...prevState.survey };
      var newSurveySections = [...prevState.survey.surveySections];
      newSurveyQuestions = [
        this.prevState.surveySections[this.props.sectionIndex],
      ];
      newSurveySections.splice(indexNumInsertBefore, 0, blankQuestion);
      var newSurvey = { ...prevState.survey };
      newSurvey.surveySections = newSurveySections;
      return { survey: newSurvey };
    });
  }

  renderDialogs() {
    if (this.state.currentDialogShowing === "delete") {
      return (
        <Dialog
          open={this.state.currentDialogShowing === "delete"}
          onClose={() => {
            this.setState({ currentDialogShowing: "none" });
          }}
        >
          <DialogTitle>{"Confirm Section Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this entire section and all
              associated questions?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PrimaryButton
              onClick={() => {
                this.setState({ currentDialogShowing: "none" });
              }}
              autoFocus
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton onClick={this.handleDeleteSection}>
              Confirm Delete <DeleteForeverOutlinedIcon />
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      );
    }
  }

  render() {
    return (
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          margin: "5vh",
        }}
      >
        {this.renderDialogs()}
        <Typography variant="h2" gutterBottom>
          Survey Section #{this.props.sectionIndex + 1}
        </Typography>
        <PrimaryButton
          onClick={() => {
            this.setState({ currentDialogShowing: "delete" });
          }}
        >
          Delete this section <DeleteForeverOutlinedIcon />
        </PrimaryButton>

        <TextField
          style={{ margin: "10px" }}
          label="Section Title Text"
          value={this.props.section.sectionTitleText}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionTitleText", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Section Introduction Body Html "
          value={this.props.section.sectionIntroductionBodyHtml}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionIntroductionBodyHtml", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Section Feedback Body Html"
          value={this.props.section.sectionFeedbackBodyHtml}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionFeedbackBodyHtml", event);
          }}
        />
        {this.props.section.questions.map((question, index) => {
          return (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Question #{index + 1 + " : " + question.questionText}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SurveyEditingViewQuestion
                  question={question}
                  questionIndex={index}
                  sectionIndex={this.props.sectionIndex}
                  updateSurvey={this.props.updateSurvey}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Card>
    );
  }
}
