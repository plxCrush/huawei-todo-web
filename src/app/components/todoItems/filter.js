import React from "react";
import {Button, Form, Icon, Input} from "semantic-ui-react";

export class TodoItemFilter extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            filter: this.props.filter || {}
        }
    }

    handleChange(event, target) {

        let {filter} = this.state;
        filter[target.name] = target.value;
        this.setState({filter});
    };

    handleSubmit = event => {

        event.preventDefault();
        this.props.onFilterChange(this.state.filter);
    };

    render() {

        const {loading} = this.props;
        const {filter} = this.state;
        return (
            <Form loading={loading}
                  onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Field>
                        <label>Item Name</label>
                        <Input autoFocus
                               name="keyword"
                               value={filter.keyword || ""}
                               onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>&nbsp;</label>
                        <Button type="submit">
                            <Icon name="search"/>
                            Search
                        </Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        )
    }
}