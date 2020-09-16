import React from "react";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import PrimaryButton from "../reusableComponents/PrimaryButton";

/**
 * This component will show a) the 'feedback' from the survey and b) the answers
 * filled in by the user.
 */
export default function surveyResultsPage(props) {
  return (
    <div>
      <Card className="surveyIntroCard" style={{ width: "80%" }}>
        <Card.Body>
          <Card.Title>
            Feedback and Results: <b>{props.feedbackCategory}</b>
          </Card.Title>
          <img src={props.feedbackImage} alt="" width="30%" />
          <Card.Text>{props.feedbackText}</Card.Text>

          <Card.Title>Your answers</Card.Title>
          <Card.Text>
            {props.feedbackText}

            <ol>
              {props.surveyResults.map((question) => (
                <li>
                  {question.questionText} : {question.questionAnswer.join()}
                </li>
              ))}
            </ol>
          </Card.Text>

          <Link to="/surveyComponent">
            <PrimaryButton>Go back home</PrimaryButton>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
