import React from "react";
import { Card } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";

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
          <Card.Title>{"Introduction: " + props.survey.surveyTitle}</Card.Title>
          <Card.Text style={{ fontSize: "18px" }}>
            {props.survey.surveyIntroduction}
          </Card.Text>

          <PrimaryButton onClick={props.returnHome}>Go back home</PrimaryButton>
          <PrimaryButton onClick={props.startSurvey}>Begin >></PrimaryButton>
        </Card.Body>
      </Card>
    </div>
  );
}
