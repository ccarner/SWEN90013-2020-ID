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
    this.renderDialogs = this.renderDialogs.bind(this);
  }

  handleChange(eventType, event) {
    var value = event.target.value;

    this.props.sectionDataStructure[eventType] = value;
    this.props.refreshView();
  }

  deleteQuestion(index) {
    this.props.sectionDataStructure.questions.splice(index, 1);
    this.props.refreshView();
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

    this.props.sectionDataStructure.questions.splice(
      indexNumInsertBefore,
      0,
      blankQuestion
    );
    this.refreshView();
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
            <PrimaryButton
              onClick={() => this.props.handleDelete(this.props.sectionIndex)}
            >
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
          value={this.props.sectionView.sectionTitleText || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionTitleText", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Section Introduction Body Html "
          value={this.props.sectionView.sectionIntroductionBodyHtml || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionIntroductionBodyHtml", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Section Feedback Body Html"
          value={this.props.sectionView.sectionFeedbackBodyHtml || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionFeedbackBodyHtml", event);
          }}
        />
        {this.props.sectionView.questions.map((question, index) => {
          return (
            <Accordion key={question.questionId}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Question #{index + 1 + " : " + question.questionText}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SurveyEditingViewQuestion
                  questionDataStructure={
                    this.props.sectionDataStructure.questions[index]
                  }
                  questionIndex={index}
                  questionView={this.props.sectionView.questions[index]}
                  refreshView={this.props.refreshView}
                  handleDeleteQuestion={() => {
                    this.deleteQuestion(index);
                  }}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Card>
    );
  }
}
