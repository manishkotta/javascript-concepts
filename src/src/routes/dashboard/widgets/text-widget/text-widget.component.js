import React from 'react';
import * as Color from '../../../../lib/color-conversion';
import ScrollTypeEnum from '../../../../lib/enums/scroll-type-enum';
import _ from 'lodash';

export default class TextWidget extends React.Component {
    constructor(props) {
        super(props);
        const { titleStyles } = _.cloneDeep(props);

        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        this.state = {
            title: this.props.title,
            scrollType: this.props.scrollType,
            scrollSpeed: this.props.scrollSpeed,
            titleStyles,
        }
    }
    componentWillReceiveProps(nextProps) {
        const { titleStyles } = _.cloneDeep(nextProps);
        titleStyles.color = Color.ToString(titleStyles.color);
        titleStyles.fontSize = `${titleStyles.fontSize}px`;

        this.setState({
            title: nextProps.title,
            scrollType: nextProps.scrollType,
            scrollSpeed: nextProps.scrollSpeed,
            titleStyles,
        })
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.state.title !== newState.title
            || !_.isEqual(this.state.titleStyles, newState.titleStyles)
            || !_.isEqual(this.state.scrollType, newState.scrollType)
            || !_.isEqual(this.state.scrollSpeed, newState.scrollSpeed)

        );
    }


    render() {
        let scrollType = '';
        if (this.state.scrollType) {
            switch (this.state.scrollType.value) {
                case ScrollTypeEnum.LeftToRight:
                    scrollType = 'marqueeLeftRight';
                    break;
                case ScrollTypeEnum.RightToLeft:
                    scrollType = 'marqueeRightLeft';
                    break;
                case ScrollTypeEnum.TopToBottom:
                    scrollType = 'marqueeTopBottom';
                    break;
                case ScrollTypeEnum.BottomToTop:
                    scrollType = 'marqueeBottomTop';
                    break;
                default:
                    break;
            }
        }

        let animationStyle = '';
        if (this.state.scrollType && this.state.scrollType.value != ScrollTypeEnum.None) {
            animationStyle = { 'animation': `${scrollType} ${this.state.scrollSpeed}s linear infinite`, 'WebkitAnimation': `${scrollType} ${this.state.scrollSpeed}s linear infinite` };
        }
        return (

            <div className= "widget-content  centerAlign" style={this.state.titleStyles}>
                {(this.state.scrollType && this.state.scrollType.value == ScrollTypeEnum.None) &&
                    <div>{this.state.title}</div>
                }

                {(this.state.scrollType && this.state.scrollType.value != ScrollTypeEnum.None) &&

                    <div className="marquee">
                        <div style={animationStyle}>
                            <span>{this.state.title}</span>
                        </div>

                    </div>
                }
            </div>


        );
    }
}
