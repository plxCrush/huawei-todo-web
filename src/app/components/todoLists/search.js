import React from "react";
import {Confirm} from "semantic-ui-react";
import {TodoListFilter, TodoListList, TodoListModal} from "../../components";
import {data} from "../../data";
import {toast} from "react-toastify";

export class TodoListSearch extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.delete = this.delete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.state = {
            filter: {}
        }
    };

    search(filter = {}) {

        this.setState({loading: true});
        data.listTodoLists(filter).then(
            todoLists => {
                console.log("TodoLists", todoLists);
                this.setState({todoLists, loading: false});
            },
            error => {
                console.log(error);
                this.setState({loading: false})
            }
        );
    };

    delete(todoList) {

        this.setState({loading: true});
        data.deleteTodoList(todoList.id).then(
            () => {
                this.setState({loading: false});
                toast.success("List deleted.");
                this.closeDeleteModal(true);
            },
            error => {
                console.log("Delete error", error);
                this.setState({loading: false});
            }
        )
    };

    refresh() {

        this.search();
    };

    openEditModal(todoList) {

        this.setState({todoList, editModalIsOpen: true});
    };

    closeEditModal(refresh) {

        this.setState({todoList: undefined, editModalIsOpen: false});
        if (refresh) this.refresh();
    };

    openDeleteModal(todoList){

        this.setState({todoList, deleteModalIsOpen: true});
    };

    closeDeleteModal(refresh) {

        this.setState({todoList: undefined, deleteModalIsOpen: false});
        if (refresh) this.refresh();
    };

    componentDidMount() {

        this.search();
    }

    render() {

        const {todoLists, todoList, filter, paging, loading, editModalIsOpen, deleteModalIsOpen} = this.state;
        return (
            <div>
                <TodoListFilter filter={filter}
                              loading={loading}
                              onSearch={this.search}/>
                <TodoListList todoLists={todoLists}
                            paging={paging}
                            onCreate={() => this.openEditModal({})}
                            onSelect={this.openEditModal}
                            onDelete={this.openDeleteModal}/>
                {
                    editModalIsOpen && todoList &&
                    <TodoListModal open={editModalIsOpen}
                                 todoList={todoList}
                                 onClose={this.closeEditModal}/>
                }
                {
                    deleteModalIsOpen && todoList &&
                    <Confirm open={true}
                             size="mini"
                             closeOnDimmerClick={false}
                             header="Delete List"
                             content="Are you sure you want to delete the to-do list?"
                             confirmButton="Delete"
                             cancelButton="Cancel"
                             onCancel={() => this.closeDeleteModal(false)}
                             onConfirm={() => this.delete(todoList)}/>
                }
            </div>
        )
    }
}