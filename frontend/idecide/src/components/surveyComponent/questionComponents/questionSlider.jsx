import React, { Component } from "react";

export default class QuestionSlider extends Component {
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
    const question = this.props.question;
    const minVal = this.props.minvalue ? this.props.minvalue : "1";
    const maxVal = this.props.maxvalue ? this.props.minvalue : "10";
    const midVal = Math.floor(minVal / maxVal);

    return (
      <React.Fragment>
        <div style={{ color: "purple" }}>{question.questionText}</div>

        <div className="sliderContainer">
          <span className="sliderLabel">{question.sliderMinValue}</span>
          <input
            className="slider"
            id="sliderBar"
            name="option"
            type="range"
            value={this.props.currentValue ? this.props.currentValue : midVal}
            min={minVal}
            max={maxVal}
            onChange={(e) =>
              this.props.handleChange(
                this.props.question.questionId,
                e.target.value
              )
            }
          />
          <span className="sliderLabel">{question.sliderMaxValue}</span>
          <br />
          <input
            className="numInput"
            id="sliderNum"
            name="option"
            type="number"
            value={this.props.currentValue ? this.props.currentValue : midVal}
            min={minVal}
            max={maxVal}
            onChange={(e) => {
              this.props.handleChange(
                this.props.question.questionId,
                e.target.value
              );
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
