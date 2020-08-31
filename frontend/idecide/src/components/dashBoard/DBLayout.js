import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VerticalTab from './VerticalTab';
import Paper from '@material-ui/core/Paper';
import Password from './view/survey/NewSurvey';
import SurveyLayout from './view/survey/SurveyLayout';
import { Button, Box } from '@material-ui/core';

import {
	BrowserRouter as Router,
	Route,
  } from "react-router-dom";

  import { getUserResults, getAllSurveys, getStaticImageUrlFromName } from '../../API/surveyAPI';
import NewSurvey from './view/survey/NewSurvey';

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
			</Grid>
		</Grid>
	);
}
