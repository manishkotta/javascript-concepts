import CheckBoxTree from './check-box-tree.component';
import React from 'react';

export default class CheckBoxTreeRoot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            ...props
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        })
    }
    render() {
        return (
            <div className='row'>
                {this.state.label}
                <div className="col-md-6">
                    <CheckBoxTree
                        nodes={this.state.nodes}
                        checked={this.state.checked}
                        expanded={this.state.expanded}
                        onCheck={checked => this.setState({ checked })}
                        onExpand={expanded => this.setState({ expanded })}
                    />
                </div>
            </div>
        )
    }
}