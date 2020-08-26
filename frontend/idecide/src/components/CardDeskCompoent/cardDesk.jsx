import React, { Component } from "react";
import { Slider } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cards.css";
import "antd/dist/antd.css";
import questions2 from "./testdata.js";
import { getSurveyById, postingSurvey } from "../../API/surveyAPI";
import { Spinner, Button } from "react-bootstrap";

export default class CardDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {

      questions: null,
      fadeAwayState: false,
      skiped: { name: "skpied" },
    };
  }


  componentDidMount() {

    this.setState({
      questions: this.props.section.questions
    });
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
    console.log(item.questionId, result, 889);
    this.props.handleQuestion(item.questionId, result);
    this.handleClick(item);
    // this.props.handleNav(1);
  }

  questionTypeController(item) {
    if (item.questionType == "singleSelection") {
      return (
        <div className="questionContainer">
          <div className="composite-scale-container">
            <div className="option-container"
            // onChange={(e) =>
            //   this.props.handleQuestion(1, 6)
            // }
            >
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





          {/* <div className="button-container">
            <button
              className="btn"
              onClick={() => this.handleResult(item, this.state.skiped)}
            >
              i rather not anser
            </button>
          </div> */}
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

          {/* Need to discuss the format of the slider */}
          {/* <div className="label-container">
            {item.labellist.map((v, t) => (
              <span className="label" key={v.index}>
                {v.name}
              </span>
            ))}
          </div> */}

          {/* Need to discuss about the button locations */}
          <div className="button-container">
            <button
              className="btn"
              onClick={() => this.handleResult(item, this.state.skiped)}
            >
              I rather not answer
            </button>
            <button
              className="btn btn2"
              onClick={() => this.handleResult(item, silderresult)}
            >
              CONFIRM?
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="questionContainer">
          Error! Question type not supported!!!
          <Button
            className={"purple-gradient"}
            onClick={(e) => {
              this.handleSections(-1);
            }}
          >
            {"< Previous"}
          </Button>
          <Button
            className={"purple-gradient"}
            onClick={(e) => {
              this.handleSections(1);
            }}
          >
            {"Next Section>"}
          </Button>
        </div>
      );
    }
  }

  handleSections = async (direction) => {
    console.log(772, this.props.section.questions)
    await this.props.handleNav(direction);
    console.log(773, this.props.section.questions)
    this.setState({
      questions: this.props.section.questions
    });

  }




  render() {
    // console.log(883, this.props.section)
    var questions = this.state.questions;
    // var questions = this.props.section.questions;


    let fadeAwayState = this.state.fadeAwayState;
    if (questions == null) {
      return (
        <div className="cards-container cards-container-checkbox">
          Loading...
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
              {/* {console.log(773, item)} */}
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
            <div>Thanks for completing this section.</div>
            <div>
              <Button
                className={"purple-gradient"}
                onClick={(e) => {
                  this.handleSections(-1);
                }}
              >
                {"< Previous"}
              </Button>
              <Button
                className={"purple-gradient"}
                onClick={(e) => {
                  this.handleSections(1);
                }}
              >
                {"Next Section>"}
              </Button>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
