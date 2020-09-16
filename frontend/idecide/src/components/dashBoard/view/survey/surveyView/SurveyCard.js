import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Editable from './../SurveyLayout';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogContentText,
	DialogActions,
	Box,
	Collapse,
	Card,
	CardContent,
	Divider,
	Grid,
	CardMedia,
	Typography,
	makeStyles,
	CardHeader,
	Button,
	IconButton
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';
import ModelBoard from '../util/ModelBoard';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconLogo from '../../../../../images/idecide-logo.png';
import IconLogo1 from '../../../../../images/iconPrioritiesSurvey.png';
import { getStaticImageUrlFromName, editSurvey, DeleteSurvey } from '../../../../../API/surveyAPI';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	large: {
		width: theme.spacing(3),
		height: theme.spacing(3)
	},
	media: {
		height: '100%'
	},
	statsItem: {
		alignItems: 'center',
		display: 'flex'
	},
	statsIcon: {
		marginRight: theme.spacing(1)
	}
}));

const SurveyCard = ({ product, editable, ...rest }) => {
	const classes = useStyles();
	const [openAlert, setOpen] = React.useState(false);
	const [openGreen, setOpenGreen] = React.useState(false);
	const [error, setError] = React.useState();
	const [open, setDMOpen] = React.useState(false); //control of adding new survey
	const [values, setValues] = React.useState({
		title: product.surveyTitle,
		descrpition: product.surveyIntroduction
	});

	//	const [ deleteMD, setDeleteMD ] = React.useState(true);
	//	const editable = useContext(Editable);
	console.log(editable);
	const handleOpen = () => {
		setDMOpen(true);
	};

	const handleClose = () => {
		setDMOpen(false);
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleDelete = async () => {
		alert('Are you sure you want to delete this survey?');
		//
		// console.log(values.descrpition);
		// console.log(product);

		const feedBack = await DeleteSurvey(product.surveyId)
			.then(() => {
				//	setOpenGreen(true);
				// window.location.replace('./survey');

				window.location.href = '/dashboard/survey';
			})
			.catch((error) => {
				setOpen(true);
				setError(error + '');
				//			alert('Error from processDataAsycn() with async( When promise gets rejected ): ' + error);
			});
		return feedBack;
	};

	const UpdateSurvey = async () => {
		if (openGreen) {
			window.location.href = '/dashboard/survey';
			// window.location.replace('./survey');

		}
		//
		console.log(values.descrpition);
		console.log(product);
		var readyData = JSON.stringify({
			surveyId: product.surveyId,
			surveyTitle: values.title,
			surveyIntroduction: values.descrpition,
			surveyVersion: product.surveyVersion,
		});
		const feedBack = await editSurvey(readyData)
			.then((data) => {
				setOpenGreen(true);
			})
			.catch((error) => {
				setOpen(true);
				setError(error + '');
				//			alert('Error from processDataAsycn() with async( When promise gets rejected ): ' + error);
			});
		return feedBack;
	};

	return (
		<div>
			<Collapse in={editable}>
				<Grid container direction="row" justify="flex-end" alignItems="center">
					<IconButton
						color="secondary"
						aria-label="add an alarm"
						style={{ width: 50 }}
						onClick={handleDelete}
					>
						<DeleteForeverOutlinedIcon fontSize="middle" />
					</IconButton>
					<IconButton color="secondary" aria-label="add an alarm" style={{ width: 50 }} onClick={handleOpen}>
						<EditIcon color="primary" fontSize="middle" />
					</IconButton>
				</Grid>
			</Collapse>
			<Card {...rest} align="center">
				<CardHeader title={product.surveyTitle} />
				<Divider />
				<Box p={1} />
				<CardMedia
					className={classes.media}
					image={getStaticImageUrlFromName(product.surveyImageName)}
					title="Contemplative Reptile"
					style={{
						width: '30%',
						height: '30%'
					}}
				/>
				<CardContent
					style={{
						height: '40%'
					}}
				>
					<Typography align="center" color="textPrimary" variant="body2">
						{product.surveyIntroduction}
					</Typography>
				</CardContent>
				<Divider />
				<Box p={1}>
					<Grid container justify="space-between" spacing={2}>
						<Grid item>
							<AccessTimeIcon color="action" />
							<Typography color="textSecondary" display="inline" variant="body2">
								{product.surveyVersion}
							</Typography>
						</Grid>
						<Grid item>
							<GetAppIcon color="action" />
							<Typography color="textSecondary" display="inline" variant="body2">
								{' '}
								TakenNum
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Card>
			<Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title" maxWidth="lg" fullWidth>
				<DialogTitle id="form-dialog-title">Survey</DialogTitle>
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
						<Alert severity="success">Update Survey Successfully!</Alert>
					</Collapse>
				</DialogContent>
				<DialogActions>
					<Collapse in={!openGreen}>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</Collapse>
					<Button onClick={UpdateSurvey} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

SurveyCard.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired
};

export default SurveyCard;
