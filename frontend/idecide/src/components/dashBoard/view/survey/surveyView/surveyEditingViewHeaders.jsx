import React, { Component } from "react";
import { Typography, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import update from "immutability-helper";

export default class surveyEditingViewHeaders extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(eventType, event) {
    var value = event.target.value;

    const updateSection = (prevSurvey) =>
      update(prevSurvey, {
        [eventType]: { $set: value },
      });

    this.props.modifySurvey(updateSection);
  }

  shouldComponentUpdate(newProps) {
    return newProps.survey !== this.props.survey;
  }

  render() {
    return (
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          margin: "5vh",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Survey Properties
        </Typography>
        <TextField
          style={{ margin: "10px" }}
          label="Survey Title Text"
          value={this.props.survey.surveyTitle || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyTitle", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Survey Completion Body Html"
          helperText="Shown to users when starting a survey"
          value={this.props.survey.surveyIntroductionHtmlB64 || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyIntroductionHtmlB64", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Survey display order"
          helperText="Must be an integer. Lower number = earlier in the order of surveys that a user needs to complete"
          value={this.props.survey.surveyDisplayOrder || ""}
          type="number"
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyDisplayOrder", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Survey Id"
          helperText="Must be an integer. This Id is referenced by feedback algorithms"
          value={this.props.survey.surveyId || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyId", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Survey Description"
          helperText="This text is shown to users on the card before they start the survey"
          value={this.props.survey.surveyIntroduction || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyIntroduction", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Survey Completion Body Html"
          helperText="Shown to users after completing a survey"
          value={this.props.survey.surveyResultHtml || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyResultHtml", event);
          }}
        />
        <TextField
          style={{ margin: "10px" }}
          label="Survey Completion Heading Text"
          helperText="Header for the final card after users have completed a survey."
          value={this.props.survey.surveyResultHeading || ""}
          variant="outlined"
          onChange={(event) => {
            this.handleChange("surveyResultHeading", event);
          }}
        />
      </Card>
    );
  }
}
