import React from "react";
import {Button, Grid, Tab, Modal} from "semantic-ui-react";
import {TodoItemDependencies, TodoItemForm} from "../../components";
import {data} from "../../data";
import {toast} from "react-toastify";
import _ from "lodash";

export class TodoItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.refresh = this.refresh.bind(this);
        this.markAsCompleted = this.markAsCompleted.bind(this);
    }

    state = {
        todoItem: _.cloneDeep(this.props.todoItem) || {}
    };

    handleChange(event, target) {

        let {todoItem} = this.state;
        todoItem[target.name] = target.value;
        this.setState({todoItem});
    };

    save() {

        const {todoListId} = this.props;
        let {todoItem} = this.state;
        todoItem.todoListId = todoListId;
        const saveOp = todoItem.id
            ? data.updateTodoItem(todoItem.id, todoItem)
            : data.createTodoItem(todoItem);

        this.setState({refreshParent: true, loading: true});
        saveOp.then(
            todoItem => {
                toast.success("Item saved.");
                this.setState({todoItem, loading: false}, () => this.close());
            },
            error => this.setState({loading: false})
        );
    };

    close() {

        this.props.onClose && this.props.onClose(this.state.refreshParent);
    };

    markAsCompleted() {

        const {todoItem} = this.state;
        this.setState({refreshParent: true, loading: true});
        data.markAsCompleted(todoItem.id).then(
            todoItem => {
                this.setState({todoItem, loading: false});
                toast.success("Marked as completed.");
                this.props.onClose && this.props.onClose(this.state.refreshParent);
            },
            error => this.setState({loading: false})
        );
    }

    refresh(todoItem) {

        this.setState({todoItem, refreshParent: true});
    }

    render() {

        const {todoItem, loading} = this.state;

        let panes = [
            {
                menuItem: "Details", render: () =>
                    <Tab.Pane>
                        <TodoItemForm todoItem={todoItem}
                                      loading={loading}
                                      onChange={this.handleChange}/>
                    </Tab.Pane>
            }
        ];

        if (todoItem && todoItem.id) {
            panes.push(
                {
                    menuItem: "Dependencies", render: () =>
                        <Tab.Pane>
                            <TodoItemDependencies todoItem={todoItem}
                                                  refresh={this.refresh}/>
                        </Tab.Pane>
                }
            );
        }

        return (
            <Modal open={true}
                   closeOnDimmerClick={false}
                   onClose={this.close}>
                <Modal.Header>{todoItem.id ? "Edit Item" : "New Item"}</Modal.Header>
                <Modal.Content>
                    {
                        <Tab panes={panes}/>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Grid columns={2}>
                        <Grid.Column align="left">
                            {
                                todoItem.id && !todoItem.completed &&
                                    <Button positive
                                            disabled={loading}
                                            onClick={this.markAsCompleted}>
                                        Mark As Completed
                                    </Button>
                            }
                        </Grid.Column>
                        <Grid.Column>
                            <Button disabled={loading}
                                    onClick={this.close}>
                                Close
                            </Button>
                            <Button primary
                                    disabled={loading}
                                    onClick={this.save}>
                                Save
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Modal.Actions>
            </Modal>
        )
    }
}