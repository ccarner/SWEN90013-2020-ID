import React from "react";
import { Card } from "react-bootstrap";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SurveyInformationPage(props) {
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
    <div>
      <Card className="surveyIntroCard" style={{ width: "80%" }}>
        <Card.Body>
          <Card.Title>{"Section: " + props.section.sectionTitle}</Card.Title>
          <Card.Text
            style={{ fontSize: "18px", padding: "20px", textAlign: "left" }}
          >
            {introComponent}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
