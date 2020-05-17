import React, { Component, Fragment } from 'react'


import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import Questions from './components/Questions'
import ActionPlan from './components/ActionPlan'
import Framework from './components/Framework'

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
          </div>
        </div>
      </Router>
    )
  }
}

export default App
