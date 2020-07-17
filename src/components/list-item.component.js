import React from "react";
import Cards from "./cards.component";
export default function CreateTodoList(props) {
    const list = props.list;
    console.log("handle", list);
    let todolist;

    if (props.empty === true) {
        if (props.listfor === "active") {
            todolist = (
                <div className="cards-container">
                    <p>No todos pending</p>
                    <div className="empty-active-todo"></div>
                </div>
            );
        }
        if (props.listfor === "completed") {
            todolist = (
                <div className="cards-container">
                    <p>No completed todos</p>
                    <div className="empty-completed-todo"></div>
                </div>
            );
        }
        if (props.listfor === "missed") {
            todolist = (
                <div className="cards-container">
                    <p>No missed todos</p>
                    <div className="empty-missed-todo"></div>
                </div>
            );
        }
    } else {
        todolist = list.map((todo) => (
            <div className="cards-container">
                <Cards
                    status={todo.status}
                    id={todo.id}
                    text={todo.text}
                    deadline={todo.deadline}
                    onClickComplete={props.onClickComplete}
                    onDelete={props.onClickDelete}
                    handleMissed={props.handleMissed}
                />
            </div>
        ));
    }

    return <>{todolist}</>;
}
