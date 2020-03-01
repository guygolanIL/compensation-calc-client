import React from "react";
import "./IntegrationSelector.css";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    IntegrationSelector: {
        display: "inline-block",
        border: "solid 1px #b0abab",
        boxShadow: "0px 0px 7px 3px #b0abab",
        maxWidth: "700px",
        borderRadius: "10px"
    },
    CheckboxCard: {
        display: "inline-block"
    },
    IntegrationName: {
        marginRight: "10px"
    }
}));

export function IntegrationSelector({ style, integrations, onCheck }) {
    const classes = useStyles();

    return (
        <div style={style} className={classes.IntegrationSelector}>
            {integrations.map(integration => (
                <div className={classes.CheckboxCard} key={integration}>
                    <Checkbox
                        onChange={e => {
                            onCheck({
                                provider: integration,
                                status: e.target.checked
                            });
                        }}
                        color="primary"
                        id={`${integration}-checkbox`}
                    />
                    <span className={classes.IntegrationName}>
                        {integration.toUpperCase()}
                    </span>
                </div>
            ))}
        </div>
    );
}
