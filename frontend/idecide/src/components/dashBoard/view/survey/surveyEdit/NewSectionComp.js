import React, { useState, useEffect, createContext } from 'react';
import { Box, Button, Collapse, makeStyles } from '@material-ui/core';
import { Card, CardContent, CardHeader, Divider, Typography, TextField, Grid } from '@material-ui/core';
import { getSurveyById, editSurvey } from '../../../../../API/surveyAPI';

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

const SurveySection = (props) => {
	const [ values, setValues ] = React.useState({
		title: '',
		descrpition: ''
	});
	let a = props.data.surveySections;

	const surveyId = props.id;
	//	console.log(props);
	//	console.log(a);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const addNewSectionInComp = async () => {
		let sectionId = 1;
		//		console.log(a);
		if (typeof a !== 'undefined') sectionId = a.length + 1;
		console.log(sectionId);
		const newSection = {
			sectionId: sectionId,
			sectionTitle: values.title,
			sectionIntroduction: values.descrpition,
			questions: []
		};
		if (typeof a == 'undefined') {
			a = [ newSection ];
		} else {
			a.push(newSection);
		}
		a.map((item, index) => {
			item.sectionId = index+1;
		});

		var readyData = JSON.stringify({
			surveyId: surveyId,
			surveySections: a
		});

		//	console.log(readyData);

		const feedBack = await editSurvey(readyData)
			.then(() => {
				//	alert("aaaaaa");
				window.location.href = './surveyId=' + surveyId;
				//	setOpenGreen(true);
			})
			.catch((error) => {
				//	setOpen(true);
				//	setError(error + '');
				alert('Error from processDataAsycn() with async( When promise gets rejected ): ' + error);
			});
	};

	return (
		<Box p={1}>
			<Card>
				<CardHeader title="New Survey Section" />
				<Divider />
				<CardContent>
					<TextField
						id="outlined-multiline-flexible"
						required
						fullWidth
						value={values.title}
						onChange={handleChange('title')}
						label="Title"
						variant="outlined"
					/>
				</CardContent>
				<CardContent>
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
				</CardContent>
				<Divider />
				<CardContent>
					<Grid container direction="row" justify="space-evenly" alignItems="center">
						<Button variant="contained" color="secondary" onClick={() => {}}>
							Cancel
						</Button>
						<Button variant="contained" color="primary" onClick={addNewSectionInComp}>
							Save
						</Button>
					</Grid>
				</CardContent>
			</Card>˝
		</Box>
	);
};

export default SurveySection;
