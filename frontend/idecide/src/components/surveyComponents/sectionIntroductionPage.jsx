import React from "react";
import { Card } from "react-bootstrap";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SectionIntroductionPage(props) {
  var introComponent = null;
  if (props.section.sectionIntroductionHtmlB64) {
    introComponent = (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: atob(props.section.sectionIntroductionHtmlB64),
        }}
      ></div>
    );
  } else {
    introComponent = props.section.sectionIntroduction;
  }

  return (
    <Card style={{ minWidth: "80%" }}>
      <Card.Body style={{ alignSelf: "center" }}>
        <Card.Title>{"Section: " + props.section.sectionTitle}</Card.Title>
        <Card.Text
          style={{ fontSize: "18px", padding: "20px", textAlign: "left" }}
        >
          {introComponent}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
