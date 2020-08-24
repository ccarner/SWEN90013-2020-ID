import React from "react";
import { Button } from "react-bootstrap";

export default function SurveyInformationPage(props) {
  return (
    <div>
      {props.survey.surveyTitle}
      {props.survey.surveyIntroduction}
      {<Button onClick={props.startSurvey}> Start the Survey</Button>}
    </div>
  );
}
