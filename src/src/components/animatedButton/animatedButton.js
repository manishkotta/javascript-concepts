import React from 'react'
import './animatedButton.css'
class AnimatedButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <button className='animatedButton'  onClick={this.state.onClick}  >
                {
                    this.state.iconOnLeft &&
                    <span>
                        <i className={this.state.iconOnLeft} />
                        &nbsp;
                    </span>
                }
                {this.state.buttonText}
                {
                    this.state.iconOnRight &&
                    <span>
                        &nbsp;
                        <i className={this.state.iconOnRight} />
                    </span>
                }

            </button>
        )
    }
}

export default AnimatedButton