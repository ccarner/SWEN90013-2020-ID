import React, { useContext, useState, useEffect, createContext } from 'react';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import { getSurveyById } from '../../../../API/surveyAPI';
import { CountContext } from './SurveyLayout';
import QuestionDetails from './QuestionDetails';

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
	const [ isLoading, setIsLoading ] = useState(false);

//	console.log(props.match.params.surveyId || 'Hello');
	const surveyId = props.match.params.surveyId;


    const [ data, setData ] = useState({ hits: [] });
    const [ surveySection, setSurveySection ] = useState({ hits: [] });

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await getSurveyById(surveyId);
			console.log(result);
            setData(result);
            setSurveySection(result.surveySections);
			setIsLoading(false);
			console.log(data);
			console.log(isLoading);
		};
		fetchData();
	}, []);

    console.log(data);
 //   data.map((item)=>{console.log(item)});
	
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
								<Typography  variant="subtitle1" gutterBottom>
									{data.surveyIntroduction}
								</Typography>
							</Box>
						</CardContent>
					</Card>
					<Box p={2}>
						<QuestionContext.Provider value={data}>
							<QuestionDetails data={surveySection} />
						</QuestionContext.Provider>
					</Box>
					
				</div>
			)}
		</Container>
	);
};

export default SurveyDetails;
