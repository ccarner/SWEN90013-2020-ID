import React, { Component } from "react";

export default class QuestionYesOrNo extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         currentValue : this.props.question.sliderDefaultValue
  //     };
  //     this.handlechange = this.handleChange.bind(this)
  //     this.setState = this.setState.bind(this)
  //   }

  // handleChange(event){
  //     this.setState({currentValue: event.target.value})
  // }

  render() {
    const options = this.props.question.selectionOptions;
    return (
      <div className="radio-toolbar">
        {options.map((option, index) => {
          return (
            <React.Fragment key={option}>
              <input
                type="radio"
                id={option + this.props.question.questionId}
                name={"options" + this.props.question.questionId}
                key={option}
                value={option}
                checked={this.props.currentValue[0] === option}
                onChange={(e) => {
                  return this.props.handleChange(
                    this.props.question.questionId,
                    [option]
                  );
                }}
              />
              <label htmlFor={option + this.props.question.questionId}>
                {option}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
