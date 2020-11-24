//new version of survey editing view for admin portal
// this is the root component, which will render other parts of the view
// it contains the state of the survey, and passes its own setState function
// down to the child components, which then are aware of how to manipulate the survey
// state on their own (using this component's setState function)
import React, { Component } from "react";
import { getSurveyById, editSurvey } from "../../../../../API/surveyAPI";
import SurveyEditingViewHeaders from "./surveyEditingViewHeaders";
import SurveyEditingViewSection from "./surveyEditingViewSection";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";
import PrimaryButtonContrast from "./../../../../reusableComponents/primaryButtonContrast";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Fab from "@material-ui/core/Fab";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import update from "immutability-helper";
import UndoIcon from "@material-ui/icons/Undo";
import LoadingSpinner from "../../../../reusableComponents/loading";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";

class SectionReorgViewMode extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //dragging around sections to reorder them
  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //didn't move
      return;
    }

    if (!destination) {
      //dropped somewhere outside of the droppable
      return;
    }

    const movedSection = this.props.survey.surveySections[source.index];

    const swapSections = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          $splice: [
            [source.index, 1],
            [destination.index, 0, movedSection],
          ],
        },
      });

    this.props.modifySurvey(swapSections);
  }

  render() {
    return (
      <React.Fragment>
        <Typography style={{ color: "white" }} variant="h6">
          Section Reorder View (Drag and drop to reorder sections)
        </Typography>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={"mainColumn"}>
            {/* only one droppable, so just give id="mainColumn" */}
            {(provided) => {
              return (
                <div
                  id="droppableDiv"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.survey.surveySections.map((section, index) => {
                    return (
                      <Draggable
                        draggableId={section.sectionId}
                        index={index}
                        key={section.sectionId}
                      >
                        {(provided) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div style={{ padding: "0.5em" }}>
                                {/* using externaldiv + padding since using margin on card
                                  causes issues when calculating height of objects for drag-n-drop */}
                                <Card>
                                  <DragIndicatorIcon />
                                  {section.sectionTitleText}
                                </Card>
                              </div>
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
        </DragDropContext>
      </React.Fragment>
    );
  }
}

class MainViewMode extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEndMoveQuestions = this.onDragEndMoveQuestions.bind(this);
  }

  //this is for moving questions; placed at survey level so can move questions BETWEEN sections
  onDragEndMoveQuestions(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      //dropped somewhere outside of the droppable
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //didn't move
      return;
    }

    //droppableIds are the sectionIndexes
    const destId = parseInt(destination.droppableId);
    const sourceId = parseInt(source.droppableId);

    const movedQuestion = this.props.survey.surveySections[sourceId].questions[
      source.index
    ];

    const swapQuestions = (prevSurvey) => {
      var swapObject;
      if (destId === sourceId) {
        swapObject = {
          [destId]: {
            questions: {
              $splice: [
                [source.index, 1],
                [destination.index, 0, movedQuestion],
              ],
            },
          },
        };
      } else {
        swapObject = {
          [destId]: {
            questions: { $splice: [[destination.index, 0, movedQuestion]] },
          },
          [sourceId]: {
            questions: {
              $splice: [[source.index, 1]],
            },
          },
        };
      }

      return update(prevSurvey, {
        surveySections: swapObject,
      });
    };

    this.props.modifySurvey(swapQuestions);
  }

  deleteSection(index) {
    const deleteSec = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          $splice: [[index, 1]],
        },
      });
    this.props.modifySurvey(deleteSec);
  }

  addNewSection(indexNumInsertBefore) {
    //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
    var d = new Date();
    var n = d.getMilliseconds();

    const blankSection = {
      sectionId: n.toString(), //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
      sectionTitleText: "",
      surveyIntroductionHtmlB64: "",
      sectionFeedbackBodyHtml: "",
      sectionFeedbackHeadingText: "",
      questions: [],
      sectionResultAlgorithm: null,
    };

    const addSec = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          $splice: [[indexNumInsertBefore, 0, blankSection]],
        },
      });

    this.props.modifySurvey(addSec);
  }

  render() {
    return (
      <React.Fragment>
        <SurveyEditingViewHeaders
          survey={this.props.survey}
          modifySurvey={this.props.modifySurvey}
        />
        <PrimaryButtonContrast
          onClick={() => {
            this.addNewSection(0);
          }}
        >
          Create New Section Here <CreateOutlinedIcon />
        </PrimaryButtonContrast>
        {/* dragdrop context outside of map, so can drag qs between sections */}
        <DragDropContext onDragEnd={this.onDragEndMoveQuestions}>
          {this.props.survey.surveySections.map((section, index) => {
            return (
              <React.Fragment key={section.sectionId}>
                <SurveyEditingViewSection
                  // sectionId not really used, its the index that gets used
                  modifySurvey={this.props.modifySurvey}
                  survey={this.props.survey}
                  sectionIndex={index}
                  handleDelete={(index) => {
                    this.deleteSection(index);
                  }}
                />
                <PrimaryButtonContrast
                  style={{ marginBottom: "5vh" }} //adding bottom margin here since top-margin caused issues...
                  onClick={() => {
                    this.addNewSection(index + 1);
                  }}
                >
                  Create New Section Here
                  <CreateOutlinedIcon />
                </PrimaryButtonContrast>
              </React.Fragment>
            );
          })}
        </DragDropContext>
      </React.Fragment>
    );
  }
}

