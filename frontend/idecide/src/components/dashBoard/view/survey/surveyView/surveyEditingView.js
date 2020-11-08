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
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Fab from "@material-ui/core/Fab";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

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

  onDragEnd(result) {
    //change state here
    //TODO: reorder our columns
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

    let [movedSection] = this.props.survey.surveySections.splice(
      source.index,
      1
    );
    this.props.survey.surveySections.splice(destination.index, 0, movedSection);
    this.props.refreshView();
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
                  {this.props.surveyView.surveySections.map(
                    (section, index) => {
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
                                    {section.sectionTitle}
                                  </Card>
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}

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
    console.log("result was", result);
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
    //remove the question from original section array
    let [movedQuestion] = this.props.survey.surveySections[
      parseInt(source.droppableId)
    ].questions.splice(source.index, 1);

    //insert the question into new  section array
    this.props.survey.surveySections[
      parseInt(destination.droppableId)
    ].questions.splice(destination.index, 0, movedQuestion);

    this.props.refreshView();
  }

  deleteSection(index) {
    this.props.survey.surveySections.splice(index, 1);
    this.props.refreshView();
  }

  addNewSection(indexNumInsertBefore) {
    //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
    var d = new Date();
    var n = d.getMilliseconds();

    const blankSection = {
      sectionId: n.toString(), //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
      sectionTitleText: "",
      sectionIntroductionBodyHtml: "",
      sectionFeedbackBodyHtml: "",
      sectionFeedbackHeadingText: "",
      questions: [],
      sectionResultAlgorithm: "null",
    };

    this.props.survey.surveySections.splice(
      indexNumInsertBefore,
      0,
      blankSection
    );
    this.props.refreshView();
  }

  render() {
    return (
      <React.Fragment>
        <SurveyEditingViewHeaders
          surveyDataStructure={this.props.survey}
          surveyView={this.props.surveyView}
          refreshView={this.props.refreshView}
        />
        <PrimaryButton
          onClick={() => {
            this.addNewSection(0);
          }}
        >
          Create New Section Here <CreateOutlinedIcon />
        </PrimaryButton>
        <DragDropContext onDragEnd={this.onDragEndMoveQuestions}>
          {this.props.surveyView.surveySections.map((section, index) => {
            return (
              <React.Fragment key={section.sectionId}>
                <SurveyEditingViewSection
                  // sectionId not really used, its the index that gets used
                  sectionDataStructure={this.props.survey.surveySections[index]}
                  sectionIndex={index}
                  sectionView={section}
                  refreshView={this.props.refreshView}
                  handleDelete={(index) => {
                    this.deleteSection(index);
                  }}
                />
                <PrimaryButton
                  style={{ marginBottom: "5vh" }} //adding bottom margin here since top-margin caused issues...
                  onClick={() => {
                    this.addNewSection(index + 1);
                  }}
                >
                  Create New Section Here
                  <CreateOutlinedIcon />
                </PrimaryButton>
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
    this.survey = null;
    this.state = {
      isLoaded: false,
      popupDialogOpen: false,
      surveyView: null,
      isDragging: false,
      inSectionReorgView: false,
    };
    // this.setState = this.setState.bind(this); // so we can pass the setState function down to other components, not needed anymore
    this.refreshSurveyViewState = this.refreshSurveyViewState.bind(this);

    this.getView = this.getView.bind(this);
  }

  //keeping track of the survey as a datastructure OUTSIDE of the state of the component, so that we can modify it however we want.
  //whenever we want to rerener it, call this function to refresh the state / rerender props.
  //need to make a shallow copy so that react knows its been updated
  refreshSurveyViewState() {
    //TODO: test if still updates without the shallow copy
    //apaprently it does...
    this.setState({ surveyView: this.survey });
  }

  componentDidMount() {
    const fetchData = async (surveyId) => {
      const result = await getSurveyById(surveyId);
      this.survey = result;
      this.setState({ survey: result, isLoaded: true });

      // console.log("survey data was", result, this.props.surveyId);
    };
    //id comes from URL parameter
    fetchData(this.props.match.params.surveyId);
  }

  getView() {
    if (!this.state.inSectionReorgView) {
      return (
        <MainViewMode
          surveyView={this.state.survey}
          survey={this.survey}
          refreshView={this.refreshSurveyViewState}
        />
      );
    } else {
      return (
        <SectionReorgViewMode
          surveyView={this.state.survey}
          survey={this.survey}
          refreshView={this.refreshSurveyViewState}
        />
      );
    }
  }

  //pass to subcomponents both a) a reference to the datastructure (mutable) and
  //b) the 'view' which is based on the state of this main component.
  render() {
    return (
      <div>
        <Fab
          color={this.state.inSectionReorgView ? "secondary" : "primary"}
          aria-label="add"
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

        {this.state.isLoaded && (
          <div>
            <Typography style={{ color: "white" }} variant="h2">
              {this.state.survey.surveyTitle}
            </Typography>
            {this.getView()}
          </div>
        )}
        <PrimaryButton
          onClick={() => {
            editSurvey(this.survey);
          }}
        >
          Save & Upload Changes
        </PrimaryButton>
      </div>
    );
  }
}

// import { useState, useEffect, createContext } from "react";
// import { Box, Button, Collapse, makeStyles } from "@material-ui/core";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Typography,
//   IconButton,
//   Grid,
// } from "@material-ui/core";
// import { getSurveyById, editSurvey } from "../../../../../API/surveyAPI";
// import EditIcon from "@material-ui/icons/Edit";
// import QuestionDetails from "./QuestionDetails";
// import NewSectionComp from "../surveyEdit/NewSectionComp";
// import SectionQuestions from "./SectionQuestions";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: "100%",
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3),
//   },
// }));

// export const t = 4;
// export const QuestionContext = createContext();

// const SurveyEditingView = (props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setOpen] = React.useState(false);
//   const [values, setValues] = React.useState({
//     title: "",
//     descrpition: "",
//   });

//   const [count, setCount] = React.useState(0);
//   const [newQuestion, addNew] = React.useState([]);

//   const [isShow, setShow] = useState(false);

//   const surveyId = props.match.params.surveyId;
//   console.log(surveyId);

//   const [sectionIndex, setSectionIndex] = React.useState();

//   const [data, setData] = useState({ hits: [] });
//   const [surveySection, setSurveySection] = useState({ hits: [] });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleShow = () => {
//     setShow((prev) => !prev);
//   };

//   function handleView(e, index) {
//     setOpen((prev) => !prev);
//     setSectionIndex(index.index);
//   }

//   useEffect(() => {
//     const fetchData = async (surveyId) => {
//       setIsLoading(true);
//       console.log(props.match.params.surveyId);
//       const result = await getSurveyById(props.match.params.surveyId);
//       setData(result);
//       setSurveySection(result.surveySections);
//       setIsLoading(false);
//       //	console.log(data);
//       //	console.log(isLoading);
//     };
//     fetchData();
//   }, [surveyId]);

//   console.log(JSON.stringify(data));
//   const QuestionsDisplay = () => {
//     console.log(data);
//     console.log(surveySection[sectionIndex]);
//     if (typeof sectionIndex !== "undefined") {
//       if (surveySection[sectionIndex].questions.length > 0)
//         return <QuestionDetails data={surveySection[sectionIndex]} />;
//       else {
//         alert(
//           "There are no questions in this section, do you want to create new questions now?"
//         );
//       }
//     } else return <div />;
//   };

//   return (
//     <Grid container spacing={2} style={{ marginTop: "20px" }}>
//       <Grid item xs={12}>
//         <Button color="secondary" variant="contained" onClick={handleShow}>
//           Edit
//         </Button>
//       </Grid>
//       <Grid item xs={12}>
//         {typeof surveySection.length == "undefined" ||
//         surveySection.length === 0 ? (
//           surveySection.length === 0 ? (
//             <NewSectionComp data={surveyId} id={surveyId} />
//           ) : (
//             <div>Loading</div>
//           )
//         ) : (
//           surveySection.map((item, index) => (
//             <SectionQuestions
//               data={item}
//               sections={surveySection}
//               surveyId={surveyId}
//               handleShow={handleShow}
//               index={index}
//             />
//           ))
//         )}
//       </Grid>
//       {newQuestion.map((nq) => (
//         <Grid item xs={12} key={nq}>
//           <Box p={1} />
//           <NewSectionComp data={data} id={surveyId} />
//         </Grid>
//       ))}

//       <Grid item xs={12}>
//         <Collapse in={isShow}>
//           <Button
//             color="primary"
//             fullWidth
//             variant="contained"
//             onClick={() => {
//               setCount(count + 1);
//               addNew([...newQuestion, count]);
//             }}
//           >
//             Add New Section
//           </Button>
//         </Collapse>
//       </Grid>
//     </Grid>

//     // from old surveyadmin panel dialog:
//     // 	 <Dialog
//     // 	 open={open}
//     // 	 onClose={handleClose}
//     // 	 aria-labelledby="max-width-dialog-title"
//     // 	 maxWidth="lg"
//     // 	 fullWidth
//     //    >
//     // 	 <DialogTitle id="form-dialog-title">Survey</DialogTitle>
//     // 	 <form enctype="multipart/form-data" ref={form} onSubmit={submit}>
//     // 	   <DialogContent>
//     // 		 <Collapse in={!openGreen}>
//     // 		   <DialogContentText>
//     // 			 Please input the title and description for the new Survey.
//     // 		   </DialogContentText>
//     // 		   <TextField
//     // 			 id="outlined-multiline-flexible"
//     // 			 required
//     // 			 fullWidth
//     // 			 value={values.title}
//     // 			 onChange={handleChange("title")}
//     // 			 label="Title"
//     // 			 variant="outlined"
//     // 		   />
//     // 		   <DialogContentText>
//     // 			 <Box p={1} />
//     // 			 Please upload an image for this survey:
//     // 			 <br />
//     // 			 <input
//     // 			   type="file"
//     // 			   name="img"
//     // 			   multiple="multiple"
//     // 			   onChange={ImgChange}
//     // 			 />
//     // 			 <Collapse in={false}>
//     // 			   <input
//     // 				 name="surveyId"
//     // 				 multiple="multiple"
//     // 				 value={surveyHeaders.surveyId}
//     // 			   />
//     // 			 </Collapse>
//     // 		   </DialogContentText>
//     // 		   <CardActions>
//     // 			 <div />
//     // 		   </CardActions>
//     // 		   <TextField
//     // 			 id="outlined-multiline-flexible"
//     // 			 multiline
//     // 			 fullWidth
//     // 			 required
//     // 			 value={values.description}
//     // 			 onChange={handleChange("description")}
//     // 			 rows={4}
//     // 			 label="Description"
//     // 			 variant="outlined"
//     // 		   />
//     // 		   <DialogContentText>
//     // 			 Please input the html description for this survey.
//     // 		   </DialogContentText>
//     // 		   <TextField
//     // 			 id="outlined-multiline-flexible"
//     // 			 multiline
//     // 			 fullWidth
//     // 			 required
//     // 			 value={values.surveyIntroductionHtmlB64}
//     // 			 onChange={handleChange("surveyIntroductionHtmlB64")}
//     // 			 rows={4}
//     // 			 label="HTML"
//     // 			 variant="outlined"
//     // 		   />
//     // 		   <DialogContentText>
//     // 			 Please input the result algorithm for this survey.
//     // 		   </DialogContentText>
//     // 		   <TextField
//     // 			 id="outlined-multiline-flexible"
//     // 			 multiline
//     // 			 fullWidth
//     // 			 required
//     // 			 value={values.surveyResultAlgorithm}
//     // 			 onChange={handleChange("surveyResultAlgorithm")}
//     // 			 rows={2}
//     // 			 label="Algorithm"
//     // 			 variant="outlined"
//     // 		   />
//     // 		 </Collapse>
//     // 	   </DialogContent>
//     // 	   <DialogContent>
//     // 		 <Collapse in={openAlert}>
//     // 		   <Alert severity="error">{error}</Alert>
//     // 		 </Collapse>
//     // 		 <Collapse in={openGreen}>
//     // 		   <Alert severity="success">Update Survey Successfully!</Alert>
//     // 		 </Collapse>
//     // 	   </DialogContent>
//     // 	   <DialogActions>
//     // 		 <Collapse in={!openGreen}>
//     // 		   <Button onClick={handleClose} color="primary">
//     // 			 Cancel
//     // 		   </Button>
//     // 		 </Collapse>
//     // 		 <Button onClick={UpdateSurvey} color="primary" type="submit">
//     // 		   Confirm
//     // 		 </Button>
//     // 	   </DialogActions>
//     // 	 </form>
//     //    </Dialog>
//   );
// };
