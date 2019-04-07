import React from "react";
import {Button, Icon, Message, Table} from "semantic-ui-react";
import {formatDate} from "../../utils";

export class TodoItemList extends React.Component {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    select(todoItem) {

        this.props.onSelect(todoItem);
    };

    delete(todoItem) {

        this.props.onDelete(todoItem);
    };

    renderList() {

        const {todoItems} = this.props;
        if (!todoItems) {
            return null;
        } else if (!todoItems.length) {
            return (
                <Message>
                    <Icon name="warning" color="red"/>
                    Item not found...
                </Message>
            );
        }

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing>Completed</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Deadline</Table.HeaderCell>
                        <Table.HeaderCell>Created At</Table.HeaderCell>
                        <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        todoItems.map(todoItem => (
                            <Table.Row key={todoItem.id}
                                       negative={!todoItem.completed}
                                       onClick={e => this.select(todoItem)}>
                                <Table.Cell collapsing textAlign="center">
                                    {
                                        todoItem.completed
                                            ? <Icon name="checkmark" color="green"/>
                                            : <Icon name="remove" color="red"/>
                                    }
                                </Table.Cell>
                                <Table.Cell>{todoItem.name}</Table.Cell>
                                <Table.Cell>{todoItem.deadline ? formatDate(todoItem.deadline) : ""}</Table.Cell>
                                <Table.Cell>{todoItem.createdAt ? formatDate(todoItem.createdAt): ""}</Table.Cell>
                                <Table.Cell collapsing singleLine>
                                    <Button negative
                                            size="tiny"
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.delete(todoItem);
                                            }}>
                                        <Icon name="remove"/>
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        );
    };

    render() {
        return (
            <React.Fragment>
                {
                    this.props.onCreate &&
                    <Button size="small" positive
                            onClick={this.props.onCreate}>
                        <Icon name="plus"/>
                        Create New Item
                    </Button>
                }
                {this.renderList()}
            </React.Fragment>
        )
    }
}