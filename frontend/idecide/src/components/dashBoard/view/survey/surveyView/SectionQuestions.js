

import React, { useState, useEffect, createContext } from 'react';
import {
	Box,
	Button,
	Collapse,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	DialogActions, Card, CardContent, CardHeader, Divider, Typography, IconButton, Grid
} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { getSurveyById, editSurvey } from '../../../../../API/surveyAPI';
import EditIcon from '@material-ui/icons/Edit';
import QuestionDetails from './QuestionDetails';
import Alert from '@material-ui/lab/Alert';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';

export const t = 4;
export const QuestionContext = createContext();

const SectionQuestions = (props) => {
	const [openAddQuestion, setOpenAddQuestion] = useState(false);
	const [isOpen, setIsOpen] = React.useState(false);

	// console.log(props);
	const [open, setDMOpen] = React.useState(false); //control of adding new survey
	//const [ isOpen, setOpen ] = React.useState(false);
	const [openAlert, setOpen] = React.useState(false);
	const [openGreen, setOpenGreen] = React.useState(false);
	const [error, setError] = React.useState();
	const [values, setValues] = React.useState({
		title: props.data.sectionTitle,
		descrpition: props.data.sectionIntroduction,
		question: ''
	});

	const [type, setType] = React.useState('');

	const handleTypeChange = (event) => {
		setType(event.target.value);
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleOpen = () => {
		setDMOpen(true);
	};

	const handleClose = () => {
		setDMOpen(false);
	};

	function handleView() {
		setIsOpen((prev) => !prev);
	}

	const handleQClose = () => {
		setOpenAddQuestion(false);
	};

	const handleAddQuestion = () => {
		setOpenAddQuestion(true);
	};

	const AddQuestion = async () => {
		if (openGreen) {
			window.location.href = './surveyId=' + props.surveyId;
		} else {
			// console.log(props.data.sectionId);
			// console.log(type);
			//
			let questions;
			if (typeof props.sections[props.data.sectionId - 1].questions !== 'undefined')
				questions = props.sections[props.data.sectionId - 1].questions;
			var newSliderQuestion = {
				questionId: questions.length + 1 + '',
				questionText: values.question,
				questionType: type,
				sliderDefaultValue: 5,
				sliderMaxValue: 10,
				sliderMinValue: 0
			};

			var newMCQuestion = {
				questionId: questions.length + 1 + '',
				questionText: values.question,
				questionType: type,
				selectionOptions: [
					{
						name: 'Never',
						weight: '0'
					},
					{
						name: 'Only Once',
						weight: '0.2'
					},
					{
						name: 'Several Times',
						weight: '0.4'
					},
					{
						name: 'Once a month',
						weight: '0.6'
					},
					{
						name: 'Once a Week',
						weight: '0.8'
					},
					{
						name: 'Daily',
						weight: '1'
					}
				]
			};
			var newYNQuestion = {
				questionId: questions.length + 1 + '',
				questionText: values.question,
				questionType: type,
				selectionOptions: [
					{
						name: 'No',
						weight: '0'
					},
					{
						name: 'Yes',
						weight: '1'
					}
				]
			};
			// console.log(questions);
			if (type == 'slider') {
				questions.push(newSliderQuestion);
			} else if (type == 'yesorno') {
				questions.push(newYNQuestion);
			} else {
				questions.push(newMCQuestion);
			}
			//	let sections = props.sections[props.data.sectionId - 1];
			//	sections.questions = questions;
			//	console.log(sections);

			let sections = props.sections;
			//	console.log(sections1);

			//	Array.from([sections]).splice(props.data.sectionId-1, 1, sections);

			var readyData = JSON.stringify({
				surveyId: props.surveyId,
				surveySections: sections
			});
			JSON.parse(readyData);
			// console.log(JSON.parse(readyData));

			const feedBack = await editSurvey(readyData)
				.then((data) => {
					setOpenGreen(true);
				})
				.catch((error) => {
					setOpen(true);
					setError(error + '');
				});
			return feedBack;
		}
	};

	const UpdateSection = async () => {
		if (openGreen) {
			window.location.href = './surveyId=' + props.surveyId;
		}

		// console.log(661, values);
		let sections = props.sections;
		// console.log(662, JSON.stringify(sections));
		var modifiedSection = {
			sectionTitle: values.title,
			sectionIntroduction: values.descrpition,
			sectionId: props.data.sectionId
		};

		sections.splice(parseInt(props.data.sectionId) - 1, 1, modifiedSection);
		console.log(663, JSON.stringify(sections))

		var readyData = JSON.stringify({
			surveyId: props.surveyId,
			surveySections: sections
		});
		// console.log(readyData);
		const feedBack = await editSurvey(readyData)
			.then((data) => {
				setOpenGreen(true);
			})
			.catch((error) => {
				setOpen(true);
				setError(error + '');
			});
		return feedBack;
	};


	const deleteSection = async () => {
		if (openGreen) {
			window.location.href = './surveyId=' + props.surveyId;
		}

		// console.log(661, values);
		let sections = props.sections;



		sections.splice(props.data.sectionId - 1, 1);


		var readyData = JSON.stringify({
			surveyId: props.surveyId,
			surveySections: sections
		});
		// console.log(readyData);
		const feedBack = await editSurvey(readyData)
			.then((data) => {
				window.location.reload();
			})
			.catch((error) => {
				setOpen(true);
				setError(error + '');
			});
		return feedBack;
	};

	return (
		<div>

			<Box p={2}>
				<Card>
					<CardHeader
						action={
							<div>
								<IconButton
									style={{ width: 50 }}
									color="secondary"
									aria-label="add an alarm"
									onClick={handleOpen}
								>
									<EditIcon color="primary" />
								</IconButton>
								<IconButton
									style={{ width: 50 }}
									color="secondary"
									aria-label="add an alarm"
									onClick={handleAddQuestion}
								>
									<ControlPointRoundedIcon color="primary" />
								</IconButton>

								<IconButton
									style={{ width: 50 }}
									color="secondary"
									aria-label="add an alarm"
									onClick={handleView}
								>
									<ExpandMoreRoundedIcon color="primary" />
								</IconButton>
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

					{typeof props.data.questions !== 'undefined' ? (

						props.data.questions.map((question) => (
							<Box>
								<QuestionDetails
									surveyID={props.surveyId}
									data={question} currentSection={props.sections}
									questions={props.sections[props.data.sectionId - 1].questions}
								/>
							</Box>
						))
					) : (
							<div>No questions</div>
						)}
				</Collapse>
			</Box>
			{/**  This window is used for updating section */}
			<Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title" maxWidth="lg" fullWidth>
				<DialogTitle id="form-dialog-title">Section</DialogTitle>
				<DialogContent>
					<Collapse in={!openGreen}>
						<DialogContentText>112, Please input the title and description for the section.</DialogContentText>
						<TextField
							id="outlined-multiline-flexible"
							required
							fullWidth
							value={values.title}
							onChange={handleChange('title')}
							label="Title"
							variant="outlined"
						/>
						<DialogContentText>value={values.title}</DialogContentText>
						<TextField
							id="outlined-multiline-flexible"
							multiline
							fullWidth
							required
							value={values.descrpition}
							onChange={handleChange('descrpition')}
							rows={4}
							label="Description"
							variant="outlined"
						/>
					</Collapse>
				</DialogContent>
				<DialogContent>
					<Collapse in={openAlert}>
						<Alert severity="error">{error}</Alert>
					</Collapse>
					<Collapse in={openGreen}>
						<Alert severity="success">Update Section Successfully21!</Alert>
					</Collapse>
				</DialogContent>
				<DialogActions>
					<Collapse in={!openGreen}>
						<IconButton color="secondary" aria-label="add an alarm" onClick={deleteSection}>
							<DeleteForeverOutlinedIcon fontSize="large" />
						</IconButton>
					</Collapse>
					<Collapse in={!openGreen}>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</Collapse>
					<Button onClick={UpdateSection} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>

			{/**  This window is used for adding new question */}
			<Dialog
				open={openAddQuestion}
				onClose={handleQClose}
				aria-labelledby="max-width-dialog-title"
				//	fullWidth="md"
				maxWidth="lg"
				fullWidth
			>
				<DialogTitle id="form-dialog-title">New Question</DialogTitle>
				<DialogContent>
					<Collapse in={!openGreen}>
						<DialogContentText>Please fill in details for the new question.</DialogContentText>
						<TextField
							id="outlined-multiline-flexible"
							required
							fullWidth
							value={values.question}
							onChange={handleChange('question')}
							label="Question"
							variant="outlined"
						/>
						<DialogContentText>value={values.question}</DialogContentText>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Type</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={type}
								onChange={handleTypeChange}

							>
								<MenuItem value={'slider'} >Slider </MenuItem>
								<MenuItem value={'singleSelection'}>MultiChoice</MenuItem>
								{/* <MenuItem value={'yesorno'}>Yes/No</MenuItem> */}
							</Select>
						</FormControl>
					</Collapse>
				</DialogContent>
				<DialogContent>
					<Collapse in={openAlert}>
						<Alert severity="error">{error}</Alert>
					</Collapse>
					<Collapse in={openGreen}>
						<Alert severity="success">Update Section Successfully22!</Alert>
					</Collapse>
				</DialogContent>
				<DialogActions>
					<Collapse in={!openGreen}>
						<Button onClick={handleQClose} color="primary">
							Cancel
						</Button>
					</Collapse>
					<Button onClick={AddQuestion} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SectionQuestions;
