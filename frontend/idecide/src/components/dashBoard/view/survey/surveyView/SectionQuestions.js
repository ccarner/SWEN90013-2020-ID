import React, { useState, useEffect, createContext } from 'react';
import { Box, Button, Collapse, makeStyles } from '@material-ui/core';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton, Grid } from '@material-ui/core';
import { getSurveyById, editSurvey } from '../../../../../API/surveyAPI';
import EditIcon from '@material-ui/icons/Edit';
import QuestionDetails from './QuestionDetails';

export const t = 4;
export const QuestionContext = createContext();

const SectionQuestions = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isOpen, setOpen ] = React.useState(false);
	const [ values, setValues ] = React.useState({
		title: '',
		descrpition: ''
	});

	console.log(props.data);
	//	const surveyId = props.match.params.surveyId;

	const [ sectionIndex, setSectionIndex ] = React.useState();

	const [ data, setData ] = useState({ hits: [] });
	const [ surveySection, setSurveySection ] = useState({ hits: [] });

	function handleView() {
		setOpen((prev) => !prev);
	}

	return (
		<div>
			<div>
				<Box p={2}>
					<Card>
						<CardHeader
							action={
								<div>
									<IconButton
										color="secondary"
										aria-label="add an alarm"
										onClick={() => {
											alert('Switch to Edit Board');
										}}
									>
										<EditIcon color="primary" fontSize="large" />
									</IconButton>

									<Button color="secondary" variant="contained" onClick={handleView}>
										View
									</Button>
								</div>
							}
							//   subheader="Description"
							title={props.data.sectionTitle}
						/>
						<Divider />
						<CardContent>
							<Box display="flex" p={1}>
								<Typography variant="subtitle1" gutterBottom>
									{props.data.sectionIntroduction}
								</Typography>
							</Box>
						</CardContent>
					</Card>
					<Collapse in={isOpen}>
						{
						props.data.questions.map((question) => (
							<Box>
								<QuestionDetails data={question} />
							</Box>
						))}
					</Collapse>
				</Box>
			</div>
		</div>
	);
};

export default SectionQuestions;
