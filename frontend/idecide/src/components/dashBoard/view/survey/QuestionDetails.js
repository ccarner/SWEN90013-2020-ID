import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import QuestionContext from "./SurveyDetails";


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
	makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column'
	}
});

const QuestionDetails = (props) => {
	//	const classes = useStyles();
	const [ age, setAge, qN ] = React.useState('');
	const [ isOpen, setOpen ] = React.useState(false);
    const [ open, setDMOpen ] = React.useState(false);

    const quesionDetail = useContext(QuestionContext);
    console.log(quesionDetail);
    console.log(props.data.surveySections);

	const handleClickOpen = () => {
		setDMOpen(true);
	};

	const handleClose = () => {
		setDMOpen(false);
		// Delete the new quesion.
	};

	const handleChange = (event) => {
		setAge(event.target.value);
		//   qN(event.target.value);
	};

	function FormRow() {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={6}>
					<Box p={2}>
						<TextField
							id="standard-basic"
							value={age}
							fullWidth
							label="Radio"
							InputProps={{
								readOnly: true
							}}
						/>
					</Box>
				</Grid>
			</React.Fragment>
		);
	}

	function FirstLine() {
		return (
			<React.Fragment>
				<Grid item item xs={12} sm={6} />
			</React.Fragment>
		);
	}

	function SecondLine() {
		return (
			<Grid item xs={12} display="flex">
				<Box p={1}>
					<Typography color="textPrimary" gutterBottom variant="h5">
						Description
					</Typography>
					<TextField
						id="outlined-multiline-flexible"
						multiline
                        fullWidth
                        label="Description"
						rows={2}
						value={age}
						onChange={handleChange}
						variant="outlined"
					/>
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
							value={age}
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
							value={age}
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
							value={age}
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
			<Card>
				<CardHeader
					action={
						/*	<IconButton color="secondary" aria-label="add an alarm">
						<KeyboardArrowDownIcon />
					</IconButton>*/
						<IconButton color="secondary" aria-label="add an alarm">
							<EditIcon
								color="primary"
								fontSize="large"
								onClick={() => {
									setOpen((prev) => !prev);
								}}
							/>
						</IconButton>
					}
					title={'Question'}
				/>
				<Divider />
				<Collapse in={isOpen}>
					<CardContent>
						<Grid container spacing={3}>
							<Grid container item xs={12} spacing={2}>
								<SecondLine />
							</Grid>
							<Grid container item xs={12} spacing={2}>
								<ThirdLine />
							</Grid>
						</Grid>
					</CardContent>
				</Collapse>
			</Card>
		</div>
	);
};

QuestionDetails.propTypes = {
	className: PropTypes.string
};

export default QuestionDetails;
