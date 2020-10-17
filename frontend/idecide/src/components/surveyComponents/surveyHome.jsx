import React, { Component } from "react";
import SurveyControl from "./surveyControl";
import "../../CSS/survey.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoadingSpinner from "../reusableComponents/loadingSpinner";
import {
  getUserResults,
  getAllSurveys,
  getStaticImageUrlFromName,
} from "../../API/surveyAPI";
import { anonymousUser } from "../../API/loginAPI";
import SurveySelectionButton from "./surveySelectionButton";
import SurveyResultsPage from "./surveyResultsPage";
import ActionPlans from "./actionPlans";
import { Card, Button } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import { Typography } from "@material-ui/core";

import userContext from "../../contexts/userContext";

/**
 * The parent component of all survey pages. This component:
 * a) fetches all available surveys from the server
 * b) displays all available surveys in a UI
 * c) fetches all previous completions if logged in (INCOMPLETE)
 * d) displays all previous completions in a UI for user to review
 * Once a survey is selected, the ID is passed to a SurveyControl. SurveyHome
 * doesn't fetch the survey itself or post the results.
 */
export default class SurveyHome extends Component {
  // allows us to use this.context to get user context details
  static contextType = userContext;

  constructor(props) {
    super();

    //load in previous completions from localStorage
    let previousCompletions = localStorage.getItem("prevCompletions");
    let previousNextSurvey = localStorage.getItem("nextSurvey");
    //this.surveyOrder = ["My Situation", "My Safety", "Action Plan"];
    this.surveyOrder = [
      "My Situation",
      "My Safety",
      "My Priorities",
      "I-Decide Feedback",
      "Action Plan",
    ]; // order that surveys need to be completed in

    this.state = {
      nextSurvey:
        previousCompletions === null ? 0 : parseInt(previousNextSurvey), // index of next survey to complete, from the surveyOrder array
      loaded: false,
      actionPlan: "",
      currentState: "menu", // ["menu","survey","completion", "actionPlan"]
      currentResults: undefined, // when in "completion" state, holds data of completion being viewed
      currentSurveyId: -1, // when in "survey" state, ID of current survey
      allSurveys: {}, // pulled from the API, list of surveys available
      surveyCompletions:
        previousCompletions === null ? [] : JSON.parse(previousCompletions), // pulled from localStorage, all previous completions
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
  }

  async componentDidMount() {
    if (!this.context.userContext.userId) {
      console.log(
        "User has not logged in, no userId provided, log in anonymously"
      );
      await anonymousUser();
    }
    var surveys = await getAllSurveys();

    this.setState({
      allSurveys: surveys.data,
      loaded: true,
    });
  }

  startSurvey(surveyId) {
    this.setState({
      currentState: "survey",
      currentSurveyId: surveyId,
    });
  }

  completeHandler = (surveyResults) => {
    this.setState((prevState) => {
      var newSurveyCompletions = [
        ...prevState.surveyCompletions,
        surveyResults,
      ];
      localStorage.setItem(
        "prevCompletions",
        JSON.stringify(newSurveyCompletions)
      );
      localStorage.setItem("nextSurvey", prevState.nextSurvey + 1);

      return {
        nextSurvey: prevState.nextSurvey + 1,
        currentResults: surveyResults,
        surveyCompletions: newSurveyCompletions,
      };
    });
  };

  returnHomeCallback = () => {
    this.setState({ currentState: "menu" });
  };

  handleCardDesk = () => {
    this.setState({
      showCardDesk: !this.state.showCardDesk,
    });
  };

  render() {
    var renderElements = []; // array of elements to be returned from render()
    const { currentState, actionPlan, currentResults } = this.state;

    if (currentState === "survey") {
      renderElements.push(
        <SurveyControl
          returnHome={this.returnHomeCallback}
          surveyId={this.state.currentSurveyId}
          userId={this.context.userContext.userId}
          completeHandler={this.completeHandler}
        />
      );
    } else if (currentState === "menu" && this.state.loaded) {
      renderElements.push(
        <React.Fragment>
          <div
            className="container"
            className="padding10"
            style={{ marginBottom: "50px" }}
          >
            <div style={{ padding: "20px" }}>
              <h1 className="text-center" style={{ color: "#9572A4" }}>
                Help Me Decide
              </h1>
            </div>
            <Typography color="textPrimary" gutterBottom variant="h5">
              Completing the modules below will help us better understand your
              situation
            </Typography>
            <Typography color="textPrimary" gutterBottom variant="h5">
              so we can generate a personalised action plan for you.
            </Typography>

            <div>
              {this.state.allSurveys.map((survey, index) => (
                <div key={survey.surveyId} className="surveyIcon">
                  <SurveySelectionButton
                    notAvailable={
                      // false && // uncomment this line to test surveys
                      survey.surveyTitle !==
                      this.surveyOrder[this.state.nextSurvey]
                    }
                    icon={getStaticImageUrlFromName(survey.surveyImageName)}
                    completed="false"
                    surveyTitle={survey.surveyTitle}
                    shortSurveyDescription={survey.surveyIntroduction}
                    handleClick={() => {
                      this.startSurvey(survey.surveyId);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    } else if (currentState === "completion") {
      //viewing a previous attempt
      //different from when we JUST completed a survey, which is rendered in the surveyControl component
      renderElements.push(
        <SurveyResultsPage returnHome={this.returnHomeCallback} />
      );
    } else if (currentState === "actionPlan") {
      renderElements.push(<ActionPlans />);
    } else {
      renderElements.push(<LoadingSpinner />);
    }

    if (
      this.surveyOrder[this.state.nextSurvey] !== "Action Plan" &&
      this.state.currentState === "menu"
    ) {
      renderElements.push(
        <Card style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <Card.Body>
            Please complete the required sections before we generate an action
            plan
          </Card.Body>
        </Card>
      );
    } else if (this.state.currentState === "menu") {
      renderElements.push(
        <Card style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <Card.Body>
            <PrimaryButton
              onClick={() => this.setState({ currentState: "actionPlan" })}
              style={{ width: "70%", borderRadius: "10em" }}
            >
              Generate your Action Plan
            </PrimaryButton>
          </Card.Body>
        </Card>
      );
    }
    return renderElements;
  }
}
