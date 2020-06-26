import React from "react";
import Counter from "./counter.component";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
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
                            <Counter
                                date={todo.deadline}
                                status={listFor}
                                items={todo}
                                fullList={todos}
                            />
                            <button onClick={() => props.deleteItem(todo.key)}>
                                <DeleteOutlineOutlinedIcon />
                            </button>
                            {props.listFor === "active" ? (
                                <>
                                    <button
                                        onClick={() =>
                                            props.completeTodo(todo.key)
                                        }
                                    >
                                        <CheckCircleOutlineOutlinedIcon />
                                    </button>
                                </>
                            ) : null}
                        </span>
                    </p>
                ) : null}
            </div>
        );
    });

    return <>{todoItems}</>;
}
