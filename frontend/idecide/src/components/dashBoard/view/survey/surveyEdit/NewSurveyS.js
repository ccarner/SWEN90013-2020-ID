import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { Card, CardContent, CardHeader, Typography, Divider, TextField } from '@material-ui/core';
import { CountContext } from '../SurveyLayout';
import QuestionComponent from './QuesitonComponent';

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

const NewSurveyS = (props) => {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = React.useState(0);
	const [newQuestion, addNew] = React.useState([]);

	const fatherName = useContext(CountContext);
	console.log(fatherName);
	console.log(props.match.params.surveyId || 'Hello');
	const surveyId = props.match.params.surveyId;

	const [age, setAge, qN] = React.useState('');

	const [data, setData] = useState({ hits: [] });

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
						<Box p={2}>
							<Card>
								<CardHeader title="New Survey Section" />
								<Divider />
								<CardContent>
									<TextField
										id="outlined-multiline-flexible"
										required
										fullWidth
										label="Title"
										variant="outlined"
									/>
								</CardContent>
								<CardContent>
									<TextField
										id="outlined-multiline-flexible"
										required
										multiline
										rows={4}
										fullWidth
										label="Description"
										variant="outlined"
									/>
								</CardContent>
							</Card>
						</Box>
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
									addNew([...newQuestion, count]);
								}}
							>
								Add New Quesiton
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
								<Button variant="contained" color="secondary" size="large" onClick={() => { }}>
									Save
							</Button>
								<Button variant="outlined" color="primary" size="large" onClick={() => { }}>
									Publish
							</Button>
							</CardContent>
						</Card>
					</div>
				)}
		</Container>
	);
};

export default NewSurveyS;
