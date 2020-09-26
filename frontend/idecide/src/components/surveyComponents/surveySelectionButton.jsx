import React from "react";
import { Card, Button } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import loadingSpinner from "./../reusableComponents/loadingSpinner";

/**
 * Simple component for displaying a survey option button
 * @param {*} props react props
 */
export default function SurveySelectionButton(props) {
  //this needs to be updated to pull an image from the server... need to change
  //the DTO to include the URL for these images. currently just uses same images...
  var imagelocation =
    props.completed === true ? "./iconCompleted.png" : props.icon;

  var description = props.shortSurveyDescription;

  //truncate the string if it's too loadingSpinner
  if (description.length > 140) {
    description = description.substring(0, 140);
    description += "…";
  }
  return (
    <div>
      {/* <img src={imagelocation} alt="Survey_Icon" onClick={props.handleClick} /> */}
      <Card style={{ width: "16rem" }}>
        <Card.Img variant="top" src={imagelocation} />
        <Card.Body>
          <Card.Title>{props.surveyTitle}</Card.Title>
          <Card.Text style={{ fontSize: "18px", height: "10em" }}>
            {description}
          </Card.Text>

          <PrimaryButton
            disabled={props.notAvailable}
            onClick={props.handleClick}
          >
            {props.notAvailable ? "Locked" : "Start >>"}
          </PrimaryButton>
        </Card.Body>
      </Card>
    </div>
  );
}
