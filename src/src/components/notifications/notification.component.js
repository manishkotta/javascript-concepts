import React, { PropTypes } from 'react';
import _ from 'lodash';
var ReactToastr = require("react-toastr");
// var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import ResponseStatusEnum from '../../lib/enums/response-status-enum'
import { toastr } from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'
import './react-redux-toastr.min.css';

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };

    }
    //    shouldComponentUpdate(newProps, newState) {
    //        return (this.props.notification !== newProps.notification);
    //    }
    addSuccess() {
        const toastrOptions = {
            timeOut: 3000, // by setting to 0 it will prevent the auto close
            position: this.props.notification.isRtl ? "top-left" : "top-right",
            //   icon: (x<myCustomIconOrAvatar />), // You can add any component you want but note the the with and height are 70px ;)
            showCloseButton: false, // true by default
            component: ( // this option will give you a func 'remove' as props
                this.renderSuccess()
            )
        }

        toastr.success('', toastrOptions)
    }

    addError() {
        const toastrOptions = {
            timeOut: 0, // by setting to 0 it will prevent the auto close
            position: this.props.notification.isRtl ? "bottom-left" : "bottom-right",
            removeOnHover: false,
            showCloseButton: true, // true by default
            component: ( // this option will give you a func 'remove' as props
                this.renderNotifications()
            )
        }

        toastr.error('Please fix below errors', toastrOptions)
    }

    addWarning() {
        const toastrOptions = {
            timeOut: 0, // by setting to 0 it will prevent the auto close
            position: this.props.notification.isRtl ? "bottom-left" : "bottom-right",
            showCloseButton: true, // true by default
            component: ( // this option will give you a func 'remove' as props
                this.renderNotifications()
            )
        }

        toastr.warning('Warning', toastrOptions)
    }

    addInfo() {
        const toastrOptions = {
            timeOut: 0, // by setting to 0 it will prevent the auto close
            position: this.props.notification.isRtl ? "bottom-left" : "bottom-right",
            showCloseButton: true, // true by default
            component: ( // this option will give you a func 'remove' as props
                this.renderNotifications()
            )
        }
        toastr.error('info', toastrOptions)
    }

    showCustom() {

        const toastrConfirmOptions = {
            onOk: () => this.props.notification.func.onOk(),
            onCancel: () => this.props.notification.func.onCancel()
        };
        let msg = this.props.notification.messages ? this.props.notification.messages[0] : 'Are you sure about that!';


        const toastrConfirmOptions1 = {
            onOk: () => this.props.notification.func.onOk(),
            onCancel: () => this.props.notification.func.onCancel(),
            buttons: [{
                text: 'Save and exit',
                className: 'do-not-apply-btn',
                handler: () => this.props.notification.func.onSaveAndExit()
            }]
        };

        toastr.confirm(msg, toastrConfirmOptions1);
    }

    renderNotifications() {
        return (
            <ul>
                {
                    _.map(this.props.notification.messages,
                        (value, i) => (
                            <li key={i}>{value.displayMessage}</li>
                        )
                    )
                }
            </ul>
        )
    }

    renderSuccess() {
        return (<div>
            {
                _.map(this.props.notification.messages,
                    (value, i) => (
                        <div key={i}>{value.displayMessage}</div>
                    )
                )
            }

        </div>
        )
    }

    messageTypes() {
        if(!this.props.notification.persistMessages){
            toastr.removeByType('error')
            toastr.removeByType('info')
            toastr.removeByType('success')
            toastr.removeByType('warning')
            toastr.removeByType('confirm')
        }

        if (this.props.notification.type && this.props.notification.messages && this.props.notification.messages.length > 0) {
            switch (this.props.notification.type) {
                case ResponseStatusEnum.Success:
                    this.addSuccess();
                    break;
                case ResponseStatusEnum.Error:
                    this.addError();
                    break;
                case ResponseStatusEnum.Warning:
                    this.addWarning();
                    break;
                case ResponseStatusEnum.Info:
                    this.addInfo();
                    break;
                case ResponseStatusEnum.Confirmation: // Need to identify how confirmation can be made generic
                    this.showConfirmation();
                    break;
                case ResponseStatusEnum.Custom:
                    this.showCustom();
                    break;
                default:
                    break;
            }
        }
    }

    componentDidUpdate() {
        this.messageTypes();
    }

    showConfirmation() {
        const toastrConfirmOptions = {
            onOk: () => this.props.notification.func.onOk(),
            onCancel: () => this.props.notification.func.onCancel()
        };
        let msg = this.props.notification.messages ? this.props.notification.messages[0] : 'Are you sure about that!';
        toastr.confirm(this.props.notification.messages[0], toastrConfirmOptions);
    }

    render() {
        return (
            <ReduxToastr
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                preventDuplicates
            />
        )
    }

}
