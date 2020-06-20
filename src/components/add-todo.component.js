import React, { Component } from "react";
import Popup from "reactjs-popup";
import TodoList from "./list-item.component";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { set, get } from "idb-keyval";

export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchData: false,
            date: new Date(),
            items: [],
            currentItem: {
                text: "",
                key: "",
                deadline: "",
                completed: false,
                active: true,
                missed: false,
            },
        };

        this.handleDate = this.handleDate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        this.setState({ date: new Date() });

        get("todo").then((res) => {
            console.log(res);
            this.setState({ items: res });
            console.log(this.state.items);
            this.setState({ fetchData: true });
        });
        console.log(this.state.items);
    }
    componentDidUpdate() {
        const items = this.state.items;

        if (this.state.fetchData === true) {
            set("todo", items);
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
