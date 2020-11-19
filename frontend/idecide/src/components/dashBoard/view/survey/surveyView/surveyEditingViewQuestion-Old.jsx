// import React, { Component } from "react";
// import Card from "@material-ui/core/Card";
// import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import SurveyEditingViewQuestionAnswerOptions from "./surveyEditingViewQuestionAnswerOptions";

// import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
// import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

// export default class SurveyEditingViewQuestion extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentDialogShowing: "none", // one option per dialog type, eg "delete"
//     };
//     this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
//     this.renderDialogs = this.renderDialogs.bind(this);
//   }

//   handleChange(eventType, event) {
//     var value = event.target.value;
//     this.props.updateSurvey((prevState) => {
//       let updatedSurvey = prevState.survey;
//       updatedSurvey.surveySections[this.props.sectionIndex].questions[
//         this.props.questionIndex
//       ][eventType] = value;
//       return { survey: updatedSurvey };
//     });
//   }

//   //   handleDeleteQuestion() {
//   //     this.props.updateSurvey((prevState) => {
//   //       let updatedSurvey = prevState.survey;
//   //       //remove the section from the survey section array
//   //       updatedSurvey.surveySections[this.props.sectionIndex].questions.splice(
//   //         this.props.questionIndex,
//   //         1
//   //       );
//   //       return { survey: updatedSurvey };
//   //     });
//   //   }

//   //again, make sure that its idempotent
//   handleDeleteQuestion() {
//     console.log("in handle delete");
//     this.props.updateSurvey((prevState) => {
//       var questions =
//         prevState.survey.surveySections[this.props.sectionIndex].questions;
//       var newQuestions = questions.filter((question) => {
//         return question.questionId !== this.props.question.questionId;
//       });

//       prevState.survey.surveySections[
//         this.props.sectionIndex
//       ].questions = newQuestions;

//       return { survey: prevState.survey };

//       //   var newQuestions = [
//       //     ...prevState.survey.surveySections[this.props.sectionIndex].questions,
//       //   ];
//       //   newQuestions.splice(this.props.questionIndex, 1);
//       //   var newSections = [...prevState.survey.surveySections];
//       //   var newSurvey = { ...prevState.survey };
//       //   newSurvey.surveySections = newSections;
//       //   newSurvey.surveySections[this.props.sectionIndex] = newQuestions;
//       //   return { survey: newSurvey };
//     });
//     this.setState({ currentDialogShowing: "none" });
//   }

//   questionTypeSpecificFields() {
//     if (this.props.question.questionType === "slider") {
//       return (
//         <React.Fragment>
//           <TextField
//             style={{ margin: "10px" }}
//             label="Slider Maximum Value (integer)"
//             value={this.props.question.sliderMinValue}
//             variant="outlined"
//             onChange={(event) => {
//               this.handleChange("sliderMaxValue", event);
//             }}
//           />
//           <TextField
//             style={{ margin: "10px" }}
//             label="Slider Minimum Value (integer)"
//             value={this.props.question.sliderMaxValue}
//             variant="outlined"
//             onChange={(event) => {
//               this.handleChange("sliderMinValue", event);
//             }}
//           />
//           <TextField
//             style={{ margin: "10px" }}
//             label="Slider Default/Starting Value (integer)"
//             value={this.props.question.sliderDefaultValue}
//             variant="outlined"
//             onChange={(event) => {
//               this.handleChange("sliderDefaultValue", event);
//             }}
//           />
//         </React.Fragment>
//       );
//     } else if (this.props.question.questionType === "longAnswer") {
//       return (
//         <TextField
//           style={{ margin: "10px" }}
//           label="Maximum Answer Length"
//           value={this.props.question.answerLength}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("answerLength", event);
//           }}
//         />
//       );
//     } else if (
//       [
//         "singleSelection",
//         "singleSelectionVertical",
//         "multipleSelection",
//         "ranking",
//       ].includes(this.props.question.questionType)
//     ) {
//       // we need to include extra fields for selectionOption
//       return this.props.question.selectionOptions.map((option, index) => {
//         return (
//           <SurveyEditingViewQuestionAnswerOptions
//             updateSurvey={this.props.updateSurvey}
//             selectionOption={option}
//             selectionOptionIndex={index}
//           />
//         );
//       });
//     }
//   }

//   renderDialogs() {
//     if (this.state.currentDialogShowing === "delete") {
//       return (
//         <Dialog
//           open={this.state.currentDialogShowing === "delete"}
//           onClose={() => {
//             this.setState({ currentDialogShowing: "none" });
//           }}
//         >
//           <DialogTitle>{"Confirm Question Delete?"}</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Are you sure you want to delete this question?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <PrimaryButton
//               onClick={() => {
//                 this.setState({ currentDialogShowing: "none" });
//               }}
//               autoFocus
//             >
//               Cancel
//             </PrimaryButton>
//             <PrimaryButton onClick={this.handleDeleteQuestion}>
//               Confirm Delete <DeleteForeverOutlinedIcon />
//             </PrimaryButton>
//           </DialogActions>
//         </Dialog>
//       );
//     }
//   }

//   render() {
//     return (
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         {this.renderDialogs()}
//         <PrimaryButton
//           onClick={() => {
//             this.setState({ currentDialogShowing: "delete" });
//           }}
//         >
//           Delete this Question <DeleteForeverOutlinedIcon />
//         </PrimaryButton>
//         <TextField
//           style={{ margin: "10px" }}
//           label="Question Text"
//           value={this.props.question.questionText}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("questionText", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Question Image Name (do not include '.png' or the url)"
//           value={this.props.question.questionImage}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("questionImage", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Section Feedback Body Html"
//           value={this.props.question.sectionFeedbackBodyHtml}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("sectionFeedbackBodyHtml", event);
//           }}
//         />
//         {"Question Type:"}
//         <Select
//           style={{ margin: "10px" }}
//           value={this.props.question.questionType}
//           label="Question Type"
//           onChange={(event) => {
//             this.handleChange("questionType", event);
//           }}
//         >
//           <MenuItem value={"longAnswer"}>Long Answer (text area)</MenuItem>
//           <MenuItem value={"singleSelection"}>
//             Single Selection Horizontal (multichoice)
//           </MenuItem>
//           <MenuItem value={"singleSelectionVertical"}>
//             Single Selection Vertical (multichoice)
//           </MenuItem>
//           <MenuItem value={"multipleSelection"}>
//             Multiple Selection (checkboxes)
//           </MenuItem>
//           <MenuItem value={"slider"}>Slider</MenuItem>
//           <MenuItem value={"yesOrNo"}>Yes/No</MenuItem>
//           <MenuItem value={"ranking"}>Ranking (drag and reorder)</MenuItem>
//         </Select>
//         {this.questionTypeSpecificFields()}
//       </div>
//     );
//   }
// }
