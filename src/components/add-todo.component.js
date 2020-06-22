import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import TodoList from "./list-item.component";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { set, get } from "idb-keyval";
import "date-fns/locale";

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
        items.map((item) =>
            item.key === key
                ? (item.completed = true)
                : (item.completed = false)
        );
        set("todo", items);
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
                <TodoList
                    list={items}
                    deleteItem={deleteTodo}
                    completeTodo={completeTodo}
                />
            ) : (
                <p>Add Todo</p>
            )}
        </>
    );
}
