import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core";
const allFalse = obj => {
    if (!obj) return true;

    const result = Object.entries(obj).reduce((accumulator, [key, value]) => {
        return accumulator && !value;
    }, true);

    return result;
};
const resolve = (providersData, providers, job, exp) => {
    const result = {
        lowerBoundAvg: undefined,
        upperBoundAvg: undefined,
        messages: []
    };

    if (providersData.length === 0) {
        result.messages.push("Error in data fetching");
    }

    if (allFalse(providers)) {
        result.messages.push("Please select a provider/s");
    }

    if (!job) {
        result.messages.push("Please select a job title");
    }

    if (result.messages.length !== 0) {
        return result;
    }

    const bounds = providersData.reduce((accumulator, { name, data }) => {
        if (providers[name] !== true) {
            return accumulator;
        }

        const exp = data[job].professionalExp;

        accumulator.push({ ...exp });

        return accumulator;
    }, []);

    const { lowerBound, upperBound } = bounds.reduce(
        (accumulator, { lowerBound, upperBound }) => {
            if (!lowerBound[exp] || !upperBound[exp]) {
                return accumulator;
            }

            accumulator.lowerBound.push(lowerBound[exp]);
            accumulator.upperBound.push(upperBound[exp]);
            return accumulator;
        },
        { lowerBound: [], upperBound: [] }
    );

    result.lowerBoundAvg =
        lowerBound.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0) / lowerBound.length;
    result.upperBoundAvg =
        upperBound.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0) / upperBound.length;

    return result;
};

const useStyles = makeStyles(theme => ({
    CompensationResolver: {
        width: "35vw",
        border: "solid 1px #b0abab",
        margin: "auto",
        display: "inline-block",
        padding: "10px 20px",
        boxShadow: "0px 0px 7px 3px #b0abab",
        textAlign: "center",
        borderRadius: "10px",
        fontWeight: "bold"
    }
}));

export const CompensationResolver = ({
    data,
    selectedProviders,
    selectedJob,
    exp
}) => {
    const classes = useStyles();

    const { lowerBoundAvg, upperBoundAvg, messages } = useMemo(() => {
        return resolve(data, selectedProviders, selectedJob, exp);
    }, [data, selectedProviders, selectedJob, exp]);

    return (
        <div className={classes.CompensationResolver}>
            {messages.length !== 0
                ? messages.map(message => <div key={message}>{message}</div>)
                : `${lowerBoundAvg.toFixed(2)}k - ${upperBoundAvg.toFixed(2)}k`}
        </div>
    );
};
