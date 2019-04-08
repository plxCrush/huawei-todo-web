import React from "react";
import {Button, Icon, Message, Modal, Table} from "semantic-ui-react";
import {formatDate} from "../../utils";

export class TodoItemAddDependencyModal extends React.Component {

    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.close = this.close.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    close() {

        this.props.onClose();
    };

    add(todoItem) {

        this.props.onAdd(todoItem);
    }

    renderList() {

        const {dependencyOptions} = this.props;

        if (!dependencyOptions) {
            return null;
        } else if (!dependencyOptions.length) {
            return (
                <Message>
                    <Icon name="warning" color="red"/>
                    No to-do items to add...
                </Message>
            );
        }

        return (
            <Table celled>
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
                        dependencyOptions.map(todoItem => (
                            <Table.Row key={todoItem.id}
                                       negative={!todoItem.completed}>
                                <Table.Cell collapsing textAlign="center">
                                    {
                                        todoItem.completed
                                            ? <Icon name="checkmark" color="green"/>
                                            : <Icon name="hourglass half" color="blue"/>
                                    }
                                </Table.Cell>
                                <Table.Cell>{todoItem.name}</Table.Cell>
                                <Table.Cell>{todoItem.deadline ? formatDate(todoItem.deadline) : ""}</Table.Cell>
                                <Table.Cell>{todoItem.createdAt ? formatDate(todoItem.createdAt): ""}</Table.Cell>
                                <Table.Cell collapsing singleLine>
                                    <Button primary
                                            size="tiny"
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.add(todoItem);
                                            }}>
                                        <Icon name="plus"/>
                                        Add
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }

    render() {

        return (
            <Modal open={true}
                   closeOnDimmerClick={false}
                   onClose={this.close}>
                <Modal.Header>Add Dependency</Modal.Header>
                <Modal.Content>
                    {this.renderList()}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}