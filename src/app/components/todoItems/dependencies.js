import React from "react";
import {Button, Icon, Message, Table} from "semantic-ui-react";
import {formatDate} from "../../utils";
import {TodoItemAddDependencyModal} from "../../components";
import {data} from "../../data";
import _ from "lodash";

export class TodoItemDependencies extends React.Component {

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.renderList = this.renderList.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.state = {
            addModalIsOpen: false,
            dependencyOptions: []
        };
    }

    componentDidMount() {
        this.getDependencyOptions();
    }

    remove(dependency) {

        const {todoItem} = this.props;
        data.removeDependency(todoItem.id, dependency.id).then(
            todoItem => {
                this.props.refresh(todoItem);
                let dependencyOptions = _.cloneDeep(this.state.dependencyOptions);
                dependencyOptions.push(dependency);
                this.setState({dependencyOptions});
            },
            error => {}
        );
    }

    add(dependency) {

        const {todoItem} = this.props;
        data.addDependency(todoItem.id, dependency.id).then(
            todoItem => {
                this.closeAddModal();
                this.props.refresh(todoItem);
                let dependencyOptions = _.cloneDeep(this.state.dependencyOptions);
                dependencyOptions = dependencyOptions.filter(i => i.id !== dependency.id);
                console.log("dep options", dependencyOptions);
                this.setState({dependencyOptions});
            },
            error => {}
        );
    }

    openAddModal() {

        this.setState({addModalIsOpen: true});
    }

    closeAddModal() {

        this.setState({addModalIsOpen: false});
    }

    getDependencyOptions() {

        const {todoItem} = this.props;
        data.listTodoItems({todoListId: todoItem.todoListId}).then(
            dependencyOptions => {
                let filtered = dependencyOptions.filter(i => i.id !== todoItem.id);
                filtered = filtered.filter(i => !todoItem.dependencies.includes(i));
                this.setState({dependencyOptions: filtered});
            }, error => {

            }
        );
    }

    renderList() {

        const {todoItem} = this.props;
        const {dependencies} = todoItem;

        if (!dependencies) {
            return null;
        } else if (!dependencies.length) {
            return (
                <Message>
                    <Icon name="warning" color="red"/>
                    No dependency...
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
                        dependencies.map(dependency => (
                            <Table.Row key={dependency.id}
                                       negative={!dependency.completed}>
                                <Table.Cell collapsing textAlign="center">
                                    {
                                        dependency.completed
                                            ? <Icon name="checkmark" color="green"/>
                                            : <Icon name="hourglass half" color="blue"/>
                                    }
                                </Table.Cell>
                                <Table.Cell>{dependency.name}</Table.Cell>
                                <Table.Cell>{dependency.deadline ? formatDate(dependency.deadline) : ""}</Table.Cell>
                                <Table.Cell>{dependency.createdAt ? formatDate(dependency.createdAt): ""}</Table.Cell>
                                <Table.Cell collapsing singleLine>
                                    <Button negative
                                            size="tiny"
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.remove(dependency);
                                            }}>
                                        <Icon name="remove"/>
                                        Remove
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

        const {addModalIsOpen, dependencyOptions} = this.state;
        const {todoItem} = this.props;

        return (
            <React.Fragment>
                <Button size="small" positive
                        onClick={this.openAddModal}>
                    <Icon name="plus"/>
                    Add New Dependency
                </Button>
                {this.renderList()}
                {
                    addModalIsOpen && todoItem &&
                    <TodoItemAddDependencyModal open={addModalIsOpen}
                                                todoItem={todoItem}
                                                dependencyOptions={dependencyOptions}
                                                onAdd={this.add}
                                                onClose={this.closeAddModal}/>
                }
            </React.Fragment>
        )
    }
}