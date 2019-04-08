import React from "react";
import {Form, Input, Label, TextArea} from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export class TodoItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(value, event) {

        this.props.onChange(event, {name: "deadline", value});
    }

    render() {

        const {todoItem, loading} = this.props;
        return (
            <Form loading={loading}>
                <Form.Field required>
                    <label>Name</label>
                    <Input autoFocus
                           name="name"
                           value={todoItem.name || ""}
                           onChange={this.props.onChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea autoHeight
                              name="description"
                              value={todoItem.description || ""}
                              onChange={this.props.onChange}/>
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Deadline</label>
                        <DatePicker selected={todoItem.deadline}
                                    dateFormat="dd/MM/YYYY"
                                    onChange={this.handleDateChange} dropdownMode={"scroll"}/>
                    </Form.Field>
                    {
                        todoItem.id &&
                        <Form.Field>
                            <label>Created At</label>
                            <DatePicker selected={todoItem.createdAt}
                                        dateFormat="dd/MM/YYYY"
                                        disabled={true}/>
                        </Form.Field>
                    }
                </Form.Group>
                {
                    todoItem.id &&
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>
                                Status
                            </label>
                            {
                                todoItem.completed &&
                                <Label color="green">
                                    Completed
                                </Label>
                            }
                            {
                                !todoItem.completed &&
                                <Label color="blue">
                                    Not Completed
                                </Label>
                            }
                            {
                                todoItem.expired &&
                                <Label color="red">
                                    Expired
                                </Label>
                            }
                        </Form.Field>
                    </Form.Group>
                }
            </Form>
        );
    }
}