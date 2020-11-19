import React, { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { getAllSurveys } from "../../../../API/surveyAPI";
import ActionDisplay from "./ActionDisplay";
import Loading from "./../../../reusableComponents/loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const SurveyContext = createContext();

export default function APLayout() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllSurveys();
      setData(result.data);
      setIsLoading(false);
      //	console.log(data);
      //	console.log(isLoading);
    };

    fetchData();
  }, []);

  //	console.log(isLoading);
  //	console.log(data);
  return (
    <Grid
      className={classes.root}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <SurveyContext.Provider value={data}>
              <ActionDisplay />
            </SurveyContext.Provider>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
