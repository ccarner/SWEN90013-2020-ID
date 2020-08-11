import React, { Component } from "react";
//import { Slider } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cards.css";
import questions from "./testdata.js";
class CardDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      len: questions.length, // question lenght
      questions: questions,
      fadeAwayState: false,
      skiped: { name: "skpied" },
    };
  }
  handleClick(item) {
    const _this = this;
    const questions = this.state.questions;
    console.log(item.questionId);
    _this.setState({
      questions: questions.filter((ite) => ite.questionId !== item.questionId),
      fadeAwayState: true,
    });
    setTimeout(() => {
      _this.setState({
        fadeAwayState: false,
        clickTapStatus: true,
      });
    }, 600);
  }

  handleResult(item, result) {
    //here will handle the result !
    console.log(item.questionId + " " + result);
    this.handleClick(item);
  }
  test() {
    return <h4> haha</h4>;
  }

  questionTypeController(item) {
    console.log(item);
    if (item.questionType == "singleSelection") {
      return (
        <div className="composite-scale-container">
          <div className="option-container">
            {item.selectionOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => this.handleResult(item, option)}
                className="composite-option-button"
              >
                <span className="composite-circle top"></span>
                <span className="composite-label bottom">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (item.questionType == "slider") {
      return <h4>slider</h4>;
    }
  }

  render() {
    const questionLen = this.state.len;
    const questions = this.state.questions;
    let fadeAwayState = this.state.fadeAwayState;

    const ItemList = (
      <TransitionGroup>
        {questions.map((item, index) => (
          <CSSTransition
            timeout={600}
            unmountOnExit
            classNames="fade"
            key={item.questionId}
          >
            <div
              className={`card-container ${index >= 4 ? "hide" : ""} 
              ${fadeAwayState && index === 0 ? " opaque" : ""}
              `}
              key={index}
            >
              <div className="counter">
                <h5 className="current">{item.questionId}</h5>
                <h5>/{questionLen}</h5>
              </div>

              <h4 className="primary-card-text">{item.questionText}</h4>
              {this.questionTypeController(item)}

              <div className="button-container">
                <button
                  className="btn"
                  onClick={() => this.handleResult(item, this.state.skiped)}
                >
                  i rather not anser
                </button>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );

    return (
      <div className="cards-container cards-container-checkbox">
        <div className="cards-wrapper">
          <ul className="cards-list">
            {ItemList}
            <div>Thanks for completing this exercise.</div>
          </ul>
        </div>
      </div>
    );
  }
}

export default CardDesk;
