import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120
    },
    Filters: {
        margin: "auto",
        padding: "10px 20px",
        textAlign: 'center',
        display: "inline-block",
        border: "solid 1px #b0abab",
        boxShadow: "0px 0px 7px 3px #b0abab",
        width: "73vw",
        borderRadius: "10px"
    }
}));

const Filters = ({
    jobs,
    onSelectJob,
    selectedJob,
    exp,
    onChangedExp,
    maxYears
}) => {
    const classes = useStyles();

    return (
        <div className={classes.Filters}>
            <FormControl className={classes.formControl}>
                <InputLabel id="jobSelectLabel">Job</InputLabel>
                <Select
                    labelId="jobSelectLabel"
                    id="jobSelect"
                    value={selectedJob}
                    onChange={e => onSelectJob(e.target.value)}
                >
                    {jobs
                        ? jobs.map(job => (
                              <MenuItem key={job} value={job}>
                                  {job}
                              </MenuItem>
                          ))
                        : null}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="expSliderLabel">Exp</InputLabel>
                <Slider
                    onChangeCommitted={(e, value) => onChangedExp(value)}
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    max={maxYears}
                />
            </FormControl>
        </div>
    );
};

export default React.memo(Filters);
