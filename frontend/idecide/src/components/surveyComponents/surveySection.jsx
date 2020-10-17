import React from "react";
import QuestionSlider from "./questionComponents/questionSlider";
import SingleChoice from "./questionComponents/questionSingleChoice";
import QuestionYesOrNo from "./questionComponents/questionYesOrNo";
import DragableList from "../RankingComponent/DragableList";
import CardDeck from "../CardDeskCompoent/cardDeck";
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

  // /**
  //  * creates an array of question components, based on their types
  //  */
  // createQuestionArray() {
  //   return this.props.section.questions.map((question, index) => {
  //     if (question.questionType === "slider") {
  //       return (
  //         <div key={question.questionId}>
  //           <QuestionSlider
  //             handleChange={this.props.handleQuestion}
  //             id={question.questionId}
  //             currentValue={
  //               this.props.results[question.questionId].questionAnswer
  //             }
  //             question={question}
  //           />
  //         </div>
  //       );
  //     } else if (question.questionType === "singleSelection") {
  //       return (
  //         <div key={question.questionId}>
  //           <SingleChoice
  //             handleChange={this.props.handleQuestion}
  //             id={question.questionId}
  //             currentValue={
  //               this.props.results[question.questionId].questionAnswer
  //             }
  //             question={question}
  //           />
  //         </div>
  //       );
  //     } else if (question.questionType === "YorN") {
  //       return (
  //         <div key={question.questionId}>
  //           <QuestionYesOrNo
  //             handleChange={this.props.handleQuestion}
  //             id={question.questionId}
  //             currentValue={
  //               this.props.results[question.questionId].questionAnswer
  //             }
  //             question={question}
  //           />
  //         </div>
  //       );
  //     }
  //   });
  // }

  handleSectionType = (section) => {
    if (section.sectionType === undefined) {
      return (
        <CardDeck
          key={section.sectionId}
          handleAnswer={this.handleInputChange}
          section={section}
        />
      );
    } else if (section.sectionType === "ranking") {
      console.log("HERE ITS A DRAGGABLE LIST", section);
      return (
        <DragableList handleAnswer={this.handleInputChange} section={section} />
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ padding: "50px" }}>
          <h3 style={{ color: "#9572A4" }}>
            {this.props.section.sectionTitle}
          </h3>
        </div>
        {this.handleSectionType(this.props.section)}
        {/* <CardDeck
          key={this.props.section.sectionId}
          handleAnswer={this.handleInputChange}
          section={this.props.section}
        /> */}
      </React.Fragment>
    );
  }
}
