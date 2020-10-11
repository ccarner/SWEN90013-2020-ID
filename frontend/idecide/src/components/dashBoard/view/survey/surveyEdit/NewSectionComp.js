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
		descrpition: '',
		sectionIntroductionHtmlB64: ''
	});
	let currentSections = props.data.surveySections;

	const surveyId = props.id;

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const addNewSectionInComp = async () => {
		let sectionIndex = 0;
		if (typeof currentSections !== 'undefined') {
			sectionIndex = currentSections.length;
		}

		const newSection = {
			sectionId: sectionIndex,
			sectionTitle: values.title,
			sectionIntroduction: values.descrpition,
			questions: []
		};
		if (typeof currentSections == 'undefined') {
			currentSections = [ newSection ];
		} else {
			currentSections.push(newSection);
		}
		currentSections.map((item, index) => {
			item.sectionIndex = index;
		});

		var readyData = JSON.stringify({
			surveyId: surveyId,
			surveySections: currentSections
		});

		await editSurvey(readyData)
			.then((response) => {
				alert('Adding new section successfully.');
				window.location.replace('/dashboard/surveyId=' + surveyId);
			})
			.catch((error) => {
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
					<Box p={1} />
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
					<Box p={1} />
					<TextField
						id="outlined-multiline-flexible"
						multiline
						fullWidth
						required
						value={values.sectionIntroductionHtmlB64}
						onChange={handleChange('sectionIntroductionHtmlB64')}
						rows={4}
						label="HTML"
						variant="outlined"
					/>
				</CardContent>

				<Divider />
				<CardContent>
					<Grid container direction="row" justify="space-evenly" alignItems="center">
						<Button variant="contained" color="secondary" onClick={() => window.location.reload()}>
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
