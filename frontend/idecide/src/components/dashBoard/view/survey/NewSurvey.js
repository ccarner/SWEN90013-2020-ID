import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import QuestionCard from './QuesitonComponent';
import { Card, CardContent, CardHeader, TextField, Divider } from '@material-ui/core';
import { getSurveyById } from '../../../../API/surveyAPI';
import { CountContext } from './SurveyLayout';
import QuestionComponent from './QuesitonComponent';
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

const NewSurvey = (props) => {
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
			//	console.log(result.surveySections[0]);
			//	setData(result.surveySections[0].questions);
			setIsLoading(false);
			console.log(data);
			console.log(isLoading);
		};

		fetchData();
	}, []);

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
							title="Questionnaire"
						/>
						<Divider />
						<CardContent>
							<Box display="flex" p={1}>
								<TextField
									id="outlined-multiline-static"
									label="Description"
									multiline
									rows={4}
									fullWidth
									defaultValue=""
									variant="outlined"
								/>
							</Box>
						</CardContent>
					</Card>
					{newQuestion.map((nq) => {
						console.log(nq);
						return (
							<div key={nq}>
								<Box p={1} />
								<CountContext.Provider value={nq}>
									<QuestionComponent />
								</CountContext.Provider>
							</div>
						);
					})}

					<Box my={2}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							size="large"
							onClick={() => {
								setCount(count + 1);
								addNew([ ...newQuestion, count ]);
							}}
						>
							Add New Question
						</Button>
					</Box>
					<Card my={2}>
						<Divider />
						<CardContent>
							{/*Array.from(data).map((item) => (
						<div>
							{item.questionId}------------------
						</div>
					))*/}
							<Divider />
							<Button variant="contained" color="secondary" size="large" onClick={() => {}}>
								Save
							</Button>
							<Button variant="outlined" color="primary" size="large" onClick={() => {}}>
								Publish
							</Button>
						</CardContent>
					</Card>
				</div>
			)}
		</Container>
	);
};

export default NewSurvey;
