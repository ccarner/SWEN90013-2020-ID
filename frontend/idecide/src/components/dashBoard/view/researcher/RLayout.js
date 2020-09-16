import React, { useState, useEffect, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { getAllUsers } from '../../../../API/loginAPI';

import RDisplay from './RDisplay';

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

export const SurveyContext = createContext();

export default function RLayout() {
	const classes = useStyles();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ data, setData ] = useState({ hits: [] });

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await getAllUsers();
			setData(result.data);
			setIsLoading(false);
		//	console.log(data);
		//	console.log(isLoading);
		};

		fetchData();
	}, []);

//	console.log(isLoading);
//	console.log(data);
	return (
		<Grid className={classes.root} direction="row" justify="flex-start" alignItems="flex-start">
			{isLoading ? (
				<div>Loading ...</div>
			) : (
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<SurveyContext.Provider value={data}>
							<RDisplay />
						</SurveyContext.Provider>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
