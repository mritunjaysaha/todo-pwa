import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HomeIcon from "@material-ui/icons/Home";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState("recents");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className="bottom-navigation-bar"
        >
            <BottomNavigationAction
                label="Active"
                value="active"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Completed"
                value="completed"
                icon={<CheckCircleOutlineOutlinedIcon />}
            />
            <BottomNavigationAction
                label="Missed"
                value="missed"
                icon={<BlockOutlinedIcon />}
            />
        </BottomNavigation>
    );
}
