import React, { Component } from "react";
import { Slider } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cards.css";
import "antd/dist/antd.css";
import sectionInfo from "./testdata.js";
import JsonRuleEngine from "../RuleEngine/jsonRule.js";
export default class CardDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionInfo: sectionInfo,
      len: sectionInfo[0]["questions"].length, // question lenght
      questions: sectionInfo[0]["questions"],
      algorithmRelated: sectionInfo[0]["algorithmRelated"],
      enginRule: sectionInfo[0]["enginRule"],
      feedback: sectionInfo[0]["feedback"],
      CasResult: "",
      fadeAwayState: false,
      skiped: { name: "skpied", weight: "0" },
      result: [],
    };
    console.log(this.state.algorithmRelated);
  }
  handleClick(item) {
    const _this = this;
    const questions = this.state.questions;
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
    console.log(item.questionId + " " + result.weight);
    var currentResults = this.state.result;
    currentResults.push({
      questionId: item.questionId,
      answer: result,
    });
    this.setState({
      result: currentResults,
    });
    this.handleClick(item);
    //this.props.completeHandler(this.state.result);
    if (item.questionId == this.state.len) {
      //console.log(this.state.result);

      JsonRuleEngine(
        this.state.result,
        this.state.algorithmRelated,
        this.state.enginRule,
        this.handleCASResult
      );
    }
  }
  handleCASResult = (casResult) => {
    this.setState({
      CasResult: casResult,
    });
  };

  questionTypeController(item) {
    if (item.questionType == "singleSelection") {
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
                  <span className="composite-label bottom">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="button-container">
            <button
              className="btn"
              onClick={() => this.handleResult(item, this.state.skiped)}
            >
              i rather not anser
            </button>
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

          <div className="label-container">
            {item.labellist.map((v, t) => (
              <span className="label" key={v.index}>
                {v.name}
              </span>
            ))}
          </div>
          <div className="button-container">
            <button
              className="btn"
              onClick={() => this.handleResult(item, this.state.skiped)}
            >
              I rather not answer
            </button>
            <button
              className="btn btn2"
              onClick={() => this.handleResult(item, { weight: silderresult })}
            >
              CONFIRM?
            </button>
          </div>
        </div>
      );
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
            <div>{this.state.CasResult}</div>
          </ul>
        </div>
      </div>
    );
  }
}
