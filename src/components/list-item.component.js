import React from "react";
import Cards from "./cards.component";
export default function CreateTodoList(props) {
    const list = props.list;
    console.log("handle", list);
    const todolist = list.map((todo) => (
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

    return <>{todolist}</>;
}
