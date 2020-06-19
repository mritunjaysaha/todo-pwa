import React from "react";
import AddTodo from "./components/add-todo.component";
function App() {
    return (
        <>
            <h3>Todo</h3>
            <p>Active | Completed | Missed</p>
            <AddTodo />
            <hr />
        </>
    );
}

export default App;
