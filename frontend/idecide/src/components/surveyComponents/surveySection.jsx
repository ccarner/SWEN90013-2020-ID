import React from "react";
import QuestionSlider from "./questionComponents/questionSlider";
import SingleChoice from "./questionComponents/questionSingleChoice";
import QuestionYesOrNo from "./questionComponents/questionYesOrNo";
import DragableList from "../RankingComponent/DragableList";
import CardDeck from "../CardDeskCompoent/cardDeck";
import { Card, Typography } from "@material-ui/core";

/**
 * This component handles the DISPLAY of a section in a survey. State is contained
 * in the parent component (SurveyControl)
 */
export default class SurveySection extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setState = this.setState.bind(this);
  }

  handleInputChange(questionId, newValue) {
    this.props.questionHandler(questionId, newValue);
  }

  handleSectionType = (section) => {
    return (
      <CardDeck
        key={section.sectionId}
        handleAnswer={this.handleInputChange}
        section={section}
        canProgress={this.props.canProgress}
      />
    );
  };

  render() {
    return (
      <div>
        <Typography
          style={{ color: "white", margin: "5%" }}
          gutterBottom
          variant="h3"
        >
          {this.props.section.sectionTitleText}
        </Typography>
        {this.handleSectionType(this.props.section)}
      </div>
    );
  }
}
