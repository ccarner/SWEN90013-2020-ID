import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Questions from "./components/Questions";
import ActionPlan from "./components/ActionPlan";
import Framework from "./components/Framework";
import DashBoard from "./components/dashBoard/DBLayout";
import PersistentDrawerLeft from "./Layout/Navbar";

import { Tooltip } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PrimaryButton from './components/reusableComponents/PrimaryButton';


function App() {
  const [adminLogin, setAdminLogin] = React.useState(false);

  return (
    <div>
      {/* <div className="fix_top_right">
        <Tooltip title="Click to quick exit." >
          <PrimaryButton onClick={() => {
            localStorage.clear();
            window.location.href =
              "https://www.weather.com.au/";
          }}>
            <ExitToAppIcon />Quick Exit
        </PrimaryButton>
        </Tooltip>
      </div> */}

      <Router>
        <div className="App">
          <div className="backgroundImage"></div>
          <Route path="/" component={PersistentDrawerLeft} />
          <div>


            <Switch>
              <Route path="/survey/3.1" component={Questions} />
              <Route path="/survey/3.2" component={ActionPlan} />
              <Route path="/survey/3.3" component={Framework} />
              <Route path="/dashboard" component={DashBoard} />


              <Redirect
                exact
                from="/surveyComponent/"
                to="/surveyComponent/surveyHome"
              />
            </Switch>
          </div>
        </div>
      </Router>

    </div>
  );
}

export default App;
