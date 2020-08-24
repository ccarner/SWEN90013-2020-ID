import React from "react";
import QuestionSlider from "./questionComponents/questionSlider";
import SingleChoice from "./questionComponents/questionSingleChoice";
import { MDBBtn, MDBInput, MDBContainer } from "mdbreact";

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

  // render() {
  //   const question = this.props.question;
  //   const options = question.selectionOptions;
  //   // return (
  //   //   <div className="questionContainer">
  //   //     <form onSubmit={this.handleQuestion}>
  //   //       <div style={{ color: "purple" }}>{question.questionText}</div>

  //   //       {question.questionType === "slider" ? (
  //   //         <div className="sliderContainer">
  //   //           <span className="sliderLabel">{question.sliderMinValue}</span>
  //   //           <input
  //   //             className="slider"
  //   //             id="sliderBar"
  //   //             name="option"
  //   //             type="range"
  //   //             min="1"
  //   //             max="10"
  //   //             onChange={this.handleChange}
  //   //           />
  //   //           <span className="sliderLabel">{question.sliderMaxValue}</span>
  //   //           <br />
  //   //           <input
  //   //             className="numInput"
  //   //             id="sliderNum"
  //   //             name="option"
  //   //             type="number"
  //   //             min="1"
  //   //             max="10"
  //   //             onChange={this.handleChange}
  //   //           />
  //   //         </div>
  //   //       ) : question.questionType === "singleSelection" ? (
  //   //         <div className="radio-toolbar">
  //   //           <input
  //   //             type="radio"
  //   //             id="option0"
  //   //             name="questionResult"
  //   //             value="option0"
  //   //           />
  //   //           <label htmlFor="option0">{options[0]}</label>

  //   //           <input
  //   //             type="radio"
  //   //             id="option1"
  //   //             name="questionResult"
  //   //             value="option1"
  //   //           />
  //   //           <label htmlFor="option1">{options[1]}</label>

  //   //           <input
  //   //             type="radio"
  //   //             id="option2"
  //   //             name="questionResult"
  //   //             value="option2"
  //   //           />
  //   //           <label htmlFor="option2">{options[2]}</label>

  //   //           <input
  //   //             type="radio"
  //   //             id="option3"
  //   //             name="questionResult"
  //   //             value="option3"
  //   //           />
  //   //           <label htmlFor="option3">{options[3]}</label>

  //   //           <input
  //   //             type="radio"
  //   //             id="option4"
  //   //             name="questionResult"
  //   //             value="option4"
  //   //           />
  //   //           <label htmlFor="option4">{options[4]}</label>
  //   //         </div>
  //   //       ) : question.questionType === "YorN" ? (
  //   //         <div className="radio-toolbar">
  //   //           <input
  //   //             type="radio"
  //   //             id="option0"
  //   //             name="questionResult"
  //   //             value="option0"
  //   //           />
  //   //           <label htmlFor="option0">{options[0]}</label>

  //   //           <input
  //   //             type="radio"
  //   //             id="option1"
  //   //             name="questionResult"
  //   //             value="option1"
  //   //           />
  //   //           <label htmlFor="option1">{options[1]}</label>
  //   //         </div>
  //   //       ) : (
  //   //         "Unrecognized Question Type"
  //   //       )}
  //   //       <button>NEXT</button>
  //   //     </form>
  //   //   </div>
  //   // );
  // }
}
