import React from 'react';
import Select from '../dropdown';
import './styles.css';

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder,
            options: props.options,
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options) {
            this.setState({
                placeholder: nextProps.placeholder,
                options: nextProps.options,
                value: nextProps.options.length === 1 ? nextProps.options[0] : nextProps.value
            });
        }
    }

    render() {
        return (
            <Select value={this.state.value} placeholder={this.state.placeholder} options={this.state.options} disabled={this.state.options.length == 1} onChange={(e) => this.props.onChange(e)} />
        );
    }
}
