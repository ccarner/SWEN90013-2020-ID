import React from "react";
import { postingSurvey } from "../../API/surveyAPI";
import SurveySection from "./surveySection";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBBtn, MDBFormInline, MDBCol } from "mdbreact";
import { Spinner, Button } from "react-bootstrap";

export default class SurveyQuestions extends React.Component {
  constructor(props) {
    super(props);
    var questionResults = this.setupResults(props);
    this.state = {
      isLoaded: true,
      currentSection: 0,
      actionPlan: null,
      results: {
        userId: 1,
        surveyId: props.surveyFile.surveyId,
        sectionId: "ALL",
        completedTime: 99999,
        questions: questionResults,
      },
    };
    this.questionHandler = this.questionHandler.bind(this);
    this.handleNavigateSections = this.handleNavigateSections.bind(this);
  }

  /**
   * Sets up survey results array that will later be sent to the server
   * @param {*} props react component props
   */
  setupResults(props) {
    var questionResults = [];
    props.surveyFile.surveySections.forEach((section) => {
      section.questions.forEach((question) => {
        var questionResult = {};
        questionResult.questionId = question.questionId;
        questionResult.questionText = question.questionText;
        questionResult.questionType = question.questionType;
        questionResult.questionAnswer = null;
        questionResults[parseInt(question.questionId)] = questionResult;
      });
    });
    return questionResults;
  }

  /**
   * Called when answer to a question is changed
   * @param {*} questionId
   * @param {*} responseValue
   */
  questionHandler(questionId, responseValue) {
    const { currentSection } = this.state;
    const surveySections = this.props.surveyFile.surveySections;

    const currentQuestion =
      surveySections[currentSection].questions[questionId];

    var currentResults = this.state.results;
    currentResults["questions"][questionId]["questionAnswer"] = responseValue;
    this.setState({
      results: currentResults,
    });
  }

  handleNavigateSections(lambdaSection) {
    const currentSection = this.state.currentSection;
    if (
      currentSection + lambdaSection >
      this.props.surveyFile.surveySections.length
    ) {
      this.completeHandler(this.state.results);
    } else {
      this.setState({ currentSection: currentSection + lambdaSection });
    }
  }

  submitHandler = async (event) => {
    this.setState({
      isLoaded: false,
    });

    const feedback = await postingSurvey(this.state.results);
    this.setState({
      actionPlan: feedback.data.data,
      isLoaded: true,
    });
  };

  completeHandler = () => {
    this.props.completeHandler(this.state.results);
  };

  render() {
    const { isLoaded, currentSection, actionPlan } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <Spinner animation="border" />
        </div>
      );
    } else if (actionPlan) {
      return (
        <div>
          {actionPlan === "FINISHED" ? (
            <div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <button onClick={this.submitHandler}>Submit Survey</button>
            </div>
          ) : (
            <div>
              <h3 style={{ color: "purple" }}>
                You can see the message send to the backend by viewing console
              </h3>
              <br />
              <br />
              <br />
              <h3 style={{ color: "purple" }}>
                Message from the backend: <br />
                {actionPlan}
              </h3>
              <button onClick={this.completeHandler}>Complete</button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div className="container" style={{ padding: "50px" }}>
            <h2 style={{ color: "purple" }}>
              {
                this.props.surveyFile.surveySections[currentSection]
                  .sectionTitle
              }
            </h2>
            <p style={{ color: "black" }}>
              {
                this.props.surveyFile.surveySections[currentSection]
                  .sectionIntroduction
              }
            </p>
          </div>
          <SurveySection
            handleQuestion={this.questionHandler}
            section={
              this.props.surveyFile.surveySections[this.state.currentSection]
            }
            results={this.state.results.questions}
          />
          <Button
            className={"purple-gradient"}
            onClick={(e) => {
              this.handleNavigateSections(-1);
            }}
          >
            {"< Previous"}
          </Button>
          <Button
            className={"purple-gradient"}
            onClick={(e) => {
              this.handleNavigateSections(1);
            }}
          >
            {"Next >"}
          </Button>
        </div>
      );
    }
  }
}
