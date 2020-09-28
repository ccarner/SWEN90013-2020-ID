import React, { Component } from "react";
import {
  getSurveyById,
  postingSurvey,
  getActionPlanRuleEngineStrategy,
} from "../../API/surveyAPI";
import SurveySection from "./surveySection";
import { Spinner, Button, Container, Row, Col, Card } from "react-bootstrap";
import SurveyInformationPage from "./surveyInformationPage";
import SurveyResultsPage from "./surveyResultsPage";
import ProgressBar from "../reusableComponents/progressBar";
import LoadingSpinner from "../reusableComponents/loadingSpinner";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import evaluateRule from "../RuleEngine/evaluateFeedback";

/**
 * This component is passed an ID for a survey, and then:
 * a) fetches survey data from server
 * b) displays the different parts of the survey (introduction > sections > results)
 * c) stores state of survey while being completed
 * d) submits the survey to the server after completion
 */
export default class SurveyControl extends Component {
  constructor(props) {
    super();

    this.state = {
      isLoaded: false,
      feedbackText: null,
      feedbackImage: null,
      feedbackCategory: null,
      surveyFile: {},
      sectionQuestions: null,
      currentSurveyState: "introduction", // ["introduction", "started", "submitted"]
      currentSection: 0,
      percentageCompleted: 0,
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
      return {
        isLoaded: true,
        surveyFile: surveyFile,
        sectionQuestions: surveyFile.surveySections[0],
        results: newResults,
      };
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
    console.log("QuestionResults is", questionResults);
    return questionResults;
  }

  /**
   * Called when user selects an answer to a question
   * @param {*} questionId
   * @param {*} responseValue
   */
  questionHandler(questionId, responseValue) {
    const { currentSection } = this.state;
    const surveySections = this.state.surveyFile.surveySections;

    const currentQuestion =
      surveySections[currentSection].questions[questionId];

    var currentResults = this.state.results;
    currentResults["questions"][questionId]["questionAnswer"] = [responseValue];
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
      console.log(553, "submitting");
      this.submitHandler();
      this.setState({ percentageCompleted: 100 });
      return;
    } else if (currentSection + lambdaSection >= 0) {
      this.setState((prevState) => ({
        currentSection: prevState.currentSection + lambdaSection,
        sectionQuestions: this.state.surveyFile.surveySections[
          currentSection + lambdaSection
        ],
        percentageCompleted:
          (100 * (prevState.currentSection + lambdaSection)) /
          prevState.surveyFile.surveySections.length,
      }));
    }
    //else do nothing if somehow trying to go to invalid negative section
  }

  submitHandler = async () => {
    this.setState({ isLoaded: false });
    console.log(550, "posted this data", JSON.stringify(this.state.results));
    const feedBack = await postingSurvey(this.state.results);
    this.props.completeHandler(this.state.results);
    console.log(555, "received from the backend", feedBack);
    this.setState({ isLoaded: true, currentSurveyState: "submitted" });
    this.calculateFeedback();
  };

  calculateFeedback() {
    //skip surveys that have no algorithm (have null for their alg)
    if (!this.state.surveyFile.resultAlgorithm) {
      return null;
    }
    evaluateRule(this.state.surveyFile.resultAlgorithm.rules, [
      {
        factName: "surveyAnswers",
        fact: this.state.results.questions,
      },
    ]).then((results) => {
      console.log(results.events);
      this.setState({
        feedbackText: results.events[0].params.responseString,
        feedbackImage: results.events[0].params.imageLink,
        feedbackCategory: results.events[0].params.categoryName,
      });
    });
  }

  handleStart = () => {
    this.setState({
      currentSurveyState: "started",
    });
  };

  render() {
    const { isLoaded, currentSection, actionPlan } = this.state;
    var renderArray = [];

    renderArray.push(
      <Card style={{ zIndex: -1 }}>
        <Container>
          <Row className="align-items-center">
            <Col>
              <h3 style={{ color: "#9572A4", margin: "20px" }}>
                {this.state.surveyFile.surveyTitle}
              </h3>
            </Col>
            <Col>
              <ProgressBar
                showLabel={false}
                value={this.state.percentageCompleted}
              />
            </Col>
            <Col>{this.state.percentageCompleted}% Completed</Col>
          </Row>
        </Container>
      </Card>
    );

    if (!isLoaded) {
      renderArray.push(
        <div>
          <LoadingSpinner />
        </div>
      );
    } else {
      //we have loaded
      if (this.state.currentSurveyState === "introduction") {
        renderArray.push(
          <div>
            <SurveyInformationPage
              returnHome={this.props.returnHome}
              survey={this.state.surveyFile}
              startSurvey={this.handleStart}
            />
          </div>
        );
      } else if (this.state.currentSurveyState === "started") {
        renderArray.push(
          <React.Fragment>
            <SurveySection
              questionHandler={this.questionHandler}
              section={
                this.state.surveyFile.surveySections[this.state.currentSection]
              }
              results={this.state.results.questions}
            />

            <Card
              style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
              }}
            >
              <Container>
                <Row className="align-items-center">
                  <Col>
                    <PrimaryButton
                      onClick={(e) => {
                        this.handleNavigateSections(-1);
                      }}
                    >
                      {"< Previous"}
                    </PrimaryButton>
                  </Col>
                  <Col>
                    <PrimaryButton
                      onClick={(e) => {
                        this.handleNavigateSections(1);
                      }}
                    >
                      {"Next >"}
                    </PrimaryButton>
                  </Col>
                </Row>
              </Container>
            </Card>
          </React.Fragment>
        );
      } else if (this.state.currentSurveyState === "submitted") {
        renderArray.push(
          <SurveyResultsPage
            returnHome={this.props.returnHome}
            surveyResults={this.state.results.questions}
            feedbackText={this.state.feedbackText}
            feedbackImage={this.state.feedbackImage}
            feedbackCategory={this.state.feedbackCategory}
          />
        );
      }
    }

    return renderArray;
  }
}
