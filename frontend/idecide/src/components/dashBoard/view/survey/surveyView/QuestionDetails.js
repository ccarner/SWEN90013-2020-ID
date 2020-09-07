import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';

import { Box, Card, Collapse, IconButton, TextField, CardContent, Divider, Grid, Typography } from '@material-ui/core';

const QuestionDetails = (props) => {
	const [ isOpen, setOpen ] = React.useState(false);

//	console.log(props.data);

	const QuestionDetail = () => {
		return (
			<Box p={1}>
				<Grid container spacing={3}>
					<Grid item xs={12} display="flex" />
					<Grid item xs={4} display="flex">
						Modifying module
					</Grid>
				</Grid>
			</Box>
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
