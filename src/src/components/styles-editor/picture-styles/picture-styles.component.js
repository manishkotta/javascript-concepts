import React from 'react';
import '../../../styles/headerStyles.css';
import 'react-select/dist/react-select.css';
import CustomSelect from '../../../components/custom-dropdown';
import PictureStretchEnum from '../../../lib/enums/picture-stretch-enum';
import Dropzone from 'react-dropzone';

export default class PictureStyles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: this.props.widget
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            widget: nextProps.widget
        })
    }
    picturesStretch(e) {
        const widget = this.state.widget;
        widget.pictureStretch = e;
        this.setState({ widget });
    }
    updatePicture(key) {
        const widget = this.state.widget;
        widget.appliedSettings.dataMetrics.picturePath = key[0].preview;
        widget.appliedSettings.dataMetrics.file = key[0];
        widget.PictureSelected = key[0].name;
        this.setState({ widget });
    }

    updateProp(e, prop) {
        const widget = this.state.widget;
        widget[prop] = e.target.value;
        this.setState({ widget });
    }

    updateWidget(e) {
        const widget = this.state.widget;
        widget.picturePath = widget.appliedSettings.dataMetrics.picturePath;
        widget.file = widget.appliedSettings.dataMetrics.file;
        this.setState({ widget });
        this.props.UpdateWidgetStyles(this.state.widget);

    }
    render() {
        var pictureOptions = [
            { value: PictureStretchEnum.ActualSize, label: 'Actual Size' },
            { value: PictureStretchEnum.Fill, label: 'Fill' }
        ];
        return (
            <div className=" col-md-12 col-sm-12 editorContent" >
                <div className="row">
                    <div className="col-sm-12 col-md-offset-3 col-md-6">

                        <Dropzone
                            multiple={false}
                            ref="picturePath"
                            accept="image/*"
                            className="dropZoneDimensions"
                            onDrop={(e) => this.updatePicture(e)}>
                            <button className="browse btn btn-primary input-md">Choose file to upload.</button>
                            <span><b> &nbsp;{this.state.widget.PictureSelected} </b> selected</span>
                        </Dropzone>

                    </div>
                </div>
                <div className="row picturePadding">
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="metrics-label col-md-4">
                                    <text>Picture Stretch: </text>

                                </div>
                                <div className="col-md-5 col-sm-7">
                                    <CustomSelect
                                        name="field-group-options"
                                        value={this.state.widget.pictureStretch}
                                        placeholder='Select...'
                                        options={pictureOptions}
                                        onChange={(e) => this.picturesStretch(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-md-offset-5   col-md-3 col-sm-offset-2 col-sm-8">
                        <button type="button" className=" btn btn-sm btn btn-primary btn-block " onClick={(e) => this.updateWidget(e)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

}
