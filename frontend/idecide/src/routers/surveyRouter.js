import React, { Component } from 'react';


import { Route, Switch } from 'react-router-dom';

import SurveyHome from '../components/surveyComponent/surveyHome';

class SurveyRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/surveyComponent/surveyHome" component={SurveyHome} />
            </Switch>
        )
    }
}

export default SurveyRouter