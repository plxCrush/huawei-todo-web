import React from "react";
import {Container, Header, Segment} from "semantic-ui-react";
import {TodoListSearch} from "../../components";

class TodoLists extends React.Component {

    render() {
        return (
            <Container>
                <Header attached="top">To-Do Lists</Header>
                <Segment attached>
                   <TodoListSearch/>
                </Segment>
            </Container>
        );
    }
}

export default TodoLists;