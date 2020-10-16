import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SurveyLayout from "../components/dashBoard/view/survey/SurveyLayout";
import SurveySection from "../components/dashBoard/view/survey/surveyView/SurveySection";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/navbar/surveys" component={SurveyLayout} />
        <Route path="/navbar/surveyId=:surveyId" component={SurveySection} />
      </Switch>
    </Router>
  );
}

export default Routes;
