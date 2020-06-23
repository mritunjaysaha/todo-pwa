import React from "react";
import AddTodo from "./add-todo.component";

export default function Todo() {
    return (
        <>
            <h1>Todo</h1>
            <AddTodo />
            <hr />
            <h1>Completed</h1>
        </>
    );
}
