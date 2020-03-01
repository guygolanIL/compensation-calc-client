import React, {useMemo} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const getMarks = (years) => {
    const marks = [];
    for (let i = 0 ; i < years; i++) {
        marks.push({
            value: i,
            label: 'i Years'
        })
    }
    return marks;
};

const Filters = ({jobs, onSelectJob, selectedJob, exp, onChangedExp, maxYears}) => {
    const classes = useStyles();

    const marks = useMemo(() => getMarks(maxYears), [maxYears]);

    return (
        <div>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Job</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedJob}
                    onChange={(e) => onSelectJob(e.target.value)}
                >
                    {
                        jobs ? jobs.map(job => (
                            <MenuItem key={job} value={job}>{job}</MenuItem>
                        )) : null
                    }

                </Select>
                <Slider
                    onChange={(e, value) => onChangedExp(value)}
                    defaultValue={0}
                    getAriaValueText={(value) => (value)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    // marks={marks}
                    min={0}
                    max={maxYears}
                />
            </FormControl>

        </div>
    );
};

export default React.memo(Filters);
