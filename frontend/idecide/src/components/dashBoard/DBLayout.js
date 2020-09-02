import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VerticalTab from './VerticalTab';
import SurveyLayout from './view/survey/SurveyLayout';

import {
	BrowserRouter as Router,
	Route,
  } from "react-router-dom";

import NewSurvey from './view/survey/NewSurvey';
import SurveySection from './view/survey/SurveySection';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function DBLayout() {
	const classes = useStyles();

	
	return (
		<Grid
			container
			className={classes.root}
			spacing={2}
			direction="row"
			justify="flex-start"
			alignItems="flex-start"
		>
			<Grid item xs={3}>
				<VerticalTab />
			</Grid>
			<Grid item xs={8}>
				<Route path="/dashboard/survey" component={SurveyLayout} />
				<Route path="/dashboard/newsurvey" component={NewSurvey} />
				<Route path="/dashboard/surveyId=:surveyId" component={SurveySection} />
			</Grid>
		</Grid>
	);
}
