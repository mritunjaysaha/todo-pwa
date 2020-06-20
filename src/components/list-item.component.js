import React from "react";
import Counter from "./counter.component";

export default function TodoList(props) {
    const todos = props.list;
    console.log("todos", todos);
    if (todos.length > 0) {
        todos.map((todo) => console.log(todo));
    }
    const todoItems = todos.map((todo) => {
        return (
            <div>
                <p>
                    Task: {todo.text}
                    <span>
                        <p>Deadline: {todo.deadline.toLocaleString()}</p>
                        <Counter date={todo.deadline} />
                        <button onClick={() => props.deleteItem(todo.key)}>
                            DEL
                        </button>
                        <button>Completed</button>
                    </span>
                </p>
            </div>
        );
    });

    return (
        <>
            {/* <p>Hello, World!</p> */}
            {todoItems}
        </>
    );
}
