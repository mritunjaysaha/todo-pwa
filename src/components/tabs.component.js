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
                    console.log("val", val);
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

    // function handleMissed(id) {
    //     console.log("missed");
    //     items.map((i) => {
    //         if (i.id === id) {
    //             i.status = "missed";
    //         }
    //     });

    //     const filteredMissedTodo = missedTodo.filter((todo) => todo.id !== id);
    //     setMissedTodo(filteredMissedTodo);

    //     set("todo", items);
    // }

    function ActiveTodosList() {
        console.log("active");
        console.log(activeTodo);
        activeTodo.map((todo) => console.log("todo", todo));

        return (
            <CreateTodoList
                list={activeTodo}
                onClickComplete={handleCompleted}
            />
        );
    }

    function CompletedTodosList() {
        console.log("completed");
        console.log(completedTodo);

        return (
            <CreateTodoList
                list={completedTodo}
                onClickComplete={handleCompleted}
            />
        );
    }

    function MissedTodosList() {
        console.log("missed");
        console.log(missedTodo);
        missedTodo.map((todo) => console.log("todo", todo));

        return (
            <CreateTodoList
                list={missedTodo}
                onClickComplete={handleCompleted}
            />
        );
    }

    function deleteTodo() {}
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
