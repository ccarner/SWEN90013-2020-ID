import React, { Component } from 'react'


import { Route, Switch } from 'react-router-dom'

import SurveyHome from '../components/surveyComponent/surveyHome'
import RelationshipSurvey from '../components/surveyComponent/relationshipSurvey'
import RelationshipQuestions from '../components/surveyComponent/relationshipQuestions'
import SafetySurvey from '../components/surveyComponent/safetySurvey'
import PrioritiesSurvey from '../components/surveyComponent/prioritiesSurvey'
import SurveyComplete from '../components/surveyComponent/surveyComplete'


class SurveyRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/surveyComponent/surveyHome" component={SurveyHome} />
                <Route path="/surveyComponent/relationshipSurvey" component={RelationshipSurvey} />
                <Route path="/surveyComponent/relationQuestions" component={RelationshipQuestions} />
                <Route path="/surveyComponent/safetySurvey" component={SafetySurvey} />
                <Route path="/surveyComponent/surveyComplete" component={SurveyComplete} />
                <Route path="/surveyComponent/prioritiesSurvey" component={PrioritiesSurvey} />
            </Switch>
        )
    }
}

export default SurveyRouter