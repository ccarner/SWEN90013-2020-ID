//new version of survey editing view for admin portal
// this is the root component, which will render other parts of the view
// it contains the state of the survey, and passes its own setState function
// down to the child components, which then are aware of how to manipulate the survey
// state on their own (using this component's setState function)
import React, { Component } from "react";
import { getSurveyById, editSurvey } from "../../../../../API/surveyAPI";
import SurveyEditingViewHeaders from "./surveyEditingViewHeaders";
import SurveyEditingViewSection from "./surveyEditingViewSection";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

import { Box, Button, Collapse, makeStyles } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";

export default class surveyEditingView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, survey: null };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const fetchData = async (surveyId) => {
      const result = await getSurveyById(surveyId);
      this.setState({ survey: result, isLoaded: true });
    };
    //id comes from URL parameter
    fetchData(this.props.match.params.surveyId);
  }

  addNewSection(indexNumInsertBefore) {
    //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
    var d = new Date();
    var n = d.getMilliseconds();

    const blankSection = {
      sectionId: n, //TODO: need to add an algorithm to choose a new sectionId automatically when creating a new section
      sectionTitleText: "",
      sectionIntroductionBodyHtml: "",
      sectionFeedbackBodyHtml: "",
      sectionFeedbackHeadingTextText: "",
      questions: [],
      sectionResultAlgorithm: "null",
    };

    //insert blank section into array (delete 0 items== insert)
    //need to duplicate array, since splice mutates array, and react doesn't like that
    this.setState((prevState) => {
      var newSurveySections = [...prevState.survey.surveySections];
      newSurveySections.splice(indexNumInsertBefore, 0, blankSection);
      var newSurvey = { ...prevState.survey };
      newSurvey.surveySections = newSurveySections;
      return { survey: newSurvey };
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoaded && (
          <React.Fragment>
            <Typography style={{ color: "white" }} variant="h2">
              {this.state.survey.surveyTitle}
            </Typography>
            <SurveyEditingViewHeaders
              survey={this.state.survey}
              updateSurvey={this.setState}
            />

            {this.state.survey.surveySections.map((section, index) => {
              return (
                <React.Fragment key={section.sectionId}>
                  <PrimaryButton
                    onClick={() => {
                      this.addNewSection(index);
                    }}
                  >
                    Create New Section Here <CreateOutlinedIcon />
                  </PrimaryButton>
                  <SurveyEditingViewSection
                    // sectionId not really used, its the index that gets used
                    sectionIndex={index}
                    section={section}
                    updateSurvey={this.setState}
                  />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
      </div>
    );
  }
}
