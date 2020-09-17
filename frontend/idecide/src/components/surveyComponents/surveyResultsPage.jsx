import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrimaryButton from "../reusableComponents/PrimaryButton";

/**
 * This component will show a) the 'feedback' from the survey and b) the answers
 * filled in by the user.
 */

export default function surveyResultsPage(props) {
  var feedback =
    props.feedbackCategory === null ? (
      ""
    ) : (
      <React.Fragment>
        <Card.Title>
          Feedback and Results: <b>{props.feedbackCategory}</b>
        </Card.Title>
        <img src={props.feedbackImage} alt="" width="30%" />
        <Card.Text style={{ fontSize: "18px" }}>{props.feedbackText}</Card.Text>
      </React.Fragment>
    );

  return (
    <div>
      <Card className="surveyIntroCard" style={{ width: "80%" }}>
        <Card.Body>
          <Card.Title>Thank you for completing this section</Card.Title>
          {feedback}
          <PrimaryButton onClick={props.returnHome}>Go back home</PrimaryButton>
          <Card.Title style={{ padding: "10px" }}>
            Your answers are below:
          </Card.Title>
          <Card.Text>
            <ol>
              {props.surveyResults.map((question) => (
                <li>
                  {question.questionText} : {question.questionAnswer.join()}
                </li>
              ))}
            </ol>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
