import React from 'react'
import Widget from '../widgets/widget';
import _ from 'lodash';
import Rnd from 'react-rnd';

let layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 }
];


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps,
        });
    }

    onResizeStop(widget, e, direction, ref, delta, position) {
        this.props.UpdateWidgetSize(ref.offsetWidth, ref.offsetHeight, widget.id)
       // this.props.UpdateWidgetZIndex({}, {}, widget);
        e.preventDefault();
        e.stopPropagation();
    }

    onResizeStart(widget, e, direction, ref, delta, position) {
        this.props.UpdateWidgetZIndex({}, {}, widget);
        e.preventDefault();
        e.stopPropagation();
    }

    onDragStop(widget, e, position) {
        this.props.UpdateWidgetPosition(position.x, position.y, widget.id);
       // this.props.UpdateWidgetZIndex({}, {}, widget);
        e.preventDefault();
        e.stopPropagation();
    }

    onDragStart(widget, e, position) {
        this.props.UpdateWidgetZIndex({}, {}, widget);
        e.preventDefault();
        e.stopPropagation();
    }

    onCustomClick(e, event, widget) {
        //this.props.UpdateWidgetZIndex(e, event, widget);
        e.preventDefault();
        e.stopPropagation();
        // console.log(' widget onclick ', e, event, widget)
    }
    render() {
        let enableResizingValue = {
            bottom: !this.props.static,
            bottomLeft: !this.props.static,
            bottomRight: !this.props.static,
            left: !this.props.static,
            right: !this.props.static,
            top: !this.props.static,
            topLeft: !this.props.static,
            topRight: !this.props.static,
        };

        let resizeHandleClasses = {
            
            bottomRight: "bottomRight",
            bottomLeft: "bottomLeft",
            topLeft: "topLeft",
            topRight: "topRight"
        };

        return (
            <div dir="ltr" className="dashboard-layout">

                {
                    _.map(this.props.widgets, (widget, i) => (
                        <Rnd key={widget.id} default={{ x: widget.x, y: widget.y, width: widget.width, height: widget.height }}
                            onResizeStop={this.onResizeStop.bind(this, widget)}
                            onResizeStart={this.onResizeStart.bind(this, widget)}
                            onDragStop={this.onDragStop.bind(this, widget)}
                            onDragStart={this.onDragStart.bind(this, widget)}
                            enableResizing={enableResizingValue}
                            resizeHandleClasses={resizeHandleClasses}
                            disableDragging={this.props.static ? true : false}
                            z={widget.z}
                        >
                            <Widget UpdateWidgetZIndex={this.props.UpdateWidgetZIndex} key={widget.id} dashboardId={this.props.Id} {...this.props} widget={widget} />
                        </Rnd>
                    ))
                }

            </div>
        )
    }
}

