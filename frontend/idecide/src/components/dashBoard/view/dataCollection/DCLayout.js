import React, { useState, useEffect, createContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tools from './Tools';
import DataDisplay from './DataDisplay';
import ResultDisplay from './ResultDisplay';
import { getResults } from '../../../../API/surveyResultsAPI';
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
export const SectionSearch = createContext();

export default function DCLayout() {
	const classes = useStyles();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ data, setData ] = useState({ hits: [] });
	const [ sectionSearch, setSectionSearch ] = React.useState([]);
	//	console.log(sectionSearch.sectionId);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await getResults();
			const surveys = await getAllSurveys();
			setData(surveys.data);
			setIsLoading(false);
			console.log(data);
			console.log(isLoading);
		};

		fetchData();
	}, []);

	console.log(isLoading);
	return (
		<Grid className={classes.root} direction="row" justify="flex-start" alignItems="flex-start">
			{isLoading ? (
				<div>Loading ...</div>
			) : (
				<Grid container spacing={2}>
					<SectionSearch.Provider value={{ sectionSearch, setSectionSearch }}>
						<Grid item xs={12} alignContent="flex-end">
							<CountContext.Provider value={data}>
								<Tools />
							</CountContext.Provider>
						</Grid>
						<Grid item xs={12}>
							<DataDisplay />
						</Grid>
						<Grid item xs={12}>
							<ResultDisplay />
						</Grid>
					</SectionSearch.Provider>
				</Grid>
			)}
		</Grid>
	);
}
