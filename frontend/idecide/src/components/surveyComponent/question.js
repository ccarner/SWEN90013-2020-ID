import React from "react";
import { MDBBtn, MDBInput, MDBContainer } from "mdbreact";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleQuestion = (event) => {
    // the following call will stop the form from submitting
    event.preventDefault();

    // get the data from the form
    const dataForm = new FormData(event.target);
    var formObject = {};
    dataForm.forEach((value, key) => {
      formObject[key] = value;
    });

    this.props.handleQuestion(formObject);
  };

  render() {
    const question = this.props.question;
    const options = question.selectionOptions;
    return (
      <div>
        <form onSubmit={this.handleQuestion}>
          <div style={{ color: "purple" }}>{question.questionText}</div>

          {question.questionType === "slider" ? (
            <div className="sliderContainer">
              <input
                className="slider"
                name="option"
                type="range"
                min="1"
                max="10"
              />
            </div>
          ) : question.questionType === "singleSelection" ? (
            <div onClick={this.questionHandler} className="font-of-input-box">
              <form className="f-display">
                <div className="label">
                  <label hlabel htmlFor="option0">
                    <input type="radio" value="option1" unchecked={true} />
                    {options[0]}
                  </label>
                </div>
                <div className="radio">
                  <label hlabel htmlFor="option2">
                    <input type="radio" value="option2" unchecked={true} />
                    {options[1]}:
                  </label>
                </div>

                <div className="radio">
                  <label hlabel htmlFor="option3">
                    <input type="radio" value="option3" unchecked={true} />
                    {options[2]}:
                  </label>
                </div>

                <div className="radio">
                  <label hlabel htmlFor="option4">
                    <input type="radio" value="option4" unchecked={true} />
                    {options[3]}:
                  </label>
                </div>

                <div className="radio">
                  <label hlabel htmlFor="option5">
                    <input type="radio" value="option5" unchecked={true} />
                    {options[4]}:
                  </label>
                </div>
              </form>

              {/* <br /><button >Rather not to say</button><br /> */}
            </div>
          ) : (
            "Unrecognized Question Type"
          )}
          <button>NEXT</button>
        </form>
      </div>
    );
  }
}
