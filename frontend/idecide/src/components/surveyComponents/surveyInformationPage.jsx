import React from "react";

import { MDBBtn } from "mdbreact";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SurveyInformationPage(props) {
  return (
    <div className="padding10">
      {props.survey.surveyTitle}
      {props.survey.surveyIntroduction}

      <MDBBtn gradient="purple" onClick={props.startSurvey}>Start</MDBBtn>

    </div>
  );
}
