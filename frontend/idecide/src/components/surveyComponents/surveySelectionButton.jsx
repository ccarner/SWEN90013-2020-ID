import React from "react";
import { Card, Button } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import loadingSpinner from "./../reusableComponents/loadingSpinner";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const completedIcon = require("./iconCompleted.png");

/**
 * Simple component for displaying a survey option button
 * @param {*} props react props
 */
export default function SurveySelectionButton(props) {
  //this needs to be updated to pull an image from the server... need to change
  //the DTO to include the URL for these images. currently just uses same images...
  var imagelocation = props.completed === true ? completedIcon : props.icon;

  var description = props.shortSurveyDescription;

  //truncate the string if it's too loadingSpinner
  if (description.length > 120) {
    description = description.substring(0, 120);
    description += "…";
  }

  var buttonComponent = null;

  if (props.notAvailable) {
    buttonComponent = "Locked";
  } else if (props.completed) {
    buttonComponent = "Complete";
  } else {
    buttonComponent = (
      <React.Fragment>
        Start <ChevronRightIcon />
      </React.Fragment>
    );
  }
  return (
    <div>
      {/* <img src={imagelocation} alt="Survey_Icon" onClick={props.handleClick} /> */}
      <Card
        style={{
          width: "16rem",
          opacity: props.notAvailable || props.completed ? "0.7" : "1",
        }}
      >
        <Card.Img variant="top" src={imagelocation} />
        <Card.Body>
          <Card.Title>{props.surveyTitle}</Card.Title>
          <Card.Text style={{ fontSize: "18px", height: "10em" }}>
            {description}
          </Card.Text>

          <PrimaryButton
            disabled={props.notAvailable || props.completed}
            onClick={props.handleClick}
          >
            {buttonComponent}
          </PrimaryButton>
        </Card.Body>
      </Card>
    </div>
  );
}
