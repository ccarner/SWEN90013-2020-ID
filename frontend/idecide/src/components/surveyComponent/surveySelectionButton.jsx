import React from "react";

export default function SurveySelectionButton(props) {
  //this needs to be updated to pull an image from the server... need to change
  //the DTO to include the URL for these images
  var imagelocation =
    props.completed === true
      ? "./iconRelationshipSurvey.png"
      : "./iconCompleted.png";
  return (
    <div>
      <img
        src={require("./iconRelationshipSurvey.png")}
        alt="Relationship_Survey_Icon"
        onClick={props.handleClick}
      />
    </div>
  );
}
