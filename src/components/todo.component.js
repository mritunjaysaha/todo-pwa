import React, { useState, Component } from "react";
import AddTodo from "./add-todo.component";

export default function Todo() {
    const [date, setDate] = useState({ date: Date.now() });

    function onChange(date) {
        setDate({ date });
    }

    return (
        <>
            <h1>Todo</h1>
            <AddTodo />
            <hr />
            <h1>Completed</h1>
        </>
    );
}

// export default class Todo extends Component {
//     state = {
//         date: new Date(),
//         time: "10:00",
//     };

//     onChange = (date) => {
//         console.log("date: ", date);
//         this.setState({ date });
//     };

//     onChangeTime = (time) => {
//         console.log("time: ", time);
//         this.setState({ time });
//     };

//     render() {
//         return (
//             <div>
//                 <DateTimePicker
//                     onChange={this.onChange}
//                     value={this.state.date}
//                 />
//                 <TimePicker
//                     onChange={this.onChangeTime}
//                     value={this.state.time}
//                 />
//             </div>
//         );
//     }
// }
