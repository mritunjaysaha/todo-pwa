import React, { useState, useEffect } from "react";
import { set, get } from "idb-keyval";
import AddTodo from "./popupbutton.component";
import CreateTodoList from "./list-item.component";
import AntdTab from "./ant-tabs.component";

import "../styles/main.css";
import "date-fns/locale";

export default function CenteredTabs() {
    const [date, setDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [text, setText] = useState();
    const currentItem = {};

    const [activeTodo, setActiveTodo] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const [missedTodo, setMissedTodo] = useState([]);

    useEffect(function () {
        async function getData() {
            const active = [],
                completed = [],
                missed = [];
            await get("todo").then((val) => {
                if (val != null) {
                    setItems(val);

                    for (let i = 0; i < val.length; i++) {
                        if (val[i].status === "active") {
                            active.push(val[i]);
                        } else if (val[i].status === "completed") {
                            completed.push(val[i]);
                        } else if (val[i].status === "missed") {
                            missed.push(val[i]);
                        }
                    }
                }
                setActiveTodo(active);
                setCompletedTodo(completed);
                setMissedTodo(missed);
            });
        }

        getData();
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
            const activedata = [...activeTodo, newItem];
            setActiveTodo(activedata);
        }
    }
    function handleDelete(id, status) {
        const filteredItems = items.filter((todo) => todo.id !== id);
        setItems(filteredItems);

        if (status === "active") {
            const filteredItems = activeTodo.filter((todo) => todo.id !== id);
            setActiveTodo(filteredItems);
        } else if (status === "completed") {
            const filteredItems = completedTodo.filter(
                (todo) => todo.id !== id
            );
            setCompletedTodo(filteredItems);
        } else {
            const filteredItems = missedTodo.filter((todo) => todo.id !== id);
            setMissedTodo(filteredItems);
        }
        set("todo", filteredItems);
    }
    function handleCompleted(id) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items[i].status = "completed";
                const data = [...completedTodo, items[i]];
                setCompletedTodo(data);
            }
        }

        const filteredActiveTodo = activeTodo.filter((todo) => todo.id !== id);
        setActiveTodo(filteredActiveTodo);
        set("todo", items);
    }
    function handleMissed(id) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items[i].status = "missed";
                const data = [...completedTodo, items[i]];
                setCompletedTodo(data);
            }
        }
        set("todo", items);
    }
    function ActiveTodosList() {
        return (
            <CreateTodoList
                list={activeTodo}
                onClickComplete={handleCompleted}
                onClickDelete={handleDelete}
                handleMissed={handleMissed}
            />
        );
    }

    function CompletedTodosList() {
        return (
            <CreateTodoList
                list={completedTodo}
                onClickComplete={handleCompleted}
                onClickDelete={handleDelete}
            />
        );
    }

    function MissedTodosList() {
        return (
            <CreateTodoList
                list={missedTodo}
                onClickComplete={handleCompleted}
                onClickDelete={handleDelete}
            />
        );
    }

    return (
        <>
            <AddTodo
                date={date}
                handleDate={handleDate}
                handleInput={handleInput}
                addTask={addTask}
            />

            <AntdTab
                activelist={ActiveTodosList}
                completedlist={CompletedTodosList}
                missedlist={MissedTodosList}
            />
        </>
    );
}
