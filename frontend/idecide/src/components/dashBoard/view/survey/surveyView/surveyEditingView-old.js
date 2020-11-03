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

import { Box, Button, Collapse, makeStyles } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";

export default class surveyEditingView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, survey: null };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const fetchData = async (surveyId) => {
      const result = await getSurveyById(surveyId);
      this.setState({ survey: result, isLoaded: true });
      // console.log("survey data was", result, this.props.surveyId);
    };
    //id comes from URL parameter
    fetchData(this.props.match.params.surveyId);
  }

  addNewSection(indexNumInsertBefore) {
    //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
    var d = new Date();
    var n = d.getMilliseconds();

    const blankSection = {
      sectionId: n, //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
      sectionTitleText: "",
      sectionIntroductionBodyHtml: "",
      sectionFeedbackBodyHtml: "",
      sectionFeedbackHeadingText: "",
      questions: [],
      sectionResultAlgorithm: "null",
    };

    //insert blank section into array (delete 0 items== insert)
    //need to duplicate array, since splice mutates array, and react doesn't like that
    this.setState((prevState) => {
      var newSurveySections = [...prevState.survey.surveySections];
      newSurveySections.splice(indexNumInsertBefore, 0, blankSection);
      var newSurvey = { ...prevState.survey };
      newSurvey.surveySections = newSurveySections;
      return { survey: newSurvey };
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoaded && (
          <React.Fragment>
            <Typography style={{ color: "white" }} variant="h2">
              {this.state.survey.surveyTitle}
            </Typography>
            <SurveyEditingViewHeaders
              survey={this.state.survey}
              updateSurvey={this.setState}
            />

            {this.state.survey.surveySections.map((section, index) => {
              return (
                <React.Fragment key={section.sectionId}>
                  <PrimaryButton
                    onClick={() => {
                      this.addNewSection(index);
                    }}
                  >
                    Create New Section Here <CreateOutlinedIcon />
                  </PrimaryButton>
                  <SurveyEditingViewSection
                    // sectionId not really used, its the index that gets used
                    sectionIndex={index}
                    section={section}
                    updateSurvey={this.setState}
                  />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
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
