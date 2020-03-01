import React, {useMemo, useState} from "react";
import {IntegrationSelector} from "./components/IntegrationSelector/IntegrationSelector";
import {CircularProgress, Fade, Slide} from "@material-ui/core";
import useData from "./hooks/useData";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    App: {},
    IntegrationSelectorContainer: {
        display: "flex",
        marginTop: "50px"
    },
    Loader: {
        textAlign: "center",
        margin: "auto"
    }
}));

function App() {
    const classes = useStyles();
    const [selectedProviders, setSelectedProviders] = useState({});

    const [data, loading] = useData(true, {
        url: "/data",
        options: {method: "GET"}
    });

    const loader = <div className={classes.Loader}><CircularProgress size='7rem' color='primary'/></div>;

    const selector = useMemo(
        () => (
            <Slide timeout={1500} direction={"up"} in={!loading}>
                <div
                    style={{
                        margin: "auto"
                    }}
                >
                    <Fade timeout={3500} in={!loading}>
                        <IntegrationSelector
                            onCheck={({provider, status}) => {
                                setSelectedProviders({
                                    ...selectedProviders,
                                    [provider]: status
                                });
                            }}
                            integrations={data.map(integration => integration.name)}
                        />
                    </Fade>
                </div>
            </Slide>
        ),
        [data, loading, selectedProviders]
    );

    return (
        <div className={classes.App}>
            <div className={classes.IntegrationSelectorContainer}>
                {loading ? loader : selector}
            </div>
        </div>
    );
}

export default App;
