import React, { useState, useEffect } from "react";
import { set, get } from "idb-keyval";
import SimpleTabs from "./simple-tab.component";
import AddTodo from "./popupbutton.component";
import CreateTodoList from "./list-item.component";
import "../styles/main.css";

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
                    console.log(val);
                    setItems(val);

                    val.map((v) => {
                        if (v.status === "active") {
                            active.push(v);
                        } else if (v.status === "completed") {
                            completed.push(v);
                        } else {
                            missed.push(v);
                        }
                    });
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
        }
    }
    function handleDelete(id, status) {
        console.log(id);
        console.log("items1", items);
        const filteredItems = items.filter((todo) => todo.id !== id);
        console.log("filtered", filteredItems);
        console.log("items2", items);
        setItems(filteredItems);

        if (status === "active") {
            const filteredItems = activeTodo.filter((todo) => todo.id !== id);
            setActiveTodo(filteredItems);
        } else if (status === "completed") {
            const filteredItems = completedTodo.filter(
                (todo) => todo.id !== id
            );
            setActiveTodo(filteredItems);
        } else {
            const filteredItems = missedTodo.filter((todo) => todo.id !== id);
            setActiveTodo(filteredItems);
        }
        console.log("items3", items);
        set("todo", filteredItems);
    }
    function handleCompleted(id) {
        items.map((i) => {
            if (i.id === id) {
                i.status = "completed";
            }
        });

        const filteredActiveTodo = activeTodo.filter((todo) => todo.id !== id);
        setActiveTodo(filteredActiveTodo);
        set("todo", items);
    }

    function ActiveTodosList() {
        return (
            <CreateTodoList
                list={activeTodo}
                onClickComplete={handleCompleted}
                onClickDelete={handleDelete}
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
            <SimpleTabs
                activelist={ActiveTodosList}
                completedlist={CompletedTodosList}
                missedlist={MissedTodosList}
            />
        </>
    );
}
