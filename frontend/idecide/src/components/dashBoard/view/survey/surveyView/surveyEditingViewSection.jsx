import React, { Component, PureComponent } from "react";
import { Typography, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SurveyEditingViewQuestion from "./surveyEditingViewQuestion";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import update from "immutability-helper";
import EditAlgorithmView from "./algorithmView/editAlgorithmView";

export default class SurveyEditingViewSection extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return (
      this.props.survey.surveySections[this.props.sectionIndex] !==
      newProps.survey.surveySections[this.props.sectionIndex]
    );
  }

  handleChange(eventType, event) {
    var value = event.target.value;
    // this.props.sectionDataStructure[eventType] = value;

    const updateSection = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            [eventType]: { $set: value },
          },
        },
      });

    this.props.modifySurvey(updateSection);
  }

  deleteQuestion(index) {
    // this.props.sectionDataStructure.questions.splice(index, 1);

    const deleteQ = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: { questions: { $splice: [[index, 1]] } },
        },
      });
    this.props.modifySurvey(deleteQ);
  }

  addNewQuestion(indexNumInsertBefore) {
    //TODO: need to add an algorithm to choose a new questionID automatically when creating a new section
    var d = new Date();
    var n = d.getMilliseconds();

    const blankQuestion = {
      questionId: n.toString(),
      questionText: "",
      questionType: "yesOrNo",
      questionImage: "",
    };

    const addQ = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            questions: { $splice: [[indexNumInsertBefore, 0, blankQuestion]] },
          },
        },
      });
    this.props.modifySurvey(addQ);

    //above is immutability-helper version of:
    // this.props.sectionDataStructure.questions.splice(
    //   indexNumInsertBefore,
    //   0,
    //   blankQuestion
    // );
  }

  render() {
    const surveySection = this.props.survey.surveySections[
      this.props.sectionIndex
    ];
    return (
      <React.Fragment>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            margin: "5vh",
            marginTop: "0", //note that having a top margin causes issues with drag-and-drop...
          }}
        >
          <Typography variant="h2" gutterBottom>
            Section: {surveySection.sectionTitleText}
          </Typography>
          <PrimaryButton
            onClick={() => this.props.handleDelete(this.props.sectionIndex)}
          >
            Delete this section <DeleteForeverOutlinedIcon />
          </PrimaryButton>

          <TextField
            style={{ margin: "10px" }}
            label="Section Title Text"
            value={surveySection.sectionTitleText || ""}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sectionTitleText", event);
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            label="Section Introduction Body Html "
            value={surveySection.sectionIntroductionBodyHtml || ""}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sectionIntroductionBodyHtml", event);
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            label="Section Feedback Body Html"
            value={surveySection.sectionFeedbackBodyHtml || ""}
            variant="outlined"
            onChange={(event) => {
              this.handleChange("sectionFeedbackBodyHtml", event);
            }}
          />

          <Droppable droppableId={this.props.sectionIndex.toString()}>
            {(provided) => {
              return (
                <React.Fragment>
                  <PrimaryButton
                    onClick={() => {
                      this.addNewQuestion(0);
                    }}
                  >
                    Add new question
                  </PrimaryButton>
                  <div
                    id={this.props.sectionIndex.toString()}
                    className="droppableDiv"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {surveySection.questions &&
                      surveySection.questions.map((question, index) => {
                        return (
                          <Draggable
                            draggableId={question.questionId}
                            index={index}
                            key={question.questionId}
                          >
                            {(provided) => {
                              return (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <Accordion
                                    key={question.questionId}
                                    // IMPORTANT NOTE: this transition props stops the accordion details from rendering
                                    // if they are not open!!
                                    TransitionProps={{ unmountOnExit: true }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                    >
                                      <DragIndicatorIcon />
                                      <Typography>
                                        Question #
                                        {index +
                                          1 +
                                          " : " +
                                          question.questionText}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <SurveyEditingViewQuestion
                                        survey={this.props.survey}
                                        sectionIndex={this.props.sectionIndex}
                                        questionIndex={index}
                                        modifySurvey={this.props.modifySurvey}
                                        handleDeleteQuestion={() => {
                                          this.deleteQuestion(index);
                                        }}
                                      />
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    {
                      // placeholder used to maintain space when dragging, see react-beautiful-dnd
                      provided.placeholder
                    }
                  </div>
                </React.Fragment>
              );
            }}
          </Droppable>
          <EditAlgorithmView
            sectionIndex={this.props.sectionIndex}
            algorithm={surveySection.sectionResultAlgorithm}
            modifySurvey={this.props.modifySurvey}
          />
        </Card>
      </React.Fragment>
    );
  }
}
