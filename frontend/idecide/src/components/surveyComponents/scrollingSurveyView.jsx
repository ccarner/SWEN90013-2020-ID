//this was helpful in creating horizontal scrolling: https://medium.com/@rexosariemen/implementing-horizontal-scroll-buttons-in-react-61e0bb431be
import React, { Component } from "react";
import SurveySelectionButton from "./surveySelectionButton";
import SurveyResultsPage from "./surveyResultsPage";
import ActionPlans from "./actionPlans";
import { Card, Button } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

var toPX = require("to-px");

export default class ScrollingSurveyView extends Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.handleNav = this.handleNav.bind(this);
  }

  //return the first survey that is 'next'
  findNextSurvey() {
    for (var index = 0; index < this.props.allSurveys.length; index++) {
      if (
        this.props.completionStatus[this.props.allSurveys[index].surveyId] ===
        "Next"
      ) {
        console.log("next survey was", index);
        return index;
      }
    }
    console.log("next survey not found");
    return -1;
  }

  componentDidMount() {
    const nextSurvey = this.findNextSurvey();
    this.handleNav("right", nextSurvey);
  }

  handleNav(direction, numIterations) {
    //cards are 16em + 1em for spacing of 0.5em on both sides
    const sizeOfCardEm = toPX("17em");
    if (direction === "left") {
      if (this.navRef !== null)
        this.navRef.current.scrollLeft -= sizeOfCardEm * numIterations;
    } else {
      if (this.navRef !== null)
        this.navRef.current.scrollLeft += sizeOfCardEm * numIterations;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            maxWidth: "100vw",
            // padding: "4em",
          }}
          ref={this.navRef}
        >
          {this.props.allSurveys.map((survey) => (
            <div
              key={survey.surveyId}
              className="surveyIcon"
              style={{ whiteSpace: "normal" }}
            >
              <SurveySelectionButton
                style={{ display: "inline-block", borderRight: "10em" }}
                notAvailable={
                  // false && // uncomment this line to test surveys
                  this.props.completionStatus[survey.surveyId] === "Locked"
                }
                icon={this.props.getSurveyImage(survey)}
                completed={
                  // false && // uncomment this line to test surveys
                  this.props.completionStatus[survey.surveyId] === "Completed"
                }
                surveyTitle={survey.surveyTitle}
                shortSurveyDescription={survey.surveyIntroduction}
                handleClick={() => {
                  this.props.startSurvey(survey.surveyId);
                }}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
