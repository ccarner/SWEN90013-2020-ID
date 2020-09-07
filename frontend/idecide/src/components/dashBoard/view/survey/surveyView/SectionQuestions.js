import React, { useState, useEffect, createContext } from 'react';
import { Box, Button, Collapse, Dialog,DialogTitle, DialogContent,DialogContentText,TextField,DialogActions} from '@material-ui/core';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton, Grid } from '@material-ui/core';
import { getSurveyById, editSurvey } from '../../../../../API/surveyAPI';
import EditIcon from '@material-ui/icons/Edit';
import QuestionDetails from './QuestionDetails';
import Alert from '@material-ui/lab/Alert';

export const t = 4;
export const QuestionContext = createContext();

const SectionQuestions = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isOpen, setIsOpen ] = React.useState(false);
	
	console.log(props);
	const [ open, setDMOpen ] = React.useState(false); //control of adding new survey
	//const [ isOpen, setOpen ] = React.useState(false);
	const [ openAlert, setOpen ] = React.useState(false);
	const [ openGreen, setOpenGreen ] = React.useState(false);
	const [ error, setError ] = React.useState();
	const [ values, setValues ] = React.useState({
		title: props.data.sectionTitle,
		descrpition: props.data.sectionIntroduction
	});

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

	const UpdateSection = async () => {
		if (openGreen) {
			window.location.href = './surveyId='+props.surveyId;
		}
		console.log(values.descrpition);
	//	console.log(product);
		let sections = props.sections;
		var modifiedSection = {
			sectionTitle:values.title,
			sectionIntroduction: values.descrpition,
			sectionId: props.data.sectionId
		};

		sections.splice(props.data.sectionId,1,modifiedSection)

		var readyData = JSON.stringify({
			surveyId: props.surveyId,
			surveySections: sections
		});
		console.log(readyData);
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
										onClick={handleOpen}
									>
										<EditIcon color="primary" />
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
						{typeof props.data.questions !== 'undefined'?(
							props.data.questions.map((question) => (
							<Box>
								<QuestionDetails data={question} />
							</Box>
						))): (<div/>)}
					</Collapse>
				</Box>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="max-width-dialog-title"
					//	fullWidth="md"
					maxWidth="md"
				>
					<DialogTitle id="form-dialog-title">Section</DialogTitle>
					<DialogContent>
						<Collapse in={!openGreen}>
							<DialogContentText>
								Please input the title and description for the new Survey.
							</DialogContentText>
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
							<Alert severity="success">Update Section Successfully!</Alert>
						</Collapse>
					</DialogContent>
					<DialogActions>
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
			</div>
		</div>
	);
};

export default SectionQuestions;
