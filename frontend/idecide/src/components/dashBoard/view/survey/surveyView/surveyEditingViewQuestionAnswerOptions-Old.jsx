// import React, { Component } from "react";
// import Card from "@material-ui/core/Card";
// import TextField from "@material-ui/core/TextField";
// import SurveyEditingViewQuestion from "./surveyEditingViewQuestion";

// export default class surveyEditingViewQuestionAnswerOptions extends Component {
//   constructor(props) {
//     super(props);
//   }

//   //don't use event type here since only type of event, there is only one text field
//   handleChange(eventType, event) {
//     var value = event.target.value;
//     this.props.updateSurvey((prevState) => {
//       let updatedSurvey = prevState.survey;
//       updatedSurvey.surveySections[this.props.sectionIndex].questions[
//         this.props.questionIndex
//       ].selectionOptions[this.props.selectionOptionIndex] = value;
//       return { survey: updatedSurvey };
//     });
//   }

//   render() {
//     return (
//       <Card
//         style={{ display: "flex", flexDirection: "column", padding: "20px" }}
//       >
//         <TextField
//           label={"Selection Option #" + (this.props.selectionOptionIndex + 1)}
//           value={this.props.selectionOption}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("selectionOption", event);
//           }}
//         />
//       </Card>
//     );
//   }
// }
