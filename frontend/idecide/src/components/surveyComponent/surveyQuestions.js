import React from "react";
import { postingSurvey } from "../../API/surveyAPI";
import Question from "./question";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBBtn, MDBFormInline, MDBCol } from "mdbreact";

export default class SurveyQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      questionCount: 0,
      sectionCount: 0,
      surveySections: props.allSections,
      actionPlan: null,
      results: {
        userId: 1,
        surveyId: props.surveyFile.surveyId,
        sectionId: "ALL",
        completedTime: 99999,
        questions: [],
      },
    };
    this.questionHandler = this.questionHandler.bind(this);
  }

  questionHandler(received) {
    const { questionCount, sectionCount, surveySections } = this.state;
    const currentQuestion =
      surveySections[sectionCount].questions[questionCount];

    var currentResults = this.state.results;
    currentResults["questions"].push({
      questionId: currentQuestion.questionId,
      questionText: currentQuestion.questionText,
      questionType: currentQuestion.questionType,
      questionAnswer: received,
    });
    this.setState({
      results: currentResults,
    });

    if (
      this.state.questionCount + 1 >=
      this.state.surveySections[this.state.sectionCount].questions.length
    ) {
      if (sectionCount + 1 >= surveySections.length) {
        this.setState({
          actionPlan: "FINISHED",
        });
      } else {
        this.setState({
          sectionCount: this.state.sectionCount + 1,
          questionCount: 0,
        });
      }
    } else {
      this.setState({
        questionCount: this.state.questionCount + 1,
      });
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
    const {
      isLoaded,
      surveySections,
      questionCount,
      sectionCount,
      actionPlan,
    } = this.state;
    const question = surveySections[sectionCount].questions[questionCount];
    if (!isLoaded) {
      return <div>Loading...</div>;
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
              <MDBBtn onClick={this.submitHandler} gradient="purple">
                Submit Survey
              </MDBBtn>
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
              <MDBBtn onClick={this.completeHandler} gradient="purple">
                Complete
              </MDBBtn>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div className="container" style={{ padding: "50px" }}>
            <h2 style={{ color: "purple" }}>
              {surveySections[sectionCount].sectionTitle}
            </h2>
            <p style={{ color: "black" }}>
              {surveySections[sectionCount].sectionIntroduction}
            </p>
          </div>
          <Question handleQuestion={this.questionHandler} question={question} />
        </div>
      );
    }
  }
}
