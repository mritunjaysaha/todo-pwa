import React from "react";
import AddTodo from "./components/add-todo.component";
import BasicDateTimePicker from "./components/date-time-picker.component";
function App() {
    const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
    const handleDateChange = (date) => {
        setDate(date);
    };
    return (
        <>
            {/* <h3>Todo | Completed</h3>
            <AddTodo />
            <hr /> */}
            <BasicDateTimePicker />
        </>
    );
}

export default App;
