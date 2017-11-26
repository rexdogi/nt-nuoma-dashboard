import {createMuiTheme} from "material-ui";
import green from "material-ui/es/colors/green";
import blue from "material-ui/es/colors/blue";

export default createMuiTheme({
    palette: {
        primary: blue,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});