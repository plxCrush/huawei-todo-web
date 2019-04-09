import React from "react";
import {Confirm} from "semantic-ui-react";
import {TodoItemFilter, TodoItemList, TodoItemModal} from "../../components";
import {data} from "../../data";
import {toast} from "react-toastify";

export class TodoItemSearch extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.delete = this.delete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.state = {
            filter: {
                todoListId: this.props.todoListId,
                sortBy: "name",
                sortDirection: "ASC"
            }
        }
    };

    handleFilterChange(updatedFilter) {

        let {filter} = this.state;
        filter = {...filter, ...updatedFilter};
        this.setState({filter}, () => this.search());
    }

    search() {

        let {filter} = this.state;
        const {todoListId} = this.props;
        filter.todoListId = todoListId;
        this.setState({loading: true});
        data.listTodoItems(filter).then(
            todoItems => this.setState({todoItems, loading: false}),
            error => this.setState({loading: false})
        );
    };

    delete(todoItem) {

        this.setState({loading: true});
        data.deleteTodoItem(todoItem.id).then(
            () => {
                this.setState({loading: false});
                this.closeDeleteModal(true);
            },
            error => this.setState({loading: false})
        );
    };

    refresh() {

        this.search();
    };

    openEditModal(todoItem) {

        this.setState({todoItem, editModalIsOpen: true});
    };

    closeEditModal(refresh) {

        this.setState({todoItem: undefined, editModalIsOpen: false});
        if (refresh) this.refresh();
    };

    openDeleteModal(todoItem){

        this.setState({todoItem, deleteModalIsOpen: true});
    };

    closeDeleteModal(refresh) {

        this.setState({todoItem: undefined, deleteModalIsOpen: false});
        if (refresh) this.refresh();
    };

    componentDidMount() {

        this.search();
    }

    render() {

        const {todoItems, todoItem, filter, loading, editModalIsOpen, deleteModalIsOpen} = this.state;
        return (
            <div>
                <TodoItemFilter filter={filter}
                                onFilterChange={this.handleFilterChange}
                                loading={loading}
                                onSearch={this.search}/>
                <TodoItemList todoItems={todoItems}
                              filter={filter}
                              onSortChange={this.handleFilterChange}
                              onCreate={() => this.openEditModal({})}
                              onSelect={this.openEditModal}
                              onDelete={this.openDeleteModal}/>
                {
                    editModalIsOpen && todoItem &&
                    <TodoItemModal open={editModalIsOpen}
                                   todoItem={todoItem}
                                   todoListId={this.props.todoListId}
                                   onClose={this.closeEditModal}/>
                }
                {
                    deleteModalIsOpen && todoItem &&
                    <Confirm open={true}
                             size="mini"
                             closeOnDimmerClick={false}
                             header="Delete Item"
                             content="Are you sure you want to delete the to-do item?"
                             confirmButton="Delete"
                             cancelButton="Cancel"
                             onCancel={() => this.closeDeleteModal(false)}
                             onConfirm={() => this.delete(todoItem)}/>
                }
            </div>
        )
    }
}