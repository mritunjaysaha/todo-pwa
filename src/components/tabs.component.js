import React, { useState, useEffect } from "react";
import { set, get } from "idb-keyval";
import SimpleTabs from "./simple-tab.component";
import AddTodo from "./popupbutton.component";
import "../styles/main.css";

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
