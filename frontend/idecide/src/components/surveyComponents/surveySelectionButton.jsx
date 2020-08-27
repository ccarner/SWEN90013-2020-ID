import React from "react";
import { Card, Button } from "react-bootstrap";
import { MDBBtn } from "mdbreact";

/**
 * Simple component for displaying a survey option button
 * @param {*} props react props
 */
export default function SurveySelectionButton(props) {
  //this needs to be updated to pull an image from the server... need to change
  //the DTO to include the URL for these images. currently just uses same images...
  var imagelocation =
    props.completed === true ? "./iconCompleted.png" : props.icon;
  return (
    <div>
      {/* <img src={imagelocation} alt="Survey_Icon" onClick={props.handleClick} /> */}
      <Card style={{ width: "12rem" }}>
        <Card.Img variant="top" src={imagelocation} />
        <Card.Body>
          <Card.Title>{props.surveyTitle}</Card.Title>
          <Card.Text>{props.shortSurveyDescription}</Card.Text>

          <MDBBtn gradient="purple" onClick={props.handleClick}>
            Take this Survey
          </MDBBtn>
        </Card.Body>
      </Card>
    </div>
  );
}
