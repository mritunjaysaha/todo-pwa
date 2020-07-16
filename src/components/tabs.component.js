import React, { useState, useEffect } from "react";
import { set, get } from "idb-keyval";
import SimpleTabs from "./simple-tab.component";
import AddTodo from "./popupbutton.component";
import "../styles/main.css";

export default function CenteredTabs() {
    const [date, setDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [text, setText] = useState();

    const currentItem = {};

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
        setText(e.target.value);
    }

    function handleDate(date) {
        setDate(date);
    }

    function addTask() {
        currentItem.text = text;
        currentItem.deadline = date;
        currentItem.id = Date.now();
        currentItem.status = "active";
        setTimeout(function () {
            console.log({ currentItem });
        }, 0);

        const currentDate = new Date();
        setDate(new Date());
        if (currentDate > date) {
            alert("Select a valid date");
            return;
        }
        console.log({ currentItem });
        const newItem = currentItem;
        if (newItem.text !== "") {
            const data = [...items, newItem];
            setItems(data);
            set("todo", data);
        }
        console.log({ items });
    }

    function markTodoCompleted() {}

    function markTodoMissed() {}

    function ActiveTodos() {}

    function CompletedTodos() {}

    function MissedTodos() {}

    function deleteTodo() {}
    return (
        <>
            <AddTodo
                date={date}
                handleDate={handleDate}
                handleInput={handleInput}
                addTask={addTask}
            />
            <SimpleTabs />
        </>
    );
}
