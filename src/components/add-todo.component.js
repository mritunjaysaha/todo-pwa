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
                deadline: "",
            },
        };

        this.handleDate = this.handleDate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        this.setState({ date: new Date() });

        console.log("getItem(): ", JSON.parse(localStorage.getItem("todo")));

        const storage = JSON.parse(localStorage.getItem("todo"));
        if (storage !== null) {
            console.log("storage:", storage);
            console.log("storage:", storage[0]);
            this.setState({ items: storage[0] });
            console.log("item updated: ", this.state.items);
        }
    }
    componentDidUpdate() {
        if (this.state.items.length > 0) {
            console.log("items: ", this.state.items);
            localStorage.setItem("todo", JSON.stringify(this.state.items));
        }
    }
    handleInput(e) {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: new Date(),
                deadline: this.state.date,
            },
        });
    }
    handleDate(date) {
        const currentDate = new Date();
        if (currentDate > date) {
            alert("Select a valid date");
            this.setState({ date: new Date() });
            return;
        }
        this.setState({
            date,
            currentItem: { deadline: date },
        });
    }
    addTodo(e) {
        e.preventDefault();
        this.setState({
            currentItem: {
                text: this.state.currentItem.text,
                key: new Date(),
                deadline: this.state.date,
            },
        });
        const newItem = this.state.currentItem;
        if (newItem.text !== "") {
            const items = [...this.state.items, newItem];
            const currentDate = new Date();
            if (currentDate > this.state.date) {
                alert("Select a valid date");
                this.setState({ date: new Date() });
                return;
            }
            this.setState({
                items: items,
                currentItem: { text: "", key: "" },
            });

            if (this.state.items.length > 0) {
                console.log("items: ", this.state.items);
            }
            // localStorage.setItem("todo", this.state.items);
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
