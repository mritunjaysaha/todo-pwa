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
                    <button className="todo-btn">
                        <AddIcon />

                        <p>Todo</p>
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
                                    name="date"
                                    value={props.date}
                                    onChange={(e) => {
                                        props.handleDate(e);
                                    }}
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                        <input
                            name="text"
                            className="popup popup-input"
                            type="text"
                            onChange={(e) => props.handleInput(e)}
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
