import React, { Component } from "react";
import {
  getSurveyById,
  postingSurvey,
  getActionPlanRuleEngineStrategy,
} from "../../API/surveyAPI";
import SurveySection from "./surveySection";
import { Spinner, Button, Container, Row, Col, Card } from "react-bootstrap";
import SurveyIntroductionPage from "./surveyIntroductionPage";
import SectionIntroductionPage from "./sectionIntroductionPage";
import SurveyResultsPage from "./surveyResultsPage";
import SectionResultsPage from "./sectionResultsPage";
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
      currentSurveyMapPosition: 0,
      // surveyPageMap tells us what to render when we hit 'next' or 'back'
      // will be of the form [[1,'introduction'],[1,'questions'],[2,'questions'],[3,'introduction']...]
      // which tells us firstly the index of the 'section' from the json, and then whether we're rendering q or intro
      // not all sections necessarily have an introduction
      surveyPageMap: null,
      percentageCompleted: 0,
      results: {
        userId: props.userId,
        surveyId: props.surveyId,
        questions: undefined,
      },
    };
    this.questionHandler = this.questionHandler.bind(this);
    this.handleNavigateSections = this.handleNavigateSections.bind(this);
    this.setupResults = this.setupResults.bind(this);
    this.populateSurveyPageMap = this.populateSurveyPageMap.bind(this);
  }

  currentSectionNumber() {
    const { surveyPageMap, currentSurveyMapPosition } = this.state;
    return surveyPageMap[currentSurveyMapPosition][0];
  }

  currentPageType() {
    const { surveyPageMap, currentSurveyMapPosition } = this.state;
    return surveyPageMap[currentSurveyMapPosition][1];
  }

  // build a map of pages + their orders
  // intro (optional) -> questions -> feedback (optional) -> [next section]
  populateSurveyPageMap(surveyFile) {
    var surveyPageMap = [];
    var sectionCounter = 0;
    for (var section of surveyFile.surveySections) {
      if (section.sectionIntroductionHtmlB64 || section.sectionIntroduction) {
        // if the file has an intro (html or text), note it in the map
        surveyPageMap.push([sectionCounter, "introduction"]);
      }

      surveyPageMap.push([sectionCounter, "questions"]);

      if (section.sectionResultAlgorithm) {
        // if the file has a result algorithm, note it on the map
        surveyPageMap.push([sectionCounter, "results"]);
      }

      sectionCounter++;
    }
    this.setState({ surveyPageMap: surveyPageMap });
  }

  async componentDidMount() {
    var surveyFile = await getSurveyById(this.props.surveyId);
    var newQuestions = this.setupResults(surveyFile);
    this.populateSurveyPageMap(surveyFile);

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
    const currentSection = this.currentSectionNumber();
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
    const currentSurveyMapPosition = this.state.currentSurveyMapPosition;

    if (
      currentSurveyMapPosition + lambdaSection >=
      this.state.surveyPageMap.length
    ) {
      this.submitHandler();
      this.setState({ percentageCompleted: 100 });
      this.saveSurveyResultsLocalStorage();
      return;
    } else if (currentSurveyMapPosition + lambdaSection >= 0) {
      this.saveSurveyResultsLocalStorage();
      this.setState(
        (prevState) => ({
          currentSurveyMapPosition:
            prevState.currentSurveyMapPosition + lambdaSection,
          sectionQuestions: this.state.surveyFile.surveySections[
            prevState.surveyPageMap[
              prevState.currentSurveyMapPosition + lambdaSection
            ][0]
          ],
          percentageCompleted:
            (100 * (prevState.currentSurveyMapPosition + lambdaSection)) /
            prevState.surveyPageMap.length,
        }),
        () => {
          // after updating state...

          if (this.currentPageType() === "results") {
            // if its a result section, we need to calculate section feedback if the algorithm exists
            var sectionResultAlgorithm = this.state.surveyFile.surveySections[
              this.currentSectionNumber()
            ].sectionResultAlgorithm;
            this.calculateFeedback(sectionResultAlgorithm);
          }
        }
      );
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

    //evaluate the final 'survey' level feedback if the algorithm exists
    var surveyResultAlgorithm = this.state.surveyFile.surveyResultAlgorithm;

    this.calculateFeedback(surveyResultAlgorithm);
  };

  saveSurveyResultsLocalStorage() {
    var surveyResults = JSON.parse(localStorage.getItem("surveyResults"));
    if (!surveyResults) {
      surveyResults = {};
    }
    //TODO once get a consistent survey ID across DB, use ID instead... ie the line below:
    // surveyResults[this.state.surveyFile.surveyId] = this.state.results;
    surveyResults[this.state.surveyFile.surveyTitle] = this.state.results;
    console.log("surveyResults being saved was", surveyResults);
    localStorage.setItem("surveyResults", JSON.stringify(surveyResults));
  }

  calculateFeedback(resultAlgorithm) {
    // debugger;
    //skip surveys that have no algorithm (have null for their alg)
    if (!resultAlgorithm) {
      //clears current result if there is no algorithm
      this.setState({
        feedbackText: null,
        feedbackImage: null,
        feedbackCategory: null,
      });
      return null;
    }
    evaluateRule(resultAlgorithm, []).then((results) => {
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
    const { isLoaded } = this.state;
    var renderArray = [];

    // the top bar with status of completion, name of survey etc
    renderArray.push(
      <Card style={{ zIndex: -1, width: "100%" }}>
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
            <Col>{Math.round(this.state.percentageCompleted)}% Completed</Col>
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
            <SurveyIntroductionPage
              returnHome={this.props.returnHome}
              survey={this.state.surveyFile}
              startSurvey={this.handleStart}
            />
          </div>
        );
      } else if (this.state.currentSurveyState === "started") {
        const pageType = this.currentPageType();

        if (pageType === "introduction") {
          //this is a section introduction
          renderArray.push(
            <SectionIntroductionPage
              section={
                this.state.surveyFile.surveySections[
                  this.currentSectionNumber()
                ]
              }
            />
          );
        } else if (pageType === "results") {
          //add section results page here...
          renderArray.push(
            <SectionResultsPage
              feedbackText={this.state.feedbackText}
              feedbackImage={this.state.feedbackImage}
              feedbackCategory={this.state.feedbackCategory}
            />
          );
        } else if (pageType === "questions") {
          //push the questions for the current section to the screen
          renderArray.push(
            <SurveySection
              questionHandler={this.questionHandler}
              section={
                this.state.surveyFile.surveySections[
                  this.currentSectionNumber()
                ]
              }
              results={this.state.results.questions}
            />
          );
        }
        // bottom navigation
        renderArray.push(
          <React.Fragment>
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
