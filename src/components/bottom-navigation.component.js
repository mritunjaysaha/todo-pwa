import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

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
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                label="Completed"
                value="completed"
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                label="Missed"
                value="missed"
                icon={<RestoreIcon />}
            />
        </BottomNavigation>
    );
}
