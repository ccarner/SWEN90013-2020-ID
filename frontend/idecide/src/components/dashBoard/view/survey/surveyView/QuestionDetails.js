import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { editSurvey } from "../../../../../API/surveyAPI";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Button, Box, Card, Collapse, IconButton, TextField, DialogContentText, CardContent, Divider, Grid, Typography } from '@material-ui/core';

const QuestionDetails = (props) => {
	const [isOpen, setOpen] = React.useState(false);


	const UpdateQuesion = async (event) => {


		event.preventDefault();

		const dataIn = new FormData(event.target);
		var questionObject = {};
		dataIn.forEach((value, key) => {
			questionObject[key] = value;
		});

		let sections = props.currentSection;
		props.data.questionText = questionObject.updatedQuestion;
		props.questions.splice(parseInt(props.data.questionId) - 1, 1, props.data);


		var readyData = JSON.stringify({
			surveyId: props.surveyID,
			surveySections: sections
		});

		await editSurvey(readyData)
			.then((data) => {
				alert("Question description has been updated!");
				window.location.reload();
			});
	}

	const deleteQuestion = async (event) => {





		let sections = props.currentSection;

		props.questions.splice(parseInt(props.data.questionIndex), 1);
		props.questions.map((item, index) => {
			item.questionIndex = index;
		});


		var readyData = JSON.stringify({
			surveyId: props.surveyID,
			surveySections: sections
		});

		await editSurvey(readyData)
			.then((data) => {
				alert("Question has been updated deleted!");
				window.location.reload();
			});
	}


	const QuestionDetail = () => {
		return (
			<div>
				<form onSubmit={UpdateQuesion}>

					<DialogContentText>113, Please input the description of the question.</DialogContentText>
					<TextField
						id="outlined-multiline-flexible"
						name="updatedQuestion"
						multiline
						fullWidth
						required
						rows={3}
						label="Description"
						variant="outlined"
					/>
					<IconButton color="secondary" aria-label="add an alarm" onClick={deleteQuestion}>
						<DeleteForeverOutlinedIcon fontSize="large" />
					</IconButton>
					<Button type="submit" color="primary">
						Confirm
					</Button>

				</form>
			</div>
		);
	};
	return (
		<div>
			<Box p={1}>
				<Card>
					<CardContent style={{ height: 70 }}>
						<Grid xs={12} container direction="row" justify="flex-start" alignItems="center">
							<Grid item xs={10}>
								<Typography color="subtitle1" gutterBottom>
									{'Q' + props.data.questionId + ' :  ' + props.data.questionText}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<Typography color="textSecondary" gutterBottom variant="body1">
									{props.data.questionType}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<IconButton
									style={{ width: 50 }}
									color="secondary"
									aria-label="add an alarm"
									onClick={() => {
										setOpen((prev) => !prev);
									}}
								>
									<EditIcon color="primary" />
								</IconButton>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<Collapse in={isOpen}>
						<CardContent>
							<QuestionDetail />
						</CardContent>
					</Collapse>
				</Card>
			</Box>
		</div>
	);
};

QuestionDetails.propTypes = {
	className: PropTypes.string
};

export default QuestionDetails;
