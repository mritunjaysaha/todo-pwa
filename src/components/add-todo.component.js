import React, { Component } from "react";
import Popup from "reactjs-popup";
import TodoList from "./list-item.component";
// import DateTimePicker from "react-datetime-picker";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            items: [],
            currentItem: {
                text: "",
                key: "",
                date: "",
            },
        };

        this.handleDate = this.handleDate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        this.setState({ date: new Date() });
    }
    handleInput(e) {
        e.preventDefault();
        this.setState({
            currentItem: {
                text: e.target.value,
                key: new Date(),
                date: this.state.date,
            },
        });
    }
    handleDate(date) {
        this.setState({
            date,
        });
    }
    addTodo(e) {
        e.preventDefault();
        this.setState({
            currentItem: {
                text: this.state.currentItem.text,
                key: new Date(),
                date: this.state.date,
            },
        });
        const newItem = this.state.currentItem;
        if (newItem.text !== "") {
            const items = [...this.state.items, newItem];
            console.log("newItem: ", newItem);
            console.log("items: ", items);
            console.log("this.state.items: ", this.state.items);

            // setItem(items);
            this.setState({
                items: items,
                currentItem: { text: "", key: "" },
            });
        }
    }

    deleteTodo(key) {
        const filteredList = this.state.items.filter(
            (item) => item.key !== key
        );
        this.setState({ items: filteredList });
    }

    render() {
        return (
            <>
                <Popup trigger={<button>CREATE TODO</button>} modal>
                    {(close) => (
                        <>
                            {/* <DateTimePicker
                                onChange={this.handleDate}
                                value={this.state.date}
                            /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    value={this.state.date}
                                    onChange={this.handleDate}
                                />
                            </MuiPickersUtilsProvider>
                            <input type="text" onChange={this.handleInput} />

                            <button onClick={this.addTodo}>Add</button>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </>
                    )}
                </Popup>

                <TodoList
                    list={this.state.items}
                    deleteItem={this.deleteTodo}
                />
            </>
        );
    }
}
