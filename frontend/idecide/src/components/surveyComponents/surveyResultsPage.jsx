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
            Survey Completed your answers + feedback will be given here on this
            page (previous completions will open to this page)
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

          <Link to="/surveyComponent">
            <PrimaryButton>Go back home</PrimaryButton>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
