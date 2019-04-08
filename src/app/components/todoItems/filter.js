import React from "react";
import {Button, Dropdown, Form, Icon, Input} from "semantic-ui-react";

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
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Item Name</label>
                        <Input autoFocus
                               name="keyword"
                               value={filter.keyword || ""}
                               onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Complete Status</label>
                        <Dropdown placeholder="All"
                                  name="completed"
                                  fluid
                                  selection
                                  onChange={this.handleChange}
                                  options={[
                                      {
                                          key: "All",
                                          text: "All",
                                          value: undefined
                                      },
                                      {
                                          key: "Complete",
                                          text: "Complete",
                                          value: true
                                      },
                                      {
                                          key: "Incomplete",
                                          text: "Incomplete",
                                          value: false
                                      }
                                  ]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Expire Status</label>
                        <Dropdown placeholder="All"
                                  name="expired"
                                  fluid
                                  selection
                                  onChange={this.handleChange}
                                  options={[
                                      {
                                          key: "All",
                                          text: "All",
                                          value: undefined
                                      },
                                      {
                                          key: "Expired",
                                          text: "Expired",
                                          value: true
                                      },
                                      {
                                          key: "Unexpired",
                                          text: "Unexpired",
                                          value: false
                                      }
                                  ]}
                        />
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