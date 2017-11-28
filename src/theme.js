import {createMuiTheme} from "material-ui";
import green from "material-ui/es/colors/green";
import blue from "material-ui/es/colors/blue";
import pink from "material-ui/es/colors/pink";

export default createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
        accent: pink
    },
    status: {
        danger: 'orange',
    },
});