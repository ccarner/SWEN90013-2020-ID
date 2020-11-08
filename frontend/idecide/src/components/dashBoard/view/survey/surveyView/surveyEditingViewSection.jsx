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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class SurveyEditingViewSection extends Component {
  constructor(props) {
    super(props);
    this.updateFlag = false;
    this.state = {
      currentDialogShowing: "none", // one option per dialog type, eg "delete"
    };
    //filter out and grab the section we're actually working on.
    this.renderDialogs = this.renderDialogs.bind(this);
    this.handleChildHasUpdated = this.handleChildHasUpdated.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  //These methods ensure that only sections which have children that have updated will be rerendered...
  handleChildHasUpdated() {
    this.updateFlag = true;
  }

  componentDidUpdate() {
    this.updateFlag = false;
  }

  shouldComponentUpdate(newProps) {
    return this.updateFlag;
  }

  handleChange(eventType, event) {
    var value = event.target.value;
    this.props.sectionDataStructure[eventType] = value;
    this.updateFlag = true;
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
      questionId: n.toString(),
      questionText: "",
      questionType: "yesOrNo",
      questionImage: "",
    };

    this.props.sectionDataStructure.questions.splice(
      indexNumInsertBefore,
      0,
      blankQuestion
    );
    this.updateFlag = true;
    this.refreshView();
  }

  renderDialogs() {
    console.log("here rendering current dialog showing");
    if (this.state.currentDialogShowing === "delete") {
      return (
        <Dialog
          open={this.state.currentDialogShowing === "delete"}
          onClose={() => {
            this.setState({ currentDialogShowing: "none" });
            this.updateFlag = true;
            this.props.refreshView();
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
                this.updateFlag = true;
                this.props.refreshView();
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
      <React.Fragment>
        {this.renderDialogs()}
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
            Section: {this.props.sectionView.sectionTitle}
          </Typography>
          <PrimaryButton
            onClick={() => {
              this.setState({ currentDialogShowing: "delete" });
              this.updateFlag = true;
              this.props.refreshView();
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

          <Droppable droppableId={this.props.sectionIndex.toString()}>
            {(provided) => {
              return (
                <div
                  id={this.props.sectionIndex.toString()}
                  className="droppableDiv"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.sectionView.questions &&
                    this.props.sectionView.questions.map((question, index) => {
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
                                      parentShouldUpdate={
                                        this.handleChildHasUpdated
                                      }
                                      questionDataStructure={
                                        this.props.sectionDataStructure
                                          .questions[index]
                                      }
                                      questionIndex={index}
                                      questionView={
                                        this.props.sectionView.questions[index]
                                      }
                                      refreshView={this.props.refreshView}
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
              );
            }}
          </Droppable>
        </Card>
      </React.Fragment>
    );
  }
}
