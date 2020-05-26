import React, { Component } from 'react'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import Questions from './components/Questions'
import ActionPlan from './components/ActionPlan'
import Framework from './components/Framework'

import LoginPage from './components/loginComponent/loginPage'
import RegisterPage from './components/loginComponent/registerPage'
import AdminInfo from './components/loginComponent/adminInfo'
import SurveyHome from './components/surveyComponent/surveyHome'
import RelationshipSurvey from './components/surveyComponent/relationshipSurvey'
import SafetySurvey from './components/surveyComponent/safetySurvey'
import PrioritiesSurvey from './components/surveyComponent/prioritiesSurvey'

import SurveyRouter from './routers/surveyRouter'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route path="/1" component={NotFound} />
            <Route path="/survey/3.1" component={Questions} />
            <Route path="/survey/3.2" component={ActionPlan} />
            <Route path="/survey/3.3" component={Framework} />

            <Switch>
              <Route path="/surveyComponent" component={SurveyRouter} />
              <Route path="/loginComponent/loginPage" component={LoginPage} />
              <Route path="/loginComponent/loginPage" component={LoginPage} />
              <Route path="/loginComponent/registerPage" component={RegisterPage} />
              <Route path="/loginComponent/adminInfo" component={AdminInfo} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
