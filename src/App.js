import React from "react";
import AddTodo from "./components/add-todo.component";
import CenteredTabs from "./components/tabs.component";
function App() {
    return (
        <>
            <h3>Todo</h3>
            {/* <p>Active | Completed | Missed</p> */}
            <CenteredTabs />
            <AddTodo />
            <hr />
        </>
    );
}

export default App;
