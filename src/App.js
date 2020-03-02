import React, { useMemo, useState, useCallback } from "react";
import { IntegrationSelector } from "./components/IntegrationSelector/IntegrationSelector";
import { CircularProgress, Fade, Slide } from "@material-ui/core";
import useData from "./hooks/useData";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Filters from "./components/Filters/Filters";

const useStyles = makeStyles(theme => ({
    App: {},

    IntegrationSelectorContainer: {
        display: "flex",
        marginTop: "50px"
    },

    Loader: {
        textAlign: "center",
        margin: "100px auto"
    },

    FiltersContainer: {
        display: "flex",
        margin: "1rem 0 1rem 0"
    }
}));

const noDataError = <div>Failed to fetch data...</div>;

function App() {
    const classes = useStyles();
    const [selectedProviders, setSelectedProviders] = useState({});
    const [selectedJob, setSelectedJob] = useState("");
    const [exp, setExp] = useState(0);

    const [data, loading] = useData(true, {
        url: "/data",
        options: { method: "GET" }
    });

    const loader = useMemo(
        () => (
            <div className={classes.Loader}>
                <CircularProgress size="7rem" color="primary" />
            </div>
        ),
        [classes.Loader]
    );

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
                            onCheck={({ provider, status }) => {
                                setSelectedProviders({
                                    ...selectedProviders,
                                    [provider]: status
                                });
                            }}
                            integrations={data.map(
                                integration => integration.name
                            )}
                        />
                    </Fade>
                </div>
            </Slide>
        ),
        [data, loading, selectedProviders]
    );

    const filters = useMemo(
        () => (
            <Slide timeout={2500} direction="up" in={!loading}>
                <div
                    style={{
                        margin: "auto"
                    }}
                >
                    <Fade timeout={5000} in={!loading}>
                        <div>
                            <Filters
                                maxYears={9}
                                exp={exp}
                                onChangedExp={exp => {
                                    console.log(exp);
                                    setExp(exp);
                                }}
                                onSelectJob={job => setSelectedJob(job)}
                                selectedJob={selectedJob}
                                jobs={
                                    data
                                        ? data.length > 0
                                            ? Object.keys(data[0].data)
                                            : null
                                        : null
                                }
                            />
                        </div>
                    </Fade>
                </div>
            </Slide>
        ),
        [data, selectedJob, exp, loading]
    );

    const getComponentsIfNotLoading = useCallback(() => {
        if (loading) {
            return loader;
        }
        if (data.length !== 0) {
            return (
                <>
                    <div className={classes.IntegrationSelectorContainer}>
                        {selector}
                    </div>
                    <div className={classes.FiltersContainer}>{filters}</div>
                </>
            );
        }

        return noDataError;
    }, [
        loading,
        data,
        loader,
        selector,
        classes.IntegrationSelectorContainer,
        filters,
        classes.FiltersContainer
    ]);

    return <div className={classes.App}>{getComponentsIfNotLoading()}</div>;
}

export default App;
