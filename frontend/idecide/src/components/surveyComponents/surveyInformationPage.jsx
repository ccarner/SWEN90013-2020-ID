import React from "react";
import { Button } from "react-bootstrap";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SurveyInformationPage(props) {
  return (
    <div>
      {props.survey.surveyTitle}
      {props.survey.surveyIntroduction}
      {<Button onClick={props.startSurvey}> Start the Survey</Button>}
    </div>
  );
}
