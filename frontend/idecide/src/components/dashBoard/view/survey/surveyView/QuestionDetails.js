import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';

import {
	Box,
	Card,
	Collapse,
	IconButton,
	TextField,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';



const QuestionDetails = (props) => {
	const [ isOpen, setOpen ] = React.useState(false);

	console.log(props.data);
//	console.log(props.index);
//	console.log(props.index);
	//   console.log(Object.keys(props.data).length);
	//	console.log(props.data.length);
	//   const mapData = JSON.stringify(props.data);
	//   console.log(mapData);
	//setQuestion(props.data);

	
	function SecondLine(q) {
		return (
			<Grid item xs={12} display="flex">
				<Box p={1}>
					<Typography color="textPrimary" gutterBottom variant="subtitle1">
						{q.questionText}
					</Typography>
				</Box>
			</Grid>
		);
	}

	function ThirdLine() {
		return (
			<Box p={2}>
				<Typography color="textPrimary" gutterBottom variant="h5">
					Choices
				</Typography>
				<Grid item xs={12} display="flex">
					<Box p={2}>
						<TextField
							id="standard-basic"
							label="A."
							InputProps={{
								readOnly: true
							}}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} display="flex">
					<Box p={2}>
						<TextField
							id="standard-basic"
							label="B."
							InputProps={{
								readOnly: true
							}}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} display="flex">
					<Box p={2}>
						<TextField
							id="standard-basic"
							label="C."
							InputProps={{
								readOnly: true
							}}
						/>
					</Box>
				</Grid>
			</Box>
		);
	}
	return (
		<div>
			{typeof props.data == 'undefined' ? (
				<div>Loading</div>
			) : (
				props.data.questions.map((q) =>
				//	item.questions.map((q) => (
						//    console.log(item.sectionTitle);
						<Box p={2}>
							<Card>
								<CardHeader
									action={
										/*	<IconButton color="secondary" aria-label="add an alarm">
						<KeyboardArrowDownIcon />
					</IconButton>*/
										<IconButton
											color="secondary"
											aria-label="add an alarm"
											onClick={() => {
												setOpen((prev) => !prev);
											}}
										>
											<EditIcon color="primary" fontSize="large" />
										</IconButton>
									}
									title={'Question ' + q.questionId}
								/>
								<Divider />
								<Collapse in={isOpen}>
									<CardContent>
										<Grid container spacing={3}>
											<Grid container item xs={12} spacing={2}>
												<SecondLine questionText={q.questionText} />
											</Grid>
											<Grid container item xs={12} spacing={2}>
												<ThirdLine />
											</Grid>
										</Grid>
									</CardContent>
								</Collapse>
							</Card>
						</Box>
				//	))
				)
			)}
		</div>
	);
};

QuestionDetails.propTypes = {
	className: PropTypes.string
};

export default QuestionDetails;
