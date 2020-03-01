import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#d4387c',
            contrastText: '#ff0000'
        },
        secondary: {
            main: "#E3E2DF",
            contrastText: "#0000ff"
        }
    }
});

export default theme;