import React from "react";
import { Card } from "react-bootstrap";
import { MDBBtn } from "mdbreact";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SurveyInformationPage(props) {
  return (
    <div>
      <Card className="surveyIntroCard" style={{ width: "80%" }}>
        {/* <Card.Img variant="top" src={imagelocation} /> */}
        <Card.Body>
          <Card.Title>{props.survey.surveyTitle}</Card.Title>
          <Card.Text>{props.survey.surveyIntroduction}</Card.Text>

          <MDBBtn gradient="purple" onClick={props.handleClick}>
            Go back home
          </MDBBtn>
          <MDBBtn gradient="purple" onClick={props.startSurvey}>
            Start this Survey
          </MDBBtn>
        </Card.Body>
      </Card>
    </div>
  );
}
