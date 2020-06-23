import React from "react";
import Counter from "./counter.component";

export default function TodoList(props) {
    const todos = props.list;
    const listFor = props.listFor;
    let condition;
    const todoItems = todos.map((todo) => {
        if (listFor === "active") {
            condition = todo.active === true;
        } else if (listFor === "completed") {
            condition = todo.completed === true;
        } else {
            condition = todo.missed === true;
        }
        console.log(todo);
        return (
            <div>
                {condition ? (
                    <p>
                        Task: {todo.text}
                        <span>
                            <p>Deadline: {todo.deadline.toLocaleString()}</p>
                            <Counter date={todo.deadline} />
                            <button onClick={() => props.deleteItem(todo.key)}>
                                DEL
                            </button>
                            <button
                                onClick={() => props.completeTodo(todo.key)}
                            >
                                Completed
                            </button>
                            <button onClick={() => props.missedTodo(todo.key)}>
                                Missed
                            </button>
                        </span>
                    </p>
                ) : null}
            </div>
        );
    });

    return <>{todoItems}</>;
}
