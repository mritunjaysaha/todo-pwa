import React from "react";
import Counter from "./counter.component";

export default function TodoList(props) {
    const todos = props.list;

    const todoItems = todos.map((todo) => {
        console.log(todo);
        return (
            <div>
                {todo.completed === false ? (
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
                        </span>
                    </p>
                ) : null}
            </div>
        );
    });

    return <>{todoItems}</>;
}
