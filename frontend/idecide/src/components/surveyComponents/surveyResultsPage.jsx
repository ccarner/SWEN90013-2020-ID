import React, { useState } from "react";

import { Card, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrimaryButton from "../reusableComponents/PrimaryButton";

/**
 * This component will show a) the 'feedback' from the survey and b) the answers
 * filled in by the user.
 */

export default function SurveyResultsPage(props) {
  const [getAnswersOpen, setAnswersOpen] = useState(false);

  const toggleAnswersOpen = () => {
    setAnswersOpen(!getAnswersOpen);
  };

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
          <h1 className="text-center" style={{ color: "#9572A4" }}>
            {props.heading
              ? props.heading
              : "Thank you for completing this module"}
          </h1>
          {props.bodyHtml != null && (
            <div
              dangerouslySetInnerHTML={{
                __html: props.bodyHtml,
              }}
            />
          )}

          {feedback}
          <PrimaryButton style={{ width: "16em" }} onClick={props.returnHome}>
            Back home
          </PrimaryButton>

          <PrimaryButton style={{ width: "16em" }} onClick={toggleAnswersOpen}>
            View Responses
          </PrimaryButton>
          <Collapse in={getAnswersOpen}>
            <Card.Text>
              <ol>
                {props.surveyResults.map((question) => (
                  <li>
                    {question.questionText} : {question.questionAnswer.join()}
                  </li>
                ))}
              </ol>
            </Card.Text>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
