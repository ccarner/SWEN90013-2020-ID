import React, { Component } from 'react'


import { Route, Switch } from 'react-router-dom'

import SurveyHome from '../components/surveyComponent/surveyHome'
import RelationshipSurvey from '../components/surveyComponent/relationshipSurvey'
import PrioritiesSurvey from '../components/surveyComponent/prioritiesSurvey'


class SurveyRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/surveyComponent/surveyHome" component={SurveyHome} />
                <Route path="/surveyComponent/relationshipSurvey" component={RelationshipSurvey} />
                <Route path="/surveyComponent/prioritiesSurvey" component={PrioritiesSurvey} />
            </Switch>
        )
    }
}

export default SurveyRouter