import React, { PropTypes } from 'react';
import _ from 'lodash';
import './toggle-switch-styles.css';

export default class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: props.nodes,
            checkedNode: props.checkedNode
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            nodes: nextProps.nodes,
            checkedNode: nextProps.checkedNode
        });
    }

    render() {
        return (
            <div className="toggle-switch">
                {
                    _.map(
                        this.state.nodes,
                        (node) => {
                            return (!node.isDisabled) ? (
                                <div key={node.label}
                                    className={this.state.checkedNode === node.value ? "toggle-item checked" : "toggle-item"}
                                    onClick={this.handleClick.bind(this, node.value)} >
                                    {node.label}
                                </div>
                            )
                            :(
                                <div
                                    key={node.label} className={this.state.checkedNode === node.value ? "toggle-item checked disabled" : "toggle-item disabled"}
                                >
                                    {node.label}
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }

    handleClick(checkedNode) {
        this.setState({
            checkedNode
        });

        this.props.onChange(checkedNode);
    }
}

ToggleSwitch.PropTypes = {
    nodes: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    checkedNode: PropTypes.string
};

ToggleSwitch.defaultProps = {
    onChange: () => { },
    checkedNode: ''
};