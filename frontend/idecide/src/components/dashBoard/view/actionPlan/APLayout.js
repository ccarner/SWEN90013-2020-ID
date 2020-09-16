import React, { useState, useEffect, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

import { getAllSurveys } from '../../../../API/surveyAPI';

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

export const CountContext = createContext();

export default function APLayout() {
	const classes = useStyles();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ data, setData ] = useState({ hits: [] });

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await getAllSurveys();

			setData(result.data);
			setIsLoading(false);
			console.log(data);
			console.log(isLoading);
		};

		fetchData();
	}, []);

	console.log(isLoading);
	console.log(data);
	return (
		<Grid className={classes.root} direction="row" justify="flex-start" alignItems="flex-start">
			{isLoading ? (
				<div>Loading ...</div>
			) : (
				<Grid item xs={8}>
					<Grid container spacing={2}>
						{console.log(data[0])}
						{Array.from(data).map((item) => (
							<Grid item lg={6} md={6} xs={12}>
									Hello from Action Plan
							</Grid>
						))}
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
