import React from 'react';
import _ from 'lodash';
import PictureStretchEnum from '../../../../lib/enums/picture-stretch-enum';

export default class PictureWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picturePath: props.picturePath,
            pictureStretch: props.pictureStretch,
            PictureSelected: props.PictureSelected || 'No picture'
        }
    }
    componentWillMount() {
        if (this.props.dashboardId && this.props.appliedSettings.group && this.props.appliedSettings.group.isEdit && !this.props.file) {
            this.props.PreviewActionPicture(this.props.dashboardId, this.props.id);
        }
    }
    componentWillReceiveProps(nextProps) {
        var { picturePath } = _.cloneDeep(nextProps);
        picturePath = nextProps.picturePath;
        this.setState({
            picturePath: nextProps.picturePath,
            pictureStretch: nextProps.pictureStretch
        })
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.state.picturePath !== newState.picturePath || this.state.pictureStretch !== newState.pictureStretch
        );
    }
    render() {
        let picClass = '';
        switch (this.state.pictureStretch && this.state.pictureStretch.value) {
            case PictureStretchEnum.ActualSize:
                picClass = 'image-none';
                break;
            case PictureStretchEnum.Fill:
                picClass = 'image-fill';
                break;
            default:
                picClass = 'image-none';
        }
        return (
            <div className="widget-content" >
                <img src={this.state.picturePath} className={picClass}></img>
            </div>

        );
    }
}