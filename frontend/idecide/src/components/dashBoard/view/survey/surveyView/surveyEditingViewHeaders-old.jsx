// import React, { Component } from "react";
// import { Typography, Card } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";

// export default class surveyEditingViewHeaders extends Component {
//   constructor(props) {
//     super(props);
//   }

//   handleChange(eventType, event) {
//     var value = event.target.value;
//     this.props.updateSurvey((prevState) => {
//       let updatedSurvey = prevState.survey;
//       updatedSurvey[eventType] = value;
//       return { survey: updatedSurvey };
//     });
//   }

//   render() {
//     return (
//       <Card
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "20px",
//           margin: "5vh",
//         }}
//       >
//         <Typography variant="h2" gutterBottom>
//           Survey Properties
//         </Typography>
//         <TextField
//           style={{ margin: "10px" }}
//           label="Survey Title Text"
//           value={this.props.survey.surveyTitle}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("surveyTitle", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Survey display order (integer)"
//           value={this.props.survey.surveyDisplayOrder}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("surveyDisplayOrder", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Survey Id (integer)"
//           value={this.props.survey.surveyId}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("surveyId", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Survey Description Text (Displayed on cards)"
//           value={this.props.survey.surveyIntroductionText}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("surveyDescriptionText", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Survey Completion Body Html"
//           value={this.props.survey.surveyResultBodyHtml}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("surveyResultBodyHtml", event);
//           }}
//         />
//         <TextField
//           style={{ margin: "10px" }}
//           label="Survey Completion Heading Text"
//           value={this.props.survey.surveyResultHeadingText}
//           variant="outlined"
//           onChange={(event) => {
//             this.handleChange("surveyResultHeadingText", event);
//           }}
//         />
//       </Card>
//     );
//   }
// }