export default class surveyEditingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: null,
      canUndo: false,
      isLoaded: false,
      popupDialogOpen: false,
      isDragging: false,
      inSectionReorgView: false,
    };
    // this.setState = this.setState.bind(this); // so we can pass the setState function down to other components
    this.modifySurvey = this.modifySurvey.bind(this);
    this.surveyStateHistory = [];

    this.getView = this.getView.bind(this);
    this.undoStateChange = this.undoStateChange.bind(this);
    this.addStateToHistory = this.addStateToHistory.bind(this);
  }

  addStateToHistory() {
    this.surveyStateHistory.push(this.state.survey);
    //if history gets too long, remove some stuff
    if (this.surveyStateHistory.length > 50) {
      this.surveyStateHistory.splice(0, 5);
    }
  }

  undoStateChange() {
    const length = this.surveyStateHistory.length;
    if (length > 0) {
      this.setState({ survey: this.surveyStateHistory[length - 1] }, () => {
        this.surveyStateHistory.splice(length - 1, 1);
      });
    }

    if (length < 2) {
      this.setState({ canUndo: false });
    }
  }

  //this function gets passed to children
  //takes a unary function: input is the previous survey, output is new survey state
  modifySurvey(newSurveyFunction) {
    this.addStateToHistory();
    this.setState((prevState) => {
      return {
        survey: newSurveyFunction(prevState.survey),
        canUndo: true,
      };
    });
  }

  componentDidMount() {
    const fetchData = async (surveyId) => {
      const result = await getSurveyById(surveyId);
      this.setState({ survey: result, isLoaded: true });
    };
    //id comes from URL parameter
    fetchData(this.props.match.params.surveyId);
  }

  getView() {
    if (!this.state.inSectionReorgView) {
      return (
        <MainViewMode
          survey={this.state.survey}
          modifySurvey={this.modifySurvey}
        />
      );
    } else {
      return (
        <SectionReorgViewMode
          survey={this.state.survey}
          modifySurvey={this.modifySurvey}
        />
      );
    }
  }

  handleUpdate = async (updatedSurvey) => {

    let updatedResult = await editSurvey(updatedSurvey);
    if (updatedResult.data.flag) {
      window.location.reload();
    } else {
      let failMessage = "Update failed, the reason is: " + updatedResult.data.message;
      alert(failMessage);
    }
  }

  //pass to subcomponents both a) a reference to the datastructure (mutable) and
  //b) the 'view' which is based on the state of this main component.
  render() {
    const { isLoaded } = this.state;
    if (isLoaded === false) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div>
          <Fab
            color={this.state.inSectionReorgView ? "secondary" : "primary"}
            aria-label="section reorganisation"
            size="large"
            style={{
              position: "fixed",
              bottom: "2em",
              right: "2em",
              zIndex: 100,
            }}
            onClick={() => {
              this.setState((prevState) => {
                return { inSectionReorgView: !prevState.inSectionReorgView };
              });
            }}
          >
            <SwapVertIcon />
          </Fab>

          <Fab
            color={"primary"}
            aria-label="undo"
            size="large"
            disabled={!this.state.canUndo}
            style={{
              position: "fixed",
              bottom: "8em",
              right: "2em",
              zIndex: 100,
            }}
            onClick={this.undoStateChange}
          >
            <UndoIcon />
          </Fab>

          {this.state.isLoaded && (
            <div>
              <Typography style={{ color: "white" }} variant="h2">
                {this.state.survey.surveyTitle}
              </Typography>
              {this.getView()}
            </div>
          )}
          <PrimaryButtonContrast
            onClick={() => {
              this.setState({ isLoaded: false });
              this.handleUpdate(this.state.survey);
            }}
          >
            Save & Upload Changes
        </PrimaryButtonContrast>
        </div>
      );
    }
  }
}
