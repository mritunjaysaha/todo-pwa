import React from "react";

import { Tabs } from "antd";

const { TabPane } = Tabs;

export default function AntdTab(props) {
    return (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Active" key="1">
                {props.activelist()}
            </TabPane>
            <TabPane tab="Completed" key="2">
                {props.completedlist()}
            </TabPane>
            <TabPane tab="Missed" key="3">
                {props.missedlist()}
            </TabPane>
        </Tabs>
    );
}
