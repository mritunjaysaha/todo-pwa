import React, { useState, useEffect } from "react";
import { set, get } from "idb-keyval";
import Popup from "reactjs-popup";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import "../styles/main.css";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import SimpleTabs from "./simple-tab.component";

const contentStyle = {
    display: "flex",
    background: "rgba(0,0,0,0.4)",
    "flex-direction": "column",
    padding: "2em 2em 0 2em",
    "align-items": "center",
};

const overlayStyle = {
    background: "rgba(0,0,0,0.4)",
};
const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: { 500: "#8dceee" },
    },
});

export default function CenteredTabs() {
    const [date, setDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        text: "",
        key: "",
        deadline: "",
        status: "",
    });

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
        });
    }

    function handleDate(date) {
        setDate(date);
        setCurrentItem({
            text: currentItem.text ? currentItem.text : "",
            key: currentItem.key ? currentItem.key : "",
        });
    }

    function addTask() {
        setCurrentItem({
            text: currentItem.text,
            key: new Date(),
            deadline: date,
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

    return (
        <>
            <Popup
                trigger={
                    <button className="container-todo">
                        <AddIcon className="createTodoButton" />
                        <p className="createTodo-p">Create Todo</p>
                    </button>
                }
                modal
                overlayStyle={overlayStyle}
                contentStyle={contentStyle}
                className="popup-container"
            >
                {(close) => (
                    <>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <DateTimePicker
                                    value={date}
                                    onChange={handleDate}
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                        <input
                            className="popup popup-input"
                            type="text"
                            onChange={handleInput}
                            placeholder="Enter name"
                        />

                        <button
                            className="popup popup-add-btn"
                            onClick={addTask}
                        >
                            Add
                        </button>
                        <button className="popup-close" onClick={close}>
                            &times;
                        </button>
                    </>
                )}
            </Popup>

            <SimpleTabs />
        </>
    );
}
