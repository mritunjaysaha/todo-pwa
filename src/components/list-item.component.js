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

        return (
            <>
                {condition ? (
                    <div className="cards">
                        <p>
                            Task: {todo.text}
                            <span>
                                <p>
                                    Deadline: {todo.deadline.toLocaleString()}
                                </p>
                                <Counter
                                    date={todo.deadline}
                                    status={listFor}
                                    items={todo}
                                    fullList={todos}
                                />
                                <div className="cards-button-container">
                                    <button className="cards-button">
                                        <DeleteOutlineOutlinedIcon
                                            onClick={() =>
                                                props.deleteItem(todo.key)
                                            }
                                            fontSize="large"
                                        />
                                    </button>

                                    {props.listFor === "active" ? (
                                        <>
                                            <button className="cards-button">
                                                <CheckCircleOutlineOutlinedIcon
                                                    onClick={() =>
                                                        props.completeTodo(
                                                            todo.key
                                                        )
                                                    }
                                                    fontSize="large"
                                                />
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                            </span>
                        </p>
                    </div>
                ) : null}
            </>
        );
    });

    return <>{todoItems}</>;
}
