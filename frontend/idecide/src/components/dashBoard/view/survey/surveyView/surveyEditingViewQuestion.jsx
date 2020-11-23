import React, { Component, PureComponent } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SurveyEditingViewQuestionSelectionOptions from "./surveyEditingViewQuestionSelectionOptions";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";

import update from "immutability-helper";

export default class SurveyEditingViewQuestion extends Component {
  constructor(props) {
    super(props);

    this.deleteSelectionOption = this.deleteSelectionOption.bind(this);
    this.updateSelectionOption = this.updateSelectionOption.bind(this);
    this.addNewSelectionOption = this.addNewSelectionOption.bind(this);
    this.getQuestionFromProps = this.getQuestionFromProps.bind(this);
  }

  getQuestionFromProps() {
    return this.props.survey.surveySections[this.props.sectionIndex].questions[
      this.props.questionIndex
    ];
  }

  shouldComponentUpdate(newProps) {
    return (
      newProps.survey.surveySections[newProps.sectionIndex].questions[
      newProps.questionIndex
      ] !== this.getQuestionFromProps()
    );
  }

  handleChange(eventType, event) {
    const value = event.target.value;

    const updateQ = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            questions: {
              [this.props.questionIndex]: { [eventType]: { $set: value } },
            },
          },
        },
      });
    this.props.modifySurvey(updateQ);
  }

  questionTypeSpecificFields() {
    const question = this.props.survey.surveySections[this.props.sectionIndex]
      .questions[this.props.questionIndex];
    if (question.questionType === "slider") {
      return (
        <React.Fragment>
          <TextField
            style={{ margin: "10px" }}
            label="Minimum Value"
            // helperText="The minimum value for the slider"
            value={question.sliderMinValue}
            type="number"
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sliderMinValue", event);
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            label="Maximum Value"
            // helperText="The maximum value for the slider"
            type="number"
            value={question.sliderMaxValue}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sliderMaxValue", event);
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            label="Starting Value"
            helperText="The starting value for the slider"
            type="number"
            value={question.sliderDefaultValue}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sliderDefaultValue", event);
            }}
          />
        </React.Fragment>
      );
    } else if (question.questionType === "longAnswer") {
      return (
        <TextField
          style={{ margin: "10px" }}
          label="Maximum Length"
          helperText="Maximum number of characters to allow in input"
          type="number"
          value={question.answerLength}
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
      ].includes(question.questionType)
    ) {
      // we need to include extra fields for selectionOption
      return (
        <React.Fragment>
          <PrimaryButton onClick={this.addNewSelectionOption}>
            Add new selection option
          </PrimaryButton>
          {/* add a blank array if there isn't one there already */}

          {question.selectionOptions &&
            question.selectionOptions.map((option, index) => {
              return (
                <SurveyEditingViewQuestionSelectionOptions
                  key={index}
                  survey={this.props.survey}
                  sectionIndex={this.props.sectionIndex}
                  questionIndex={this.props.questionIndex}
                  selectionOptionIndex={index}
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

    const deleteQuestOpt = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            questions: {
              [this.props.questionId]: {
                questionOptions: { $splice: [[index, 1]] },
              },
            },
          },
        },
      });
    this.props.modifySurvey(deleteQuestOpt);
  }

  updateSelectionOption(index, value) {
    // this.props.questionDataStructure.selectionOptions[index] = value;
    const updateQuestOpt = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            questions: {
              [this.props.questionIndex]: {
                selectionOptions: { [index]: { $set: value } },
              },
            },
          },
        },
      });
    this.props.modifySurvey(updateQuestOpt);
  }

  addNewSelectionOption() {
    let innerImmutabilityOperation = null;

    if (!this.getQuestionFromProps().selectionOptions) {
      //if we eg changed question type, this array might not exist yet
      innerImmutabilityOperation = {
        $merge: {
          selectionOptions: [],
        },
      };
    } else {
      //the array exists, splice in the new value
      innerImmutabilityOperation = {
        selectionOptions: { $splice: [[0, 0, ""]] },
      };
    }

    const updateSelectOpt = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            questions: {
              [this.props.questionIndex]: innerImmutabilityOperation,
            },
          },
        },
      });
    this.props.modifySurvey(updateSelectOpt);
  }

  render() {
    const question = this.getQuestionFromProps();
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <PrimaryButton
          onClick={() => {
            this.props.handleDeleteQuestion(this.props.questionIndex);
          }}
        >
          Delete this Question <DeleteForeverOutlinedIcon />
        </PrimaryButton>
        <TextField
          style={{ margin: "10px" }}
          label="Question Text"
          value={question.questionText}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("questionText", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Question Image Name (do not include '.png' or the url)"
          value={question.questionImage}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("questionImage", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Section Feedback Body Html"
          value={question.sectionFeedbackBodyHtml}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("sectionFeedbackBodyHtml", event);
          }}
        />
        {"Question Type:"}
        <Select
          variant="outlined"
          style={{ margin: "10px" }}
          value={question.questionType}
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
