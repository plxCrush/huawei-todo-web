import React from "react";
import {Button, Grid, Icon, Label, Modal} from "semantic-ui-react";
import {TodoItemForm} from "../../components";
import {data} from "../../data";
import {toast} from "react-toastify";
import _ from "lodash";

export class TodoItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
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
                toast.success("Item saved..");
                this.setState({todoItem, loading: false}, () => this.close());
            },
            error => {
                console.log("TodoItem save error", error);
                this.setState({loading: false});
            }
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
                toast.success("Marked as Completed.");
                this.props.onClose && this.props.onClose(this.state.refreshParent);
            },
            error => {
                this.setState({loading: false});
                console.log("error", error);
            }
        );
    }

    render() {

        const {todoItem, loading} = this.state;
        return (
            <Modal open={true}
                   closeOnDimmerClick={false}
                   onClose={this.close}>
                <Modal.Header>{todoItem.id ? "Edit Item" : "New Item"}</Modal.Header>
                <Modal.Content>
                    <TodoItemForm todoItem={todoItem}
                                  loading={loading}
                                  onChange={this.handleChange}/>
                </Modal.Content>
                <Modal.Actions>
                    <Grid columns={2}>
                        <Grid.Column align="left">
                            {
                                todoItem.completed
                                    ?
                                    <Label>
                                        Completed
                                        <Icon name="check"/>
                                    </Label>
                                    :
                                    <Button positive
                                            disabled={loading}
                                            onClick={this.markAsCompleted}>
                                        Mark As Completed
                                    </Button>
                            }
                            <Button primary
                                    disabled={loading}>
                                Dependencies
                                <Icon name="right chevron"/>
                            </Button>
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