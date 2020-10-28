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
import Grid from "@material-ui/core/Grid";

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

    // this will now be built INTO THE SURVEY ITSELF as 'surveyDisplayOrder'
    // let previousNextSurvey = localStorage.getItem("nextSurvey");
    //this.surveyOrder = ["My Situation", "My Safety", "Action Plan"];
    // this.surveyOrder = [
    //   "My Situation",
    //   "My Safety",
    //   "My Priorities",
    //   "I-Decide Feedback",
    //   "Action Plan",
    // ]; // order that surveys need to be completed in

    this.state = {
      // nextSurvey:
      //   previousCompletions === null ? 0 : parseInt(previousNextSurvey), // index of next survey to complete, from the surveyOrder array
      loaded: false,
      actionPlan: "",
      currentState: "menu", // ["menu","survey","completion", "actionPlan"]
      currentSurveyId: -1, // when in "survey" state, ID of current survey
      allSurveys: {}, // pulled from the API, list of surveys available
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.surveysCompletionStatus = this.surveysCompletionStatus.bind(this);
  }

  // TODO need to update this to use surveyDisplayOrder rather than ID, but for now using IDs...
  // rather than just when they were uploaded... note that the display order is important BEFORE
  // passing into function, since it assumes its in correct order when receiving the array
  //takes an array of surveyIds (in the order they should be displayed/completed), and returns an object of statuses:
  // eg {"1":"Completed","2":"Next","3": "Locked"}
  surveysCompletionStatus(surveyIds) {
    const previousCompletions = JSON.parse(
      localStorage.getItem("prevCompletions")
    );

    var previousSurveyWasComplete = true;
    var returnObj = {};
    console.log("prevCompletions ius ----", previousCompletions);
    for (const surveyId of surveyIds) {
      if (previousCompletions && previousCompletions.hasOwnProperty(surveyId)) {
        returnObj[surveyId] = "Completed";
        previousSurveyWasComplete = true;
      } else if (previousSurveyWasComplete) {
        returnObj[surveyId] = "Next";
        previousSurveyWasComplete = false;
      } else {
        returnObj[surveyId] = "Locked";
        previousSurveyWasComplete = false;
      }
    }
    console.log("the return obj was", returnObj);
    return returnObj;
  }

  //returns if all surveys are complete so can show action plan
  allSurveysComplete() {
    if (!this.state.loaded) {
      return false;
    }
    //Improvement: factor out all of the parsing of localstorage to put this into state
    // But need to make sure setState when the previous completions change...
    const previousCompletions = JSON.parse(
      localStorage.getItem("prevCompletions")
    );
    for (const survey of this.state.allSurveys) {
      if (
        !previousCompletions ||
        !previousCompletions.hasOwnProperty(survey.surveyId)
      ) {
        return false;
      }
    }
    return true;
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
    const { currentState } = this.state;

    if (this.state.loaded) {
      var completionStatus = this.surveysCompletionStatus(
        this.state.allSurveys.map((survey) => survey.surveyId)
      );
      console.log("completion status is ----", completionStatus);
    }

    if (currentState === "survey") {
      renderElements.push(
        <SurveyControl
          returnHome={this.returnHomeCallback}
          surveyId={this.state.currentSurveyId}
          userId={this.context.userContext.userId}
          completeHandler={() => { }}
        />
      );
    } else if (currentState === "menu" && this.state.loaded) {
      renderElements.push(
        <Grid
          container
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
            padding: "2em",
          }}
        >
          <div style={{ marginBottom: "50px" }}>
            <div style={{ padding: "20px" }}>
              <h1 className="text-center" style={{ color: "white" }}>
                Help Me Decide
              </h1>
            </div>
            <Typography style={{ color: "white" }} gutterBottom variant="h5">
              Completing the modules below will help us better understand your
              situation so we can generate a personalised action plan for you.
            </Typography>

            <div style={{ marginBottom: "10vh" }}>
              {this.state.allSurveys.map((survey) => (
                <div key={survey.surveyId} className="surveyIcon">
                  <SurveySelectionButton
                    notAvailable={
                      // false && // uncomment this line to test surveys
                      completionStatus[survey.surveyId] === "Locked"
                    }
                    // icon={getStaticImageUrlFromName(survey.surveyImageName)}
                    completed={
                      // false && // uncomment this line to test surveys
                      completionStatus[survey.surveyId] === "Completed"
                    }
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
        </Grid>
      );
      // } else if (currentState === "completion") {
      //   //TODO: no longer need to show 'previous completions', remove this.
      //   //viewing a previous attempt
      //   //different from when we JUST completed a survey, which is rendered in the surveyControl component
      //   renderElements.push(
      //     <SurveyResultsPage returnHome={this.returnHomeCallback} />
      //   );
    } else if (currentState === "actionPlan") {
      renderElements.push(<ActionPlans />);
    } else {
      renderElements.push(<LoadingSpinner />);
    }

    if (!this.allSurveysComplete() && this.state.currentState === "menu") {
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
              style={{ width: "70%", borderRadius: "10em", margin: "0px" }}
            >
              View your Action Plan
            </PrimaryButton>
          </Card.Body>
        </Card>
      );
    }
    return renderElements;
  }
}
