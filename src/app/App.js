import React from "react";
import "semantic-ui-css/semantic.min.css";
import {Container, Message, Icon} from "semantic-ui-react";

class App extends React.Component {

    render() {
        return (
            <Container>
                <Message>
                    <label>
                        ...Huawei todo app...
                    </label>
                    <Icon name="check circle"/>
                </Message>
            </Container>
        );
    }
}

export default App;
