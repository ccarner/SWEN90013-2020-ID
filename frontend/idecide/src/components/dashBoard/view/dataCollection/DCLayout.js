import React, { useState, useEffect, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tools from './Tools';
import DataDisplay from './DataDisplay';

import { getResults } from '../../../../API/surveyResultsAPI';

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
console.log(CountContext);

export default function DCLayout() {
	const classes = useStyles();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ data, setData ] = useState({ hits: [] });

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await getResults();

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
				<Grid container spacing={2}>
					<Grid item xs={12} alignContent="flex-end">
						<Tools />
					</Grid>
					{data !== null ? (
						Array.from(data).map((item) => (
							<Grid item lg={6} md={6} xs={12}>
								<DataDisplay />
							</Grid>
						))
					) : (
						<Grid item xs={12}>
							<div>No Data</div>
							<DataDisplay />
						</Grid>
					)}
				</Grid>
			)}
		</Grid>
	);
}
