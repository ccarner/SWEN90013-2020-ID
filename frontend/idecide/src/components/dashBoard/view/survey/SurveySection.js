import React, { useState, useEffect, createContext } from 'react';
import { Box, Button, Collapse, makeStyles } from '@material-ui/core';
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import { getSurveyById } from '../../../../API/surveyAPI';
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

const SurveySection = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isOpen, setOpen ] = React.useState(false);

	//	console.log(props.match.params.surveyId || 'Hello');
    const surveyId = props.match.params.surveyId;
    
    const [sectionIndex, setSectionIndex] = React.useState();

	const [ data, setData ] = useState({ hits: [] });
	const [ surveySection, setSurveySection ] = useState({ hits: [] });

	function handleView(e, index) {
		console.log(e.target, index.index);
        setOpen((prev) => !prev);
        setSectionIndex(index.index);
	//	QuestionsDisplay(index.index);
	}

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

	function QuestionsDisplay() {
		console.log(surveySection[sectionIndex]);
	  if(typeof sectionIndex !== 'undefined')
        return <QuestionDetails data={surveySection[sectionIndex]}/>;
        else return(<div/>)
	}

	return (
		<div>
			{typeof surveySection.length == 'undefined' ? (
				<div>Loading</div>
			) : (
				surveySection.map((item, index) => (
					<Box p={2} key={index}>
						<Card>
							<CardHeader
								action={
									<Button
										color="primary"
										variant="contained"
										onClick={(e) => handleView(e, { index })}
									>
										View + {index}
									</Button>
								}
								//   subheader="Description"
								title={item.sectionTitle}
							/>
							<Divider />
							<CardContent>
								<Box display="flex" p={1}>
									<Typography variant="subtitle1" gutterBottom>
										{item.sectionIntroduction}
									</Typography>
								</Box>
							</CardContent>
						</Card>
                        <Collapse in={isOpen}>
						<Box>
							<QuestionsDisplay />
						</Box>
                        </Collapse>
					</Box>
                ))
			)}
		</div>
	);
};

export default SurveySection;
