import React, { Component } from "react";
import { Slider } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cards.css";
import "antd/dist/antd.css";
import { getSurveyById, postingSurvey } from "../../API/surveyAPI";
import { Spinner, Button } from "react-bootstrap";
import LoadingSpinner from "../reusableComponents/loadingSpinner";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.section.questions,
      //questions arrau will be filtered as questions are completed...
      //...so it DOES need to be in state here
      fadeAwayState: false,
      skipped: { name: "skipped" }, //not sure what this does currently
    };
  }

  handleClick(item) {
    const _this = this;
    const questions = this.state.questions;
    this.setState({
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
    this.props.handleAnswer(item.questionId, result);
    this.handleClick(item);
  }

  questionTypeController(item) {
    if (item.questionType === "singleSelection") {
      return (
        <div className="questionContainer">
          <div className="composite-scale-container">
            <div className="option-container">
              {item.selectionOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => this.handleResult(item, option)}
                  className="composite-option-button"
                >
                  <span className="composite-circle top"></span>
                  <span className="composite-label bottom">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (item.questionType == "slider") {
      let silderresult = 0;

      return (
        <div className="questionContainer">
          <Slider
            ref={`slider-${item.questionId}`}
            className="ranger-container-silder"
            defaultValue={0}
            min={item.sliderMinValue}
            max={item.sliderMaxValue}
            onAfterChange={(event) => {
              silderresult = event;
            }}
          />

          {/* Need to discuss about the button locations */}
          <div className="button-container">
            <button
              className="btn"
              onClick={() => this.handleResult(item, this.state.skipped)}
            >
              I'd rather not answer
            </button>
            <button
              className="btn btn2"
              onClick={() => this.handleResult(item, silderresult)}
            >
              CONFIRM
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="questionContainer">
          Error, question type not supported.
        </div>
      );
    }
  }

  render() {
    const questions = this.state.questions;

    let fadeAwayState = this.state.fadeAwayState;
    if (questions == null) {
      return (
        <div className="cards-container cards-container-checkbox">
          <LoadingSpinner />
        </div>
      );
    }

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
                <h5>/{questions.length + parseInt(item.questionId) - 1}</h5>
              </div>

              <h4 className="primary-card-text">{item.questionText}</h4>

              {this.questionTypeController(item)}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );

    return (
      <div className="cards-container cards-container-checkbox">
        <div className="cards-wrapper">
          <div className="cards-list">
            {ItemList}
            <div>Thanks for completing this section.</div>
          </div>
        </div>
      </div>
    );
  }
}
