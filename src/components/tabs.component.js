import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import TodoList from "./list-item.component";
import { set, get } from "idb-keyval";
import Popup from "reactjs-popup";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import "../styles/main.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HomeIcon from "@material-ui/icons/Home";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
const contentStyle = {
    background: "#f00",
    height: "50%",
};

const overlayStyle = {
    background: "rgba(0,0,0,0.4)",
};

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CenteredTabs() {
    const [date, setDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        text: "",
        key: "",
        deadline: "",
        active: "",
        completed: "",
        missed: "",
    });
    const active = true;
    const missed = false;
    const completed = false;
    const pathMap = ["/", "/completed", "/missed"];
    const [currentMobileTab, setCurrentMobileTab] = useState(pathMap[0]);
    const [currentDesktopTab, setcurrentDesktopTab] = useState(0);
    useEffect(() => {
        get("todo").then((val) => {
            console.log(val);
            if (val != null) {
                setItems(val);
            }
        });
    }, []);

    function handleInput(e) {
        e.preventDefault();
        setCurrentItem({
            text: e.target.value,
            key: new Date(),
            deadline: date,
            active: active,
            completed: completed,
            missed: missed,
        });
    }

    function handleDate(date) {
        setDate(date);
        setCurrentItem({
            text: currentItem.text ? currentItem.text : "",
            key: currentItem.key ? currentItem.key : "",
            deadline: date,
            active: active,
            completed: completed,
            missed: missed,
        });
    }
    const handleMobileTabs = (event, currenTab) => {
        setCurrentMobileTab(currenTab);
    };

    function addTask() {
        setCurrentItem({
            text: currentItem.text,
            key: new Date(),
            deadline: date,
            active: active,
            completed: completed,
            missed: missed,
        });
        const currentDate = new Date();
        setDate(new Date());
        if (currentDate > date) {
            alert("Select a valid date");
            return;
        }
        const newItem = currentItem;
        if (newItem.text !== "") {
            const data = [...items, newItem];
            setItems(data);

            set("todo", data);
        }
    }

    function deleteTodo(key) {
        const filteredItems = items.filter((item) => item.key !== key);
        setItems(filteredItems);
        set("todo", filteredItems);
    }

    function completeTodo(key) {
        const list = items.map((item) => {
            if (item.key === key) {
                item.completed = true;
                item.active = false;
            }
            return item;
        });

        set("todo", list);
    }
    function missedTodo(key) {
        const list = items.map((item) => {
            if (item.key === key) {
                item.completed = false;
                item.active = false;
                item.missed = true;
            }
            return item;
        });
        set("todo", list);
    }

    const classes = useStyles();

    const handleDesktopTabs = (event, newValue) => {
        setcurrentDesktopTab(newValue);
    };
    function ActiveList(theme) {
        return (
            <Paper>
                <Popup
                    trigger={<AddIcon className="createTodoButton" />}
                    modal
                    overlayStyle={overlayStyle}
                    contentStyle={contentStyle}
                >
                    {(close) => (
                        <>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    value={date}
                                    onChange={handleDate}
                                />
                            </MuiPickersUtilsProvider>
                            <input type="text" onChange={handleInput} />

                            <button onClick={addTask}>Add</button>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </>
                    )}
                </Popup>
                {items.length > 0 ? (
                    <TodoList
                        className="cards-container"
                        list={items}
                        deleteItem={deleteTodo}
                        completeTodo={completeTodo}
                        missedTodo={missedTodo}
                        listFor={"active"}
                    />
                ) : (
                    <p>Add Todo</p>
                )}
            </Paper>
        );
    }

    function CompletedList(theme) {
        return (
            <Paper>
                {items.length > 0 ? (
                    <TodoList
                        className="cards-container"
                        list={items}
                        listFor={"completed"}
                    />
                ) : (
                    <p>Yet to complete a todo</p>
                )}
            </Paper>
        );
    }
    function MissedList(theme) {
        return (
            <Paper>
                {items.length > 0 ? (
                    <TodoList
                        className="cards-container"
                        list={items}
                        listFor={"missed"}
                    />
                ) : (
                    <p>No Todo's missed</p>
                )}
            </Paper>
        );
    }
    return (
        <>
            <BrowserRouter>
                <Paper className={classes.root}>
                    <Tabs
                        value={currentDesktopTab}
                        onChange={handleDesktopTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Active" component={Link} to={pathMap[0]} />
                        <Tab
                            label="Completed"
                            component={Link}
                            to={pathMap[1]}
                        />
                        <Tab label="Missed" component={Link} to={pathMap[2]} />
                    </Tabs>
                </Paper>

                <Switch>
                    <Route exact path={pathMap[0]} component={ActiveList} />
                    <Route path={pathMap[1]} component={CompletedList} />
                    <Route path={pathMap[2]} component={MissedList} />
                </Switch>
            </BrowserRouter>
            <BrowserRouter>
                <BottomNavigation
                    value={currentMobileTab}
                    onChange={handleMobileTabs}
                    className="bottom-navigation-bar"
                >
                    <BottomNavigationAction
                        label="Active"
                        value="active"
                        icon={<HomeIcon />}
                        component={Link}
                        to={pathMap[0]}
                    />
                    <BottomNavigationAction
                        label="Completed"
                        value="completed"
                        icon={<CheckCircleOutlineOutlinedIcon />}
                        component={Link}
                        to={pathMap[1]}
                    />
                    <BottomNavigationAction
                        label="Missed"
                        value="missed"
                        icon={<BlockOutlinedIcon />}
                        component={Link}
                        to={pathMap[2]}
                    />

                    <Switch>
                        <Route exact path={pathMap[0]} component={ActiveList} />
                        <Route path={pathMap[1]} component={CompletedList} />
                        <Route path={pathMap[2]} component={MissedList} />
                    </Switch>
                </BottomNavigation>
            </BrowserRouter>
        </>
    );
}
