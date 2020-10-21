import React from "react";

import { Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrimaryButton from "../reusableComponents/PrimaryButton";

/**
 * This component will show a) the 'feedback' from the survey and b) the answers
 * filled in by the user.
 */

export default function SectionResultsPage(props) {
  var feedback =
    props.feedbackCategory === null ? (
      ""
    ) : (
      <React.Fragment>
        <Card.Title>
          Feedback <br /> <b>{props.feedbackCategory}</b>
        </Card.Title>
        <img src={props.feedbackImage} alt="" width="30%" />
        <Card.Text
          style={{ fontSize: "18px", padding: "20px", textAlign: "left" }}
        >
          <div dangerouslySetInnerHTML={{ __html: props.feedbackText }} />
        </Card.Text>
      </React.Fragment>
    );

  return (
    <div>
      <Card>
        <Card.Body>
          <h1 className="text-center" style={{ color: "#9572A4" }}>
            {props.heading === null
              ? "Thank you for completing this section"
              : props.heading}
          </h1>
          {props.bodyHtml != null && (
            <div
              dangerouslySetInnerHTML={{
                __html: props.bodyHtml,
              }}
            />
          )}

          {feedback}
        </Card.Body>
      </Card>
    </div>
  );
}
