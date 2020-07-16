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
            <Counter date={props.deadline} status={props.status} />
            <div className="cards-button-container">
                <button className="cards-button">
                    <DeleteOutlineOutlinedIcon fontSize="large" />
                </button>
                <button className="cards-button">
                    <CheckCircleOutlineOutlinedIcon
                        onClick={() => {
                            props.onClickComplete(props.id);
                        }}
                        fontSize="large"
                    />
                </button>
            </div>
        </div>
    );
}
