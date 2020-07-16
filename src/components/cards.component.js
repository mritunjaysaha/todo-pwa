import React from "react";
import Counter from "./counter.component";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

export default function Cards(props) {
    return (
        <div className="cards" id={props.id}>
            <p>{props.text || "todo"}</p>
            <p>{String(props.deadline).slice(0, 21)}</p>
            {console.log("cards", String(props.deadline).slice(0, 21))}
            <Counter
                id={props.id}
                date={props.deadline}
                status={props.status}
                handleMissed={props.handleMissed}
            />
            <div className="cards-button-container">
                <button className="cards-button">
                    <DeleteOutlineOutlinedIcon fontSize="large" />
                </button>
                {props.status === "active" ? (
                    <button className="cards-button">
                        <CheckCircleOutlineOutlinedIcon
                            onClick={() => {
                                props.onClickComplete(props.id);
                            }}
                            fontSize="large"
                        />
                    </button>
                ) : null}
            </div>
        </div>
    );
}
