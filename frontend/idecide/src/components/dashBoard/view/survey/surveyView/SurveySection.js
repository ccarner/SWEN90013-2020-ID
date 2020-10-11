import React, { useState, useEffect, createContext } from 'react';
import { Box, Button, Collapse, makeStyles } from '@material-ui/core';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton, Grid } from '@material-ui/core';
import { getSurveyById, editSurvey } from '../../../../../API/surveyAPI';
import EditIcon from '@material-ui/icons/Edit';
import QuestionDetails from './QuestionDetails';
import NewSectionComp from '../surveyEdit/NewSectionComp';
import SectionQuestions from './SectionQuestions';

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
	const [ values, setValues ] = React.useState({
		title: '',
		descrpition: ''
	});

	const [ count, setCount ] = React.useState(0);
	const [ newQuestion, addNew ] = React.useState([]);

	const [ isShow, setShow ] = useState(false);

	const surveyId = props.match.params.surveyId;
	console.log(surveyId);

	const [ sectionIndex, setSectionIndex ] = React.useState();

	const [ data, setData ] = useState({ hits: [] });
	const [ surveySection, setSurveySection ] = useState({ hits: [] });

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleShow = () => {
		setShow((prev) => !prev);
	};

	function handleView(e, index) {
		setOpen((prev) => !prev);
		setSectionIndex(index.index);
	}

	useEffect(
		() => {
			const fetchData = async (surveyId) => {
				setIsLoading(true);
				console.log(props.match.params.surveyId);
				const result = await getSurveyById(props.match.params.surveyId);
				setData(result);
				setSurveySection(result.surveySections);
				setIsLoading(false);
				//	console.log(data);
				//	console.log(isLoading);
			};
			fetchData();
		},
		[ surveyId ]
	);

	console.log(JSON.stringify(data));
	const QuestionsDisplay = () => {
		console.log(data);
		console.log(surveySection[sectionIndex]);
		if (typeof sectionIndex !== 'undefined') {
			if (surveySection[sectionIndex].questions.length > 0)
				return <QuestionDetails data={surveySection[sectionIndex]} />;
			else {
				alert('There is no question in this section, do you want to create new quesitons now?');
			}
		} else return <div />;
	};

	return (
		<Grid container spacing={2} style={{ marginTop: '20px' }}>
			<Grid item xs={12}>
				<Button color="secondary" variant="contained" onClick={handleShow}>
					Edit
				</Button>
			</Grid>
			<Grid item xs={12}>
				{typeof surveySection.length == 'undefined' || surveySection.length == 0 ? surveySection.length == 0 ? (
					<NewSectionComp data={surveyId} id={surveyId} />
				) : (
					<div>Loading</div>
				) : (
					surveySection.map((item, index) => (
						<SectionQuestions
							data={item}
							sections={surveySection}
							surveyId={surveyId}
							handleShow={handleShow}
							index={index}
						/>
					))
				)}
			</Grid>
			{newQuestion.map((nq) => (
				<Grid item xs={12} key={nq}>
					<Box p={1} />
					<NewSectionComp data={data} id={surveyId} />
				</Grid>
			))}

			<Grid item xs={12}>
				<Collapse in={isShow}>
					<Button
						color="primary"
						fullWidth
						variant="contained"
						onClick={() => {
							setCount(count + 1);
							addNew([ ...newQuestion, count ]);
						}}
					>
						Add New Section
					</Button>
				</Collapse>
			</Grid>
		</Grid>
	);
};

export default SurveySection;
