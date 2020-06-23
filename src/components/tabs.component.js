import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import TodoList from "./list-item.component";
import { set, get } from "idb-keyval";
import Popup from "reactjs-popup";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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
    const [active, setActive] = useState(true);
    const [missed, setMissed] = useState(false);
    const [completed, setCompleted] = useState(false);

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
        items.map((item) => {
            if (item.key === key) {
                item.completed = true;
                item.active = false;
            }
        });
        set("todo", items);
    }
    function missedTodo(key) {
        items.map((item) => {
            if (item.key === key) {
                item.completed = false;
                item.active = false;
                item.missed = true;
            }
        });
        set("todo", items);
    }

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function ActiveList(theme) {
        return (
            <Paper>
                <h3>Active</h3>
                {items.length > 0 ? (
                    <TodoList
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
                <h3>Completed</h3>
                {items.length > 0 ? (
                    <TodoList
                        list={items}
                        deleteItem={deleteTodo}
                        completeTodo={completeTodo}
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
                <h3>Missed</h3>
                {items.length > 0 ? (
                    <TodoList
                        list={items}
                        deleteItem={deleteTodo}
                        completeTodo={completeTodo}
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
            <Popup trigger={<button>CREATE TODO</button>} modal>
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
            <BrowserRouter>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Active" component={Link} to="/" />
                        <Tab
                            label="Completed"
                            component={Link}
                            to="/completed"
                        />
                        <Tab label="Missed" component={Link} to="/missed" />
                    </Tabs>
                </Paper>

                <Switch>
                    <Route exact path="/" component={ActiveList} />
                    <Route path="/completed" component={CompletedList} />
                    <Route path="/missed" component={MissedList} />
                </Switch>
            </BrowserRouter>
        </>
    );
}
