import React from "react";
import {Button, Icon, Message, Table} from "semantic-ui-react";

export class TodoListList extends React.Component {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    select(todoList) {

        this.props.onSelect(todoList);
    };

    delete(todoList) {
        this.props.onDelete(todoList);
    };

    renderList() {

        const {todoLists} = this.props;
        if (!todoLists) {
            return null;
        } else if (!todoLists.length) {
            return (
                <Message>
                    <Icon name="warning" color="red"/>
                    List not found...
                </Message>
            );
        }

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        todoLists.map(todoList => (
                            <Table.Row key={todoList.id}
                                       negative={!todoList.enabled}
                                       onClick={e => this.select(todoList)}>
                                <Table.Cell>{todoList.name}</Table.Cell>
                                <Table.Cell collapsing singleLine>
                                    <Button negative
                                            size="tiny"
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.delete(todoList);
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
                        Create New List
                    </Button>
                }
                {this.renderList()}
            </React.Fragment>
        )
    }
}