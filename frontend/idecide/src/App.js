import React, { Component } from "react";

import userContext from "./contexts/userContext";
// import { ToastProvider } from "react-toast-notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Landing from "./components/Landing";
// import Questions from "./components/Questions";
// import ActionPlan from "./components/ActionPlan";
// import Framework from "./components/Framework";
import DashBoard from "./components/dashBoard/DBLayout";
import PersistentDrawerLeft from "./Layout/Navbar";
import dashboardAllSurveysExpose from "./components/dashBoard/view/survey/dashboardAllSurveysExpose";
import SurveyEditingView from "./components/dashBoard/view/survey/surveyView/surveyEditingView";
import DCLayout from "./components/dashBoard/view/dataCollection/DCLayout";
import LoginPage from "./components/loginComponent/loginPage";
import RegisterPage from "./components/loginComponent/registerPage";
import AdminInfo from "./components/loginComponent/adminInfo";
// import UserInfo from "./components/loginComponent/userInfo";
import SurveyHome from "./components/surveyComponents/surveyHome";
import "./App.css";
import clsx from "clsx";
// import DashBoard from "./components/dashBoard/DBLayout";
// import { ToastNotification } from "./components/reusableComponents/toastNotification";
import KeyValuePairEditingPage from "./Layout/keyValuePairEditingPage";
import ImageManagementView from "./components/dashBoard/view/imageManagementView/imageManagementView";

class App extends React.Component {
  // const [adminLogin, setAdminLogin] = React.useState(false);

  constructor(props) {
    super(props);

    this.state = {
      // types are "anon","admin","user"
      userContext: { userType: null, token: null, userId: null },
    };
    this.logout = this.logout.bind(this);
    this.setUserContext = this.setUserContext.bind(this);
  }

  componentDidMount() {
    let previousUserContext = localStorage.getItem("userContext");

    if (previousUserContext) {
      this.setState({ userContext: JSON.parse(previousUserContext) });
    }
    //else we just leave with the default 'null'
  }

  logout() {
    this.setState({
      userContext: { userType: null, token: null, userId: null },
    });
    localStorage.clear();
    window.location.href = "/";
  }

  setUserContext(newUserContextObject) {
    localStorage.setItem("userContext", JSON.stringify(newUserContextObject));
    this.setState({
      userContext: newUserContextObject,
    });
  }

  switchMainContent() {
    return (
      <Switch>
        {/* TODO: make the dashboard a single hierarchical component that is navigated via links... */}
        {/* <Route exact path="/dashboard" component={DashBoard} /> */}
        <Route exact path="/dashboard" render={(props) => <DashBoard {...props} />} />


        {/* <Redirect
          exact
          from="/surveyComponent/"
          to="/surveyComponent/surveyHome"
        /> */}
        <Route
          exact
          path="/dashboard/surveys"
          component={dashboardAllSurveysExpose}
        />
        <Route exact path="/dashboard/images" component={ImageManagementView} />
        <Route
          exact
          path="/dashboard/surveyId=:surveyId"
          component={SurveyEditingView}
        />
        <Route exact path="/dashboard/datacollection" component={DCLayout} />
        <Route
          exact
          path="/surveyComponent/surveyHome"
          component={SurveyHome}
        />
        <Route
          exact
          path="/loginComponent/loginPage"
          render={(props) => <LoginPage />}
        />
        <Route
          exact
          path="/loginComponent/loginPageAdmin"
          render={(props) => <LoginPage adminLogin={true} />}
        />
        <Route
          exact
          path="/loginComponent/registerPage"
          component={RegisterPage}
        />
        <Route
          exact
          path="/dashboard/kvEditing=:key"
          component={(props) => {
            return (
              <KeyValuePairEditingPage
                key={props.match.params.surveyId}
                {...props}
              />
            );
          }}
        />
        <Route exact path="/loginComponent/adminInfo" component={AdminInfo} />
        {/* <Route exact path="/loginComponent/userInfo" component={UserInfo} /> */}
        <Route exact path="/" component={Landing} />{" "}
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        <userContext.Provider
          value={{
            userContext: this.state.userContext,
            logout: this.logout,
            setUserContext: this.setUserContext,
          }}
        >
          <ToastContainer />
          <div id="background" />
          <div className="App">
            <div className="backgroundImage"></div>
            <PersistentDrawerLeft>
              {this.switchMainContent()}
            </PersistentDrawerLeft>
          </div>
        </userContext.Provider>
      </Router>
    );
  }
}

export default App;
