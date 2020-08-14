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
      sectionCount: 0,
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

  questionHandler(questionId, responseValue) {
    const { sectionCount } = this.state;
    const surveySections = this.props.surveyFile.surveySections;

    const currentQuestion = surveySections[sectionCount].questions[questionId];

    var currentResults = this.state.results;
    currentResults["questions"][questionId]["questionAnswer"] = responseValue;
    this.setState({
      results: currentResults,
    });

    // if (this.state.sectionCount + 1 >= this.state.surveySections.length) {
    //   if (sectionCount + 1 >= surveySections.length) {
    //     this.setState({
    //       actionPlan: "FINISHED",
    //     });
    //   } else {
    //     this.setState({
    //       sectionCount: this.state.sectionCount + 1,
    //       questionCount: 0,
    //     });
    //   }
    // } else {
    //   this.setState({
    //     questionCount: this.state.questionCount + 1,
    //   });
    // }
  }

  handleNavigateSections(lambdaSection) {
    const currentSection = this.state.sectionCount;
    if (
      currentSection + lambdaSection >
      this.props.surveyFile.surveySections.length
    ) {
      this.completeHandler(this.state.results);
    } else {
      this.setState({ sectionCount: currentSection + lambdaSection });
    }
  }

  submitHandler = async (event) => {
    console.log(
      "Data send to the backend:",
      this.state.results,
      ":Data send to the backend"
    );

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
    const { isLoaded, sectionCount, actionPlan } = this.state;
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
              {this.props.surveyFile.surveySections[sectionCount].sectionTitle}
            </h2>
            <p style={{ color: "black" }}>
              {
                this.props.surveyFile.surveySections[sectionCount]
                  .sectionIntroduction
              }
            </p>
          </div>
          <SurveySection
            handleQuestion={this.questionHandler}
            section={
              this.props.surveyFile.surveySections[this.state.sectionCount]
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
