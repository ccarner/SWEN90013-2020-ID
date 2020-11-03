import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SurveyEditingViewQuestionSelectionOptions from "./surveyEditingViewQuestionSelectionOptions";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class SurveyEditingViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDialogShowing: "none", // one option per dialog type, eg "delete"
    };
    this.renderDialogs = this.renderDialogs.bind(this);
    this.deleteSelectionOption = this.deleteSelectionOption.bind(this);
    this.updateSelectionOption = this.updateSelectionOption.bind(this);
    this.addNewSelectionOption = this.addNewSelectionOption.bind(this);
  }

  handleChange(eventType, event) {
    const value = event.target.value;
    this.props.questionDataStructure[eventType] = value;
    this.props.refreshView();
  }

  questionTypeSpecificFields() {
    if (this.props.questionView.questionType === "slider") {
      return (
        <React.Fragment>
          <TextField
            style={{ margin: "10px" }}
            label="Slider Maximum Value (integer)"
            value={this.props.questionView.sliderMinValue}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sliderMaxValue", event);
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            label="Slider Minimum Value (integer)"
            value={this.props.questionView.sliderMaxValue}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sliderMinValue", event);
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            label="Slider Default/Starting Value (integer)"
            value={this.props.questionView.sliderDefaultValue}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sliderDefaultValue", event);
            }}
          />
        </React.Fragment>
      );
    } else if (this.props.questionView.questionType === "longAnswer") {
      return (
        <TextField
          style={{ margin: "10px" }}
          label="Maximum Answer Length"
          value={this.props.questionView.answerLength}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("answerLength", event);
          }}
        />
      );
    } else if (
      [
        "singleSelection",
        "singleSelectionVertical",
        "multipleSelection",
        "ranking",
      ].includes(this.props.questionView.questionType)
    ) {
      // we need to include extra fields for selectionOption
      return (
        <React.Fragment>
          <PrimaryButton onClick={this.addNewSelectionOption}>
            Add new selection option
          </PrimaryButton>
          {this.props.questionView.selectionOptions.map((option, index) => {
            return (
              <SurveyEditingViewQuestionSelectionOptions
                selectionOptionIndex={index}
                selectionOptionDataStructure={
                  this.props.questionDataStructure.selectionOptions[index]
                }
                selectionOptionView={
                  this.props.questionView.selectionOptions[index]
                }
                refreshView={this.props.refreshView}
                handleDelete={this.deleteSelectionOption}
                handleUpdate={this.updateSelectionOption}
              />
            );
          })}
        </React.Fragment>
      );
    }
  }

  //need to reference the selectionoptions from here, so that we ensure we're changing the
  //references themselves: if we pass down just the string as a prop to the
  // setSelectionOption(index,newValue)

  deleteSelectionOption(index) {
    this.props.questionDataStructure.selectionOptions.splice(index, 1);
    this.props.refreshView();
  }

  updateSelectionOption(index, value) {
    this.props.questionDataStructure.selectionOptions[index] = value;
    this.props.refreshView();
  }

  addNewSelectionOption() {
    this.props.questionDataStructure.selectionOptions.splice(0, 0, "");
    this.props.refreshView();
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
          <DialogTitle>{"Confirm Question Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this question?
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
              onClick={() =>
                this.props.handleDeleteQuestion(this.props.questionIndex)
              }
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.renderDialogs()}
        <PrimaryButton
          onClick={() => {
            this.setState({ currentDialogShowing: "delete" });
          }}
        >
          Delete this Question <DeleteForeverOutlinedIcon />
        </PrimaryButton>
        <TextField
          style={{ margin: "10px" }}
          label="Question Text"
          value={this.props.questionView.questionText}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("questionText", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Question Image Name (do not include '.png' or the url)"
          value={this.props.questionView.questionImage}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("questionImage", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Section Feedback Body Html"
          value={this.props.questionView.sectionFeedbackBodyHtml}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionFeedbackBodyHtml", event);
          }}
        />
        {"Question Type:"}
        <Select
          style={{ margin: "10px" }}
          value={this.props.questionView.questionType}
          label="Question Type"
          onChange={(event) => {
            this.handleChange("questionType", event);
          }}
        >
          <MenuItem value={"longAnswer"}>Long Answer (text area)</MenuItem>
          <MenuItem value={"singleSelection"}>
            Single Selection Horizontal (multichoice)
          </MenuItem>
          <MenuItem value={"singleSelectionVertical"}>
            Single Selection Vertical (multichoice)
          </MenuItem>
          <MenuItem value={"multipleSelection"}>
            Multiple Selection (checkboxes)
          </MenuItem>
          <MenuItem value={"slider"}>Slider</MenuItem>
          <MenuItem value={"yesOrNo"}>Yes/No</MenuItem>
          <MenuItem value={"ranking"}>Ranking (drag and reorder)</MenuItem>
        </Select>

        {this.questionTypeSpecificFields()}
      </div>
    );
  }
}
