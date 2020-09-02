import React, { useContext, useState, useEffect, createContext } from 'react';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import QuestionCard from './QuesitonComponent';
import { Card, CardContent, CardHeader, TextField, Divider, Typography } from '@material-ui/core';
import { getSurveyById } from '../../../../API/surveyAPI';
import { CountContext } from './SurveyLayout';
import QuestionDetails from './QuestionDetails';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const blogInfo = {
	eact: {
		post: 'Learn useContext Hooks',
		author: 'Adhithi Ravichandran'
	},
	GraphQL: {
		post: 'Learn GraphQL Mutations',
		author: 'Adhithi Ravichandran'
	}
};

export const t = 4;
export const QuestionContext = createContext();

const SurveyDetails = (props) => {
	const classes = useStyles();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ count, setCount ] = React.useState(0);
	const [ newQuestion, addNew ] = React.useState([]);

	const fatherName = useContext(CountContext);
	console.log(fatherName);
	console.log(props.match.params.surveyId || 'Hello');
	const surveyId = props.match.params.surveyId;

	const [ age, setAge, qN ] = React.useState('');

	const [ data, setData ] = useState({ hits: [] });
	const [ a, setA ] = useState({ hits: [] });

	useEffect(() => {
		/*	const fetchData = async () => {
			const endpoint = `http://8.210.28.169:9009/survey/${surveyId}`;
			try {
				const dataFetched = await axios.get(endpoint).then((res) => res.data);
				console.log(dataFetched);
				return JSON.parse(dataFetched['data']['jsonStr']);
			} catch (e) {
				return e;
			}
		};
		fetchData();*/

		const fetchData = async () => {
			setIsLoading(true);
			const result = await getSurveyById(surveyId);
			console.log(result);
			setData(result);
			setIsLoading(false);
			console.log(data);
			console.log(isLoading);
		};
		fetchData();
	}, []);

	console.log(data.surveyId);
	//   setA(JSON.parse(data.surveySections));
	const handleChange = (event) => {
		setAge(event.target.value);
		//   qN(event.target.value);
	};

	return (
		<Container maxWidth="lg">
			{isLoading ? (
				<div>Loading ...</div>
			) : (
				<div>
					<Card>
						<CardHeader
							action={
								<Button color="primary" variant="contained">
									Edit
								</Button>
							}
							//   subheader="Description"
							title={data.surveyTitle}
						/>
						<Divider />
						<CardContent>
							<Box display="flex" p={1}>
								<Typography color="grey" variant="subtitle1" gutterBottom>
									{data.surveyIntroduction}
								</Typography>
							</Box>
						</CardContent>
					</Card>
					<Box p={2}>
						<QuestionContext.Provider value={data}>
							<QuestionDetails data={data} />
						</QuestionContext.Provider>
					</Box>
					<Box p={2}>
						<QuestionDetails data={data} />
					</Box>
					<Box p={2}>
						<QuestionDetails data={data} />
					</Box>
					<Box p={2}>
						<QuestionDetails data={data} />
					</Box>
				</div>
			)}
		</Container>
	);
};

export default SurveyDetails;
