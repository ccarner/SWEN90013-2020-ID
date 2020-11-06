import React from "react";
import InfoCard from "../reusableComponents/infoCard";
import { Typography } from "@material-ui/core";

/**
 * This component will show a) a generic message for having completed the survey and
 * b) a custom feedback message based on the answers given
 */

export default function SectionResultsPage(props) {
  var feedback =
    props.feedbackCategory === null ? (
      ""
    ) : (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h4">
            Feedback: {props.feedbackCategory}
          </Typography>
          {props.feedbackImage && (
            <img
              src={props.feedbackImage}
              alt="feedback"
              style={{ maxHeight: "30vh" }}
            />
          )}
          <br />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.feedbackText,
          }}
        />
      </React.Fragment>
    );

  const cardBody = (
    <React.Fragment>
      {props.bodyHtml != null && (
        <div
          dangerouslySetInnerHTML={{
            __html: props.bodyHtml,
          }}
        />
      )}
      {feedback}
    </React.Fragment>
  );

  return (
    <InfoCard
      heading={!props.heading ? "Section Complete" : props.heading}
      cardTitle={null}
      cardBody={cardBody}
    ></InfoCard>
  );
}
