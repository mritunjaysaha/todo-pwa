import React from "react";
import { createMuiTheme } from "@material-ui/core";
import Popup from "reactjs-popup";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import { ThemeProvider } from "@material-ui/styles";

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

export default function AddTodo(props) {
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
                                    value={props.date}
                                    onChange={() => {
                                        props.handleDate();
                                    }}
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                        <input
                            className="popup popup-input"
                            type="text"
                            onChange={() => props.handleInput()}
                            placeholder="Enter name"
                        />

                        <button
                            className="popup popup-add-btn"
                            onClick={props.addTask}
                        >
                            Add
                        </button>
                        <button className="popup-close" onClick={close}>
                            &times;
                        </button>
                    </>
                )}
            </Popup>
        </>
    );
}
