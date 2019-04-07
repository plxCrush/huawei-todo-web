import React from "react";
import {Breadcrumb, Container, Header, Segment} from "semantic-ui-react";
import {TodoItemSearch} from "../../components";
import {data} from "../../data";
import {withRouter} from "react-router";

class TodoItems extends React.Component {

    state = {};

    componentDidMount() {

        const {id} = this.props.match.params;
        data.getTodoList(id).then(
            todoList => this.setState({todoList}),
            error => {
                console.log("error", error);
            }
        )
    }

    goToLists = () => this.props.history.push("/todoLists");

    render() {

        const {id} = this.props.match.params;
        const {todoList} = this.state;
        return (
            <Container>
                <Header attached="top">
                    <Breadcrumb>
                        <Breadcrumb.Section link onClick={this.goToLists}>To-Do Lists</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right angle' />
                        {
                            todoList &&
                            <Breadcrumb.Section>{todoList.name}</Breadcrumb.Section>
                        }
                    </Breadcrumb>
                </Header>
                <Segment attached>
                    <TodoItemSearch todoListId={id}/>
                </Segment>
            </Container>
        )
    }
}

export default withRouter(TodoItems);