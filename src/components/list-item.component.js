import React from "react";
import Counter from "./counter.component";

export default function TodoList(props) {
    const todos = props.list;
    // console.log("todos: ", todos);

    const todoItems = todos.map((todo) => {
        console.log("date: ", todo.date);
        return (
            <div>
                <p>
                    Task: {todo.text}
                    <span>
                        <p>Deadline: {todo.date.toLocaleString()}</p>
                        <Counter date={todo.date} />
                        <button onClick={() => props.deleteItem(todo.key)}>
                            DEL
                        </button>
                        <button>Completed</button>
                    </span>
                </p>
            </div>
        );
    });

    return <>{todoItems}</>;
}
