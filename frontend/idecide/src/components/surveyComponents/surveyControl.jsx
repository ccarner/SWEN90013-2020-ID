import React, { Component } from "react";
import { getSurveyById, postingSurvey } from "../../API/surveyAPI";
import SurveySection from "./surveySection";
import { Spinner, Button } from "react-bootstrap";
import SurveyInformationPage from "./surveyInformationPage";
import SurveyResultsPage from "./surveyResultsPage";

/**
 * This component is passed an ID for a survey, and then:
 * a) fetches survey data from server
 * b) displays the different parts of the survey (introduction > sections > results)
 * c) stores state of survey while being completed
 * d) submits the survey to the server after completion
 */
export default class SurveyControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      actionPlan: null,
      surveyFile: {},
      currentSurveyState: "introduction", // ["introduction", "started", "submitted"]
      currentSection: 0,
      results: {
        userId: props.userId,
        surveyId: props.surveyId,
        sectionId: "ALL",
        completedTime: 99999,
        questions: undefined,
      },
    };
    this.questionHandler = this.questionHandler.bind(this);
    this.handleNavigateSections = this.handleNavigateSections.bind(this);
    this.setupResults = this.setupResults.bind(this);
  }

  async componentDidMount() {
    var surveyFile = await getSurveyById(this.props.surveyId);

    var newQuestions = this.setupResults(surveyFile);
    this.setState((prevState) => {
      var newResults = prevState.results;
      newResults.questions = newQuestions;
      return { isLoaded: true, surveyFile: surveyFile, results: newResults };
    });
  }

  /**
   * Sets up survey results array that will later be sent to the server
   */
  setupResults(surveyFile) {
    var questionResults = [];
    surveyFile.surveySections.forEach((section) => {
      section.questions.forEach((question) => {
        var questionResult = {};
        questionResult.questionId = question.questionId;
        questionResult.questionText = question.questionText;
        questionResult.questionType = question.questionType;
        questionResult.questionAnswer = [];
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
    const surveySections = this.state.surveyFile.surveySections;

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
      currentSection + lambdaSection >=
      this.state.surveyFile.surveySections.length
    ) {
      this.submitHandler();
    } else if (currentSection + lambdaSection >= 0) {
      this.setState((prevState) => ({
        currentSection: prevState.currentSection + lambdaSection,
      }));
    }
    //else do nothing if somehow trying to go to invalid negative section
  }

  submitHandler = async () => {
    console.log("posted this data", this.state.results);

    // postingSurvey(this.state.results);
    postingSurvey(this.state.results);
    this.props.completeHandler(this.state.results);
  };

  handleStart = () => {
    this.setState({
      currentSurveyState: "started",
    });
  };

  render() {
    const { isLoaded, currentSection, actionPlan } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <Spinner animation="border" />
        </div>
      );
    } else if (this.state.currentSurveyState === "introduction") {
      return (
        <SurveyInformationPage
          survey={this.state.surveyFile}
          startSurvey={this.handleStart}
        />
      );
    } else if (this.state.currentSurveyState === "started") {
      return (
        <React.Fragment>
          <SurveySection
            handleQuestion={this.questionHandler}
            section={
              this.state.surveyFile.surveySections[this.state.currentSection]
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
        </React.Fragment>
      );
    } else if (this.state.currentSurveyState === "completed") {
      return <SurveyResultsPage />;
    }
  }
}
