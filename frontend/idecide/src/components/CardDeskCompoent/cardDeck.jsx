import React, { Component } from "react";
import { Slider } from "antd";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cards.css";
import "antd/dist/antd.css";
import LoadingSpinner from "../reusableComponents/loadingSpinner";
import SortableComponent from "../RankingComponent/testSortable";
import PrimaryButton from "./../reusableComponents/PrimaryButton";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      questionLen: null,
      algorithmRelatedQuestion: null,
      enginRule: null,
      feedback: null,
      fadeAwayState: false,
      skiped: { name: "skpied" },
      result: [],
    };
    this.changeChild = React.createRef();
  }

  componentDidMount() {
    this.setState({
      questions: this.props.section.questions,
      questionLen: this.props.section.questions.length,
      algorithmRelatedQuestion: this.props.section.algorithmRelatedQuestion,
      enginRule: this.props.section.enginRule,
      feedback: this.props.section.feedback,
    });
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
    //here will handle the result !

    this.props.handleAnswer(item.questionId, result);

    var currentResults = this.state.result;
    currentResults.push({
      questionId: item.questionId,
      answer: result,
    });
    this.setState({
      result: currentResults,
    });

    this.handleClick(item);
    console.log(
      parseInt(item.questionId) + " :" + parseInt(this.state.questionLen)
    );
    // if (item.questionId == this.state.questionLen) {
    //   JsonRuleEngine(
    //     this.state.result,
    //     this.state.algorithmRelatedQuestion,
    //     this.state.enginRule,
    //     this.handleCASResult
    //   );
    // }
    // this.props.handleNav(1);
  }

  // handleCASResult = (casResult) => {
  //   this.setState({
  //     CasResult: casResult,
  //   });
  // };

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
    } else if (item.questionType === "slider") {
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
            <PrimaryButton
              onClick={() => this.handleResult(item, this.state.skiped)}
            >
              Skip
            </PrimaryButton>
            <PrimaryButton
              onClick={() => this.handleResult(item, silderresult)}
            >
              CONFIRM
            </PrimaryButton>
          </div>
        </div>
      );
    } else if (item.questionType === "yesOrNo") {
      return (
        <div className="questionContainer">
          <div className="button-container">
            <PrimaryButton
              gradient="aqua"
              style={{ border: "none", "border-radius": "15px" }}
              onClick={() => this.handleResult(item, "No")}
            >
              No
            </PrimaryButton>
            <PrimaryButton
              style={{ border: "none", "border-radius": "15px" }}
              onClick={() => this.handleResult(item, "Yes")}
            >
              Yes
            </PrimaryButton>
          </div>
        </div>
      );
    } else if (item.questionType === "singleSelectionVertical") {
      return (
        <div className="questionContainer">
          <div className="composite-scale-container">
            <div className="option-container-vertical">
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
    } else if (item.questionType === "ranking") {
      return (
        <div className="questionContainer">
          <SortableComponent
            options={item.selectionOptions}
            ref={this.changeChild}
          />
          <div className="button-container">
            <PrimaryButton
              onClick={() => {
                this.handleResult(item, this.changeChild.current.state.items);
              }}
            >
              CONFIRM
            </PrimaryButton>
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

  handleSections = async (direction) => {
    await this.props.handleNav(direction);

    this.setState({
      questions: this.props.section.questions,
      questionLen: this.props.section.questions.length,
      algorithmRelatedQuestion: this.props.section.algorithmRelatedQuestion,
      enginRule: this.props.section.enginRule,
      feedback: this.props.section.feedback,
    });
  };

  render() {
    var questions = this.state.questions;

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
              <div className="counter" style={{ marginTop: 40 }}>
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
            <div>Section Complete</div>
          </div>
        </div>
      </div>
    );
  }
}
