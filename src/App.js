import React from "react";
import CenteredTabs from "./components/tabs.component";
import "antd/dist/antd.css";
function App() {
    return (
        <>
            <nav>
                {" "}
                <h3 className="logo">Todo</h3>
            </nav>
            <CenteredTabs />
        </>
    );
}

export default App;
