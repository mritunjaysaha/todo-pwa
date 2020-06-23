import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function ItemOne(theme) {
        return (
            <Paper>
                <div>Item 1</div>
            </Paper>
        );
    }

    function ItemTwo(theme) {
        return (
            <Paper>
                <div>Item two</div>
            </Paper>
        );
    }
    return (
        <BrowserRouter>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Item One" component={Link} to="/one" />
                    <Tab label="Item Two" component={Link} to="/two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Paper>

            <Switch>
                <Route path="/one" component={ItemOne} />
                <Route path="/two" component={ItemTwo} />
            </Switch>
        </BrowserRouter>
    );
}
