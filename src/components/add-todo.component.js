import React, { Component, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import TodoList from "./list-item.component";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { set, get } from "idb-keyval";
import { da } from "date-fns/locale";

export default function AddTodo() {
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
        const newItem = currentItem;
        if (newItem.text !== "") {
            const data = [...items, newItem];
            setItems(data);

            const currentDate = new Date();

            if (currentDate > date) {
                alert("Select a valid date");
                return;
            }
        }
    }

    function deleteTodo(key) {
        const filteredItems = items.filter((item) => item.key !== key);
        setItems(filteredItems);
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

            {items.length > 0 ? (
                <TodoList list={items} deleteItem={deleteTodo} />
            ) : (
                <p>Add Todo</p>
            )}
        </>
    );
}
