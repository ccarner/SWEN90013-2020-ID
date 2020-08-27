import React from "react";
import QuestionSlider from "./questionComponents/questionSlider";
import SingleChoice from "./questionComponents/questionSingleChoice";
import QuestionYesOrNo from "./questionComponents/questionYesOrNo";
import { MDBBtn, MDBInput, MDBContainer } from "mdbreact";

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

  handleInputChange(questionId, event) {
    const value = event.target.value;
    this.props.questionHandler(questionId, value);
  }

  /**
   * creates an array of question components, based on their types
   */
  createQuestionArray() {
    return this.props.section.questions.map((question, index) => {
      if (question.questionType === "slider") {
        return (
          <div key={question.questionId}>
            <QuestionSlider
              handleChange={this.props.handleQuestion}
              id={question.questionId}
              currentValue={
                this.props.results[question.questionId].questionAnswer
              }
              question={question}
            />
          </div>
        );
      } else if (question.questionType === "singleSelection") {
        return (
          <div key={question.questionId}>
            <SingleChoice
              handleChange={this.props.handleQuestion}
              id={question.questionId}
              currentValue={
                this.props.results[question.questionId].questionAnswer
              }
              question={question}
            />
          </div>
        );
      } else if (question.questionType === "YorN") {
        return (
          <div key={question.questionId}>
            <QuestionYesOrNo
              handleChange={this.props.handleQuestion}
              id={question.questionId}
              currentValue={
                this.props.results[question.questionId].questionAnswer
              }
              question={question}
            />
          </div>
        );
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ padding: "50px" }}>
          <h2 style={{ color: "purple" }}>{this.props.section.sectionTitle}</h2>
          <p style={{ color: "black" }}>
            {this.props.section.sectionIntroduction}
          </p>
        </div>

        <div className="questionContainer">{this.createQuestionArray()}</div>
      </React.Fragment>
    );
  }
}
