import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { green } from '@material-ui/core/colors';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import {
	Box,
	Card,
	Collapse,
	Button,
	IconButton,
	TextField,
	InputLabel,
	Select,
	MenuItem,
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

const NewSurvey = ({ className, ...rest }) => {
	//	const classes = useStyles();
	const [ age, setAge, qN ] = React.useState('');
	const [ isOpen, setOpen ] = React.useState(false);

	const handleChange = (event) => {
		setAge(event.target.value);
		//   qN(event.target.value);
	};

	function FormRow() {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={6}>
					<Box p={2}>
						<InputLabel id="demo-simple-select-label">Question Type</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={age}
							fullWidth
							onChange={handleChange}
						>
							<MenuItem value={10}>Slider</MenuItem>
							<MenuItem value={20}>Multi-Choice</MenuItem>
						</Select>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box p={2} display="flex" justifyContent="flex-end">
						<TextField
							id="standard-basic"
							value={age}
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
						<IconButton color="primary" aria-label="add an alarm">
							<EditIcon color="primary" fontSize="large" />
						</IconButton>
						<IconButton aria-label="add an alarm">
							<HighlightOffIcon color="error" fontSize="large" />
						</IconButton>
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
						<IconButton color="primary" aria-label="add an alarm">
							<EditIcon color="primary" fontSize="large" />
						</IconButton>
						<IconButton aria-label="add an alarm">
							<HighlightOffIcon color="error" fontSize="large" />
						</IconButton>
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
						<IconButton color="primary" aria-label="add an alarm">
							<EditIcon color="primary" fontSize="large" />
						</IconButton>
						<IconButton aria-label="add an alarm">
							<HighlightOffIcon color="error" fontSize="large" />
						</IconButton>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center">
						<IconButton color="secondary" aria-label="add an alarm">
							<AddCircleOutlineIcon style={{ color: green[500] }} fontSize="large" />
						</IconButton>
					</Box>
				</Grid>
			</Box>
		);
	}
	return (
		<Card>
			<Tooltip title="Please double click to open the question card." arrow>
				<CardHeader
					onMouseEnter={() => {}}
					onDoubleClick={() => {
						setOpen((prev) => !prev);
					}}
					action={
						/*	<IconButton color="secondary" aria-label="add an alarm">
						<KeyboardArrowDownIcon />
					</IconButton>*/
						<IconButton aria-label="add an alarm">
							<HighlightOffIcon
								color="error"
								fontSize="large"
								onClick={() => {
									alert("Please input 'DELETE' to  delete this question.");
								}}
							/>
						</IconButton>
					}
					title={'Question '}
				/>
			</Tooltip>
			<Divider />
			<Collapse in={isOpen}>
				<CardContent>
					<Grid container spacing={3}>
						<Grid container item xs={12}>
							<FormRow />
						</Grid>
						<Grid container item xs={12} spacing={2}>
							<SecondLine />
						</Grid>
						<Grid container item xs={12} spacing={2}>
							<ThirdLine />
						</Grid>
						<Grid container item xs={12} spacing={5}>
							<FirstLine />
						</Grid>
					</Grid>
				</CardContent>

				<Divider />
				<Box display="flex" justifyContent="center" p={3}>
					<Grid container item xs={6} sm={3}>
						<Button color="primary" variant="contained">
							Cancel
						</Button>
					</Grid>
					<Grid container item xs={6} sm={3}>
						<Button color="primary" variant="contained">
							Save
						</Button>
					</Grid>
				</Box>
			</Collapse>
		</Card>
	);
};

NewSurvey.propTypes = {
	className: PropTypes.string
};

export default NewSurvey;
