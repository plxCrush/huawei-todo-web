import React from "react";
import {withRouter} from "react-router-dom";
import {Button, Grid, Icon, Modal} from "semantic-ui-react";
import {TodoListForm} from "../../components";
import {data} from "../../data";
import {toast} from "react-toastify";
import _ from "lodash";

class _TodoListModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.goToItems = this.goToItems.bind(this);
    }

    state = {
        todoList: _.cloneDeep(this.props.todoList) || {}
    };

    handleChange(event, target) {

        let {todoList} = this.state;
        if (target.type === "checkbox") {
            todoList[target.name] = target.checked;
        } else if (target.name === "medium") {
            todoList.medium = target.value;
            todoList.mediumId = target.value ? target.value.id : null;
        } else {
            todoList[target.name] = target.value;
        }
        this.setState({todoList});
    };

    save() {

        const {todoList} = this.state;
        const saveOp = todoList.id
            ? data.updateTodoList(todoList.id, todoList)
            : data.createTodoList(todoList);

        this.setState({refreshParent: true, loading: true});
        saveOp.then(
            todoList => {
                toast.success("List saved..");
                this.setState({todoList, loading: false}, () => this.close());
            },
            error => {
                console.log("TodoList save error", error);
                this.setState({loading: false});
            }
        );
    };

    close() {

        this.props.onClose && this.props.onClose(this.state.refreshParent);
    };

    goToItems() {

        const {todoList} = this.state;
        console.log("todo list", todoList);
        this.props.history.push(`/todoLists/${todoList.id}/items`);
    }

    render() {

        const {todoList, loading} = this.state;
        return (
            <Modal open={true}
                   closeOnDimmerClick={false}
                   onClose={this.close}>
                <Modal.Header>{todoList.id ? "Edit List" : "New List"}</Modal.Header>
                <Modal.Content>
                    <TodoListForm todoList={todoList}
                                  loading={loading}
                                  onChange={this.handleChange}/>
                </Modal.Content>
                <Modal.Actions>
                    <Grid columns={2}>
                        <Grid.Column align="left">
                            <Button positive
                                    disabled={loading}
                                    onClick={this.goToItems}>
                                View Items
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

export const TodoListModal = withRouter(_TodoListModal);